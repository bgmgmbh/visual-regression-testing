/**
 * The path for this testsuite below /tests/
 *
 * @type {string}
 * @private
 */
var _testsuiteDirectory = 'mtug-20160202';
/**
 * A title for your testsuite
 * @type {string}
 * @private
 */
var _testsuiteTitle = 'MTUG 02.02.2016';
/**
 * The viewport dimensions
 *
 * @type {number[]}
 * @private
 */
var _viewport = [1024, 768];

/**
 * Define the screenshots you want to take here.
 * The first parameter is a CSS selector, the second parameter is the filename.
 *
 * You can also define othere tests or actions to do, before taking the screenshot.
 */
function doTests() {
	casper
		.then(function doScreenshots() {
			phantomcss.screenshot('html', '0_fullpage');
			phantomcss.screenshot('header', '1_header');
			phantomcss.screenshot('#content', '2_content');
			phantomcss.screenshot('footer', '3_footer');
			phantomcss.screenshot('footer .footer-section', '3_footer_footer-section');
			phantomcss.screenshot('footer .meta-section', '3_footer_meta-section');
		});
}

/**
 * DO NOT CHANGE ANYTHING BELOW THIS LINE!
 */
//Include stuff
var fs = require('fs');
var phantomcss = require(fs.absolute(fs.workingDirectory + '/phantomcss.js'));

//Some parameters.
var _baselineImageSuffix = "";
var _diffImageSuffix = ".diff";
var _failImageSuffix = ".fail";
var _addLabelToFailedImage = false;
var _timeout = 30000;

//Get CLI parameters
var _baseUrl = casper.cli.get('baseUrl') ? casper.cli.get('baseUrl') : '/';
var _url = casper.cli.get('url');
var _testIdentifier;
if (casper.cli.get('testIdentifier')) {
	_testIdentifier = casper.cli.get('testIdentifier');
} else {
	_testIdentifier = (new Date()).toISOString();
}
var _urlCounter = casper.cli.get('urlCounter') ? casper.cli.get('urlCounter') : 1;
var _finishedTestsCounter = casper.cli.get('finishedTestsCounter') ? casper.cli.get('finishedTestsCounter') : 1;
var _disableNewBase = casper.cli.get('disableNewBase') ? true : false;

//Paths
var _testDirectory = fs.workingDirectory + fs.separator + 'tests' + fs.separator + _testsuiteDirectory;
var _screenshotRoot = fs.absolute(_testDirectory + fs.separator + 'comparisonBase' + (_url ? fs.separator + _url : ''));
var _comparisonResultRoot = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + (_url ? fs.separator + _url : ''));
var _failedComparisonsRoot = fs.absolute(_testDirectory + fs.separator + 'comparisonFailures' + fs.separator + _testIdentifier + (_url ? fs.separator + _url : ''));
var _executedComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'executedComparisons.log');
var _executedComparisonsCounterLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'executedComparisonsCounter.log');
var _failedComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'failedComparisons.log');
var _passedComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'passedComparisons.log');
var _timedoutComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'timedoutComparisons.log');
var _newComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'newComparisons.log');
var _casperTimedoutLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'casperTimedout.log');
var _screenshotCaptureFailedLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'screenshotCaptureFailed.log');

