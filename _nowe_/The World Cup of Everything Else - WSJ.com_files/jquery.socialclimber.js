/*!
 * Socialite v2.0
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 *
 * Modified by Sarah Squire
 *  -Added intent option to only load scripts
 *  -Set default lang to en_US
 *  -Disabled unused widgets and included (but disabled) Pinterest extension
 * Added SocialClimber plugin (below)
 */
window.Socialite = (function(window, document, undefined)
{
    'use strict';

    var uid       = 0,
        instances = [ ],
        networks  = { },
        widgets   = { },
        rstate    = /^($|loaded|complete)/,
        euc       = window.encodeURIComponent;

    var socialite = {

        settings: { },

        trim: function(str)
        {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
        },

        hasClass: function(el, cn)
        {
            return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
        },

        addClass: function(el, cn)
        {
            if (!socialite.hasClass(el, cn)) {
                el.className = (el.className === '') ? cn : el.className + ' ' + cn;
            }
        },

        removeClass: function(el, cn)
        {
            el.className = socialite.trim(' ' + el.className + ' '.replace(' ' + cn + ' ', ' '));
        },

        /**
         * Copy properties of one object to another
         */
        extendObject: function(to, from, overwrite)
        {
            for (var prop in from) {
                var hasProp = to[prop] !== undefined;
                if (hasProp && typeof from[prop] === 'object') {
                    socialite.extendObject(to[prop], from[prop], overwrite);
                } else if (overwrite || !hasProp) {
                    to[prop] = from[prop];
                }
            }
        },

        /**
         * Return elements with a specific class
         *
         * @param context - containing element to search within
         * @param cn      - class name to search for
         *
         */
        getElements: function(context, cn)
        {
            // copy to a new array to avoid a live NodeList
            var i   = 0,
                el  = [ ],
                gcn = !!context.getElementsByClassName,
                all = gcn ? context.getElementsByClassName(cn) : context.getElementsByTagName('*');
            for (; i < all.length; i++) {
                if (gcn || socialite.hasClass(all[i], cn)) {
                    el.push(all[i]);
                }
            }
            return el;
        },

        /**
         * Return data-* attributes of element as a query string (or object)
         *
         * @param el       - the element
         * @param noprefix - (optional) if true, remove "data-" from attribute names
         * @param nostr    - (optional) if true, return attributes in an object
         *
         */
        getDataAttributes: function(el, noprefix, nostr)
        {
            var i    = 0,
                str  = '',
                obj  = { },
                attr = el.attributes;
            for (; i < attr.length; i++) {
                var key = attr[i].name,
                    val = attr[i].value;
                if (val.length && key.indexOf('data-') === 0) {
                    if (noprefix) {
                        key = key.substring(5);
                    }
                    if (nostr) {
                        obj[key] = val;
                    } else {
                        str += euc(key) + '=' + euc(val) + '&';
                    }
                }
            }
            return nostr ? obj : str;
        },

        /**
         * Copy data-* attributes from one element to another
         *
         * @param from     - element to copy from
         * @param to       - element to copy to
         * @param noprefix - (optional) if true, remove "data-" from attribute names
         * @param nohyphen - (optional) if true, convert hyphens to underscores in the attribute names
         *
         */
        copyDataAttributes: function(from, to, noprefix, nohyphen)
        {
            // `nohyphen` was needed for Facebook's <fb:like> elements - remove as no longer used?
            var attr = socialite.getDataAttributes(from, noprefix, true);
            for (var i in attr) {
                to.setAttribute(nohyphen ? i.replace(/-/g, '_') : i, attr[i]);
            }
        },

        /**
         * Create iframe element
         *
         * @param src      - iframe URL (src attribute)
         * @param instance - (optional) socialite instance to activate on iframe load
         *
         */
        createIframe: function(src, instance)
        {
            // Socialite v2 has slashed the amount of manual iframe creation, we should aim to avoid this entirely
            var iframe = document.createElement('iframe');
            iframe.style.cssText = 'overflow: hidden; border: none;';
            socialite.extendObject(iframe, { src: src, allowtransparency: 'true', frameborder: '0', scrolling: 'no' }, true);
            if (instance) {
                iframe.onload = iframe.onreadystatechange = function ()
                {
                    if (rstate.test(iframe.readyState || '')) {
                        iframe.onload = iframe.onreadystatechange = null;
                        socialite.activateInstance(instance);
                    }
                };
            }
            return iframe;
        },

        /**
         * Returns true if network script has loaded
         */
        networkReady: function(name)
        {
            return networks[name] ? networks[name].loaded : undefined;
        },

        /**
         * Append network script to the document
         */
        appendNetwork: function(network)
        {
            // the activation process is getting a little confusing for some networks
            // it would appear a script load event does not mean its global object exists yet
            // therefore the first call to `activateAll` may have no effect whereas the second call does, e.g. via `window.twttr.ready`

            if (!network || network.appended) {
                return;
            }
            // `network.append` and `network.onload` can cancel progress
            if (typeof network.append === 'function' && network.append(network) === false) {
                network.appended = network.loaded = true;
                socialite.activateAll(network);
                return;
            }

            if (network.script) {
                network.el = document.createElement('script');
                socialite.extendObject(network.el, network.script, true);
                network.el.async = true;
                network.el.onload = network.el.onreadystatechange = function()
                {
                    if (rstate.test(network.el.readyState || '')) {
                        network.el.onload = network.el.onreadystatechange = null;
                        network.loaded = true;
                        if (typeof network.onload === 'function' && network.onload(network) === false) {
                            return;
                        }
                        socialite.activateAll(network);
                    }
                };
                document.body.appendChild(network.el);
            }
            network.appended = true;
        },

        /**
         * Remove network script from the document
         */
        removeNetwork: function(network)
        {
            if (!socialite.networkReady(network.name)) {
                return false;
            }
            if (network.el.parentNode) {
                network.el.parentNode.removeChild(network.el);
            }
            return !(network.appended = network.loaded = false);
        },

        /**
         * Remove and re-append network script to the document
         */
        reloadNetwork: function(name)
        {
            // This is a last-ditch effort for half-baked scripts
            var network = networks[name];
            if (network && socialite.removeNetwork(network)) {
                socialite.appendNetwork(network);
            }
        },

        /**
         * Create new Socialite instance
         *
         * @param el     - parent element that will hold the new instance
         * @param widget - widget the instance belongs to
         *
         */
        createInstance: function(el, widget)
        {
            var proceed  = true,
                instance = {
                    el      : el,
                    uid     : uid++,
                    widget  : widget
                };
            instances.push(instance);
            if (widget.process !== undefined) {
                proceed = (typeof widget.process === 'function') ? widget.process(instance) : false;
            }
            if (proceed) {
                socialite.processInstance(instance);
            }
            instance.el.setAttribute('data-socialite', instance.uid);
            instance.el.className = 'socialite ' + widget.name + ' socialite-instance';
            return instance;
        },

        /**
         * Process a socialite instance to an intermediate state prior to load
         */
        processInstance: function(instance)
        {
            var el = instance.el;
            instance.el = document.createElement('div');
            instance.el.className = el.className;
            socialite.copyDataAttributes(el, instance.el);
            // stop over-zealous scripts from activating all instances
            if (el.nodeName.toLowerCase() === 'a' && !el.getAttribute('data-default-href')) {
                instance.el.setAttribute('data-default-href', el.getAttribute('href'));
            }
            var parent = el.parentNode;
            parent.insertBefore(instance.el, el);
            parent.removeChild(el);
        },

        /**
         * Activate a socialite instance
         */
        activateInstance: function(instance)
        {
            if (instance && !instance.loaded) {
                instance.loaded = true;
                if (typeof instance.widget.activate === 'function') {
                    instance.widget.activate(instance);
                }
                socialite.addClass(instance.el, 'socialite-loaded');
                return instance.onload ? instance.onload(instance.el) : null;
            }
        },

        /**
         * Activate all socialite instances belonging to a network
         */
        activateAll: function(network)
        {
            if (typeof network === 'string') {
                network = networks[network];
            }
            for (var i = 0; i < instances.length; i++) {
                var instance = instances[i];
                if (instance.init && instance.widget.network === network) {
                    socialite.activateInstance(instance);
                }
            }
        },

        /**
         * Load socialite instances
         *
         * @param context - (optional) containing element to search within
         * @param el      - (optional) individual or an array of elements to load
         * @param w       - (optional) widget name
         * @param onload  - (optional) function to call after each socialite instance has loaded
         * @param process - (optional) process but don't load network (if true)
         *
         */
        load: function(context, el, w, onload, process)
        {
            // use document as context if unspecified
            context = (context && typeof context === 'object' && context.nodeType === 1) ? context : document;

            // if no elements search within the context and recurse
            if (!el || typeof el !== 'object') {
                socialite.load(context, socialite.getElements(context, 'socialite'), w, onload, process);
                return;
            }

            var i;

            // if array of elements load each one individually
            if (/Array/.test(Object.prototype.toString.call(el))) {
                for (i = 0; i < el.length; i++) {
                    socialite.load(context, el[i], w, onload, process);
                }
                return;
            }

            // nothing was found...
            if (el.nodeType !== 1) {
                return;
            }

            // if widget name not specified search within the element classes
            if (!w || !widgets[w]) {
                w = null;
                var classes = el.className.split(' ');
                for (i = 0; i < classes.length; i++) {
                    if (widgets[classes[i]]) {
                        w = classes[i];
                        break;
                    }
                }
                if (!w) {
                    return;
                }
            }

            // find or create the Socialite instance
            var instance,
                widget = widgets[w],
                sid    = parseInt(el.getAttribute('data-socialite'), 10);
            if (!isNaN(sid)) {
                for (i = 0; i < instances.length; i++) {
                    if (instances[i].uid === sid) {
                        instance = instances[i];
                        break;
                    }
                }
            } else {
                instance = socialite.createInstance(el, widget);
            }

            // return if just processing (or no instance found)
            if (process || !instance) {
                return;
            }

            // initialise the instance
            if (!instance.init) {
                instance.init = true;
                instance.onload = (typeof onload === 'function') ? onload : null;
                widget.init(instance);
            }

            // append the parent network (all instances will be activated onload)
            // or activate immediately if network has already loaded
            if (!widget.network.appended) {
                socialite.appendNetwork(widget.network);
            } else {
                if (socialite.networkReady(widget.network.name)) {
                    socialite.activateInstance(instance);
                }
            }
        },

        /**
         * Load a single element
         *
         * @param el     - an individual element
         * @param w      - (optional) widget for this socialite instance
         * @param onload - (optional) function to call once each instance has loaded
         *
         */
        activate: function(el, w, onload)
        {
            // skip the first few steps
            window.Socialite.load(null, el, w, onload);
        },

        /**
         * Process elements to an intermediate state prior to load
         *
         * @param context - containing element to search within
         * @param el      - (optional) individual or an array of elements to load
         * @param w       - (optional) widget name
         *
         */
        process: function(context, el, w)
        {
            // stop before widget initialises instance
            window.Socialite.load(context, el, w, null, true);
        },

        /**
         * Add a new social network
         *
         * @param name   - unique name for network
         * @param params - additional data and callbacks
         *
         */
        network: function(n, params)
        {
            networks[n] = {
                name     : n,
                el       : null,
                appended : false,
                loaded   : false,
                widgets  : { }
            };
            if (params) {
                socialite.extendObject(networks[n], params);
            }
        },

        /**
         * Add a new social widget
         *
         * @param name   - name of owner network
         * @param w      - unique name for widget
         * @param params - additional data and callbacks
         *
         */
        widget: function(n, w, params)
        {
            params.name = n + '-' + w;
            if (!networks[n] || widgets[params.name]) {
                return;
            }
            params.network = networks[n];
            networks[n].widgets[w] = widgets[params.name] = params;
        },

        /**
         * Change the default Socialite settings for each network
         */
        setup: function(params)
        {
            socialite.extendObject(socialite.settings, params, true);
        }

    };

    return socialite;

})(window, window.document);

