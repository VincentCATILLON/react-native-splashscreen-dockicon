// @flow

import path from 'path';
import fs from 'fs';

import { parseString, Builder } from 'xml2js';

import generator from './generator.js';

const ANDROID_ROOT_PATH = path.join('android', 'app', 'src', 'main');
const ANDROID_MANIFEST_FILE = path.join(ANDROID_ROOT_PATH, 'AndroidManifest.xml');

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
  const { activity, $ } = application.find(node => node.$);
  $['android:theme'] = '@style/SplashTheme';
  const newJson = json;
  const newActivity = activity
    .map(activity => {
      if (activity.$['android:label']) {
        activity.$['android:name'] = '.SplashActivity';
      }
      return activity;
    })
    .filter(activity => activity.$['android:name'] !== '.MainActivity');
  newActivity.push({
    $: {
      'android:name': '.MainActivity',
      'android:screenOrientation': $['android:screenOrientation'] || 'unspecified',
      'android:configChanges': 'keyboard|keyboardHidden|orientation|screenSize',
    },
  });
  newJson.manifest.application.find(node => node.$).activity = newActivity;
  const builder = new Builder();
  console.log('[SPLASHSCREEN] Updating: ' + ANDROID_MANIFEST_FILE);
  fs.writeFileSync(ANDROID_MANIFEST_FILE, builder.buildObject(newJson));
}

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
  generator(splashScreenPath, dockIconPath);
};
