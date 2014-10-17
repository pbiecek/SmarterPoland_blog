/**
 * EL DIARIO
 * 
 * GENERAL INITS
 * Place here general inits.
 * Reccomended place this file at the end of document, before close body tag
 * 
 */




/**
 * ---------------------------------------------------------------
 * STATIC CONSTRUCTS
 * ---------------------------------------------------------------
 */

// jObjects Selectors lookup
EDI.$jObj = {
	root:            ' #main ',
	content:         ' #content ',
	stickyAds:       ' #stickyAd_left, #stickyAd_right ',
	lazy_imgs:       ' img.lazy ',
	links_external:  ' a[rel="external"] ',
	reveal:          ' .info-reveal ',
	hintables:       ' .hintable ',
	sizableText:     ' .mce-body * ',
	showcaseBelts:   ' *[id^=showcaseBelt] '
};


// queryze lookup
jQuery.each( EDI.$jObj, function(key, sel) {
	EDI.$jObj[key] = jQuery(sel);
});



/**
 * ---------------------------------------------------------------
 * Deferred Init Stuff (direct)
 * ---------------------------------------------------------------
 */


// INIT: Equalize columns
/*
if ( EDI.$jObj['root'].length ) {
	FBSE.equalizeBlocks( $root, {column: ['.eqBlock']} ); // I's possible to pass an array of selectors (stacking)
}
*/


// INIT: Lazy load images
if ( EDI.$jObj['lazy_imgs'].length ) {
	EDI.$jObj['lazy_imgs'].lazyload({
		event: "scrollstop", // trigger custom event scrollstop when gazillion images
		failure_limit: 35,   // non sequential layouts must increase this value
		effect : "fadeIn"
	});
}


// INIT: sticky Ads */
if ( EDI.$jObj['stickyAds'].length ) {
	EDI.$jObj['stickyAds'].stickyfloat({duration: 250});
}


// INIT: external links handler
if ( EDI.$jObj['links_external'].length ) {
	EDI.utils.handleAnchorLinks.external( EDI.$jObj['links_external'] );
}


// INIT: reveal
if ( EDI.$jObj['reveal'].length ) {
	EDI.$jObj['reveal'].each(function(i, el) {
		var jObj = jQuery(el);
		EDI.utils.reveal(jObj);
	});

}

// INIT: basic hintable inputs
if ( EDI.$jObj['hintables'].length ) {
	var hintables = EDI.$jObj['hintables'].filter('input[title][type="text"], input[title][type="textarea"]');
	hintables.hint();
}


// INIT: Font Text Resizer
if ( EDI.$jObj['sizableText'].length
     && EDI.$jObj['content'].length
   ) {

	FBSE.fontSizer( EDI.$jObj['content'], EDI.$jObj['sizableText'], {
			buttonIncrease : ".tx-increase",
			buttonDecrease : ".tx-decrease"
		}
	);
}


// INIT: showcase belts modules
if ( EDI.$jObj['showcaseBelts'].length ) {
	// init every belt instance
	EDI.$jObj['showcaseBelts'].each(function(i, el) {
		var jObj = jQuery(el);
		EDI.modules.showcase.init(jObj);
	});
}


// Twitter Widgets API Load
EDI.handlers.services.twitter.load();




/**
 * ---------------------------------------------------------------
 * On Document Ready Init Stuff
 * ---------------------------------------------------------------
 */

jQuery(function(){

	// disable text selection on target selectors
	jQuery('.noSelect').disableTextSelect();

	// IE7-8: redraw issue (due to the flickering) and caret input cursor blinking
	// if ( jQuery.browser.msie ) document.execCommand("BackgroundImageCache", false, true);

});



/* EOF */