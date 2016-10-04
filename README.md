# Visual Regression Testing

Base distribution for visual regression testing with PhantomCSS.

*PhantomCSS* (https://github.com/Huddle/PhantomCSS):
A CasperJS module for automating visual regression testing with PhantomJS or SlimerJS and Resemble.js. For testing Web 
apps, live style guides and responsive layouts.

*CasperJS* (http://casperjs.org/):
CasperJS is a navigation scripting & testing utility for PhantomJS and SlimerJS written in Javascript.

*PhantomJS* (http://phantomjs.org/):
PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web 
standards: DOM handling, CSS selector, JSON, Canvas, and SVG.

*SlimerJS* (https://slimerjs.org/):
SlimerJS is similar to PhantomJs, except that it runs on top of Gecko, the browser engine of Mozilla Firefox 
(specifically, version 31), instead of Webkit, and is not yet truly headless.

*Resemble.js* (http://huddle.github.io/Resemble.js/):
Resemble.js analyses and compares images with HTML5 canvas and JavaScript.

## Installation

```
git clone https://github.com/bgmgmbh/visual-regression-testing.git
cd visual-regression-testing
sudo npm install
```

You don't know `npm`? npm is just another package manager: https://www.npmjs.com/

### SlimerJS instead of PhantomJS

When you switch from PhantomJS to SlimerJS you also have to create new comparisonBase-Images!

SlimerJS needs an X-Server or has to be executed with xvfb-run (http://docs.slimerjs.org/current/installation.html#having-a-headless-slimerjs).
But I haven't found out how this works with PhantomCSS, yet.

## Usage

Testsuites are located in `tests/`.

### Demo Testsuites

With this distribution come two demo test. They are located in `tests/demo` and  `tests/demo2`. They have their own 
READMEs ([Demo 1](tests/demo/README.md), [Demo 2](tests/demo2/README.md))!

### New Custom Testsuites

1. Create a subfolder `tests/mytest`
2. Create a `testfile.js` in `tests/mytest`

Each testsuite should be versioned in it's own git repository. So run `git init` in `tests/mytest` and commit and push
to a remote repository escpecially for this testsuite.

## Docker

I didn't upload an image to docker hub, but you can create your own image from the docker file. For more informations have a look at the [docker documentation](https://docs.docker.com/engine/getstarted/step_four/#/step-2-build-an-image-from-your-dockerfile)

```
docker build -t phantomcss-image .
```

Then run

```
docker run --rm --name phantomcss-daemon -v $PWD/tests:/usr/src/app/tests phantomcss-image tests/demo/testsuite.js
```

## Presentation

* [Presentation](t3cm15_visual_regression_testing.pdf) from the Visual Regression Testing session at the 
<a href="http://typo3camp-munich.de/">TYPO3 Camp Munich 2015</a>: [t3cm15_visual_regression_testing.pdf](t3cm15_visual_regression_testing.pdf)
* [Testsuite](test/mtug-20160202) from my presentation at the <a href="http://mtug.de/">Munich TYPO3 Usergroup</a> at 2016-02-02

## Links

See also https://github.com/bgmgmbh/extension-bgm_vrt

## Author

This PhantomCSS distribution was created by Marco Huber and the bgm websolutions development team. 

* <a href="https://twitter.com/mhuber84">@mhuber84</a>
* mail@marco-huber.de
* marco.huber@bgm-gmbh.de
* <a href="http://typo3.bgm-gmbh.de">bgm Websolutions GmbH & Co. KG</a>

PhantomCSS was created by <a href="https://github.com/Huddle/PhantomCSS">James Cryer and the Huddle development team</a>.

Feel free to contribute and send in pull requests or create an issue.
