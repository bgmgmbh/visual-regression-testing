var _testsuiteDirectory = 'demo2';
var _testsuiteTitle = 'Demo 2';
var _baselineImageSuffix = "";
var _diffImageSuffix = ".diff";
var _failImageSuffix = ".fail";
var _addLabelToFailedImage = false;


/**
 * DO NOT CHANGE ANYTHING BELOW THIS LINE!
 */
//Include stuff
var fs = require('fs');
var phantomcss = require(fs.absolute(fs.workingDirectory + '/phantomcss.js'));

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

//Paths
var _testDirectory = fs.workingDirectory + fs.separator + 'tests' + fs.separator + _testsuiteDirectory;
var _screenshotRoot = fs.absolute(_testDirectory + fs.separator + 'comparisonBase' + (_url ? fs.separator + _url : ''));
var _comparisonResultRoot = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + (_url ? fs.separator + _url : ''));
var _failedComparisonsRoot = fs.absolute(_testDirectory + fs.separator + 'comparisonFailures' + fs.separator + _testIdentifier + (_url ? fs.separator + _url : ''));
var _executedComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'executedComparisons.log');
var _failedComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'failedComparisons.log');
var _passedComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'passedComparisons.log');
var _timedoutComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'timedoutComparisons.log');
var _newComparisonsLog = fs.absolute(_testDirectory + fs.separator + 'comparisonResults' + fs.separator + _testIdentifier + fs.separator + 'newComparisons.log');

casper.test.begin(_testsuiteTitle + ' tests for "' + _url + '"', function (test) {

	phantomcss.init({
		casper: casper,
		screenshotRoot: _screenshotRoot,
		comparisonResultRoot: _comparisonResultRoot,
		failedComparisonsRoot: _failedComparisonsRoot,
		baselineImageSuffix: _baselineImageSuffix,
		diffImageSuffix: _diffImageSuffix,
		failImageSuffix: _failImageSuffix,
		addLabelToFailedImage: _addLabelToFailedImage,
		fileNameGetter: function (root, fileName) {
			var name;
			fileName = fileName || "screenshot";

			name = root + fs.separator + fileName;

			if (_isFile(name + _baselineImageSuffix + '.png')) {
				return name + _diffImageSuffix + '.png';
			} else {
				return name + _baselineImageSuffix + '.png';
			}
		},
		onPass: function (test) {
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
		onFail: function (test) {
			var content = '';
			if (fs.isFile(_failedComparisonsLog)) {
				content += "\n";
			} else {
				fs.touch(_failedComparisonsLog);
			}
			content += test.filename;
			fs.write(_failedComparisonsLog, content, 'a');

			console.log('\n');
			casper.test.fail('Visual change found for screenshot ' + test.filename + ' (' + test.mismatch + '% mismatch)');
		},
		onTimeout: function (test) {
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
		onNewImage: function (test) {
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
		}
	});

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );

	casper
		.start()
		.viewport(1024, 768)
		.thenOpen(_baseUrl + _url)
		.then(function () {
			phantomcss.screenshot('html', '0_fullpage');
		})
		.then(function () {
			phantomcss.screenshot('header', '1_header');
		})
		.then(function () {
			phantomcss.screenshot('#content', '2_content');
		})
		.then(function () {
			phantomcss.screenshot('footer', '3_footer');
		})
		.then(function () {
			phantomcss.screenshot('footer .footer-section', '3_footer_footer-section');
		})
		.then(function () {
			phantomcss.screenshot('footer .meta-section', '3_footer_meta-section');
		})
		.then(function now_check_the_screenshots() {
			phantomcss.compareAll();
		})
		.run(function () {
			var content = '';
			if (!fs.isFile(_executedComparisonsLog)) {
				fs.touch(_executedComparisonsLog);
			}
			fs.write(_executedComparisonsLog, _finishedTestsCounter + '/' + _urlCounter, 'w');

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