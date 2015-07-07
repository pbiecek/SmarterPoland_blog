if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {};
    console.log = function() {};
}

(function( window, undefined ) {

    // Use the correct document accordingly with window argument (sandbox)
    var document = window.document,
        navigator = window.navigator,
        location = window.location;

    if (!document.nodeName)
    {
        document.nodeName = '#document';
    }

    if (window.Node && Node.prototype && !Node.prototype.contains)
    {
        Node.prototype.contains = function(arg)
        {
            return !!(this.compareDocumentPosition(arg) & 16)
        }
    }

    var PianoMediaQuery = (function() {

        var PianoMediaQuery = function( selector, context ) {
            return new PianoMediaQuery.fn.init( selector, context, rootPianoMediaQuery );
        },

        // Map over PianoMediaQuery in case of overwrite
        _PianoMediaQuery = window.PianoMediaQuery,

        // A central reference to the root PianoMediaQuery(document)
        rootPianoMediaQuery,

        // Keep a UserAgent string for use with PianoMediaQuery.browser
        userAgent = navigator.userAgent,

        // For matching the engine and version of the browser
        browserMatch,

        // The deferred used on DOM ready
        readyList,

        // The ready event handler
        DOMContentLoaded,

        // Save a reference to some core methods
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,
        trim = String.prototype.trim,
        indexOf = Array.prototype.indexOf,

        // [[Class]] -> type pairs
        class2type = {};

        PianoMediaQuery.fn = PianoMediaQuery.prototype = {
            constructor: PianoMediaQuery,
            init: function( selector, context, rootPianoMediaQuery )
            {
                var match, elem, ret, doc;

                if ( !selector ) {
                    return this;
                }

                // The body element only exists once, optimize finding it
                if ( selector === "body" && !context && document.body )
                {
                    this.context = document;
                    this[0] = document.body;
                    this.selector = selector;
                    this.length = 1;
                    return this;
                }

                // Handle HTML strings
                if ( typeof selector === "string" )
                {
                    elem = document.getElementById(selector );
                    this.context = document;
                    this.selector = selector;
                    return this;
                }

                if (selector.selector !== undefined)
                {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }

                return PianoMediaQuery.makeArray( selector, this );
            },

            // Start with an empty selector
            selector: "",

            // The current version of PianoMediaQuery being used
            PianoMediaQuery: "0.0.2",

            // The default length of a PianoMediaQuery object is 0
            length: 0,

            // The number of elements contained in the matched element set
            size: function()
            {
                return this.length;
            },

            toArray: function()
            {
                return slice.call(this, 0);
            },

            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            get: function(num)
            {
                return num == null ?

                // Return a 'clean' array
                this.toArray() :

                // Return just the object
                ( num < 0 ? this[ this.length + num ] : this[ num ] );
            },

            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            pushStack: function( elems, name, selector )
            {
                // Build a new PianoMediaQuery matched element set
                var ret = this.constructor();

                if ( this.isArray( elems ) )
                {
                    push.apply( ret, elems );

                }
                else
                {
                    this.merge( ret, elems );
                }

                // Add the old object onto the stack (as a reference)
                ret.prevObject = this;

                ret.context = this.context;

                if ( name === "find" )
                {
                    ret.selector = this.selector + (this.selector ? " " : "") + selector;
                }
                else if ( name )
                {
                    ret.selector = this.selector + "." + name + "(" + selector + ")";
                }

                // Return the newly-formed element set
                return ret;
            },

            isArray: function( obj )
            {
                return PianoMediaQuery.type(obj) === "array";
            },

            // Execute a callback for every element in the matched set.
            // (You can seed the arguments with an array of args, but this is
            // only used internally.)
            each: function( callback, args )
            {
                return PianoMediaQuery.each( this, callback, args );
            },

            ready: function( fn )
            {
                // Attach the listeners
                // PianoMediaQuery.bindReady();

                // Add the callback
                //readyList.done( fn );

                return this;
            },

            eq: function( i )
            {
                return i === -1 ?
                this.slice( i ) :
                this.slice( i, +i + 1 );
            },

            first: function()
            {
                return this.eq( 0 );
            },

            last: function()
            {
                return this.eq( -1 );
            },

            slice: function()
            {
                return this.pushStack( slice.apply( this, arguments ),
                    "slice", slice.call(arguments).join(",") );
            },

            map: function( callback )
            {
                return this.pushStack( PianoMediaQuery.map(this, function( elem, i ) {
                    return callback.call( elem, i, elem );
                }));
            },

            end: function()
            {
                return this.prevObject || this.constructor(null);
            },

            bindEvent: function(evt, callback)
            {
                for (var i = 0; i < this.length ; i++)
                {
                    var elem = this[i];

                    if (elem.addEventListener)
                    {
                        elem.addEventListener(evt, callback, false);
                    }
                    else if (elem.attachEvent)
                    {
                        elem.attachEvent('on' + evt, function(){
                            callback.call(event.srcElement, event);
                        });
                    }
                }
            },

            // For internal use only.
            // Behaves like an Array's method, not like a PianoMediaQuery method.
            push: push,
            sort: [].sort,
            splice: [].splice
        };

        PianoMediaQuery.fn.init.prototype = PianoMediaQuery.fn;

        PianoMediaQuery.extend = PianoMediaQuery.fn.extend = function()
        {
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            if ( typeof target === "boolean" )
            {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if ( typeof target !== "object" && !PianoMediaQuery.isFunction(target) )
            {
                target = {};
            }

            // extend PianoMediaQuery itself if only one argument is passed
            if ( length === i )
            {
                target = this;
                --i;
            }

            for ( ; i < length; i++ )
            {
                // Only deal with non-null/undefined values
                if ( (options = arguments[ i ]) != null )
                {
                    // Extend the base object
                    for ( name in options )
                    {
                        src = target[ name ];
                        copy = options[ name ];

                        // Prevent never-ending loop
                        if ( target === copy )
                        {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if ( deep && copy && ( PianoMediaQuery.isPlainObject(copy) || (copyIsArray = PianoMediaQuery.isArray(copy)) ) )
                        {
                            if ( copyIsArray )
                            {
                                copyIsArray = false;
                                clone = src && PianoMediaQuery.isArray(src) ? src : [];

                            }
                            else
                            {
                                clone = src && PianoMediaQuery.isPlainObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            target[ name ] = PianoMediaQuery.extend( deep, clone, copy );

                        // Don't bring in undefined values
                        }
                        else if ( copy !== undefined )
                        {
                            target[ name ] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        };

        PianoMediaQuery.extend({
            isFunction: function( obj )
            {
                return PianoMediaQuery.type(obj) === "function";
            },

            makeArray: function(array, results)
            {
                var ret = results || [];

                if ( array != null ) {
                    // The window, strings (and functions) also have 'length'
                    // The extra typeof function check is to prevent crashes
                    // in Safari 2 (See: #3039)
                    // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
                    var type = PianoMediaQuery.type( array );

                    if ( array.length == null || type === "string" || type === "function" || type === "regexp" || PianoMediaQuery.isWindow( array ) ) {
                        push.call( ret, array );
                    } else {
                        PianoMediaQuery.merge( ret, array );
                    }
                }

                return ret;

            },

            merge: function( first, second )
            {
                var i = first.length,
                    j = 0;

                if ( typeof second.length === "number" )
                {
                    for ( var l = second.length; j < l; j++ )
                    {
                        first[ i++ ] = second[ j ];
                    }

                }
                else
                {
                    while ( second[j] !== undefined )
                    {
                        first[ i++ ] = second[ j++ ];
                    }
                }

                first.length = i;

                return first;
            },

            each: function( object, callback, args )
            {
                var name, i = 0,
                    length = object.length,
                    isObj = length === undefined || PianoMediaQuery.isFunction( object );

                if ( args )
                {
                    if ( isObj )
                    {
                        for ( name in object )
                        {
                            if ( callback.apply( object[ name ], args ) === false )
                            {
                                break;
                            }
                        }
                    }
                    else
                    {
                        for ( ; i < length; )
                        {
                            if ( callback.apply( object[ i++ ], args ) === false )
                            {
                                break;
                            }
                        }
                    }

                // A special, fast, case for the most common use of each
                }
                else
                {
                    if ( isObj )
                    {
                        for ( name in object )
                        {
                            if ( callback.call( object[ name ], name, object[ name ] ) === false )
                            {
                                break;
                            }
                        }
                    }
                    else
                    {
                        for ( ; i < length; )
                        {
                            if ( callback.call( object[ i ], i, object[ i++ ] ) === false )
                            {
                                break;
                            }
                        }
                    }
                }

                return object;
            }
        });

        //Helpers
        PianoMediaQuery.extend({
            type: function( obj )
            {
                return obj == null ?
                String( obj ) :
                class2type[ toString.call(obj) ] || "object";
            },

            isWindow: function( obj )
            {
                return obj && typeof obj === "object" && "setInterval" in obj;
            }
        });

        PianoMediaQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            class2type[ "[object " + name + "]" ] = name.toLowerCase();
        });

        rootPianoMediaQuery = PianoMediaQuery(document);

        return PianoMediaQuery;

    })();

    // Expose PianoMediaQuery to the global object
    window.PianoMediaQuery = PianoMediaQuery;
})(window);
var PianoMedia = {

    version: 3,
    mode: 1,
    service_id: 0,
    article_id: 0,
    method_encrypt: false,
    method_verify: false,
    referer : "",
    is_post : null,
    post_args : null,
    allow_refresh: true,
    open_capping: 0,
    client_id: null,
    gaq_linker: false,
    url: null,
    language: null,
    piano_root_placed: false,

    registeredCallbacks : {},

    resetCallbacks : function () {
        this.registeredCallbacks = {
            /* function (isUserLogged, userData) {} */
            onBarLoaded : [],
            /* function (UID) {} */
            onUIDDetected :[]
        };
    },

    triggerCallback : function (callback, params) {
        if (this.registeredCallbacks[callback] instanceof Array)
        {
            var cbs = this.registeredCallbacks[callback];
            while (cbs.length > 0) {
                var cb = cbs.shift();
                setTimeout((function() {
                    var cbf = cb;
                    return function() {
                        cbf.apply(null, params)
                    }
                })(), 0);
            }
        }
    },

    getStyle: function(oElm, strCssRule){
        var strValue = "";
        if(document.defaultView && document.defaultView.getComputedStyle){
            strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
        }
        else if(oElm.currentStyle){
            strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
                return p1.toUpperCase();
            });
            strValue = oElm.currentStyle[strCssRule];
        }
        return strValue;
   },

    init: function(options)
    {
        this.resetCallbacks();

        var cse = true;
        

        PianoMedia.uid.init(cse);

        this.mode = options['mode'];
        this.client_id = options['client_id'] || "_";
        this.service_id = options['service_id'] || "_";
        this.article_id = options['article_id'] || "_";
        this.method_encrypt = options['method_encrypt'];
        this.method_verify = options['method_verify'];

        if (typeof options['language'] != 'undefined')
        {
            this.language = options['language'];
        }

        if (typeof options['referer'] != 'undefined')
        {
            this.referer = options['referer'];
        }

        if (typeof options['is_post'] != 'undefined')
        {
            this.is_post = options['is_post'];
        }

        if (typeof options['post_args'] != 'undefined')
        {
            this.post_args = options['post_args'];
        }

        if (typeof options['allow_refresh'] != 'undefined')
        {
            this.allow_refresh = options['allow_refresh'];
        }

        if (typeof options['open_capping'] != 'undefined')
        {
            this.open_capping = options['open_capping'];
        }

        if (typeof options['gaq_linker'] != 'undefined')
        {
            this.gaq_linker = options['gaq_linker'];
        }

        if (typeof options['url'] != 'undefined')
        {
            this.url = options['url'];
        }

        if (typeof options['piano_root_placed'] != 'undefined')
        {
            this.piano_root_placed = options['piano_root_placed'];
        }

        if (options['callbacks'] instanceof Array)
        {
            var cbs = options['callbacks'];
            for (var i = 0; i < cbs.length; i++)
            {
                var cb = cbs[i];
                if (cb instanceof Array && cb.length == 2)
                {
                    var c = cb[0];
                    var ccb = cb[1];
                    if (this.registeredCallbacks[c] instanceof Array) {
                        this.registeredCallbacks[c].push(ccb);
                    }
                }
            }
        }

        this.paymentStatus = false;
        

        this.reload_customer = (typeof(options['reload_customer']) !== 'undefined') ? options['reload_customer'] : '0';
        this.renderer.init();
    },

    getClientId: function()
    {
        return this.client_id;
    },

    getServiceId: function()
    {
        return this.service_id;
    },

    getArticleId: function()
    {
        return this.article_id;
    },

    getLocation: function()
    {
        return encodeURIComponent(PianoMedia.url || window.location.href);
    },

    getReloadCustomer: function()
    {
        return this.reload_customer;
    },

    getLanguage: function()
    {
        return this.language;
    },

    clickPayment: function()
    {
        PianoMedia.box.info.open();
    },

    clickPaymentPreselected: function(price_elm_id, payment_option_elm_id)
    {
        this.paymentStatus = true;
        this.box.info.url_payment = function()
        {
            return PianoMedia.protocol + PianoMedia.bar_url + '/payment' + '/?&service_id=' + PianoMedia.getServiceId() + '&article_id=' + PianoMedia.getArticleId() + ((typeof(price_elm_id) !== 'undefined') ? '&price_days=' + price_elm_id : '') + ((typeof(payment_option_elm_id) !== 'undefined') ? '&payment_option=' + payment_option_elm_id : '') + '&loc=' + PianoMedia.getLocation();
        };
        PianoMedia.box.info.open();
    },

    clickPaymentPromo: function(promo)
    {
        this.paymentStatus = true;
        this.box.info.url_payment = function()
        {
            return PianoMedia.protocol + PianoMedia.bar_url + '/payment' + '/?&service_id=' + PianoMedia.getServiceId() + '&loc=' + PianoMedia.getLocation() + '&promo=' + promo;
        };
        PianoMedia.box.info.open();
    },

    getPaymentStatus: function()
    {
        return this.paymentStatus;
    },

    /**
     * @param src source of JS without protocol
     * @param element DOM element which will be appending loaded script (optional)
     */
    loadJs: function(src, element)
    {
        

        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = PianoMedia.protocol + src;

        if (typeof element != 'undefined') {
            element.appendChild(s);
        } else {
            var p = document.getElementsByTagName('script')[0];
            p.parentNode.insertBefore(s, p);
        }
    },

    /**
     * Return true if it's mobile or if bar is in mobile mode
     * @return {Boolean}
     */
    isMobile: function()
    {
        

        return this.isIpad() || this.isIphone() || this.isAndroid() || this.isMobileMode() || this.isWindowsPhone() || this.isSymbian();
    },

    /**
     *
     * @return {Boolean}
     */
    isMobileMode: function()
    {
        return (this.mode == 'bar_mobile');
    },

    isMobileBarDisplayed: function()
    {
        return (PianoMedia.getStyle(document.getElementById('pnmdMobileBar'), 'display') == 'block');
    },

    isWindowsPhone: function()
    {
        return navigator.platform.toLowerCase().indexOf("phone") != -1;
    },

    isSymbian: function()
    {
        return navigator.platform.toLowerCase().indexOf("symbian") != -1;
    },

    /**
     * Return true if it's Android
     * @return {Boolean}
     */
    isAndroid: function()
    {
        return navigator.userAgent.toLowerCase().indexOf("android") != -1;
    },

    /**
     * Return true if it's iPad
     * @return {Boolean}
     */
    isIpad: function()
    {
        return navigator.platform.indexOf("iPad") != -1;
    },

    /**
     * Return true if it's iPhone or iPod
     * @return {Boolean}
     */
    isIphone: function()
    {
        return (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1);
    },

    /**
     * Reload page if it's allowed
     */
    refreshMedia: function()
    {
        if (this.method_verify == true && this.allow_refresh == true)
        {
            window.location.reload();
        }
    }
};
PianoMedia.protocol = 'https://'; 
PianoMedia.language = 'pl'; 
PianoMedia.language = 'pl'; 
PianoMedia.bar_url_no_lang = 'bar.pianomedia.eu';
PianoMedia.bar_url = 'bar.pianomedia.eu/pl';
PianoMedia.piano_url = 'www.pianomedia.pl';
PianoMedia.harvester_url = 'harvester.pianomedia.eu';
PianoMedia.mp_url = 'mp.pianomedia.eu';
PianoMedia.custom_label = 'agora';
PianoMedia.custom_url = '/custom/agora';
PianoMedia.t = function(constant_name)
{
    if (typeof(PianoMedia.translateConstants[PianoMedia.language][constant_name]) == 'undefined')
    {
        return '';
    }

    return PianoMedia.encrypt.decodeBase64(PianoMedia.translateConstants[PianoMedia.language][constant_name]);
};
PianoMedia.cookieHandler = {

    getCookie: function(name)
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');

        for (var i=0; i < ca.length; i++)
        {
            var c = ca[i];
            while (c.charAt(0) == ' ')
            {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) == 0)
            {
                return c.substring(nameEQ.length, c.length);
            }
        }

        return null;
    },

    setSimpleCookie: function(name, value)
    {
        document.cookie = name + "=" + value + ";path=/";
    },

    setCookie: function(name, value, days)
    {
        var expires = "";

        if (days && days != 0)
        {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/; domain=" + this.getMainDomain(window.location.hostname) + ";";
    },

    setCookieToDate: function(name, value, date){
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + this.getMainDomain(window.location.hostname) + ";";
    },

    getMainDomain: function(domain)
    {
        var a = domain.split('.');
        var main_domain = '';

        if (a.length > 1)
        {
            var second_level = a[a.length - 2];
            var country_code = a[a.length - 1];

            main_domain = '.' + second_level + '.' + country_code;

            var top_levels = {
                "pl": ['com', 'biz', 'net', 'art', 'edu', 'org', 'gov', 'info', 'mil'],
                "si": [],
                "sk": [],
                "uk": ["co"]
            };

            if (typeof top_levels[country_code] != 'undefined')
            {
                for (var key in top_levels[country_code])
                {
                    if(second_level === top_levels[country_code][key])
                    {
                        main_domain = '.' + a[a.length - 3] + main_domain;
                    }
                }
            }
        }

        return main_domain;
    },

    deleteCookie: function(name)
    {
        this.setCookie(name, "", -1);
    },

    deleteSimpleCookie: function(name)
    {
        this.setSimpleCookie(name, "");
    },

    getVisitKeyCookie: function()
    {
        return this.getCookie('pianovisitkey') || "";
    }
};
PianoMedia.encrypt = {
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    showArticle: function(article_id, content)
    {
        var article = document.getElementById('pianoArticle' + article_id);
        if (article)
        {
            article.innerHTML = this.decodeBase64(content);

            var scripts = article.getElementsByTagName('script');
            var limit = scripts.length;

            for (var i = 0; i < limit; i++)
            {
                if (scripts[i].src.length > 0) {
                    PianoMedia.loadJs(scripts[i].src.replace(/https?:\/\//, ''), scripts[i].parentNode);
                } else if (scripts[i].innerHTML.length > 0) {
                    var innerScript = scripts[i].innerHTML.replace(/;\s*$/, '');
                    eval(innerScript);
                }
            }
        }
    },

    decodeBase64: function(input)
    {
        if (typeof window['atob'] == 'function')
        {
            return  this.utf8_decode(atob(input));
        }

        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length)
        {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64)
            {
                output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64)
            {
                output = output + String.fromCharCode(chr3);
            }
        }

        return this.utf8_decode(output);
    },

    utf8_decode : function(utftext)
    {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length )
        {

            c = utftext.charCodeAt(i);

            if (c < 128)
            {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224))
            {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else
            {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    }
};
PianoMedia.translateConstants = [];
PianoMedia.translateConstants['pl'] = {
    "bar.landingpage.agora.optout": "aHR0cDovL3d5Ym9yY3phLnBsL3BhZ2VzL25hLXN3aWV0YS9pbmRleC5odG0\/Y3RhPXBpYW5vLWJhcg==",
    "bar.landingpage.agora.standard": "aHR0cDovL3d5Ym9yY3phLnBsL3BhZ2VzL25hLXN3aWV0YS9pbmRleC5odG0\/Y3RhPXBpYW5vLWJhcg==",
    "bar.login.agora": "WmFsb2d1aiBzacSZ",
    "bar.loginbox.register": "WmFyZWplc3RydWogc2nEmQ==",
    "bar.close": "WmFta25pag==",
    "bar.account.payment.agora": "V3lrdXAgZG9zdMSZcA==",
    "bar.account.payment.agora.optout": "V3lwcsOzYnVq",
    "bar.article_count.agora": "VHlsa28gdGVyYXogcGFraWV0IFd5Ym9yY3phIDMwJSB0YW5pZWogJnJhcXVvOw==",
    "bar.account.inactive.agora": "VHdvamEgcHJlbnVtZXJhdGEgamVzdCA8c3BhbiBjbGFzcz0iaW5hY3RpdmUiPm5pZWFrdHl3bmE8L3NwYW4+",
    "bar.logout.agora": "V3lsb2d1aiBzacSZ",
    "bar.account.active.agora": "VHdvamEgcHJlbnVtZXJhdGEgamVzdCA8c3BhbiBjbGFzcz0iYWN0aXZlIj5ha3R5d25hPC9zcGFuPiBkbw==",
    "bar.dropdown.subscribe": "emFwcmVudW1lcnVq",
    "bar.login": "WkFMT0dVSiBTScSY",
    "bar.logout": "V1lMT0dVSiBTScSY",
    "bar.details": "a2xpa25pag==",
    "bar.info_text": "UGlhbm8gcG96d2FsYSBuYSBuaWVvZ3Jhbmljem9ueSBkb3N0xJlwIGRvIHRlaiBzdHJvbnku",
    "bar.article_count": "RG9zdMSZcCBkbyBraWxrdWR6aWVzacSZY2l1IHNlcndpc8OzdyBpbmZvcm1hY3lqbnljaCBqdcW8IG9kIDkwIGdyb3N6eS4gRG9zdMSZcCBkbyBQaWFubyBqZXN0IG9kcMWCYXRueSAtIA==",
    "bar.notice_box.text1": "YmFyLm5vdGljZV9ib3gudGV4dDE=",
    "bar.notice_box.text2-4": "YmFyLm5vdGljZV9ib3gudGV4dDItNA==",
    "bar.notice_box.text5": "YmFyLm5vdGljZV9ib3gudGV4dDU=",
    "bar.notice_box.buy_button": "YmFyLm5vdGljZV9ib3guYnV5X2J1dHRvbg==",
    "bar.notice_box.text1.agora": "PHA+VyB0eW0gbWllc2nEhWN1IG1vxbxlc3ogcHJ6ZWN6eXRhxIcgamVzemN6ZSA8c3BhbiBpZD0iYXJ0aWNsZXNfY291bnQiPlhYWCBhcnR5a3XFgjwvc3Bhbj4uPC9wPg0KPHA+Wnlza2FqIG5pZW9ncmFuaWN6b255IDxhIGhyZWY9Imh0dHA6Ly93eWJvcmN6YS5wbC8wLDEzNDYzOC5odG1sIj5kb3N0xJlwIGRvIHdzenlzdGtpY2ggYXJ0eWt1xYLDs3c8L2E+LjwvcD4=",
    "bar.notice_box.text2-4.agora": "PHA+VyB0eW0gbWllc2nEhWN1IG1vxbxlc3ogcHJ6ZWN6eXRhxIcgamVzemN6ZSA8c3BhbiBpZD0iYXJ0aWNsZXNfY291bnQiPlhYWCBhcnR5a3XFgnk8L3NwYW4+LjwvcD4NCjxwPlp5c2thaiBuaWVvZ3Jhbmljem9ueSA8YSBocmVmPSJodHRwOi8vd3lib3JjemEucGwvMCwxMzQ2MzguaHRtbCI+ZG9zdMSZcCBkbyB3c3p5c3RraWNoIGFydHlrdcWCw7N3PC9hPi48L3A+",
    "bar.notice_box.text5.agora": "PHA+VyB0eW0gbWllc2nEhWN1IG1vxbxlc3ogcHJ6ZWN6eXRhxIcgamVzemN6ZSA8c3BhbiBpZD0iYXJ0aWNsZXNfY291bnQiPlhYWCBhcnR5a3XFgsOzdzwvc3Bhbj4uPC9wPg0KPHA+Wnlza2FqIG5pZW9ncmFuaWN6b255IDxhIGhyZWY9Imh0dHA6Ly93eWJvcmN6YS5wbC8wLDEzNDYzOC5odG1sIj5kb3N0xJlwIGRvIHdzenlzdGtpY2ggYXJ0eWt1xYLDs3c8L2E+LjwvcD4="
}

PianoMedia.template = {
    sources: { },
    dataProvider: { newArticlesCount: 0, remainingArticlesCount: 0 },
    contentProvider: { },

    injectResponse: function(responseType) {
        var usedTemplate = this.getUsableTemplateType(responseType);
        var usedInjectElement = this.getUsableInjectElement(responseType);

        var response = PianoMedia.template.sources()[usedTemplate];

        for (var key in PianoMedia.template.contentProvider) {
            var translation = PianoMedia.t(PianoMedia.template.contentProvider[key][PianoMedia.template.dataProvider[key]]);
            var search = new RegExp('<#=' + key + '>', 'g');
            response = response.replace(search, translation);
        }

        for (var string in PianoMedia.template.dataProvider) {
            translation = PianoMedia.template.dataProvider[string];
            search = new RegExp('<=' + string + '>', 'g');
            response = response.replace(search, translation);
        }

        document.getElementById('pnmdTemplate_' + usedInjectElement).innerHTML = response;
        this.injectMobileResponse(responseType);
    },

    injectMobileResponse: function(responseType) {
        var usedTemplate = this.getUsableMobileTemplateType(responseType + '_mobile');
        if (usedTemplate === null)
        {
            return;
        }

        var response = PianoMedia.template.sources()[usedTemplate];

        for (var key in PianoMedia.template.contentProvider) {
            var translation = PianoMedia.t(PianoMedia.template.contentProvider[key][PianoMedia.template.dataProvider[key]]);
            var search = new RegExp('<#=' + key + '>', 'g');
            response = response.replace(search, translation);
        }

        for (var string in PianoMedia.template.dataProvider) {
            translation = PianoMedia.template.dataProvider[string];
            search = new RegExp('<=' + string + '>', 'g');
            response = response.replace(search, translation);
        }

        document.getElementById('pnmdMobileCustomerInfo').innerHTML = response;
    },

    getUsableTemplateType: function(responseType) {
        if (typeof this.sources()[responseType] !== 'undefined' && this.sources()[responseType] != null) {
            return responseType;
        } else {
            var parent = responseType.split('_').slice(0,-1).join('_');
            return this.getUsableTemplateType(parent);
        }
    },

    getUsableMobileTemplateType: function(responseType) {
        if (typeof this.sources()[responseType] !== 'undefined' && this.sources()[responseType] != null) {
            return responseType;
        } else {
            var parent = responseType.split('_').slice(0,-2).join('_') + '_mobile';
            return (parent !== '_mobile') ? this.getUsableMobileTemplateType(parent) : null;
        }
    },

    getUsableInjectElement: function(responseType) {
        var element = document.getElementById('pnmdTemplate_' + responseType);
        if (typeof element !== 'undefined' && element != null) {
            return responseType;
        } else {
            var parent = responseType.split('_').slice(0,-1).join('_');
            return this.getUsableInjectElement(parent);
        }
    }
};

PianoMedia.template.contentProvider = {
    "landingPageByPastSubscription": {
        "true": "bar.landingpage.agora.optout",
        "false": "bar.landingpage.agora.standard"
    }
};

PianoMedia.template.sources = function() {
    return sources = {
        'logged_active': '<div id="pianoMediaBarRightLoggedDesktop"><div id="pianoMediaLogout"><a id="pianoMediaLogoutHref" href="<=logoutHref>"><img src="http://bar.pianomedia.eu/pl/images/agora/off.png" id="pianoMediaLogoutButton" /></a></div><div id="PianoMediaBarEmail"><a id="PianoMediaBarEmailHref" href="<=emailHref>"><=email></a></div><div id="PianoMediaActive"><div id="pianoMediaInfoText">' + PianoMedia.t("bar.account.active.agora") + ' <=accessEndDate> (<=remainingDays>)</div></div></div><a id="pianoMediaBarOffer" href="http://wyborcza.pl/0,134981.html?cta=piano-bar">Prenumerata cyfrowa Gazety Wyborczej</a>' ,
        'logged_active_mobile': '<p style="border-bottom: 1px solid #eaeaea;">' + PianoMedia.t("bar.account.active.agora") + '<=accessEndDate> (<=remainingDays>)</p><p style="border-bottom: 1px solid #eaeaea; padding-top: 4px;"><a id="PianoMediaBarEmailHref" href="<=emailHref>" target="_blank"><=email></a></p><p style="padding-top: 4px;"><a href="<=logoutHref>">' + PianoMedia.t("bar.logout.agora") + '</a></p>' ,
        'logged_inactive': '<div id="pianoMediaBarRightLoggedDesktop"><div id="pianoMediaLogout"><a id="pianoMediaLogoutHref" href="<=logoutHref>"><img src="http://bar.pianomedia.eu/pl/images/agora/off.png" id="pianoMediaLogoutButton" /></a></div><div id="PianoMediaBarEmail"><a id="PianoMediaBarEmailHref" href="<=emailHref>"><=email></a></div><div id="PianoMediaInactive"><div id="PianoMediaBarRenewHref"><a href="javascript:PianoMedia.box.info.toggle({version: \'piano-bar\', promotion_tag: \'wyborcza_optout-bar\'});">' + PianoMedia.t("bar.account.payment.agora.optout") + '</a><div id="pianoMediaBoxNotice"><div id="pianoMediaBoxNoticeText"><p>W tym miesiącu możesz przeczytać jeszcze <span id="articles_count">2 artykuły</span>.</p><p>Zyskaj nieograniczony <a href="http://wyborcza.pl/0,134638.html">dostęp do wszystkich artykułów</a>.</p></div><a id="PianoMediaNoticeClose" onclick="PianoMedia.box.mpNotice.close();">X</a></div></div><div id="pianoMediaInfoText">' + PianoMedia.t("bar.account.inactive.agora") + '</div></div></div><a id="pianoMediaBarOffer" href="<#=landingPageByPastSubscription>">Prenumerata cyfrowa Gazety Wyborczej</a><span style="display: none">' + PianoMedia.t("bar.landingpage.agora.standard") + '</span><span style="display: none">' + PianoMedia.t("bar.landingpage.agora.optout") + '</span>' ,
        'logged_inactive_mobile': '<p style="border-bottom: 1px solid #eaeaea;">' + PianoMedia.t("bar.account.inactive.agora") + '</p><p style="border-bottom: 1px solid #eaeaea; padding-top: 4px;"><span id="PianoMediaBarRenewHref"><a href="javascript:PianoMedia.box.ddbox.toggle({action: \'christmaspromo\', mobile_ready: true, access: 0});">' + PianoMedia.t("bar.account.payment.agora") + '</a></span><span><a id="PianoMediaBarEmailHref" href="<=emailHref>" target="_blank"><=email></a><span></p><p style="padding-top: 4px;"><a href="<=logoutHref>">' + PianoMedia.t("bar.logout.agora") + '</a></p><span style="display: none">' + PianoMedia.t("bar.landingpage.agora.standard") + '</span><span style="display: none">' + PianoMedia.t("bar.landingpage.agora.optout") + '</span>' ,
        'meteredreminder': '<!-- reminder in particular views -->' ,
        'unlogged': '<div id="pianoMediaLogin"><a id="pianoMediaLoginHref" href="javascript:PianoMedia.box.login.toggle()">' + PianoMedia.t("bar.login.agora") + '</a><div id="pianoMediaBoxLogin"><iframe id="pianoMediaBoxLoginIframe" frameborder="0" border="0" allowtransparency="true" vspace="0" hspace="0" src=""></iframe><div id="pianoMediaBoxLoginControls"><a href="javascript: PianoMedia.box.info.open()">' + PianoMedia.t("bar.loginbox.register") + '</a><a style="margin-left: 40px;" href="javascript: PianoMedia.box.login.close()">' + PianoMedia.t("bar.close") + '</a></div></div></div><div id="PianoMediaBarRenewHref"><!--<a href="http://wyborcza.pl/0,134638.html?cta=piano-bar">--><!--' + PianoMedia.t("bar.account.payment.agora") + '--><!--</a>--><a href="javascript:PianoMedia.box.info.toggle({version: \'piano-bar\', promotion_tag: \'wyborcza_optout-bar\'});">' + PianoMedia.t("bar.account.payment.agora.optout") + '</a><div id="pianoMediaBoxNotice"><div id="pianoMediaBoxNoticeText"><p>W tym miesiącu możesz przeczytać jeszcze <span id="articles_count">2 artykuły</span>.</p><p>Zyskaj nieograniczony <a href="http://wyborcza.pl/0,134638.html?cta=piano-bar">dostęp do wszystkich artykułów</a>.</p></div><a id="PianoMediaNoticeClose" onclick="PianoMedia.box.mpNotice.close();">X</a></div></div><div id="pianoMediaInfoText">' + PianoMedia.t("bar.article_count.agora") + '</div><a id="pianoMediaBarOffer" href="http://wyborcza.pl/0,134638.html?cta=piano-bar">Prenumerata cyfrowa Gazety Wyborczej</a>' 
    }
}


PianoMedia.renderer = {
    articleCount: 0,

    init: function()
    {
        var html = '<div id="pianoMediaBar"> <div id="pianoMediaBarContent"> <div id="pianoMediaBarLeft"> <!--<a href="http://wyborcza.pl/0,134638.html?cta=piano-bar">Prenumerata cyfrowa Gazety Wyborczej</a>--> </div> <div id="pianoMediaBarRight"> <div id="pianoMediaLogo"> <a href="https://www.pianomedia.pl/package/?service_id=' + PianoMedia.getServiceId() + '" id="pianoMediaLogo" target="_blank"></a> </div> <div id="pianoMediaBarRightLogged"> <span id="pnmdTemplate_logged_active"><!-- logged_active --></span> <span id="pnmdTemplate_logged_inactive"><!-- logged_inactive --></span> </div> <div id="pianoMediaBarRightUnlogged"> <span id="pnmdTemplate_unlogged"><!-- unlogged --></span> </div> </div> </div> <div id="pnmdMobileBar"> <a id="pnmdMobileBtnRegister"></a> <a id="pnmdMobileBtnLogin"></a> <a href="javascript://" id="pnmdMobileBtnMenu" class="pnmdMobileBtn" onclick="PianoMedia.mobile.toggleDetail()"></a> <a id="pnmdMobileBtnClosePayment"></a> <a id="pnmdMobileBtnCloseLogin"></a> <a id="pnmdMobileBtnLogout"></a> <div id="pnmdMobileBoxNotice"> <div id="pnmdMobileBoxNoticeText"> <p>W tym miesiącu możesz przeczytać jeszcze <span id="articles_count">2 artykuły</span>.</p> <p>Zyskaj nieograniczony <a href="http://wyborcza.pl/0,134638.html">dostęp do wszystkich artykułów</a>.</p> </div> <a id="pnmdMobileNoticeClose" onclick="PianoMedia.box.mpNotice.close();">X</a> </div> </div> <div id="pnmdMobileBarContent" class="pnmdMobileBarContentClosed" style="position: relative;"> <div id="pnmdMobileCustomerInfo"> <span id="PianoMediaBarRenewHrefMobile"> <!--<a href="http://wyborcza.pl/0,134638.html?cta=piano-bar">' + PianoMedia.t("bar.account.payment.agora") + '</a>--> <a href="javascript:PianoMedia.box.info.toggle({version: \'piano-bar\', promotion_tag: \'wyborcza_optout-bar\'});">' + PianoMedia.t("bar.account.payment.agora.optout") + '</a> </span> <span style="margin: 0px 10px; border-left: 1px solid #EBEBEB; padding: 13px 0;"><!-- --></span> <span id="pianoMediaLoginMobile"><a onclick="PianoMedia.mobile.toggleLogin();">' + PianoMedia.t("bar.login.agora") + '</a></span> </div> <iframe id="pnmdMobileIframeLogin" frameborder="0" border="0" allowtransparency="true" vspace="0" hspace="0" src=""></iframe> <iframe id="pnmdMobileIframePayment" frameborder="0" border="0" allowtransparency="true" vspace="0" hspace="0" src=""></iframe> <div id="pianoMediaBoxLoginControls" style=" position: absolute; top: 0; right: 0; background: #919191; font-size: 14px; padding: 5px; line-height: 14px;"> <a id="pianoMediaBoxLoginControlsClose" href="javascript: PianoMedia.mobile.close()" style=" color: #fff;">Close <span>X</span></a> </div> </div> </div> <div id="pianoMediaBoxModal"></div> <div id="pianoMediaBoxInfoCover"> <div id="pianoMediaBoxInfo"> <a id="pianoMediaBoxInfoOneDayPromoClose" style="cursor: pointer; width: 202px; height: 52px; position: absolute; top: 407px; left: 681px; display: none;" onclick="PianoMedia.box.oneDayPromo.close();"></a> <a id="pianoMediaBoxInfoYearliesPromoClose" style="cursor: pointer; width: 202px; height: 52px; position: absolute; top: 413px; left: 515px; display: none;" onclick="PianoMedia.box.info.close()"></a> <span id="pianoMediaBoxInfoCloseLink" onclick="PianoMedia.box.info.close()"><span id="pianoMediaBoxInfoCloseLinkImg"></span><span id="pianoMediaBoxInfoCloseLinkText">' + PianoMedia.t("bar.close") + '</span></span> <iframe id="pianoMediaBoxInfoIframe" frameborder="0" border="0" allowtransparency="true" vspace="0" hspace="0" src=""></iframe> </div> </div> <div id="pianoMediaBoxLoginMobile"> <iframe id="pianoMediaBoxLoginIframeMobile" frameborder="0" border="0" allowtransparency="true" vspace="0" hspace="0" src=""></iframe> <div id="pianoMediaBoxLoginMobileControls"> <a href="javascript: PianoMedia.box.info.open()">' + PianoMedia.t("bar.loginbox.register") + '</a> <a style="margin-left: 40px;" href="javascript: PianoMedia.box.login.close()">' + PianoMedia.t("bar.close") + '</a> </div> </div> <div id="pianoMediaBoxNotice"> <span id="pnmdTemplate_meteredreminder"><!-- meteredreminder --></span> </div> <div style="clear:both"></div> <style type="text/css">#piano-root { position: relative; z-index: 9999; overflow: visible !important; } #piano-root b, #piano-root strong { font-weight: bold; } #pianoMediaBarContent a, #pianoMediaBarContent a:hover, #pianoMediaBarContent a:focus { /*background-color: inherit;*/ } #pianoMediaBar { z-index: 9995; top: 0px; left: 0px; height: 29px; line-height: 29px; width: 100%; margin: 0px; display: block; color: #000; position: relative; background-color: #f8f8f8; border : 0px; border-bottom: 1px solid #e1e1e1; font-size: 12px; } #pianoMediaBarContent { width: 960px; margin: 0 auto; } #pianoMediaBarLeft, #pianoMediaBarLeft a, #pianoMediaBarOffer, #pianoMediaBarOffer a { font-weight: bold; font-size: 13px; color: #b00126; padding-left: 10px; float: left; } #pianoMediaLogo { float: right; margin: 0 10px; height: 30px; } #pianoMediaLogo a, #pianoMediaLogo a:hover { background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAATCAYAAAAwE0VbAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsNEBk0QVyyQAAAB0ZJREFUSMeNl3+MVNUVxz/nvjc/dmcXlmW1q1SCCDsjlmLT8Efb+Ed/mIr1RyLEalpR2B9sNjTR2FpKa0waqaaRf3BXZWfBFltsU6XVNLGxXUrThkqIyjZFZoYfFrNQcHGB/cHOzrx3T/94b37tLqlncnNf7j3n3PM999xzzggDOQNch2qCahKxwCU8O0p3ypLOQmcSdueWo8QQOYFIng3LKjIlnnTOADGM5mlPKjOpP2MQiaOSp6vNsvsUbFxa2d+ZWYLiYvU/9NzslfUCDGRjIAtREgg+MIa1o3SlLLuz4IHByHyM/A4j2Zohchw4iCvr6M1KWSnsRTgIrEBn2FviEW5B2IbVZuYiq/UIWzHcx60nAkDpTLjZA655jYgZxDXX1uhNZ1OI7EQ4ipEcIicR+SfGPM5LxxJsTEJdBBdUUSZRHUL1FaAYWtaMMd8BthPX08AhAFRHEblY4ZtBT2UBHkLYiJp9wD/mAFUAmhB28T3biHf0l3SmLAC3rwYYBVzAr0RBJoWRvYEzeRu1fwdpQliD8HMizk305x7loaV5NxRxwRync/n2msMHsocQeR3kdl7KHaa7zXI12pmBTSn4rLQhdAMOwn2ks4fpTE7XhnYALQzzHbgRh3RmD52pAi2NMkt3OlOPMY8Bn0d1Cx3J56psfB6lH5FHcPgzLx7bZ1ABREEj9J0ytdpkBJUiIvVEJNwzc4NyXXgxYxDaQQTkPMIdCDcB8EJ2poQCDqpTiPRi5AnSmQZeXTf7DYpZBNyJ8jqe9oVggtGRPAf8BGUU5V4iTtQNdKOINBD3bmb38QKqgmoD6KMIDqrv05H0KrbMdibtyyCdW4LwIGrfQ6UPQx/IemALtzE3KKtPYXgCzJOIbeH5o1sBr+YQYREQBT1Id2oKgI5kRVPB5IjaIURuwBI3oXoP0dUgb6P8FdiPyFuI3I/qXpQ/8WlIWIvSCrwA8gZwEOFBBrIpViYDz9aCUgr2VVQ3gA4jZjN17nYgUfOeglANnFBNz34QfnhOuGdBMSAgIsH16QFUB4EDwB+Bx7BsoTM5Tjo7N5C+Y6U31YLwA0TPo1jE3o1yHlgMsmGWd0vkSIKO5AFU7wc9gjEdwCogXwVpGJhA5Kv0Z5vK61tWBHPUrETkC8ApRKZM6DAX5d8UbDdF203RbqJoN9Pe1kdXcpT+qjox09c9qZJxTwItINdh5GVE9iCsD5zGWnblVlzlfjUE/C6qD6P6DtBYXg9YzgJvgKzBMd9nINNSlShWIvIM0IDq77G26FZCVxXXzdO1bHaq7krWZi6t+haB/lwSYR0iJ/C1FyMSmlsATSL0AN8mnXuazrZiTQ6spo7kUQay6xF5Baivqn95BnI7EL0V2IqYL7ErdygIU1kDugzVbfj+X9i0Qt3QxDGQSVxHPsXDuQI6gYhlwzLYCBjWghis7qSzbUdt95CdhyO3AN9EdSdwliCRTgGXgsxbA+xD+rPfxUh3GfZvzsEDradJZ9sx/DAAIl8ELKrDoJvx/d1sWlEgnUH4hTrYwiqs7/24ve5f2+T/4PrDh6tRqSdW9y53fmaCrDq8d34l+Sut3HDj3/iGTM2S2fNRG8ZZjBsb4oGWEVSF3368HK+4lHmt+7nHLcySeTOfYGFsmq+IV7M+qHFOn1+M33gt+EVi48OsX3QGgGcG4UdfR+xzJBB5WISR+OOxwWl13eCRagMwHmaiPHhRzPTkr7XnDtD4WxzZ/ysdAiMTmEKcpmsuceHsAq5fJfxs3zp8fznv7++lt3sMx72C48aw3jR+XRz1FbfoY4xDUYqoTTRzdzHOki5L/sA5+o5BfakuuqB5kHhwuxpJPT1VV3ejfgv45OS26ODYB5EIMAITCuAWhDpE7xI46YvzDko0rLALQHzQ+WG6rMPiTRK7TZAFPvEjgA1+sYVcuFyAWBOOEdCvAV9G5DUA/DoHX+eDexFsPRiLFzOgMTCXYHoByBRwD3AGOA0mQtAZuCAGtDGYTcxTs9BX7y7gI426h0EjwCelMmDCN1UEPKfcvqgt15Eg5kuzFSiCFgi6WVtaLyebQM4DimhZzxz6sCAWrAbnKUChUp+kirfUOYf6FQWmgQK2pLdCpqq42UpWkllVdUYhtDbwIlWHVfPaqoN0VvquUVruUHSG3NXTf9lBFbTV7VsZlAhqdSYQrRq1i6actarbJgnbSPGAy9Qknathq1mZAUrnbMukxCvYudKaC4y6wiNjgi1amkFNKCZVA3AMxGOC/DRBVN5kqAEI/y+Vbs01DJ+cxrg9eEWXvc/GoG5+ELVS4pOguJWdJeA64xwaSfC5e8cZUoi3gr1KPdPI6d7omdR2r6N4wejEURYEb83OFVcrgVOtQePIZJAo9CLIPGACpB64AhMjAX+iGSTkoQn4GLgmiPXJ/wYW1zeH8uPhPAbEwzcrQAx0LNQzDFfyEHUhcj2oF4DHCWtjQ2hHAvQyTF6CRgG/FSQCcgYmfID/AWbuFIsGK3dvAAAAAElFTkSuQmCC") no-repeat; display: block; height: 19px; width: 55px; margin: 5px; } #pianoMediaLogout { float: right; padding: 0 7px; height: 30px; border-right: 1px solid #e1e1e1; } #pianoMediaLogoutButton { height: 18px; padding-top: 5px; } #pianoMediaLogin, #pianoMediaBarRightLogged #PianoMediaBarEmail { float: right; padding: 0 10px; border-right: 1px solid #e1e1e1; border-left: 1px solid #e1e1e1; } #pianoMediaLogin a, #pnmdMobileCustomerInfo a, #pianoMediaLogout a, #pianoMediaBarRightLogged #PianoMediaBarEmailHref { color: #b00126; text-decoration: none; } #pianoMediaLogin a:hover, #pnmdMobileCustomerInfo a:hover, #pianoMediaLogout a:hover, #pianoMediaBarRightLogged #PianoMediaBarEmailHref:hover { text-decoration: underline; cursor: pointer; } #pianoMediaBarRightLogged #PianoMediaBarEmailHref { font-weight: bold; } #pianoMediaLogin { float: right; position: relative; } #PianoMediaBarRenewHref { float: right; margin: 0 4px; position: relative; } #PianoMediaBarRenewHrefMobile { margin: 0 4px; position: relative; text-align: center; float: none; } #PianoMediaBarRenewHref a, #PianoMediaBarRenewHrefMobile a { background-color: #c02739; color: white; text-decoration: none; padding: 3px 6px; cursor: pointer; } #PianoMediaBarRenewHref .PianoMediaBoxNotice a { background-color: transparent; color: #b00126; padding: 0; } #PianoMediaBarRenewHref .PianoMediaBoxNotice a:hover { background-color: transparent; color: #b00126; padding: 0; } #PianoMediaBarRenewHref a:hover { background-color: #c02739; } #pianoMediaInfoText { float: right; margin-right: 7px; } #PianoMediaInactive { float: right; } #PianoMediaActive { float: right; } #piano-root span.inactive { color: #888888; font-weight: bold; } #piano-root span.active { color: #008400; font-weight: bold; } #pianoMediaBoxNotice { width: 279px; height: 141px; background: url("https://bar.pianomedia.eu/pl/images/agora/notice-bg.png") no-repeat; z-index: 999999; position: absolute; overflow: hidden; top: 35px; right: -95px; text-align: left; font-size: 12px; display: none; } #pianoMediaBoxNotice #pianoMediaBoxNoticeText { margin: 10px 25px 10px 25px; width: 210px; overflow: hidden; } #pianoMediaBoxNotice #pianoMediaBoxNoticeText p{ margin-top: 22px; line-height: 17px; } #pianoMediaBoxNotice #pianoMediaBoxNoticeText p #articles_count { color: #008400; font-weight: bold; } #pianoMediaBoxNotice #pianoMediaBoxNoticeText p a { text-decoration: none; color: #b00126; background-color: transparent; padding: 0; } #pianoMediaBoxNotice #pianoMediaBoxNoticeText p a:hover { text-decoration: underline; } #PianoMediaBarRenewHref #pianoMediaBoxNotice #PianoMediaNoticeClose { position: absolute; top: 25px; right: 15px; font-weight: bold; font-size: 14px; text-decoration: none; border: 1px solid #e1e1e1; padding: 2px 5px; cursor: pointer; line-height: 16px; background: #FFFFFF; color: #b00126; } #pianoMediaBoxLogin { z-index: 999999; height: 428px; width: 272px; overflow: hidden; position: absolute; top: 29px; right: 0px; text-align: center; display: none; background: none; } #pianoMediaBoxLogin iframe { overflow: hidden; border: 0px solid rgb(192, 192, 192); height: 428px; width: 272px; } #pianoMediaBoxLogin div { text-align: left; margin: 0px 10px; height: 16px; line-height: 12px; overflow: hidden; } #pianoMediaBoxLogin div a { text-align: left; text-decoration: underline; line-height: 12px; margin: 0px; color: rgb(80, 80, 80); font-size: 10px; font-family: arial; } #pianoMediaBoxLoginControls { display: inline; } #pianoMediaBoxLoginMobile { z-index: 999999; width: 100%; height: 100%; display: none; overflow: hidden; position: absolute; top: 28px; left: 0px; background-color: #fff; } #pianoMediaBoxLoginMobile iframe { overflow: hidden; margin: 0px; border: 0px solid rgb(192, 192, 192); height: 100%; width: 100%; } #pianoMediaBoxInfoCover { z-index: 9981; position: absolute; width:100%; height:100%; left: 0px; display: none; } #pianoMediaBoxInfo { position: relative; background-color: grey; z-index: 9998; width: 950px; height: 550px; margin: auto; top: 0px; } #pianoMediaBoxInfo span#pianoMediaBoxInfoCloseLink { display: block; width: 50%; height: 15px; border-width: 0px; cursor: pointer; top: 5px; right: 8px; position: absolute; text-align: center; } #pianoMediaBoxInfo span#pianoMediaBoxInfoCloseLink span#pianoMediaBoxInfoCloseLinkText { opacity: 0.7; color: #fff; text-transform: uppercase; font-family: Arial; font-weight: bold; font-size: 11px; float: right; display: block; } #pianoMediaBoxInfo span#pianoMediaBoxInfoCloseLinkText{ display: none !important; } #pianoMediaBoxInfo span#pianoMediaBoxInfoCloseLink span#pianoMediaBoxInfoCloseLinkImg { width: 15px; height: 15px; display: block; margin: 0 0 0 3px; float: right; background-image: url("https://bar.pianomedia.eu/pl/images/close3.png"); background-position: 100% center; } #pianoMediaBoxInfo div#LoginLinkOverlay { cursor: pointer; top: 135px; left: 240px; width: 400px; height: 30px; position: absolute; z-index: 9996; background-image: url("https://bar.pianomedia.eu/pl/images/spacer.gif"); } #pianoMediaBoxInfo div#PaymentLinkOverlay { cursor: pointer; top: 105px; left: 45px; width: 180px; height: 75px; position: absolute; z-index: 9996; } #pianoMediaBoxInfo div#PaymentLinkOverlay2 { cursor: pointer; top: 205px; left: 10px; width: 900px; height: 300px; position: absolute; z-index: 9996; } #pianoMediaBoxInfo iframe { border-width: 0px; overflow: hidden; height: 591px; width: 950px; } #pianoMediaBoxModal { z-index: 9980; background-color: black; position: fixed; width:100%; height:100%; left: 0px; top: 0px; display: none; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)"; filter: alpha(opacity=70); -moz-opacity: 0.7; -khtml-opacity: 0.7; opacity: 0.7; } #pnmdMobileBar, #pnmdMobileBarContent, #pnmdMobileIframeLogin, #pnmdMobileCustomerInfo, #pnmdMobileIframePayment { display: none; } .pnmdMobileBtn, .pnmdMobileBtnBlue { display: inline-block; height: 20px; padding: 4px 8px; margin: 7px 0; background: #F5F5F5; border: 1px solid #C0C0C0; border-radius: 4px; color: #929292; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 12px; line-height: 20px; text-align: center; text-decoration: none; vertical-align: middle; } .pnmdMobileBtnBlue { background: #4E9DC5; color: #FFF; border-color: #2284B6; float: left; } .pnmdMobileBtnRight { float: right; } .pnmdMobileBtnLeft { float: left; } #pnmdMobileBarContent { overflow: hidden; height: 0; } #pnmdMobileBtnLogin, #pnmdMobileBtnRegister, #pnmdMobileBtnCloseLogin, #pnmdMobileBtnLogout, #pnmdMobileBtnClosePayment, #pnmdMobile{ display: none; } #pnmdMobileIframeLogin { border-top: 1px solid #EBEBEB; width: 100%; height: 375px; overflow: hidden; } #pnmdMobileIframePayment { position:relative; overflow: hidden; margin: 0px; border-style: solid; border-color: rgb(192, 192, 192); border-width: 0px; height: 100%; width: 100%; display: none; } #pnmdMobileBtnMenu { background: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDHk8N+CjK5PxAJOT10iY/rnmm/8I34J/6H/wD8o03+NOk8SeChK4Pw/IOT11eYfpjim/8ACSeCf+hA/wDKzN/hQBfj8PeDBEgHxDkAwOllIP0zxRRH4h8GGJCPh5IRgdL2Q/rjmigD/9k=") no-repeat scroll center center; /* m-btn-menu.png */ width: 30px; float: right; margin: 0 80px 0 0; padding: 12px 11px; border-bottom: none; border-top: none; border-radius: 0px; } .pnmdMobileBarOpened #pnmdMobileBtnMenu { border-bottom: 1px solid #FAFAFA; } #pnmdMobileBarContent { overflow: visible; height: auto; border-bottom: 1px solid #EBEBEB; } #pnmdMobileBarContent.pnmdMobileBarContentClosed { display: none; border: 0; height: 0; overflow: hidden; } #pnmdMobileBarContent.pnmdMobileBarPaymentOpened { display: block; height: auto; } #pnmdMobileBarContent.pnmdMobileBarPaymentClosed { display: none; border: 0; height: 0; overflow: hidden; } #pnmdMobileCustomerInfo { clear: both; text-align: center; padding: 5px 0px; font-size: 12px; font-family: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif; } #pnmdMobileCustomerInfo p { margin: 0; } #pnmdMobileBar { display: none; height: 44px; line-height: 44px; padding: 0 10px; background: url("data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAEsAAAAWCAYAAACIXmHDAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH3gEQDDIIYyiM9wAAB1BJREFUWMPtmX2MVNUVwH/3vZnZLx7sdqWEjwV2XxXkQygfbWk1tqVp1ZKGaNpG6xPslhaFpojalmpJrGJNRVoVLC3I17PWWEyB1JJY02rZFAO1hNLErvLWNbqw4C7L8nbn433d/rF36Owys7Mz0f88yeSee+85555zcs65574Rhu38G5gNJAEdkIAGxIHTwCbXMh9jCBi2cxC4Dvima5nPUwQM21kNHHIt83gRurnAEtcyHxqGZh3wMLDdtcwVw8hZB1wLjAPOA0eAR13LfJkyQANqFV4NVACVQAIQwARgo2E7e/Ppo8bECBw1AXgS+PoIdDoLPGjYzgvD0FSosarAeT8BjgHfUI5C2fll4C+G7ewq11lxhTcDY4H5wFygEbhb7d1k2M4yyoe1alxm2E4x54ZAANxo2M6fitDKPI66B9igpi8Bi4HLgUWAnaPHzlKNiKkIAnjTtcwuoCtnf5NhO2OBHwM3ArtLPcCwnYnAajWdBKwCflmELVLjVw3bOQJc41pmZgRnTQMeVdMHXctcn7N9EnjNsJ2XlR3LDdvZ71rmvlIiqxi054RxOXCXShsvG2UjiK5cWAi8YdjOuBHQ3qbGliGOugiuZe4Btqvpd0pNw2Jwqxr/U0ZUTVLOArgT+JuKrtVFWBPKubtVSjYCrYbtzCrC91k1/qEI3XNq/EypaRgo/G7DdpYAY1Td8ICvADPU/tYya5UGHHMt82nDdjTgC8C9hu085VpmuojDVgLPAy8qvU4YtlMPdBTgyUb/mSJ6ZUvNmFKdFSp86TB0S13LPFFiVDXkRNUalQLbDNtZCcxT0bWxiJgJrmX+2bCdpUC2tvwL6CxAn103i8idMkKnXuKsmMKfValWp4p+BfAesNu1zDNl1iqAHmCmYTvzgHdzFFxj2M7mItEllJP3G7azCPi7MnRKAfpXVO9nqT6sEDRna1upztIV/mvXMlv4AEBF1So1rQOeykM2cYTRlS3Mrxm2cyVwWLU4+WAHcB8w3bCdZ13LvCWPbg8CX1PTLaU668OAtarmtKteZ1ROi3JB9T1fBO5RtStZMKwGO8yp+n37FXEvOCQ1MWsoiWuZ71fZzu0J2BvBzYbtfBp4AnBUc/o9dbsC/NS1zEMl91ka4JfazQqElBANsWj0M84nkaxBQL/PD8PbzUtvpqfb9JqEPBmDqQg25KQsgUQk1B2diS7xF6mbp55PwWxth9NRk2DiJfuW+UJqW9sNsYTcX6nRJOBXufvpCPxAfJ/mps0lN6UuU1tAW0jmXG8pjL2jjdeJi7n0eIPq2QVXfE6ZuJOVTfmv8OamsP83beuR/BbJFYOMTYlMKuJVoBpBstD5Y2u0BWe65cK8myuaDga7nNq+lFyBPu56tFH1yIxL0Nmix/0tNF9+ho/gwwUhn/nYfvrPyeDKex9/p/GR+5IX3vqvLjig+qongbfVm+q7ESTiH69+vPafp25L3t/yCa8rbdUtn/ED/64Fy7o7UuMmJ6JNtXHWBZKjEv4aSnY6KfGLpSdiHSfPa3smj5bNf5ztG42V8udVOsvigqs0wU1exLr2tFgWQWVjpdxSofEz4NVUSEu3Ft/Z0xc8sHXD0TOtJ7p/N+2q+ltX3b+wfryhP1QbBsvPBVzdmRHXCcGPxICOQaXGzrHx2MYx8ep9W0+v/sdhd//2yRUzHlg7YZtr6FPsd9O9dzRNn76j5DT0mbokrgm6/dq9FwJvcYWgFnhddc2z1DttFGBqUCnCaMxpqTecrTPmhSIxtzZRMbHek4tiQjad8sRzpzy+BFQKeLNaZ5KAGdpAbaxBYOqCur5QXNbp0SDhU8ACdTNeDRhtKbEPuEY1xe0VVYzXBdPU15BqAY0Cxvf4jOtMiwZgviaYr2R8XgPfi3ip02NOjy/fft8b2+EGZkOPNmlmW0rvrI9FiVQ0OPXLee7IPLgcBs8iMudWinLXRX65UvyfL3f9Ehn5viqo/WF1yuIy/zmF5H4gb8OPYJCzpAQZ5uls8lU5AZEUMpIDeCgFElmIV8oBEgREcuA3kmNyey0pJVEoERpEkRRSSoQoLkQSEREJgSCSEZFUipTrLCn0Vwj7DorI65dCH6kFuvSiI1G/3yozYZeIiZp8kS2BuMaoMMIhIBOGtMYF1bKEJJASdF2ryaSDk8k+3/fS4Vu6rtXIEQiJicQoP8q8l4r6znkyeVyIi19Yy4JYxbeOLgZoPX7DnJh/rlDznF0TYW+Gypn11dcfuvMR4Iljjx0dE2XCyUgyQ/mSIUyskI3tt5gHgMrTQIPzxvLTnhh6RkHcywTU1Vc17jrw7ReBxOE22LDtnTt6ulLDNfwilAExEWt8+No9B4F66GB965TNyegClBleF2tWcvScMO51AfTnfKhL5+AZIC0zIUIX2TWq5lwmw+60C7jqIRAy8OeHHwFnfTGosezxRTIcCAoPyFrsAX3ql5WdArwoArc3M0iG25tJRgPXgD+cjN6gqz+XL5BeOpR+1q6S4X9YH/ACN2PN1gAAAABJRU5ErkJggg==") no-repeat scroll right center; } #pnmdMobileBar.pnmdMobileBarOpened { border-bottom: 1px solid #EAEAEA; } #pnmdMobileBoxNotice { width: 279px; height: 141px; background: url("https://bar.pianomedia.eu/pl/images/agora/notice-bg.png") no-repeat; z-index: 999999; position: absolute; overflow: hidden; top: 45px; right: -0px; text-align: left; font-size: 12px; display: none; } #pnmdMobileBoxNotice #pnmdMobileBoxNoticeText { margin: 10px 25px 10px 25px; width: 210px; overflow: hidden; } #pnmdMobileBoxNotice #pnmdMobileBoxNoticeText p{ margin-top: 22px; line-height: 17px; } #pnmdMobileBoxNotice #pnmdMobileBoxNoticeText p #articles_count { color: #008400; font-weight: bold; } #pnmdMobileBoxNotice #pnmdMobileBoxNoticeText p a { text-decoration: none; color: #b00126; background-color: transparent; padding: 0; } #pnmdMobileBoxNotice #pnmdMobileBoxNoticeText p a:hover { text-decoration: underline; } #pnmdMobileBoxNotice #pnmdMobileNoticeClose { position: absolute; top: 25px; right: 15px; font-weight: bold; font-size: 14px; text-decoration: none; border: 1px solid #e1e1e1; padding: 2px 5px; cursor: pointer; line-height: 16px; background: #FFFFFF; color: #b00126; } @media ( max-width: 480px), (max-device-width: 480px) { #pianoMediaBar { background: #FAFAFA; min-height: 44px; height: auto; width: auto; position: relative; left: 0; right: 0; } #pnmdMobileBarContent.pnmdMobileBarContentOpened{ display: block; } #pnmdMobileBar { display: block; } #pianoMediaInfoText, #PianoMediaBarRenewHref { display: none; } #pianoMediaBarOffer, #pianoMediaBarOffer a { font-weight: bold; font-size: 12px; line-height: 1.3em; color: #b00126; margin-top: 7px; margin-left: 0px; float: left; width: 140px; } #pianoMediaDetailsLink { display: none; } #pianoMediaLogo { display: none; } #pianoMediaBarContent { margin-right: 0; } #pianoMediaLogin { right: 0; display: none !important; } } /* forced mobile bar */ .piano-mobile #pianoMediaBar { background: #FAFAFA; min-height: 44px; height: auto; width: auto; position: relative; left: 0; right: 0; } .piano-mobile #pnmdMobileBar { display: block; background-position: right center; } .piano-mobile #pianoMediaInfoText { display: none; } .piano-mobile #pianoMediaDetailsLink { display: none; } .piano-mobile #pianoMediaLogo { display: none; } .piano-mobile #pianoMediaBarContent { margin-right: 0; } .piano-mobile #pianoMediaBarRight, .piano-mobile #PianoMediaBarRenewHref { /* display: none; */ } .piano-mobile #PianoMediaBarRenewHref { display: none; } .piano-mobile #pianoMediaLogin { right: 0; display: none !important; } .piano-mobile #pianoMediaBarRightLoggedDesktop { display: none; } /* Retina */ @media (-webkit-min-device-pixel-ratio: 1.5), ( min--moz-device-pixel-ratio: 1.5), ( -moz-min-device-pixel-ratio: 1.5), ( -o-min-device-pixel-ratio: 1.5/1), ( min-device-pixel-ratio: 1.5), ( min-resolution: 192dpi), ( min-resolution: 1.5dppx) { .piano-mobile #pianoMediaBar { -webkit-background-size: auto 6px; -moz-background-size: auto 6px; -o-background-size: auto 6px; background-size: auto 6px; } #pnmdMobileBarContent.pnmdMobileBarContentOpened{ display: block; } #PianoMediaBarRenewHref { display: none; } #pnmdMobileBtnMenu { background-image: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDHk8N+CjK5PxAJOT10iY/rnmm/8I34J/6H/wD8o03+NOk8SeChK4Pw/IOT11eYfpjim/8ACSeCf+hA/wDKzN/hQBfj8PeDBEgHxDkAwOllIP0zxRRH4h8GGJCPh5IRgdL2Q/rjmigD/9k="); /* m-btn-menu@2.png */ -webkit-background-size: auto 16px; -moz-background-size: auto 16px; -o-background-size: auto 16px; background-size: auto 16px; } } .prolongMobile { background: url("https://bar.pianomedia.eu/pl/images/predlzit-mobile.png"); width: 201px; height: 30px; display: block; text-transform: uppercase; margin: 0px auto; color: #fff; text-align: center; text-decoration: none; font-weight: bold; } #pnmdMobileBtnRegister { display: none; text-transform: capitalize; } #pnmdMobileBarContent.pnmdMobileBarContentOpened{ display: block; }</style>';
        this.pianoroot = document.getElementById('piano-root');

        if (this.pianoroot == null || typeof(this.pianoroot) == 'undefined')
        {
            this.pianoroot = document.createElement('div');
            this.pianoroot.setAttribute("id", "piano-root");
        }

        this.pianoroot.innerHTML = html;

        var has_parent = true;
        var parent = document.getElementById('pravda-sk-body');

        if (parent == null)
        {
            parent = document.body;

            if (parent == null)
            {
                has_parent = false;

                window.onload = function()
                {
                    parent = window.document.body;
                    if (parent.firstChild) {
                        parent.insertBefore(PianoMedia.renderer.pianoroot, parent.firstChild);
                    }
                    else {
                        parent.appendChild(PianoMedia.renderer.pianoroot);
                    }
                    PianoMedia.renderer.initMode();
                    PianoMedia.auth.init();
                }
            }
        }

        if (has_parent == true)
        {
            if (!PianoMedia.piano_root_placed)
            {
                if (parent.firstChild) {
                    parent.insertBefore(this.pianoroot, parent.firstChild);
                }
                else {
                    parent.appendChild(this.pianoroot);
                }
            }

            this.initMode();
            PianoMedia.auth.init();
        }

        try {
            if (typeof(pianoArticles) == 'undefined')
            {
                pianoArticles = '';
            }
        } catch (e) {
            pianoArticles = '';
        }
        if (pianoArticles == '')
        {
            var onLoadFunctions = [];
            if (window.onload != null && typeof(window.onload) == 'function')
            {
                onLoadFunctions.push(window.onload);
            }

            onLoadFunctions.push(function(){
                if (pianoArticlesDefault != pianoArticles) {
                    PianoMedia.auth.reloadArticle();
                }
            });

            window.onload = function()
            {
                for(var i = 0; i < onLoadFunctions.length; i++)
                {
                    onLoadFunctions[i]();
                }
            }
        }
    },

    initMode: function()
    {
        var getRootStyle = function ()
        {
            return document.getElementById('piano-root').style;
        };

        if (PianoMedia.mode == 'bar_hidden')
        {
            var root_style = getRootStyle();
            root_style.display = 'none';
        }

        if (PianoMedia.mode == 'bar_semi_hidden')
        {
            document.getElementById('pianoMediaBarContent').style.display = 'none';
            document.getElementById('pianoMediaBar').style.height = 'auto';
            document.getElementById('pianoMediaBar').style.minHeight = '0px';
            document.getElementById('pnmdMobileBar').style.display = 'none';
        }

        if (PianoMedia.mode == 'bar_mobile' || PianoMedia.isMobile())
        {
            PianoMedia.mobile.init();
        }

        if (PianoMedia.mode == 'init_cookie')
        {
            var root_style = getRootStyle();
            root_style.position = 'absolute';
            root_style.left = '-9999px';
            root_style.visibility = 'hidden';
        }
    },

    setArticleCount:function (count)
    {
        this.articleCount = count;
    },

    showLoggedUser: function()
    {
        document.getElementById('pianoMediaBarRightLogged').style.display = 'block';
        document.getElementById('pianoMediaBoxModal').style.display = 'none';
        document.getElementById('pianoMediaBoxInfoCover').style.display = 'none';

        PianoMedia.mobile.showLoggedUser();

        if (PianoMedia.renderer.gup('pianobar_mode') != '')
        {
            PianoMedia.clickPayment();
        }
    },

    showUnLoggedUser: function()
    {
        if (typeof document.getElementById('pianoMediaInfoText') !== 'undefined' && document.getElementById('pianoMediaInfoText') != null)
        {
            document.getElementById('pianoMediaInfoText').innerHTML = document.getElementById('pianoMediaInfoText').innerHTML.replace('XXX', PianoMedia.template.dataProvider.newArticlesCount);
        }

        document.getElementById('pianoMediaBarRight').style.width = '100%';
        document.getElementById('pianoMediaBarRightUnlogged').style.display = 'block';
        document.getElementById('pianoMediaLogin').style.display = 'block';
        document.getElementById('piano-root').style.display = 'block';

        PianoMedia.mobile.showUnloggedUser();

        if (PianoMedia.mode == 'bar_lock')
        {
            document.getElementById('pianoMediaDetailsLink').setAttribute('onclick', '');
            PianoMedia.box.info.open();
            PianoMedia.box.info.disableClose();
        }

        if (PianoMedia.mode == 'bar_open')
        {
            if (PianoMedia.open_capping != 0)
            {
                var cookie_open_capping =  PianoMedia.cookieHandler.getCookie('PianoMedia.cookie.open_capping');
                var d = new Date();

                if (cookie_open_capping == null)
                {
                    PianoMedia.cookieHandler.setCookieToDate('PianoMedia.cookie.open_capping', 1, new Date(d.getFullYear(), d.getMonth(), d.getDate()+1, 0, 0, 0 , 0));
                    PianoMedia.box.info.open();
                }
                else
                {
                    if (cookie_open_capping < PianoMedia.open_capping)
                    {
                        PianoMedia.cookieHandler.setCookieToDate('PianoMedia.cookie.open_capping', ++cookie_open_capping, new Date(d.getFullYear(), d.getMonth(), d.getDate()+1, 0, 0, 0 , 0));
                        PianoMedia.box.info.open();
                    }
                }
            }
            else
            {
                PianoMedia.box.info.open();
            }
        }

        if (PianoMedia.renderer.gup('pianobar_mode') != '') {
            PianoMedia.clickPayment();
        }
    },

    gup: function(name)
    {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);

        if (results == null)
        {
            return "";
        }
        else
        {
            return results[1];
        }
    },

    getElement: function(element_id)
    {
        if (typeof this.elements[element_id] != undefined)
        {
            this.elements[element_id] = document.createElement(element_id);
            this.elements[element_id].id = element_id;
        }

        return this.elements[element_id];
    }
};
PianoMedia.boxAbstract = {

    showModal: true,

    open: function()
    {
        if (typeof document.getElementById('pianoMediaBoxInfoCover') != 'undefined' && document.getElementById('pianoMediaBoxInfoCover') != null)
        {
            document.getElementById('pianoMediaBoxInfoCover').style.display = 'none';
        }
        if (typeof document.getElementById('pianoMediaBoxLogin') != 'undefined' && document.getElementById('pianoMediaBoxLogin') != null)
        {
            document.getElementById('pianoMediaBoxLogin').style.display = 'none';
        }

        if (PianoMedia.isMobile() || PianoMedia.isMobileBarDisplayed())
        {
            this.preOpen();
            this.mobile();
            this.postOpen();
        }
        else
        {
            this.preOpen();
            this.displayModal();
            this.postOpen();
        }
    },

    displayModal: function()
    {
        if (document.getElementById(this.element_id) == null) return;
        if (this.showModal == true)
        {
            PianoMedia.box.modal.open();
        }

        document.getElementById(this.element_id).style.display = 'block';
    },

    loadIframe: function()
    {
        var self = this;
        this.url(function (url) {
            document.getElementById(self.iframe_id).src = url;
        });
    },

    getParams: function(srcUrl, cb, query_string, options) {
        this.options = this.options || {};

        if (typeof query_string == 'undefined')
        {
            query_string = '';
        }

        if (typeof options != 'undefined')
        {
            PianoMediaQuery.extend(this.options, options);
        }

        if (typeof this.options !== 'undefined')
        {
            if (typeof this.options['promotion_tag'] !== 'undefined')
            {
                query_string += '&promotion_tag=' + this.options['promotion_tag']
            }
            if (typeof this.options['access'] !== 'undefined')
            {
                query_string += '&access=' + this.options['access']
            }
            if (typeof this.options['version'] !== 'undefined')
            {
                query_string += '&version=' + this.options['version']
            }
        }

        _nsq.push(["getUID", function(UID) {
            var finalUrl = srcUrl + '?service_id=' + PianoMedia.getServiceId() + '&loc=' + PianoMedia.getLocation() + "&uid=" + UID + query_string;

            if (PianoMedia.gaq_linker && typeof _gaq !== 'undefined') {
                var loaded = false;
                _gaq = _gaq || [];
                _gaq.push(function() {
                    if (!loaded) {
                        loaded = true;
                        var pageTracker = _gat._getTrackerByName();
                        cb(pageTracker._getLinkerUrl(finalUrl));
                    }
                });
                setTimeout(function() {
                    if (!loaded) {
                        loaded = true;
                        cb(finalUrl);
                    }
                }, 500);
            } else {
                cb(finalUrl);
            }
        }, 500]);
    },

    getCustomUrl: function(options)
    {
        if (typeof options != 'undefined' && typeof options['custom_url'] != 'undefined' && options['custom_url'].trim().length > 0)
        {
            return '/custom/' + options['custom_url'];
        }
        else
        {
            return PianoMedia.custom_url;
        }
    },

    close: function()
    {
        if (typeof document.getElementById(this.element_id) !== 'undefined' && document.getElementById(this.element_id) !== null && document.getElementById(this.element_id).style.display !== 'none')
        {
            document.getElementById(this.element_id).style.display = 'none';
            PianoMedia.box.modal.close();
        }

        if (PianoMedia.isMobile() || PianoMedia.isMobileBarDisplayed())
        {
            document.getElementById('pnmdMobileBarContent').className = "pnmdMobileBarContentClosed";
            PianoMedia.box.modal.close();
        }
    },

    toggle: function(options)
    {
        this.options = options;
        var display = document.getElementById(this.element_id).style.display;

        if ('block' == display)
        {
            this.close();
        }
        else
        {
            this.open();
        }
    },

    createOverlays: function()
    {
        if (document.getElementById('LoginLinkOverlay') === null) {
            LoginLinkOverlay = document.createElement('div');
            LoginLinkOverlay.setAttribute('id', 'LoginLinkOverlay');
            document.getElementById('pianoMediaBoxInfo').appendChild(LoginLinkOverlay);
            LoginLinkOverlay = document.getElementById('LoginLinkOverlay');
            PianoMediaQuery(LoginLinkOverlay).bindEvent("click", function(){PianoMedia.box.login.toggle()});
        }

        if (document.getElementById('PaymentLinkOverlay') === null) {
            PaymentLinkOverlay = document.createElement('div');
            PaymentLinkOverlay.setAttribute('id', 'PaymentLinkOverlay');
            document.getElementById('pianoMediaBoxInfo').appendChild(PaymentLinkOverlay);
            PaymentLinkOverlay = document.getElementById('PaymentLinkOverlay');
            PianoMediaQuery(PaymentLinkOverlay).bindEvent('click',function(){PianoMedia.clickPayment()});
        }
    },

    destroyOverlays: function()
    {
        if (document.getElementById('LoginLinkOverlay') !== null)
        {
            document.getElementById('pianoMediaBoxInfo').removeChild(document.getElementById('LoginLinkOverlay'));
        }

        if (document.getElementById('PaymentLinkOverlay') !== null)
        {
            document.getElementById('pianoMediaBoxInfo').removeChild(document.getElementById('PaymentLinkOverlay'));
        }
    },

    calculateBoxPosition: function(boxElementId)
    {
        var doc = document.documentElement, body = document.body;
        scroll_position  = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
        document.getElementById(boxElementId).style.top = scroll_position + 'px';
    }
};

PianoMedia.box = {

    login: {
        element_id: 'pianoMediaBoxLogin',
        iframe_id: 'pianoMediaBoxLoginIframe',

        url: function(cb)
        {
            var url = PianoMedia.protocol + PianoMedia.bar_url + '/authent/login/' + this.getCustomUrl(this.options) + '/';
            this.getParams(url, function(finalUrl) {
                cb(finalUrl);
            });
        },

        preOpen: function()
        {
            window.scrollTo(0, 0);
            this.loadIframe();
            this.destroyOverlays();
        },

        postOpen: function()
        {
            if (typeof(PianoMedia.auth.user) != 'undefined')
            {
                PianoMedia.clickPayment();
            }
            
        },

        mobile: function()
        {
            PianoMedia.mobile.openLogin();
        }
    },

    detail: {
        element_id: 'pianoMediaProfile',

        preOpen: function() {
            PianoMedia.box.info.close();
        },
        postOpen: function() { return true; },

        closeDetail: function() {
            if (typeof document.getElementById(this.element_id) !== 'undefined' && document.getElementById(this.element_id) !== null && document.getElementById(this.element_id).style.display == 'block')
            {
                PianoMedia.box.modal.close();
                document.getElementById(this.element_id).style.display = 'none';
            }
        },

        mobile: function() {
            PianoMedia.mobile.toggleDetail();
        }
    },

    info: {
        element_id: 'pianoMediaBoxInfoCover',
        iframe_id: 'pianoMediaBoxInfoIframe',

        url: function(cb)
        {
            var url = PianoMedia.protocol + PianoMedia.bar_url + '/info/index/' + this.getCustomUrl(this.options) + '/';
            

            this.getParams(url, function(finalUrl) {
                cb(finalUrl);
            });
        },

        url_payment: function(cb)
        {
            var url = PianoMedia.protocol + PianoMedia.bar_url + '/payment/index/' + this.getCustomUrl(this.options) + '/';
            this.getParams(url, function(finalUrl) {
                cb(finalUrl);
            });
        },

        url_prelunch: function(cb)
        {
            var url = PianoMedia.protocol + PianoMedia.bar_url + '/registerbox/pianomedia/' + this.getCustomUrl(this.options) + '/';
            this.getParams(url, function(finalUrl) {
                cb(finalUrl);
            });
        },

        preOpen: function()
        {
            this.calculateBoxPosition('pianoMediaBoxInfo');

            if (true === PianoMedia.getPaymentStatus())
            {
                this.url = this.url_payment;
                this.destroyOverlays();
            }
            else
            {
               
            }

            this.loadIframe();
            PianoMedia.box.login.close();
            PianoMedia.box.detail.close();
        },

        postOpen: function()
        {
            return true;
        },

        mobile: function()
        {
            // ##COUNTRY:SI|SOLO_LAVOZ|SOLO_VIJESTI|SOLO_DUMONT|PL:agora-magazines##
            PianoMedia.mobile.openPayment();
            // ##COUNTRY:SI|SOLO_LAVOZ|SOLO_VIJESTI|SOLO_DUMONT|PL:agora-magazines##
            
            
        },

        disableClose: function() {
            PianoMedia.box.info.close = function()
            {
                window.location = PianoMedia.protocol + PianoMedia.bar_url + '/info/exit/?service_id=' + PianoMedia.getServiceId();
            }
        }
    },

    ddbox: {
        element_id: 'pianoMediaBoxInfoCover',
        iframe_id: 'pianoMediaBoxInfoIframe',
        action: '',
        query_string: '',
        mobile_ready: false,

        loadDdbox: function() {
            if (typeof this.options !== 'undefined')
            {
                if (typeof this.options.action !== 'undefined')
                {
                    this.action = this.options.action;
                }
                if (typeof this.options.access !== 'undefined')
                {
                    this.query_string = "&access=" + this.options.access;
                }
                if (typeof this.options.mobile_ready !== 'undefined')
                {
                    this.mobile_ready = this.options.mobile_ready;
                }
            }
        },

        url: function(cb)
        {
            this.loadDdbox();
            var url = PianoMedia.protocol + PianoMedia.bar_url + '/ddbox/' + this.action;

            this.getParams(url, function(finalUrl) {
                cb(finalUrl);
            });
        },

        preOpen: function()
        {
            this.calculateBoxPosition('pianoMediaBoxInfo');

            this.loadIframe();
            PianoMedia.box.login.close();
            PianoMedia.box.detail.close();
        },

        postOpen: function()
        {
            return true;
        },

        mobile: function()
        {
            this.loadDdbox();
            if (this.mobile_ready)
            {
                this.action += 'mobile';
            }

            PianoMedia.mobile.openDdbox(this.action, this.query_string);
        }
    },

    package: {
        element_id: 'pianoMediaBoxInfoCover',
        iframe_id: 'pianoMediaBoxInfoIframe',
        query_string: '',

        url: function(cb)
        {
            var url = PianoMedia.protocol + PianoMedia.bar_url + '/payment/package/' + this.getCustomUrl(this.options) + '/';
            this.getParams(url, function(finalUrl) {
                cb(finalUrl);
            }, this.query_string);
        },

        loadPackage: function()
        {
            var geo_tag = '';
            // fallback for old implementation (package_promo: true/false)
            if (this.options.package_promo == true || this.options.package_promo == 'true')
            {
                this.options.package_promo = 100;
            }
            if (this.options.package_promo == false || this.options.package_promo == 'false')
            {
                this.options.package_promo = 0;
            }
            // fallback for old implementation (package_promo: true/false)

            var promoRegex = /^\d+$/;
            if (!promoRegex.test(this.options.package_promo))
            {
                this.options.package_promo = 0;
            }

            var codeRegex = /^[A-Z]{2}$/;
            if (codeRegex.test(this.options.geo_tag))
            {
                geo_tag = '&geo_tag=' + this.options.geo_tag;
            }

            this.options.package_prolong = this.options.package_prolong ? 1 : 0;
            this.options.package_gift = this.options.package_gift ? 1 : 0;
            this.query_string = "&package_id=" + this.options.package_id + "&package_promo=" + this.options.package_promo + "&package_prolong=" + this.options.package_prolong + "&package_gift=" + this.options.package_gift + geo_tag;
        },

        preOpen: function()
        {
            this.calculateBoxPosition('pianoMediaBoxInfo');

            this.loadPackage();
            this.loadIframe();

            PianoMedia.box.login.close();
        },

        postOpen: function()
        {
            return true;
        },

        mobile: function()
        {
            this.loadPackage();
            PianoMedia.mobile.openPackage(this.query_string, this.options);
        }
    },

    payment: {
        element_id : 'pianoMediaBoxInfoCover',
        iframe_id: 'pianoMediaBoxInfoIframe',
        preselectedPrice: '',

        url: function(cb, options)
        {
            var self = this;

            var action = 'index';
            if (PianoMedia.isMobile() || PianoMedia.isMobileBarDisplayed())
            {
                action = 'mobile';
            }

            var url = PianoMedia.protocol + PianoMedia.bar_url + '/payment/' + action +'/' + this.getCustomUrl(this.options) + '/';

            this.getParams(url, function(finalUrl) {
                cb(finalUrl + "&preselected_price=" + self.getPreselectedPrice());
            }, '', options);
        },
        
        preOpen: function()
        {
            this.calculateBoxPosition('pianoMediaBoxInfo');

            

            this.loadIframe();
            PianoMedia.box.login.close();
            PianoMedia.box.detail.close();
        },

        postOpen: function()
        {
            return true;
        },

        mobile: function()
        {
            var query_string = "&preselected_price=" + this.getPreselectedPrice();
            PianoMedia.mobile.openPayment(query_string, this.options);
        },

        setPreselectedPrice: function(preselectedPrice)
        {
            this.preselectedPrice = preselectedPrice;
        },

        getPreselectedPrice: function()
        {
            return this.preselectedPrice;
        }
    },

    register: {
        element_id : 'pianoMediaBoxInfoCover',
        iframe_id: 'pianoMediaBoxInfoIframe',

        url: function(cb)
        {
            var url = PianoMedia.protocol + PianoMedia.bar_url + '/register/index' + this.getCustomUrl(this.options) + '/';

            

            this.getParams(url, function(finalUrl) {
                cb(finalUrl);
            });
        },
        preOpen : function()
        {
            this.loadIframe();
            PianoMedia.box.login.close();
        },
        postOpen: function()
        {
            return true;
        },
        mobile: function()
        {
            PianoMedia.mobile.openRegister();
        }
    },

    mpNotice: {
        element_id : 'pianoMediaBoxNotice',

        preOpen: function()
        {
            

            

            this.showModal = false;
            

            var constantSuffix = (PianoMedia.custom_label.length > 0) ? ('.' + PianoMedia.custom_label) : '';

            if (PianoMedia.template.dataProvider.remainingArticlesCount == 1)
            {
                var text =  PianoMedia.t('bar.notice_box.text1' + constantSuffix);
            }
            else if (PianoMedia.template.dataProvider.remainingArticlesCount > 1 && PianoMedia.template.dataProvider.remainingArticlesCount < 5)
            {
                var text =  PianoMedia.t('bar.notice_box.text2-4' + constantSuffix);
            }
            else if (PianoMedia.template.dataProvider.remainingArticlesCount >= 5 || PianoMedia.template.dataProvider.remainingArticlesCount <= 0)
            {
                var text =  PianoMedia.t('bar.notice_box.text5' + constantSuffix);
            }

            // TODO: ensure that pnmdMobileBoxNotice is in all templates to remove this condition
            if (document.getElementById('pnmdMobileBoxNotice') !== null && (PianoMedia.isMobile() || PianoMedia.isMobileBarDisplayed()))
            {
                this.displayModal();
                this.element_id = 'pnmdMobileBoxNotice';
                document.getElementById('pnmdMobileBoxNoticeText').innerHTML = text.replace('XXX', PianoMedia.template.dataProvider.remainingArticlesCount);
            }

            document.getElementById('pianoMediaBoxNoticeText').innerHTML = text.replace('XXX', PianoMedia.template.dataProvider.remainingArticlesCount);
            document.getElementById('pnmdTemplate_meteredreminder').innerHTML = document.getElementById('pnmdTemplate_meteredreminder').innerHTML.replace('{REFERER}', document.URL);
        },

        postOpen: function()
        {
            return true;
        },

        mobile: function()
        {
            this.displayModal();
        }
    },

    metered: {
        element_id : 'pianoMediaBoxInfoCover',
        iframe_id: 'pianoMediaBoxInfoIframe',

        url: function(cb)
        {
            var self = this;

            _nsq.push(["getUID", function(UID) {
                cb(PianoMedia.protocol + PianoMedia.bar_url + '/info/metered' + this.getCustomUrl(this.options) + '/?service_id=' + PianoMedia.getServiceId() + '&loc=' + PianoMedia.getLocation() + "&uid=" + UID);
            }, 500]);
        },

        preOpen : function()
        {
            this.calculateBoxPosition('pianoMediaBoxInfo');

            this.loadIframe();
            PianoMedia.box.login.close();
        },
        mobile: function()
        {
            PianoMedia.mobile.open('/info/meteredmobile');
        },

        postOpen: function()
        {
            return true;
        }
    },

    modal: {
        open: function()
        {
            document.getElementById('pianoMediaBoxModal').style.display = 'block';
        },

        close: function()
        {
            document.getElementById('pianoMediaBoxModal').style.display = 'none';
        },

        mobile: function()
        {

        }
    },

    activation: {
        element_id: 'pianoMediaBoxInfoCover',
        iframe_id: 'pianoMediaBoxInfoIframe',

        url: function(cb)
        {
            var url = PianoMedia.protocol + PianoMedia.bar_url + '/activation/index' + PianoMedia.custom_url + '/';

            this.getParams(url, function(finalUrl) {
                cb(finalUrl);
            });
        },

        preOpen: function()
        {
            this.calculateBoxPosition('pianoMediaBoxInfo');

            this.loadIframe();
            PianoMedia.box.login.close();
            PianoMedia.box.detail.close();
        },

        postOpen: function()
        {
            return true;
        },

        mobile: function()
        {
            PianoMedia.mobile.open("/activation/index");
        }
    }
};

PianoMediaQuery.extend(PianoMedia.box.login, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.info, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.ddbox, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.package, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.mpNotice, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.metered, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.payment, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.register, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.detail, PianoMedia.boxAbstract);
PianoMediaQuery.extend(PianoMedia.box.activation, PianoMedia.boxAbstract);

PianoMedia.auth = {

    user: undefined,

    init: function()
    {
        try {
            if (typeof(pianoArticles) == 'undefined')
            {
                pianoArticles = '';
            }
        } catch (e) {
            pianoArticles = '';
        }

        try {
            if (typeof(pianoUserVerify) == 'undefined')
            {
                pianoUserVerify = '';
            }
        } catch (e) {
            pianoUserVerify = '';
        }

        try {
            if (typeof(pianoArticlesDefault) == 'undefined')
            {
                pianoArticlesDefault = pianoArticles;
            }
        } catch (e) {
            pianoArticlesDefault = pianoArticles;
        }

        PianoMedia.uid.run();

        var timeout = PianoMedia.isMobile() ? 20000 : 10000;

        _nsq.push(["getUID", function(UID, status, UUID, p_sid, p_aid) {
            PianoMedia.triggerCallback("onUIDDetected", [UID]);
            if (p_sid && p_sid != "_")
            {
                PianoMedia.service_id = p_sid;
            }
            if (p_aid && p_aid != "_")
            {
                PianoMedia.article_id = p_aid;
            }

            if (PianoMedia.mode == 'init_cookie')
            {
                var url = PianoMedia.bar_url_no_lang + '/auth/init_cookie.php?bv=' + PianoMedia.version;
                url += '&uid=' + UID;
                url += '&uuid=' + UUID;
                url += '&client_id=' + PianoMedia.getClientId();
            }
            else
            {
                var referer_param = "piano_referer_bar";
                var referer = PianoMedia.cookieHandler.getCookie(referer_param);
                if (referer)
                {
                    PianoMedia.cookieHandler.deleteSimpleCookie(referer_param);
                }
                else
                {
                    referer = PianoMedia.referer || document.referrer || "";
                }

                var url = PianoMedia.bar_url_no_lang + '/auth/index.php?bv=' + PianoMedia.version;
                url += '&uid=' + UID;
                url += '&uuid=' + UUID;
                url += '&art=' + pianoArticlesDefault;
                url += '&vrf=' + pianoUserVerify;
                url += '&piano_visit_key=' + PianoMedia.cookieHandler.getVisitKeyCookie();
                url += '&reload_customer=' + PianoMedia.getReloadCustomer();
                url += '&loc=' + PianoMedia.getLocation();
                url += '&client_id=' + PianoMedia.getClientId();
                url += '&service_id=' + PianoMedia.getServiceId();
                url += '&article_id=' + PianoMedia.getArticleId();
                url += '&ref=' + encodeURIComponent(referer);
            }

            PianoMedia.loadJs(url);
        }, timeout]);
    },

    reloadArticle: function()
    {
        _nsq.push(["getUID", function(UID) {
            var url = PianoMedia.bar_url_no_lang + '/auth/get_article.php?bv=' + PianoMedia.version;
            url += '&uid=' + UID;
            url += '&art=' + pianoArticles;
            url += '&vrf=' + pianoUserVerify;
            url += '&piano_visit_key=' + PianoMedia.cookieHandler.getVisitKeyCookie();
            url += '&loc=' + PianoMedia.getLocation();
            url += '&service_id=' + PianoMedia.getServiceId();

            PianoMedia.loadJs(url);
        }, PianoMedia.isMobile() ? 10000 : 5000]);
    },

    setUnloggedUser: function (pianovisitkey, proposed_expiration)
    {
        this.user = undefined;

        if (PianoMedia.mode != 'bar_hidden' && PianoMedia.mode != 'init_cookie')
        {
            PianoMedia.renderer.showUnLoggedUser();
        }

        var piano_unique_key = PianoMedia.cookieHandler.getCookie('piano_unique_key');

        PianoMedia.cookieHandler.deleteCookie('pianovisitkey');
        PianoMedia.cookieHandler.deleteCookie('piano_unique_key');

        var expiration = this.getCookieExpiration(proposed_expiration);

        if (typeof(pianovisitkey) !== 'undefined' && pianovisitkey != null)
        {
            PianoMedia.cookieHandler.setCookie('pianovisitkey', pianovisitkey, expiration);
        }

        this.checkFirstLoad(pianovisitkey);

        if (piano_unique_key !== null)
        {
            PianoMedia.refreshMedia();
        }

        PianoMedia.triggerCallback("onBarLoaded", [false]);
    },

    setLoggedUser: function(response, proposed_expiration)
    {
        var piano_unique_key = PianoMedia.cookieHandler.getCookie('piano_unique_key');
        this.user = response.user;

        if (PianoMedia.mode != 'bar_hidden' && PianoMedia.mode != 'init_cookie')
        {
            PianoMedia.renderer.showLoggedUser();
        }

        var expiration = this.getCookieExpiration(proposed_expiration);

        PianoMedia.cookieHandler.setCookie('pianovisitkey', response.user, expiration);
        PianoMedia.cookieHandler.setCookie('piano_unique_key', response.user_unique_id, expiration);

        this.checkFirstLoad(response.user);

        if (piano_unique_key != response.user_unique_id)
        {
            PianoMedia.refreshMedia();
        }

        var userData = {
            email: PianoMedia.template.dataProvider.email,
            remainingDays: PianoMedia.template.dataProvider.remainingDaysRaw
        };

        PianoMedia.triggerCallback("onBarLoaded", [true, userData]);
    },

    getCookieExpiration: function(expiration)
    {
        return (typeof expiration === 'undefined' || expiration === null || expiration < 0) ? 7300 : expiration;
    },

    checkFirstLoad: function(piano_visit_key)
    {
        if (PianoMedia.mode == 'init_cookie')
        {
            var referer_param = 'piano_referer';
            var referer_bar_param = 'piano_referer_bar';
            var referer_bar = PianoMedia.cookieHandler.getCookie(referer_bar_param);
            var referer = referer_bar || PianoMedia.referer;
            var pianovisitkey_param = 'pianovisitkey';
            var stored_key = PianoMedia.cookieHandler.getCookie(pianovisitkey_param);
            var cookie_stored = false;
            var is_post = PianoMedia.is_post;
            if (typeof stored_key != undefined && stored_key != '' && stored_key != null)
            {
                cookie_stored = true;
                if (is_post !== true)
                {
                    PianoMedia.cookieHandler.setSimpleCookie(referer_param, referer);
                    PianoMedia.cookieHandler.setSimpleCookie(referer_bar_param, referer);
                    window.location.reload();
                    return;
                }
            }
            if (!cookie_stored || is_post === true)
            {
                var f = document.createElement("form");
                var s = f.submit;
                f.setAttribute('method', "post");
                f.setAttribute('action', window.location);
                
                var insertArg = function (name, value) {
                    var i = document.createElement("input");
                    i.setAttribute('type', "hidden");
                    i.setAttribute('name', name);
                    i.setAttribute('value', value);
                    f.appendChild(i);
                };
                if (!cookie_stored) {
                    insertArg(pianovisitkey_param, piano_visit_key);
                    insertArg(referer_param, referer);
                }
                var post_args = PianoMedia.post_args;
                if (post_args) {
                    for (var i = 0; i < post_args.length; i++) {
                        var arg = post_args[i];
                        var name = arg[0];
                        var values = arg[1];
                        for (var j = 0; j < values.length; j++) {
                            insertArg(name, values[j]);
                        }
                    }
                }

                document.getElementsByTagName('body')[0].appendChild(f);

                try {
                    s.call(f);
                }
                catch (e) {
                    s();
                }
            }
        }
    },

    logOut: function() {
        var logOutUrl = PianoMedia.protocol + PianoMedia.bar_url + '/authent' + '/logout' + '/?&service_id=' + PianoMedia.getServiceId() + '&loc=' + PianoMedia.getLocation();
        window.location = logOutUrl;
    }
};
PianoMedia.timer = {

    totalTime: 0,
    initialized: false,
    active: false,
    started: false,
    pianoTimer: null,
    readerId: null,

    secondsTime: function()
    {
        if (this.active)
        {
            PianoMedia.timer.totalTime++;
            PianoMedia.timer.scheduledSend();
            //window.document.title = 'measuring: ' + PianoMedia.timer.totalTime;
        }
        else
        {
            //window.document.title = 'stop at: ' + PianoMedia.timer.totalTime;
        }

        this.pianoTimer = setTimeout('PianoMedia.timer.secondsTime()', 1000);
    },

    activate: function()
    {
        if ( this.active == false)
        {
            if (!this.started)
            {
                this.started = true;
                this.pianoTimer = setTimeout('PianoMedia.timer.secondsTime()', 1000);
            }

            this.active = true;
        }
    },


    start: function()
    {
        if (!this.started)
        {
            this.started = true;
            this.pianoTimer = setTimeout('PianoMedia.timer.secondsTime()', 1000);
            this.activate();
        }
    },

    stop: function()
    {
        this.active = false;
    },

    scheduledSend: function()
    {
        var logInterval = Math.round(0.4*(Math.sqrt(this.totalTime))) * 5;

        if (0 == this.totalTime % logInterval)
        {
            this.sendData();
        }
    },

    sendData: function() {
        if (this.totalTime == 0)
        {
            return;
        }

        var s = document.createElement('script');
        s.async = true;
        s.src = '//' + PianoMedia.harvester_url + '?&service_id=' + PianoMedia.getServiceId() + '&d=' + this.readerId.harvester + "&w=" + this.totalTime;
        document.body.appendChild(s);
        document.body.removeChild(s);
    },

    init: function(readerId)
    {
        this.readerId = readerId;

        if (this.initialized) {
            this.sendData();
            this.totalTime = 0;
        } else {
            this.initialized = true;
            if (typeof(PianoMedia.auth.user) != 'undefined')
            {
                var callback_start = function()
                {
                    PianoMedia.timer.start();
                };

                var callback_activate = function()
                {
                    PianoMedia.timer.activate();
                };

                var callback_stop = function()
                {
                    PianoMedia.timer.stop();
                };

                var callback_send = function()
                {
                    PianoMedia.timer.sendData();
                }

                PianoMediaQuery(window).bindEvent("click", callback_activate);
                PianoMediaQuery(window).bindEvent("scroll", callback_activate);
                PianoMediaQuery(window).bindEvent("unload", callback_send);
                PianoMediaQuery(document).bindEvent("unload", callback_send);

                var elements = [document, window, "embed", "object"];
                var activate_events = ["focus", "focusin", "DOMActivate", "DOMFocusIn", "activate"];
                var stop_events = ["blur", "focusout", "DOMDeActivate", "DOMFocusOut","deactivate"];

                for (x in elements)
                {
                    PianoMediaQuery(elements[x]).bindEvent('mousemove', callback_start);

                    for (y in activate_events)
                    {
                        PianoMediaQuery(elements[x]).bindEvent(activate_events[y], callback_activate);
                    }

                    for (z in stop_events)
                    {
                        PianoMediaQuery(elements[x]).bindEvent(stop_events[z], callback_stop);
                    }
                }
            }
        }
    }
}
var pianoUserBar = {'openPianoBoxInpage' : {}};

pianoUserBar.openPianoBoxInpage = function()
{
    PianoMedia.box.payment.open();
}
PianoMedia.mobile = {
    barMobile:       undefined,
    barContent:      undefined,
    btnCloseLogin:   undefined,
    btnLogin:        undefined,
    btnLogout:       undefined,
    btnMenu:         undefined,
    btnRegister:     undefined,
    btnClosePayment: undefined,

    devicePixelRatio: 1,
    scrollToY: 44,

    init: function()
    {
        if (this.pianoroot == null || typeof(this.pianoroot) == 'undefined')
        {
            this.pianoroot = document.getElementById('piano-root');
        }

        if (this.pianoroot.className.indexOf('piano-mobile') == -1)
        {
            this.pianoroot.className = 'piano-mobile';
        }

        if (typeof(window.devicePixelRatio) != 'undefined')
        {
            this.devicePixelRatio = window.devicePixelRatio;
        }

        if ("onorientationchange" in window)
        {
            window.addEventListener("orientationchange", function() {
                PianoMedia.mobile.init();
            }, false);
        }

        this.initElements();

        if (PianoMedia.mode != 'bar_semi_hidden' && document.documentElement.scrollTop === 0 && window.pageYOffset < this.scrollToY)
        {
            setTimeout("window.scrollTo(0, PianoMedia.mobile.scrollToY);", 100);
        }
    },

    initElements: function()
    {
        if (this.barMobile == undefined)
        {
            this.barMobile = document.getElementById('pnmdMobileBar');
        }

        if (this.barContent == undefined)
        {
            this.barContent = document.getElementById('pnmdMobileBarContent');
        }

        if (this.btnCloseLogin == undefined)
        {
            this.btnCloseLogin = document.getElementById('pnmdMobileBtnCloseLogin');
        }

        if (this.btnLogin == undefined)
        {
            this.btnLogin = document.getElementById('pnmdMobileBtnLogin');
        }

        if (this.btnLogout == undefined)
        {
            this.btnLogout = document.getElementById('pnmdMobileBtnLogout');
        }

        if (this.btnMenu == undefined)
        {
            this.btnMenu = document.getElementById('pnmdMobileBtnMenu');
        }

        if (this.btnRegister == undefined)
        {
            this.btnRegister = document.getElementById('pnmdMobileBtnRegister');
        }

        if (this.btnClosePayment == undefined)
        {
            this.btnClosePayment = document.getElementById('pnmdMobileBtnClosePayment')
        }
    },

    url: function(cb, path, query_string, options)
    {
        if (typeof query_string == 'undefined')
        {
            query_string = '';
        }

        var url = PianoMedia.protocol + PianoMedia.bar_url + path + PianoMedia.boxAbstract.getCustomUrl(options) + '/';

        PianoMedia.boxAbstract.getParams(url, function(finalUrl) {
            cb(finalUrl);
        }, query_string, options);
    },

    showLoggedUser: function()
    {
        if (!PianoMedia.isMobile())
        {
            this.initElements();
        }

        if (document.getElementById('pnmdLogoutLink') != null)
        {
            this.btnLogout.href = document.getElementById('pnmdLogoutLink').value;
        }
        else if (document.getElementById('pnmdIPCorp') != null)
        {
            this.btnLogout.innerHTML = document.getElementById('pnmdIPCorp').value;
        }

        this.btnCloseLogin.style.display = 'none';
        this.btnLogin.style.display      = 'none';
        this.btnLogout.style.display     = 'inline-block';
        this.btnMenu.style.display       = 'inline-block';
        this.btnRegister.style.display   = 'none';
    },

    showUnloggedUser: function()
    {
        this.initElements();

        this.btnLogin.style.display      = 'inline-block';
        this.btnRegister.style.display   = 'inline-block';
    },

    openLogin: function()
    {
        this.btnLogin.style.display = 'none';

        PianoMedia.mobile.close();
        this.barContent.className = 'pnmdMobileBarContentOpened';

        if (typeof(PianoMedia.auth.user) != 'undefined')
        {
            this.btnRegister.style.display = 'none';
        }
        else
        {
            this.btnRegister.style.display = 'inline-block';
            this.btnCloseLogin.style.display = 'inline-block';
            this.btnClosePayment.style.display = 'none';
        }

        var iframe = document.getElementById('pnmdMobileIframeLogin');
        iframe.style.display = 'block';

        var self = this;
        this.url(function (url) {
            iframe.src = url;
        }, '/authent/mobilelogin');
    },

    closeLogin: function()
    {

        if (typeof(PianoMedia.auth.user) != 'undefined')
        {
            this.btnLogin.style.display = 'none';
            this.btnRegister.style.display = 'none';
        }
        else
        {
            this.btnLogin.style.display = 'inline-block';
            this.btnRegister.style.display = 'inline-block';
            this.btnCloseLogin.style.display = 'none';
            this.btnClosePayment.style.display = 'none';
        }

        this.barContent.className = 'pnmdMobileBarContentClosed';

        var iframe = document.getElementById('pnmdMobileIframeLogin');
        iframe.style.display = 'none';
        iframe.src = '';
    },

    toggleLogin: function()
    {
        (document.getElementById('pnmdMobileIframeLogin').style.display == 'block') ? this.closeLogin() : this.openLogin();
    },

    open: function(url_part, query_string, options)
    {
        if (typeof query_string == 'undefined')
        {
            query_string = '';
        }

        PianoMedia.mobile.closeLogin();

        if (typeof(PianoMedia.auth.user) != 'undefined')
        {
            this.btnLogin.style.display = 'none';
            this.btnMenu.style.display = 'inline-block';
        }
        else
        {
            this.btnRegister.style.display = 'none';
            this.btnClosePayment.style.display = 'inline-block';
            
        }

        this.barContent.className = 'pnmdMobileBarPaymentOpened';

        document.getElementById('pnmdMobileIframePayment').style.height = (this.getViewportHeight() - document.getElementById('pnmdMobileBar').offsetHeight) + 'px';
        document.getElementById('pnmdMobileCustomerInfo').style.display = 'none';
        document.getElementById('pnmdMobileIframePayment').style.display = 'block';

        var iframe = document.getElementById('pnmdMobileIframePayment');
        iframe.style.display = 'block';

        var self = this;
        this.url(function (url) {
            iframe.src = url;
        }, url_part, query_string, options);
    },

    getViewportHeight: function() {
        if (typeof window.innerWidth != 'undefined') {
            return window.innerHeight;
        } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientHeight != 'undefined' && document.documentElement.clientHeight != 0) {
            return document.documentElement.clientHeight;
        } else {
            return document.getElementsByTagName('body')[0].clientHeight;
        }
    },

    openPayment: function(query_string, options)
    {
        this.open("/payment/mobile", query_string, options);
    },

    openInfo: function(query_string, options)
    {
        PianoMedia.box.modal.open();
        this.open('/info/mobile', query_string, options);
    },

    closePayment: function()
    {
        this.close();
    },

    closeInfo: function()
    {
        this.close();
    },

    openPackage: function(query_string, options)
    {
        this.open("/payment/packagemobile", query_string, options);
    },

    openDdbox: function(action, query_string)
    {
        this.open("/ddbox/" + action, query_string);
    },

    close: function()
    {
        this.btnRegister.style.display = 'inline-block';
        this.btnClosePayment.style.display = 'none';
        
        PianoMedia.box.modal.close();

        var iframe = document.getElementById('pnmdMobileIframePayment');
        iframe.style.display = 'none';
        iframe.src = '';

        document.getElementById('pnmdMobileBarContent').className = "pnmdMobileBarContentClosed";
    },

    openRegister: function()
    {
        this.open("/register/mobile");
    },

    toggleDetail: function()
    {
        if (typeof(this.barMobile) === 'undefined')
        {
            this.initElements();
        }

        document.getElementById('pnmdMobileIframePayment').style.display = 'none';

        if (this.barContent.className == 'pnmdMobileBarContentClosed')
        {
            document.getElementById('pnmdMobileCustomerInfo').style.display = 'block';
            this.barContent.className = 'pnmdMobileBarContentOpened';
            this.barMobile.className = 'pnmdMobileBarOpened';

            if (document.getElementById('pnmdMobileBoxNotice') !== null)
            {
                document.getElementById('pnmdMobileBoxNotice').style.display = 'none';
            }
        }
        else
        {
            this.closeLogin();
            this.barContent.className = 'pnmdMobileBarContentClosed';
            this.barMobile.className = '';
            document.getElementById('pnmdMobileCustomerInfo').style.display = 'none';
        }
    }
};

PianoMedia.uid = {
    init : function(cse) {
        window._nsq = [["cookiesStorage", cse], ["setAccount", "MQ==", "MQ=="]];
    },
    run : function() {
        (function() {
            var ns_functions = (function() {
                var protocol = "http" + ((document.location.protocol == "https:") ? "s" : "") + ":";
                var domain_url = PianoMedia.mp_url;
                var library_url = protocol + "//" + domain_url;
                var tracker_url = library_url;
                var user_agent = navigator.userAgent.toLowerCase();
                var is_linux = (user_agent.indexOf('linux') > -1);
                var is_opera = (user_agent.indexOf('opera') > -1);
                var is_chrome = (user_agent.indexOf('chrome') > -1);
                var is_safari = (!is_chrome && user_agent.indexOf('safari') > -1);
                var is_gecko = (!is_opera && !is_safari && !is_chrome && user_agent.indexOf('gecko') > -1);
                var is_konqueror = (is_gecko && user_agent.indexOf('konqueror') > -1);
                var is_ie = (!is_opera && user_agent.indexOf('msie') > -1);
                var cse = true;
                return {
                    protocol : protocol,
                    domain_url : domain_url,
                    tracker_url : tracker_url,
                    library_url : library_url,
                    is_linux : is_linux,
                    is_opera : is_opera,
                    is_safari : is_safari,
                    is_gecko : is_gecko,
                    is_chrome : is_chrome,
                    is_konqueror : is_konqueror,
                    is_ie : is_ie,
                    cse : cse,
                    browser_prefix : function() {
                        var prefix;
                        if (is_ie) {
                            prefix = "ie";
                        }
                        else if (is_konqueror) {
                            prefix = "kr";
                        }
                        else if (is_gecko) {
                            prefix = "ge";
                        }
                        else if (is_safari) {
                            prefix = "sa";
                        }
                        else if (is_opera) {
                            prefix = "op";
                        }
                        else if (is_chrome) {
                            prefix = "ch";
                        }
                        else {
                            prefix = ns_functions.MD5(user_agent);
                        }
                        return prefix;
                    },
                    get_body : function() {
                        return document.body || document.documentElement || document.getElementsByTagName("BODY")[0];
                    },
                    get_root : function() {
                        return document.getElementById("piano-root") || this.get_body();
                    },
                    add_to_root : function(element) {
                        var root = this.get_root();
                        if (root.firstChild) {
                            root.insertBefore(element, root.firstChild);
                        }
                        else {
                            root.appendChild(element);
                        }
                    },
                    session : function() {
                        var name = "ns_session";
                        return {
                            get : function(default_value) {
                                return ns_functions.cookies.get(name, default_value);
                            },
                            set : function(value) {
                                var expires = new Date();
                                expires.setTime(expires.getTime() + (1000 * 60 * 30));
                                expires = expires.toGMTString();
                                var path = "/";
                                ns_functions.cookies.set(name, value, expires, path);
                            }
                        };
                    }(),
                    iframe : function() {
                        
                        var load = function(params, callback) {
                            
                            var iframe_origin = ns_functions.library_url.split("/").slice(0, 3).join("/");
                            var iframe_path = ns_functions.library_url + "/js/bp.html";
                            
                            var window_hostname = ns_functions.protocol + "//" + window.location.hostname +
                                ((window.location.port != "") ? ":" + window.location.port : "");
                            
                            var timestamp_id = (new Date()).getTime();
                            
                            var iframe_params = params;
                            iframe_params.unshift(ns_functions.domain_url, timestamp_id, window_hostname);
                            
                            var iframe_params_packed = ns_functions.encode(ns_functions.packer.pack(iframe_params));
                            
                            var location = iframe_path + "#" + iframe_params_packed;
                            
                            //create iframe
                            var el_iframe = ns_functions.dom.create_element({
                                tag : "IFRAME",
                                style : {
                                    position: "absolute",
                                    left: "-10000px",
                                    top: "-10000px",
                                    zIndex : "-1000"
                                },
                                src : location
                            });
                            
                            if (window.parent.postMessage) {
                                var handle_message = function(e) {
                                    var message_id = timestamp_id;
                                    
                                    if (e.origin) {
                                        
                                        if (e.origin == iframe_origin) {
        
                                            var incoming_message = ns_functions.packer.unpack(e.data);
                                            
                                            if (incoming_message[0] == timestamp_id) {
                                                
                                                ns_functions.events.remove_event(window, "message", handle_message);
                                                
                                                setTimeout(function() {
                                                    ns_functions.get_root().removeChild(el_iframe);
                                                }, 5000);
                                                
                                                callback.apply(null, ns_functions.packer.unpack(incoming_message[1]));
                                            }
                                        }
                                    }
                                };
                                
                                ns_functions.events.add_event(window, "message", handle_message);
                            }
                            else {
                                var iframe_redir_and_check_name = function() {
                                    
                                    try {
                                        
                                        var ifr_content = el_iframe.contentWindow || el_iframe.contentDocument || el_iframe.document;
                                        
                                        var iframe_name = ifr_content.name;
                                        ns_functions.get_root().removeChild(el_iframe);
                                        
                                        var incoming_message = ns_functions.packer.unpack(iframe_name);
                                        
                                        if (incoming_message[0] == timestamp_id) {
                                            callback.apply(null, ns_functions.packer.unpack(incoming_message[1]));
                                        }
                                        
                                    }
                                    catch (e) {
                                        ifr_content.location = "about:blank";
                                        setTimeout(iframe_redir_and_check_name, 10);
                                    }
                                };
                                
                                var onload_counter = 0;
                                
                                var iframe_onload_handler = function() {
                                    onload_counter++;
                                    if (onload_counter == 2) {
                                        iframe_redir_and_check_name();
                                    }
                                };
                                
                                ns_functions.events.add_event(el_iframe, "load", iframe_onload_handler);
                            }
                            
                            ns_functions.add_to_root(el_iframe);
                        };
                        
                        return {
                            load : load,
                            load_g : function(key, defvalue, callback) {
                                load(["g", key, defvalue], callback);
                            },
                            load_s : function(key, value, cse, callback) {
                                load(["s", key, value, cse ? "1" : "0"], callback);
                            }
                        
                        }
                    }(),
                    hid : function() {
                        var hid = null;
                        var status = null;
                        var UUID = null;
                        var get_callbacks = [];
                        return {
                            set : function(h, s, u) {
                                hid = h;
                                status = s;
                                UUID = u;
                                ns_functions.storage.set("ns_hid", hid);
                                while (get_callbacks.length > 0) {
                                    get_callbacks.shift()(hid, status, UUID);
                                }
                            },
                            get : function(callback) {
                                if (hid == null) {
                                    get_callbacks.push(callback);
                                }
                                else {
                                    callback(hid, status, UUID);
                                }
                            }
                        };
                    }(),
                    swf : function() {
                        var object_id = "ns_swf";
                        var inserted = false;
                        var loaded = false;
                        var f_hash = null;
                        var f_count = null;
                        var c_hash = null;
                        var get_source = function(object_id, movie) {
                            return '<obj' + 'ect id="' + object_id + '" width="1" height="1" ' +
                                'data="' + movie + '"' +
                                'type="application/x-shockwave-flash">' +
                                '<par' + 'am name="movie" value="' + movie + '" />' +
                                '<par' + 'am name="allowScriptAccess" value="always" />' +
                                '<par' + 'am name="flashvars" value="" />' +
                                '</obj' + 'ect>';
                        };
                        return {
                            get_object_id : function() {
                                return object_id;
                            },
                            get_object : function() {
                                return (loaded) ? window[object_id] || document[object_id] || document.getElementById(object_id) : null;
                            },
                            insert_object : function() {
                                if (!inserted) {
                                    var parent_div = ns_functions.dom.create_element({
                                        tag : "DIV",
                                        id : object_id + "_p",
                                        style : {
                                            position: "absolute",
                                            left: "-10000px",
                                            top: "-10000px",
                                            zIndex : "-1000"
                                        }
                                    });
                                    var div = ns_functions.dom.create_element({
                                        tag : "DIV"
                                    });
                                    parent_div.appendChild(div);
                                    ns_functions.add_to_root(parent_div);
                                    
                                    div.innerHTML = get_source(object_id, library_url + "/bucket/novosense.swf");
                                    inserted = true;
                                }
                            },
                            is_inserted : function() {
                                return inserted;
                            },
                            set_loaded : function(fh, fc, ch) {
                                f_hash = fh;
                                f_count = fc;
                                c_hash = ch;
                                loaded = true;
                            },
                            get_fh : function() {
                                return f_hash;
                            },
                            get_fc : function() {
                                return f_count;
                            },
                            get_ch : function() {
                                return c_hash;
                            }
                        };
                    }(),
                    encode : function() {
                        var esc = null;
                        try {
                            esc = encodeURIComponent;
                        } catch(e) {
                            esc = escape;
                        }
                        return esc;
                    }(),
                    decode : function() {
                        var esc = null;
                        try {
                            esc = function(value) {
                                try {
                                    return decodeURIComponent(value);
                                }
                                catch (e) {
                                    try {
                                        return decodeURIComponent(unescape(value));
                                    }
                                    catch (e) {
                                        return unescape(value);
                                    }
                                }
                            };
                        } catch(e) {
                            esc = unescape;
                        }
                        return esc;
                    }(),
                    packer : function() {
                        var delimiter = "&";
                        var process = function(value, fn) {
                            var tmp = [];
                            for (var i = 0; i < value.length; i++) {
                                tmp.push(fn(value[i]));
                            }
                            return tmp;
                        };
                        return {
                            pack : function(value) {
                                return process(value, function(v) {
                                    return ns_functions.encode(v + "");
                                }).join(delimiter);
                            },
                            unpack : function(packed) {
                                return process(packed.split(delimiter), function(v) {
                                    return ns_functions.decode(v);
                                });
                            }
                        };
                    }(),
                    create_remote_script : function(src) {
                        var new_script=ns_functions.dom.create_element({tag:"script"});
                        new_script.type="text/javascript";
                        new_script.language="javascript";
                        new_script.src=src;
                        return new_script;
                    },
                    user : {}
                };
            })();
            
            ns_functions.dom = {
                create_element:function(element) {
                    var elm=document.createElement(element.tag.toUpperCase());
                    for(var i in element) {
                        if(i!="tag"&&typeof(element[i]!="function")) {
                            switch(typeof(element[i])) {
                            case"object":
                                for(var j in element[i])
                                    elm[i][j]=element[i][j]
                                break;
                            default:
                                elm[i]=element[i];
                            break;
                            }
                        }
                    }
                    return elm;
                }
            };
            
            
            ns_functions.MD5 = function(string) {
                
                function RotateLeft(lValue, iShiftBits) {
                    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
                }
        
                function AddUnsigned(lX,lY) {
                    var lX4,lY4,lX8,lY8,lResult;
                    lX8 = (lX & 0x80000000);
                    lY8 = (lY & 0x80000000);
                    lX4 = (lX & 0x40000000);
                    lY4 = (lY & 0x40000000);
                    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
                    if (lX4 & lY4) {
                        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                    }
                    if (lX4 | lY4) {
                        if (lResult & 0x40000000) {
                            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                        } else {
                            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                        }
                    } else {
                        return (lResult ^ lX8 ^ lY8);
                    }
                }
        
                function F(x,y,z) { return (x & y) | ((~x) & z); }
                function G(x,y,z) { return (x & z) | (y & (~z)); }
                function H(x,y,z) { return (x ^ y ^ z); }
                function I(x,y,z) { return (y ^ (x | (~z))); }
        
                function FF(a,b,c,d,x,s,ac) {
                    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                    return AddUnsigned(RotateLeft(a, s), b);
                };
        
                function GG(a,b,c,d,x,s,ac) {
                    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                    return AddUnsigned(RotateLeft(a, s), b);
                };
        
                function HH(a,b,c,d,x,s,ac) {
                    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                    return AddUnsigned(RotateLeft(a, s), b);
                };
        
                function II(a,b,c,d,x,s,ac) {
                    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                    return AddUnsigned(RotateLeft(a, s), b);
                };
        
                function ConvertToWordArray(string) {
                    var lWordCount;
                    var lMessageLength = string.length;
                    var lNumberOfWords_temp1=lMessageLength + 8;
                    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
                    var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
                    var lWordArray=Array(lNumberOfWords-1);
                    var lBytePosition = 0;
                    var lByteCount = 0;
                    while ( lByteCount < lMessageLength ) {
                        lWordCount = (lByteCount-(lByteCount % 4))/4;
                        lBytePosition = (lByteCount % 4)*8;
                        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                        lByteCount++;
                    }
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
                    lWordArray[lNumberOfWords-2] = lMessageLength<<3;
                    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
                    return lWordArray;
                };
        
                function WordToHex(lValue) {
                    var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
                    for (lCount = 0;lCount<=3;lCount++) {
                        lByte = (lValue>>>(lCount*8)) & 255;
                        WordToHexValue_temp = "0" + lByte.toString(16);
                        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
                    }
                    return WordToHexValue;
                };
        
                function Utf8Encode(string) {
                    string = string.replace(/\r\n/g,"\n");
                    var utftext = "";
        
                    for (var n = 0; n < string.length; n++) {
        
                        var c = string.charCodeAt(n);
        
                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        }
                        else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
        
                    }
        
                    return utftext;
                };
        
                var x=Array();
                var k,AA,BB,CC,DD,a,b,c,d;
                var S11=7, S12=12, S13=17, S14=22;
                var S21=5, S22=9 , S23=14, S24=20;
                var S31=4, S32=11, S33=16, S34=23;
                var S41=6, S42=10, S43=15, S44=21;
        
                string = Utf8Encode(string);
        
                x = ConvertToWordArray(string);
        
                a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
        
                for (k=0;k<x.length;k+=16) {
                    AA=a; BB=b; CC=c; DD=d;
                    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
                    d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
                    c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
                    b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
                    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
                    d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
                    c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
                    b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
                    a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
                    d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
                    c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
                    b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
                    a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
                    d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
                    c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
                    b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
                    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
                    d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
                    c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
                    b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
                    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
                    d=GG(d,a,b,c,x[k+10],S22,0x2441453);
                    c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
                    b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
                    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
                    d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
                    c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
                    b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
                    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
                    d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
                    c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
                    b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
                    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
                    d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
                    c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
                    b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
                    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
                    d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
                    c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
                    b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
                    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
                    d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
                    c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
                    b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
                    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
                    d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
                    c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
                    b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
                    a=II(a,b,c,d,x[k+0], S41,0xF4292244);
                    d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
                    c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
                    b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
                    a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
                    d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
                    c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
                    b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
                    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
                    d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
                    c=II(c,d,a,b,x[k+6], S43,0xA3014314);
                    b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
                    a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
                    d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
                    c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
                    b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
                    a=AddUnsigned(a,AA);
                    b=AddUnsigned(b,BB);
                    c=AddUnsigned(c,CC);
                    d=AddUnsigned(d,DD);
                }
        
                var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
        
                return temp.toLowerCase();
            };
            
            ns_functions.storage = {
                get : function(name, defvalue) {
                    throw "Not implemented";
                },
                set : function(name, value) {
                    ns_functions.flash.set(name, value, false);
                    ns_functions.iframe.load_s(name, value, ns_functions.cse, function(message) {});
                }
            };
            
            ns_functions.cookies = {
                get:function(name,defvalue){
                    var result=null;
                    var cookies=document.cookie;
                    cookies=cookies.split(';');
                    for(var i=0;i<cookies.length;i++){
                        var cookie=cookies[i];
                        while(cookie.charAt(0)==" ")
                            cookie=cookie.substring(1,cookie.length);
                        var s=cookie.indexOf(name+"=");
                        if(s!=-1){
                            s+=name.length+1;
                            result=unescape(cookie.substring(s,cookie.length));
                        }
                    }
                    if(!result)
                        result=defvalue;
                    return result;
                },
                set:function(name,value,expires,path,domain,secure){
                    var cookie=name+"="+escape(value);
                    if(expires)
                        cookie+=";expires="+expires;
                    if(path)
                        cookie+=";path="+path;
                    if(domain)
                        cookie+=";domain="+domain;
                    if(secure)
                        cookie+=";secure="+secure;
                    document.cookie=cookie;
                },
                is_enabled:function(){
                    var now=new Date();
                    var value=now.getTime();
                    var name="ns_cookies_test";
                    this.set(name,value);
                    var enabled = (this.get(name,null)==value);
                    this.set(name,value,(new Date()).toGMTString());
                    return enabled;
                }
            };
            
            ns_functions.flash = {
                get_prefix:function(crossbrowser) {
                    return ns_functions.MD5(ns_functions.domain_url + "_"
                        + ((crossbrowser) ? "cross" : ns_functions.browser_prefix()));
                },
                get:function(key, defvalue, crossbrowser){
                    var flash_object = ns_functions.swf.get_object();
                    if (flash_object) {
                        var prefix = this.get_prefix(crossbrowser);
                        return flash_object.get(prefix + "_" + key, defvalue);
                    }
                    else {
                        return defvalue;
                    }
                },
                set:function(key, value, crossbrowser) {
                    var flash_object = ns_functions.swf.get_object();
                    if (flash_object) {
                        var prefix = this.get_prefix(crossbrowser);
                        flash_object.set(prefix + "_" + key, value);
                    }
                },
                get_fonts:function(defvalue){
                    var flash_object = ns_functions.swf.get_object();
                    if (flash_object) {
                        return flash_object.get_fonts();
                    }
                    else {
                        return defvalue;
                    }
                },
                get_capabilities:function(defvalue){
                    var flash_object = ns_functions.swf.get_object();
                    if (flash_object) {
                        return flash_object.get_capabilities();
                    }
                    else {
                        return defvalue;
                    }
                }
            };
            
            ns_functions.events = {
                add:function(){
                    if(window.addEventListener)
                        return function(o,e,fn,c) {
                            o.addEventListener(e,fn,(c));
                        }
                    else if(window.attachEvent)
                        return function(o,e,fn) {
                            o.attachEvent("on"+e,fn);
                        }
                    else
                        return function(o,e,fn){
                            var old_fn=o["on"+e];
                            if(old_fn ==null)
                                o["on"+e]=fn;
                            else
                                o["on"+e]=function(e) {
                                    old_fn(e);
                                    fn(e);
                                }
                        }
                }(),
                add_event:function(o,e,fn,c){
                    if(typeof(o) == "string")
                        var elm=document.getElementById(o);
                    else
                        var elm=o;
                    this.add(elm,e,fn,c);
                },
                remove : function() {
                    if (window.removeEventListener)
                        return function(o, e, fn, c) {
                            o.removeEventListener(e, fn, c);
                        }
                    else if (window.detachEvent)
                        return function(o, e, fn) {
                            o.detachEvent("on" + e, fn);
                        }
                    else
                        return function(o, e, fn) {
                            o['on' + e] = null;
                        }
                }(),
                remove_event : function(o, e, fn, c) {
                    if(typeof(o) == "string")
                        var elm=document.getElementById(o);
                    else
                        var elm=o;
                    this.remove(elm,e,fn,c);
                },
                stop_propagation:function(e) {
                    if(e.stopPropagation)
                        e.stopPropagation();
                    else
                        e.cancelBubble = true;
                },
                prevent_default:function(e) {
                    if(e.preventDefault)
                        e.preventDefault();
                    else
                        e.returnValue = false;
                },
                stop_event:function(e) {
                    this.stop_propagation(e);
                    this.prevent_default(e);
                },
                get_target:function(e) {
                    return e.target||e.srcElement;
                },
                get_current_target:function(e) {
                    return e.currentTarget;
                },
                get_page_coor:function(e){
                    var x = e.pageX;
                    var y = e.pageY;
                    if(!x && x !== 0)
                        x = e.clientX;
                    if(!y && y !== 0)
                        y = e.clientY;
                    if(ns_functions.is_ie) {
                        if(document.documentElement) {
                            x += document.documentElement.scrollLeft;
                            y += document.documentElement.scrollTop;
                        }
                        else if(document.body){
                            x += documentElement.scrollLeft;
                            y += documentElement.scrollTop;
                        }
                    }
                    return {
                        x:x,
                        y:y
                    }
                }
            };
        
        (function(){var BufferClass=typeof Buffer=="function"?Buffer:Array;var _buf=new BufferClass(16);var toString=[];var toStringLower=[];var toNumber={};for(var i=0;i<256;i++){toString[i]=(i+256).toString(16).substr(1);toStringLower[i]=toString[i].toLowerCase();toNumber[toString[i]]=i}var re=new RegExp(/^[a-f0-9]{8}-[a-f0-9]{4}-[4]{1}[a-f0-9]{3}-[89ab]{1}[a-f0-9]{3}-[a-f0-9]{12}$/i);var re_hex=new RegExp(/^[a-f0-9]{8}[a-f0-9]{4}[4]{1}[a-f0-9]{3}[89ab]{1}[a-f0-9]{3}[a-f0-9]{12}$/i);function parse(s){var buf=
            new BufferClass(16);var i=0,ton=toNumber;s.toLowerCase().replace(/[0-9a-f][0-9a-f]/g,function(octet){buf[i++]=toNumber[octet]});return buf}function unparse(buf){var tos=toString,b=buf;return tos[b[0]]+tos[b[1]]+tos[b[2]]+tos[b[3]]+"-"+tos[b[4]]+tos[b[5]]+"-"+tos[b[6]]+tos[b[7]]+"-"+tos[b[8]]+tos[b[9]]+"-"+tos[b[10]]+tos[b[11]]+tos[b[12]]+tos[b[13]]+tos[b[14]]+tos[b[15]]}function hex(buf){var tosl=toStringLower,b=buf;var result=[];for(var i=0;i<16;i++)result.push(tosl[b[i]]);return result.join("")}
            var b32=4294967296,ff=255;function uuid(fmt,buf,offset){var b=fmt!="binary"?_buf:buf?buf:new BufferClass(16);var i=buf&&offset||0;var r=Math.random()*b32;b[i++]=r&ff;b[i++]=r>>>8&ff;b[i++]=r>>>16&ff;b[i++]=r>>>24&ff;r=Math.random()*b32;b[i++]=r&ff;b[i++]=r>>>8&ff;b[i++]=r>>>16&15|64;b[i++]=r>>>24&ff;r=Math.random()*b32;b[i++]=r&63|128;b[i++]=r>>>8&ff;b[i++]=r>>>16&ff;b[i++]=r>>>24&ff;r=Math.random()*b32;b[i++]=r&ff;b[i++]=r>>>8&ff;b[i++]=r>>>16&ff;b[i++]=r>>>24&ff;return fmt===undefined?unparse(b):
            fmt=="hex"?hex(b):b}var validate=function(value){return value.match(re)?true:false};var validate_hex=function(value){return value.match(re_hex)?true:false};uuid.parse=parse;uuid.unparse=unparse;uuid.hex=hex;uuid.BufferClass=BufferClass;uuid.validate=validate;uuid.validate_hex=validate_hex;ns_functions.uuid=uuid})();
            
            ns_functions.events.add(window, "message", function(e) {
                if (e.data) {
                    if (e.data == "DT") {
                        track = false;
                    }
                }
            });
            
            ns_functions.callback_timeout = (function() {
                return {
                    patch : function(callback, expire_timeout, expire_args) {
                        var expire_timeout = expire_timeout || 15000;
                        var expire_args = expire_args || [];
                        var expire;
                        var expired = false;
                        expire = setTimeout(function() {
                            expired = true;
                            callback.apply(null, expire_args);
                        }, expire_timeout);
                        return function() {
                            if (!expired) {
                                clearTimeout(expire);
                                callback.apply(null, arguments);
                            }
                        };
                    }
                };
            })();
            
            var ns_detection = function() {
                
                var callbacks = [];
                var loaded = false;
                var running = false;
                var running_start = null;
                var brs = navigator.userAgent.toLowerCase();
                // Default
                var none = "_";
                var isAvailable = 1;
                var bi_flash = none;
                var bi_silver = none;
                var bi_wmp = none;
                var bi_nm = none;
                var bi_ob = none;
                var bi_du = none;
                var bi_rpl = none;
                var bi_aa = none;
                var bi_qt = none;
                var bi_javaPlugin = none;
                var bi_lang = none;
                var bi_mt = none;
                var bi_plugins = none;
                var bi_dnet = none;
                var bi_dajc = none;
                var bi_da = none;
                var bi_ds = none;
                
                var now = none;
                var bi_dmns = "";
                var bi_dmn = none;
                // Params
                var params = "";
                var params_obj = {};
                var iframe_obj = null;
                var iframe_loaded = null;
                
                ns_functions.iframe.load_g("ns_hid", none, function(hc, hl, hu, hi, hw, hp) {
                    iframe_loaded = (new Date()).getTime();
                    iframe_obj = {
                        c : hc,
                        l : hl,
                        u : hu,
                        i : hi,
                        w : hw,
                        p : hp
                    }
                });
                
                // DOM function - adds scripts elements to the page
                var ns_add_element = function(content) {
                    var element = document.createElement("script");
                    element.language = "vbscript";
                    element.type= "text/vbscript";
                    element.text = content;
                    document.getElementsByTagName("head")[0].appendChild(element);
                };
                var ns_is_plugin = function(mime_name, desc, ext) {
                    if(navigator.mimeTypes && mime_name != '' ? (navigator.mimeTypes[mime_name] && navigator.mimeTypes[mime_name].enabledPlugin != false) : true) {
                        if(navigator.plugins) {
                            var plugin_count = navigator.plugins.length;
                            if(mime_name != "" && navigator.mimeTypes[mime_name] == null)
                                return 0;
                            if(plugin_count > 0) {
                                for(var i = 0; i < plugin_count; i++) {
                                    if((navigator.plugins[i].description.indexOf(desc) != -1) || (navigator.plugins[i].name.indexOf(desc) != -1))
                                        return 1;
                                }
                            }
                        }
                    }
                    return 0;
                };
                var ns_plugin_description = function(desc, t) {
                    var plugin_name = "";
                    if(navigator.plugins) {
                        var plugin_count = navigator.plugins.length;
                        if(plugin_count > 0) {
                            for(var i = 0; i < plugin_count; i++) {
                                if((navigator.plugins[i].description.indexOf(desc) != -1) || (navigator.plugins[i].name.indexOf(desc) != -1)) {
                                    var regexp = '';
                                    if(t == 1){
                                        regexp = /([0-9][^\s]*)/;
                                    } else if (t == 2){
                                        regexp = /([0-9][^\s]*[_][0-9][^\s])/;
                                    } else {
                                        regexp = /([0-9].*)/;
                                    }
                                    var tmp = regexp.exec(navigator.plugins[i].description);
                                    if(tmp)
                                        plugin_name = tmp[0];
                                    else {
                                        tmp = regexp.exec(navigator.plugins[i].name);
                                        if(tmp)
                                            plugin_name = tmp[0];
                                    }
                                    if(plugin_name != '')
                                        break;
                                }
                            }
                        }
                    }
                    return ns_functions.encode(plugin_name);
                };
                var get_ie_component_version = function(clsID) {
                    var version = none;
                    if(document.body){
                        version = document.body.getComponentVersion("{" + clsID + "}", "ComponentID");
                    }
                    return version;
                }
                var detect_dmn = function(){
                    return ( bi_dmns != "" && bi_dmns.indexOf( document.domain ) == -1 ) ? 0 : 1;
                }
                var detect_mt = function() {
                    var mimes = [];
                    if (navigator.mimeTypes && navigator.mimeTypes.length > 0) {
                        for (var i = 0; i < navigator.mimeTypes.length; i++) {
        
                            mimes.push(navigator.mimeTypes[i].type || "");
        
                        }
                    }
                    return mimes;
                };
        
                var detect_plugins = function() {
                    var plugins = [];
                    if (navigator.plugins && navigator.plugins.length > 0) {
                        for (var i = 0; i < navigator.plugins.length; i++) {
                            plugins.push(navigator.plugins[i].name || "");
                        }
                    }
                    return plugins;
                }
                
                var detect_dot_net = function() {
                    
                    var get_version = function(version_string) {
                        var numeric_string = version_string.substring(9);
                        return numeric_string;
                    }
                    
                    var user_agent_string = navigator.userAgent.match(/.NET CLR [0-9.]+/g);
                    if (user_agent_string != null) {
                        user_agent_string = user_agent_string.sort();
                        var result_array = [];
                        for (var i = 0; i < user_agent_string.length; i++) {
                            
                            result_array.push(get_version(user_agent_string[i]));
                            
                        }
                        return result_array.join("|");
                    }
                    return null;
                }
                
                var support_vml = function() {
                    var a = ns_functions.dom.create_element({
                        tag : "DIV",
                        style : {
                            display : "none"
                        }
                    });
                    ns_functions.add_to_root(a);
                    a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
                    var b = a.firstChild;
                    b.style.behavior = "url(#default#VML)";
                    var supported = b ? typeof b.adj == "object" : true;
                    a.parentNode.removeChild(a);
                    return supported;
                }
                
                var support_svg = function() {
                    return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
                }
                
                var support_webgl = function() {
                    return window.WebGLRenderingContext ? 1 : 0;
                }
                
                var add_param = function(nm, vl){
                    params += ( "&" + nm + "=" + ns_functions.encode(vl));
                    params_obj[nm] = vl;
                }
        
                now = new Date();
                // MSIE DETECTION
                if (ns_functions.is_ie) {
                    //Adds behavior
                    if(document.body) document.body.addBehavior("#default#clientCaps");
                    //Flash
                    var flVB = "";
                    var fl = none;
                    for(var i=12; i > 0; i--){
                        try {
                            var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
                            fl = i;
                            break;
                        } catch(e) { }
                    }
                    if (fl == none) {
                        ns_add_element('on error resume next\n set fl = CreateObject("ShockwaveFlash.ShockwaveFlash")\n if IsObject(f) then flVB = hex(f.FlashVersion()) end if');
                        if (flVB.length > 0){
                            fl = flVB.substring(0,1);
                        }
                    }
                    bi_flash = fl;
                    //Windows Media Player
                    bi_wmp = get_ie_component_version("6BF52A52-394A-11d3-B153-00C04F79FAA6");
                    if(bi_wmp == none){
                        bi_wmp = get_ie_component_version("22D6F312-B0F6-11D0-94AB-0080C74C7E95");
                    }
                    //Net Meeting
                    bi_nm = get_ie_component_version("44BBA842-CC51-11CF-AAFA-00AA00B6015B");
                    //Offline Browsing
                    bi_ob = get_ie_component_version("3AF36230-A269-11D1-B5BF-0000F8051515");
                    //Desktop Update
                    bi_du = get_ie_component_version("89820200-ECBD-11CF-8B85-00AA005B4340");
                    
                    //DirectAnimation Java Classes
                    bi_dajc = get_ie_component_version("4F216970-C90C-11D1-B5C7-0000F8051515");
                    //DirectAnimation
                    bi_da = get_ie_component_version("283807B5-2C60-11D0-A31D-00AA00B92C03");
                    //DirectShow
                    bi_ds = get_ie_component_version("44BBA848-CC51-11CF-AAFA-00AA00B6015C");
                    
                    // Real Player
                    try {
                        var testObject = new ActiveXObject("rmocx.RealPlayer G2 Control.1");
                        bi_rpl = testObject.GetVersionInfo();
                    } catch(e) {}
                    try {
                        var testObject = new ActiveXObject("RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)");
                        bi_rpl = testObject.GetVersionInfo();
                    } catch(e) {}
                    try {
                        var testObject = new ActiveXObject("RealVideo.RealVideo(tm) ActiveX Control (32-bit)");
                        bi_rpl = testObject.GetVersionInfo();
                    } catch(e) {}
                    if(bi_rpl == none){
                        ns_add_element('on error resume next\n i_realplayer = IsObject(CreateObject("RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)"))\n set tmp = CreateObject("rmocx.RealPlayer G2 Control")\n if (IsObject(tmp)) then\n bi_rpl = tmp.GetVersionInfo\n end if');
                    }
                    // Adobe Acrobat
                    if (window.ActiveXObject){
                        for (var x=2; x<10; x++){
                            try{
                                var oAcro=eval("new ActiveXObject('PDF.PdfCtrl."+x+"');");
                                if (oAcro){
                                    bi_aa=x+'.0';
                                }
                                oAcro=null;
                            }catch(e) {}
                        }
                        try{
                            var oAcro4=new ActiveXObject('PDF.PdfCtrl.1');
                            if (oAcro4){
                                bi_aa='4.0';
                            }
                            oAcro4=null;
                        }catch(e) {}
                        try{
                            var oAcro7=new ActiveXObject('AcroPDF.PDF.1');
                            if (oAcro7){
                                bi_aa='7.0';
                            }
                            oAcro7=null;
                        }catch(e) {}
                    }
                    bi_lang = navigator.browserLanguage;
                    
                    bi_dnet = detect_dot_net() || none;
                    
                } else {
                    //OTHER BROWSERS DETECTION
                    //Flash
                    if(ns_is_plugin('','Shockwave Flash','')==1) {
                        bi_flash = ns_plugin_description('Shockwave Flash',1);
                    }
                    // Silverlight
                    if(ns_is_plugin('','Silverlight Plug-In','')==1) {
                        bi_silver = ns_plugin_description('Silverlight Plug-In',1);
                    }
                    // Real Player
                    if(ns_is_plugin('','RealPlayer Version Plugin','')==1) {
                        bi_rpl = ns_plugin_description('RealPlayer Version Plugin',1);
                    } else if(ns_is_plugin('','RealOne','')==1) {
                        bi_rpl = ns_plugin_description('RealOne',1);
                    }
                    // Adobe Acrobat
                    if(ns_is_plugin('','Adobe Acrobat','')==1) {
                        bi_aa = ns_plugin_description('Adobe Acrobat',1);
                    }
                    //Quick Time
                    if(ns_is_plugin('','QuickTime','')==1) {
                        bi_qt = ns_plugin_description('QuickTime',1);
                    }
                    // Java
                    if(ns_is_plugin('','Java','') == 1) {
                        bi_javaPlugin = ns_plugin_description('Java',2);
                    }
                    bi_lang = navigator.language;
                }

                bi_mt = ns_functions.MD5(detect_mt().join("|"));
                bi_plugins = ns_functions.MD5(detect_plugins().join("|"));
                bi_dmn = detect_dmn();
        
                if (bi_flash != none) {
                    ns_functions.swf.insert_object();
                }
        
                var run_all = function() {
                    add_param("sx", screen.width);
                    add_param("sy", screen.height);
                    add_param("cd", screen.colorDepth);
                    add_param("tmz", now.getTimezoneOffset());
                    add_param("flv", bi_flash);
                    add_param("sll", bi_silver);
                    add_param("wmp", bi_wmp);
                    add_param("nm", bi_nm);
                    add_param("obp", bi_ob);
                    add_param("wduNT", bi_du);
                    add_param("rp", bi_rpl);
                    add_param("aa", bi_aa);
                    add_param("qt", bi_qt);
                    add_param("jv", bi_javaPlugin);
                    add_param("bl", bi_lang);
                    add_param("pc", navigator.plugins.length);
                    add_param("dmn", bi_dmn);
                    add_param("adckie", ns_functions.cookies.is_enabled() ? 1 : 0);
                    add_param("cse", ns_functions.cse ? 1 : 0);

                    add_param("mt", bi_mt);
                    add_param("plg", bi_plugins);
                    add_param("geo", typeof(navigator.geolocation) == "undefined" ? 0 : 1);
                    add_param("vml", support_vml() ? 1 : 0);
                    add_param("svg", support_svg() ? 1 : 0);
                    add_param("dnet", bi_dnet);
                    add_param("dajc", bi_dajc);
                    add_param("da", bi_da);
                    add_param("ds", bi_ds);
                    add_param("webgl", support_webgl());
                    add_param("plm", navigator.platform || none);
                    add_param("cpu", navigator.cpuClass || none);
                    add_param("taie", typeof(navigator.taintEnabled) != "undefined" ? navigator.taintEnabled() ? 1 : 0 : none);
                    add_param("jave", typeof(navigator.javaEnabled) != "undefined" ? navigator.javaEnabled() ? 1 : 0 : none);
                    add_param("mtp", typeof(navigator.msMaxTouchPoints) != "undefined" ? navigator.msMaxTouchPoints : none);
                    add_param("mpe", typeof(navigator.msPointerEnabled) != "undefined" ? navigator.msPointerEnabled ? 1 : 0 : none);
        
                    add_param("ffh", ns_functions.swf.get_fh() || none);
                    add_param("ffc", ns_functions.swf.get_fc() || none);
                    add_param("fch", ns_functions.swf.get_ch() || none);
                    
                    add_param("sch", none);
                    
                    add_param("hid_f", ns_functions.flash.get("ns_hid", none, false));
                    add_param("hid_s", none);
        
                    add_param("hid_l", iframe_obj ? iframe_obj.l || none : none);
                    add_param("hid_u", iframe_obj ? iframe_obj.u || none : none);
                    add_param("hid_i", iframe_obj ? iframe_obj.i || none : none);
                    add_param("hid_w", iframe_obj ? iframe_obj.w || none : none);
                    add_param("hid_p", iframe_obj ? iframe_obj.p || none : none);
                    
                    add_param("hid_cs", iframe_obj ? iframe_obj.c : none);
                    
                    add_param("ssn", ns_functions.session.get("_"));
                    
                    add_param("ref", document.referrer);
                    add_param("url", ns_functions.decode(PianoMedia.getLocation()));
                    
                    loaded = true;
                    
                    while (callbacks.length > 0) {
                        callbacks.shift()(params, params_obj);
                    }
                };
                var run = function() {
                    var now = (new Date()).getTime();
                    if (
                        !(now > (running_start + 11000))
                        && (
                            (ns_functions.swf.is_inserted() && !(ns_functions.swf.get_object())
                                && !(now > ((!iframe_obj) ? (running_start + 10000) : (iframe_loaded + 500))))
                            || !iframe_obj
                        )
                    ) {
                        setTimeout(run, 50);
                    }
                    else {
                        run_all();
                    }
                };
                return {
                    is_loaded : function() {
                        return loaded;
                    },
                    run : function(callback) {
                        if (!loaded) {
                            callbacks.push(callback);
                            if (!running) {
                                running = true;
                                running_start = (new Date()).getTime();
                                run();
                            }
                        }
                        else {
                            callback(params, params_obj);
                        }
                    },
                    get_params : function() {
                        return params;
                    },
                    detect_mt : detect_mt,
                    detect_plugins : detect_plugins
                }
            }();
            
            var insert_tracker = function(path_params, params, image, without_detection) {
                var params = params || [];
                var image = image || false;
                var without_detection = without_detection || false;
                for (var i = 0; i < path_params.length; i++) {
                    path_params[i] = ns_functions.encode(path_params[i]);
                }
                path_params = path_params.join("/");
                var params_tmp = ["a=1", "dc=" + ns_functions.uuid("hex")];
                for (var i = 0; i < params.length; i++) {
                    params_tmp.push(ns_functions.encode(params[i][0]) + "=" +
                            ns_functions.encode(params[i][1]));
                }
                params = params_tmp.join("&");
                var src = ns_functions.tracker_url + "/" + path_params + "/?" + params;
                var insert = function() {
                    if (image) {
                        var img = new Image();
                        img.src = src;
                        setTimeout(function() {
                            img = null;
                        }, 5000);
                    }
                    else {
                        var script = ns_functions.create_remote_script(src);
                        ns_functions.add_to_root(script);
                    }
                };
                ns_detection.run(function(detection_params) {
                    if (!without_detection) {
                        src = src + detection_params;
                    }
                    insert();
                });
            };
            
            var has_account = false;
            var CID = null;
            var WID = null;
            
            var cbtp = ns_functions.callback_timeout.patch;
            
            var commands = {
                cookiesStorage : function(cse) {
                    ns_functions.cse = cse;
                },
                setAccount : function(cid, wid) {
                    if (!has_account) {
                        CID = cid;
                        WID = wid;
                        has_account = true;
                        insert_tracker(["uid", CID, WID], [["p_cid", PianoMedia.getClientId()],
                            ["p_sid", PianoMedia.getServiceId()]]);
                    }
                },
                getUID : function(callback, timeout) {
                    if (has_account) {
                        ns_functions.hid.get(cbtp(callback, timeout, ["_", -1, "_"]));
                    }
                },
                _swfSetLoaded : function(fh, fc, ch) {
                    ns_functions.swf.set_loaded(fh, fc, ch);
                },
                _setHid : function(hid, status, UUID) {
                    ns_functions.hid.set(hid, status, UUID);
                },
                _setSession : function(session) {
                    ns_functions.session.set(session);
                },
                _trackCtp : function(params) {
                    insert_tracker(["ctp", CID, WID], params, true, true);
                }
            };
            
            var run_command = function(command_params) {
                if (command_params instanceof Array) {
                    if (command_params.length > 0) {
                        var command = command_params[0];
                        var params = command_params.slice(1);
                        if (typeof(commands[command]) == "function") {
                            commands[command].apply(null, params);
                        }
                    }
                }
            };
            
            while (_nsq.length > 0) {
                run_command(_nsq.shift());
            }
            
            _nsq = {
                push : function(command_params) {
                    run_command(command_params);
                }
            };
            
        })();
    },
    getUID : function(callback, timeout)
    {
        _nsq.push(["getUID", function(UID) {
            callback((UID === "_") ? null : UID);
        }, timeout]);
    }
};
PianoMedia.init(pianoVariables);