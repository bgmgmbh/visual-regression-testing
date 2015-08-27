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
git clone ssh://git@gitlab.bgm-gmbh.de:20022/bgm/visual-regression-testing.git
cd visual-regression-testing
sudo npm install
```

### SlimerJS instead of PhantomJS

If you want to use SlimerJS instead of PhantomJS, you have install SlimerJS globally. So you have to execute
`sudo npm install -g slimerjs`.

If you switch from PhantomJS to SlimerJS you also have to create new comparisonBase-Images!

SlimerJS needs an X-Server or has to be executed with xvfb-run (http://docs.slimerjs.org/current/installation.html#having-a-headless-slimerjs).
But I haven't found out how this works with PhantomCSS, yet.

## Usage

Testsuites are located in `tests/`.

### Demo Testsuite

With this distribution comes a demo test. It is located in `tests/demo`. To run it execute:

	node_modules/casperjs/bin/casperjs test tests/demo/testsuite.js

### New Custom Testsuites

1. Create a subfolder `tests/mytest`
2. Create a `testfile.js` in `tests/mytest`

Each testsuite should be versionied in it's own git repository. So run `git init` in `tests/mytest` and commit and push
to a remote repository escpecially for this testsuite

### Existing Custom Testsuites

See the README in the subfolders of `tests/`.