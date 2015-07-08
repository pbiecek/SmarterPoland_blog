if (typeof console === "undefined") this.console = {
    log: function() {}
};

(function() {
    $(function() {
        window.wsjgapp = App.init();
        console.log('WSJ NEWS APP');
    });


    Member = {
        opts: null,

        init: function(opts) {
            this.opts = opts;
        },
        update: function() {

        },
        draw: function(ctx) {


        }
    };

    App = {
        myctx: null,

        lang: null,

        standalone: 1,

        strings: null,

        sprites: null,

        sep: "_",
        itemsep: "--",

        data: null,

        entityObjs: {},

        entities: [],

        considering: ["Population"],

        numOfConsider: 1,

        brwidth: null,
        brheight: null,
        dirty: false,

        breaks: {
            med: 641,
            large: 860
        },

        "lineup": [{
            "global_id": 1263191,
            "home_team": "Group A Winner",
            "visiting_team": "Group B Second Place",
            "address": ""
        }, {
            "global_id": 1263193,
            "home_team": "Group C Winner",
            "visiting_team": "Group D Second Place"
        }, {
            "global_id": 1263195,
            "home_team": "Group B Winner",
            "visiting_team": "Group A Second Place"
        }, {
            "global_id": 1263197,
            "home_team": "Group D Winner",
            "visiting_team": "Group C Second Place"
        }, {
            "global_id": 1263199,
            "home_team": "Group E Winner",
            "visiting_team": "Group F Second Place"
        }, {
            "global_id": 1263200,
            "home_team": "Group G Winner",
            "visiting_team": "Group H Second Place"
        }, {
            "global_id": 1263201,
            "home_team": "Group F Winner",
            "visiting_team": "Group E Second Place"
        }, {
            "global_id": 1263202,
            "home_team": "Group H Winner",
            "visiting_team": "Group G Second Place"
        }, {
            "global_id": 1263204,
            "home_team": "Quarterfinalist",
            "visiting_team": "Quarterfinalist"
        }, {
            "global_id": 1263203,
            "home_team": "Quarterfinalist",
            "visiting_team": "Quarterfinalist"
        }, {
            "global_id": 1263206,
            "home_team": "Quarterfinalist",
            "visiting_team": "Quarterfinalist"
        }, {
            "global_id": 1263205,
            "home_team": "Quarterfinalist",
            "visiting_team": "Quarterfinalist"
        }, {
            "global_id": 1263207,
            "home_team": "Semifinalist",
            "visiting_team": "Semifinalist"
        }, {
            "global_id": 1263208,
            "home_team": "Semifinalist",
            "visiting_team": "Semifinalist"
        }, {
            "global_id": 1263209,
            "home_team": "Semifinal Loser",
            "visiting_team": "Semifinal Loser"
        }, {
            "global_id": 1263210,
            "home_team": "Finalist",
            "visiting_team": "Finalist"
        }],

        init: function() {
            // this.ctx();

            this.bindEvents();

            $('#share').SocialClimber({
                share: ['facebook', 'twitter'],
                type: 'button',
                style: 'grey',
                url: function() {
                    return 'http://wsj.com/';
                },
                bitly: {
                    login: "wsjblogs",
                    apikey: "R_e1a3c752380d4fc09514e987c40b7b35",
                    domain: "on.wsj.com"
                },
                text: "",
                optional: {
                    'twitter': {
                        'hashtags': '',
                        'via': 'WSJGraphics'
                    }
                }
            }, {
                facebook: {
                    appId: (function() {
                        switch (window.location.hostname) {
                            case 'graphics.wsj.com':
                                return 433796883407517;
                                break;
                            case 'graphicsweb.wsj.com':
                                return 433796883407517;
                                break;
                            case 'graphicsdev.dowjones.net':
                                return 363579230418270;
                                break;
                            case 'projects.wsj.com':
                                return 243124055852668;
                                break;
                        }
                    })()
                }
            });

            this.tracking();

            var that = this;

            // if (window.innerWidth < that.breaks.med) {
            //     $('body').addClass('tiny');

            //     $('#subheader').bind('click', function(e) {
            //         $('body').addClass('choosesomething').removeClass('showgroups');
            //     });

            //     $('#bracketdisplaysvg').bind('click', function(e) {
            //         $('body').toggleClass('showgroups');
            //     })
            // }

            this.handleResize();

            return this;
        },

        tracking: function() {

        },

        bindEvents: function() {

            $.address.init(function(e) {

            }).bind('change', {
                that: this
            }, function(e) {
                var that = e.data.that;
                if (that.data === null) {
                    that.loadData();
                }
                if (that.lang !== e.parameters.lang) {
                    that.loadLanguage(e.parameters.lang)
                }
                var c = encodeURIComponent(that.considering[0]);
                if (c !== e.parameters.metrics && e.parameters.metrics !== undefined) {
                    that.considering[0] = decodeURIComponent(e.parameters.metrics);

                }

                if (that.considering[0] === undefined || that.considering.length == 0) {
                    that.considering[0] = "Population";
                }

                if (e.parameters.standalone !== undefined && that.standalone !== e.parameters.standalone) {
                    that.standalone = e.parameters.standalone;
                    if (that.standalone === '0') {
                        $('body').addClass('noheader');
                    }
                }

                if (that.strings != null) {
                    var stxt = that.strings.sharetext;
                    if (that.strings.metricinfo[that.considering[0]].sharetext !== undefined) {
                        stxt = that.strings.sharescript.split('%%%').join(that.strings.metricinfo[that.considering[0]].sharetext);
                    }
                    $("#share").SocialClimber('update', {
                        text: stxt,
                        url: 'http://graphics.wsj.com/documents/WORLDCUPTOEE/#/?lang=' + e.parameters.lang + '&metrics=' + e.parameters.metrics
                    });
                }

                that.layout();
                that.update();
                that.loadSprites();

                $('.choosesomething').removeClass('choosesomething');

            });

            var that = this;
            window.addEventListener('resize', function() {
                that.handleResize(that);
            });
        },

        handleResize: function(that) {
            if (that === undefined) {
                that = this;
            }
            if (window.innerWidth < that.breaks.med) {
                $('body').addClass('tiny').removeClass('medium');
                $('#subheader').bind('click', function(e) {
                    $('body').addClass('choosesomething').removeClass('showgroups');
                });

                $('#bracketdisplaysvg').bind('click', function(e) {
                    $('body').toggleClass('showgroups');
                })
            } else {
                $('body').removeClass('tiny').removeClass('choosesomething').removeClass('showgroups');
                $('#subheader').unbind('click');
                $('#bracketdisplaysvg').unbind('click');

            }

            if (window.innerWidth >= that.breaks.med && window.innerWidth < that.breaks.large) {
                $('body').addClass('medium');
            }
            if (that.strings !== null && that.data !== null && that.sprites !== null) {
                that.draw(that);
            }
        },

        update: function(that, ts) {
            if (that === undefined) {
                that = this;
            }

            if (that.strings === null || that.data === null || that.sprites === null) {
                setTimeout(function() {
                    that.update(that);
                }, 500);
                return false;
            }

            that.dirty = true;

            that.data.match = that.data.match.slice(0, 1);

            function doMatch(a, b) {
                //TODO better definition of equivalent case
                return (getScore(a) <= getScore(b)) ? a : b;
            }

            function getScore(a) {
                //Dereference the object from code
                var aob = that.data.data[a];
                var pars = that.data.parsed;

                //Get indices of each metric
                var i = [];
                var score = 0;

                $.each(that.considering, function(j, k) {
                    // i.push(that.strings.metriclabels.indexOf(k.split("_").join(" ")));
                    score += pars[k][a]; //aob[k];
                });

                return score;
            }

            //Run step 1. These are addresses that will be replaced with winners from the first group
            that.data.match.push([
                ['00', '11'],
                ['02', '13'],
                ['04', '15'],
                ['06', '17'],
                ['01', '10'],
                ['03', '12'],
                ['05', '14'],
                ['07', '16']
            ]);

            $.each(that.data.match[0], function(g, h) {
                var ranks = [
                    [h[0], getScore(h[0])],
                    [h[1], getScore(h[1])],
                    [h[2], getScore(h[2])],
                    [h[3], getScore(h[3])]
                ];
                ranks.sort(function(a, b) {
                    if (a[1] > b[1]) {
                        return 1;
                    }
                    if (a[1] < b[1]) {
                        return -1;
                    }
                    return 0;
                });
                $.each(that.data.match[1], function(j, k) {
                    $.each(k, function(o, p) {
                        if ((typeof p === 'string') && (parseInt(p.charAt(1)) == g)) {
                            k[o] = ranks[parseInt(p.charAt(0))][0];
                        }
                    })
                })

            });

            function play(round) {
                if (round.length == 1) {
                    that.data.match.push([doMatch(round[0][0], round[0][1])]);
                    return true;
                }

                that.data.match.push([]);
                for (var i = 0; i < round.length; i = i + 2) {
                    that.data.match[that.data.match.length - 1].push([doMatch(round[i][0], round[i][1]), doMatch(round[i + 1][0], round[i + 1][1])]);
                }
                play(that.data.match[that.data.match.length - 1]);
            }

            //todo make this work

            play(that.data.match[that.data.match.length - 1]);
            that.draw();

        },

        draw: function(that) {
            var that = that || this;
            var green = "#009d40",
                grey = "#999999";
            var colidy = 14,
                colidfsize = 11,
                colidcolor = grey,
                coliddraw = true;

            var tiny = $('body').hasClass('tiny');
            var medium = $('body').hasClass('medium');

            // if (medium) {
            //     colidy = colidfsize = 10;
            //     coliddraw = true;
            // }

            if (tiny || medium) {
                colidy = colidfsize = 0;
                coliddraw = false;
            }

            var sh = $("#bracketdisplay").outerHeight() - colidy;
            var sw = $("#bracketdisplay").outerWidth();

            if (that.brheight === sh && that.brwidth === sw && that.dirty === false) {
                return;
            }

            that.brheight = sh;
            that.brwidth = sw;

            var s = Snap("#bracketdisplaysvg");
            s.clear();
            s.rect(0, 0, "100%", "100%").attr({
                fill: "#ffffff"
            });


            $("#bracketdisplaysvg").attr("width", $("#bracketdisplay").outerWidth()).attr("height", $("#bracketdisplay").outerHeight());

            var bky = colidy + 5;
            var groupheight = sh / this.data.match[0].length;
            var fsize = tiny ? 10 : medium ? 11 : 12,
                labelcolor = grey;

            var flagAndLetterW = tiny ? 25 : medium ? 70 : 50;

            var colforcalc = tiny ? this.data.match.length + 2.6 : medium ? this.data.match.length + 0.4 : this.data.match.length;

            var colwidth = (sw - flagAndLetterW) / colforcalc;


            function drawGroup(g, l) {
                //Defined from center left
                var vmarg = 10;
                var glh = Math.floor((groupheight - vmarg) / g.length);
                var starty = l[1] - ((groupheight - vmarg) / 2);
                $.each(g, function(i, v) {
                    drawGroupMember({
                        name: v
                    }, [l[0], Math.floor(starty + (i * glh))], glh - 1);
                });
            }

            function drawGroupMember(m, l, h) {
                //Proxy for flag
                var fw = 35;
                var fh = Math.min((h || 10), 15);
                var gut = 8;

                var t = new Snap.Matrix().translate(l[0], Math.floor(l[1] + (fh / 4)));
                var f = that.sprites.select("#" + m.name).clone();


                s.append(f);

                var fbb = f.getBBox();
                t.scale(fh / (fbb.h - 1));
                f.transform(t);

                fbb = f.getBBox();

                var al = (colwidth > 50) ? that.strings.countries[m.name] : m.name;

                s.text(l[0] + fbb.width + gut, l[1] + ((fh - 1) / 2) + fsize - 3, al).attr({
                    "font-size": fsize + "px",
                    fill: labelcolor
                });
            }

            function drawMatch(m, l, h, b) {
                var endy1 = (b && tiny) ? Math.floor(l[1] + (h / 4)) : Math.floor(l[1] + (2 * h / 4));
                var endy2 = (b && tiny) ? Math.floor(l[1] + (3 * h / 4)) : Math.floor(l[1] + (2 * h / 4));
                s.polyline([l[0], Math.floor(l[1] + (h / 4)), l[0] + colwidth, Math.floor(l[1] + (h / 4)), l[0] + colwidth, endy1]).attr({
                    stroke: grey,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    strokeWidth: 1,
                    fill: "none",
                    class: m[0]
                });
                s.polyline([l[0], Math.floor(l[1] + (3 * h / 4)), l[0] + colwidth, Math.floor(l[1] + (3 * h / 4)), l[0] + colwidth, endy2]).attr({
                    stroke: grey,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    strokeWidth: 1,
                    fill: "none",
                    class: m[1]
                });
                var al = (colwidth > 50 & !tiny & !medium) ? that.strings.countries[m[0]] : m[0];
                var bl = (colwidth > 50 & !tiny & !medium) ? that.strings.countries[m[1]] : m[1];

                var bd = b ? "bold" : "normal";
                var fs = b ? fsize + 3 : fsize;

                var tl1 = s.text(l[0] + colwidth - 5, Math.floor(l[1] + (h / 4) - fsize + 6), al).attr({
                    "font-size": fs + "px",
                    fill: labelcolor,
                    "text-anchor": "end",
                    "font-weight": bd,
                    class: m[0] + "label"
                });

                var tlbb = tl1.getBBox();
                var t = null;

                if (tlbb.width > colwidth - 10) {
                    t = new Snap.Matrix().scale((colwidth - 10) / tlbb.width, (colwidth - 10) / tlbb.width, l[0] + colwidth - 5, Math.floor(l[1] + (h / 4) - fsize + 6));

                    tl1.transform(t);
                }

                var tl2 = s.text(l[0] + colwidth - 5, Math.floor(l[1] + (3 * h / 4) - fsize + 6), bl).attr({
                    "font-size": fs + "px",
                    fill: labelcolor,
                    "text-anchor": "end",
                    "font-weight": bd,
                    class: m[1] + "label"
                });

                tlbb = tl2.getBBox();

                if (tlbb.width > colwidth - 10) {
                    t = new Snap.Matrix().scale((colwidth - 10) / tlbb.width, (colwidth - 10) / tlbb.width, l[0] + colwidth - 5, Math.floor(l[1] + (3 * h / 4) - fsize + 6));

                    tl2.transform(t);
                }


            }

            function commaSeparateNumber(val) {
                while (/(\d+)(\d{3})/.test(val.toString())) {
                    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                }
                return val;
            }

            function drawWinner(m, l, h) {
                var mstring = that.strings.metricinfo[that.considering[0]];

                $("#winname").html(mstring.win);
                var winnum = isNaN(mstring.num) ? mstring.num : commaSeparateNumber(mstring.num);
                $("#winnum").html(winnum);
                $("#numnote").html(mstring.numnote);
                $("#wintext").html(mstring.displayname);
                $("#notedisplay").html(mstring.note);
                $("#srcdisplay").html('Source: ' + mstring.source);

                var swin = Snap("#winflagsvg");
                swin.clear();


                var f = that.sprites.select("#" + m).clone().attr({
                    id: m + "C"
                });
                swin.append(f);
                var fg = swin.select("#" + m + "C");
                // var t = new Snap.Matrix().scale(2.5).translate(-5, 0);
                var fbb = fg.getBBox();
                var fboxw = $("#winflagsvg").innerWidth();
                var t = new Snap.Matrix().scale(2.5).translate(-5, 0);
                fg.transform(t);

                $("#winnerdisplay").css("margin-top", colidfsize + fsize + "px");

                s.selectAll("." + m).attr({
                    "stroke": green,
                    "strokeWidth": 3
                });

                s.selectAll("." + m + "label").attr({
                    "font-weight": "bold"
                });


            }

            function drawMatches(m, l, h, i, b) {
                if (typeof m === 'string') {

                    drawWinner(m, l, h);
                    return;
                }

                if (m.length == 2 && typeof m[0] === 'string') {
                    drawMatch(m, l, h, b);
                    return;
                }
                var centergutter = Math.floor(sh / 8);
                var h = h || (sh - centergutter);
                var i = i || 0;
                var mh = (i === 0) ? h : h / m.length;

                $.each(m, function(k, ll) { //TODO
                    var gutadd = (k >= Math.floor(m.length / 2)) ? centergutter : 0;
                    var lya = (k === (m.length - 2) && i === 0) ? -(gutadd * 1.5) : 0;
                    var hga = (k === (m.length - 2) && i === 0) ? mh + (centergutter * 2) : mh;
                    var x = (i === 0) ? (k * colwidth) + l[0] : l[0];
                    var y = (i === 0) ? l[1] + lya : (mh * k) + l[1] + gutadd;
                    b = (b || (k === (m.length - 2) && i === 0)) ? true : false;
                    drawMatches(ll, [x, y], hga, (i + 1), b);
                });

            }

            var starty = (groupheight / 2) + bky;

            if (coliddraw) {
                //Draw col names
                $.each(that.strings.cols, function(ci, c) {
                    s.text(ci * colwidth + flagAndLetterW + (colwidth / 2), colidy, c).attr({
                        "font-size": colidfsize + "px",
                        "fill": colidcolor,
                        "text-anchor": "middle"
                    });

                });
            }

            //Draw Groups
            $.each(that.data.match[0], function(j, k) {
                s.text(2, starty + (groupheight * j) + (fsize / 2), String.fromCharCode(65 + j)).attr({
                    "font-size": fsize + "px",
                    "fill": green,
                    "font-weight": "bold"
                });
                drawGroup(k, [fsize + 4, starty + (groupheight * j)]);
            });

            //Draw Matches
            drawMatches(that.data.match.slice(1), [colwidth + flagAndLetterW, bky]);
            that.dirty = false;
            if ($('body').hasClass('tiny')) {

            }

        },

        layout: function(that) {
            if (that === undefined) {
                that = this;
            }

            var metriclayout = "";
            // var that = this;
            var addlmetrics = '';

            if (that.strings === null || that.data === null) {
                setTimeout(function() {
                    that.layout(that)
                }, 500);
                return false;
            }

            // if (that.considering.length) {
            //  var n = Math.min((this.numOfConsider - 1), that.considering.length);
            //  var am = that.considering.slice(-1 * n);
            //  addlmetrics = am.join("|").split(" ").join(that.sep) + "|";
            // }

            var c = that.itemsep + that.considering[0].split(" ").join(that.sep) + that.itemsep;

            $.each(that.strings.metricinfo, function(v, m) {
                var ch = (c.indexOf(that.itemsep + v.split(" ").join(that.sep) + that.itemsep) >= 0) ? " class='selected' " : "";
                var sa = (that.standalone !== 1) ? "&standalone=" + that.standalone : '';
                var hr = "lang=" + that.lang + "&metrics=" + encodeURIComponent(v) + sa;

                metriclayout += "<a href='#/?" + hr + "' rel='address:' " + ch + " >" + m.displayname + "</a>";
            });

            $("#metriclist").html(metriclayout);
        },

        loadData: function(cb) {
            $.ajax({
                url: 'js/data.json',
                context: this,
                success: function(data) {
                    this.data = data;
                },
                error: function(e, b) {
                    console.log(b);
                }
            })
        },

        loadLanguage: function(l) {
            this.lang = ('en|es|de|zh|ja|ko|id'.indexOf(l) >= 0) ? l : 'en';
            $.ajax({
                url: 'js/strings/' + this.lang + '.json',
                context: this,
                success: function(data) {
                    this.strings = data;
                    // $('#headdisp').html(this.strings.head);
                    $.each(this.strings.stringbyids, function(k, s) {
                        $("#retrofit_wrapper #" + k).html(s);
                    });

                    $("#share").SocialClimber('update', {
                        text: this.strings.sharetext
                    });
                    this.fillDummy();
                    // this.layout();
                },
                error: function(e, b) {
                    console.log(b);
                }
            });

        },

        loadSprites: function() {
            var that = this;
            if (this.sprites != null) return;
            Snap.load("images/worldcupelements.svg", function(f) {
                that.sprites = f;
            })
        },



        initEntities: function() {
            var that = this;
            $.each(this.data.data, function(k, v) {
                var ent = new Member();
                ent.init({
                    "name": that.strings.countries[k],
                    "ranks": v,
                    "code": k
                });
                that.entityObjs[k] = ent;
                that.entities.push(ent);
            })
        },

        fillDummy: function() {
            // console.log("No, no. Not for you.");
            // var that = this;
            // $.each(this.data.data, function(i, v) {
            //     $.each(that.data.parsed, function(j, k) {
            //         v[j] = k[i];
            //     });
            // });
            // console.log(JSON.stringify(this.data));
        }




    }
})();