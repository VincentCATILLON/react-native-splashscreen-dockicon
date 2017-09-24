// @flow

import path from 'path';
import fs from 'fs';

import { parseString } from 'xml2js';

const ANDROID_STRINGS_FILE = path.join(
  'android',
  'app',
  'src',
  'main',
  'res',
  'values',
  'strings.xml',
);

const androidStringsFileContent = fs.readFileSync(ANDROID_STRINGS_FILE);
// eslint-disable-next-line import/no-mutable-exports
let appName = '';
parseString(androidStringsFileContent, (e?: Error, json?: Object) => {
  if (e) {
    console.error(e);
  }
  appName = json.resources.string.find(string => string.$.name === 'app_name')._;
});

export default appName;
