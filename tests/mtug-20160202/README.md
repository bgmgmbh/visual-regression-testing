# MTUG 02.02.2016 - Visual Regression Testing

This is MTUG 02.02.2016 testsuite.

Images are stored in a folder built from the URL.
Some Logs are written to comparisonResults/testIdentifier.

To process more than one URL, you should use the testsuite.sh script. Have a look at the needed parameters there.


## Usage

To start the tests, execute this from the root folder of your Visual Regression Testing Base Distribution:

```
# Direct call:
# --disableNewBase is optional
node_modules/casperjs/bin/casperjs test tests/mtug-20160202/testsuite.js --baseUrl="http://development7.bgm.projects.localhost/" --url="features" --disableNewBase="true"

# Using a wrapper script to handle url lists is much more comfortable.
# A "#" in the tests/mtug-20160202/urlList says: ignore this line.
# first parameter: baseUrl - the urls from the urlList are prepended with this base url.
# second parameter: urlList - path to a list with urls to test.
# third parameter: testIdentifier - a speaking name for this test. It get's prepended with the current date and time. Use only chars wich are allowed as directory name.
# fourth parameter: disableNewBase (optional) - normally a base image gets created, if none is found. You can prevent this behaviour with setting this parameter.
tests/mtug-20160202/testsuite.sh "http://development7.bgm.projects.localhost/" "tests/mtug-20160202/urlList" myidentifier yes
```