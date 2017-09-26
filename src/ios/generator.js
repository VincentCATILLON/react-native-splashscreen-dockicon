// @flow

import path from 'path';
import fs from 'fs';

import imagemagick from 'imagemagick';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import appName from '../lib/appName.js';
import propertiesReducer from '../lib/propertiesReducer.js';

import { splashScreenFiles, dockIconFiles } from './files.js';
import type { SplashScreenFileType, DockIconFileType,  } from './types.js';

const ASSETS_PATH = path.join(
  'ios',
  appName,
  'Images.xcassets',
);
const SPLASH_SCREEN_PATH = path.join(
  ASSETS_PATH,
  'LaunchImage.launchimage',
);
const DOCK_ICON_PATH = path.join(
  ASSETS_PATH,
  'AppIcon.appiconset',
);

const generateSplashScreen = (imagePath: string, splashScreen: SplashScreenFileType) => {
  const { width, height } = splashScreen.resolution;
  const fileName = Object.values(splashScreen).reduce(propertiesReducer, '') +
    '.png';
  console.log('[SPLASHSCREEN] Writing: ' + fileName);
  mkdirp(path.join(SPLASH_SCREEN_PATH));
  const options: Array<string> = [
    imagePath,
    '-background',
    'none',
    '-alpha',
    'remove',
    '-resize',
    width < height ? height + 'x' + height : width + 'x' + width,
    '-gravity',
    'center',
    '-crop',
    width + 'x' + height + '+0+0!',
    '-matte',
    path.join(SPLASH_SCREEN_PATH, fileName),
  ];
  imagemagick.convert(options, (error?: Error) => {
    if (error) {
      throw error;
    }
  });
  return { ...splashScreen, filename: fileName };
};

const generateFileContents = (
  pathName: string,
  files: Array<SplashScreenFileType | DockIconFileType>,
) => {
  const contents = {
    images: files,
    info: {
      version: 1,
      author: 'react-native-splashscreen-dockicon',
    },
  };
  const fileName = path.join(pathName, 'Contents.json');
  console.log('[CONTENTS] Writing: ' + fileName);
  rimraf.sync(fileName);
  fs.writeFileSync(
    fileName,
    JSON.stringify(contents),
    'utf-8',
    (error?: Error) => {
      if (error) {
        throw error;
      }
    },
  );
};

const generateDockIcon = (imagePath: string, dockIcon: DockIconFileType) => {
  const { width, height } = dockIcon.resolution;
  const fileName = Object.values(dockIcon).reduce(propertiesReducer, '') +
    '.png';
  console.log('[DOCK ICON] Writing: ' + fileName);
  mkdirp(path.join(DOCK_ICON_PATH));
  const options: Array<string> = [
    imagePath,
    '-background',
    'none',
    '-alpha',
    'remove',
    '-resize',
    width + 'x' + height,
    '-matte',
    path.join(DOCK_ICON_PATH, fileName),
  ];
  imagemagick.convert(options, (error?: Error) => {
    if (error) {
      throw error;
    }
  });
  return { ...dockIcon, filename: fileName };
};

export default (splashScreenPath: string, dockIconPath: string) => {
  generateFileContents(
    SPLASH_SCREEN_PATH,
    splashScreenFiles.map(splashScreenFile =>
      generateSplashScreen(splashScreenPath, splashScreenFile)),
  );
  generateFileContents(
    DOCK_ICON_PATH,
    dockIconFiles.map(dockIconFile => generateDockIcon(dockIconPath, dockIconFile)),
  );
};
