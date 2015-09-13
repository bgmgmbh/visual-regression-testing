#!/bin/bash

baseUrl=$1
urlList=$2
testIdentifier=$(date +"%Y-%m-%d_%H-%M-%S")
urlCounter=$(grep -v '^#' "$urlList" | wc -l)
finishedTestsCounter=0

echo "URLs to test: $urlCounter";
echo ""
grep -v '^#' "$urlList"| while IFS=$'\n' read urlToTest; do
	finishedTestsCounter=$(($finishedTestsCounter + 1));

	node_modules/casperjs/bin/casperjs test tests/demo2/testsuite.js --baseUrl="$baseUrl" --url="$urlToTest" --testIdentifier="$testIdentifier" --urlCounter="$urlCounter" --finishedTestsCounter="$finishedTestsCounter" < /dev/null

	#PHANTOMJS_EXECUTABLE=node_modules/phantomjs/bin/phantomjs node_modules/casperjs/bin/casperjs test tests/demo2/testsuite.js --baseUrl="$baseUrl" --url="$urlToTest" --testIdentifier="$testIdentifier" --urlCounter="$urlCounter" --finishedTestsCounter="$finishedTestsCounter" < /dev/null
	#SLIMERJS_EXECUTABLE=node_modules/slimerjs/bin/slimerjs node_modules/casperjs/bin/casperjs test tests/demo2/testsuite.js --baseUrl="$baseUrl" --url="$urlToTest" --testIdentifier="$testIdentifier" --urlCounter="$urlCounter" --finishedTestsCounter="$finishedTestsCounter" --engine="slimerjs" < /dev/null

	echo "Tested $finishedTestsCounter of $urlCounter URLs"
	echo ""
done
echo "All tests finished";