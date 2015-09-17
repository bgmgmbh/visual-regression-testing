# Demo 2 Visual Regression Testing

This is a custom demo with some improvements.

Images are stored in a folder built from the URL.
Some Logs are written to comparisonResults/testIdentifier.

To process more than one URL, you should use the testsuite.sh script. Have a look at the needed parameters there.

## Usage

To start the tests, execute this from the root folder of your Visual Regression Testing Base Distribution:

```
# direct call
node_modules/casperjs/bin/casperjs test tests/demo2/testsuite.js --baseUrl="http://my.url/" --url="to/test"

# using a wrapper script to handle url lists is much more comfortable
# a "#" in the tests/demo2/urlList says: ignore this line
tests/demo2/testsuite.sh "http://my.url/" "tests/demo2/urlList"
```