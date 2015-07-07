var time_counter = {
    dataCtr: null,
    subs_text: {
        days: ['dzie\u0144;', 'dni', 'dni'],
        hours: ['godzina', 'godziny', 'godzin'],
        minutes: ['minuta', 'minuty', 'minut'],
        seconds: ['sekunda', 'sekundy', 'sekund']
    },
    data: null,
    now: null,
    init: function() {
        var me = time_counter;
        me.dataCtr = $('.mod_zr_lokale10 span');
        if (me.dataCtr.length < 1)
            return;
        var f_data = me.dataCtr.text();
        var dt = f_data.split(/ /);
        var dd = dt[0].split(/-/);
        var dh = dt[1].split(/:/);
        var date = new Date();
        date.setFullYear(dd[0]);
        date.setMonth(dd[1] - 1, dd[2]);
        date.setHours(dh[0]);
        date.setMinutes(dh[1]);
        date.setSeconds(0);
        me.data = date;
        me.tick();
    },
    tick: function() {
        var me = time_counter;
        me.now = new Date();
        var diff = me.data - me.now;
        diff = Math.floor(diff / 1000);
        var s = diff % 60;
        diff = Math.floor(diff / 60);
        var m = diff % 60;
        diff = Math.floor(diff / 60);
        var h = diff % 24;
        diff = Math.floor(diff / 24);
        var d = diff;
        me.set(d, h, m, s);
        window.setTimeout(time_counter.tick, 1000);
        return true;
    },
    set: function(d, h, m, s) {
        var me = time_counter;
        if (h < 10)
            h = "0" + h;
        if (m < 10)
            m = "0" + m;
        if (s < 10)
            s = "0" + s;
        me.dataCtr.text("" + d + " " + me.get_text('days', d) + " " + h + ":" + m + ":" + s);
        me.dataCtr.css({
            visibility: "visible"
        });
    },
    get_text: function(type, value) {
        var i = (value == 1) ? 0: ((value < 10 || value > 20) && value % 10 > 1 && value % 10 < 5) ? 1: 2;
        return time_counter.subs_text[type][i];
    }
};
var time_ago = {
    init: function() {
        var dn = new Date();
        $('.mod_zi_lokale1 .entry:not(.banEntry) span.when').each(function() {
            var $t = $(this), d = $t.text(), dt = d.split(/ /), dd = dt[0].split(/-/), dh = dt[1].split(/:/), da = new Date();
            da.setFullYear(dd[2]);
            da.setMonth(dd[1] - 1, dd[0]);
            da.setHours(dh[0]);
            da.setMinutes(dh[1]);
            da.setSeconds(0);
            var dv = time_ago.date_diff(dn, da);
            if (dv[3] > 0) {
                if (dv[0] == 0 && dv[1] == 0) {
                    if (dv[2] == 0) {
                        $t.text('1 minuta temu').addClass('vis');
                    } else {
                        $t.text(dv[2] + ' ' + time_ago.get_text('minutes', dv[2]) + ' temu').addClass('vis');
                    }
                } else if (dv[0] == 0 && dv[1] > 0 && dv[1] < 5) {
                    $t.text(dv[1] + ' ' + time_ago.get_text('hours', dv[1]) + ' temu').addClass('vis');
                }
            }
        });
    },
    subs_text: {
        hours: ['godzina', 'godziny', 'godzin'],
        minutes: ['minuta', 'minuty', 'minut']
    },
    get_text: function(type, value) {
        var i = (value == 1) ? 0: ((value < 10 || value > 20) && value % 10 > 1 && value % 10 < 5) ? 1: 2;
        return time_ago.subs_text[type][i];
    },
    date_diff: function(d, o, t, x) {
        return [ x = ~~( t = (d - o) / 864e5), x = ~~( t = (t - x) * 24), x = ~~( t = (t - x) * 60), ~~((t - x) * 60)];
    }
}

Array.prototype.sortColumn = function(col, order) {
    this.sort(function(a, b) {
        if ( typeof order == 'undefined' || order == 'asc') {
            return a[col] < b[col] ? -1: a[col] == b[col] ? 0: 1;
        } else {
            return a[col] > b[col] ? -1: a[col] == b[col] ? 0: 1;
        }
    });
};

