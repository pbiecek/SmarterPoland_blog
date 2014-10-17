/*
===========================================================================
EL DIARIO
Handler Wrappers and Callback functions

${desc}
===========================================================================
*/



/*
=============
EDI.handlers

Main Handlers object
=============
*/

Namespace.Register("EDI.handlers");
Namespace.Register("EDI.handlers.env");
Namespace.Register("EDI.handlers.services");
Namespace.Register("EDI.handlers.services.twitter");
Namespace.Register("EDI.handlers.search");
Namespace.Register("EDI.handlers.mediaembed");
Namespace.Register("EDI.handlers.mediaembed.videoPlayer");
Namespace.Register("EDI.handlers.mediaembed.audioPlayer");




/*
=============
EDI.handlers.env
Dev environment
["STC" | "PRJ"], statics | project
=============
*/

EDI.handlers.env = "STC";




/*
=============
EDI.handlers.services

Third Party APIS and social media handlers
=============
*/


/**
 * EDI.handlers.services.twitter
 */

// Twitter Widget (setup)
EDI.handlers.services.twitter.setup = {

	user: 'eldiarioes',
	cfg : {
		// id: id,
		version: 2,
		type: 'profile',
		rpp: 3,
		interval: 30000,
		width: 291,
		height: 300,
		theme: {
			shell: {
				background: '#00ABEE',
				color: '#FFFFFF'
			},
			tweets: {
				background: '#FFFFFF',
				color: '#333333',
				links: '#149BE1'
			}
		},
		features: {
			scrollbar: true,
			loop: false,
			live: true,
			behavior: 'default'
		}
	}
};


// Twitter Widget (init)
EDI.handlers.services.twitter.init = function() {

	var $twitterWidgets = jQuery(".wgt-twt");

	if ( $twitterWidgets.length ) {

		jQuery.getScript('http://widgets.twimg.com/j/2/widget.js', function() {

			BBT.log("Twitter widgets script loaded!");

			var cfg = EDI.handlers.services.twitter.setup['cfg'],
			    usr = EDI.handlers.services.twitter.setup['user'];

			$twitterWidgets.each(function(i, el) {
				var $widget = jQuery(el),
					thisId  = $widget.attr("id");

				cfg.id = thisId;

				try {
					var twitterWidget = new TWTR.Widget(cfg).setUser(usr);
					twitterWidget.render().start();
					BBT.log("Twitter widget " + (i+1) + " rendered!");
				}
				catch (ex) {
					BBT.log("Twitter widget " + (i+1) + " render FAILURE!" + "(" + ex + ")");
				}
			});
		});
	}
};


// Twitter Widget asynchronous load method (load)
EDI.handlers.services.twitter.load = function() {

	// IE: twitter widgets doesn't load Twitter CSS if window load o doc ready is used
	if (jQuery.browser.msie) {
		EDI.handlers.services.twitter.init();
	}
	else {
		jQuery(window).load(function() {
			EDI.handlers.services.twitter.init();
		});
	}
};




/*
=============
EDI.handlers.search

Search Handlers
=============
*/

// Main Search Handler
EDI.handlers.search.main = function(jObj, data) {

	BBT.log("entra en handler Main Search");
	BBT.log(data);

	FBSE.simpleSearchForm(jObj, {
		hint: 'Buscar',
		searchField : "#mainSearchField",
		submit : true,
		submitButton : ".bt-submit"
	});

	// place here your stuff if proceed...

};


// Advanced Search Handler
EDI.handlers.search.advanced = function(jObj, data) {
	BBT.log("entra en handler Advanced Search");
	// BBT.log(jObj);
	BBT.log(data);

	// place here your stuff if proceed...
};




/*
=============
EDI.handlers.mediaembed

MediaEmbed Handlers
=============
*/

// Main video player settings (flashvars)
EDI.handlers.mediaembed.videoPlayer.settings = function(o) {

	var settings = {
		player: o.player,
		// player: 'site/public/swf/mediaplayer/videoPlayer.swf',
		flashvars: {
			titulo: o.title,
			w: o.width,
			h: o.height,
			flv: o.video,
			thumb: o.snapshot,
			skinPath: o.skinPath,
			// skinPath: 'site/public/swf/mediaplayer/videoSkins/',
			skin: 'genericFull'
		}
	};

	return settings;
};


// Main Audio player settings (flashvars)
EDI.handlers.mediaembed.audioPlayer.settings = function(o) {

	var settings = {
		player: o.player,
		// player: 'site/public/swf/mediaplayer/audioPlayer.swf',
		flashvars: {
			w: o.width,
			h: o.height,
			mp3: o.audio,
			skinPath: o.skinPath,
			// skinPath: 'site/public/swf/mediaplayer/audioSkins/',
			skin: 'genericFull'
		}
	};

	return settings;
};




/* EOF */