var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require( path );
var testDirectory = fs.workingDirectory + fs.separator + 'tests' + fs.separator + 'demo';
var currentDate = new Date();

casper.test.begin( 'Coffee machine visual tests', function ( test ) {

	phantomcss.init( {
		casper: casper,
		screenshotRoot: fs.absolute(testDirectory + fs.separator + 'comparisonBase'),
		comparisonResultRoot: fs.absolute(testDirectory + fs.separator + 'comparisonResults' + fs.separator + currentDate.toISOString()),
		failedComparisonsRoot: fs.absolute(testDirectory + fs.separator + 'comparisonFailures' + fs.separator + currentDate.toISOString())
	} );

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );
	/*
		The test scenario
	*/
	casper.start(fs.absolute(testDirectory + fs.separator + 'coffeemachine.html'));

	casper.viewport( 1024, 768 );

	casper.then( function () {
		phantomcss.screenshot( '#coffee-machine-wrapper', 'open coffee machine button' );
	} );

	casper.then( function () {
		casper.click( '#coffee-machine-button' );

		// wait for modal to fade-in 
		casper.waitForSelector( '#myModal:not([style*="display: none"])',
			function success() {
				phantomcss.screenshot( '#myModal', 'coffee machine dialog' );
			},
			function timeout() {
				casper.test.fail( 'Should see coffee machine' );
			}
		);
	} );

	casper.then( function () {
		casper.click( '#cappuccino-button' );
		phantomcss.screenshot( '#myModal', 'cappuccino success' );
	} );

	casper.then( function () {
		casper.click( '#close' );

		// wait for modal to fade-out
		casper.waitForSelector( '#myModal[style*="display: none"]',
			function success() {
				phantomcss.screenshot( {
					'Coffee machine close success': {
						selector: '#coffee-machine-wrapper',
						ignore: '.selector'
					},
					'Coffee machine button success': '#coffee-machine-button'
				} );
			},
			function timeout() {
				casper.test.fail( 'Should be able to walk away from the coffee machine' );
			}
		);
	} );

	casper.then( function now_check_the_screenshots() {
		// compare screenshots
		phantomcss.compareAll();
	} );

	/*
	Casper runs tests
	*/
	casper.run( function () {
		console.log( '\nTHE END.' );
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );
} );