gazeta_pl.cjg = {};
gazeta_pl.cjg.finder = {
    selMovie: null,
    selCinema: null,
    selId: 0,
    init: function() {
        if ($('#i_movie').length == 0)
            return;
        this.selMovie = $('#i_movie');
        this.selCinema = $('#i_cinema');
        this.selMovie.change(function() {
            gazeta_pl.cjg.finder.getCinemaList();
        });
        this.selCinema.change(function() {
            gazeta_pl.cjg.finder.getMovieList();
        });
        this.selMovie.attr('selectedIndex', 0);
        this.selCinema.attr('selectedIndex', 0);
    },
    getCinemaList: function() {
        var id = this.selMovie.val();
        this.selId = this.selCinema.val();
        this.selCinema.attr('disabled', 'disabled');
        this.selMovie.attr('disabled', 'disabled');
        $.ajax({
            url: '/refreshlist',
            data: 'type=movie&region=' + gazeta_pl.cjg_region + '&id=' + id,
            success: function(msg) {
                gazeta_pl.cjg.finder.setList(gazeta_pl.cjg.finder.selCinema, msg);
            }
        });
    },
    getMovieList: function() {
        var id = this.selCinema.val();
        this.selId = this.selMovie.val();
        this.selCinema.attr('disabled', 'disabled');
        this.selMovie.attr('disabled', 'disabled');
        $.ajax({
            url: '/refreshlist',
            data: 'type=cinema&region=' + gazeta_pl.cjg_region + '&id=' + id,
            success: function(msg) {
                gazeta_pl.cjg.finder.setList(gazeta_pl.cjg.finder.selMovie, msg);
            }
        });
    },
    setList: function(target, msg) {
        msg = typeof msg == 'object' ? msg: JSON.parse(msg);
        var tmpary = [];
        for (var i in msg)
        tmpary.push({
            id: i,
            value: msg[i]
        });
        tmpary.sortColumn('value');
        var htm = '<option value="">wszystkie</option>';
        for (var i = 0; i < tmpary.length; i++) {
            htm += '<option value="' + tmpary[i].id + '">' + tmpary[i].value + '</option>';
        };
        target.find('option').remove();
        target.append(htm);
        var opts = target.find('option');
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value == gazeta_pl.cjg.finder.selId) {
                target.attr('selectedIndex', i);
                break;
            }
        };
        this.selCinema.removeAttr('disabled');
        this.selMovie.removeAttr('disabled');
    }
};
$.fn.sanitize_poll = function(options) {
    return this.each(function() {
        var elem = $(this);
        if (elem.find('input').length > 0)
            $.fn.sanitize_poll.before(elem, options);
        else
            $.fn.sanitize_poll.after(elem, options);
        options.callback(elem);
    });
};

$.fn.sanitize_poll.before = function(elem, options) {
    var elemp = elem;
    elem = elem.find('form').eq(0);
    elem.find('input[type=image]').remove();
    var id = elem.attr('id');
    var title = '<strong>' + elem.find('b').eq(0).html() + '</strong>';
    var hid = elem.find('input[type=hidden]');
    var hids = [];
    hid.each(function() {
        var e = $(this);
        hids.push('<input type="hidden" name="' + e.attr('name') + '" value="' + e.attr('value') + '" />');
    });
    hids.push('<input type="hidden" name="glosuj.x" value="1" />');
    hids.push('<input type="hidden" name="glosuj.y" value="1" />');
    var htm = elem.html().split(/<[iI][nN][pP][uU][tT][^>]+odpowiedz[^>]*>/)
    var htm_l = htm.length;
    var thtm = '';
    var opts = [];
    for (var i = 1; i < htm_l; i++) {
        var j = i - 1;
        var inhtm = '<input type="radio" name="odpowiedz" value="' + j + '" id="' + id + '_opt_' + j + '" />';
        inhtm += '<label for="' + id + '_opt_' + j + '">' + htm[i].split('<br').shift() + '</label>';
        opts.push(inhtm);
    }
    var outhtm = '<fieldset>';
    outhtm += '<h3>Sonda\u017c</h3>';
    outhtm += '<div class="head">' + title + '</div>';
    outhtm += hids.join('');
    outhtm += '<ul><li>';
    outhtm += opts.join('</li><li>');
    outhtm += '</li></ul>';
    outhtm += '<div class="sbt"><input type="image" src="' + options.img_src + '" alt="' + options.img_alt + '" /></div>';
    outhtm += '</fieldset>';
    elemp.addClass(options.class_vote);
    elem.html(outhtm);
};

