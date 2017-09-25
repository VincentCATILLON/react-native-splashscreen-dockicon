// @flow

import type { ResolutionType } from '../types.js';

export type SplashScreenFileType = {
  idiom?:
    | 'universal'
    | 'iphone'
    | 'ipad'
    | 'mac'
    | 'ios-marketing'
    | 'tv'
    | 'watch',
  orientation: 'portrait' | 'landscape',
  'minimum-system-version'?: '7.0' | '8.0' | '9.0',
  subtype?: 'retina4' | '667h' | '736h',
  scale?: '1x' | '2x' | '3x',
  resolution: ResolutionType,
  extent: 'to-status-bar' | 'full-screen',
};

export type DockIconFileType = {
  idiom: 'iphone',
  size: '20x20' | '29x29' | '40x40' | '60x60',
  scale: '2x' | '3x',
  resolution: ResolutionType,
};
