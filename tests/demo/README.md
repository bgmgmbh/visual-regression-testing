# Demo Visual Regression Testing

This is nearly the original demo wich comes with PhantomCSS

## Usage

To start the tests, execute this from the root folder of your Visual Regression Testing Base Distribution:

```
node_modules/casperjs/bin/casperjs test tests/demo/testsuite.js
```

If you get an error: `Fatal: [Errno 2] No such file or directory; did you install phantomjs?` then prepend the commands
above with `PHANTOMJS_EXECUTABLE=node_modules/phantomjs/bin/phantomjs` so that they look like
this:

```
PHANTOMJS_EXECUTABLE=node_modules/phantomjs/bin/phantomjs node_modules/casperjs/bin/casperjs test tests/demo/testsuite.js
```