$.fn.sanitize_poll.after = function(elem, options) {
    var ob = elem.find('b');
    var ob_l = ob.length;
    var title = '<strong>' + ob.eq(0).html() + '</strong>';
    var votes = '<p>' + options.all_votes + ' <strong>' + ob.eq(ob_l - 1).html() + '</strong></p>';
    var perc = [];
    for (var i = 1; i < ob_l - 1; i++) {
        perc.push(ob.eq(i).html());
    }
    var imgs = [];
    var img_m = elem.html().match(/<[iI][mM][gG][^>]+>/g);
    for (var i = 0; i < img_m.length; i++) {
        var img_w = parseInt(img_m[i].match(/width([^ ]+)/)[1].match(/[0-9]+/).pop());
        imgs.push('<span style="width:' + img_w + 'px;"></span>');
    }
    elem.find('b,span').remove();
    var tmpary = elem.html().split(/<[bB][rR][^>]*>/);
    var captions = [];
    var tmpary_l = tmpary.length;
    var thtm = '';
    for (var i = 1; i < tmpary_l; i++) {
        var cpt = $.trim(tmpary[i]);
        if (cpt != '') {
            cpt = cpt.replace(/(\([0-9]+\))/g, '<span>$1</span>');
            captions.push(cpt);
        }
    }
    var elems = [];
    var elems_l = perc.length;
    for (var i = 0; i < elems_l; i++) {
        elems.push('<p>' + captions[i] + '</p>' + '</em>' + imgs[i] + '<em>' + perc[i]);
    }
    var outhtm = '<h3>Sonda\u017c</h3>';
    outhtm += '<div class="head">' + title + '</div>';
    outhtm += '<ul><li>';
    outhtm += elems.join('</li><li>');
    outhtm += '</li></ul>';
    outhtm += votes;
    elem.addClass(options.class_results);
    elem.html(outhtm);
};
/* kalendarz - info/praca2008/calendar.js */
var EventCalendar = {
 URI_DAY: 0,
 URI_MONTH: 1,
 DAY_INACTIVE: -1,
 root: null,
 year: 0,
 month: 0,
 day: 0,
 initYear: 0,
 initMonth: 0,
 monthName: [],
 init: function(){
  var me = EventCalendar; 
  me.root = $('#calendar_select');
  if(me.root.length <= 0) return;
  
  var uri = document.location.href + '~';

  var test = uri.match(/_data=([0-9]{4})-([0-9]{1,2})(-[0-9]{1,2})?[_&~]/);
  if(test){
   me.year = parseInt(test[1], 10);
   me.month = parseInt(test[2], 10)-1;
   var test2 = uri.match(/_data=([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})[_&~]/);
   me.day = test2 ? parseInt(test2[3], 10) : me.DAY_INACTIVE;
   if (me.incorrectDate()) test = false;
  }
  
  if(!test) {
   var ckval = quickcookie('cal_last');
   if(ckval) {
    ckval = ckval.split('-');
    me.year = parseInt(ckval[0], 10);
    me.month = parseInt(ckval[1], 10);
    me.day = me.DAY_INACTIVE;
   }else{
    var dd = new Date();
    me.year = dd.getFullYear();
    me.month = dd.getMonth();
    me.day = dd.getDate();
   }
  }
  
  me.initYear = me.year;
  me.initMonth = me.month;
  me.monthName = 'stycze\u0144,luty,marzec,kwiecie\u0144,maj,czerwiec,lipiec,sierpie\u0144,wrzesie\u0144,pa\u017Adziernik,listopad,grudzie\u0144'.split(',');
  
  me.root.html('<table id="calendar_table" cellpadding="0" cellspacing="0"><caption><a href="javascript:void(0)" id="ctb_prev_month">&laquo;</a><span id="ctb_month_name"></span><a href="javascript:void(0)" id="ctb_next_month">&raquo;</a></caption><thead><tr><th>Pn</th><th>Wt</th><th>\u015Ar</th><th>Czw</th><th>Pt</th><th>Sb</th><th>Ndz</th></tr></thead><tbody id="ctb_body"></tbody></table>');

  $('#ctb_prev_month').click(function(e){
   e.preventDefault();
   me.prevMonth();
  });
  
  $('#ctb_next_month').click(function(e){
   e.preventDefault();
   me.nextMonth();
  });

  me.getData();
  
 },
 incorrectDate: function() {
  var me = EventCalendar;
  var y = me.year;
  var m = me.month+1;
  var d = me.day == me.DAY_INACTIVE ? 1 : me.day;
    
  if (y < 2000 || y > 2200) return true;
  if (m < 1 || m > 12) return true;
  if (d < 1 || d > 31) return true;
  if (d == 31 && (m != 4 && m != 6 && m != 9 && m != 12)) return true;
  if (d > 29 && m == 2) return true;
  if (d == 29 && m == 2 && !(y % 4 == 0 && (y % 100 != 0 || y % 400 == 0))) return true;
    
  return false;
 },
 getData: function() {
  var me = EventCalendar;
  $('#ctb_body').html('<tr><td colspan="7" class="loader">&nbsp;</td></tr>');
  
  $.ajax({
   url: '/Wydarzenia', 
   data: { m: me.month+1, y: me.year, typ: typProduktu},
   success: function(data){
    me.generate(data);
   }   
  });
  
 },
 generate: function(eventDay) {
  var me = EventCalendar;
  var d0 = new Date(me.year, me.month, 1);
  var d1 = new Date(me.year, me.month, 1);
  d1.setMonth(d1.getMonth()+1);
  d1.setDate(d1.getDate()-1);
  var fd = d0.getDay();
  fd = fd == 0 ? 7 : fd;
  var html = '';
  eventDay = !eventDay ? '' : eventDay.substring(0, eventDay.length - 1);
  eventDay = ','+eventDay;

  if(eventDay == ',') 
   $('#ctb_month_name').html('<span class="mname">'+me.monthName[me.month]+' '+me.year+'</span>');
  else 
   $('#ctb_month_name').html('<a class="mname" href="'+me.makeURI(0, me.URI_MONTH)+'">'+me.monthName[me.month]+' '+me.year+'</a>');

  var wd = 0;
  for(var i = -fd + 1; i < d1.getDate(); i++){
   if(wd == 0) html += '<tr>';

   var cl = [];

   if(wd == 6) cl.push('sun');
   if(me.year == me.initYear && me.month == me.initMonth && me.day == i+1 && me.day != me.DAY_INACTIVE) cl.push('today');

   html += '<td'+(cl.length!=0?' class="'+cl.join(' ')+'">':'>');

   if(i >= 0) {
    var reg = new RegExp(','+(i+1)+',');
    if(reg.exec(eventDay)) {
     html += '<a href="'+me.makeURI(i, me.URI_DAY)+'">'+(i+1)+'</a>';
    }else{
     html += i+1;
    }
   }else{
    html += '&nbsp;';
   }
   html += '</td>';

   wd++;
   if(wd == 7){
    html += '</tr>';
    wd = 0;
   }
  }

  if(wd != 0) {
   while(wd < 7) {
    html += '<td'+(wd==6?' class="sun"':'')+'>&nbsp;</td>';
    wd++;
   }
   html += '</tr>';
  }

  $('#ctb_body').html(html);
 },
 makeURI: function(day, uri_type) {
  var me = EventCalendar;
  if(uri_type == me.URI_DAY){
   day = ''+(day+1);
   if(day.length == 1) day = '0'+day;
  }
  var res = ''+(me.month+1);
  if (res.length == 1) res = '0'+res;
  res = '_data='+me.year+'-'+res+(uri_type==me.URI_DAY?'-'+day:'');

  var uri = document.location.href.replace(/\#.*/, '');

  if (!uri.match(/\?/)) {
   uri += '?param='+res;
  }else{
   if (!uri.match(/param=/)) {
    uri += '&param='+res;
   }else{ 
    if (uri.match(/_data=/)) uri = uri.replace(/_data=[^(_&)]+/, '');
    if (uri.match(/_data=[_&]/)) uri = uri.replace(/_data=/, '');
    if (uri.match(/_data=/)) uri = uri.replace(/_data=.*$/, '');
    uri = uri.replace(/param=/, 'param='+res);
   }
  }
  
  uri = uri.replace(/_ile=[0-9]+/, '_ile=0');
  return uri;
 },
 prevMonth: function() {
  var me = EventCalendar;
  me.month--;
  if(me.month < 0) {
   me.month += 12;
   me.year--;
  }
  quickcookie('cal_last', me.year+'-'+me.month);
  me.getData();
 },
 nextMonth: function() {
  var me = EventCalendar;
  me.month++;
  if(me.month > 11) {
   me.month -= 12;
   me.year++;
  }
  quickcookie('cal_last', me.year+'-'+me.month);
  me.getData();
 }
};

function quickcookie(name, val) {
  if (typeof val != 'undefined') {
    document.cookie = name+'='+encodeURIComponent(val);
  } else {
    val = null;
    var ck = document.cookie.split(/;/);
    for (var i = 0; i < ck.length; i++) {
      ck[i] = ck[i].replace(/^\s+|\s+$/g, '');
      if (ck[i].substring(0, name.length + 1) == (name + '=')) {
        val = decodeURIComponent(ck[i].substring(name.length + 1));
      }
    }
  }
  return val;
};

(function() {
    var key = gazeta_pl && gazeta_pl.documentParam && gazeta_pl.documentParam.googleMapKey ? '&key=' + gazeta_pl.documentParam.googleMapKey : '';
    document.write('<script src="http://maps.google.com/maps/api/js?sensor=false' + key + '" type="text/javascript"></script>');
}());

gazeta_pl.Lokale = {
    init: function() {
        gazeta_pl.Lokale.hpCommentsLink();
        gazeta_pl.Lokale.hpFBShare();
        gazeta_pl.Lokale.search.init();
        gazeta_pl.Lokale.nav.init();
        gazeta_pl.Lokale.initMT();
        gazeta_pl.Lokale.small_offers.init();
        gazeta_pl.Lokale.PhotoChanger.init();
        gazeta_pl.cjg.finder.init();
        
        EventCalendar.init();
        
        time_ago.init();
        time_counter.init();
        gazeta_pl.Lokale.Obituary.init();
        /* ukrycie pustych wierszy */
        $('#holder_402, #holder_403').each(function() {
            if ($(this).gazeta(gfunc.emptyChild, '.wrap'))
                $(this).hide();
        });
        $('#col_left .content_row').each(function() {
            if ($(this).gazeta(gfunc.emptyChild, '.holder_cl'))
                $(this).hide();
        });
        /* sondaz */
        if ($('.SONwrp').length > 0) {
            $('.SONwrp').each(function() {
                var $a = $(this).find('.SONimg').eq(0).parents('a').eq(0);
                if ($a.length && $a.attr('href') == 'http://www.eskk.pl') {
                    $(this).find('.SONwrp2').sanitize_poll({
                        img_src: 'http://bi.gazeta.pl/i/obrazki/lokalne/eskk_btn_vote.png',
                        img_alt: 'g\u0142osuj',
                        class_vote: 'voting',
                        class_results: 'results',
                        all_votes: 'Liczba oddanych g\u0142os\u00f3w:',
                        callback: function($poll) {
                            var $par = $poll.parent(), $a = $par.find('.SONimg').eq(0).parents('a').eq(0);
                            $par.addClass('eskk_poll');
                            $par.show();
                            $poll.prepend($a).prepend('<h3 class="ad">Sonda\u017C</h3>').append('<div class="sponsor"><p class="more"><a href="http://eskk.pl/blog/sonduj-sie">Chcesz wiedzie\u0107 wi\u0119cej<br />o j\u0119zykach europejskich?<br />Sprawd\u017A &raquo;</a></p><p class="info">sonda\u017C sponsorowany</p></div>');
                        }
                    });
                } else if ($a.length && $a.attr('href') == 'http://www.pwr.wroc.pl/') {
                    $(this).find('.SONwrp2').sanitize_poll({
                        img_src: 'http://bi.gazeta.pl/i/obrazki/serwisy_lokalne/pw-son-button.jpg',
                        img_alt: 'g\u0142osuj',
                        class_vote: 'voting',
                        class_results: 'results',
                        all_votes: 'Liczba oddanych g\u0142os\u00f3w:',
                        callback: function($poll) {
                            var $par = $poll.parent()
                            $par.addClass('pw_poll');
                            $par.show();
                        }
                    });
                } else if ($a.length && $a.attr('href') == 'http://www.facebook.com/smiecenie.odpada') {
                    $(this).find('.SONwrp2').sanitize_poll({
                        img_src: 'http://bi.gazeta.pl/i/obrazki/serwisy_lokalne/poll-sp--smiecenie-odpada-btn.png',
                        img_alt: 'g\u0142osuj',
                        class_vote: 'voting',
                        class_results: 'results',
                        all_votes: 'Liczba oddanych g\u0142os\u00f3w:',
                        callback: function($poll) {
                            var $par = $poll.parent()
                            $par.addClass('pw_poll');
                            $par.show();
                            $par.prepend('<div class="sponsor"><p class="info">sonda\u017C sponsorowany</p></div>').addClass('smiecenieodpada');
                            $poll.find('.head').wrap('<a href="http://www.facebook.com/smiecenie.odpada/"></a>');
                        }
                    });
                } else if( (location.href).split("/")[2] == 'poznan.gazeta.pl' ) {
                    // pool autostrada A2
                    setTimeout( function() { $('#col_right .SONwrp2.results').append('<a class="btn" target="_blank" href="http://www.allegrograeko.pl/"><img src="http://bi.gazeta.pl/i/obrazki/serwisy_lokalne/autostrada_a2/btn_seemore.png" /></a>'); }, 1000);
                    $('.SONwrp').append('<p class="footer">sonda\u017c sponsorowany</p>');
                    
                    var $this = $(this);
                    $this.find('.SONwrp2').sanitize_poll({
                        img_src: 'http://bi.gazeta.pl/i/obrazki/serwisy_lokalne/autostrada_a2/btn_vote_v2.png',
                        img_alt: 'zag\u0142osuj',
                        class_vote: 'voting',
                        class_results: 'results',
                        all_votes: 'Liczba oddanych g\u0142os\u00f3w:',
                        callback: function(elem) {
                            var par = elem.parent();
                            var img = par.find('.SONimg');
                            if (img.length > 0) {
                                var _a = img.parent('a');
                                if (_a.length > 0) {
                                    par.find('.head').prepend(_a);
                                } else {
                                    par.find('.head').prepend(img);
                                }
                                if (img.attr('src') == 'http://bi.gazeta.pl/im/8/12348/m12348148.jpg') {
                                    $this.addClass('mnk');
                                    $this.find('.SONwrp2').append('<h3 class="mnkContact">Kontakt</h3><p class="mnkAddress">Muzeum Dialogu Kultur<br>Kamienica pod Trzema Herbami<br>ul. Rynek 3, Kielce<br><a href="mailto:dialog@mnki.pl">dialog@mnki.pl</a><br><a href="http://www.mnki.pl/">www.mnki.pl</a></p>'); 
                                }
                                //par.find('.head strong').prepend('<span>Sonda\u017c sponsorowany</span>');
                            }
                            par.css({
                                display: 'block'
                            });
                        }
                    });
                } else {
                    var $this = $(this);
                    $this.find('.SONwrp2').sanitize_poll({
                        img_src: 'http://bi.gazeta.pl/i/obrazki/serwisy_lokalne/vote-btn-2.png',
                        img_alt: 'g\u0142osuj',
                        class_vote: 'voting',
                        class_results: 'results',
                        all_votes: 'Liczba oddanych g\u0142os\u00f3w:',
                        callback: function(elem) {
                            var par = elem.parent();
                            var img = par.find('.SONimg');
                            if (img.length > 0) {
                                var _a = img.parent('a');
                                if (_a.length > 0) {
                                    par.find('.head').prepend(_a);
                                } else {
                                    par.find('.head').prepend(img);
                                }
                                if (img.attr('src') == 'http://bi.gazeta.pl/im/8/12348/m12348148.jpg') {
                                    $this.addClass('mnk');
                                    $this.find('.SONwrp2').append('<h3 class="mnkContact">Kontakt</h3><p class="mnkAddress">Muzeum Dialogu Kultur<br>Kamienica pod Trzema Herbami<br>ul. Rynek 3, Kielce<br><a href="mailto:dialog@mnki.pl">dialog@mnki.pl</a><br><a href="http://www.mnki.pl/">www.mnki.pl</a></p>'); 
                                }
                                //par.find('.head strong').prepend('<span>Sonda\u017c sponsorowany</span>');
                            }
                            par.css({
                                display: 'block'
                            });
                        }
                    });
                }
            });
        };
        
        var 
            $cinemaLink = $('#col_left .mod_cjg_repertory_finder a')
            cinemaHeaderLength = $cinemaLink.text().length,
            cinemaHeaderFirstLetter = $cinemaLink.text().substr(0,1),
            rest = $cinemaLink.text().substr(1,cinemaHeaderLength),
            $map = $('#location_map');
            
        $('#col_left .mod_cjg_repertory_finder a, #col_right .mod_cjg_repertory_finder a').html(cinemaHeaderFirstLetter + '<span>' + rest + '</span>');
        
        if ($map.length && gazeta_pl.documentParam && gazeta_pl.documentParam.googleMapKey) {
            $map.css({ 'position': 'relative' }).append('<img src="http://bi.gazeta.pl/i/obrazki/film/im/zobacz-na-mapie.jpg" class="zaslepka" style="position: absolute; top:0; left: 0; cursor: pointer;" />');
            $map.find('img.zaslepka').live('click',function() {
                $(this).remove();
                gazeta_pl.Lokale.map.init();
            });
        };
    },
    map: {
        init: function() {
            var map_x = 0.0;
            var map_y = 0.0;
            var map_type = google.maps.MapTypeId.ROADMAP;
            var map_zoom = 15;

            if (gazeta_pl.map_x && gazeta_pl.map_y) {
                map_x = gazeta_pl.map_x;
                map_y = gazeta_pl.map_y;
            };

            if(gazeta_pl.map_type) {
                switch (gazeta_pl.map_type) {
                    case 'ROADMAP':
                        map_type = google.maps.MapTypeId.ROADMAP;
                        break;
                    case 'SATELLITE':
                        map_type = google.maps.MapTypeId.SATELLITE;
                        break;
                    case 'HYBRID':
                        map_type = google.maps.MapTypeId.HYBRID;
                        break;
                    case 'TERRAIN':
                        map_type = google.maps.MapTypeId.TERRAIN;
                        break;
                }
            };

            if (gazeta_pl.map_zoom) {
                map_zoom = gazeta_pl.map_zoom;
            }

            var latlng = new google.maps.LatLng(map_x, map_y);
            var options = {
                zoom : map_zoom,
                center : latlng,
                mapTypeId : map_type
            };

            var map = new google.maps.Map(document.getElementById('location_map'), options);

            if (gazeta_pl.map_address) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address : gazeta_pl.map_address,
                    country : 'Poland'
                }, function(results, status) {
                    if(status == google.maps.GeocoderStatus.OK) {
                        var marker = new google.maps.Marker({
                            map : map,
                            position : results[0].geometry.location
                        });
                        var latlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        map.setCenter(latlng);
                        if(gazeta_pl.map_tooltip) {
                            google.maps.event.addListener(marker, "click", function() {
                                var tooltip = new google.maps.InfoWindow();
                                tooltip.open(map, marker);
                                tooltip.setContent(gazeta_pl.map_tooltip);
                            });
                            //google.maps.event.trigger( marker, 'click' ); // odkomentowac gdy chcemy miec widoczny tooltip na starcie
                        }
                    }
                });
            } else {
                var marker = new google.maps.Marker({
                    map : map,
                    position : latlng
                });
            }
        }
    },
    search: {
        init: function() {
            var selOptionsLength = $('#searchH_sel option').length;
            if (selOptionsLength > 0) {
                var searchHTML = '<div class="searchSel0"><div class="arrow"></div><ul>';
                //check for active element if not specified get first
                var activeSearch = $('#searchH_sel option').eq(0);
                if ($('#searchH_sel option:selected').length > 0) {
                    activeSearch = $('#searchH_sel option:selected')
                }
                searchHTML += '<li class="selectedVal"><a href="#" class="selectedVal" alt="' + activeSearch.attr("value") + '">' + activeSearch.text() + '</a></li>';
                $('#VE_szukaj_id').each(function() {
                    if ($.trim($(this).val()) != '') {
                        $(this).addClass('hasQuery');
                    } else {
                        $(this).removeClass('hasQuery');
                    }
                });
                $('#VE_szukaj_id').addClass(activeSearch.attr("value"));
                // loop trough services select and create proprer html
                for (var i = 0; i < selOptionsLength; i++) {
                    var currentOption = $('#searchH_sel option').eq(i);
                    if (i == 0) {
                        searchHTML += '<li class="first ' + currentOption.attr("value") + '"><a href="#" class="' + currentOption.attr("value") + '" alt="' + currentOption.attr("value") + '"><span>' + currentOption.text() + '</span></a></li>';
                    } else {
                        searchHTML += '<li class="' + currentOption.attr("value") + '"><a href="#" class="' + currentOption.attr("value") + '" alt="' + currentOption.attr("value") + '"><span>' + currentOption.text() + '</span></a></li>';
                    }
                }
                searchHTML += '</ul></div>';
                //build it
                $('#searchH .b').wrap('<div class="searchSel">');
                $('.searchSel').prepend(searchHTML);
                $('#searchH .searchSel0 .arrow').click(function() {
                    $('#searchH0').hasClass('searchExpanded') ? $('#searchH0').removeClass('searchExpanded'): $('#searchH0').addClass('searchExpanded')
                });
                // change search type after click
                $('.searchSel0 a').click(function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('selectedVal'))
                        return;
                    $('#VE_szukaj_id').removeClass($('.searchSel0 .selectedVal').attr('alt'));
                    $('.searchSel0 .selectedVal').text($(this).text());
                    $('.searchSel0 .selectedVal').attr('alt', $(this).attr('alt'));
                    $('.searchSel0 a').removeClass('selected');
                    $(this).addClass('selected');
                    $('#VE_szukaj_id').addClass($('.searchSel0 .selectedVal').attr('alt'));
                    $('#searchH_sel option:selected').attr('selected', '');
                    $('#searchH_sel option[value=' + $(this).attr("alt") + ']').attr('selected', 'selected');
                    $('#searchH_sel').change(function() {
                        searchH.searchH_sel = $(this).find(':selected').attr('value')
                    });
                    $('#searchH_sel').change();
                    $('#searchH0').removeClass('searchExpanded');
                });
                $('#VE_szukaj_id').focus(function() {
                    $(this).addClass('inEdit');
                });
                $('#VE_szukaj_id').blur(function() {
                    $(this).removeClass('inEdit');
                    if ($.trim($(this).val()) != '') {
                        $(this).addClass('hasQuery');
                    } else {
                        $(this).removeClass('hasQuery');
                    }
                });
            }
            $('#searchH .searchSel0').css({
                'display': 'block'
            });
			
        }
    },
    nav: {
        init: function() {
            $('#navH .p0 > li').hover(function() {
                $(this).prev().addClass('before');
            }, function() {
                $(this).prev().removeClass('before');
            });
            //$('#navH .p1 > li > a').click(function(e) {
                //e.preventDefault();
            //});
        }
    },
    small_offers: {
        init: function() {
            var t = 0;
            var mod = $('#mod_offer_small');
            var pos = $('#mod_offer_small .list_holder > ul > li').index($('#mod_offer_small .permanent'));
            if (mod.length == 0)
                return;
            if ($.cookie('small_offers_roll')) {
                t = 1 + parseInt($.cookie('small_offers_roll'));
                var mod_ul = mod.find('.list_holder > ul');
                var mod_li = mod_ul.find('> li');
                if (t >= mod_li.length || t < 0)
                    t = 0;
                var nt = t;
                while (nt-- > 0)
                mod_ul.append(mod_ul.find('> li:first'));
                mod_ul.find('> li.first').removeClass('first');
                var npos = $('#mod_offer_small .list_holder > ul > li').index($('#mod_offer_small .permanent'));
                if (npos != pos)
                    $('#mod_offer_small .list_holder > ul > li').eq(pos).before($('#mod_offer_small .permanent'));
                mod_ul.find('> li:first').addClass('first');
            };
            $.cookie('small_offers_roll', t, {
                expires: 1
            });
            mod.css({
                visibility: 'visible'
            });
        }
    },
    initMT: function() {
        var mtReady = false, mtRolling = false, $mt = $('.mod_zi10');
        if (!$mt.length)
            return;
        $mt.each(function() {
            $(this).prepend('<p class="scrollLeft scroll">');
            $(this).append('<p class="scrollRight scroll">');
            $(this).gazeta(gfunc.gslider, {
                selectors: {
                    bodyOuter: '.body',
                    bodyInner: '.body > ul',
                    bodyElems: '.body > ul > li',
                    buttonPrev: '.scrollLeft',
                    buttonNext: '.scrollRight'
                },
                visibleElems: 1
            });
            mtReady = true;
            $(this).find('.scroll').click(function() {
                mtRolling = false;
            });
        });
        setInterval(function() {
            if (mtRolling && mtReady)
                $mt.trigger('move');
        }, 5000);
    },
    hpFBShare: function() {
        if ($('.mod_zi_lokale1.hps').not('.short').length) {
            $('.mod_zi_lokale1.hps').not('.short').find('.wrap_0').each(function() {
                var $t = $(this), 
                    $end = $t.find('.comments'), 
                    link = $t.find('h3 a').attr('href');
                if (!link)
                    return;
                
                $end.append('<span class="fbShare"><fb:share-button class="fb_share_count_hidden" type="icon_link" href="' + link + ' "></fb:share-button></span>');
            })
            
            setTimeout(function() {                
                //FB.XFBML.parse(document);
            }, 1000);
        }
    },
    hpCommentsLink: function() {
        var $ballons = $('.mod_zi_lokale1.hps .entry:not(.banEntry) .comments a');
        $ballons.each(function() {
            var $t = $(this),
                $comm = $t.next(), 
                txt = $comm.text().match(/\d+/);
            
            $t.append('<span>' + txt[0] + '</span>').addClass('vis');
            $comm.remove();
        })
        $ballons.parent().addClass('vis');
    },
    PhotoChanger: {
        init: function() {
            var $containers = $('.mod_zr_photo .node_container');
            $containers.each(function() {
                var $container = $(this), $spans = $container.find('span'), $after = $spans.eq(1).parent().parent(), img = null, j = 0, jl = 0;
                $spans.each(function() {
                    img = new Image();
                    img.src = $(this).text();
                    $(this).parent().append(img);
                });
                $after.append('<span class="scroll"></span>');
                $container.mousemove(function(e) {
                    gazeta_pl.Lokale.PhotoChanger.onContainerHover(e, $container, $after);
                });
            });
        },
        onContainerHover: function(e, $container, $after) {
            var offset = $container.offset();
            pos = 965 - (e.pageX ? e.pageX: e.clientX + document.body.scrollLeft) + offset.left;
            if (pos < 60)
                pos = 60;
            if (pos > 880)
                pos = 880;
            $after.css('width', pos);
        }
    },
    
    Obituary: {
        init: function() {
            $('.slider_nekrologi').each(function() {
                gazeta_pl.Lokale.Obituary.makeSlider($(this));
                $(this).css('visibility', 'visible');
            });
        },

        makeSlider: function($target) {
            var $el = $target.find('li'),
                len = $el.length,
                limitPerSlide = 12;
            for (var i = 0; i < len; i+=limitPerSlide){
                $el.filter(':eq('+i+'),:lt('+(i+limitPerSlide)+'):gt('+i+')').wrapAll('<div class="slide" />');
            }

            $target.gazeta(gfunc.gslider, {
                selectors: {
                    bodyOuter: '.node_entries',
                    bodyInner: '.node_inner_entries ul',
                    bodyElems: '.node_inner_entries div',
                    buttonPrev: '.node_prev .prev',
                    buttonNext: '.node_next .next'
                },
                visible_elems: 1
            });
        }
    }
};

$(gazeta_pl.Lokale.init);