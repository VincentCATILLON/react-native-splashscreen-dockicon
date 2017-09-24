// @flow

import android from './android';
import ios from './ios';

const SPLASH_SCREEN_ARG = '--splash-screen';
const DOCK_ICON_ARG = '--dock-icon';

let splashScreenPath;
let dockIconPath;

process.argv.forEach(function (value, index) {
  switch (value) {
    case SPLASH_SCREEN_ARG:
      splashScreenPath = process.argv[index + 1];
      return;
    case DOCK_ICON_ARG:
      dockIconPath = process.argv[index + 1];
      return;
  }
});

if (!splashScreenPath) {
  throw new Error(SPLASH_SCREEN_ARG + ' is missing from react-native-splashscreen-dockicon.');
}

if (!dockIconPath) {
  throw new Error(DOCK_ICON_ARG + ' is missing from react-native-splashscreen-dockicon.');
}

android(splashScreenPath, dockIconPath);
ios(splashScreenPath, dockIconPath);
