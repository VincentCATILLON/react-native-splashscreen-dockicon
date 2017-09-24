// @flow

import type { SplashScreenFileType, DockIconFileType } from './types.js';

const splashScreenFiles: Array<SplashScreenFileType> = [
  {
    idiom: 'iphone',
    orientation: 'portrait',
    'minimum-system-version': '8.0',
    subtype: '736h',
    scale: '3x',
    resolution: {
      width: 1242,
      height: 2208,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'iphone',
    orientation: 'portrait',
    'minimum-system-version': '8.0',
    subtype: '667h',
    scale: '2x',
    resolution: {
      width: 750,
      height: 1334,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'iphone',
    orientation: 'landscape',
    'minimum-system-version': '8.0',
    subtype: '736h',
    scale: '3x',
    resolution: {
      width: 2208,
      height: 1242,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'iphone',
    orientation: 'portrait',
    'minimum-system-version': '7.0',
    scale: '2x',
    resolution: {
      width: 640,
      height: 960,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'iphone',
    orientation: 'portrait',
    'minimum-system-version': '7.0',
    subtype: 'retina4',
    scale: '2x',
    resolution: {
      width: 640,
      height: 1136,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'ipad',
    orientation: 'portrait',
    'minimum-system-version': '7.0',
    scale: '1x',
    resolution: {
      width: 768,
      height: 1024,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'ipad',
    orientation: 'portrait',
    'minimum-system-version': '7.0',
    scale: '2x',
    resolution: {
      width: 1536,
      height: 2048,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'ipad',
    orientation: 'landscape',
    'minimum-system-version': '7.0',
    scale: '1x',
    resolution: {
      width: 1024,
      height: 768,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'ipad',
    orientation: 'landscape',
    'minimum-system-version': '7.0',
    scale: '2x',
    resolution: {
      width: 2048,
      height: 1536,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'iphone',
    orientation: 'portrait',
    scale: '1x',
    resolution: {
      width: 320,
      height: 480,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'iphone',
    orientation: 'portrait',
    scale: '2x',
    resolution: {
      width: 640,
      height: 960,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'iphone',
    orientation: 'portrait',
    subtype: 'retina4',
    scale: '2x',
    resolution: {
      width: 640,
      height: 1136,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'ipad',
    orientation: 'portrait',
    scale: '1x',
    resolution: {
      width: 768,
      height: 1004,
    },
    extent: 'to-status-bar',
  },
  {
    idiom: 'ipad',
    orientation: 'portrait',
    scale: '2x',
    resolution: {
      width: 1536,
      height: 2008,
    },
    extent: 'to-status-bar',
  },
  {
    idiom: 'ipad',
    orientation: 'portrait',
    scale: '1x',
    resolution: {
      width: 768,
      height: 1024,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'ipad',
    orientation: 'portrait',
    scale: '2x',
    resolution: {
      width: 1536,
      height: 2048,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'ipad',
    orientation: 'landscape',
    scale: '1x',
    resolution: {
      width: 1024,
      height: 748,
    },
    extent: 'full-screen',
  },
  {
    idiom: 'ipad',
    orientation: 'landscape',
    scale: '2x',
    resolution: {
      width: 2048,
      height: 1496,
    },
    extent: 'to-status-bar',
  },
  {
    idiom: 'ipad',
    orientation: 'landscape',
    scale: '1x',
    resolution: {
      width: 1024,
      height: 768,
    },
    extent: 'to-status-bar',
  },
  {
    idiom: 'ipad',
    orientation: 'landscape',
    scale: '2x',
    resolution: {
      width: 2048,
      height: 1536,
    },
    extent: 'full-screen',
  },
];

const dockIconFiles: Array<DockIconFileType> = [
  {
    idiom: 'iphone',
    size: '20x20',
    scale: '2x',
    resolution: {
      width: 40,
      height: 40,
    },
  },
  {
    idiom: 'iphone',
    size: '20x20',
    scale: '3x',
    resolution: {
      width: 60,
      height: 60,
    },
  },
  {
    idiom: 'iphone',
    size: '29x29',
    scale: '2x',
    resolution: {
      width: 58,
      height: 58,
    },
  },
  {
    idiom: 'iphone',
    size: '29x29',
    scale: '3x',
    resolution: {
      width: 87,
      height: 87,
    },
  },
  {
    idiom: 'iphone',
    size: '40x40',
    scale: '2x',
    resolution: {
      width: 80,
      height: 80,
    },
  },
  {
    idiom: 'iphone',
    size: '40x40',
    scale: '3x',
    resolution: {
      width: 120,
      height: 120,
    },
  },
  {
    idiom: 'iphone',
    size: '60x60',
    scale: '2x',
    resolution: {
      width: 120,
      height: 120,
    },
  },
  {
    idiom: 'iphone',
    size: '60x60',
    scale: '3x',
    resolution: {
      width: 180,
      height: 180,
    },
  },
];

export { splashScreenFiles, dockIconFiles };
