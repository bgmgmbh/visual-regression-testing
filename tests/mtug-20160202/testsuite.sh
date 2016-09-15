#!/bin/bash

baseUrl=$1
urlList=$2
testIdentifier=$3
disableNewBase=$4

testIdentifier=$(date +"%Y-%m-%d_%H-%M-%S")"_"$testIdentifier
urlCounter=$(grep -v '^#' "$urlList" | wc -l)
finishedTestsCounter=0

echo "URLs to test: $urlCounter";
echo ""
grep -v '^#' "$urlList"| while IFS=$'\n' read urlToTest; do
	finishedTestsCounter=$(($finishedTestsCounter + 1));

	#node_modules/casperjs/bin/casperjs test tests/mtug-20160202/testsuite.js --baseUrl="$baseUrl" --url="$urlToTest" --testIdentifier="$testIdentifier" --urlCounter="$urlCounter" --finishedTestsCounter="$finishedTestsCounter" --disableNewBase="$disableNewBase" < /dev/null

	#node_modules/casperjs/bin/casperjs --verbose="true" --log-level="debug" test tests/mtug-20160202/testsuite.js --baseUrl="$baseUrl" --url="$urlToTest" --testIdentifier="$testIdentifier" --urlCounter="$urlCounter" --finishedTestsCounter="$finishedTestsCounter" --disableNewBase="$disableNewBase" < /dev/null

	PHANTOMJS_EXECUTABLE=node_modules/phantomjs-prebuilt/bin/phantomjs node_modules/casperjs/bin/casperjs test tests/mtug-20160202/testsuite.js --baseUrl="$baseUrl" --url="$urlToTest" --testIdentifier="$testIdentifier" --urlCounter="$urlCounter" --finishedTestsCounter="$finishedTestsCounter" --disableNewBase="$disableNewBase" < /dev/null
	#SLIMERJS_EXECUTABLE=node_modules/slimerjs/bin/slimerjs node_modules/casperjs/bin/casperjs test tests/mtug-20160202/testsuite.js --baseUrl="$baseUrl" --url="$urlToTest" --testIdentifier="$testIdentifier" --urlCounter="$urlCounter" --finishedTestsCounter="$finishedTestsCounter" --disableNewBase="$disableNewBase" --engine="slimerjs" < /dev/null

	echo "Tested $finishedTestsCounter of $urlCounter URLs"
	echo ""
done
echo "All tests finished";
