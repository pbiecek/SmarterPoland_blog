try {

    var tuba = {

        debug   : function (){

            try{
                return Boolean(localStorage.getItem('debug'));

            }catch(e){

                return true;
            }

        },

        onready : function(e) {

            if (tuba.loadDone) return;

            tuba.baseElement = (document.getElementsByTagName("base"))[0] ? (document.getElementsByTagName("base"))[0] : (parent.document.getElementsByTagName("base"))[0];
            tuba.base = tuba.baseElement.href;
            tuba.ssl = tuba.baseElement.getAttribute('data-ssl');
            tuba.images = tuba.baseElement.getAttribute('data-images');
            tuba.section = tuba.baseElement.getAttribute('data-section');
            tuba.subsection = tuba.baseElement.getAttribute('data-subsection');
            tuba.master = tuba.baseElement.getAttribute('data-master') === 'true' ? true : false;
            tuba.iframe = tuba.baseElement.getAttribute('data-iframe') === 'true' ? true : false;
            tuba.store = tuba.baseElement.getAttribute('data-store') ? tuba.baseElement.getAttribute('data-store') : false;
            tuba.popup = 'top=30,left=' + (screen.width-380) + ',location=no,scrollbars=no,menubar=no,status=no,titlebar=no,toolbar=no,resizable=no,width=750,height=700';

                        // GM
            tuba.player.parameters.vd = tuba.baseElement.getAttribute('data-vd');
            tuba.popup_ref = -1; // for focus

            tuba.treeId = [(tuba.baseElement.getAttribute('data-treeId') || 14)];
            tuba.playing = false;

            tuba.api = 'http://fm.tuba.pl/api3/';
            tuba.basePlayer = 'http://fm.tuba.pl/player';
            tuba.baseIframe = 'http://fm.tuba.pl/iframe';

            tuba.list = tuba.baseElement.getAttribute('data-list');
            tuba.user = tuba.baseElement.getAttribute('data-user');

            tuba.session = {
                logged      : parseInt(tuba.baseElement.getAttribute('data-logged'),10),
                facebook_id : parseInt(tuba.baseElement.getAttribute('data-facebook_id'),10)
            };

            tuba.window = 0;

            // tuba.advertisment = parseInt(tuba.baseElement.getAttribute('data-advertisment'),10);
            // tuba.autoplay = parseInt(tuba.baseElement.getAttribute('data-autoplay'),10);

            tuba.social = {
                "facebook"  : parseInt(tuba.baseElement.getAttribute('data-social.facebook'),10),
                "plusone"   : parseInt(tuba.baseElement.getAttribute('data-social.plusone'),10)

            };
            tuba.stats = {
                "analytics" : parseInt(tuba.baseElement.getAttribute('data-stats.analytics'),10),
                "heatmap"   : parseInt(tuba.baseElement.getAttribute('data-stats.heatmap'),10)

            };


            tuba.dx     = parseInt(tuba.baseElement.getAttribute('data-dx'),10);
            tuba.foo    = tuba.baseElement.getAttribute('data-foo') | 'fm';

            tuba.zp     = parseInt(tuba.baseElement.getAttribute('data-zp'),10);
            tuba.rr     = parseInt(tuba.baseElement.getAttribute('data-rr'),10);
            tuba.tok    = parseInt(tuba.baseElement.getAttribute('data-tok'),10);
            tuba.nk     = parseInt(tuba.baseElement.getAttribute('data-nk'),10);

            tuba.sender = tuba.nk ? 5 : (tuba.zp ? 1 : (tuba.rr ? 2 : (tuba.tok ? 3 : 0)));

            tuba.autopopup = tuba.baseElement.getAttribute('data-autopopup');
            tuba.pid = Math.floor(Math.random()*100000000) + 1000;
            tuba.popup_width = (tuba.master) ? 700 : 732;
            tuba.popup_height =  394;

            tuba.loadDone = true;

            tuba.autocomplete.init('query', 'search', 'autocomplete');

            tuba.commons.BrowserDetect.init();

            tuba.player.parameters.blocked  = false;
            tuba.player.parameters.music    = false;
            tuba.player.parameters.dragging = false;
            tuba.player.parameters.allowVolume  = true;
            tuba.player.parameters.application  = false;
            tuba.player.parameters.notification = {};
            tuba.player.parameters.status   = false;
            tuba.player.parameters.vastStart    = false;
            tuba.player.parameters.time     = 0;
            tuba.player.parameters.closed   = false;
            tuba.player.parameters.completeFlag = false;
            tuba.player.parameters.playerReady  = false;
            tuba.player.parameters.bridgeReady  = false;

            var options = window.TP ? window.TP.options : false;

            if (options.appId) {

                var apps = {

                    "1111111111111111" : { // Tuba.FM
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://fm.tuba.pl/iframe'
                    },
                    "1111111111111110" : { // Tuba.FM
                        base        : 'http://alpha.fm.tuba.pl/',
                        basePlayer  : 'http://alpha.fm.tuba.pl/player',
                        baseIframe  : 'http://alpha.fm.tuba.pl/iframe'
                    },
                    "1000000000000001" : { // Radio Złote Przeboje
                        base        : 'http://zp.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://zp.tuba.pl/iframe'
                    },
                    "1000000000000002" : { // Radio Roxy GM
                        base        : 'http://rr.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://rr.tuba.pl/iframe'
                    },
                    "1000000000000003" : { // TOK FM
                        base        : 'http://tok.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://tok.tuba.pl/iframe'
                    },
                    "1000000000000004" : { // Radio ONET
                        base        : 'http://onet.tuba.pl/',
                        basePlayer  : 'http://player.radio.onet.pl/onet',
                        baseIframe  : 'http://onet.tuba.pl/iframe'
                    },
                    "1000000000000005" : { // Radio NK
                        base        : 'http://nk.tuba.pl/',
                        basePlayer  : 'http://nk.tuba.pl/player',
                        baseIframe  : 'http://nk.tuba.pl/iframe'
                    },
                    "1000000000000008" : { // Radio wyborcza
                        base        : 'http://wyborcza.tuba.pl/',
                        basePlayer  : 'http://wyborcza.tuba.pl/player',
                        baseIframe  : 'http://wyborcza.tuba.pl/iframe',
                        selectors   : []
                    },
                    "1000000000000009" : { // Plotek
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://fm.tuba.pl/iframe'
                    },
                    "1000000000000010" : { // Groszki.pl
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://fm.tuba.pl/iframe'
                    },
                    "1000000000000011" : { // Horoskopy.gazeta.pl
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://fm.tuba.pl/iframe'
                    },
                    "1000000000000012" : { // Polskabiega.pl
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player?list=ulubione&user=sport.pl',
                        baseIframe  : 'http://fm.tuba.pl/iframe?list=ulubione&user=sport.pl'
                    },
                    "1000000000000013" : { // Fitness.sport.pl
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player?list=ulubione&user=sport.pl',
                        baseIframe  : 'http://fm.tuba.pl/iframe?list=ulubione&user=sport.pl'
                    },
                    "1000000000000014" : { // Kotek
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://fm.tuba.pl/iframe'
                    },
                    "1000000000000015" : { // Tuba.pl
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://fm.tuba.pl/iframe'
                    },
                    "1000000000000016" : { // TERAZ ROCK
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player?user=terazrock',
                        baseIframe  : 'http://fm.tuba.pl/iframe?user=terazrock'
                    },
                    "1000000000000018" : { // GAZETA
                        base        : 'http://fm.tuba.pl/',
                        basePlayer  : 'http://fm.tuba.pl/player',
                        baseIframe  : 'http://fm.tuba.pl/iframe'
                    }
                };

                if (options.appId in apps) {

                    var local = apps[options.appId];

                    for (key in local) {
                        options[key] = local[key];
                    }

                }

                if (options) {

                    for (key in options) {
                        tuba[key] = options[key];
                    }

                }

            }


            try{

                tuba.player.parameters.history = localStorage.getItem('player:history').split(',').splice(0,100) || [];

            } catch(e) {

                tuba.player.parameters.history = [];

            }

            if (tuba.master) {

                tuba.window = 1;

                tuba.bridge.toSlave('window', tuba.window);

            }

            if (tuba.iframe) {

                tuba.commons.addEvent(window, 'message', function(e) {

                    if (!tuba.RPC.source) tuba.RPC.source = e.source;
                    if (!tuba.RPC.origin) tuba.RPC.origin = e.origin;

                    tuba.RPC.read(e.data, function (message){
                        e.source.postMessage(message, e.origin);
                    });

                });

            }

            var a = document.createElement('audio');

            if (!(a.canPlayType && a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''))){
                document.body.className += ' noAudioMp4'
                tuba.audio = false;
            } else {
                tuba.audio = true;
            }

            if (tuba.audio) {

                tuba.preview = {};

                NW.Dom.select('.preview', false, function(object) {

                    if (!tuba.preview.data) {
                        tuba.preview.data = [];
                    }

                    tuba.preview.data.push(object);

                });


                if (tuba.preview.data) {

                    tuba.preview.player = new Audio();

                }

            }



            tuba.player.parameters.gemius = {
                playlistId  : Math.floor(Math.random()*1000000) + (new Date().getTime()),
                sessionId   : Math.floor(Math.random()*1000000) + (new Date().getTime())
            };

            NW.Dom.select('.nofollow', false, function(object) {

                if(object.getAttribute('data-href')) object.href = object.getAttribute('data-href');

            });

            if (!(tuba.iframe || tuba.master)){

                NW.Dom.select('.search .query', false, function(object) {

                    object.focus();

                });

            }

            if (!(tuba.master || tuba.iframe) && tuba.foo == 'zp') {

                NW.Dom.select('.homepage .type.D .listitem[data-type="2"]:first-child a', false, function(object) {

                    object.onclick = function(e) {

                        var obj = document.createElement('button');
                        obj.setAttribute('data-action', 'radio');
                        obj.setAttribute('data-value', 'Radio Złote Przeboje');
                        obj.setAttribute('data-id', 9);
                        obj.setAttribute('data-type', 2);

                        tuba.actions.radio.init(obj);

                        return false;

                    };

                });

            }

            if (!(tuba.master || tuba.iframe) && tuba.foo == 'rr') {

                NW.Dom.select('.homepage .type.D .listitem[data-type="2"]:first-child a', false, function(object) {

                    object.onclick = function(e) {

                        var obj = document.createElement('button');
                        obj.setAttribute('data-action', 'radio');
                        obj.setAttribute('data-value', 'Radio Roxy');
                        obj.setAttribute('data-id', 8);
                        obj.setAttribute('data-type', 2);

                        tuba.actions.radio.init(obj);

                        return false;

                    };

                });

            }

            if (document.getElementById("feed")) {

                document.getElementById("feed").onsubmit = function() {

                    tuba.commons.jx.load(tuba.base + 'akcja/feedback?' +
                        'type=' + encodeURIComponent(document.getElementById("feed").type[document.getElementById("feed").type.selectedIndex].value) +
                        '&comment=' + encodeURIComponent(document.getElementById("feed").comment.value) +
                        '&mail=' + encodeURIComponent(document.getElementById("feed").mail.value) +
                        '&target=' + encodeURIComponent(window.location.href) +
                        (tuba.player.parameters.status.current && typeof tuba.player.parameters.status.current[2] != 'undefined' ? '&song-id=' + encodeURIComponent(tuba.player.parameters.status.current[2]) : ''), function(data) {

                            tuba.actions['open-popup'].open(data.html.alert, false, function() {

                                tuba.commons.prepareActions(document.getElementById('tcontent'));

                            });

                            document.getElementById("feed").reset();

                            return false;

                        }, 'json', 'POST');


                    return false;

                };

            }

            if (document.getElementById("ajax-upload")) {

                document.getElementById("ajax-upload").onchange = function() {

                    return tuba.commons.upload(document.getElementById('ajax-form'), function(data) {

                        if (data.result) {

                            document.getElementById('uploaded-logo').firstChild.src = data.full_img;
                            document.getElementById('user_img').value = data.temp_img;

                        } else {

                            document.getElementById('uploaded-logo').firstChild.src = tuba.images + '_img/change-image.png';
                            document.getElementById('user_img').value = '';

                        }

                    });

                };

            }

            if (document.getElementById('volume')) {

                tuba.player.parameters.volume = parseInt(document.getElementById('volume').getAttribute('data-value'),10);

                document.getElementById('volume').style.paddingLeft = parseInt(tuba.player.parameters.volume*document.getElementById('volume').offsetWidth/100,10) + 'px';

                document.getElementById('volume').onmousedown = function(e) {



                    tuba.player.parameters.maxVolume = parseInt(document.getElementById('volume').offsetWidth,10) - parseInt(document.getElementById('volume').offsetHeight,10);

                    tuba.player.parameters.dragging = true;

                    var pos = tuba.commons.getMousePosition(e);
                    var paddingLeft = parseInt(document.getElementById('volume').style.paddingLeft.toString().substring(0, document.getElementById('volume').style.paddingLeft.toString().indexOf('px')),10);

                    tuba.player.parameters.startMouseX = pos.posx;
                    tuba.player.parameters.paddingLeft = paddingLeft;

                    paddingLeft = (pos.posx-4)-(parseInt(document.getElementById('volume').parentNode.offsetLeft,10)+parseInt(document.getElementById('volume').offsetLeft,10));

                    if (paddingLeft > tuba.player.parameters.maxVolume) paddingLeft = tuba.player.parameters.maxVolume;
                    if (paddingLeft < 0) paddingLeft = 0;

                    document.getElementById('volume').style.paddingLeft = paddingLeft + 'px';

                    var volume = paddingLeft/tuba.player.parameters.maxVolume * 100;

                    if (volume > 100) volume = 100;
                    if (volume < 0) volume = 0;

                    tuba.player.volume(volume);

                };

                document.getElementById('volume').onmouseup = function(e) {

                    tuba.player.parameters.dragging = false;

                };

                document.getElementById('volume').onmouseleave = document.getElementById('volume').onmouseup;

                document.getElementById('volume').onmouseout = document.getElementById('volume').onmouseup;

                document.getElementById('volume').onmousemove = function(e) {

                    if (tuba.player.parameters.dragging) {

                        var pos = tuba.commons.getMousePosition(e);
                        var paddingLeft = parseInt(document.getElementById('volume').style.paddingLeft.toString().substring(0, document.getElementById('volume').style.paddingLeft.toString().indexOf('px')));

                        tuba.player.parameters['startMouseX'] = pos.posx;
                        tuba.player.parameters['paddingLeft'] = paddingLeft;
                        tuba.player.parameters['maxVolume'] = document.getElementById('volume').offsetWidth - parseInt(document.getElementById('volume').offsetHeight);

                        var paddingLeft = (pos.posx-4)-(parseInt(document.getElementById('volume').parentNode.offsetLeft)+parseInt(document.getElementById('volume').offsetLeft));

                        if (paddingLeft > tuba.player.parameters['maxVolume']) paddingLeft = tuba.player.parameters['maxVolume'];
                        if (paddingLeft < 0) paddingLeft = 0;

                        document.getElementById('volume').style.paddingLeft = paddingLeft + 'px';

                        var volume = paddingLeft/tuba.player.parameters['maxVolume'] * 100;

                        if (volume > 100) volume = 100;
                        if (volume < 0) volume = 0;

                        tuba.player.volume(volume);

                    }

                }

            }


            if (tuba.autopopup) {

                if (tuba.autopopup == 'radio') {

                    NW.Dom.select('section.article.content button.radio', document.getElementById('main'), function(button) {

                        var obj = document.createElement('button');
                        obj.setAttribute('data-action', tuba.autopopup);
                        obj.setAttribute('data-value', button.getAttribute('data-value'));
                        obj.setAttribute('data-id', button.getAttribute('data-id'));
                        obj.setAttribute('data-type', button.getAttribute('data-type'));

                        tuba.actions.radio.init(obj);

                    });

                } else {

                    var obj = document.createElement('button');
                    obj.setAttribute('data-value', tuba.autopopup);
                    tuba.actions['open-popup'].init(obj);

                }

            }

            if (tuba[tuba.section] && tuba[tuba.section].onload) tuba[tuba.section].onload();

            tuba.commons.prepareActions();

            tuba.commons.fonts.insertClasses();

        },

        onload: function(e) {

            if (!tuba.loadDone) tuba.onready();

            if (tuba.social.facebook) tuba.facebook.init();

            var scripts = [
                (tuba.stats.analytics ? 'http://www.google-analytics.com/ga.js' : false),
                (tuba.stats.heatmap ? 'http://mklik.gazeta.pl/hmapxy.js' : false),
                (tuba.social.plusone ? 'http://apis.google.com/js/plusone.js' : false)
            ];

            for (var i = scripts.length - 1; i >= 0; i--) {
                 if (scripts[i]) {
                    tuba.commons.loadScript(scripts[i]);
                }
            }

            if(document.getElementById('searched')){

                setInterval(function() {

                    if(tuba.searched.data.length < 10){

                        tuba.searched.request();

                    } else {

                        if(tuba.searched.data[0].link && tuba.searched.data[0].name && tuba.searched.data[0].type){

                            document.getElementById('searched').innerHTML = '<li><a href="' + tuba.base + (tuba.searched.data[0].type == 4 ? 'gatunek/' : 'artysta/') + tuba.searched.data[0].link + '">' + tuba.searched.data[0].name + '</a></li>' + document.getElementById('searched').innerHTML;

                            document.getElementById('searched').removeChild(document.getElementById('searched').childNodes[document.getElementById('searched').childNodes.length-1]);

                        }

                        tuba.searched.data.shift();

                    }

                }, 5000);

            }
            if (typeof(tuba.extensions) !== 'undefined') tuba.extensions();
        },

        RPC: {

            counter : 0,

            actions : {

                log : function(input) {

                    console.log('RPC logger ', input);

                    return true;

                },

                subtract : function(a, b) {

                    return a - b;

                },

                setAttribute : function(id, attribute, value) {

                    var node = document.getElementById(id);

                    node.setAttribute(attribute, value);

                    return true;

                },

                removeAttribute : function(id, attribute) {

                    var node = document.getElementById(id);

                    node.removeAttribute(attribute);

                    return true;

                },



                addClass : function(id, className) {

                    tuba.commons.addClass(id, className);

                    return true;

                },

                removeClass : function(id, className) {

                    tuba.commons.removeClass(id, className);

                    return true;

                },

                set : function(name, value) {

                    tuba.player.parameters[name] = value;

                    return true;

                },

                pass : function(message) {

                    console.log(message);

                    return true;

                },

                volume : function(/*number*/ level) {

                    tuba.player.volume(level, true);

                    return true;

                },

                radio : function(url) {

                    tuba.actions.load(url);

                    co

                    return true;

                },

                findeContextRadio : function(/*array<string>*/ tags) {

                    var tags = tags;

                    function findeContextRadio(/*array<string>*/ tags) {

                        var callback = function(data) {

                            return data.length ? showRadio(data) : findeContextRadio(tags);

                        };

                        return tags.length ? tuba.commons.CORS.execute(
                            tuba.api + 'autocompleteArtists',
                            'get',
                            {
                                query   : tags.shift(),
                            },
                            callback
                        ) : false;

                        // return tags.length ? tuba.commons.jx.load('http://master.fm.tuba.pl/api3/autocompleteArtists?query=' + tags.shift(),

                        //  function(data) {

                        //      return data.length ? showRadio(data) : findeContextRadio(tags);

                        //  },

                        // 'json', 'POST') : false;

                    }

                    function showRadio(/*object*/ radio) {

                        var radio = radio[0],
                            visual = document.getElementById('visual'),
                            cover = document.getElementById('app_cover[0]'),
                            obj = document.createElement('button'),
                            callback = function(data) {

                                if (data.length) cover.src = data.shift().full_img;

                                // cover.parentNode.innerHTML = cover.parentNode.innerHTML;

                            };

                        var covers = tuba.commons.CORS.execute(
                            tuba.api + 'getCoversPack',
                            'get',
                            {
                                id  : radio.id,
                                type: radio.type
                            },
                            callback
                        );

                        obj.setAttribute('data-action', 'radio');
                        obj.setAttribute('data-value', radio.keyword);
                        obj.setAttribute('data-id', radio.id);
                        obj.setAttribute('data-type', radio.type);
                        obj.className = 'radio';
                        obj.id = 'radio-showRadio';

                        obj.onclick = function (e) {
                            tuba.actions.radio.init(obj);
                        }

                        visual.appendChild(obj)

                        var call = tuba.RPC.call('addClass', ['embed_iframe', 'visual']);

                        tuba.RPC.source.postMessage(JSON.stringify(call), tuba.RPC.origin);

                        tuba.commons.addClass('visual', 'show-radio');
                        tuba.commons.addClass('visual', 'active');

                        if (tuba.visualRadio) {

                            clearTimeout(tuba.visualRadio);

                        }

                        tuba.visualRadio = setTimeout(function() {

                            var call = tuba.RPC.call('removeClass', ['embed_iframe', 'visual']);

                            tuba.RPC.source.postMessage(JSON.stringify(call), tuba.RPC.origin);

                            tuba.commons.removeClass('visual', 'active');
                            tuba.commons.removeClass('visual', 'show-radio');

                            var node = document.getElementById('radio-showRadio');

                            if (node) {
                                node.parentNode.removeChild(node);
                            }



                        }, 5000);

                        console.log('radio: ', radio);

                    }

                    console.log(findeContextRadio(tags));

                    return true;

                }

            },

            errors : {
                32700 : 'Parse error',  // Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.
                32600 : 'Invalid Request', // The JSON sent is not a valid Request object.
                32601 : 'Method not found', // The method does not exist / is not available.
                32602 : 'Invalid params', // Invalid method parameter(s).
                32603 : 'Internal error', // Internal JSON-RPC error.
                32000 : 'Server error'
            },

            read : function(message, /*function*/ send, context) {

                function RPCError(/*number*/ code, /*?number*/ id) {
                    this.message = tuba.RPC.errors[code];
                    this.code = 0 - code;
                    this.id = id || null;
                }

                RPCError.prototype = new Error();
                RPCError.prototype.constructor = RPCError;

                try {

                    var batch = false,
                        stack = [],
                        rpc = JSON.parse(message);

                    if (!(Object.prototype.toString.call(rpc) === '[object Array]')) rpc = [rpc]; else batch = true;

                    while (rpc.length) {

                        var call = rpc.shift();

                        if(call.jsonrpc != '2.0') throw new RPCError(32600, call.id);

                        if (call.error) {

                            console.log('RPC Error (id ' + call.id + '): ', call.error);

                        } else if (call.result) {

                            console.log('RPC result: (id ' + call.id + ')', call.result);

                        } else if (call.method) {

                            try {

                                value = tuba.RPC.actions[call.method].apply(null, call.params);

                                if (call.id) {

                                    stack.push(tuba.RPC.write('result', value, call.id));

                                }

                            } catch(error) {

                                if (error instanceof TypeError && call.id) {

                                    throw new RPCError(32601, call.id);

                                }

                            }

                        } else {

                            throw new RPCError(32600, call.id);

                        }

                    }

                } catch (e) {

                    if (e instanceof RPCError) {

                        stack.push(tuba.RPC.write('error', {
                            "code"      : e.code,
                            "message"   : e.message
                        }, e.id || null));

                    } else {

                        console.log(e.name);

                    }

                } finally {

                    var message = stack.length ? (JSON.stringify( batch ? stack : stack.shift() )) : false;

                    if (message) {

                        send(message)

                    }

                }

            },

            write : function(type, value, id) /*object*/ {

                var call = {
                    jsonrpc : "2.0",
                    id      : id || null
                };

                call[type] = value;

                return call;

            },

            call : function(method, /*array*/ params, /*?boolean*/ isInfo) /*object*/ {

                var message = {
                    "jsonrpc"   : "2.0",
                    "method"    : method,
                    "params"    : params
                };

                if(!isInfo) message.id = ++tuba.RPC.counter;

                return message;

            }

        },

        bridge: {

            active: false,

            ready: function() {

                if (!tuba.loadDone) return;
                if (tuba.player.parameters['bridgeReady']) return;

                try {

                    if (document.getElementById('bridge'))
                        document.getElementById('bridge').ready();

                } catch(e) { }

                tuba.player.parameters['bridgeReady'] = true;

            },

            error: function(e) {

                console.log('tuba.bridge.bridgeError', e.name);

            },

            call: function(action, data, pid) {
                                // GM  call from flash
                                //if(action!='status' && action!='window') console.log('ACTION: '+action);
                                if(tuba.player.parameters['vd']!==null && tuba.player.parameters['vd']!='') {
                                   tuba.player.parameters['blocked'] = true;
                                   if(tuba.player.parameters['status'].type==2 && tuba.player.parameters['status'].playing) {
                                        // adblock hack
                                        if (document.getElementById('player')) document.getElementById('player').jsEvent({event:'stop', pid:pid});
                                    }
                                   //if(action=='vastInit' && tuba.player.parameters['vd'].substr(0,1)=='~') return;
                                   if(action=='vastInit' && (tuba.player.parameters['vd'].substr(0,1)=='~' || tuba.player.parameters['vd'].substr(0,1)=='*')) {
                                        return;
                                   }
                                }

                                data = data[0].data;
                pid = pid || false;

                switch(action) {

                    case 'relogin':

                        tuba.facebook.logged(data, true);

                    break;

                    case 'relogout':

                        tuba.facebook.logout(data, true);

                    break;

                    case 'playerStart':

                        if (!tuba.playing) {
                            tuba.gemiusPBI.init(data);
                            tuba.gemiusPBI.event('playing');
                            tuba.playing = true;
                        }

                        tuba.gemius.init(data);
                        tuba.gemius.event('playing', data);

                        try{

                            tuba.player.parameters.history.unshift(
                                data.info.type + '.' + data.info.id
                            );

                            localStorage.setItem('player:history', tuba.player.parameters.history.join(','));

                        } catch (e) {}

                    break;

                    case 'playerClose':

                        tuba.playing = false;

                        tuba.gemiusPBI.close();

                        tuba.gemius.close(data);

                    break;

                    case 'playerComplete':

                        tuba.gemius.event('complete', data);

                    break;

                    case 'spotStart':

                        tuba.player.parameters['blocked'] = true;

                        if (tuba.master) {

                            try {

                                tuba.player.parameters['time'] += (new Date().getTime()) - tuba.player.parameters['timestamp'];
                                tuba.player.parameters['timestamp'] = 0;

                                tuba.gemiusPBI.event('paused');

                                var img = new Image();
                                img.src = tuba.base + 'dot.gif?' +
                                    'player=newStream' +
                                    '&radio_id=' + encodeURIComponent(data.info.id) +
                                    '&radio_type=' + encodeURIComponent(data.info.type) +
                                    '&starter_id=' + encodeURIComponent(data.info.starter_id) +
                                    '&session_id=' + encodeURIComponent(tuba.player.parameters.gemius.playlistId) +
                                    '&time=0' +
                                    '&t=' + (new Date().getTime());

                                if (data.info.link) {

                                    var img_external = new Image();
                                    img_external.src = data.info.link + '?t=' + (new Date().getTime());

                                }

                                console.log('[SPOT] newStream' ,[data.info.starter_id, tuba.player.parameters.gemius.playlistId, 0]);

                            } catch(e) { console.log(e); }

                        }

                        if (document.getElementById('toggle'))
                            tuba.actions.set(document.getElementById('toggle'), 'playlist', false);

                        if (document.getElementById('music'))
                            document.getElementById('music').setAttribute('disabled', 'disabled');

                        if (document.getElementById('playlist'))
                            document.getElementById('playlist').setAttribute('disabled', 'disabled');

                        if (document.getElementById('toggle'))
                            document.getElementById('toggle').setAttribute('disabled', 'disabled');

                    break;

                    case 'spotComplete':

                        tuba.player.parameters.blocked = false;

                        if (tuba.master) {

                            tuba.gemiusPBI.event('playing');

                            var img = new Image();
                                img.src = tuba.base + 'dot.gif?' +
                                    'player=complete' +
                                    '&radio_id=' + encodeURIComponent(tuba.player.parameters['status']['info'].id) +
                                    '&radio_type=' + encodeURIComponent(tuba.player.parameters['status']['info'].type) +
                                    '&starter_id=' + encodeURIComponent(data.info.starter_id) +
                                    '&session_id=' + encodeURIComponent(tuba.player.parameters['gemius'].playlistId) +
                                    '&time=' + encodeURIComponent(data.info.time) +
                                    '&t=' + (new Date().getTime());

                            if (data.info.link) {

                                var img_external = new Image;
                                img_external.src = data.info.link + '?t=' + (new Date().getTime());

                            }

                            console.log('[SPOT] complete' ,[data.info.starter_id, tuba.player.parameters['gemius'].playlistId, data.info.time]);

                        }

                        if (document.getElementById('music'))
                            document.getElementById('music').removeAttribute('disabled');

                        if (document.getElementById('playlist'))
                            document.getElementById('playlist').removeAttribute('disabled');

                        if (document.getElementById('toggle'))
                            document.getElementById('toggle').removeAttribute('disabled');

                    break;

                    case 'vastInit':

                        if (tuba.master) {

                            tuba.player.parameters['time'] += (new Date().getTime()) - tuba.player.parameters['timestamp'];
                            tuba.player.parameters['timestamp'] = 0;
                            // mcdonalds
//                            if(document.getElementById("mcdonalds")) {
//                                if(document.getElementById("mcdonalds").style.display != "none") {
//                                    tuba.player.play();
//                                     console.log('vastMc return');
//                                    break;
//                                }
//                            }
                            console.log(tuba.master, 'vastInit', 366);

                            tuba.vast.init(data.data, true);

                        }

                        if (document.getElementById('toggle'))
                            tuba.actions.set(document.getElementById('toggle'), 'playlist', false);

                        if (document.getElementById('music'))
                            document.getElementById('music').setAttribute('disabled', 'disabled');

                        if (document.getElementById('playlist'))
                            document.getElementById('playlist').setAttribute('disabled', 'disabled');

                        if (document.getElementById('toggle'))
                            document.getElementById('toggle').setAttribute('disabled', 'disabled');

                        tuba.player.parameters['blocked'] = true;

                    break;


                    case 'vastInitDone':

                        clearInterval(tuba.player.parameters['vastInit']);

                    break;


                    case 'vastCompleted':

                        if (tuba.master) {

                            if (document.getElementById('player'))
                                document.getElementById('player').jsEvent({event:'vastCompleted', pid:pid});

                            document.getElementById('vast').style.display = 'none';
                            tuba.commons.hide(document.getElementById('vast'));
                            document.getElementById('vast').outerHTML = '<div id="vast"></div>';

                        }

                        if (document.getElementById('music'))
                            document.getElementById('music').removeAttribute('disabled');

                        if (document.getElementById('playlist'))
                            document.getElementById('playlist').removeAttribute('disabled');

                        if (document.getElementById('toggle'))
                            document.getElementById('toggle').removeAttribute('disabled');

                        tuba.player.parameters['blocked'] = false;

                        tuba.player.volume(tuba.player.parameters['volume']);

                    break;


                    case 'reloadSilently':

                        if (tuba.master) {

                            if (document.getElementById('player'))
                                document.getElementById('player').jsEvent({event:'reloadSilently', id:data.id, type: data.type, pid:pid});
                        }

                    break;


                    case 'reload':

                        if (tuba.master) {

                            tuba.window = 2;

                            tuba.bridge.toSlave('window', tuba.window);

                            document.location = data;

                            // if (data.sender != tuba.sender) {

                            //  switch(data.sender) {

                            //      case 0: var location = 'http://fm.tuba.pl/player?id=' + data.id + '&type=' + data.type; break;
                            //      case 1: var location = 'http://zp.tuba.pl/player?id=' + data.id + '&type=' + data.type; break;
                            //      case 2: var location = 'http://rr.tuba.pl/player?id=' + data.id + '&type=' + data.type; break;
                            //      case 3: var location = 'http://tok.tuba.pl/player?id=' + data.id + '&type=' + data.type; break;
                            //      case 5: var location = 'http://nk.tubafm.radioagora.pl/player?id=' + data.id + '&type=' + data.type; break;

                            //  }

                            //  document.location = location;

                            // } else {

                            //  if (document.getElementById('player'))
                            //      document.getElementById('player').jsEvent({event:'reload', id:data.id, type: data.type, pid:pid});

                            // }

                            // tuba.player.parameters['gemius'].playlistId = Math.floor(Math.random()*1000000) + (new Date().getTime());

                        }

                    break;


                    case 'silentStop':

                        if (tuba.master) {
                            if (document.getElementById('player'))
                                document.getElementById('player').jsEvent({event:'stop', pid:pid});
                        }

                    break;


                    case 'stop':

                        if (tuba.master) {
                            if (document.getElementById('player'))
                                document.getElementById('player').jsEvent({event:'stop', pid:pid});
                        }

                                                // GM nowy gemius
                                                if(tuba.player.parameters['status']['info'].type=='2') {
                                                    tuba.gemius.event('complete');
                                                    tuba.gemiusPBI.event('complete');
                                                    console.log('COMPLETE dla TYPE2');
                                                } else {
                                                    tuba.gemiusPBI.event('stopped');
                                                    tuba.gemius.event('stopped');
                                                }


                    break;


                    case 'play':

                        if (tuba.master) {
                            if (document.getElementById('player'))
                                document.getElementById('player').jsEvent({event:'play', pid:pid});
                        }

                        tuba.gemiusPBI.event('playing');
                        tuba.gemius.event('playing');

                    break;


                    case 'volume':

                        if (tuba.master) {
                            if (document.getElementById('player'))
                                document.getElementById('player').jsEvent({event:'volume', volume: data, pid:pid});

                            //tuba.bridge.toSlaveOnly('volume', data);

                        }

                        if (!tuba.master) {
                            if (document.getElementById('vast') && document.getElementById('vast').jsEvent)
                                document.getElementById('vast').jsEvent({event:'volume', volume: data, pid:pid});
                        }

                        if (document.getElementById('volume')) {

                            tuba.player.parameters['maxVolume'] = parseInt(document.getElementById('volume').offsetWidth) - parseInt(document.getElementById('volume').offsetHeight);
                            tuba.player.parameters['volume'] = parseInt(data);
                            document.getElementById('volume').style.paddingLeft = (parseInt(data * tuba.player.parameters['maxVolume'] / 100)).toString() + 'px';

                            if (tuba.player.parameters['volume'] == 0)
                                tuba.actions.set(document.getElementById('mute'), 'mute', true); else
                                tuba.actions.set(document.getElementById('mute'), 'mute', false);

                        }

                    break;

                    case 'window':

                        if (tuba.window != data){

                            tuba.window = data;

                            if (tuba.RPC) {

                                var call = tuba.RPC.call('set', ['window', tuba.window]);

                                tuba.RPC.source.postMessage(JSON.stringify(call), tuba.RPC.origin);

                            }

                        }

                    break;

                    case 'status':

                        try {

                            tuba.player.parameters['status'] = data;

                            var force = false;

                            if (tuba.master) {

                                tuba.bridge.toSlave('window', tuba.window);

                            }

                            if (tuba.bridge.active && !tuba.player.parameters['application']) {

                                if(document.getElementById('music')) {
                                    document.getElementById('music').removeAttribute('disabled');
                                    document.getElementById('music').setAttribute('data-status', 'active');
                                }
                                if(document.getElementById('playlist')) document.getElementById('playlist').removeAttribute('disabled');
                                if(document.getElementById('application')) document.getElementById('application').setAttribute('data-status', 'active');

                                tuba.player.parameters['application'] = true;
                                tuba.player.parameters['music'] = true;
                                force = true;

                            }


                            if (tuba.player.parameters['blocked']) {

                                if (document.getElementById('music') && !document.getElementById('music').getAttribute('disabled'))
                                    document.getElementById('music').setAttribute('disabled', 'disabled');

                                if (document.getElementById('playlist') && document.getElementById('toggle') && !document.getElementById('toggle').getAttribute('disabled'))
                                    document.getElementById('playlist').setAttribute('disabled', 'disabled');

                                if (document.getElementById('toggle')  && document.getElementById('toggle') && !document.getElementById('toggle').getAttribute('disabled'))
                                    document.getElementById('toggle').setAttribute('disabled', 'disabled');

                            }


                            var playlist = tuba.player.parameters['status'].playlist;

                            if (!tuba.player.parameters['blocked']) {

                                if (tuba.player.parameters['music'] != tuba.player.parameters['status'].playing) {

                                    tuba.player.parameters['music'] = tuba.player.parameters['status'].playing;
                                    tuba.actions.set(document.getElementById('music'), 'music', tuba.player.parameters['music']);

                                }

                            }


                            if (tuba.player.parameters['progress'] != tuba.player.parameters['status'].position) {

                                tuba.player.parameters['progress'] = tuba.player.parameters['status'].position;

                                if (document.getElementById('progress'))
                                    document.getElementById('progress').value = tuba.player.parameters['progress'];

                            }


                            if (document.getElementById('app_time')) {



                                if (tuba.player.parameters['status'].totalTime != -1) {

                                    var secs = parseInt(parseInt(tuba.player.parameters['status'].totalTime) - parseInt(tuba.player.parameters['status'].time));

                                    var minutes = Math.floor(secs / 60);
                                    var seconds = secs - (minutes * 60);

                                    if (minutes < 10) {minutes = "0"+minutes;}
                                    if (seconds < 10) {seconds = "0"+seconds;}
                                    var time = minutes + ':' + seconds;

                                    document.getElementById('app_time').innerHTML = time;

                                } else {

                                    if (document.getElementById('app_time').innerHTML != '')
                                        document.getElementById('app_time').innerHTML = '';

                                }

                            }


                            if (tuba.player.parameters['status'].next || force) {

                                if(document.getElementById('visual')){

                                    if (tuba.iframe && tuba.RPC){

                                        var call = tuba.RPC.call('addClass', ['embed_iframe', 'visual']);

                                        tuba.RPC.source.postMessage(JSON.stringify(call), tuba.RPC.origin);

                                        tuba.commons.addClass('visual', 'active');

                                        if (tuba.visualTimeout) {

                                            clearTimeout(tuba.visualTimeout);

                                        }

                                        tuba.visualTimeout = setTimeout(function() {

                                            var call = tuba.RPC.call('removeClass', ['embed_iframe', 'visual']);

                                            tuba.RPC.source.postMessage(JSON.stringify(call), tuba.RPC.origin);

                                            tuba.commons.removeClass('visual', 'active');

                                        }, 5000);

                                    }

                                }

                                if (document.getElementById('adSense') && tuba.adSense) {
                                    document.getElementById('adSense').src = document.getElementById('adSense').src;
                                }

                                tuba.adSense = true;

                                if(document.getElementById('buy')){

                                    if (tuba.player.parameters['status'].current[8].toString().length != 0) {

                                        tuba.commons.show(document.getElementById('buy'));
                                        document.getElementById('buy').setAttribute('data-value', tuba.player.parameters['status'].current[8]);

                                    } else {

                                        tuba.commons.hide(document.getElementById('buy'));
                                        document.getElementById('buy').removeAttribute('data-value');

                                    }

                                }


                                if(document.getElementById('now-playing-menu')) {

                                    NW.Dom.select('button.remove', document.getElementById('now-playing-menu'), function(object) {

                                        object.className = 'control remove';

                                        if (tuba.player.parameters['status'].info['self']) {

                                            object.removeAttribute('disabled');

                                        } else {

                                            if (tuba.player.parameters['status'].info['type'] == 0) {

                                                object.removeAttribute('disabled');

                                            } else {

                                                object.setAttribute('disabled', 'disabled');

                                            }

                                        }

                                    });

                                    NW.Dom.select('button.like', document.getElementById('now-playing-menu'), function(object) {

                                        object.className = 'control like';

                                        if (tuba.player.parameters['status'].info['self']) {

                                            object.setAttribute('disabled', 'disabled');

                                        } else {

                                            object.removeAttribute('disabled');

                                        }

                                    });

                                    NW.Dom.select('button.save, button.edit', document.getElementById('now-playing-menu'), function(object) {

                                        if (tuba.player.parameters['status'].info['self']) {

                                            object.removeAttribute('disabled');
                                            object.setAttribute('data-action', 'edit')
                                            object.setAttribute('data-id', tuba.player.parameters['status'].info['id'])
                                            object.setAttribute('data-type', 1)
                                            object.setAttribute('data-value', tuba.player.parameters['status'].info['name']);
                                            object.className = 'control edit';
                                            object.setAttribute('title', 'Edytuj swoje radio');

                                        } else {

                                            if (tuba.player.parameters['status'].info['type'] == 0) {

                                                object.setAttribute('data-action', 'open-popup');
                                                object.removeAttribute('data-id');
                                                object.removeAttribute('disabled');
                                                object.removeAttribute('data-type');
                                                object.setAttribute('data-value', 'zapisz-radio');
                                                object.className = 'control save';
                                                object.setAttribute('title', 'Zapisz jako swoje radio');

                                            } else {

                                                object.setAttribute('data-action', 'open-popup')
                                                object.removeAttribute('data-id')
                                                object.removeAttribute('data-type')
                                                object.setAttribute('data-value', 'zapisz-radio');
                                                object.setAttribute('disabled', 'disabled');
                                                object.className = 'control save';
                                                object.setAttribute('title', 'Zapisz jako swoje radio');

                                            }

                                        }

                                    });

                                }


                                if (tuba.player.parameters['status'].type == 3 || (tuba.player.parameters['status'].type == 2 && tuba.player.parameters['status'].id == 10)) {

                                    if(document.getElementById('toggle'))
                                        document.getElementById('toggle').setAttribute('disabled', 'disabled');

                                    tuba.actions.set(document.getElementById('toggle'), 'playlist', false);

                                }

                                NW.Dom.select('button[data-action="radio"]', false, function(object) {
                                    if (object.className != 'radio')
                                        object.className = 'radio';
                                });

                                var zlote = tuba.player.parameters['status']['info']['name'].indexOf('Złote Przeboje') === -1;

                                switch(tuba.player.parameters['status'].type) {
                                    case 0:
                                            if (tuba.sender == 1) {

                                                document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + tuba.player.parameters['status']['info']['link'] + '">' + (zlote ? '<span class="zlote">Złote Przeboje </span>' : '') + tuba.player.parameters['status']['info']['name'] + '</a> i podobni artyści';

                                            }

                                            if (tuba.sender == 2) {

                                                document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + tuba.player.parameters['status']['info']['link'] + '"> Roxy ' + tuba.player.parameters['status']['info']['name'] + '</a> i podobni artyści';

                                            }

                                            if (tuba.sender == 5) {

                                                document.getElementById('app_title').innerHTML = tuba.player.parameters['status']['info']['name'] + ' i podobni artyści';

                                            }

                                            else {
                                               

                                                var matches = /artistnew=([^&#=]*)/.exec(window.location.search);
                                                if (matches == null){

                                                } else {
                                                    var param1 = matches[1];
                                                    tuba.artistNewParam = param1;
                                                    
                                                }
                                                 // opis na górze playera
                                                if (tuba.artistNewParam == 1){
                                                    
                                                    document.getElementById('app_title').innerHTML = 'Radio w stylu <a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + tuba.player.parameters['status']['info']['link'] + '">' + tuba.player.parameters['status']['info']['name'] + '</a>';

                                                } else {

                                                    element = document.querySelector('[artistnew]');
                                                    if (element != null){
                                                    
                                                        d = element.getAttribute("artistnew");
                                                        
                                                        if (d == 0){

                                                            document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + tuba.player.parameters['status']['info']['link'] + '">' + tuba.player.parameters['status']['info']['name'] + '</a> i podobni artyści';

                                                        }else if (d == 1){

                                                            document.getElementById('app_title').innerHTML = 'Radio w stylu <a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + tuba.player.parameters['status']['info']['link'] + '">' + tuba.player.parameters['status']['info']['name'] + '</a>';
                                                        }
                                                    } else {
                                                        document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + tuba.player.parameters['status']['info']['link'] + '">' + tuba.player.parameters['status']['info']['name'] + '</a> i podobni artyści';
                                                    }
                                                }
                                            }
                                        break;
                                    case 1:
                                            document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'radio-użytkownika/' + tuba.player.parameters['status']['info']['pid'] + '/' + tuba.player.parameters['status']['info']['link'] + '">Radio ' + tuba.player.parameters['status']['info']['name'] + '</a>';
                                        break;
                                    case 2:
                                            document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'radio/' + tuba.player.parameters['status']['info']['link'] + '">Radio ' + tuba.player.parameters['status']['info']['name'] + '</a>';
                                        break;
                                    case 4:

                                            if (tuba.sender == 1) {

                                                document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'gatunek/' + tuba.player.parameters['status']['info']['link'] + '">' + (zlote ? '<span class="zlote">Złote Przeboje </span>' : '<span class="zlote">') + tuba.player.parameters['status']['info']['name'] + (!zlote ? '</span>' : '') + '</a>';

                                            }

                                            if (tuba.sender == 2) {

                                                document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'gatunek/' + tuba.player.parameters['status']['info']['link'] + '">Roxy ' + tuba.player.parameters['status']['info']['name'] + '</a>';

                                            }

                                            if (tuba.sender == 5) {

                                                document.getElementById('app_title').innerHTML = 'Radio ' + tuba.player.parameters['status']['info']['name'];

                                            }

                                            else {

                                                document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'gatunek/' + tuba.player.parameters['status']['info']['link'] + '">Radio ' + tuba.player.parameters['status']['info']['name'] + '</a>';

                                            }

                                        break;
                                    case 3:

                                            if (tuba.sender == 1) {

                                                document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + tuba.player.parameters['status']['info']['link'] + '">' + (zlote ? '<span class="zlote">Złote Przeboje </span>' : '') + 'tylko ' + tuba.player.parameters['status']['info']['name'] + '</a>';

                                            }

                                            if (tuba.sender == 5) {

                                                document.getElementById('app_title').innerHTML = 'Tylko ' + tuba.player.parameters['status']['info']['name'];

                                            } else {

                                                document.getElementById('app_title').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + tuba.player.parameters['status']['info']['link'] + '">Tylko ' + tuba.player.parameters['status']['info']['name'] + '</a>';

                                            }

                                        break;

                                }

                                if (tuba.player.parameters['status'].id == 10) {
                                    tuba.player.parameters.status.info.name = "Radio TOK FM";
                                }

                                var time = (new Date().getTime());

                                for(var i in playlist) {

                                    var current = playlist[i];

                                        if (document.getElementById('app_artist_name[' + i + ']') && current[7] != 'Zlote+Przeboje') {

                                            document.getElementById('app_artist_name[' + i + ']').innerHTML = current[1];

                                            if (current[0] == -9999) {

                                                document.getElementById('app_artist_name[' + i + ']').href = current[7];
                                                document.getElementById('app_artist_name[' + i + ']').target = '_blank';

                                            } if (tuba.player.parameters['status'].id == 10) {

                                                document.getElementById('app_artist_name[' + i + ']').href = "http://tokfm.pl";
                                                document.getElementById('app_artist_name[' + i + ']').target = '_blank';

                                            } else {

                                                document.getElementById('app_artist_name[' + i + ']').href = tuba.base + 'artysta/' + current[7];
                                                document.getElementById('app_artist_name[' + i + ']').target = '';

                                            }

                                        } else  {
                                            document.getElementById('app_artist_name[' + i + ']').innerHTML = '';
                                        }


                                        if (document.getElementById('app_song_title[' + i + ']'))
                                            document.getElementById('app_song_title[' + i + ']').innerHTML = current[3];

                                        if (tuba.master) {

                                            if (document.getElementById('app_cover[' + i + ']')) {

                                                if (tuba.player.parameters['status'].info['type'] == 2 && current[3] == '') {

                                                    if (document.getElementById('app_cover[' + i + ']'))
                                                        document.getElementById('app_cover[' + i + ']').src = tuba.player.parameters['status'].info['full_img_big'];


                                                } else {

                                                    if (document.getElementById('app_cover[' + i + ']'))
                                                        document.getElementById('app_cover[' + i + ']').src = current[10];

                                                }

                                            }

                                        } else {

                                            if (document.getElementById('app_cover[' + i + ']')) {

                                                if (tuba.player.parameters['status'].info['type'] == 2 && current[3] == '') {

                                                    document.getElementById('app_cover[' + i + ']').src = tuba.player.parameters['status'].info['full_img'];

                                                } else {

                                                    document.getElementById('app_cover[' + i + ']').src = current[9];

                                                }

                                            }

                                        }

                                        if (document.getElementById('app_cover[' + i + ']')) {

                                            if (current[0] == -9999) {

                                                document.getElementById('app_cover[' + i + ']').alt = '';

                                            } else {

                                                document.getElementById('app_cover[' + i + ']').alt = current[1] + (current[4] != '' ? ' - ' + current[4] : '');

                                            }

                                        }

                                        if (document.getElementById('app_artist_link[' + i + ']'))
                                            document.getElementById('app_artist_link[' + i + ']').innerHTML = '<a ' + (tuba.master ? 'target="_blank" ' : '') + 'href="' + tuba.base + 'artysta/' + current[7] + '">' + current[1] + '</a> i podobni artyści';


                                        if (document.getElementById('app_radio[' + i + ']')) {

                                            if (current[11] == '1') {

                                                document.getElementById('app_radio[' + i + ']').setAttribute('data-id', current[0]);
                                                document.getElementById('app_radio[' + i + ']').setAttribute('data-type', 0);
                                                document.getElementById('app_radio[' + i + ']').setAttribute('data-value', current[1]);
                                                tuba.commons.show(document.getElementById('app_radio[' + i + ']'));

                                            } else {

                                                tuba.commons.hide(document.getElementById('app_radio[' + i + ']'));

                                            }

                                        }

                                }

                                var current = tuba.player.parameters['status'].current;

                                if (current[3] == '') {

                                    tuba.commons.tab.change(tuba.player.parameters['status'].info['full_img'], tuba.player.parameters['status'].info['name']);

                                } else {

                                    tuba.commons.tab.change(current[9],current[1] + (current[3] != '' ? ' - ' + current[3] : ''));

                                }

                                if (tuba.master) {

                                    if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {

                                        for(var i in tuba.player.parameters['notification'])
                                            if (tuba.player.parameters['notification'][i]) tuba.player.parameters['notification'][i].cancel();

                                        var randNumber = Math.floor(Math.random()*100000);

                                        tuba.player.parameters['notification'][randNumber] = window.webkitNotifications.createNotification(current[9], current[1], current[3]);

                                        tuba.player.parameters['notification'][randNumber].show();

                                        setTimeout(function() { tuba.player.parameters['notification'][randNumber].cancel(); }, 6000);

                                    }

                                    if (window.webkitNotifications && window.webkitNotifications.checkPermission() > 0) {

                                        window.webkitNotifications.requestPermission(function() {
                                        });

                                    }

                                }

                            }

                        } catch(e) {

                            console.log('bridge status error: ', e.name);
                            console.log('bridge status error: ', e.message);

                        }

                    break;

                }

            },

            status: function(status) {

                tuba.bridge.active = status;

                //if (!tuba.master) {

                    if (!status && tuba.player.parameters['application']) {

                        tuba.player.parameters['application'] = false;
                        tuba.player.parameters['music'] = false;
                        tuba.player.parameters['popup'] = null;
                        tuba.player.parameters['gemius'] = false;
                        tuba.player.parameters['status'] = false;
                        tuba.player.parameters['blocked'] = false;
                        tuba.player.parameters['vastInitDone'] = false;
                        tuba.pid = Math.floor(Math.random()*100000000) + 1000;
                        document.getElementById('music').removeAttribute('data-status');
                        document.getElementById('music').removeAttribute('disabled');
                        document.getElementById('playlist').removeAttribute('disabled');
                        document.getElementById('application').removeAttribute('data-status');

                        NW.Dom.select('button[data-action="radio"]', false, function(object) {
                            if (object.className != 'radio')
                                object.className = 'radio';
                        });

                        if (document.getElementById('vast'))
                            document.getElementById('vast').outerHTML = '<div id="vast"></div>';

                        tuba.commons.hide(document.getElementById('vast'));

                    }

                //}

            },

            toMaster: function(action, data) {
                var items = [{data:data}];
                tuba.bridge.call(action, items);
                try {
                    if (document.getElementById('bridge'))
                        document.getElementById('bridge').sendToMaster(action, items, tuba.pid);
                } catch(e) {
                }

            },
            toMasterOnly: function(action, data) {
                var items = [{data:data}];
                try {
                    if (document.getElementById('bridge'))
                        document.getElementById('bridge').sendToMaster(action, items, tuba.pid);
                } catch(e) {
                }

            },

            toSlaveOnly: function(action, data) {
                var items = [{data:data}];
                try {
                    if (document.getElementById('bridge')) {
                        document.getElementById('bridge').sendToSlaves(action, items, tuba.pid);
                    }
                } catch(e) {
                }

            },

            toSlave: function(action, data) {

                var items = [{data:data}];

                tuba.bridge.call(action, items);

                try {
                    if (document.getElementById('bridge')) {
                        document.getElementById('bridge').sendToSlaves(action, items, tuba.pid);
                    }
                } catch(e) {
                }

            }

        },

        facebook: {

            init: function() {

                window.fbAsyncInit = function() {

                    FB.init({
                        appId       : '128204180532788', // App ID from the App Dashboard
                        channelUrl  : '//' + tuba.base + 'channel.html', // Channel File for x-domain communication
                        status      : true, // check the login status upon init?
                        cookie      : true, // set sessions cookies to allow your server to access the session?
                        xfbml       : true  // parse XFBML tags on this page?
                    });

                    // if(tuba.sender == 0 && tuba.appId === "1111111111111111")
                    if(tuba.appId === "1111111111111111" || tuba.appId === '1111111111111110')
                    {

                        FB.getLoginStatus(function(response) {

                            if(response.status == 'unknown' && !!tuba.session.logged && !!tuba.session.facebook_id) tuba.actions.logout.init();

                        });

                        FB.Event.subscribe('auth.statusChange', function (response) {

                            switch(response.status){

                                case 'connected':

                                    tuba.facebook.connect();

                                    break;

                                case 'not_authorized':

                                    if(!tuba.session.logged || !!tuba.session.facebook_id){

                                        tuba.session.facebook_id = 0;

                                        tuba.actions.logout.init();

                                    }

                                    break;

                                default:

                                    if(!!tuba.session.logged && !!tuba.session.facebook_id != 0) tuba.actions.logout.init();

                            }

                        });

                    }

                };

                tuba.commons.loadScript('//connect.facebook.net/pl_PL/all.js');

            },

            logout: function(data, finish) {

                var finish = finish || false;

                // console.log('logout');

                tuba.player.parameters['status'].next = 1;

                if (tuba.session.facebook_id != 0) FB.logout();

                tuba.session = {
                    facebook_id : 0,
                    id          : 0,
                    logged      : 0,
                    login       : ''
                };

                tuba.baseElement.setAttribute('data-logged', tuba.session.logged);
                tuba.baseElement.setAttribute('data-facebook_id', tuba.session.facebook_id);

                if (data.html.user)
                    if (document.getElementById('user'))
                        document.getElementById('user').innerHTML = data.html.user;

                if (data.html.now_playing_menu)
                    if (document.getElementById('now-playing-menu'))
                        document.getElementById('now-playing-menu').outerHTML = data.html.now_playing_menu;

                tuba.commons.prepareActions(document.getElementById('now-playing-menu'));

                NW.Dom.select('section[data-section="moje"]', false, function(object) {

                    tuba.commons.remove(object);

                });

                NW.Dom.select('section[data-section="ulubione"]', false, function(object) {

                    tuba.commons.remove(object);

                });

                tuba.commons.prepareActions(document.getElementById('user'));

                if (!document.getElementById('main-list')) {

                    NW.Dom.select('section.menu', document.getElementById('main'), function(object) {

                        object.outerHTML = data.html.profile_menu;

                        tuba.commons.prepareActions(document.getElementById('main'));

                        if (typeof gapi != 'undefined') {

                            gapi.plusone.go();

                        }

                    });

                }

                if (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt')) {

                    if (data.html.profile) {

                        NW.Dom.select('section[data-section="profil-moje"]', false, function(object) {

                            tuba.commons.remove(object);

                        });

                        NW.Dom.select('section[data-section="profil-ulubione"]', false, function(object) {

                            tuba.commons.remove(object);

                        });


                        document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + data.html.profile;

                        tuba.commons.prepareActions(document.getElementById('main'));

                    }

                }

                tuba.commons.hide(document.getElementById('navigation[5]'));

                tuba.facebook.reparse();

                tuba.bridge.call('status', [{data:tuba.player.parameters['status']}]);

                if (finish) return false;

                if (tuba.master) {

                    tuba.bridge.toSlaveOnly('relogout', data);

                } else {

                    tuba.bridge.toMasterOnly('relogout', data);

                }
                tuba.switch_moje();

            },

            logged: function(data, finish) {

                var finish = finish || false;

                if (data.html) {

                    if(data.user.data){

                        tuba.session = {
                            facebook_id : data.user.data.facebook_id,
                            id          : data.user.data.id,
                            logged      : 1,
                            login       : data.user.data.login
                        };

                        tuba.baseElement.setAttribute('data-logged', tuba.session.logged);
                        tuba.baseElement.setAttribute('data-facebook_id', tuba.session.facebook_id);

                    }

                    if (data.html.user)
                        if (document.getElementById('user'))
                            document.getElementById('user').innerHTML = data.html.user;

                    if (data.html.now_playing_menu)
                        if (document.getElementById('now-playing-menu'))
                            document.getElementById('now-playing-menu').outerHTML = data.html.now_playing_menu;


                    if(document.getElementById('complementary')){

                        if (data.html.complementary && (document.getElementById('complementary').innerHTML != '') && !(~document.body.className.indexOf('homepage')) && !document.getElementById('moje') && !document.getElementById('ulubione')){

                            NW.Dom.select('.promo', document.getElementById('complementary'), function(object) {

                                document.getElementById('complementary').removeChild(object);

                            });

                            document.getElementById('complementary').innerHTML = data.html.complementary + document.getElementById('complementary').innerHTML;
                        }

                    }

                    if (data.html.profile_menu && !document.getElementById('main-list')) {

                        NW.Dom.select('section.menu', document.getElementById('main'), function(object) {

                            object.outerHTML = data.html.profile_menu;

                            NW.Dom.select('section.menu', document.getElementById('main'), function(object) {

                                tuba.commons.prepareActions(object);

                                if (typeof gapi != 'undefined') {

                                    gapi.plusone.go();

                                }

                                tuba.facebook.reparse();

                            });


                        });

                    }

                    tuba.player.parameters['status'].next = 1;

                    if (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt')) {

                        if (data.html.profile) {

                            NW.Dom.select('section[data-section="profil-moje"]', false, function(object) {

                                tuba.commons.remove(object);

                            });

                            NW.Dom.select('section[data-section="profil-ulubione"]', false, function(object) {

                                tuba.commons.remove(object);

                            });

                            document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + data.html.profile;

                            tuba.commons.prepareActions(document.getElementById('main'));

                        }

                    }

                }

                tuba.commons.prepareActions(document.getElementById('user'));
                tuba.commons.prepareActions(document.getElementById('complementary'));
                tuba.commons.prepareActions(document.getElementById('now-playing-menu'));

                if (document.getElementById('user')) {

                    NW.Dom.select('li:first-child a:first-child', document.getElementById('user'), function(object) {

                        document.getElementById('navigation[5]').firstChild.href = object.href;

                    });

                }

                if (document.getElementById('navigation[5]')) {

                    tuba.commons.show(document.getElementById('navigation[5]'));

                }

                if (data.html.alert) {

                    tuba.actions['open-popup'].open(data.html.alert, false, function() {

                        tuba.commons.prepareActions(document.getElementById('tcontent'));

                    });


                } else {

                    TINY.box.hide();

                }

                tuba.bridge.call('status', [{data:tuba.player.parameters['status']}]);

                if (finish) return false;

                if (tuba.master) {

                    tuba.bridge.toSlaveOnly('relogin', data);

                } else {

                    tuba.bridge.toMasterOnly('relogin', data);

                }
                tuba.switch_moje();

            },

            reparse: function(object) {

                // console.log('reparse');

                var object = object || false;

                if (typeof FB != 'undefined') {

                    if (object)
                        FB.XFBML.parse(object); else
                        FB.XFBML.parse();

                }

            },

            connect: function(merge) {

                var merge = merge || false;

                if (merge) {

                    FB.getLoginStatus(function(response) {

                        if(response.status === 'connected'){

                            tuba.commons.jx.load(tuba.base + 'akcja/polacz-facebook' +
                                '?target=' + encodeURIComponent(location.href) +
                                (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''), function(data) {


                                if (!data.result) {

                                    tuba.actions['open-popup'].open(data.html, false, function() {

                                        tuba.commons.prepareActions(document.getElementById('tcontent'));

                                    });

                                    return false;

                                }

                                if (data.html.alert) {

                                    tuba.facebook.logged(data);

                                } else {

                                    tuba.actions['open-popup'].open(data.html, false, function() {

                                        if (document.getElementById('form_login')) {

                                            document.getElementById('form_login').onsubmit = function(e) {

                                                if (document.getElementById('login').value == '') {

                                                    if (document.getElementById('popup_error')) {

                                                        document.getElementById('popup_error').innerHTML = 'Pole login jest obowiązkowe i nie może pozostać puste';
                                                        document.getElementById('popup_error').style.display = 'block';

                                                    }

                                                    return false;

                                                }

                                                if (document.getElementById('password').value == '') {

                                                    if (document.getElementById('popup_error')) {

                                                        document.getElementById('popup_error').innerHTML = 'Pole hasło jest obowiązkowe i nie może pozostać puste';
                                                        document.getElementById('popup_error').style.display = 'block';

                                                    }

                                                    return false;

                                                }

                                                FB.getLoginStatus(function(response) {

                                                    if(response.status === 'connected'){

                                                        tuba.commons.jx.load(tuba.ssl + 'akcja/polacz-facebook?login=' + encodeURIComponent(document.getElementById('login').value) + '&password=' + encodeURIComponent(document.getElementById('password').value) +
                                                            '&target=' + encodeURIComponent(location.href) +
                                                            (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''), function(data) {

                                                            if (!data.result) {

                                                                document.getElementById('popup_error').innerHTML = data.error.message;
                                                                document.getElementById('popup_error').style.display = 'block';

                                                                return false;

                                                            } else {

                                                                tuba.facebook.logged(data);

                                                            }

                                                        }, 'json', 'POST');

                                                    }

                                                }, true);

                                                return false;

                                            }

                                        }

                                    });

                                }

                            }, 'json', 'POST');

                        }

                    }, true);

                    return;

                }

                tuba.commons.jx.load(tuba.base + 'akcja/facebook' +
                    '?target=' + encodeURIComponent(location.href) +
                    (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' +
                    encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''),

                    function(data) {

                        if (data.result == true) {

                            if (data.connect) {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    document.getElementById('omit').onclick = function(e) {

                                        FB.getLoginStatus(function(response) {

                                            if(response.status === 'connected'){

                                                tuba.commons.jx.load(tuba.base + 'akcja/rejestruj-facebook' +
                                                    '?target=' + encodeURIComponent(location.href) +
                                                    (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''), function(data) {

                                                    if (!data.result) {

                                                        tuba.actions['open-popup'].open(data.html, false, function() {

                                                            tuba.commons.prepareActions(document.getElementById('tcontent'));

                                                        });

                                                        return false;

                                                    } else {

                                                        tuba.actions['open-popup'].open(data.html, false, function() {

                                                            document.getElementById('form_login').onsubmit = function(e) {

                                                                if (document.getElementById('registration-login').value == '') {

                                                                    if (document.getElementById('popup_error')) {

                                                                        document.getElementById('popup_error').innerHTML = 'Pole login jest obowiązkowe i nie może pozostać puste';
                                                                        document.getElementById('popup_error').style.display = 'block';

                                                                    }

                                                                    return false;

                                                                }

                                                                document.getElementById('registration-login').onfocus = function(e) {

                                                                    document.getElementById('popup_error').style.display = 'none';
                                                                    document.getElementById('popup_error').innerHTML = '';

                                                                }

                                                                FB.getLoginStatus(function(response) {

                                                                    if(response.status === 'connected'){

                                                                        tuba.commons.jx.load(tuba.ssl + 'akcja/rejestruj-facebook?registration-login=' + encodeURIComponent(document.getElementById('registration-login').value) + '&registration-avatar=' + encodeURIComponent(document.getElementById('registration-avatar').value) +
                                                                            '&target=' + encodeURIComponent(location.href) +
                                                                            (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''), function(data) {

                                                                            if (!data.result) {

                                                                                document.getElementById('popup_error').innerHTML = data.error.message;
                                                                                document.getElementById('popup_error').style.display = 'block';

                                                                                return false;

                                                                            } else {

                                                                                tuba.facebook.logged(data);

                                                                            }

                                                                        }, 'json', 'POST');

                                                                    }

                                                                }, true);

                                                                return false;

                                                            }

                                                        });

                                                    }

                                                }, 'json', 'POST');

                                            }

                                        }, true);

                                    }

                                    document.getElementById('merge').onclick = function(e) {

                                            tuba.facebook.connect(true);

                                    }

                                });

                            } else {

                                tuba.facebook.logged(data);

                            }

                        } else {

                                                        // GM  POPUP HACK
                                                        if(location.href.substr(0,23)==='http://fm.tuba.pl/?auto') {
                                                            console.log('auto jest, popup off');
                                                        } else {
                                                                tuba.actions['open-popup'].open(data.html, false, function() {
                                                                tuba.commons.prepareActions(document.getElementById('tcontent'));
                                                            });
                                                        }


                        }

                        return false;

                    },

                'json', 'POST');

                return false;

            }

        },

        actions: {

            buy: {

                init: function(object) {



                    if (object.getAttribute('data-value') && object.getAttribute('data-value') != ''){

                        window.open(object.getAttribute('data-value'), 'external');

                        return true;

                    }

                }

            },

            'preview' : {

                init: function(object) {

                    var trigger = document.getElementById('PLAYING') || false;

                    if (object.hasAttribute('data-active')) {

                        tuba.preview.player.pause();

                        object.removeAttribute('data-active');
                        object.removeAttribute('id');

                    } else {

                        var href = object.getAttribute('data-value');

                        object.setAttribute('data-active', true);

                        if (tuba.preview.player){

                            if (trigger){

                                trigger.removeAttribute('data-active');
                                trigger.removeAttribute('id');

                            }

                            tuba.preview.player.src = href;


                        }

                        if (tuba.player.parameters['music']){

                            tuba.player.stop();

                            tuba.preview.player.addEventListener('ended', tuba.player.play, false);

                        }

                        tuba.preview.player.addEventListener('ended', function (){

                            object.removeAttribute('data-active');

                            object.removeAttribute('id');

                        }, false);

                        object.setAttribute('id','PLAYING');

                        tuba.preview.player.play();

                    }

                }

            },

            'new-window': {

                init: function(object) {

                    var settings = object;

                    window.open(object.getAttribute('data-value'), 'external', object.getAttribute('data-settings'));

                }

            },

            'share-mail': {

                init: function(object) {

                    tuba.commons.jx.load(tuba.base + 'popup/share-mail', function(data) {

                        if (data.result) {

                            var id = tuba.player.parameters['status']['info'].id;
                            var type = tuba.player.parameters['status']['info'].type;

                            tuba.actions['open-popup'].open(data.html, false, function() {

                                tuba.commons.prepareActions(document.getElementById('tcontent'));

                                document.getElementById('mail-address').onchange = function(e) {

                                    document.getElementById('popup_error').style.display = '';
                                    document.getElementById('popup_error').innerHTML = '';

                                }

                                document.getElementById('share-mail').onsubmit = function(e) {

                                    if (document.getElementById('mail-address').value == '') {
                                        if(e.preventDefault){ e.preventDefault()};
                                        if(window.event){window.event.returnValue = false;}
                                    }

                                    if (document.getElementById('mail-address').value == '') {

                                        document.getElementById('popup_error').innerHTML = 'Nie poprawny email';
                                        document.getElementById('popup_error').style.display = 'block';

                                        if(e.preventDefault){ e.preventDefault()};
                                        if(window.event){window.event.returnValue = false;}

                                        return false;

                                    }

                                    tuba.commons.jx.load(tuba.base + 'akcja/podziel-sie' +
                                        '?mail-address=' + encodeURIComponent(document.getElementById('mail-address').value) +
                                        '&mail-from=' + encodeURIComponent(document.getElementById('mail-from').value) +
                                        '&id=' + encodeURIComponent(id) +
                                        '&type=' + encodeURIComponent(type),

                                        function(data) {

                                            if (data.result) {

                                                TINY.box.hide();

                                            } else {

                                                tuba.actions['open-popup'].open(data.html, false, function() {

                                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                                });

                                            }

                                        },

                                    'json', 'POST');

                                    return false;

                                }

                            });

                        }

                        return false;

                    }, 'json', 'POST');

                }

            },

            embed: {

                init: function(object) {

                    var id = tuba.player.parameters['status'].info['id'];
                    var type = tuba.player.parameters['status'].info['type'];

                    tuba.commons.jx.load(tuba.base + 'akcja/embed?id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type), function(data) {

                        tuba.actions['open-popup'].open(data.html, false, function() {

                            NW.Dom.select('input', document.getElementById('tcontent'), function(object) {

                                object.focus ();
                                object.select ();

                            });

                            tuba.commons.prepareActions(document.getElementById('tcontent'));

                        });

                        return false;

                    }, 'json', 'POST');

                }

            },

            share: {

                init: function(object) {

                    var id = tuba.player.parameters['status'].info['id'];
                    var type = tuba.player.parameters['status'].info['type'];

                    tuba.commons.jx.load(tuba.base + 'akcja/share?id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type), function(data) {

                        tuba.actions['open-popup'].open(data.html, false, function() {

                            tuba.commons.prepareActions(document.getElementById('tcontent'));

                        });

                        return false;

                    }, 'json', 'POST');

                }

            },

            'disconnect-facebook': {

                init: function(object) {

                    tuba.commons.jx.load(tuba.base + 'akcja/rozlacz-facebook' +
                        '?target=' + encodeURIComponent(location.href) +
                        (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''),

                        function(data) {

                            if (!data.result) {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                });

                            } else {

                                tuba.facebook.logged(data);

                            }

                        } , 'json', 'POST');

                    return false;

                }

            },

            'add-artist': {

                init: function(object) {

                    var artist_id = tuba.player.parameters['status'].current[0];
                    var radio_id = tuba.player.parameters['status'].info.id;

                    tuba.commons.jx.load(tuba.base + 'akcja/usun-artyste?artist-id=' + encodeURIComponent(artist_id) + '&radio-id=' + encodeURIComponent(radio_id), function(data) {

                        if (data.result) {

                            TINY.box.hide();

                        } else {

                            if (document.getElementById('popup_error')) {

                                document.getElementById('popup_error').innerHTML = data.error.message;
                                document.getElementById('popup_error').style.display = 'block';

                            } else {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                });

                            }

                        }

                        return false;

                    }, 'json', 'POST');

                }

            },

            'add-song': {

                init: function(object) {

                    var id = tuba.player.parameters['status'].current[2];
                    var radio_id = tuba.player.parameters['status'].info.id;
                    var artist_id = tuba.player.parameters['status'].current[0];

                    tuba.commons.jx.load(tuba.base + 'akcja/usun-utwor?song-id=' + encodeURIComponent(id) + '&id=' + encodeURIComponent(radio_id)+ '&artist-id=' + encodeURIComponent(artist_id), function(data) {

                        if (data.result) {

                            TINY.box.hide();

                        } else {

                            if (document.getElementById('popup_error')) {

                                document.getElementById('popup_error').innerHTML = data.error.message;
                                document.getElementById('popup_error').style.display = 'block';

                            } else {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                });

                            }

                        }

                        return false;

                    }, 'json', 'POST');

                }

            },

            'remove-song': {

                init: function(object) {

                    var id = object.getAttribute('data-id');
                    var radio_id = document.getElementById('radio-id').value;

                    tuba.commons.jx.load(tuba.base + 'akcja/edytuj-radio?song-id=' + encodeURIComponent(id) + '&id=' + encodeURIComponent(radio_id), function(data) {

                        if (data.result) {

                            if (document.getElementById('banned-songs-list'))
                                document.getElementById('banned-songs-list').innerHTML = data.html;

                            if (document.getElementById('tcontent'))
                                tuba.commons.prepareActions(document.getElementById('tcontent'));

                        } else {

                            if (document.getElementById('popup_error')) {

                                document.getElementById('popup_error').innerHTML = data.error.message;
                                document.getElementById('popup_error').style.display = 'block';

                            } else {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                });

                            }

                        }

                        return false;

                    }, 'json', 'POST');

                }

            },

            'remove-artist': {

                init: function(object) {

                    tuba.commons.jx.load(tuba.base + 'akcja/edytuj-radio?' + encodeURIComponent(object.getAttribute('data-key')) + '=true&artist-id=' + encodeURIComponent(object.getAttribute('data-id')) + '&id=' + encodeURIComponent(document.getElementById('radio-id').value), function(data) {

                        if (data.result) {

                            if (object.getAttribute('data-key') == 'prefers') {

                                document.getElementById('prefers-artists-list').innerHTML = data.html;

                            } else {

                                document.getElementById('banned-artists-list').innerHTML = data.html;

                            }

                            tuba.commons.prepareActions(document.getElementById('tcontent'));

                        } else {

                            document.getElementById('popup_error').innerHTML = data.error.message;
                            document.getElementById('popup_error').style.display = 'block';

                        }

                        return false;

                    }, 'json', 'POST');

                }

            },

            'set-volume': {

                init: function(object) {

                    tuba.player.parameters['volume'] = object.getAttribute('data-value');

                    tuba.player.volume(tuba.player.parameters['volume']);

                }

            },

            'show-tab': {

                init: function(object) {

                    NW.Dom.select('button[data-action="show-tab"]', false, function(element) {
                        element.removeAttribute('data-status');
                    });

                    object.setAttribute('data-status', 'active');

                    root = object.getAttribute('data-root') || 'root';
                    tabs = object.getAttribute('data-tabs') || 'tabs';

                    NW.Dom.select( '.' + root + ' .' + tabs, false, function(element) {

                        if (element.className.indexOf('hidden') == -1)
                            element.className = element.className + " hidden";

                    });

                    document.getElementById(object.getAttribute('data-value')).className = document.getElementById(object.getAttribute('data-value')).className.replace(new RegExp(' hidden', 'g'), '').replace(new RegExp('hidden', 'g'), '');


                }

            },

            edit: {

                init: function(object) {

                    var id, type;

                    id = object.getAttribute('data-id');
                    type = object.getAttribute('data-type');

                    tuba.commons.jx.load(tuba.base + 'akcja/edytuj-radio?id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type),

                        function(data) {

                            var found = false;

                            if (data.result) {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                    if (document.getElementById("ajax-upload")) {

                                        document.getElementById("ajax-upload").onchange = function() {

                                            return tuba.commons.upload(document.getElementById('ajax-form'), function(data) {

                                                if (data.result) {

                                                    document.getElementById('uploaded-logo').firstChild.src = data.full_img;
                                                    document.getElementById('radio-img').value = data.temp_img;

                                                } else {

                                                    document.getElementById('uploaded-logo').firstChild.src = tuba.images + '_img/change-image.png';
                                                    document.getElementById('radio-img').value = '';

                                                }

                                            });

                                        };

                                    }

                                    tuba.autocomplete.init('prefers-artists-query', 'prefers-artists-form', 'prefers-artists-autocomplete', function() {}, 1);
                                    tuba.autocomplete.init('banned-artists-query', 'banned-artists-form', 'banned-artists-autocomplete', function() {}, 2);

                                    document.getElementById('prefers-artists-query').onchange = function(e) {

                                        document.getElementById('popup_error').style.display = 'none';
                                        document.getElementById('popup_error').innerHTML = '';

                                    }

                                    document.getElementById('banned-artists-query').onchange = function(e) {

                                        document.getElementById('popup_error').style.display = 'none';
                                        document.getElementById('popup_error').innerHTML = '';

                                    }

                                    document.getElementById('save-radio').onsubmit = function(e) {

                                        if (document.getElementById('radio-name').value == '') {
                                            document.getElementById('popup_error').innerHTML = 'nazwa radia nie może pozostać pusta';
                                            document.getElementById('popup_error').style.display = 'block';
                                            return false;
                                        }

                                        document.getElementById('radio-name').onfocus = document.getElementById('radio-name').onchange = function(e) {
                                            document.getElementById('popup_error').style.display = 'none';
                                            document.getElementById('popup_error').innerHTML = '';
                                            return false;
                                        }

                                        tuba.commons.jx.load(document.getElementById('save-radio').action + '?radio-name=' + encodeURIComponent(document.getElementById('radio-name').value) +
                                            '&radio-description=' + encodeURIComponent(document.getElementById('radio-description').value) +
                                            '&radio-artist=' + encodeURIComponent(document.getElementById('radio-artist').value) +
                                            '&radio-img=' + encodeURIComponent(document.getElementById('radio-img').value) +
                                            '&radio-id=' + encodeURIComponent(document.getElementById('radio-id').value) +
                                            (document.getElementById('main') && document.getElementById('main').getAttribute('data-type') == 5 ? '&profile=true' : '') +
                                            (document.location.href == tuba.base + 'moje' ? '&list=true' : ''),

                                            function(data) {

                                                if (data.result) {

                                                    TINY.box.hide();

                                                    if (document.body.className.indexOf('homepage') != -1) return;

                                                    if (data.html) {

                                                        // complementary

                                                        var found = false;

                                                        NW.Dom.select('section[data-section="moje"]', false, function(object) {

                                                            object.outerHTML = data.html.complementary;

                                                            NW.Dom.select('section[data-section="moje"]', false, function(object) {

                                                                tuba.commons.prepareActions(object);

                                                            });

                                                            found = true;

                                                        });

                                                        if (!found) {

                                                            if (document.getElementById('complementary'))
                                                                document.getElementById('complementary').innerHTML = data.html.complementary + document.getElementById('complementary').innerHTML;

                                                            tuba.commons.prepareActions(document.getElementById('complementary'));

                                                        }

                                                        // my
                                                        if (window.location.href == tuba.base + 'moje') {

                                                            if (document.getElementById('radio-id').value != '') {

                                                                NW.Dom.select('button[data-id="' + document.getElementById('radio-id').value + '"][data-type="1"]', document.getElementById('main-list'), function(object) {

                                                                    object.parentNode.parentNode.outerHTML = data.html['list_item'];

                                                                });

                                                            } else {

                                                                document.getElementById('main-list').innerHTML = data.html['list_item'] + document.getElementById('main-list').innerHTML;
                                                                tuba.commons.prepareActions(document.getElementById('main-list'));

                                                            }

                                                        }


                                                        // profile view
                                                        if (document.getElementById('main') && document.getElementById('main').getAttribute('data-type') == 5) {

                                                            var found = false;

                                                            NW.Dom.select('section[data-section="profil-moje"]', false, function(object) {

                                                                found = true;

                                                                object.outerHTML = data.html.profile;

                                                                NW.Dom.select('section[data-section="profil-moje"]', false, function(object) {

                                                                    tuba.commons.prepareActions(object);

                                                                });

                                                            });

                                                            if (!found) {

                                                                var found = false;

                                                                NW.Dom.select('section[data-section="profil-ulubione"]', false, function(object) {

                                                                    found = true;

                                                                    object.outerHTML = object.outerHTML + data.html.profile;

                                                                    tuba.commons.prepareActions(document.getElementById('main'));

                                                                });

                                                                if (!found) {

                                                                    document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + data.html.profile;

                                                                    tuba.commons.prepareActions(document.getElementById('main'));

                                                                }

                                                            }

                                                        }


                                                    }

                                                } else {

                                                    document.getElementById('popup_error').innerHTML = 'Istnieje już stacja o takiej nazwie';
                                                    document.getElementById('popup_error').style.display = 'block';

                                                }

                                                return false;

                                            },

                                        'json','POST');

                                        return false;

                                    }

                                }, function(e) {


                                });


                            } else {

                                if (document.getElementById('tcontent') && document.getElementById('tcontent').innerHTML != '' && document.getElementById('popup_error')) {

                                    document.getElementById('popup_error').innerHTML = data.error.message;
                                    document.getElementById('popup_error').style.display = 'block';

                                } else {

                                    tuba.actions['open-popup'].open(data.html, false, function() {

                                        tuba.commons.prepareActions(document.getElementById('tcontent'));

                                    });

                                }

                            }

                        } , 'json', 'POST');

                    return false;

                }

            },

            'confirm-delete': {

                init: function(object) {

                    var id, type, moje;

                    id = object.getAttribute('data-id');
                    type = object.getAttribute('data-type');
                    moje = object.getAttribute('data-self');

                    tuba.commons.jx.load(tuba.base + 'akcja/' + (moje ? 'moje' : 'ulubione') + '?remove=true&id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type) +
                        (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''),

                        function(data) {

                            var found = false;

                            if (data.result) {

                                // complementary
                                NW.Dom.select('section[data-section="' + (moje ? 'moje' : 'ulubione') + '"]', false, function(object) {

                                    found = true;

                                    object.outerHTML = data.html.complementary;

                                    NW.Dom.select('section[data-section="' + (moje ? 'moje' : 'ulubione') + '"]', false, function(object) {

                                        tuba.commons.prepareActions(object);
                                    });

                                });

                                if (!found) {

                                    if (document.getElementById('complementary'))
                                        document.getElementById('complementary').innerHTML = data.html.complementary + document.getElementById('complementary').innerHTML;

                                    tuba.commons.prepareActions(document.getElementById('complementary'));

                                }


                                // profile view
                                if (document.getElementById('main') && document.getElementById('main').getAttribute('data-type') == 5) {

                                    var found = false;

                                    NW.Dom.select('section[data-section="' + (moje ? 'profil-moje' : 'profil-ulubione') + '"]', false, function(object) {

                                        found = true;

                                        object.outerHTML = data.html.profile;

                                        NW.Dom.select('section[data-section="' + (moje ? 'profil-moje' : 'profil-ulubione') + '"]', false, function(object) {

                                            tuba.commons.prepareActions(object);

                                        });

                                    });

                                    if (!found) {

                                        if (moje) {

                                            var found = false;

                                            NW.Dom.select('section[data-section="profil-ulubione"]', false, function(object) {

                                                found = true;

                                                object.outerHTML = object.outerHTML + data.html.profile;

                                                tuba.commons.prepareActions(document.getElementById('main'));

                                            });

                                            if (!found) {

                                                document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + data.html.profil_moje;

                                                tuba.commons.prepareActions(document.getElementById('main'));

                                            }

                                        } else {

                                            var found = false;

                                            NW.Dom.select('section[data-section="profil-moje"]', false, function(object) {

                                                found = true;

                                                object.outerHTML = object.outerHTML + data.html.profile;

                                                tuba.commons.prepareActions(document.getElementById('main'));

                                            });

                                            if (!found) {

                                                document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + data.html.profile;

                                                tuba.commons.prepareActions(document.getElementById('main'));

                                            }

                                        }

                                    }

                                }


                                // my or favorites view
                                if (document.location.href.indexOf((moje ? 'moje' : 'ulubione')) != -1) {

                                    NW.Dom.select('button[data-id="' + id + '"][data-type="' + type + '"]', document.getElementById('main-list'), function(object) {

                                        tuba.commons.remove(object.parentNode.parentNode);

                                    });

                                }

                                TINY.box.hide();


                            } else {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                });

                            }

                        } , 'json', 'POST');

                    return false;

                }

            },

            'delete': {

                init: function(object) {

                    var id, type, moje;

                    id = object.getAttribute('data-id');
                    type = object.getAttribute('data-type');
                    moje = object.getAttribute('data-self');

                    tuba.commons.jx.load(tuba.base + 'akcja/usun-radio?id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type) +
                        (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''), function(data) {

                            tuba.actions['open-popup'].open(data.html, false, function() {

                                tuba.commons.prepareActions(document.getElementById('tcontent'));

                            });

                    } , 'json', 'POST');

                    return false;

                }

            },

            cancel: {

                init: function(object) {

                    TINY.box.hide();

                }

            },

            ok: {

                init: function(object) {

                    TINY.box.hide();

                }

            },

            like: {

                init: function(object) {

                    var id, type;

                    if (object.getAttribute('data-id') == null && object.getAttribute('data-type') == null) {

                        id = tuba.player.parameters['status'].id;
                        type = tuba.player.parameters['status'].type;

                    } else {

                        id = object.getAttribute('data-id');
                        type = object.getAttribute('data-type');

                    }

                    tuba.commons.jx.load(tuba.base + 'akcja/ulubione?id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type) +
                    (document.getElementById('main') && document.getElementById('main').getAttribute('data-type') == 5 ? '&profile=true' : '') +
                    (document.location.href == tuba.base + 'ulubione' ? '&list=true' : ''),

                        function(data) {

                            if (data.result) {

                                if (document.body.className.indexOf('homepage') != -1) return;

                                if (data.html) {

                                    // complementary
                                    var found = false;

                                    NW.Dom.select('section[data-section="ulubione"]', false, function(object) {

                                        object.outerHTML = data.html['complementary'];

                                        NW.Dom.select('section[data-section="ulubione"]', false, function(object) {

                                            tuba.commons.prepareActions(object);

                                        });

                                        found = true;

                                    });

                                    if (!found) {

                                        if (document.getElementById('complementary'))
                                            document.getElementById('complementary').innerHTML = data.html['complementary'] + document.getElementById('complementary').innerHTML;

                                        tuba.commons.prepareActions(document.getElementById('complementary'));

                                    }


                                    // favorites
                                    if (document.location.href == tuba.base + 'ulubione') {

                                        document.getElementById('main-list').innerHTML = data.html['list_item'] + document.getElementById('main-list').innerHTML;
                                        tuba.commons.prepareActions(document.getElementById('main-list'));

                                    }


                                    // profile view
                                    if (document.getElementById('main') && document.getElementById('main').getAttribute('data-type') == 5) {

                                        var found = false;

                                        NW.Dom.select('section[data-section="profil-ulubione"]', false, function(object) {

                                            found = true;

                                            object.outerHTML = data.html.profile;

                                            NW.Dom.select('section[data-section="profil-ulubione"]', false, function(object) {

                                                tuba.commons.prepareActions(object);

                                            });

                                        });

                                        if (!found) {

                                            var found = false;

                                            NW.Dom.select('section[data-section="profil-moje"]', false, function(object) {

                                                found = true;

                                                object.outerHTML = object.outerHTML + data.html.profile;

                                                tuba.commons.prepareActions(document.getElementById('main'));

                                            });

                                            if (!found) {

                                                document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + data.html.profile;

                                                tuba.commons.prepareActions(document.getElementById('main'));

                                            }

                                        }

                                    }

                                }


                            } else {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                });

                            }

                        } , 'json', 'POST');

                    return false;

                }

            },

            logout: {

                init: function(e) {

                    tuba.commons.jx.load(tuba.base + 'akcja/wyloguj?target=' + encodeURIComponent(location.href) +
                        (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''),

                        function(data) {

                            if (data.result) {

                                tuba.facebook.logout(data);

                            }

                        } , 'json', 'POST');

                    return false;

                }

            },

            'open-popup': {

                events: {

                    'zapisz-radio': function(e) {

                        var current = tuba.player.parameters['status'].current;

                        tuba.commons.jx.load(tuba.base + 'akcja/zapisz-radio',  function(data) {

                            if (data.result) {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                    if (document.getElementById("ajax-upload")) {

                                        document.getElementById("ajax-upload").onchange = function() {

                                            return tuba.commons.upload(document.getElementById('ajax-form'), function(data) {

                                                if (data.result) {

                                                    document.getElementById('uploaded-logo').firstChild.src = data.full_img;
                                                    document.getElementById('radio-img').value = data.temp_img;

                                                } else {

                                                    document.getElementById('uploaded-logo').firstChild.src = tuba.images + '_img/change-image.png';
                                                    document.getElementById('radio-img').value = '';

                                                }

                                            });

                                        };

                                    }

                                    document.getElementById('radio-artist').value = current[0];

                                    document.getElementById('save-radio').onsubmit = function(e) {

                                        if (document.getElementById('radio-name').value == '') {
                                            document.getElementById('popup_error').innerHTML = 'nazwa radia nie może pozostać pusta';
                                            document.getElementById('popup_error').style.display = 'block';
                                            return false;
                                        }

                                        document.getElementById('radio-name').onfocus = document.getElementById('radio-name').onchange = function(e) {
                                            document.getElementById('popup_error').style.display = 'none';
                                            document.getElementById('popup_error').innerHTML = '';
                                            return false;
                                        }

                                        tuba.commons.jx.load(document.getElementById('save-radio').action + '?radio-name=' + encodeURIComponent(document.getElementById('radio-name').value) +
                                            '&radio-description=' + encodeURIComponent(document.getElementById('radio-description').value) +
                                            '&radio-artist=' + encodeURIComponent(document.getElementById('radio-artist').value) +
                                            '&radio-img=' + encodeURIComponent(document.getElementById('radio-img').value) +
                                            '&radio-id=' + encodeURIComponent(document.getElementById('radio-id').value) +
                                            (document.getElementById('main') && document.getElementById('main').getAttribute('data-type') == 5 ? '&profile=true' : '') +
                                            (document.location.href == tuba.base + 'moje' ? '&list=true' : ''),

                                            function(data) {

                                                if (data.result) {

                                                    TINY.box.hide();

                                                    if (document.body.className.indexOf('homepage') != -1) return;

                                                    if (data.html) {

                                                        // complementary

                                                        var found = false;

                                                        NW.Dom.select('section[data-section="moje"]', false, function(object) {

                                                            object.outerHTML = data.html.complementary;

                                                            NW.Dom.select('section[data-section="moje"]', false, function(object) {

                                                                tuba.commons.prepareActions(object);

                                                            });

                                                            found = true;

                                                        });

                                                        if (!found) {

                                                            if (document.getElementById('complementary'))
                                                                document.getElementById('complementary').innerHTML = data.html.complementary + document.getElementById('complementary').innerHTML;

                                                            tuba.commons.prepareActions(document.getElementById('complementary'));

                                                        }



                                                        // my
                                                        if (document.location.href == tuba.base + 'moje') {

                                                            document.getElementById('main-list').innerHTML = data.html['list_item'] + document.getElementById('main-list').innerHTML;
                                                            tuba.commons.prepareActions(document.getElementById('main-list'));

                                                        }


                                                        // profile view
                                                        if (document.getElementById('main') && document.getElementById('main').getAttribute('data-type') == 5) {

                                                            var found = false;

                                                            NW.Dom.select('section[data-section="profil-moje"]', false, function(object) {

                                                                found = true;

                                                                object.outerHTML = data.html.profile;

                                                                NW.Dom.select('section[data-section="profil-moje"]', false, function(object) {

                                                                    tuba.commons.prepareActions(object);

                                                                });

                                                            });

                                                            if (!found) {

                                                                var found = false;

                                                                NW.Dom.select('section[data-section="profil-ulubione"]', false, function(object) {

                                                                    found = true;

                                                                    object.outerHTML = object.outerHTML + data.html.profile;

                                                                    tuba.commons.prepareActions(document.getElementById('main'));

                                                                });

                                                                if (!found) {

                                                                    document.getElementById('main').innerHTML = document.getElementById('main').innerHTML + data.html.profile;

                                                                    tuba.commons.prepareActions(document.getElementById('main'));

                                                                }

                                                            }

                                                        }



                                                    }

                                                    tuba.bridge.toMaster('reloadSilently', {id:data.radio_id, type:1});

                                                } else {

                                                    document.getElementById('popup_error').innerHTML = 'Istnieje już stacja o takiej nazwie';
                                                    document.getElementById('popup_error').style.display = 'block';

                                                }

                                                return false;

                                            },

                                        'json','POST');

                                        return false;

                                    }

                                });


                            } else {

                                tuba.actions['open-popup'].open(data.html, false, function() {

                                    tuba.commons.prepareActions(document.getElementById('tcontent'));

                                });

                            }

                        } , 'json', 'POST');

                        return false;

                    },

                    login: function(e) {

                        tuba.facebook.reparse(document.getElementById('tcontent'));

                        document.getElementById('form_login').onsubmit = function(e) {

                            if (document.getElementById('login').value == '') {

                                if (document.getElementById('popup_error')) {

                                    document.getElementById('popup_error').innerHTML = 'Pole login jest obowiązkowe i nie może pozostać puste';
                                    document.getElementById('popup_error').style.display = 'block';

                                }

                                return false;

                            }

                            if (document.getElementById('password').value == '') {

                                if (document.getElementById('popup_error')) {

                                    document.getElementById('popup_error').innerHTML = 'Pole hasło jest obowiązkowe i nie może pozostać puste';
                                    document.getElementById('popup_error').style.display = 'block';

                                }

                                return false;

                            }

                            tuba.commons.jx.load(tuba.ssl + 'akcja/zaloguj' +
                                '?target=' + encodeURIComponent(location.href) +
                                '&login=' + encodeURIComponent(document.getElementById('login').value) +
                                '&password=' + encodeURIComponent(document.getElementById('password').value) +
                                (document.getElementById('main') && document.getElementById('main').getAttribute('data-sqrt') ? '&profile=' + encodeURIComponent(document.getElementById('main').getAttribute('data-sqrt')) : ''),

                                function(data) {

                                    if (!data.result) {

                                        if (document.getElementById('popup_error')) {

                                            document.getElementById('popup_error').innerHTML = data.error.message;
                                            document.getElementById('popup_error').style.display = 'block';

                                        } else {

                                            tuba.actions['open-popup'].open(data.error.message, false, function() {

                                                tuba.commons.prepareActions(document.getElementById('tcontent'));

                                            });

                                        }

                                        return false;

                                    }

                                    if (data.result) {

                                        tuba.facebook.logged(data);

                                    }

                                } , 'json', 'POST');

                            return false;

                        }

                        document.getElementById('login').onchange = function(e) {

                            if (document.getElementById('popup_error')) {

                                document.getElementById('popup_error').innerHTML = '';
                                document.getElementById('popup_error').style.display = 'none';

                            }

                        }

                        document.getElementById('password').onchange = function(e) {

                            if (document.getElementById('popup_error')) {

                                document.getElementById('popup_error').innerHTML = '';
                                document.getElementById('popup_error').style.display = 'none';

                            }

                        }

                        document.getElementById('login').onfocus = document.getElementById('login').onchange;
                        document.getElementById('password').onfocus = document.getElementById('login').onchange;

                        return false;

                    }

                },

                open: function(html, object, callback, closeCallback) {

                    var object = object || false;
                    var callback = callback || false;
                    var closeCallback = closeCallback || false;

                    TINY.box.show({html:html,width:tuba.popup_width,height:tuba.popup_height,mask:true,animate:false,openjs:function(e) {

                        if (object && tuba.actions['open-popup'].events[object.getAttribute('data-value')])
                            tuba.actions['open-popup'].events[object.getAttribute('data-value')]();

                        if (callback)
                            callback();

                        tuba.commons.prepareActions(document.getElementById('tcontent'));

                    }, closejs: function(e) {

                        if (closeCallback)
                            closeCallback();

                    }});

                },

                init: function(object) {

                    var code;

                    if (object.getAttribute('data-value') == 'nie-graj' && !tuba.player.parameters['status'].info.self) {

                        NW.Dom.select('button[data-action="open-popup"][data-value="zapisz-radio"]', document.getElementById('now-playing-menu'), function(object) {

                            object.onclick();

                        });

                        return;

                    }

                    if (typeof tuba.cache_html == 'undefined')
                        tuba.cache_html = [];

                    if (tuba.cache_html[object.getAttribute('data-value')]) {

                        tuba.actions['open-popup'].open(tuba.cache_html[object.getAttribute('data-value')], object);

                    } else {

                        tuba.commons.jx.load(tuba.base + 'popup/' + object.getAttribute('data-value'), function(data) {

                            var _object = object;

                            if (data.html) {

                                tuba.cache_html[_object.getAttribute('data-value')] = data.html;

                                tuba.actions['open-popup'].open(data.html, _object);

                            }

                            return false;

                        }, 'json', 'GET');

                        return false;

                    }

                }

            },

            set: function(object, context, value) {

                var context = context || false;
                var index = context || object.getAttribute('data-value');

                tuba.player.parameters[index] = value;

                if (tuba.player.parameters[index]) {

                    if (object)
                        object.setAttribute('data-status', 'active');

                    if (document.getElementById(index))
                        document.getElementById(index).setAttribute('data-status', 'active');

                } else {

                    if (document.getElementById(index))
                        document.getElementById(index).removeAttribute('data-status');

                    if (object)
                        object.removeAttribute('data-status');

                }

            },

            toggle: {

                init: function(object, context) {

                    var context = context || false;
                    var index = context || object.getAttribute('data-value');

                    if (typeof tuba.player.parameters[index] == 'undefined')
                        tuba.player.parameters[index] = false;

                    if (!tuba.player.parameters[index]) {

                        tuba.player.parameters[index] = true;
                        object.setAttribute('data-status', 'active');
                        if (document.getElementById(index))
                            document.getElementById(index).setAttribute('data-status', 'active');

                    } else {

                        tuba.player.parameters[index] = false;
                        if (document.getElementById(index))
                            document.getElementById(index).removeAttribute('data-status');
                        object.removeAttribute('data-status');

                    }

                    if (tuba.actions && tuba.actions[index]) {

                        try {

                            tuba.actions[index].init(object, index);

                        } catch(err) {

                            console.log('tuba.actions', index, err);

                        }

                    }

                }

            },

            mute: {

                init: function(object, index) {

                    if (!tuba.player.parameters[index]) {

                        tuba.player.parameters['volume'] = tuba.player.parameters['saveVolume'];
                        document.getElementById('volume').style.paddingLeft = tuba.player.parameters['volume'] + 'px';
                        tuba.actions.set(document.getElementById('mute'), 'mute', false);
                        tuba.player.volume(tuba.player.parameters['volume']);
                        return;

                    }

                    if (tuba.player.parameters[index]) {

                        if (tuba.player.parameters['volume'] != 0)
                            tuba.player.parameters['saveVolume'] = tuba.player.parameters['volume'];

                        tuba.player.parameters['volume'] = 0;
                        document.getElementById('volume').style.paddingLeft = tuba.player.parameters['volume'] + 'px';
                        tuba.actions.set(document.getElementById('mute'), 'mute', true);
                        tuba.player.volume(0);
                        return;

                    }

                }

            },

            'list-view': {

                init: function(object) {

                    document.getElementById(object.getAttribute('data-target')).className = 'list ' + object.getAttribute('data-value');

                    NW.Dom.select('button[data-action="list-view"]', false, function(object) {
                        object.removeAttribute('data-status');
                    });

                    object.setAttribute('data-status', 'active');

                    document.cookie = "list-view=" + object.getAttribute('data-value') + "; path=/";

                }

            },

            music: {

                init: function(object) {

                    if (tuba.iframe && !tuba.master && !tuba.bridge.active) {

                        var history = tuba.player.parameters.history;

                        if (history.length) var last = history[0].split('.');

                        NW.Dom.select('.list button', document.getElementById('catalog'), function(object) {

                            id = (last) ? last[1] : object.getAttribute('data-id');
                            type = (last) ? last[0] : object.getAttribute('data-type');

                            var button = document.createElement('button');
                                button.setAttribute('data-action', 'radio');
                                button.setAttribute('data-id', id);
                                button.setAttribute('data-type', type);

                                tuba.actions.radio.init(button);

                                return false;

                        });

                    } else {

                        if (tuba.player.parameters['music'])
                            tuba.player.stop(); else
                            tuba.player.play();

                    }

                }

            },

            load : function(url) {
                                // GM iframe player
                if (window.document.getElementById('i_player')!==null) {
                    tuba.window = 7;
                    //top.location != location, window.top!=window.self, location.href != top.location.href
                }

                switch(tuba.window) {
                    case 0:
                        tuba.popup_ref = window.open(url, 'popup', tuba.popup);
                        tuba.window = 2;
                    break;
                    case 1:
                        var buzzer = document.getElementById('buzzer');

                        if (buzzer) {
                            buzzer.parentNode.removeChild(buzzer);
                            tuba.popup_ref = window.open(url, 'popup', tuba.popup);
                            tuba.window = 2;
                        } else {
                            tuba.bridge.toMaster('reload', url);
                        }
                    break;
                    case 2:
                        console.log('Window not ready');
                    break;
                                        // GM
                    case 7:
                        try {
                                                    var iplayer = window.parent.document.getElementById('i_player');
                                                    //var ipopup = 'top=30,left=' + (screen.width-380) + ',location=no,scrollbars=no,menubar=no,status=no,titlebar=no,toolbar=no,resizable=no,width=720,height=660';
                                                    var w = 750;
                                                    var h = 700;

                                                    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
                                                    var wt = screen.width;

                                                    var lf = ((wt / 2) - (w / 2)) + dualScreenLeft;
                                                    var tp = 100+iplayer.offsetTop;

                                                    var ipopup = 'top='+tp+',left=' + lf + ',location=no,scrollbars=no,menubar=no,status=no,titlebar=no,toolbar=no,resizable=no,width='+w+',height='+h;

                                                    tuba.popup_ref = window.open(url, 'popup', ipopup);
                                                    tuba.window = 0;
                                                    iplayer.parentNode.removeChild(window.parent.document.getElementById('i_player'));
                                                } catch (ex) {
                                                    window.location.href = url;
                                                }

                                        break;
                    default:
                        console.log('Something is wrong, reloading…');
                        document.location = document.location;
                    break;
                }
                if(document.getElementById("pokaz_player")) document.getElementById("pokaz_player").setAttribute("class", "enabled");
            },

            radio: {

                init: function(object, force) {

                    var force = force || false;

                    if (tuba.player.parameters['blocked']) return false;

                    if (tuba.store) {

                        if(confirm("Pobierz aplikację aby słuchać radia!")) window.location = tuba.store;

                        return false;

                    }

                    var id = parseInt(object.getAttribute('data-id'), 10),
                        type = parseInt(object.getAttribute('data-type'), 10),
                        artistnew = parseInt(object.getAttribute('artistnew'), 10); // DF 27.03.2014 dodane na potrzeby artystów duchów

                    var url = {
                        id      : object.getAttribute('data-id'),
                        type    : object.getAttribute('data-type'),
                        artistnew: object.getAttribute('artistnew'), // DF 27.03.2014 dodane na potrzeby artystów duchów

                    }
                                        // GM
                                        if (object.getAttribute('data-vd')) url['vd'] = object.getAttribute('data-vd');
                                        //else url['vd'] = '-1';
                                        // hack by GM
                                        if(!tuba.master) tuba.window = 0;

                    if (tuba.channel) url['channel'] = tuba.channel;
                    // GM2
                                        if (object.getAttribute('data-appid')) {
                                            url['appId'] = object.getAttribute('data-appid');
                                        } else {
                                            if (tuba.appId) url['appId'] = tuba.appId;
                                        }

                    tuba.actions.load(tuba.commons.QueryString.appendToUrl(tuba.basePlayer, url));

                    if (object.className) object.className = 'radio loading';
                    document.body.setAttribute('data-id', id);
                    document.body.setAttribute('data-type', type);

                    // var url = tuba.commons.QueryString.appendToUrl(tuba.parameters.basePlayer, {
                    //  channel : tuba.parameters.channel,
                    //  id      : object.getAttribute('data-id'),
                    //  type    : object.getAttribute('data-type')
                    //  tuba.list : tuba.list ? tuba.list : null;
                    // });




                    // if (tuba.master) {

                    //  tuba.gemius.close();

                    //  setTimeout(function() {

                    //      window.location = tuba.base + 'player?' + (tuba.list ? 'list=' + encodeURIComponent(tuba.list) + '&' : '') + (tuba.user ? 'user=' + encodeURIComponent(tuba.user) + '&' : '') + 'id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type);

                    //  }, 1000);

                    // } else {

                    //  tuba.player.parameters['popup'] = window.open(tuba.base + 'player?' + (tuba.list ? 'list=' + encodeURIComponent(tuba.list) + '&' : '') + (tuba.user ? 'user=' + encodeURIComponent(tuba.user) + '&' : '') + 'id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type), 'popup', tuba.popup);

                    // }

                    // return true;

                }

            },

            volume_box: {

                init: function(object) {

                    var method = object.getAttribute('data-status') == 'active' ? 'addClass' : 'removeClass'
                        call = tuba.RPC.call(method, ['embed_iframe', 'volume_box']);

                    tuba.RPC.source.postMessage(JSON.stringify(call), tuba.RPC.origin);

                }

            },

            catalog: {

                init: function(object) {

                    var method = object.getAttribute('data-status') == 'active' ? 'addClass' : 'removeClass'
                        call = tuba.RPC.call(method, ['embed_iframe', 'catalog']);

                    tuba.RPC.source.postMessage(JSON.stringify(call), tuba.RPC.origin);

                }

            }

        },

        gemiusPBI : {

            close: function() {

                if (!tuba.master) return;
                if (typeof tuba.player.parameters['gemiusPBI'].playerId === 'undefined' || !tuba.player.parameters['gemiusPBI'].playerId) return;

                try {

                    gemiusStream.closeStream(
                        tuba.player.parameters['gemiusPBI'].playerId,
                        tuba.player.parameters['gemiusPBI'].materialIdentifier,
                        Math.ceil((new Date().getTime() - tuba.player.parameters['timestamp']) / 1000)
                    );

                    delete tuba.player.parameters.gemiusPBI;

                } catch(error) {

                    console.log('tuba.gemiusPBI.close', error);

                }

            },

            event: function(event) {

                if (!tuba.master) return;
                if (typeof tuba.player.parameters['gemiusPBI'].playerId == 'undefined' || !tuba.player.parameters['gemiusPBI'].playerId) return;

                var event = event || false;

                try {

                    if (event) {

                        gemiusStream.event(
                            tuba.player.parameters['gemiusPBI'].playerId,
                            tuba.player.parameters['gemiusPBI'].materialIdentifier,
                            Math.floor((new Date().getTime() - tuba.player.parameters['timestamp']) / 1000),
                            event
                        );

                    } else {
                        throw 'Unknown event type: ' + event;
                    }

                } catch(error) {

                    console.log('tuba.gemiusPBI.event', event, error.name, error.message);

                }

            },

            init : function(data) {

                if (!tuba.master) return;

                var data = data || false;

                tuba.player.parameters['gemiusPBI'] = {
                    playerId        : 'playerPBI_' + Math.round(Math.random()*1000000),
                    materialIdentifier  : data.info.type + '_' + data.info.id + '.PBI',
                    totalTime       : -1,
                    customPackage   : [],
                    additionalPackage : [{name:'GA', value:'1.1'}],
                    IDENTIFIER      : 'AfJArSs.jxo6qnNnkKEw3OW07_Yda9rm5giqVQ69E0r.w7',
                    HITCOLLECTOR    : 'http://spl.hit.gemius.pl',
                    treeId          : tuba.treeId || [14]
                };

                tuba.player.parameters['timestamp'] = new Date().getTime();

                console.log('tuba.gemiusPBI.init', tuba.player.parameters['gemiusPBI']);

                try {

                    gemiusStream.newStream(
                        tuba.player.parameters['gemiusPBI'].playerId,
                        tuba.player.parameters['gemiusPBI'].materialIdentifier,
                        tuba.player.parameters['gemiusPBI'].totalTime,
                        tuba.player.parameters['gemiusPBI'].customPackage,
                        tuba.player.parameters['gemiusPBI'].additionalPackage,
                        tuba.player.parameters['gemiusPBI'].IDENTIFIER,
                        tuba.player.parameters['gemiusPBI'].HITCOLLECTOR,
                        tuba.player.parameters['gemiusPBI'].treeId
                    );

                } catch(error) {

                    console.log('tuba.gemiusPBI.init', error);

                }

            },
                        // GM
                        eventV: function(event, video_currentTime) {

                if (!tuba.master) return;
                if (typeof tuba.player.parameters['gemiusPBI'].playerId == 'undefined' || !tuba.player.parameters['gemiusPBI'].playerId) return;

                var event = event || false;

                try {

                    if (event) {

                        gemiusStream.event(
                            tuba.player.parameters['gemiusPBI'].playerId,
                            tuba.player.parameters['gemiusPBI'].materialIdentifier,
                            video_currentTime,
                            event
                        );

                    } else {
                        throw 'Unknown event type: ' + event;
                    }

                } catch(error) {

                    console.log('tuba.gemiusPBI.event', event, error.name, error.message);

                }

            },
                        initV : function(video_duration, video_vd) {

                //if (!tuba.master) return;

                tuba.player.parameters['gemiusPBI'] = {
                    playerId        : 'playerPBI_' + Math.round(Math.random()*1000000),
                    materialIdentifier  : '6_' + video_vd + '.PBI',
                    totalTime       : video_duration,
                    customPackage   : [],
                    additionalPackage : [{name:'GA', value:'1.60'}],
                    IDENTIFIER      : 'AfJArSs.jxo6qnNnkKEw3OW07_Yda9rm5giqVQ69E0r.w7',
                    HITCOLLECTOR    : 'http://spl.hit.gemius.pl',
                    treeId          : [70]
                };

                tuba.player.parameters['timestamp'] = new Date().getTime();

                console.log('tuba.gemiusV_PBI.init', tuba.player.parameters['gemiusPBI']);

                try {

                    gemiusStream.newStream(
                        tuba.player.parameters['gemiusPBI'].playerId,
                        tuba.player.parameters['gemiusPBI'].materialIdentifier,
                        tuba.player.parameters['gemiusPBI'].totalTime,
                        tuba.player.parameters['gemiusPBI'].customPackage,
                        tuba.player.parameters['gemiusPBI'].additionalPackage,
                        tuba.player.parameters['gemiusPBI'].IDENTIFIER,
                        tuba.player.parameters['gemiusPBI'].HITCOLLECTOR,
                        tuba.player.parameters['gemiusPBI'].treeId
                    );

                } catch(error) {

                    console.log('tuba.gemiusPBI.init', error);

                }

            } // init GM Video



        },

        gemius: {

            event: function(event, data) {

                if (!tuba.master) return;
                if (typeof tuba.player.parameters['gemius'].playerId == 'undefined' || !tuba.player.parameters['gemius'].playerId) return;

                var event = event || false;
                var data = data || false;

                try {

                    gemiusStream.event(
                        tuba.player.parameters['gemius'].playerId,
                        tuba.player.parameters['gemius'].materialIdentifier,
                        (data?data.info.time:tuba.player.parameters['status'].time),
                        event
                    );

                    if (tuba.player.parameters['gemius'].type != 2) {

                        if (event == 'complete') {

                            var img = new Image;
                            img.src = tuba.base + 'dot.gif?' +
                                'player=complete' +
                                '&radio_id=' + encodeURIComponent(tuba.player.parameters['gemius'].id) +
                                '&radio_type=' + encodeURIComponent(tuba.player.parameters['gemius'].type) +
                                '&song_id=' + encodeURIComponent(tuba.player.parameters['gemius'].song_id) +
                                '&session_id=' + encodeURIComponent(tuba.player.parameters['gemius'].playlistId) +
                                '&time=' + encodeURIComponent((data?data.info.time:tuba.player.parameters['status'].time)) +
                                '&t=' + (new Date().getTime());

                        }

                    }

                    console.log(event, [tuba.player.parameters['gemius'].playerId,
                                                tuba.player.parameters['gemius'].type,
                        tuba.player.parameters['gemius'].materialIdentifier,
                        (data?data.info.time:tuba.player.parameters['status'].time)]);

                } catch(e) { console.log('tuba.gemius.event', event, e); }

            },

            close: function(data) {

                if (!tuba.master) return;
                if (typeof tuba.player.parameters['gemius'].playerId == 'undefined' || !tuba.player.parameters['gemius'].playerId) return;

                var data = data || false;

                try {

                    gemiusStream.closeStream(
                        tuba.player.parameters['gemius'].playerId,
                        tuba.player.parameters['gemius'].materialIdentifier,
                        (data?data.info.time:tuba.player.parameters['status'].time),
                        'close'
                    );

                    if (tuba.player.parameters['gemius'].type != 2) {

                        var img = new Image;
                        img.src = tuba.base + 'dot.gif?' +
                            'player=close' +
                            '&radio_id=' + encodeURIComponent(tuba.player.parameters['gemius'].id) +
                            '&radio_type=' + encodeURIComponent(tuba.player.parameters['gemius'].type) +
                            '&song_id=' + encodeURIComponent(tuba.player.parameters['gemius'].song_id) +
                            '&session_id=' + encodeURIComponent(tuba.player.parameters['gemius'].playlistId) +
                            '&time=' + encodeURIComponent((data?data.info.time:tuba.player.parameters['status'].time)) +
                            '&t=' + (new Date().getTime());

                    }

                    console.log('close', [tuba.player.parameters['gemius'].playerId,
                        tuba.player.parameters['gemius'].materialIdentifier,
                        (data?data.info.time:tuba.player.parameters['status'].time)]);

                    tuba.player.parameters['gemius'].playerId = false;

                } catch(e) { console.log('tuba.gemius.close', e); }

            },

            init: function(data) {

                if (!tuba.master) return;

                var data = data || false;

                tuba.player.parameters['gemius'].IDENTIFIER = 'd7CadgLoo4nRzNXZaunGM_UC.qgF4fsD6VTAIt2W77L.B7';
                tuba.player.parameters['gemius'].HITCOLLECTOR = 'http://spl.hit.gemius.pl';
                tuba.player.parameters['gemius'].playerId = 'player_' + Math.round(Math.random()*1000000);
                tuba.player.parameters['gemius'].totalTime = data.info.totalTime;
                tuba.player.parameters['gemius'].materialIdentifier = data.info.type + '_' + data.info.id;
                tuba.player.parameters['gemius'].id = data.info.id;
                tuba.player.parameters['gemius'].type = data.info.type;
                tuba.player.parameters['gemius'].song_id = data.info.song_id;
                tuba.player.parameters['gemius'].treeId = tuba.treeId || [14];

                tuba.player.parameters['gemius'].sessionId = Math.floor(Math.random()*1000000) + (new Date().getTime());

                tuba.player.parameters['gemius'].customPackage = [
                    {"name" : "SYSTEM DEVICES", "value" : tuba.commons.BrowserDetect.browser + ' ' + tuba.commons.BrowserDetect.version},
                    {"name" : "SYSTEM OS",      "value" : tuba.commons.BrowserDetect.OS},
                    {"name" : "ITEM AUTOR",     "value" : data.info.artist_name},
                    {"name" : "ITEM TITLE",     "value" : data.info.song_title}
                ];

                try {

                    gemiusStream.newStream(
                        tuba.player.parameters['gemius'].playerId,
                        tuba.player.parameters['gemius'].materialIdentifier,
                        tuba.player.parameters['gemius'].totalTime,
                        tuba.player.parameters['gemius'].customPackage,
                        [],
                        tuba.player.parameters['gemius'].IDENTIFIER,
                        tuba.player.parameters['gemius'].HITCOLLECTOR,
                        tuba.player.parameters['gemius'].treeId
                    );

                    if (tuba.player.parameters['gemius'].type != 2) {

                        var img = new Image;
                        img.src = tuba.base + 'dot.gif?' +
                            'player=newStream' +
                            '&radio_id=' + encodeURIComponent(tuba.player.parameters['gemius'].id) +
                            '&radio_type=' + encodeURIComponent(tuba.player.parameters['gemius'].type) +
                            '&song_id=' + encodeURIComponent(tuba.player.parameters['gemius'].song_id) +
                            '&session_id=' + encodeURIComponent(tuba.player.parameters['gemius'].playlistId) +
                            '&time=' + encodeURIComponent(data.info.time) +
                            '&t=' + (new Date().getTime());

                    }

                    console.log('newStream' ,[tuba.player.parameters['gemius'].playerId,
                        tuba.player.parameters['gemius'].materialIdentifier,
                        tuba.player.parameters['gemius'].totalTime,
                        tuba.player.parameters['gemius'].customPackage,
                        [],
                        tuba.player.parameters['gemius'].IDENTIFIER,
                        tuba.player.parameters['gemius'].HITCOLLECTOR,
                        tuba.player.parameters['gemius'].treeId]
                    );

                    tuba.player.parameters['closed'] = false;

                } catch(e) { console.log('tuba.gemius.init',e.name , e.message); }

            }

        },

        vast: {

            init: function(data, show) {

                var show = show || false;

                tuba.player.parameters['blocked'] = true;

                if(tuba.sender == 5) tuba.bridge.toSlave('vastCompleted');

                                // GM
                                if(tuba.player.parameters['vd']!==null) {
                                    if(tuba.player.parameters['vd'].substr(0,1)=='~' || tuba.player.parameters['vd'].substr(0,1)=='*' ) {
                                        tuba.bridge.toSlave('vastCompleted');
                                        show=false;
                                    }
                                    if (tuba.player.parameters['vd']!='' && typeof player_ !== "undefined") {
                                        player_.pause();
                                    }
                                }


                if (show) {

                    if (tuba.commons.BrowserDetect.browser == 'Explorer' && tuba.commons.BrowserDetect.version == 8) {

                        document.getElementById('vast').style.display = 'block';
                        tuba.commons.show(document.getElementById('vast'));

                    } else {

                        tuba.commons.show(document.getElementById('vast'));

                    }

                    var time = (new Date().getTime());

                    var flashvars = {
                        callback: 'tuba.vast.events',
                        volume: encodeURIComponent(tuba.player.parameters['volume']),
                        data: encodeURIComponent(data)
                    };

                    var params = {
                        allowscriptaccess: 'always',
                        wmode: 'transparent'
                    };

                    if (tuba.commons.BrowserDetect.browser == 'Explorer' && tuba.commons.BrowserDetect.version == 8) {

                        swfobject.embedSWF(tuba.images + '_swf/pro_vast-tuba.swf', 'vast', 400, 400, '11', tuba.images + '_swf/expressInstall.swf', flashvars, params, false);

                        document.getElementById('vast').style.display = 'block';

                    } else {

                        swfobject.embedSWF(tuba.images + '_swf/pro_vast-tuba.swf', 'vast', 400, 400, '11', tuba.images + '_swf/expressInstall.swf', flashvars, params, false);

                    }

                    tuba.commons.show(document.getElementById('vast'));

                }

            },

            events: function(e) {

                switch(e.event) {

                    case 'status':

                        console.log('tuba.vast.events.status', e);

                        if (e.status == 'error' || e.status == 'complete') {

                            tuba.pid = Math.floor(Math.random()*100000000) + 1000;

                            tuba.bridge.toSlave('vastCompleted');

                        }

                    break;

                    case 'data':

                        try {

                            e.data = e.data.substring(0, e.data.indexOf('</VAST>')+8);

                            if (window.DOMParser) {
                                parser =  new DOMParser();
                                xmlDoc = parser.parseFromString(e.data, 'text/xml');
                            }else{
                                xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
                                xmlDoc.async = false;
                                xmlDoc.loadXML(e.data);
                            }

                            if(xmlDoc.getElementsByTagName('Ad') && xmlDoc.getElementsByTagName('Ad')[0] && xmlDoc.getElementsByTagName('Ad')[0].hasChildNodes()){

                                console.log('VAST XML OK');

                                tuba.bridge.toSlave('vastInit', {data: e.data, pid:e.pid});

                            } else {

                                console.log('empty VAST XML');

                                tuba.bridge.toSlave('vastCompleted');

                            }

                        } catch(error) {

                            console.log('VAST XML error:', error.name, error.message);

                            tuba.bridge.toSlave('vastCompleted');

                        }

                    break;

                }

            }

        },

        player: {

            parameters: [],

            onload: function(e) {

            },

            volume: function(value) {

                value = parseInt(value);

                if (value <= 0) {
                    tuba.actions.set(document.getElementById('mute'), 'mute', true);
                    document.getElementById('volume').style.paddingLeft = '0px';
                } else {
                    tuba.actions.set(document.getElementById('mute'), 'mute', false);
                }

                tuba.player.parameters['volume'] = value;

                if (value != 0) {
                    tuba.player.parameters['saveVolume'] = value;
                }

                if (tuba.player.parameters['allowVolume']) {

                    tuba.player.parameters['allowVolume'] = false;

                    if (tuba.master) {

                        tuba.bridge.toSlave('volume', value);

                    } else {

                        tuba.bridge.toMaster('volume', value);

                    }

                    setTimeout(function(e) {

                        tuba.player.parameters['allowVolume'] = true;

                    }, 50);

                }

            },

            silentStop: function() {
                tuba.bridge.toMaster('silentStop');
            },

            stop: function() {
                tuba.bridge.toMaster('stop');
            },

            play: function(e) {
                tuba.bridge.toMaster('play');
            },

            events: function(e) {

                switch(e.event) {

                    case 'ready':

                        if (!tuba.loadDone) return;
                        //if (tuba.player.parameters['playerReady']) return;

                        try {

                            if (document.getElementById('player'))
                                document.getElementById('player').jsEvent({event:'ready'});

                        } catch(e) { }

                        tuba.player.parameters['playerReady'] = true;

                    break;

                    case 'vastStart':
                        tuba.bridge.toSlave('vastStart', e);
                    break;

                    case 'spotStart':
                        tuba.bridge.toSlave('spotStart', e);
                    break;

                    case 'spotComplete':
                        tuba.bridge.toSlave('spotComplete', e);
                    break;

                    case 'playerReady':
                        tuba.bridge.toSlave('playerReady', e);
                    break;

                    case 'playerStart':
                                                // GM
                        if(tuba.player.parameters['vd']!==null && tuba.player.parameters['vd']!='') {

                            if (typeof player_ !== "undefined") {
                                // wstawić start playera
                                player_.play();
                            }
                        //if(0) {
                            tuba.bridge.toMaster('stop');
                            // tuba.player.parameters.gemiusPBI is undefined
                            //tuba.bridge.toSlave('playerStop', e);
                            //tuba.player.stop();
                            break;
                        }
                        tuba.bridge.toSlave('playerStart', e);
                    break;

                    case 'playerClose':
                        tuba.bridge.toSlave('playerClose', e);
                    break;

                    case 'playerComplete':
                        tuba.bridge.toSlave('playerComplete', e);
                    break;

                    case 'status':
                        tuba.bridge.toSlave('status', e);
                    break;

                }

            }

        },

        searched: {

            data: [],

            callback: function(e){

                if(!e.data.length) return false;

                tuba.searched.data = e.data.reverse();

            },

            request: function(){

                var req = tuba.base + 'api3/getMixQueue?format=jsonp&callback=tuba.searched.callback';

                tuba.commons.loadScript(req);

            }

        },

        autocomplete: {

            parameters: [],

            callback: function(e, force) {

                force = force || false;
                type = parseInt(e.basic_type,10);

                // if ((e.pid != tuba.autocomplete.parameters[type]['pid']) && !force) return;

                if (!tuba.autocomplete.parameters[type]['list']['cache_' + e.query])
                    tuba.autocomplete.parameters[type]['list']['cache_' + e.query] = e;

                var s = '<div class=autocomplete>';

                if(e.data.length){

                    // var order = tuba.sender ? [3,0,4] : [3,0,4,2,1];

                    var order = tuba.autocomplete.parameters[type]['result'].getAttribute('data-order').split(',');
                        span = parseInt(tuba.autocomplete.parameters[type]['result'].getAttribute('data-span'), 10) || false;

                    var types = [
                        {key: 'a', label: 'podobni do', name: 'artyści', single: 'artysta'},
                        {key: 'b', label: 'autor: ', name: 'wasze radia', single: 'radio-użytkownika'},
                        {key: 'c', name: 'radia tuby', single: 'radio'},
                        {key: 'd', label: 'tylko', name: 'artyści', single: 'artysta'},
                        {key: 'e', name: 'gatunki', single: 'gatunek'}
                    ];

                    var buckets = {},
                        slot    = (tuba.iframe || tuba.master) ? 6 : 12,
                        results = {};

                    for(var i in e.data){
                        var t = e.data[i].type;
                        if(order.join('').indexOf(t) >= 0 ){
                            var key = types[t].key;
                            if (buckets[key] === undefined) buckets[key] = [];
                            buckets[key].push(e.data[i]);
                        }
                    }

                    for (var i = 0, l = order.length; i < l; i++){
                        var key = types[order[i]].key;
                        if(key in buckets){
                            results[key] = (key == 'a' && buckets['d'] !== undefined) ? '' : '<div class=title>' + types[order[i]].name + '</div>';
                        }
                    }

                    if(JSON.stringify(buckets) != '{}'){

                        while(slot > 0){

                            for (var i = 0, l = order.length; i < l; i++) {

                                var key = types[order[i]].key;

                                if(key in buckets) {

                                    var item = buckets[key][0];

                                    var r = '<div class=choice>';

                                    if (types[order[i]].label){

                                        if (typeof item.artist_ghost_id === 'undefined'){
                                            r += '<span class=label>' + types[order[i]].label + ((item.user_login) ? item.user_login : '') + '</span>';
                                        } else {
                                            r += '<span class=label>' + ' w stylu ' + ((item.user_login) ? item.user_login : '') + '</span>';
                                        }
                                    }

                                    if (tuba.autocomplete.parameters[type]['type'] == 0 && !(tuba.sender == 5) && !span) {

                                        r += '<a class="info more" href="' + tuba.base + types[order[i]].single + '/' + (item.type == 1 ? item.pid + '/' + item.link : item.link) + '" title="' + item.keyword + ', przejdź do strony."' + ((tuba.master || tuba.iframe) ? ' target="_blanc"' : '') + '>' + item.keyword + '</a>';

                                    } else {

                                        r += '<span class=info>' + item.keyword + '</span>';

                                    }

                                    if (typeof item.artist_ghost_id === 'undefined'){
                                        r += '<button  data-value="' + item.keyword + '" artistnew="0" class="radio" data-id="' + item.id + '" data-type="' + item.type + '" data-action="radio" title="Włącz radio ' + item.keyword + '">Włącz radio</button>';
                                    } else {
                                        r += '<button  data-value="' + item.keyword + '" artistnew="1" class="radio" data-id="' + item.id + '" data-type="' + item.type + '" data-action="radio" title="Włącz radio ' + item.keyword + '">Włącz radio</button>';
                                    }

                                    r += '</div>';

                                    results[key] += r;

                                    buckets[key].shift();

                                    if(!buckets[key].length) delete buckets[key];

                                    if(JSON.stringify(buckets)  === '{}'){
                                        slot = 0;
                                    } else {
                                        slot--;
                                    }

                                }

                            }

                        }

                    }

                    for(key in results) s += results[key];

                    if (tuba.autocomplete.parameters[type]['type'] == 0) {

                        s += '<div class=footer>' + (tuba.sender != 5 ? 'enter — zobacz wszystkie wyniki' : '') + '</div>';

                    }

                } else {

                    s += '<div class=footer>frazy nie znaleziono</div>';

                }

                s += '</div>';

                tuba.autocomplete.parameters[type]['result'].innerHTML = s;

                var i = 0;

                NW.Dom.select('.autocomplete .choice', tuba.autocomplete.parameters[type]['result'], function(object) {

                    object.id = 'position:' + i;

                    object.setAttribute('data-position', i++);

                    object.onclick = function(e) {

                        NW.Dom.select('button', object, function(object) {

                            tuba.autocomplete.parameters[type]['query'].value = object.getAttribute('data-value');

                            if (tuba.autocomplete.parameters[type]['type'] == 1 || tuba.autocomplete.parameters[type]['type'] == 2) {

                                tuba.autocomplete.parameters[type]['form'].onsubmit();

                            }

                        });

                    }

                });

                tuba.commons.prepareActions(tuba.autocomplete.parameters[type]['result']);

                tuba.autocomplete.parameters[type]['position'] = -1;
                tuba.autocomplete.parameters[type]['lastPosition'] = 0;

                document.body.className = document.body.className + ' mask';

                tuba.commons.show(tuba.autocomplete.parameters[type]['result']);

            },

            clear: function(type) {

                document.body.className = document.body.className.replace(new RegExp(' mask', 'g'), '');
                tuba.commons.hide(tuba.autocomplete.parameters[type]['result']);

            },

            request: function(type) {

                tuba.autocomplete.parameters[type]['keydown'] = true;

                tuba.autocomplete.parameters[type]['keyword'] = tuba.autocomplete.parameters[type]['query'].value.toString();

                if (tuba.autocomplete.parameters[type]['keyword'].length == 0) {

                    tuba.autocomplete.clear(type);
                    return;

                }

                if (!tuba.autocomplete.parameters[type]['list']['cache_' + tuba.autocomplete.parameters[type]['keyword'].toString()]) {

                    // tuba.autocomplete.parameters[type]['pid'] = (new Date()).getTime();

                    switch(tuba.autocomplete.parameters[type]['type']) {

                        case 2:
                        case 1:

                            // var req = tuba.base + 'api3/autocomplete?type=0&query=' + encodeURIComponent(tuba.autocomplete.parameters[type]['keyword']) + '&format=jsonp&callback=tuba.autocomplete.callback&pid=' + encodeURIComponent(tuba.autocomplete.parameters[type]['pid']) + '&basic_type=' + encodeURIComponent(type);
                            var req = tuba.base + 'api3/autocomplete?type=0&query=' + encodeURIComponent(tuba.autocomplete.parameters[type]['keyword']) + '&format=jsonp&callback=tuba.autocomplete.callback&basic_type=' + encodeURIComponent(type);

                        break;

                        default:

                            // var req = tuba.base + 'api3/autocomplete?query=' + encodeURIComponent(tuba.autocomplete.parameters[type]['keyword']) + '&format=jsonp&callback=tuba.autocomplete.callback&pid=' + encodeURIComponent(tuba.autocomplete.parameters[type]['pid']) + '&basic_type=' + encodeURIComponent(type);
                            var req = tuba.base + 'api3/autocomplete?query=' + encodeURIComponent(tuba.autocomplete.parameters[type]['keyword']) + '&format=jsonp&callback=tuba.autocomplete.callback&basic_type=' + encodeURIComponent(type);

                        break;

                    }

                    tuba.commons.loadScript(req);

                } else {

                    tuba.autocomplete.callback(tuba.autocomplete.parameters[type]['list']['cache_' + tuba.autocomplete.parameters[type]['keyword']], true);

                }

            },

            onblur: function(e, type) {

                setTimeout(function(e) {
                    tuba.autocomplete.clear(type);
                }, 1000);

            },

            onfocus: function(e, type) {

                if (tuba.autocomplete.parameters[type]['pid']) {

                    if (tuba.autocomplete.parameters[type]['result'].innerHTML.length != 0) {

                        document.body.className = document.body.className + ' mask';
                        tuba.commons.show(tuba.autocomplete.parameters[type]['result']);

                    }

                }

            },

            onkeydown: function(e, type) {

                var KEY_BACKSPACE = 8;
                var KEY_DELETE = 46;
                var KEY_DOWN = 40;
                var KEY_UP = 38;
                var KEY_ESC = 27;
                var KEY_SPACE = 32;
                var KEY_ENTER = 13;

                switch(tuba.commons.keyPress(e)) {

                    case KEY_ESC:

                        tuba.autocomplete.clear();

                        if (tuba.autocomplete.parameters[type]['keyword'])
                            tuba.autocomplete.parameters[type]['query'].value = tuba.autocomplete.parameters[type]['keyword'];

                        tuba.autocomplete.parameters[type]['ignore'] = true;

                    break;

                    case KEY_ENTER:

                        if (tuba.autocomplete.parameters[type]['type'] == 0) {

                            tuba.autocomplete.parameters[type]['ignore'] = false;

                        }  else {

                            tuba.autocomplete.parameters[type]['ignore'] = true;

                        }

                    break;

                    case KEY_DOWN:

                        tuba.autocomplete.parameters[type]['lastPosition'] = tuba.autocomplete.parameters[type]['position'];

                        tuba.autocomplete.parameters[type]['position']++;

                        if (tuba.autocomplete.parameters[type]['position'] > tuba.autocomplete.parameters[type]['counter']-1)
                            tuba.autocomplete.parameters[type]['position'] = -1;

                        if (tuba.autocomplete.parameters[type]['lastPosition'] != tuba.autocomplete.parameters[type]['position']) {

                            NW.Dom.select('.autocomplete .choice[data-position]', tuba.autocomplete.parameters[type]['result'], function(object) {
                                object.className = 'choice';
                            });

                            if (tuba.autocomplete.parameters[type]['position'] == -1) {

                                tuba.autocomplete.parameters[type]['query'].value = tuba.autocomplete.parameters[type]['keyword'];

                            } else {

                                NW.Dom.select('.autocomplete .choice[data-position="' + tuba.autocomplete.parameters[type]['position'] + '"] button', tuba.autocomplete.parameters[type]['result'], function(object) {
                                    tuba.autocomplete.parameters[type]['query'].value = object.getAttribute('data-value');
                                });

                            }

                        }

                        NW.Dom.select('.autocomplete .choice[data-position="' + tuba.autocomplete.parameters[type]['position'] + '"]', tuba.autocomplete.parameters[type]['result'], function(object) {
                            object.className += ' active';
                        });

                        tuba.autocomplete.parameters[type]['ignore'] = true;

                    break;

                    case KEY_UP:

                        tuba.autocomplete.parameters[type]['lastPosition'] = tuba.autocomplete.parameters[type]['position'];

                        tuba.autocomplete.parameters[type]['position']--;
                        if (tuba.autocomplete.parameters[type]['position'] < -1)
                            tuba.autocomplete.parameters[type]['position'] = tuba.autocomplete.parameters[type]['counter']-1;

                        if (tuba.autocomplete.parameters[type]['lastPosition'] != tuba.autocomplete.parameters[type]['position']) {

                            NW.Dom.select('.autocomplete .choice[data-position]', tuba.autocomplete.parameters[type]['result'], function(object) {
                                object.className = 'choice';
                            });

                            if (tuba.autocomplete.parameters[type]['position'] == -1) {

                                tuba.autocomplete.parameters[type]['query'].value = tuba.autocomplete.parameters[type]['keyword'];

                            } else {

                                NW.Dom.select('.autocomplete .choice[data-position="' + tuba.autocomplete.parameters[type]['position'] + '"] button', tuba.autocomplete.parameters[type]['result'], function(object) {
                                    tuba.autocomplete.parameters[type]['query'].value = object.getAttribute('data-value');
                                });

                            }

                        }

                        NW.Dom.select('.autocomplete .choice[data-position="' + tuba.autocomplete.parameters[type]['position'] + '"]', tuba.autocomplete.parameters[type]['result'], function(object) {
                            object.className += ' active';
                        });

                        tuba.autocomplete.parameters[type]['ignore'] = true;

                    break;

                    default:

                    break;

                }

            },

            onkeyup: function(e, type) {

                if (tuba.autocomplete.parameters[type]['ignore']) {
                    tuba.autocomplete.parameters[type]['ignore'] = false;
                    return false;
                }

                if ((tuba.master || tuba.iframe) && tuba.commons.keyPress(e) == 13) {

                    if (tuba.autocomplete.parameters[type]['position'] != -1) {

                        NW.Dom.select('.autocomplete .choice[data-position="' + tuba.autocomplete.parameters[type]['position'] + '"] .radio', tuba.autocomplete.parameters[type]['result'], function(find) {

                            var object = document.createElement('button');
                                object.setAttribute('data-action', 'radio');
                                object.setAttribute('data-id', find.getAttribute('data-id'));
                                object.setAttribute('data-type', find.getAttribute('data-type'));

                                tuba.actions.radio.init(object);

                                setTimeout(function(e) {
                                    tuba.autocomplete.clear(type);
                                }, 1000);

                        });

                    }

                    return false;

                }

                if (typeof tuba.autocomplete.parameters[type]['keydown'] == 'undefined')
                    tuba.autocomplete.parameters[type]['keydown'] = true;

                if (tuba.autocomplete.parameters[type]['keydown']) {

                    setTimeout(function(e) {

                        tuba.autocomplete.request(type);

                    }, 500);

                }

                tuba.autocomplete.parameters[type]['keydown'] = false;

            },

            init: function(query, form, result, callback, type) {

                var type = type || 0;

                tuba.autocomplete.parameters[type] = {};

                tuba.autocomplete.parameters[type]['query'] = document.getElementById(query);
                tuba.autocomplete.parameters[type]['form'] = document.getElementById(form);
                tuba.autocomplete.parameters[type]['result'] = document.getElementById(result);
                tuba.autocomplete.parameters[type]['callback'] = callback;
                tuba.autocomplete.parameters[type]['type'] = type;
                tuba.autocomplete.parameters[type]['list'] = [];

                tuba.autocomplete.parameters[type]['position'] = -1;

                if (tuba.autocomplete.parameters[type]['query']) {

                    tuba.commons.addEvent(tuba.autocomplete.parameters[type]['query'], 'keyup', function(e) { tuba.autocomplete.onkeyup(e, type); }, false);
                    tuba.commons.addEvent(tuba.autocomplete.parameters[type]['query'], 'keydown', function(e) { tuba.autocomplete.onkeydown(e, type); } , false);
                    tuba.commons.addEvent(tuba.autocomplete.parameters[type]['query'], 'blur', function(e) { tuba.autocomplete.onblur(e, type); } , false);
                    tuba.commons.addEvent(tuba.autocomplete.parameters[type]['query'], 'focus', function(e) { tuba.autocomplete.onfocus(e, type); } , false);

                }

                    tuba.autocomplete.parameters[type]['form'].onsubmit = function(e) {

                        if (tuba.autocomplete.parameters[type]['type'] == 1) {

                            tuba.commons.jx.load(tuba.base + 'akcja/edytuj-radio?prefers=true&query=' + encodeURIComponent(tuba.autocomplete.parameters[type]['query'].value) + '&id=' + encodeURIComponent(document.getElementById('radio-id').value), function(data) {

                                if (data.result) {

                                    if (data.html) {

                                        document.getElementById('prefers-artists-list').innerHTML = data.html;

                                        tuba.commons.prepareActions(document.getElementById('tcontent'));

                                    }

                                    tuba.autocomplete.parameters[type]['query'].value = '';

                                } else {

                                    document.getElementById('popup_error').innerHTML = data.error.message;
                                    document.getElementById('popup_error').style.display = 'block';

                                }

                                return false;

                            }, 'json', 'POST');

                            return false;

                        }

                        if (tuba.autocomplete.parameters[type]['type'] == 2) {

                            tuba.commons.jx.load(tuba.base + 'akcja/edytuj-radio?banned=true&query=' + encodeURIComponent(tuba.autocomplete.parameters[type]['query'].value) + '&id=' + encodeURIComponent(document.getElementById('radio-id').value), function(data) {

                                if (data.result) {

                                    if (data.html) {

                                        document.getElementById('banned-artists-list').innerHTML = data.html;

                                        tuba.commons.prepareActions(document.getElementById('tcontent'));

                                    }

                                    tuba.autocomplete.parameters[type]['query'].value = '';

                                } else {

                                    document.getElementById('popup_error').innerHTML = data.error.message;
                                    document.getElementById('popup_error').style.display = 'block';

                                }

                                return false;

                            }, 'json', 'POST');

                            return false;

                        }

                        if (tuba.master || tuba.iframe)
                            return false;

                    };

            }

        },

        itunes: {

            request: function(uid, term, entity) {

                if (!term) return false;

                entity = entity || 'album';

                term = encodeURIComponent(term.toString());

                tuba.commons.loadScript('https://itunes.apple.com/search?country=PL&entity='
                    + entity + '&lang=pl_PL&limit=1&media=music&callback=document.getElementById(\'' + uid +
                    '\').callback&term=' + term, false, uid);

            }

        },

        commons: {

            QueryString : {

                encode  : function (/*object*/ bag) {

                    var pairs = [];

                    for (key in bag) {

                        var value = bag[key];

                        if (typeof value !== 'undefined') {

                            if (value === null) {
                                pairs.push(key);
                            } else {
                                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                            }

                        }

                    }

                    return pairs.join('&');

                },

                decode  : function (str, /*boolean?*/ strict) /*object*/ {

                    var data = {};

                    if (str === '') {
                        return data;
                    }

                    var pairs = str.split('&');

                    for (var i = 0; i < pairs.length; i++) {

                        var pair = pairs[i].split('=', 2);
                        var key = decodeURIComponent(pair[0]);

                        if (strict && data.hasOwnProperty(key)) {
                            throw new URIError('Duplicate key: ' + key);
                        }

                        data[key] = pair.length === 2 ? decodeURIComponent(pair[1]) : null;

                    }

                    return data;

                },

                appendToUrl : function (url, params) {

                    return url + (url.indexOf('?') != -1 ? '&' : '?') + (typeof params === 'string' ? params : this.encode(params));

                }

            },

            wrapFunction : {

                wrappers : {},

                wrapFunction : function(/*function*/ fn, /*string?*/ type, /*string?*/ source) /*function*/ {

                    type = type || 'default';

                    return function() {

                        var callee = type in tuba.commons.wrapFunction.wrappers
                            ? tuba.commons.wrapFunction.wrappers[type](fn, source)
                            : fn;

                        return callee.apply(this, arguments);
                    };
                },

                setWrapper : function(/*function*/ fn, /*string?*/ type) {

                    type = type || 'default';

                    tuba.commons.wrapFunction.wrappers[type] = fn;

                }

            },

            CORS : {

                createCORSRequest : function(method, url) /*object?*/ {

                    var xhr = new XMLHttpRequest(),
                        noop = function() {};

                    if ('withCredentials' in xhr) {

                        xhr.open(method, url, true);

                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                    } else if (self.XDomainRequest) {

                        xhr = new XDomainRequest();

                        try {

                            xhr.open(method, url);

                            xhr.onprogress = xhr.ontimeout = noop;

                        } catch (accessDeniedError) {

                            return null;

                        }

                    } else {

                        return null;

                    }

                    var wrapper = {

                        send: function(data) {

                            xhr.send(data);

                        }

                    };

                    var onload = tuba.commons.wrapFunction.wrapFunction(function() {

                            onload = noop;

                            if ('onload' in wrapper)  {

                                wrapper.onload(xhr);

                            }

                        }, 'entry', 'XMLHttpRequest:load');

                    var onerror = tuba.commons.wrapFunction.wrapFunction(function() {

                            onerror = noop;

                            if ('onerror' in wrapper) {

                                wrapper.onerror(xhr);

                            }

                        }, 'entry', 'XMLHttpRequest:error');

                    xhr.onload = function() {
                        onload();
                    };

                    xhr.onerror = function() {
                        onerror();
                    };

                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                onload();
                            } else {
                                onerror();
                            }
                        }
                    };

                    return wrapper;

                },

                execute : function(url, method, /*?object*/ params, /*function*/ callback) {

                    var data = tuba.commons.QueryString.encode(params);

                    if (method != 'post') {

                        url = tuba.commons.QueryString.appendToUrl(url, data);
                        data = '';

                    }

                    var request = this.createCORSRequest(method, url);

                    if (!request) {

                        return false;

                    }

                    request.onload = function(xhr) {

                        callback(JSON.parse(xhr.responseText));

                    };

                    request.onerror = function(xhr) {

                        if (xhr.responseText) {

                            callback(JSON.parse(xhr.responseText));

                        } else {

                            callback({

                                error: {
                                    type    : 'http',
                                    message : 'unknown error',
                                    status  : xhr.status
                                }

                            });

                        }
                    };

                    request.send(data);

                    return true;

                }

            },

            upload: function (form, callback) {

                var callback = callback || false;

                var iframe = document.createElement("iframe");
                iframe.setAttribute("id","ajax-temp");
                iframe.setAttribute("name","ajax-temp");
                iframe.setAttribute("width","0");
                iframe.setAttribute("height","0");
                iframe.setAttribute("border","0");
                iframe.setAttribute("style","width: 0; height: 0; border: none;");

                iframe.onload = function(e) {

                    if (tuba.player.parameters['upload']) {

                        if (callback) {

                            callback(tuba.player.parameters['upload']);

                        }

                    }

                }

                form.parentNode.appendChild(iframe);

                document.domain = 'tuba.pl';

                form.submit();

            },

            removeClass : function(id, className) {

                var node = document.getElementById(id);

                node.className = node.className.replace( new RegExp('(?:^|\\s)' + className + '(?!\\S)'), '' );

                return true;

            },

            addClass : function(id, className) {

                var node = document.getElementById(id);

                if (!(~node.className.indexOf(className))) node.className += ' ' + className;

                return true;

            },

            keyPress: function (e) {

                var keycode;

                if (window.event) {

                    keycode = window.event.keyCode;

                } else {

                    if (e) {

                        keycode = (e.which) ? e.which : e.keyCode;

                    }

                }

                return keycode;

            },

            getMousePosition: function (e) {

                var posx = 0;
                var posy = 0;

                if (!e) var e = window.event;

                if (e.pageX || e.pageY) {
                    posx = e.pageX;
                    posy = e.pageY;
                }
                else if (e.clientX || e.clientY) {
                    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    posy = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
                }

                return {posx:posx, posy:posy};

            },

            prepareActions: function(parent) {

                var parent = parent || false;

                NW.Dom.select('[data-action]', parent, function(object) {

                    if (object.getAttribute('data-action') == 'like' && object.getAttribute('id') != 'now-playing-like') {

                        if (!object.getAttribute('data-id')  && !object.getAttribute('data-type') && document.getElementById('main').getAttribute('data-radio-id') && document.getElementById('main').getAttribute('data-radio-type')) {

                            object.setAttribute('data-id', document.getElementById('main').getAttribute('data-radio-id'));
                            object.setAttribute('data-type', document.getElementById('main').getAttribute('data-radio-type'));

                        }

                    }

                    object['on' + (object.getAttribute('data-event') || 'click')] = function(e) {

                        var action = this.getAttribute('data-action');

                        if (action && tuba.actions && tuba.actions[action]) {

                            try {

                                tuba.actions[action].init(this);

                            } catch(err) {

                                console.log('tuba.prepareActions', action, err);

                            }

                        }

                        return false;

                    }

                });

            },

            hide: function(object) {

                if (object)
                    object.removeAttribute('data-active');

            },

            show: function(object) {

                if (object)
                    object.setAttribute('data-active', 'true');

            },

            tab: {

                /*!
                 * Copyright (c) 2006 Michael Mahemoff. Only works in Firefox and Opera.
                 * Background and MIT License notice at end of file, see the homepage for more.
                 * LEGAL
                 * Permission is hereby granted, free of charge, to any person obtaining a copy
                 * of this software and associated documentation files (the "Software"), to deal
                 * in the Software without restriction, including without limitation the rights
                 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                 * copies of the Software, and to permit persons to whom the Software is
                 * furnished to do so, subject to the following conditions:

                 * The above copyright notice and this permission notice shall be included in
                 * all copies or substantial portions of the Software.

                 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                 * OUT OF OR IN CONNECTION WITH THE SOFTWARE.
                 */

                defaultPause:2000,change:function(iconURL,optionalDocTitle){clearTimeout(this.loopTimer);if(optionalDocTitle){document.title=optionalDocTitle;}this.addLink(iconURL,true);},animate:function(iconSequence,optionalDelay){this.preloadIcons(iconSequence);this.iconSequence=iconSequence;this.sequencePause=(optionalDelay)?optionalDelay:this.defaultPause;favicon.index=0;favicon.change(iconSequence[0]);this.loopTimer=setInterval(function(){favicon.index=(favicon.index+1)%favicon.iconSequence.length;favicon.addLink(favicon.iconSequence[favicon.index],false);},favicon.sequencePause);},loopTimer:null,preloadIcons:function(iconSequence){var dummyImageForPreloading=document.createElement("img");for(var i=0;i<iconSequence.length;i++){dummyImageForPreloading.src=iconSequence[i];}},addLink:function(iconURL){var link=document.createElement("link");link.type="image/x-icon";link.rel="shortcut icon";link.href=iconURL;this.removeLinkIfExists();this.docHead.appendChild(link);},removeLinkIfExists:function(){var links=this.docHead.getElementsByTagName("link");for(var i=0;i<links.length;i++){var link=links[i];if(link.type=="image/x-icon"&&link.rel=="shortcut icon"){this.docHead.removeChild(link);return;}}},docHead:document.getElementsByTagName("head")[0]

            },

            jx: {

                /*!
                 * http://www.openjs.com/scripts/jx/jx_compressed.js
                 */

                getHTTPObject: function() {

                    var A = false;
                    if(typeof ActiveXObject != "undefined") {
                        try {
                            A = new ActiveXObject("Msxml2.XMLHTTP")
                        } catch(C) {
                            try {
                                A = new ActiveXObject("Microsoft.XMLHTTP")
                            } catch(B) {
                                A = false
                            }
                        }
                    } else {
                        if(window.XMLHttpRequest) {
                            try {
                                A = new XMLHttpRequest()
                            } catch(C) {
                                A = false
                            }
                        }
                    }
                    return A

                },

                load: function(url, callback, format, method, opt) {

                    var http = this.init();

                    if(!http || !url) {
                        return
                    }
                    if(http.overrideMimeType) {
                        http.overrideMimeType("text/xml")
                    }
                    if(!method) {
                        method = "GET"
                    }
                    if(!format) {
                        format = "text"
                    }
                    if(!opt) {
                        opt = {}
                    }

                    format = format.toLowerCase();
                    method = method.toUpperCase();

                    var now = "uid=" + new Date().getTime();
                    url += (url.indexOf("?") + 1) ? "&" : "?";
                    url += now;

                    var parameters = null;
                    if(method == "POST") {
                        var parts = url.split("?");
                        url = parts[0];
                        parameters = parts[1]
                    }
                    http.open(method, url, true);
                    if(method == "POST") {
                        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    }
                    var ths = this;
                    if(opt.handler) {
                        http.onreadystatechange = function() {
                            opt.handler(http)
                        }
                    } else {
                        http.onreadystatechange = function() {
                            if(http.readyState == 4) {
                                if(http.status == 200) {
                                    var result = "";
                                    try {
                                        console.log(http);
                                    } catch(e) {};
                                    if(http.responseText) {
                                        result = http.responseText
                                    }
                                    if(format.charAt(0) == "j") {
                                        result = result.replace(/[\n\r]/g, "");
                                        result = eval("(" + result + ")")
                                    } else {
                                        if(format.charAt(0) == "x") {
                                            result = http.responseXML
                                        }
                                    }
                                    if(callback) {
                                        callback(result)
                                    }
                                } else {
                                    if(opt.loadingIndicator) {
                                        document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator)
                                    }
                                    if(opt.loading) {
                                        document.getElementById(opt.loading).style.display = "none"
                                    }
                                    if(error) {
                                        error(http.status);
                                    }
                                }
                            }
                        }
                    }
                    http.send(parameters)

                },

                bind: function(A) {
                    var C = {
                        "url": "",
                        "onSuccess": false,
                        "onError": false,
                        "format": "text",
                        "method": "GET",
                        "update": "",
                        "loading": "",
                        "loadingIndicator": ""
                    };
                    for(var B in C) {
                        if(A[B]) {
                            C[B] = A[B]
                        }
                    }
                    if(!C.url) {
                        return
                    }
                    var D = false;
                    if(C.loadingIndicator) {
                        D = document.createElement("div");
                        D.setAttribute("style", "position:absolute;top:0px;left:0px;");
                        D.setAttribute("class", "loading-indicator");
                        D.innerHTML = C.loadingIndicator;
                        document.getElementsByTagName("body")[0].appendChild(D);
                        this.opt.loadingIndicator = D
                    }
                    if(C.loading) {
                        document.getElementById(C.loading).style.display = "block"
                    }
                    this.load(C.url, function(E) {
                        if(C.onSuccess) {
                            C.onSuccess(E)
                        }
                        if(C.update) {
                            document.getElementById(C.update).innerHTML = E
                        }
                        if(D) {
                            document.getElementsByTagName("body")[0].removeChild(D)
                        }
                        if(C.loading) {
                            document.getElementById(C.loading).style.display = "none"
                        }
                    }, C.format, C.method, C)

                },

                init: function() {
                    return this.getHTTPObject()

                }

            },

            BrowserDetect:{

                /*!
                 * http://www.quirksmode.org/js/detect.html
                 */

                init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)return data[i].identity}else if(dataProp)return data[i].identity}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]

            },

            remove: function(e) {

                if (e && e.parentNode)
                        e.parentNode.removeChild(e);

            },

            loadScript: function (url, callback, id) {



                var callback = callback || false;
                var id = id  || false;

                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = url;
                if (id) script.id = 'script:' + id;

                if(callback){

                    if (script.addEventListener) {

                        script.addEventListener('load', callback, false);

                    } else script.onreadystatechange = function () {

                        if (/loaded|complete/.test(this.readyState)) callback();

                    };

                }

                // script.onreadystatechange= function () {
                //  if (this.readyState == 'complete')
                //      if (callback)
                //          callback();
                // }

                // if (callback)
                //  script.onload = callback;

                setTimeout(function () {
                    var _script = script;
                    document.getElementsByTagName('head')[0].appendChild(_script);
                }, 1);

            },

            readCookie: function(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                }
                return null;
            },

            fonts: {

                hasSmoothing: function() {

                    if (typeof(screen.fontSmoothingEnabled) != "undefined") {
                        return screen.fontSmoothingEnabled;
                    } else {

                        try {

                            var canvasNode = document.createElement('canvas');
                            canvasNode.width = "35";
                            canvasNode.height = "35"

                            canvasNode.style.display = 'none';
                            document.body.appendChild(canvasNode);
                            var ctx = canvasNode.getContext('2d');

                            ctx.textBaseline = "top";
                            ctx.font = "32px Arial";
                            ctx.fillStyle = "black";
                            ctx.strokeStyle = "black";

                            ctx.fillText("O", 0, 0);

                            for (var j = 8; 32 >= j; j++) {
                               for (var i = 1; 32 >= i; i++) {

                                  var imageData = ctx.getImageData(i, j, 1, 1).data;
                                  var alpha = imageData[3];

                                  if (alpha != 255 && alpha != 0) {
                                     return true;
                                  }
                               }

                            }

                            return false;
                        }
                        catch (ex) {
                            return null;
                        }
                    }
                },

                insertClasses: function() {
                    var result = tuba.commons.fonts.hasSmoothing();
                    var htmlNode = document.getElementsByTagName('html')[0];
                    if (result == true) {
                     htmlNode.className += " hasFontSmoothing-true";
                    } else if (result == false) {
                        htmlNode.className += " hasFontSmoothing-false";
                    } else {
                        htmlNode.className += " hasFontSmoothing-unknown";
                    }
                }

            },

            addEvent: function (obj, type, fn) {
                if (obj.addEventListener){
                    obj.addEventListener( type, fn, false );
                }
                else if (obj.attachEvent){
                    obj["e"+type+fn] = fn;
                    obj[type+fn] = function() { obj["e"+type+fn]( window.event ); };
                    obj.attachEvent( "on"+type, obj[type+fn] );
                }

            }

        },

    };

    if (document.addEventListener) {

       document.addEventListener("DOMContentLoaded", tuba.onready, false);

    }

    tuba.commons.addEvent(window, "load", function() {

      tuba.onload();

    });

    window.onbeforeunload = window.onunload = function(e) {

        if (tuba.master) {

            if (tuba.window != 2) {
                tuba.window = 0;
            }

            tuba.bridge.toSlave('window', tuba.window);

            if (tuba.player.parameters['gemiusPBI']) {
                tuba.gemiusPBI.close();
            }

            if (tuba.player.parameters['gemius']) {
                tuba.gemius.close();
            }

        }

    };

    try {

        HTMLElement.prototype.__defineSetter__("outerHTML", function(html) {
         var range = document.createRange();
         this.innerHTML = html;
         range.selectNodeContents(this);
         var frag = range.extractContents();
         this.parentNode.insertBefore(frag, this);
         this.parentNode.removeChild(this);
         });

    } catch(e) {

    }


    if (typeof console === "undefined" || typeof console.log === "undefined") {
        console = {};
        console.log = function() {};
    } else {

        if (!tuba.debug()) {

            console = {};
            console.log = function() {};

        }

    }

} catch (e) {

    if (typeof console !== 'undefined' || typeof console.log !== 'undefined') console.log({
        'name'      : e.name,
        'line'      : (e.lineNumber||e.line),
        'script'    : (e.fileName||e.sourceURL||e.script),
        'stack'     : (e.stackTrace||e.stack),
        'message'   : e.message
    });

}


