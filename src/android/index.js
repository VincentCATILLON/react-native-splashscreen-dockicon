// @flow

import path from 'path';
import fs from 'fs';

import { parseString, Builder } from 'xml2js';

import generator from './generator.js';

const ANDROID_ROOT_PATH = path.join('android', 'app', 'src', 'main');
const ANDROID_MANIFEST_FILE = path.join(ANDROID_ROOT_PATH, 'AndroidManifest.xml');
const ANDROID_STYLES_FILE = path.join(ANDROID_ROOT_PATH, 'res', 'values', 'styles.xml');

const generateActivityFile = (packageName: string) => {
  const fileName = path.join(ANDROID_ROOT_PATH, 'java', ...packageName.split('.'), 'SplashActivity.java');
  console.log('[SPLASHSCREEN] Writing: ' + fileName);
  fs.writeFileSync(fileName,
`package ${packageName};

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}`
  );
};

const updateManifest = (json?: Object) => {
  const { manifest } = json;
  const { application } = manifest;
  let { activity, $ } = application.find(node => node.$ && node.$['android:name'] === '.MainApplication');
  $ = {...$, 'android:theme': '@style/SplashTheme'};
  activity = activity
    .map(activity => {
      if (activity.$['android:label']) {
        activity.$['android:name'] = '.SplashActivity';
      }
      return activity;
    })
    .filter(activity => activity.$['android:name'] !== '.MainActivity');
  activity.push({
    $: {
      'android:name': '.MainActivity',
      'android:screenOrientation': $['android:screenOrientation'] || 'unspecified',
      'android:configChanges': 'keyboard|keyboardHidden|orientation|screenSize',
    },
  });
  const builder = new Builder();
  console.log('[SPLASHSCREEN] Updating: ' + ANDROID_MANIFEST_FILE);
  fs.writeFileSync(ANDROID_MANIFEST_FILE, builder.buildObject(json));
};

const updateStyles = (json?: Object) => {
  const { resources } = json;
  let { style = [] } = resources;
  style = style
    .filter(style => style.$['name'] !== 'SplashTheme');
  style.push({
    $: {
      'name': 'SplashTheme',
      'parent': 'Theme.AppCompat.Light.NoActionBar',
    },
    item: [{
      $: {
        'name': 'android:windowBackground',
      },
      _: '@drawable/splash',
    }],
  });
  const builder = new Builder();
  console.log('[SPLASHSCREEN] Updating: ' + ANDROID_STYLES_FILE);
  fs.writeFileSync(ANDROID_STYLES_FILE, builder.buildObject(json));
};

export default (splashScreenPath: string, dockIconPath: string) => {
  fs.readFile(ANDROID_MANIFEST_FILE, (e?: Error, xml?: Object) => {
    if (e) {
      console.error(e);
    }
    parseString(xml, (e?: Error, json?: Object) => {
      if (e) {
        console.error(e);
      }
      updateManifest(json);
      generateActivityFile(json.manifest.$['package']);
    });
  });
  fs.readFile(ANDROID_STYLES_FILE, (e?: Error, xml?: Object) => {
    if (e) {
      console.error(e);
    }
    parseString(xml, (e?: Error, json?: Object) => {
      if (e) {
        console.error(e);
      }
      updateStyles(json);
    });
  });
  generator(splashScreenPath, dockIconPath);
};
