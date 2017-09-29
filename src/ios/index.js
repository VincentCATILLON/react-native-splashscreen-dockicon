// @flow

import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

import rimraf from 'rimraf';
import { parse, build } from 'plist';

import appName from '../lib/appName.js';

import generator from './generator.js';

type PlistObjectType = {
  buildSettings?: Object,
  children?: Array<string>,
  fileRef?: string,
  name?: string,
};

type PlistObjectsType = {
  [key: string]: PlistObjectType,
};

type PlistContentType = {
  objects: PlistObjectsType,
};

const LAUNCH_SCREEN_FILE = path.join(
  'ios',
  appName,
  'Base.lproj',
  'LaunchScreen.xib',
);

const PLIST_FILE = path.join(
  'ios',
  appName,
  'Info.plist',
);

const PBXPROJ_FILE = path.join(
  'ios',
  appName + '.xcodeproj',
  'project.pbxproj',
);

const removeLaunchScreenFile = () => {
  console.log('[SPLASHSCREEN] Erasing: ' + LAUNCH_SCREEN_FILE);
  rimraf.sync(LAUNCH_SCREEN_FILE)
};

const updatePlist = () => {
  fs.readFile(PLIST_FILE, 'utf8', (e, plist: string) => {
    if (e) {
      throw e;
    }
    const plistContent = parse(plist);
    delete plistContent.UILaunchStoryboardName;
    console.log('[SPLASHSCREEN] Updating: ' + PLIST_FILE);
    fs.writeFileSync(PLIST_FILE, build(plistContent));
  });
};

export const updatePbxproj = () => {
  exec('plutil -convert json -o - -- ' + PBXPROJ_FILE, function (e, stdout, stderr) {
    if (e) {
      throw e;
    }
    if (stderr) {
      throw new Error(stderr);
    }
    let json: PlistContentType = JSON.parse(stdout);

    const getChildrenReferencies = (item: PlistObjectType): Array<string> => {
      let keys = [];
      if (item.children && Array.isArray(item.children)) {
        item.children.forEach((key: string) => {
          const child: PlistObjectType = json.objects[key];
          keys.push(key);
          keys = keys.concat(getChildrenReferencies(child));
        });
      }
      return keys;
    };

    const referencies: Array<string> = Object.keys(json.objects)
      .reduce((keys, key) => {
        const object: PlistObjectType = json.objects[key];
        if (object.name && object.name.match(/LaunchScreen.xib/)) {
          keys.push(key);
          keys = keys.concat(getChildrenReferencies(object));
        }
        return keys;
      }, []);

    const objects: PlistObjectsType = Object.keys(json.objects)
      .reduce((objects, key) => {
        let object: PlistObjectType = json.objects[key];
        if (object.children) {
          object = {...object, children: object.children.filter(key => !referencies.includes(key))}
        }
        if (object.buildSettings && object.buildSettings.INFOPLIST_FILE === appName + '/Info.plist') {
          object = {...object, buildSettings: {
            ...object.buildSettings,
            ASSETCATALOG_COMPILER_LAUNCHIMAGE_NAME: 'LaunchImage',
          }};
        }
        if (!referencies.includes(key) && (!object.fileRef || !referencies.includes(object.fileRef))) {
          return {...objects, ...{ [key]: object }}
        }
        return objects;
      }, {});
    json = {...json, objects};
    console.log('[PBXPROJ] Writing: ' + PBXPROJ_FILE);
    fs.writeFile(PBXPROJ_FILE + '.json', JSON.stringify(json), e => {
      if (e) {
        throw e;
      }
      exec('plutil -convert xml1 -o ' + PBXPROJ_FILE + ' -- ' + PBXPROJ_FILE + '.json', function (e, stdout, stderr) {
        rimraf.sync(PBXPROJ_FILE + '.json');
        if (e) {
          throw e;
        }
        if (stderr) {
          throw new Error(stderr);
        }
      });
    });
  });
}

export default (splashScreenPath: string, dockIconPath: string) => {
  removeLaunchScreenFile();
  updatePlist();
  updatePbxproj();
  generator(splashScreenPath, dockIconPath);
}