/*!
 * NWMatcher 1.2.5 - Fast CSS3 Selector Engine
 * Copyright (C) 2007-2012 Diego Perini
 * See http://nwbox.com/license
 * http://s3.amazonaws.com/nwapi/nwmatcher/nwmatcher-1.2.5-min.js
 */

(function(t){var ct='nwmatcher-1.2.5',l=typeof exports=='object'?exports:((t.NW||(t.NW={}))&&(t.NW.Dom||(t.NW.Dom={}))),i=t.document,m=i.documentElement,K=[].slice,bJ={}.toString,bk,W,G,X,p,bl,bm,bn,bo,L='[#.:]?',bp='([~*^$|!]?={1})',x='[\\x20\\t\\n\\r\\f]*',bq='[\\x20]|[>+~][^>+~]',br='[-+]?\\d*n?[-+]?\\d*',Y='"[^"]*"'+"|'[^']*'",bK='\\([^()]+\\)|\\(.*\\)',bL='\\{[^{}]+\\}|\\{.*\\}',bM='\\[[^[\\]]*\\]|\\[.*\\]',Z='\\[.*\\]|\\(.*\\)|\\{.*\\}',q='(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)',B='(?:-?[_a-zA-Z]{1}[-\\w]*|[^\\x00-\\xa0]+|\\\\.+)+',bs='('+Y+'|'+B+')',C=x+'('+q+'+:?'+q+'+)'+x+'(?:'+bp+x+bs+')?'+x,bN=C.replace(bs,'([\\x22\\x27]*)((?:\\\\?.)*?)\\3'),M='((?:'+br+'|'+Y+'|'+L+'|'+q+'+|\\['+C+'\\]|\\(.+\\)|'+x+'|,)+)',bO='.+',ba='(?=[\\x20\\t\\n\\r\\f]*[^>+~(){}<>])(\\*|(?:'+L+B+')|'+bq+'|\\['+C+'\\]|\\('+M+'\\)|\\{'+bO+'\\}|,)+',bP=ba.replace(M,'.*'),N=new RegExp(ba,'g'),O=new RegExp('^'+x+'|'+x+'$','g'),bQ=new RegExp('^((?!:not)('+L+'|'+B+'|\\([^()]*\\))+|\\['+C+'\\])$'),bb=new RegExp('([^,\\\\\\[\\]]+|'+bM+'|'+bK+'|'+bL+'|\\\\.)+','g'),bR=new RegExp('(\\['+C+'\\]|\\('+M+'\\)|[^\\x20>+~]|\\\\.)+','g'),bt=/[\x20\t\n\r\f]+/g,bu=new RegExp(B+'|^$'),z=(function(){var g=(i.appendChild+'').replace(/appendChild/g,'');return function(a,b){var d=a&&a[b]||false;return d&&typeof d!='string'&&g==(d+'').replace(new RegExp(b,'g'),'')}})(),bS=z(i,'hasFocus'),P=z(i,'querySelector'),bT=z(i,'getElementById'),bU=z(m,'getElementsByTagName'),Q=z(m,'getElementsByClassName'),bV=z(m,'getAttribute'),bW=z(m,'hasAttribute'),bv=(function(){var a=false,b=m.id;m.id='length';try{a=!!K.call(i.childNodes,0)[0]}catch(e){}m.id=b;return a})(),bw='nextElementSibling'in m&&'previousElementSibling'in m,bX=bT?(function(){var a=true,b='x'+String(+new Date),d=i.createElementNS?'a':'<a name="'+b+'">';(d=i.createElement(d)).name=b;m.insertBefore(d,m.firstChild);a=!!i.getElementById(b);m.removeChild(d);return a})():true,bx=bU?(function(){var a=i.createElement('div');a.appendChild(i.createComment(''));return!!a.getElementsByTagName('*')[0]})():true,by=Q?(function(){var a,b=i.createElement('div'),d='\u53f0\u5317';b.appendChild(i.createElement('span')).setAttribute('class',d+'abc '+d);b.appendChild(i.createElement('span')).setAttribute('class','x');a=!b.getElementsByClassName(d)[0];b.lastChild.className=d;return a||b.getElementsByClassName(d).length!=2})():true,bY=bV?(function(){var a=i.createElement('input');a.setAttribute('value',5);return a.defaultValue!=5})():true,bz=bW?(function(){var a=i.createElement('option');a.setAttribute('selected','selected');return!a.hasAttribute('selected')})():true,bZ=(function(){var a=i.createElement('select');a.appendChild(i.createElement('option'));return!a.firstChild.selected})(),bA,bB,y,n,bC=/opera/i.test(bJ.call(t.opera)),ca=bC&&parseFloat(opera.version())>=11,cb=P?(function(){var h=[],f=i.createElement('div'),c,k=function(a,b,d,g){var j=false;b.appendChild(d);try{j=b.querySelectorAll(a).length==g}catch(e){}while(b.firstChild){b.removeChild(b.firstChild)}return j};c=i.createElement('p');c.setAttribute('class','');k('[class^=""]',f,c,1)&&h.push('[*^$]=[\\x20\\t\\n\\r\\f]*(?:""|'+"'')");c=i.createElement('option');c.setAttribute('selected','selected');k(':checked',f,c,0)&&h.push(':checked');c=i.createElement('input');c.setAttribute('type','hidden');k(':enabled',f,c,1)&&h.push(':enabled',':disabled');c=i.createElement('link');c.setAttribute('href','x');k(':link',f,c,1)||h.push(':link');if(bz){h.push('\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)')}return h.length?new RegExp(h.join('|')):{'test':function(){return false}}})():true,cc=new RegExp('(?:\\[[\\x20\\t\\n\\r\\f]*class\\b|\\.'+B+')'),cd=new RegExp(!(bx&&by)?!bC?'^(?:\\*|[.#]?-?[_a-zA-Z]{1}'+q+'*)$':'^(?:\\*|#-?[_a-zA-Z]{1}'+q+'*)$':'^#?-?[_a-zA-Z]{1}'+q+'*$'),ce={'a':1,'A':1,'area':1,'AREA':1,'link':1,'LINK':1},cf={'checked':1,'disabled':1,'ismap':1,'multiple':1,'readonly':1,'selected':1},R={value:'defaultValue',checked:'defaultChecked',selected:'defaultSelected'},cg={'action':2,'cite':2,'codebase':2,'data':2,'href':2,'longdesc':2,'lowsrc':2,'src':2,'usemap':2},bD={'class':0,'accept':1,'accept-charset':1,'align':1,'alink':1,'axis':1,'bgcolor':1,'charset':1,'checked':1,'clear':1,'codetype':1,'color':1,'compact':1,'declare':1,'defer':1,'dir':1,'direction':1,'disabled':1,'enctype':1,'face':1,'frame':1,'hreflang':1,'http-equiv':1,'lang':1,'language':1,'link':1,'media':1,'method':1,'multiple':1,'nohref':1,'noresize':1,'noshade':1,'nowrap':1,'readonly':1,'rel':1,'rev':1,'rules':1,'scope':1,'scrolling':1,'selected':1,'shape':1,'target':1,'text':1,'type':1,'valign':1,'valuetype':1,'vlink':1},ch={'accept':1,'accept-charset':1,'alink':1,'axis':1,'bgcolor':1,'charset':1,'codetype':1,'color':1,'enctype':1,'face':1,'hreflang':1,'http-equiv':1,'lang':1,'language':1,'link':1,'media':1,'rel':1,'rev':1,'target':1,'text':1,'type':1,'vlink':1},D={},H={'=':"n=='%m'",'^=':"n.indexOf('%m')==0",'*=':"n.indexOf('%m')>-1",'|=':"(n+'-').indexOf('%m-')==0",'~=':"(' '+n+' ').indexOf(' %m ')>-1",'$=':"n.substr(n.length-'%m'.length)=='%m'"},E={ID:new RegExp('^\\*?#('+q+'+)|'+Z),TAG:new RegExp('^('+q+'+)|'+Z),CLASS:new RegExp('^\\*?\\.('+q+'+$)|'+Z)},u={spseudos:/^\:((root|empty|nth-)?(?:(first|last|only)-)?(child)?-?(of-type)?)(?:\(([^\x29]*)\))?(.*)/,dpseudos:/^\:(link|visited|target|lang|not|active|focus|hover|checked|disabled|enabled|selected)(?:\((["']*)(.*?(\(.*\))?[^'"()]*?)\2\))?(.*)/,attribute:new RegExp('^\\['+bN+'\\](.*)'),children:/^[\x20\t\n\r\f]*\>[\x20\t\n\r\f]*(.*)/,adjacent:/^[\x20\t\n\r\f]*\+[\x20\t\n\r\f]*(.*)/,relative:/^[\x20\t\n\r\f]*\~[\x20\t\n\r\f]*(.*)/,ancestor:/^[\x20\t\n\r\f]+(.*)/,universal:/^\*(.*)/,id:new RegExp('^#('+q+'+)(.*)'),tagName:new RegExp('^('+q+'+)(.*)'),className:new RegExp('^\\.('+q+'+)(.*)')},bE=function(a,b){var d=-1,g;if(!a.length&&Array.slice)return Array.slice(b);while((g=b[++d]))a[a.length]=g;return a},bF=function(a,b,d){var g=-1,j;while((j=b[++g])){if(false===d(a[a.length]=j)){break}}return a},F=function(b,d){var g,j=i;X=b;i=b.ownerDocument||b;if(d||j!==i){m=i.documentElement;n=i.createElement('DiV').nodeName=='DiV';y=!n&&typeof i.compatMode=='string'?i.compatMode.indexOf('CSS')<0:(function(){var a=i.createElement('div').style;return a&&(a.width=1)&&a.width=='1px'})();g=i.createElement('div');g.appendChild(i.createElement('p')).setAttribute('class','xXx');g.appendChild(i.createElement('p')).setAttribute('class','xxx');bA=!n&&Q&&y&&(g.getElementsByClassName('xxx').length!=2||g.getElementsByClassName('xXx').length!=2);bB=!n&&P&&y&&(g.querySelectorAll('[class~=xxx]').length!=2||g.querySelectorAll('.xXx').length!=2);o.CACHING&&l.setCache(true,i)}},bc=function(a,b){var d=-1,g=null;while((g=b[++d])){if(g.getAttribute('id')==a){break}}return g},I=!bX?function(a,b){a=a.replace(/\\/g,'');return b.getElementById&&b.getElementById(a)||bc(a,b.getElementsByTagName('*'))}:function(a,b){var d=null;a=a.replace(/\\/g,'');if(n||b.nodeType!=9){return bc(a,b.getElementsByTagName('*'))}if((d=b.getElementById(a))&&d.name==a&&b.getElementsByName){return bc(a,b.getElementsByName(a))}return d},ci=function(a,b){F(b||(b=i));return I(a,b)},cj=function(a,b){var d=a=='*',g=b,j=[],h=g.firstChild;d||(a=a.toUpperCase());while((g=h)){if(g.tagName>'@'&&(d||g.tagName.toUpperCase()==a)){j[j.length]=g}if((h=g.firstChild||g.nextSibling))continue;while(!h&&(g=g.parentNode)&&g!==b){h=g.nextSibling}}return j},A=!bx&&bv?function(a,b){return n||b.nodeType==11?cj(a,b):K.call(b.getElementsByTagName(a),0)}:function(a,b){var d=-1,g=d,j=[],h,f=b.getElementsByTagName(a);if(a=='*'){while((h=f[++d])){if(h.nodeName>'@')j[++g]=h}}else{while((h=f[++d])){j[d]=h}}return j},ck=function(a,b){F(b||(b=i));return A(a,b)},bG=function(a,b){return S('[name="'+a.replace(/\\/g,'')+'"]',b)},cl=function(a,b){var d=-1,g=d,j=[],h,f=A('*',b),c;a=' '+(y?a.toLowerCase():a).replace(/\\/g,'')+' ';while((h=f[++d])){c=n?h.getAttribute('class'):h.className;if(c&&c.length&&(' '+(y?c.toLowerCase():c).replace(bt,' ')+' ').indexOf(a)>-1){j[++g]=h}}return j},J=function(a,b){return(by||bA||n||!b.getElementsByClassName)?cl(a,b):K.call(b.getElementsByClassName(a.replace(/\\/g,'')),0)},cm=function(a,b){F(b||(b=i));return J(a,b)},bd='compareDocumentPosition'in m?function(a,b){return(a.compareDocumentPosition(b)&16)==16}:'contains'in m?function(a,b){return a!==b&&a.contains(b)}:function(a,b){while((b=b.parentNode)){if(b===a)return true}return false},bH=!bY?function(a,b){return a.getAttribute(b)||''}:function(a,b){b=b.toLowerCase();if(R[b]){return a[R[b]]||''}return(cg[b]?a.getAttribute(b,2)||'':cf[b]?a.getAttribute(b)?b:'':((a=a.getAttributeNode(b))&&a.value)||'')},be=!bz?function(a,b){return n?!!a.getAttribute(b):a.hasAttribute(b)}:function(a,b){b=b.toLowerCase();if(R[b]){return!!a[R[b]]}a=a.getAttributeNode(b);return!!(a&&(a.specified||a.nodeValue))},cn=function(a){a=a.firstChild;while(a){if(a.nodeType==3||a.nodeName>'@')return false;a=a.nextSibling}return true},co=function(a){return be(a,'href')&&ce[a.nodeName]},cp=function(a,b){var d=1,g=b?'nextSibling':'previousSibling';while((a=a[g])){if(a.nodeName>'@')++d}return d},cq=function(a,b){var d=1,g=b?'nextSibling':'previousSibling',j=a.nodeName;while((a=a[g])){if(a.nodeName==j)++d}return d},cr=function(a){for(var b in a){o[b]=!!a[b];if(b=='SIMPLENOT'){bf={};T={};bg={};U={};o['USE_QSAPI']=false;N=new RegExp(bP,'g')}else if(b=='USE_QSAPI'){o[b]=!!a[b]&&P;N=new RegExp(ba,'g')}}},r=function(a){a='SYNTAX_ERR: '+a+' ';if(o.VERBOSITY){if(typeof t.DOMException!='undefined'){throw{code:12,message:a}}else{throw new Error(12,a);}}else{if(t.console&&t.console.log){t.console.log(a)}else{t.status+=a}}},o={CACHING:false,SHORTCUTS:false,SIMPLENOT:true,USE_HTML5:false,USE_QSAPI:P,VERBOSITY:true},bh='r[r.length]=c[k];if(f&&false===f(c[k]))break;else continue main;',V=function(a,b,d){var g=typeof a=='string'?a.match(bb):a;typeof b=='string'||(b='');if(g.length==1){b+=bI(g[0],d?bh:'f&&f(k);return true;')}else{var j=-1,h={},f;while((f=g[++j])){f=f.replace(O,'');if(!h[f]&&(h[f]=true)){b+=bI(f,d?bh:'f&&f(k);return true;')}}}if(d){return new Function('c,s,r,d,h,g,f','var N,n,x=0,k=-1,e;main:while((e=c[++k])){'+b+'}return r;')}else{return new Function('e,s,r,d,h,g,f','var N,n,x=0,k=e;'+b+'return false;')}},bI=function(a,b){var d,g,j,h=0,f,c,k,v,s,w;while(a){h++;if((c=a.match(u.universal))){f=''}else if((c=a.match(u.id))){b='if('+(n?'s.getAttribute(e,"id")':'(e.submit?s.getAttribute(e,"id"):e.id)')+'=="'+c[1]+'"){'+b+'}'}else if((c=a.match(u.tagName))){b='if(e.nodeName'+(n?'=="'+c[1]+'"':'.toUpperCase()=="'+c[1].toUpperCase()+'"')+'){'+b+'}'}else if((c=a.match(u.className))){b='if((n='+(n?'s.getAttribute(e,"class")':'e.className')+')&&n.length&&(" "+'+(y?'n.toLowerCase()':'n')+'.replace('+bt+'," ")+" ").indexOf(" '+(y?c[1].toLowerCase():c[1])+' ")>-1){'+b+'}'}else if((c=a.match(u.attribute))){f=c[1].split(':');f=f.length==2?f[1]:f[0]+'';if(c[2]&&!H[c[2]]){r('Unsupported operator in attribute selectors "'+a+'"');return''}s=false;w='false';if(c[2]&&c[4]&&(w=H[c[2]])){bD['class']=y?1:0;c[4]=c[4].replace(/\\([0-9a-f]{2,2})/,'\\x$1');s=(n?ch:bD)[f.toLowerCase()];w=w.replace(/\%m/g,s?c[4].toLowerCase():c[4])}else if(c[2]=='!='||c[2]=='='){w='n'+c[2]+'="'+c[4]+'"'}f='n=s.'+(c[2]?'get':'has')+'Attribute(e,"'+c[1]+'")'+(s?'.toLowerCase();':';');b=f+'if('+(c[2]?w:'n')+'){'+b+'}'}else if((c=a.match(u.adjacent))){b=bw?'var N'+h+'=e;if(e&&(e=e.previousElementSibling)){'+b+'}e=N'+h+';':'var N'+h+'=e;while(e&&(e=e.previousSibling)){if(e.nodeName>"@"){'+b+'break;}}e=N'+h+';'}else if((c=a.match(u.relative))){b=bw?('var N'+h+'=e;e=e.parentNode.firstElementChild;while(e&&e!==N'+h+'){'+b+'e=e.nextElementSibling}e=N'+h+';'):('var N'+h+'=e;e=e.parentNode.firstChild;while(e&&e!==N'+h+'){if(e.nodeName>"@"){'+b+'}e=e.nextSibling}e=N'+h+';');}else if((c=a.match(u.children))){b='var N'+h+'=e;if(e&&e!==h&&e!==g&&(e=e.parentNode)){'+b+'}e=N'+h+';';}else if((c=a.match(u.ancestor))){b='var N'+h+'=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){'+b+'}e=N'+h+';';}else if((c=a.match(u.spseudos))&&c[1]){switch(c[2]){case'root':if(c[7]){b='if(e===h||s.contains(h,e)){'+b+'}';}else{b='if(e===h){'+b+'}';}break;case'empty':b='if(s.isEmpty(e)){'+b+'}';break;default:if(c[2]&&c[6]){if(c[6]=='n'){b='if(e!==h){'+b+'}';break;}else if(c[6]=='even'){d=2;g=0;}else if(c[6]=='odd'){d=2;g=1;}else{g=((j=c[6].match(/(-?\d+)$/))?parseInt(j[1],10):0);d=((j=c[6].match(/(-?\d*)n/))?parseInt(j[1],10):0);if(j&&j[1]=='-')d=-1;}s=g<1&&d>1?'(n-('+g+'))%'+d+'==0':d>+1?(c[3]=='last')?'(n-('+g+'))%'+d+'==0':'n>='+g+'&&(n-('+g+'))%'+d+'==0':d<-1?(c[3]=='last')?'(n-('+g+'))%'+d+'==0':'n<='+g+'&&(n-('+g+'))%'+d+'==0':d===0?'n=='+g:(c[3]=='last')?d==-1?'n>='+g:'n<='+g:d==-1?'n<='+g:'n>='+g;b='if(e!==h){n=s['+(c[5]?'"nthOfType"':'"nthElement"')+'](e,'+(c[3]=='last'?'true':'false')+');if('+s+'){'+b+'}}';}else{d=c[3]=='first'?'previous':'next';j=c[3]=='only'?'previous':'next';g=c[3]=='first'||c[3]=='last';w=c[5]?'&&n.nodeName!=e.nodeName':'&&n.nodeName<"@"';b='if(e!==h){'+('n=e;while((n=n.'+d+'Sibling)'+w+');if(!n){'+(g?b:'n=e;while((n=n.'+j+'Sibling)'+w+');if(!n){'+b+'}')+'}')+'}';}break;}}else if((c=a.match(u.dpseudos))&&c[1]){switch(c[1]){case'not':f=c[3].replace(O,'');if(o.SIMPLENOT&&!bQ.test(f)){r('Negation pseudo-class only accepts simple selectors "'+a+'"');return'';}else{if('compatMode'in i){b='if(!'+V([f],'',false)+'(e,s,r,d,h,g)){'+b+'}';}else{b='if(!s.match(e, "'+f.replace(/\x22/g,'\\"')+'",g)){'+b+'}';}}break;case'checked':s='if((typeof e.form!="undefined"&&(/^(?:radio|checkbox)$/i).test(e.type)&&e.checked)';b=(o.USE_HTML5?s+'||(/^option$/i.test(e.nodeName)&&e.selected)':s)+'){'+b+'}';break;case'disabled':b='if(((typeof e.form!="undefined"&&!(/^hidden$/i).test(e.type))||s.isLink(e))&&e.disabled){'+b+'}';break;case'enabled':b='if(((typeof e.form!="undefined"&&!(/^hidden$/i).test(e.type))||s.isLink(e))&&!e.disabled){'+b+'}';break;case'lang':s='';if(c[3])s=c[3].substr(0,2)+'-';b='do{(n=e.lang||"").toLowerCase();if((n==""&&h.lang=="'+c[3].toLowerCase()+'")||(n&&(n=="'+c[3].toLowerCase()+'"||n.substr(0,3)=="'+s.toLowerCase()+'"))){'+b+'break;}}while((e=e.parentNode)&&e!==g);';break;case'target':j=i.location?i.location.hash:'';if(j){b='if(e.id=="'+j.slice(1)+'"){'+b+'}';}break;case'link':b='if(s.isLink(e)&&!e.visited){'+b+'}';break;case'visited':b='if(s.isLink(e)&&e.visited){'+b+'}';break;case'active':if(n)break;b='if(e===d.activeElement){'+b+'}';break;case'hover':if(n)break;b='if(e===d.hoverElement){'+b+'}';break;case'focus':if(n)break;b=bS?'if(e===d.activeElement&&d.hasFocus()&&(e.type||e.href)){'+b+'}':'if(e===d.activeElement&&(e.type||e.href)){'+b+'}';break;case'selected':f=bZ?'||(n=e.parentNode)&&n.options[n.selectedIndex]===e':'';b='if(/^option$/i.test(e.nodeName)&&(e.selected'+f+')){'+b+'}';break;default:break;}}else{f=false;v=true;for(f in D){if((c=a.match(D[f].Expression))&&c[1]){k=D[f].Callback(c,b);b=k.source;v=k.status;if(v)break;}}if(!v){r('Unknown pseudo-class selector "'+a+'"');return'';}if(!f){r('Unknown token in selector "'+a+'"');return'';}}if(!c){r('Invalid syntax in selector "'+a+'"');return'';}a=c&&c[c.length-1];}return b;},bi=function(a,b,d,g){var j;if(!(a&&a.nodeName>'@')){r('Invalid element argument');return false;}else if(!b||typeof b!='string'){r('Invalid selector argument');return false;}else if(d&&d.nodeType==1&&!bd(d,a)){return false;}else if(X!==d){F(d||(d=a.ownerDocument));}b=b.replace(O,'');o.SHORTCUTS&&(b=NW.Dom.shortcuts(b,a,d));if(bl!=b){if((j=b.match(N))&&j[0]==b){bk=(j=b.match(bb)).length<2;bl=b;bn=j;}else{r('The string "'+b+'", is not a valid CSS selector');return false;}}else j=bn;if(!T[b]||bf[b]!==d){T[b]=V(bk?[b]:j,'',false);bf[b]=d;}return T[b](a,bj,[],i,m,d,g);},cs=function(a,b){return S(a,b,function(){return false;})[0]||null;},S=function(a,b,d){var g,j,h,f,c,k,v=a;if(arguments.length===0){r('Missing required selector parameters');return[];}else if(a===''){r('Empty selector string');return[];}else if(typeof a!='string'){return[];}else if(b&&!(/1|9|11/).test(b.nodeType)){r('Invalid context element');return[];}else if(X!==b){F(b||(b=i));}if(o.CACHING&&(f=l.loadResults(v,b,i,m))){return d?bF([],f,d):f;}if(!ca&&cd.test(a)){switch(a.charAt(0)){case'#':if((h=I(a.slice(1),b))){f=[h];}else f=[];break;case'.':f=J(a.slice(1),b);break;default:f=A(a,b);break;}}else if(!n&&o.USE_QSAPI&&!(bB&&cc.test(a))&&!cb.test(a)){try{f=b.querySelectorAll(a);}catch(e){}}if(f){f=d?bF([],f,d):bv?K.call(f):bE([],f);o.CACHING&&l.saveResults(v,b,i,f);return f;}a=a.replace(O,'');o.SHORTCUTS&&(a=NW.Dom.shortcuts(a,b));if((j=bm!=a)){if((c=a.match(N))&&c[0]==a){W=(c=a.match(bb)).length<2;bm=a;bo=c;}else{r('The string "'+a+'", is not a valid CSS selector');return[];}}else c=bo;if(b.nodeType==11){f=b.childNodes;}else if(!n&&W){if(j){c=a.match(bR);k=c[c.length-1];G=k.split(':not')[0];p=a.length-k.length;}if((c=G.match(E.ID))&&(k=c[1])){if((h=I(k,b))){if(bi(h,a)){d&&d(h);f=[h];}else f=[];}}else if((c=a.match(E.ID))&&(k=c[1])){if((h=I(k,i))){if('#'+k==a){d&&d(h);f=[h];}if(/[>+~]/.test(a)){b=h.parentNode;}else{a=a.replace('#'+k,'*');p-=k.length+1;b=h;}}else f=[];}if(f){o.CACHING&&l.saveResults(v,b,i,f);return f;}if(!Q&&(c=G.match(E.TAG))&&(k=c[1])){if((f=A(k,b)).length===0){return[];}a=a.slice(0,p)+a.slice(p).replace(k,'*');}else if((c=G.match(E.CLASS))&&(k=c[1])){if((f=J(k,b)).length===0){return[];}if(bu.test(a.charAt(a.indexOf(k)-1))){a=a.slice(0,p)+a.slice(p).replace('.'+k,'');}else{a=a.slice(0,p)+a.slice(p).replace('.'+k,'*');}}else if((c=a.match(E.CLASS))&&(k=c[1])){if((f=J(k,b)).length===0){return[];}for(g=0,els=[];f.length>g;++g){els=bE(els,f[g].getElementsByTagName('*'));}f=els;if(bu.test(a.charAt(a.indexOf(k)-1))){a=a.slice(0,p)+a.slice(p).replace('.'+k,'');}else{a=a.slice(0,p)+a.slice(p).replace('.'+k,'*');}}else if(Q&&(c=G.match(E.TAG))&&(k=c[1])){if((f=A(k,b)).length===0){return[];}a=a.slice(0,p)+a.slice(p).replace(k,'*');}}if(!f){f=/^(?:applet|object)$/i.test(b.nodeName)?b.childNodes:A('*',b);}if(!U[a]||bg[a]!==b){U[a]=V(W?[a]:c,'',true);bg[a]=b}f=U[a](f,bj,[],i,m,b,d);o.CACHING&&l.saveResults(v,b,i,f);return f},bf={},T={},bg={},U={},bj={nthElement:cp,nthOfType:cq,getAttribute:bH,hasAttribute:be,byClass:J,byName:bG,byTag:A,byId:I,contains:bd,isEmpty:cn,isLink:co,select:S,match:bi};Tokens={prefixes:L,encoding:q,operators:bp,whitespace:x,identifier:B,attributes:C,combinators:bq,pseudoclass:M,pseudoparms:br,quotedvalue:Y};l.ACCEPT_NODE=bh;l.emit=r;l.byId=ci;l.byTag=ck;l.byName=bG;l.byClass=cm;l.getAttribute=bH;l.hasAttribute=be;l.match=bi;l.first=cs;l.select=S;l.compile=V;l.contains=bd;l.configure=cr;l.setCache=function(){return};l.loadResults=function(){return};l.saveResults=function(){return};l.shortcuts=function(a){return a};l.Config=o;l.Snapshot=bj;l.Operators=H;l.Selectors=D;l.Tokens=Tokens;l.registerOperator=function(a,b){H[a]||(H[a]=b)};l.registerSelector=function(a,b,d){D[a]||(D[a]={Expression:b,Callback:d})};F(i,true)})(this);