casper.test.begin(_testsuiteTitle + ' tests for "' + _baseUrl + _url + '"', function (test) {

	casper.options.stepTimeout = _timeout;
	casper.options.timeout = _timeout;
	casper.options.waitTimeout = _timeout;
	casper.options.retryTimeout = 20;
	casper.options.onStepTimeout = function onStepTimeout(timeout, stepNum) {
		var content = '';
		if (fs.isFile(_casperTimedoutLog)) {
			content += "\n";
		} else {
			fs.touch(_casperTimedoutLog);
		}
		content += _baseUrl + _url + '|stepTimeout';
		fs.write(_casperTimedoutLog, content, 'a');

		casper.die("Maximum step execution timeout exceeded for step " + stepNum);
	};
	casper.options.onTimeout = function onTimeout(timeout) {
		var content = '';
		if (fs.isFile(_casperTimedoutLog)) {
			content += "\n";
		} else {
			fs.touch(_casperTimedoutLog);
		}
		content += _baseUrl + _url + '|scriptTimeout';
		fs.write(_casperTimedoutLog, content, 'a');

		casper.die(f("Script timeout of %dms reached, exiting.", timeout));
	};
	casper.options.onWaitTimeout = function onWaitTimeout(timeout) {
		var content = '';
		if (fs.isFile(_casperTimedoutLog)) {
			content += "\n";
		} else {
			fs.touch(_casperTimedoutLog);
		}
		content += _baseUrl + _url + '|waitTimeout';
		fs.write(_casperTimedoutLog, content, 'a');

		casper.die(f("Wait timeout of %dms expired, exiting.", timeout));
	};

	phantomcss.init({
		casper: casper,
		screenshotRoot: _screenshotRoot,
		comparisonResultRoot: _comparisonResultRoot,
		failedComparisonsRoot: _failedComparisonsRoot,
		baselineImageSuffix: _baselineImageSuffix,
		diffImageSuffix: _diffImageSuffix,
		failImageSuffix: _failImageSuffix,
		addLabelToFailedImage: _addLabelToFailedImage,
		waitTimeout: _timeout,
		disableNewBase: _disableNewBase,
		fileNameGetter: function fileNameGetter (root, fileName) {
			var name;
			fileName = fileName || "screenshot";

			name = root + fs.separator + fileName;

			if (_isFile(name + _baselineImageSuffix + '.png')) {
				return name + _diffImageSuffix + '.png';
			} else {
				return name + _baselineImageSuffix + '.png';
			}
		},
		onPass: function onPass (test) {
			var content = '';
			if (fs.isFile(_passedComparisonsLog)) {
				content += "\n";
			} else {
				fs.touch(_passedComparisonsLog);
			}
			content += test.filename;
			fs.write(_passedComparisonsLog, content, 'a');

			console.log('\n');
			casper.test.pass('No changes found for screenshot ' + test.filename);
		},
		onFail: function onFail (test) {
			var content = '';
			if (fs.isFile(_failedComparisonsLog)) {
				content += "\n";
			} else {
				fs.touch(_failedComparisonsLog);
			}
			content += test.filename + '|' + test.mismatch;
			fs.write(_failedComparisonsLog, content, 'a');

			console.log('\n');
			casper.test.fail('Visual change found for screenshot ' + test.filename + ' (' + test.mismatch + '% mismatch)');
		},
		onTimeout: function onTimeout (test) {
			var content = '';
			if (fs.isFile(_timedoutComparisonsLog)) {
				content += "\n";
			} else {
				fs.touch(_timedoutComparisonsLog);
			}
			content += test.filename;
			fs.write(_timedoutComparisonsLog, content, 'a');

			console.log('\n');
			casper.test.info('Could not complete image comparison for ' + test.filename);
		},
		onNewImage: function onNewImage (test) {
			var content = '';
			if (fs.isFile(_newComparisonsLog)) {
				content += "\n";
			} else {
				fs.touch(_newComparisonsLog);
			}
			content += test.filename;
			fs.write(_newComparisonsLog, content, 'a');

			console.log('\n');
			casper.test.info('New screenshot at ' + test.filename);
		},
		onScreenshotCaptureFailed: function onScreenshotCaptureFailed (test, msg) {
			var content = '';
			if (fs.isFile(_screenshotCaptureFailedLog)) {
				content += "\n";
			} else {
				fs.touch(_screenshotCaptureFailedLog);
			}
			content += _baseUrl + _url + '|' + msg;
			fs.write(_screenshotCaptureFailedLog, content, 'a');

			console.log('\n');
			casper.test.info('Screenshot capture failed: ' + msg);
		}
	});

	casper
		.start()
		.viewport(_viewport[0], _viewport[1])
		.thenOpen(_baseUrl + _url);

	doTests();

	casper
		.then(function compareScreenshots() {
			phantomcss.compareAll();
		})
		.run(function () {
			var content = '';
			if (!fs.isFile(_executedComparisonsCounterLog)) {
				fs.touch(_executedComparisonsCounterLog);
			}
			fs.write(_executedComparisonsCounterLog, _finishedTestsCounter + '/' + _urlCounter, 'w');

			var content = '';
			if (fs.isFile(_executedComparisonsLog)) {
				content += "\n";
			} else {
				fs.touch(_executedComparisonsLog);
			}
			content += _baseUrl + _url;
			fs.write(_executedComparisonsLog, content, 'a');

			console.log('\nTHE END.');
			casper.test.done();
		});
} );

function _isFile(path) {
	var exists = false;
	try {
		exists = fs.isFile(path);
	} catch (e) {
		if (e.name !== 'NS_ERROR_FILE_TARGET_DOES_NOT_EXIST' && e.name !== 'NS_ERROR_FILE_NOT_FOUND') {
			// We weren't expecting this exception
			throw e;
		}
	}
	return exists;
}