/**
 * Socialite Extensions - Pick 'n' Mix!
 */
(function(window, document, Socialite, undefined)
{

    // default to U.S. English
    Socialite.setup({
        facebook: {
            lang: 'en_US',
            appId: null
        },
        twitter: {
            lang: 'en'
        },
        googleplus: {
            lang: 'en-US'
        }
    });


    // Facebook
    // http://developers.facebook.com/docs/reference/plugins/like/
    // http://developers.facebook.com/docs/reference/javascript/FB.init/

    Socialite.network('facebook', {
        script: {
            src : '//connect.facebook.net/{{language}}/all.js',
            id  : 'facebook-jssdk'
        },
        append: function(network)
        {
            var fb       = document.createElement('div'),
                settings = Socialite.settings.facebook,
                events   = { onlike: 'edge.create', onunlike: 'edge.remove', onsend: 'message.send' };
            fb.id = 'fb-root';
            document.body.appendChild(fb);
            network.script.src = network.script.src.replace('{{language}}', settings.lang);
            window.fbAsyncInit = function() {
                window.FB.init({
                      appId: settings.appId,
                      xfbml: true,
                      status: true,
                      cookie: true
                });
                for (var e in events) {
                    if (typeof settings[e] === 'function') {
                        window.FB.Event.subscribe(events[e], settings[e]);
                    }
                }
            };
        }
    });

    Socialite.widget('facebook', 'like', {
        init: function(instance)
        {
            var el = document.createElement('div');
            el.className = 'fb-like';
            Socialite.copyDataAttributes(instance.el, el);
            instance.el.appendChild(el);
            if (window.FB && window.FB.XFBML) {
                window.FB.XFBML.parse(instance.el);
            }
        }
    });

    Socialite.widget('facebook', 'intent', { init: function(instance) {} });


    // Twitter
    // https://dev.twitter.com/docs/tweet-button/
    // https://dev.twitter.com/docs/intents/events/
    // https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSocial#twitter

    Socialite.network('twitter', {
        script: {
            src     : '//platform.twitter.com/widgets.js',
            id      : 'twitter-wjs',
            charset : 'utf-8'
        },
        append: function()
        {
            var notwttr  = (typeof window.twttr !== 'object'),
                settings = Socialite.settings.twitter,
                events   = ['click', 'tweet', 'retweet', 'favorite', 'follow'];
            if (notwttr) {
                window.twttr = (t = { _e: [], ready: function(f) { t._e.push(f); } });
            }
            window.twttr.ready(function(twttr)
            {
                for (var i = 0; i < events.length; i++) {
                    var e = events[i];
                    if (typeof settings['on' + e] === 'function') {
                        twttr.events.bind(e, settings['on' + e]);
                    }
                }
                Socialite.activateAll('twitter');
            });
            return notwttr;
        }
    });

    var twitterInit = function(instance)
    {
        var el = document.createElement('a');
        el.className = instance.widget.name + '-button';
        Socialite.copyDataAttributes(instance.el, el);
        el.setAttribute('href', instance.el.getAttribute('data-default-href'));
        el.setAttribute('data-lang', instance.el.getAttribute('data-lang') || Socialite.settings.twitter.lang);
        instance.el.appendChild(el);
    };

    var twitterActivate = function(instance)
    {
        if (window.twttr && typeof window.twttr.widgets === 'object' && typeof window.twttr.widgets.load === 'function') {
            window.twttr.widgets.load();
        }
    };

    Socialite.widget('twitter', 'share',   { init: twitterInit, activate: twitterActivate });
    //  Socialite.widget('twitter', 'follow',  { init: twitterInit, activate: twitterActivate });
    //  Socialite.widget('twitter', 'hashtag', { init: twitterInit, activate: twitterActivate });
    //  Socialite.widget('twitter', 'mention', { init: twitterInit, activate: twitterActivate });

    Socialite.widget('twitter', 'embed', {
        process: function(instance)
        {
            instance.innerEl = instance.el;
            if (!instance.innerEl.getAttribute('data-lang')) {
                instance.innerEl.setAttribute('data-lang', Socialite.settings.twitter.lang);
            }
            instance.el = document.createElement('div');
            instance.el.className = instance.innerEl.className;
            instance.innerEl.className = '';
            instance.innerEl.parentNode.insertBefore(instance.el, instance.innerEl);
            instance.el.appendChild(instance.innerEl);
        },
        init: function(instance)
        {
            instance.innerEl.className = 'twitter-tweet';
        },
        activate: twitterActivate
    });

    Socialite.widget('twitter', 'intent', { init: function(instance) {} });


    // Google+
    // https://developers.google.com/+/plugins/+1button/
    // Google does not support IE7

    Socialite.network('googleplus', {
        script: {
            src: '//apis.google.com/js/plusone.js'
        },
        append: function(network)
        {
            if (window.gapi) {
                return false;
            }
            window.___gcfg = {
                lang: Socialite.settings.googleplus.lang,
                parsetags: 'explicit'
            };
        }
    });

    var googleplusInit = function(instance)
    {
        var el = document.createElement('div');
        el.className = 'g-' + instance.widget.gtype;
        Socialite.copyDataAttributes(instance.el, el);
        instance.el.appendChild(el);
        instance.gplusEl = el;
    };

    var googleplusEvent = function(instance, callback) {
        return (typeof callback !== 'function') ? null : function(data) {
            callback(instance.el, data);
        };
    };

    var googleplusActivate = function(instance)
    {
        var type = instance.widget.gtype;
        if (window.gapi && window.gapi[type]) {
            var settings = Socialite.settings.googleplus,
                params   = Socialite.getDataAttributes(instance.el, true, true),
                events   = ['onstartinteraction', 'onendinteraction', 'callback'];
            for (var i = 0; i < events.length; i++) {
                params[events[i]] = googleplusEvent(instance, settings[events[i]]);
            }
            window.gapi[type].render(instance.gplusEl, params);
        }
    };

    Socialite.widget('googleplus', 'one',   { init: googleplusInit, activate: googleplusActivate, gtype: 'plusone' });
    //  Socialite.widget('googleplus', 'share', { init: googleplusInit, activate: googleplusActivate, gtype: 'plus' });
    //  Socialite.widget('googleplus', 'badge', { init: googleplusInit, activate: googleplusActivate, gtype: 'plus' });

    Socialite.widget('googleplus', 'intent', { init: function(instance) {} });

    // LinkedIn
    // http://developer.linkedin.com/plugins/share-button/

    Socialite.network('linkedin', {
        script: {
            src: '//platform.linkedin.com/in.js'
        }
    });

    var linkedinInit = function(instance)
    {
        var el = document.createElement('script');
        el.type = 'IN/' + instance.widget.intype;
        Socialite.copyDataAttributes(instance.el, el);
        instance.el.appendChild(el);
        if (typeof window.IN === 'object' && typeof window.IN.parse === 'function') {
            window.IN.parse(instance.el);
            Socialite.activateInstance(instance);
        }
    };

    Socialite.widget('linkedin', 'share',     { init: linkedinInit, intype: 'Share' });
    //  Socialite.widget('linkedin', 'recommend', { init: linkedinInit, intype: 'RecommendProduct' });

    Socialite.widget('linkedin', 'intent', { init: function(instance) {} });

    // Pinterest
    /*  http://pinterest.com/about/goodies/
        requires url, media, description. data-pin-do="buttonPin" data-pin-config="above" / "beside"
        class="socialite pinterest-pinit"
        http://business.pinterest.com/widget-builder/#do_pin_it_button
    */
    /*
        Socialite.network('pinterest', {
            script: {
                src: '//assets.pinterest.com/js/pinit.js'
            }
        });
    
        var pinterestInit = function(instance)
        {
            Socialite.processInstance(instance);
            var el = document.createElement('a');
            el.className = 'pin-it-button';
            Socialite.copyDataAttributes(instance.el, el);
            el.setAttribute('href', instance.el.getAttribute('data-default-href'));
            el.setAttribute('count-layout', instance.el.getAttribute('data-count-layout') || 'horizontal');
            instance.el.appendChild(el);
            if (Socialite.networkReady('pinterest')) {
                Socialite.reloadNetwork('pinterest');
            }
        };
    
        var pinterestProcess = function(instance)
        {
            // Pinterest activates all <a> elements with a href containing share URL
            // so we have to jump through hoops to protect each instance
            if (instance.el.nodeName.toLowerCase() !== 'a') {
                return true;
            }
            var id   = 'socialite-instance-' + instance.uid,
                href = instance.el.getAttribute('href');
            instance.el.id = id;
            instance.el.href = '#' + id;
            instance.el.setAttribute('data-default-href', href);
            instance.el.setAttribute('onclick', '(function(){window.open("' + href + '")})();');
        };
    
        Socialite.widget('pinterest', 'pinit', { init: pinterestInit, process: pinterestProcess });
    */
})(window, window.document, window.Socialite);