TINY={};
TINY.box=function(){
    var j,m,b,g,v,p=0;
    return{
        show:function(o){
            document.body.className = document.body.className + ' mask';
            v={opacity:100,close:1,animate:0,fixed:1,method:'GET',mask:0,maskid:'',boxid:'',topsplit:2,url:0,post:0,height:0,width:0,html:0,iframe:0};
            for(s in o){v[s]=o[s]}
            if(!p){
                j=document.createElement('div'); j.className='tbox';
                p=document.createElement('div'); p.className='tinner';
                b=document.createElement('div'); b.className='tcontent'; b.id = 'tcontent';
                g=document.createElement('div'); g.className='tclose'; g.v=0;
                document.body.appendChild(j); j.appendChild(p); p.appendChild(b);
                g.onclick=TINY.box.hide; window.onresize=TINY.box.resize
            }else{
                j.style.display='none'; clearTimeout(p.ah); if(g.v){p.removeChild(g); g.v=0}
            }
            p.id=v.boxid; j.style.position=v.fixed?'fixed':'absolute';
            if(v.html&&!v.animate){
                p.style.backgroundImage='none'; b.innerHTML=v.html; b.style.display='';
                p.style.width=v.width?v.width+'px':'auto'; p.style.height=v.height?v.height+'px':'auto'
            }else{
                b.style.display='none';
                if(!v.animate&&v.width&&v.height){
                    p.style.width=v.width+'px'; p.style.height=v.height+'px'
                }else{
                    p.style.width=p.style.height='100px'
                }
            }

            this.alpha(j,1,100);
            if(v.autohide){p.ah=setTimeout(TINY.box.hide,1000*v.autohide)}else{document.onkeyup=TINY.box.esc}
        },
        fill:function(c,u,k,a,w,h){
            if(u){
                if(v.image){
                    var i=new Image(); i.onload=function(){w=w||i.width; h=h||i.height; TINY.box.psh(i,a,w,h)}; i.src=v.image
                }else if(v.iframe){
                    this.psh('<iframe src="'+v.iframe+'" width="'+v.width+'" frameborder="0" height="'+v.height+'"></iframe>',a,w,h)
                }else{
                    var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
                    x.onreadystatechange=function(){
                        if(x.readyState==4&&x.status==200){p.style.backgroundImage=''; TINY.box.psh(x.responseText,a,w,h)}
                    };
                    if(k){
                        x.open('POST',c,true); x.setRequestHeader('Content-type','application/x-www-form-urlencoded'); x.send(k)
                    }else{
                        x.open(v.method,c,true); x.send(null)
                    }
                }
            }else{
                this.psh(c,a,w,h)
            }
        },
        psh:function(c,a,w,h){
            if(typeof c=='object'){b.appendChild(c)}else{b.innerHTML=c}
            var x=p.style.width, y=p.style.height;
            if(!w||!h){
                p.style.width=w?w+'px':''; p.style.height=h?h+'px':''; b.style.display='';
                if(!h){h=parseInt(b.offsetHeight)}
                if(!w){w=parseInt(b.offsetWidth)}
                b.style.display='none'
            }
            p.style.width=x; p.style.height=y;
            this.size(w,h,a)
        },
        esc:function(e){e=e||window.event; if(e.keyCode==27){TINY.box.hide()}},
        hide:function(){ document.body.className = document.body.className.replace(new RegExp(' mask', 'g'), '');
            if (j) j.style.display='none';
            if (b) b.innerHTML = '';
            document.onkeypress=null; if (v) if(v.closejs){v.closejs()}},
        resize:function(){TINY.box.pos(); TINY.box.mask()},
        mask:function(){},
        pos:function(){
            var t;
            if(typeof v.top!='undefined'){t=v.top}else{t=(this.height()/v.topsplit)-(j.offsetHeight/2); t=t<20?20:t}
            if(!v.fixed&&!v.top){t+=this.top()}
            j.style.top=t+'px';
            j.style.left=typeof v.left!='undefined'?v.left+'px':(this.width()/2)-(j.offsetWidth/2)+'px'
        },
        alpha:function(e,d,a){
            e.style.display='block';
            TINY.box.fill(v.html||v.url,v.url||v.iframe||v.image,v.post,v.animate,v.width,v.height);
            TINY.box.pos();
        },
        ta:function(e,a,d){
            var o=Math.round(e.style.opacity*100);
            if(o==a){
                clearInterval(e.ai);
                if(d==-1){
                    e.style.display='none';
                    e==j?TINY.box.alpha(m,-1,0,2):b.innerHTML=p.style.backgroundImage=''
                }else{
                    if(e==m){
                        this.alpha(j,1,100)
                    }else{
                        j.style.filter='';
                        TINY.box.fill(v.html||v.url,v.url||v.iframe||v.image,v.post,v.animate,v.width,v.height)
                    }
                }
            }else{
                var n=a-Math.floor(Math.abs(a-o)*.5)*d;
                e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'
            }
        },
        size:function(w,h,a){
            if(a){
                clearInterval(p.si); var wd=parseInt(p.style.width)>w?-1:1, hd=parseInt(p.style.height)>h?-1:1;
                p.si=setInterval(function(){TINY.box.ts(w,wd,h,hd)},20)
            }else{
                p.style.backgroundImage='none'; if(v.close){p.appendChild(g); g.v=1}
                p.style.width=w+'px'; p.style.height=h+'px'; b.style.display=''; this.pos();
                if(v.openjs){v.openjs()}
            }
        },
        ts:function(w,wd,h,hd){
            var cw=parseInt(p.style.width), ch=parseInt(p.style.height);
            if(cw==w&&ch==h){
                clearInterval(p.si); p.style.backgroundImage='none'; b.style.display='block'; if(v.close){p.appendChild(g); g.v=1}
                if(v.openjs){v.openjs()}
            }else{
                if(cw!=w){p.style.width=(w-Math.floor(Math.abs(w-cw)*.6)*wd)+'px'}
                if(ch!=h){p.style.height=(h-Math.floor(Math.abs(h-ch)*.6)*hd)+'px'}
                this.pos()
            }
        },
        top:function(){return document.documentElement.scrollTop||document.body.scrollTop},
        width:function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},
        height:function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},
        total:function(d){
            var b=document.body, e=document.documentElement;
            return d?Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight)):
            Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))
        }
    }

}();
