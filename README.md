# React Native Splashscreen Dockicon

[![NPM](https://nodei.co/npm/react-native-splashscreen-dockicon.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-native-splashscreen-dockicon/)

[![Build Status](https://api.travis-ci.org/VincentCATILLON/react-native-splashscreen-dockicon.png?branch=master)](http://travis-ci.org/VincentCATILLON/react-native-splashscreen-dockicon)

## Dependencies

[Image Magick](https://www.imagemagick.org/script/binary-releases.php#macosx) is required to generate images.

And run `npm install` to install node dependencies.

## Files dimensions

Source files must have at least the following dimensions:

- Splash screen: 2048x2048px
- Dock icon: 180x180px

## CLI

You must provide splash screen and dock icon args to the following command:

`node node_modules/react-native-splashscreen-dockicon -- --splash-screen <your_splash_screen_path> --dock-icon <your_dock_icon_path>`

Or you can add this directly to your package.json scripts section and run `npm run generate:assets`:

```
scripts: {
  ...
  "generate:assets": "node node_modules/react-native-splashscreen-dockicon -- --splash-screen <your_splash_screen_path> --dock-icon <your_dock_icon_path>",
}
```

## Contributions

Edit files under the `src` folder and transpile them using [Babel](http://babeljs.io/):

`npm run babelify`

Use the command above.

## Tests

`npm run test`