/**
 * Execute any queued functions (don't enqueue before the document has loaded!)
 */
(function() {
    var s = window._socialite;
    if (/Array/.test(Object.prototype.toString.call(s))) {
        for (var i = 0, len = s.length; i < len; i++) {
            if (typeof s[i] === 'function') {
                s[i]();
            }
        }
    }
})();




/*
 *  SocialClimber v1.0.0
 *  jQuery plugin built on Socialite.js
 *
 *  By Sarah Squire, MarketWatch 2013
 */
;(function( $, window, document, undefined ){
    var $this,
        bitly_info,
    
    // Default options for SC instance
    defaults = {
        'share': ['twitter', 'facebook'],
        'type': 'button', // or count
        'style': '', // [blank=top, bottom, left] [grey] [med]
        'url': window.location.href, //or a function?
        'text': document.title,
        'optional': {}
    },

    // HTML template and vocabulary for networks. Intent URL is used for buttons.
    networks = {
        'sc-twitter': {
            url: '<a href="//twitter.com/share" class="socialite twitter-share" data-text="{{text}}" data-url="{{url}}" data-count="{{type}}" {{optional}} rel="nofollow" target="_blank"></a>',
            intent: '<a class="sc-twitter" href="//twitter.com/intent/tweet?&url={{url}}&text={{text}}&{{optional}}"><div class="sc-twitter sc-shareicon" title="Send a Tweet"></div></a>',
            hover: 'vertical',
            count: 'horizontal',
            nocount: 'none'
        },
        'sc-facebook': {
            url: '<a href="//www.facebook.com/plugins/like.php" class="socialite facebook-like" data-href="{{url}}" data-send="false" data-layout="{{type}}" data-width="60" data-show-faces="false" {{optional}} rel="nofollow" target="_blank"></a>',
            intent: '<div class="sc-facebook sc-shareicon" title="Post to Facebook"></div>',
            hover: 'box_count',
            count: 'button_count',
            nocount: 'standard'
        },
        'sc-linkedin': {
            url: '<a href="#" class="socialite linkedin-share" data-url="{{url}}" data-counter="{{type}}" {{optional}} rel="nofollow" target="_blank"></a>',
            intent: '<a class="sc-linkedin" href="//www.linkedin.com/shareArticle?mini=true&url={{url}}&summary={{text}}&{{optional}}"><div class="sc-linkedin sc-shareicon" title="Share on LinkedIn"></div></a>',
            hover: 'top',
            count: 'right',
            nocount: ''
        },
        'sc-googleplus': {
            url: '<a href="#" class="socialite googleplus-one" data-size="{{type}}" data-href="{{url}}" {{optional}} rel="nofollow" target="_blank"></a>',
            intent: '<a class="sc-googleplus" href="//plus.google.com/share?&url={{url}}&{{optional}}"><div class="sc-googleplus sc-shareicon" title="Share on Google+"></div></a>',
            hover: 'tall',
            count: 'medium',
            nocount: 'medium" data-annotation="none'
        },
        'sc-permalink': {
            url: '<label>Copy link:</label><input type="text" value="{{url}}">',
            hover: 'tall',
            count: 'medium',
            nocount: ''
        }
    },

    // Public methods available for SocialClimber
    methods = {

        /*  init: Default method call.
        *   Accepts two arguments:
        *     - options: object to setup an instance of SocialClimber
        *         Same as object sent to 'add' method
        *     - setopts: object sent to setup method (via load)
        *   Calls update if instance already exists, else calls add and load.
        */
        init: function(options, setopts) {
            if(this.hasClass('socialclimber')) {
                return this.SocialClimber('update', options);
            }
            this.SocialClimber('add', options);
            this.SocialClimber('load', setopts);
            return this;
        },

        /*
            Insert HTML for each button type

            Called by init method
        */
        add: function(settings) {
            return this.each(function(){
                var insert;
                $this = $(this);

                // Extend default settings with passed settings. Uses deep merge so any defaults not explicitly overwritten are kept.
                settings = $.extend(true, {}, defaults, settings || {});

                // Add classes for styling to wrapper
                if(settings.style) {
                    $this.addClass("sc-"+settings.style.split(' ').join(' sc-'));
                }

                // Adding below requires individual options per network to be explicitly overridden. Problem is some options can't be deleted with override.
                /*$.each(settings.optional, function(network, options) {
                    settings.optional[network] = $.extend({}, defaults.optional[network], settings.optional[network] || {});
                });*/

                // Add classes to wrapper and call appropriate functions to create html for each button type
                switch(settings.type) {
                    case 'hover':
                        $this.addClass('sc-hovers socialclimber');
                        insert = makeHovers(settings);
                        break;
                    case 'count':
                        $this.addClass('sc-counts socialclimber');
                        insert = makeCounts(settings, 'count');
                        break;
                    case 'nocount':
                        $this.addClass('sc-counts sc-nocount socialclimber');
                        insert = makeCounts(settings, 'nocount');
                        break;
                    case 'button':
                        $this.addClass('sc-buttons socialclimber');
                        insert = makeButtons(settings);
                        break;
                }
                // Insert html for the buttons
                $this.empty().html(insert);
    
                // Facebook button uses FB API instead of share URL
                if (settings.type==='button') {
                    buildFacebookAPI($this.find('.sc-facebook.sc-shareicon'), settings);
                    shortenURL(settings);
                }

                // hide hovers even if Socialite not loaded yet
                $this.find('.sc-countBox').hide();
                $this.find('.sc-facebook .sc-countBox').fadeTo(0,0);
            });
        },

        /*
            Settings only affect native network buttons (hovers and counts, not buttons)
            Exception: Facebook's button uses the API and thus accepts settings
            Languages can be set, but a logged in user's language will override.

            Called by load method
        */
        setup: function(options) {
            /*
                // Get Facebook app ID from getFBAppID() function at bottom
                if(typeof options === 'undefined' || typeof options.facebook === 'undefined') {
                    $.extend(options, {
                        facebook: {
                            appId: getFBAppID()
                        }
                    });
                } else {
                    options.facebook.appId = options.facebook.appId || getFBAppID();
                }
            */
            // Get Facebook app ID from setup options
            // Don't report missing ID because facebook button may not be in use
            try {
                options.facebook.appId = utils.isFunction(options.facebook.appId);
            } catch(e) {}

            $('body').data('socialclimber', options);
            return this;
        },

        /*
            Loads scripts and adds interaction (hovers)
            After multiple add calls, load will add functionality to instances in one sweep

            Called by init
        */
        load: function(options) {
            if(!$('body').data('socialclimber')) {
                options = options || {};
                methods.setup(options);
            }
            Socialite.setup($('body').data('socialclimber'));
            bitly_info = $('body').data('socialclimber').bitly;
            this.each(function() {
                Socialite.load(this);
            });
            // have to tell Socialite to look for intents separately to load script
            if(this.hasClass('sc-buttons')){
                Socialite.load($('#socialclimber-intents')[0])
            }
            setDOM(this);

            return this;
        },

        /*
            Updates the instance called on or all instances of socialclimber inside the caller
            Calls update function for each type
            Update can't change type (e.g., button -> count)

            Called by init if instances already setup (have class socialclimber)
        */
        update: function(settings) {
            // If node is not a socialclimber, updates all instances inside.
            var _this = this.hasClass('socialclimber') ? this : this.find('.socialclimber');

            // Extend default settings with passed settings. Uses deep merge so any defaults not explicitly overwritten are kept.
            settings = $.extend(true, {}, defaults, settings || {});

            // returns itself. Calls appropriate function based on type.
            // Native buttons, hovers and counts, use the same call to reset Socialiate
            return _this.each(function(){
                $this = $(this);
                if($this.hasClass('sc-hovers')) {
                    settings.type = 'hover';
                    updateHoversCounts(settings);
                    _this.SocialClimber('load');
                } else if($this.hasClass('sc-counts')) {
                    settings.type = $this.hasClass('sc-nocount') ? 'nocount' : 'count';
                    updateHoversCounts(settings);
                    _this.SocialClimber('load');
                } else if($this.hasClass('sc-buttons')) {
                    updateButtons(settings);
                    shortenURL(settings);
                }
            });
        },

        /*
            Removes listeners and HTML created by SocialClimber on instance or any instances inside wrapper called

            Called by destroyAll
        */
        destroy: function() {
            $this = this.hasClass('socialclimber') ? this : this.find('.socialclimber');
            $this.find('.sc-shareicon').addBack().off('mouseenter mouseleave mouseover click');
            $this.find('.sc-permalink input').off('mouseenter mouseleave click');
            $this.empty();
            $this.removeClass('socialclimber sc-hovers sc-counts sc-buttons sc-bottom sc-left sc-grey sc-med');
            return $this;
        },

        /*
            Removes anything created by SocialClimber, including HTML, script calls, listeners and data
        */
        destroyAll: function() {
            $('.socialclimber').SocialClimber('destroy');
            $('#socialclimber-intents').remove();
            $('body').removeData('socialclimber');
            return this;
        }
    },

    utils = {
        // detect IE 6 or 7
        checkIE: function() {
            return ($('html').hasClass('ie7') || $('html').hasClass('ie6'));
        },
        // If anonymous function is sent, evaluate the function and return the result. Otherwise, return itself
        // URI encode parameters for social share buttons (no FB, which uses API)
        isFunction: function(obj, encode) {
            if(encode) {
                return (typeof obj==='function') ? encodeURIComponent(obj.call($this)) : encodeURIComponent(obj);
            }
            return (typeof obj==='function') ? obj.call($this) : obj;
        },
        // On click, open pop up window!
        bindPopup: function(el, div) {
            el.on('click', div, function(e) {
                e.preventDefault();
                popupWindow = window.open($(this).parent().attr('href'),'popUpWindow','width=600,height=405,left=10,top=10,resizable=yes,scrollbars=no,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
            });
        }
    },
    
    /*
    *   Initial call from add for each button type
    *   Basic string of functions to place the correct HTML.
    *   Takes into account exceptions and differences for each type
    */
    makeHovers = function(settings) {
        var html = "",
            setInstance = resolveFunctions(settings);
        $.each(settings.share, function(i, network) {
            if(network==='googleplus' && utils.checkIE()) { return true; }
            var url = buildSocialite(network, setInstance);
            html += hoverTemplate(network, url);
        });
        return html;
    },
    makeCounts = function(settings, type) {
        var html = "",
            setInstance = resolveFunctions(settings);
        $.each(settings.share, function(i, network) {
            var url = buildSocialite(network, setInstance);
            if(network==='permalink') {
                html += hoverTemplate(network, url);
            } else {
                html += "<div class='sc-"+network+"'>"+url+"</div>\n";
            }
        });
        return html;
    },
    makeButtons = function(settings) {
        var html = "",
            setInstance = resolveFunctions(settings, true);
        $.each(settings.share, function(i, network) {
            if(network==='permalink') {
                setInstance.url = decodeURIComponent(setInstance.url);
                var url = buildSocialite(network, setInstance);
                html += hoverTemplate(network, url);
            } else {
                var url = buildIntent(network, setInstance);
                html += url+"\n";
            }
        });
        return html;
    },

    /*
    *   Similar to make[type] functions
    *   Uses existing DOM structure and doesn't have to reload intents scripts
    */
    updateHoversCounts = function(settings) {
        var setInstance = resolveFunctions(settings);
        $this.children().each(function() {
            if($(this).hasClass('sc-permalink')) {
                $(this).find('input').val(setInstance.url);
            } else {
                var network = $(this).attr('class').split(' ')[0].substr(3);
                var url = buildSocialite(network, setInstance);
                $(this).find('.socialite').replaceWith(url);
            }
        });
        return this;
    },
    updateButtons = function(settings) {
        var setInstance = resolveFunctions(settings, true);
        $this.children().each(function() {
            if($(this).hasClass('sc-permalink')) {
                setInstance.url = decodeURIComponent(setInstance.url);
                $(this).find('input').val(setInstance.url);
            } else {
                var network = $(this).attr('class').split(' ')[0].substr(3);
                var url = buildURL(networks['sc-'+network].intent, network, setInstance);
                $(this).replaceWith(url);
                if(network==='facebook') {
                    buildFacebookAPI($this.find('.sc-facebook.sc-shareicon'), settings);
                }
            }
        });
        return this;
    },

    /*
    *   Evaluate functions from passed-in options
    *   Format arguments to be placed into URL templates
    *   @encode - if true, URI encode val
    */
    resolveFunctions = function(settings, encode) {
        var resolveOptions = {};
        $.each(settings.optional, function(network, options) {
            var opt = $.map(options, function(val, key) {
                if(encode) {
                    return key+"="+utils.isFunction(val, encode);
                }
                return 'data-'+key+"='"+utils.isFunction(val)+"'";
            });
            resolveOptions[network] = encode ? opt.join('&') : opt.join(' ');
        });
        return $.extend({}, settings, {
            url: utils.isFunction(settings.url, encode),
            text: utils.isFunction(settings.text, encode),
            optional: resolveOptions
        });
    },


    /*
    *   Preparing the HTML to be inserted
    */

    // Begin to fill in URLs from networks templates (specific to native urls, not intents)
    buildSocialite = function(network, settings) {
        var baseurl = networks['sc-'+network].url;
        var type = networks['sc-'+network][settings.type];
        baseurl = baseurl.replace('{{type}}', type);
        return buildURL(baseurl, network, settings);
    },

    // Special utility to create location for Socialite to load scripts
    // Needed for intents where calls are via URLs and native buttons aren't present
    buildIntent = function(network, settings) {
        if(!$('body #socialclimber-intents').length) {
            $('body').append('<div id="socialclimber-intents"></div>');
        }
        if(!$('#socialclimber-intents .'+network+'-intent').length) {
            $('#socialclimber-intents').append('<span class="'+network+'-intent socialite"></span>');
        }

        return buildURL(networks['sc-'+network].intent, network, settings);
    },

    // Create URLs from networks templates
    buildURL = function(baseurl, network, settings) {
        baseurl = baseurl.replace('{{url}}', settings.url)
                         .replace('{{text}}', settings.text);
        baseurl = settings.optional[network] ? baseurl.replace('{{optional}}', settings.optional[network])
                                             : baseurl.replace('{{optional}}', '');
        return baseurl;
    },

    // special function for Facebook sharing button using FB API
    // More info: https://developers.facebook.com/docs/reference/javascript/FB.ui/
    buildFacebookAPI = function(el, settings) {
        if(el.length){//make sure there is a facebook button in the DOM
            var setInstance = {};
            if(settings.optional['facebook']) {
                $.each(settings.optional['facebook'], function(key, val) {
                    setInstance[key] = utils.isFunction(val);
                });
            }
    
            el.on('click', function(e) {
                e.preventDefault();
                FB.ui({
                    method: 'feed',
                    link: utils.isFunction(settings.url),
                    name: setInstance.name || utils.isFunction(settings.text),
                    caption: setInstance.caption,
                    description: setInstance.description,
                    picture: setInstance.picture
                });
            });
        }
    },

    // HTML template for hover popups
    hoverTemplate = function(network, url) {
        return  "<div class='sc-"+network+" sc-shareicon'>\n"+
                        "<div class='sc-countBox'>\n"+
                            url+"\n"+
                            "<div class='sc-countBoxBridge'></div>\n"+
                            "<div class='sc-countBoxNub'>\n"+
                                "<s></s>\n"+
                                "<i></i>\n"+
                            "</div>\n"+
                        "</div>\n"+
                    "</div>\n";
    },


    /*
    *   Interactions and listeners in the DOM
    */

    // listener for hover interaction on hovers and permalink
    bindHover = function(el, div) {
        el.on('mouseenter.hover', '.sc-shareicon',
            function() {
                $(this).find('.sc-countBox').show();
                if($(this).hasClass('sc-facebook')) {
                    $(this).find('.sc-countBox').css('visibility', 'visible');
                }
                if($(this).hasClass('sc-permalink')) {
                    $(this).find('input').select();
                }
            }).on('mouseleave.hover', '.sc-shareicon', function() {
                $(this).find('.sc-countBox').hide();
                if($(this).hasClass('sc-facebook')) {
                    $(this).find('.sc-countBox').css('visibility', 'hidden');
                }
        });
        el.one('mouseover.facebook', 'div', function() {
            el.find('.sc-facebook .sc-countBox').fadeTo(0,1).hide();
            $(this).find('.sc-countBox').show();
        });
        // Here instead of setDOM because if link is included this will always run
        el.on('click', '.sc-permalink input', function() { this.select(); });
    },

    // listener for grey images, color on hover
    bindGrey = function(el, div) {
        el.on('mouseenter', div,
            function() {
                $(this).addClass('sc-color');
            }).on('mouseleave', div, function() {
                $(this).removeClass('sc-color');
            }
        );
    },

    // Add listeners and interaction in the DOM
    // Two types of assignments: (1) if context is wrapper, (2) if context is instance
    setDOM = function(el) {
        // if context is a wrapper, find elements
        if(!el.hasClass('socialclimber')) {
            bindHover(el.find('.sc-hovers'), 'div');
            utils.bindPopup(el, '.sc-buttons .sc-googleplus.sc-shareicon');
            utils.bindPopup(el, '.sc-buttons .sc-linkedin.sc-shareicon');
            bindGrey(el, '.sc-grey .sc-shareicon');
            bindHover(el.find('.socialclimber'), 'div.sc-permalink');
        } else { // context is the instance
            if(el.hasClass('sc-hovers')) {
                bindHover(el, 'div');
            } else if(el.hasClass('sc-buttons')) {
                utils.bindPopup(el, '.sc-googleplus.sc-shareicon');
                utils.bindPopup(el, '.sc-linkedin.sc-shareicon');
            }
            if(el.hasClass('sc-grey')) {
                bindGrey(el, '.sc-shareicon');
            }
            bindHover(el, 'div.sc-permalink');
        }
    },

    // Run URLs for button types ONLY through bitly if bitly info sent in setup options
    shortenURL = function(settings) {
        //remove other unused instances of this event, and add listener for hover on instance of SC
        $this.off('mouseover.bitly', '.sc-shareicon').one('mouseover.bitly', '.sc-shareicon', function() {
            //check if bitly info set
            if(typeof bitly_info !== 'undefined'){
                //if the intended bitly domain (can be custom) is defined, we can check to see if the URL was already shortened by SocialClimber
                if(typeof bitly_info.domain === 'undefined' || utils.isFunction(settings.url).indexOf(bitly_info.domain)===-1) {
                    $this = $(this).closest('.socialclimber');
                    $.ajax({
                        url:"http://api.bit.ly/v3/shorten",//https://api-ssl.bitly.com/
                        data:{
                            longUrl: utils.isFunction(settings.url),
                            apiKey:  bitly_info.apikey,
                            login:   bitly_info.login
                        },
                        dataType:"jsonp",
                        success:function(response){
                            if(response.status_txt!=="ALREADY_A_BITLY_LINK") {
                                settings.url = response.data.url;
                            }
                            updateButtons(settings);
                        }
                    }); // end ajax
                } else { //if the URL has already been shortened BY SOCIALCLIMBER, then we still have to update everything again on hover
                    $this = $(this).closest('.socialclimber');
                    updateButtons(settings);
                }
            }
        });
    };

/*
    // Assign app ID internally. For company use to avoid having to include setopts in every project
    // Search for this function to see where else to switch out comments
    getFBAppID = function() {
        switch(window.location.hostname) {
            case 'graphicsdev.dowjones.net': return 363579230418270; break;
            case 'graphics.wsj.com':
            case 'graphicsweb.wsj.com':
            case 'projects.wsj.com': return 142382285944018; break;
            case 'projects.marketwatch.com': return 457522827660494; break;
        }
    };
*/
    // From jQuery plug in site: Reveal public methods and catch errors
    $.fn.SocialClimber = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.SocialClimber' );
        }   
    };
})( jQuery, window, document );