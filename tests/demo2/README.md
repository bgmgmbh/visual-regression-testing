# Demo 2 Visual Regression Testing

## Installation

1. Install the Visual Regression Testing Base Distribution. You can find it here: 
https://gitlab.bgm-gmbh.de/bgm/visual-regression-testing. Follow the install intructions in it's README.

## Usage

To start the tests, execute this from the root folder of your Visual Regression Testing Base Distribution:

```
#direct call
node_modules/casperjs/bin/casperjs test tests/demo2/testsuite.js --baseUrl="http://my.url/" --url="to/test"

#using a wrapper script to handle url lists
# a "#" in the path/to/file/with/urls says: ignore this line
tests/demo2/testsuite.sh "http://my.url/" "path/to/file/with/urls"
```