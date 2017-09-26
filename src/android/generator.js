// @flow

import path from 'path';

import imagemagick from 'imagemagick';
import mkdirp from 'mkdirp';

import type { ResolutionType } from '../types.js';

type AndroidDrawableType =
  | 'ldpi'
  | 'mdpi'
  | 'hdpi'
  | 'xhdpi'
  | 'xxhdpi'
  | 'xxxhdpi';

const ANDROID_RES_PATH = path.join('android', 'app', 'src', 'main', 'res');

const generateSplashScreen = (imagePath: string, drawableName: AndroidDrawableType) => {
  const sizes: {
    [key: AndroidDrawableType]: ResolutionType,
  } = {
    mdpi: { width: 480, height: 480 },
    hdpi: { width: 800, height: 800 },
    xhdpi: { width: 1280, height: 1280 },
    xxhdpi: { width: 1600, height: 1600 },
    xxxhdpi: { width: 1920, height: 1920 },
  };
  const { width, height } = sizes[drawableName];
  const fileName = path.join('drawable-' + drawableName, 'splash.9.png');
  console.log('[SPLASHSCREEN] Writing: ' + fileName);
  mkdirp(path.join(ANDROID_RES_PATH, 'drawable-' + drawableName));
  const options: Array<string> = [
    imagePath,
    '-background',
    'none',
    '-alpha',
    'remove',
    '-gravity',
    'center',
    '-crop',
    '2048x2048+0+0!',
    '-resize',
    width + 'x' + height,
    '-matte',
    '-bordercolor',
    'none',
    '-border',
    '1',
    '-fill',
    'black',
    '-draw',
    'line 0,1 0,1',
    '-draw',
    'line 1,0 1,0',
    '-draw',
    'line 0,' + height + ' 0,' + height,
    '-draw',
    'line ' + width + ',0 ' + width + ',0',
    '-draw',
    'line 1,' + (height + 1) + ' ' + width + ',' + (height + 1),
    '-draw',
    'line ' + (width + 1) + ',1 ' + (width + 1) + ',' + height,
    path.join(ANDROID_RES_PATH, fileName),
  ];
  imagemagick.convert(options, (e?: Error) => {
    if (e) {
      throw e;
    }
  });
};

const generateDockIcon = (imagePath: string, drawableName: AndroidDrawableType) => {
  const sizes: {
    [key: AndroidDrawableType]: { [key: 'width' | 'height']: number },
  } = {
    mdpi: { width: 48, height: 48 },
    hdpi: { width: 72, height: 72 },
    xhdpi: { width: 96, height: 96 },
    xxhdpi: { width: 144, height: 144 },
    xxxhdpi: { width: 192, height: 192 },
  };
  const { width, height } = sizes[drawableName];
  const fileName = path.join('mipmap-' + drawableName, 'ic_launcher.png');
  console.log('[DOCK ICON] Writing: ' + fileName);
  mkdirp(path.join(ANDROID_RES_PATH, 'mipmap-' + drawableName));
  const options: Array<string> = [
    imagePath,
    '-background',
    'none',
    '-alpha',
    'remove',
    '-resize',
    '152x152',
    '-matte',
    '-bordercolor',
    'none',
    '-border',
    '20',
    '-resize',
    width + 'x' + height,
    path.join(ANDROID_RES_PATH, fileName),
  ];
  imagemagick.convert(options, (e?: Error) => {
    if (e) {
      throw e;
    }
  });
};

export default (splashScreenPath: string, dockIconPath: string) => {
  generateSplashScreen(splashScreenPath, 'mdpi');
  generateSplashScreen(splashScreenPath, 'hdpi');
  generateSplashScreen(splashScreenPath, 'xhdpi');
  generateSplashScreen(splashScreenPath, 'xxhdpi');
  generateSplashScreen(splashScreenPath, 'xxxhdpi');
  generateDockIcon(dockIconPath, 'mdpi');
  generateDockIcon(dockIconPath, 'hdpi');
  generateDockIcon(dockIconPath, 'xhdpi');
  generateDockIcon(dockIconPath, 'xxhdpi');
  generateDockIcon(dockIconPath, 'xxxhdpi');
};
