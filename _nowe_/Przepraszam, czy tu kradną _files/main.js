var currency_switch = {
 init: function() {
  var me = currency_switch;
  $('.notowania_waluta').each(function() {
   var elem = $(this);
   elem.find('li:not(.th)').hover(
    function() {
     var param = $(this).find('.param').html().split(/\*/).pop();
     var chart = elem.find('.W_chart');
     me.set_data(chart, param);
     $(this).addClass('hover');
    },
    function() {
     var param = $(this).find('.param').html().split(/\*/).shift();
     var chart = elem.find('.W_chart');
     me.set_data(chart, param);
     $(this).removeClass('hover');
    }
   );
  });
 },
 set_data: function(chart, param) {
  chart.find('img').attr('src', 'http://wyborcza.biz/pub/exchange/currencies/staticCharts/FOREX/'+param+'_LAST_MINI.png');
  chart.find('.W_chart_title').html(param);
 }
};

var g_offers = {
  MAX_ELEMS: 6,
  ELEM_SIZE: 147,
  o_box: null,
  o_list: null,
  o_list_elem: null,
  o_left: null,
  o_right: null,
  o_left_s: null,
  o_right_s: null,
  position: 0,
  count: 0,
  init: function() {
    var me = g_offers;
    me.o_box = $('#mod_offer');
    if (me.o_box.length == 0) return;
    me.o_list = me.o_box.find('.list_holder ul');
    me.o_list_elem = me.o_list.find('li');
    me.count = me.o_list_elem.length;
    if (me.count > me.MAX_ELEMS) {
      me.o_list.parent().before('<span id="mod_offer_scroll_left"><span></span></span>');
      me.o_list.parent().after('<span id="mod_offer_scroll_right" class="active"><span class="active"></span></span>');
      me.o_left = $('#mod_offer_scroll_left');
      me.o_right = $('#mod_offer_scroll_right');
      me.o_left_s = me.o_left.find('span');
      me.o_right_s = me.o_right.find('span');
      me.o_left.click(function() {
        if (me.position == 0) return;
        me.position--;
        if (me.position == 0) {
          me.o_left.removeClass('active');
          me.o_left_s.removeClass('active');
        }
        if (!me.o_right.hasClass('active')) {
          me.o_right.addClass('active');
          me.o_right_s.addClass('active');
        }
        me.o_list.animate({left: '+='+me.ELEM_SIZE+'px'});
      });
      me.o_right.click(function() {
        if (me.position == me.count - me.MAX_ELEMS) return;
        me.position++;
        if (me.position == me.count - me.MAX_ELEMS) {
          me.o_right.removeClass('active');
          me.o_right_s.removeClass('active');
        }
        if (!me.o_left.hasClass('active')) {
          me.o_left.addClass('active');
          me.o_left_s.addClass('active');
        }
        me.o_list.animate({left: '-='+me.ELEM_SIZE+'px'});
      });
    }
  }
};

function testDWF() {
  var s = $('#sitePath');
  var t = $('#dwf2');
  if (s.length == 0 || t.length == 0) return;
  var i = parseInt(t.css('top'));
  var j = s.offset().top - t.offset().top;
  if (j == 0) return;
  i += j;
  t.css({ top: (i-5)+'px' });
}

$(document).ready(function() {

    gazetaDom.init();
    gazetaDomSearch.init();
    
    //mdm mieszkania dla mlodych
    if($('body').hasClass('path_mdm')) {
        
        var 
            scripts = [
                'http://www.domiporta.pl/nowe/Scripts/jquery-ui-1.8.18.custom.min.js',
                'http://www.domiporta.pl/nowe/Scripts/jquery.autocomplete.js',
                'http://www.domiporta.pl/nowe/Scripts/jquery.watermark.min.js',
                'http://www.domiporta.pl/nowe/Scripts/mdm-search-box.js'
            ],
            fn = function(i) {
                $.getScript(scripts[i], function() {
                    if (i >= scripts.length - 1) return;
                    fn(i+1);
                })
            };
            
        $('head').append('<link rel="stylesheet" href="http://www.domiporta.pl/nowe/Content/jquery.autocomplete.css" type="text/css" /><link rel="stylesheet" href="http://www.domiporta.pl/nowe/Content/jquery.autocomplete.checkbox.css" type="text/css" />');
        
        fn(0);            
    }
	
  // przewijak MT
  $('.mod_zr5').gazeta(gfunc.gslider, {
    selectors: {
      bodyOuter: '.node_body',
      bodyInner: '.node_inner_body',
      bodyElems: '.node_entry',
      buttonPrev: '.node_prev a',
      buttonNext: '.node_next a'
    },
    visible_elems : 1
  });

 $('#navH .p0 > li').gazeta(gfunc.nav);
 $('#navH .p0 > li').each(function(){
  if($(this).hasClass('active')){
   $(this).prev().addClass('beforeAcive');
   $(this).next().addClass('afterAcive');
  }
 });

 // search
 var selOptionsLength = $('#searchH_sel option').length;
 if(selOptionsLength > 0) {

  var searchHTML = '<div class="searchSel0">';

  //check for active element if not specified get first
  var activeSearch = $('#searchH_sel option').eq(0);
  if($('#searchH_sel option:selected').length > 0){
   activeSearch =  $('#searchH_sel option:selected')
  }
  searchHTML += '<a href="#" class="selectedVal" alt="'+activeSearch.attr("value")+'">'+activeSearch.text()+'</a>';
  
  // go trough services select and create proprer html
  for(var i = 0; i < selOptionsLength; i++){
   var currentOption = $('#searchH_sel option').eq(i);
   searchHTML += '<a href="#" class="'+currentOption.attr("value")+'" alt="'+currentOption.attr("value")+'">'+currentOption.text()+'</a>';
  }

  searchHTML += '</div>';

  //build it
  $('#searchH .b').wrap('<div class="searchSel">');
  $('.searchSel').prepend(searchHTML);

  $('#searchH .searchSel0').hover( function(){ $('#searchH0').addClass('hovered'); }, function(){ $('#searchH0').removeClass('hovered'); });

  // change search type after click
  $('.searchSel0 a').click(function(e){
    e.preventDefault();
    if( $(this).hasClass('selectedVal') ) return;
    $('.searchSel0 .selectedVal').text( $(this).text() );
    $('.searchSel0 .selectedVal').attr( 'alt', $(this).attr('alt') );
    $('.searchSel0 a').removeClass('selected');
    $(this).addClass('selected');

    $('#searchH_sel option:selected').attr('selected','');
    $('#searchH_sel option[value='+$(this).attr("alt")+']').attr('selected','selected');
    $('#searchH_sel').change( function(){ searchH.searchH_sel = $(this).find(':selected').attr('value') } );  
    $('#searchH_sel').change();

    // google logo in search bar
    if($(this).attr('alt')=='internet') {
     if($('#searchH .t').val()=='') $('#searchH .t').addClass('google');
    } else {
     $('#searchH .t').removeClass('google');
    }
    $('#searchH .t.google').focus(function() {
     $(this).removeClass('google')
    });
    $('#searchH .t.google').blur(function() {
     if($(this).val()=='') $(this).addClass('google');
    }); 
  });
 }

 //small search
 if($('.mod_domiporta_finder').length > 0){
  if($('.mod_domiporta_finder #formIOpis').val()=='') {
   $('.mod_domiporta_finder #formIOpis').addClass('empty')
  } else {
   $('.mod_domiporta_finder #formIOpis').removeClass('empty')
  }
  $('.mod_domiporta_finder #formIOpis').focus(function() {
   $(this).removeClass('empty')
  });
  $('.mod_domiporta_finder #formIOpis').blur(function() {
   if($(this).val()=='') $(this).addClass('empty');
  }); 
 }

 //pozostale
 currency_switch.init();

 //przewijak partnerzy
 $('#holder_401 .mod_zr8 .node_body').before('<div id="partners_node_prev"><a href="#">poprzednie</a></div>');
 $('#holder_401 .mod_zr8 .node_body').after('<div id="partners_node_next"><a href="#">nast�pne</a></div>');
 $('#holder_401 .mod_zr8').gazeta(gfunc.gslider, {
   selectors: {
    bodyOuter: ".node_body",
    bodyInner: ".node_inner_body",
    bodyElems: ".node_entry",
    buttonPrev: "#partners_node_prev a",
    buttonNext: "#partners_node_next a"
   }
 });

 g_offers.init();
 testDWF();

});

var gazetaDom = {
    search: null,
    hint: null,
    form: null,
    hasFocus: false,
    isAjax: false,
    hintDisplayed: false,
    lastQuery: '',
    requestHash: {},
    url: '/gazetadomRynekPierwotny',
    emptyDefaultText: "",
    init: function(){
        var me = gazetaDom;
        me.search = $('#dom-searchQuery');
        me.hint = $('#dom-search-hint');
        me.form = $('#dom-rynek-pierwotny-t-form');
        me.urlAction = $('#frmCityAction').val();
        if (me.search.length < 0 || me.hint.length < 0) 
            return;
        
        try {
            if ($('#dom-searchQuery:focus').length < 1) {
                me.setEmptyDefaultText();
            }
            else {
                me.hasFocus = true;
            }
        } 
        catch (e) {
            me.setEmptyDefaultText();
        }
        
        me.search.focus(function(){
            me.hasFocus = true;
            if ($.trim(me.search.val()) == me.emptyDefaultText) 
                me.search.val('');
        });
        me.search.blur(function(){
            me.hasFocus = false;
            me.setEmptyDefaultText();
            window.setTimeout(gazetaDom.hideHint, 2000);
        }); 
        
        me.hint.find('div').live('click', gazetaDom.setQuery);
        me.hint.find('div').live('mouseover', gazetaDom.setQueryPos);
        me.form.submit(function(){
            if ($.trim(me.search.val()) == me.emptyDefaultText) 
                me.search.val('');
            switch($('#dom-rynek-pierwotny-typ').val()){
	            case "":
	            	$('#frmCityAction').val(me.urlAction);break;
	            case "50002":	            	
	            	$('#frmCityAction').val(me.urlAction.replace('/inwestycje','/mieszkania'));break;
	            case "50011":
	            	$('#frmCityAction').val(me.urlAction.replace('/inwestycje','/apartamenty'));break;
	            case "50012":
	            	$('#frmCityAction').val(me.urlAction.replace('/inwestycje','/lofty'));break;
	            case "50001":
	              	$('#frmCityAction').val(me.urlAction.replace('/inwestycje','/domy'));break;
	            }
            return true;
        });
        window.setInterval(gazetaDom.checkQuery, 1);
        me.search.keydown(me.moveHint); 
        me.searchTop.init();
        me.ECommerce.init();
    },
    searchTop: {
        uzr: $( '.mod_uzr_search' ),
        init: function() {
            var me = gazetaDom.searchTop;
            me.uzr.find( 'a.details' ).bind( 'click', me.expander );
        },
        expander: function() {
            var me = gazetaDom.searchTop;
            me.uzr.addClass( 'expand' );
            $( this ).hide();
            me.uzr.find( 'ul + ul' ).show();
        }
    },
    setEmptyDefaultText: function(){
        var me = gazetaDom;
        if ($.trim(me.search.val()) == '') 
            me.search.val(me.emptyDefaultText);
    },
    checkQuery: function(){
        me = gazetaDom;
        var query = $.trim(me.search.val());
        
        if (!me.hasFocus || query == me.emptyDefaultText) 
            return;
        if (query == '') 
            me.hideHint();
        if (query.length > 1) {
            if (query != '' && !me.isAjax && query != me.lastQuery) {
                me.lastQuery = query;
                if (typeof me.requestHash[query] != 'undefined') {
                    me.displayHint(me.requestHash[query]);
                }
                else {
                    me.isAjax = true;
                    $.ajax({
                        url: gazetaDom.url,
                        data: 'query=' + encodeURIComponent(query),
                        success: function(msg){
                            me.requestHash[query] = msg;
                            me.displayHint(msg);
                        }
                    });
                }
            }
        }
    },
    hideHint: function(){
        var me = gazetaDom;
        me.hint.hide();
        me.hintDisplayed = false;
        me.lastQuery = '';
    },
    displayHint: function(msg){
        var me = gazetaDom;
        
        var hints = msg ? JSON.parse(msg) : {};
        var hintsCount = hints.length;

        if (!hintsCount) {
            me.isAjax = false;
            me.hideHint();
            return;
        }
        var htm = '';
        for (var i = 0; i < hintsCount; i++) {
            htm += '<div><span>' + hints[i].DisplayName + '</span><span class="rCount">(' + hints[i].Count + ')</span></div>';
        }
        me.hint.html(htm);
        me.hintDisplayed = true;
        me.hint.show();
        me.isAjax = false;
    },
    setQueryPos: function(){
        var me = gazetaDom;
        me.highlightHint($(this).parent().find('div').index($(this)));
    },
    setQuery: function(){
        var me = gazetaDom;
        var query = $(this).find('span').not('.rCount').html();
        me.search.val(query);
        me.hideHint();
        // me.form.submit();
    },
    moveHint: function(e){
        var me = gazetaDom;
        var selPos = -1;
        
        if (!me.hintDisplayed) 
            return;
        
        var elemsLength = me.hint.find('div').length;
        var activeElem = me.hint.find('.active');
        if (activeElem.length > 0) {
            selPos = activeElem.parent().find('div').index(activeElem);
        }
        
        if (e.keyCode == 38) {
            selPos--;
            if (selPos < 0) 
                selPos = elemsLength - 1;
            me.highlightHint(selPos);
        };
        if (e.keyCode == 40) {
            selPos++;
            if (selPos >= elemsLength) 
                selPos = 0;
            me.highlightHint(selPos);
        };
        if (e.keyCode == 13 && selPos >= 0) {
            e.preventDefault();
            me.hint.find('div').eq(selPos).find('span').not('.rCount').html()
            me.search.val(me.hint.find('div').eq(selPos).find('span').not('.rCount').html());
            me.hideHint();
            // me.form.submit();
        };
        
            },
    highlightHint: function(n){
        var me = gazetaDom;
        me.hint.find('.active').removeClass('active');
        me.hint.find('div').eq(n).addClass('active');
        
    },
    ECommerce: {
        SERVLET_ECOMMERCE_NEW: 'http://ad.gazeta.pl/cpc/CpcBanGetJsonServlet.servlet',
        init: function() {
        
            if (!gazeta_pl.eCommerceServlet) return; 
            
            var  
                cookieName = 'PPW',
                cookie = $.cookie(cookieName),
                randomNum = Math.floor(Math.random() * 4);
            
            gazetaDom.ECommerce.eCommerceVariant = !cookie ? randomNum : cookie;                   
            
            if (!cookie) $.cookie(cookieName, gazetaDom.ECommerce.eCommerceVariant, { expires: 7 });
            
            gazeta_pl.jsonp(
                gazetaDom.ECommerce.SERVLET_ECOMMERCE_NEW,
                {xxArt: '1', xxDiv: gazeta_pl.eCommerceServlet.xxDiv, viewVariant: gazetaDom.ECommerce.eCommerceVariant, callback: 'gazetaDom.ECommerce.onCallbackECommerce'},
                'gazetaDom.ECommerce.onCallbackECommerce',
                null
            );
        
       },
       
        onCallbackECommerce: function(data) {
 
            var 
                $targets = $('article.eCommerce:first section.body > ul'),
                random = 0 || gazetaDom.ECommerce.eCommerceVariant,
                classN = "viewVariant" + random,
                items = [],
                count = 0,
                last = 0,
                dataElems = {};
                
            if (data && $targets.length) {
                
                dataElems = data[gazeta_pl.eCommerceServlet.adVersion];
                count = dataElems.bansId;
                last = dataElems.bans.length - 1;
                items = data[gazeta_pl.eCommerceServlet.adVersion].bans;
                
                /*
                items = dataElems.bans.filter(function(a, b) {
                        return a
                    if (random == 4) {
                        if (b < 3 || b == last) return a;
                    } else if (random > 0) {
                        if (b < 2 || b == last) return a;
                    } else {
                        return a;
                    };
     
                });
                
                */
                
                $targets.html('');
                
                items.map(function(item) {
                    var 
                        htm = '',
                        linkOpen = '<a id="LinkArea:BoxOferty" href="' + item.href + '&viewVariant=' + gazetaDom.ECommerce.eCommerceVariant + '" title="' + item.title + '">';
                        item.price = item.price == '0' ? item.check : item.price + 'z\u0142';
                        
                    htm = '<li><p class="imgw">' + linkOpen + '<img alt="' + item.title + '" src="' + item.img + '"></a><span class="overlay"></span></p>';
                    htm += '<p class="description">' + linkOpen + item.title + '</a></p>';
                    htm += '<p class="price">' + linkOpen + '<span class="price">' + item.price +'</span></a></p></li>';
               
                    $targets.append(htm);           
                });
                
                //$('article[data-vr-zone="eCommerce"]').attr('class','').addClass('eCommerce viewVariant' + gazetaDom.ECommerce.eCommerceVariant)
               
                $targets.removeClass('filled holder');
                
                gazeta_pl.jsonp (
                    "http://ad.gazeta.pl/cpc/CpcBanCount",
                    { xxBan: count, xxDiv: gazeta_pl.eCommerceServlet.xxDiv, xxPos: gazeta_pl.eCommerceServlet.adVersion,viewVariant: gazetaDom.ECommerce.eCommerceVariant},
                    null
                );
            };

        }
          
    }
};

var gazetaDomSearch = {
    array1: [],
    array2: [],
    array3: [],
    array4: [],
    array5: [],
    array6: [],
    interval: null,
    init: function() {
        var me = gazetaDomSearch;
		me.placeholder.init();
        me.load( jQuery('#dom-rynek-pierwotny-typ') );
        
        jQuery('#dom-rynek-pierwotny-typ').change(function(){
            me.load( jQuery(this) );
        });
        jQuery('input[name=AreaFrom], input[name=AreaTo], input[name=RoomCountFrom], input[name=RoomCountTo], input[name=PriceFrom], input[name=PriceTo]').keydown(function( e ) {
            var elem = jQuery(this);
            switch( e.keyCode ) {
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 8: //backspace
                case 9: //tab
                    return;
                break;
                default:
                    return false;
                break;
            }
        });
        jQuery('input[name=AreaFrom]').keyup(function( e ) {
            var elem = jQuery(this);
            var reg = new RegExp( '^' + elem.val() );
            var ret = me.array1.filter(function(x) {
                return x.replace(/\s/g, '').match( reg );
            });
            me.fill( ret, elem );
        });
        
        jQuery('input[name=AreaTo]').keyup(function( e ) {
            var elem = jQuery(this);
            var reg = new RegExp( '^' + elem.val() );
            var ret = me.array2.filter(function(x) {
                return x.replace(/\s/g, '').match( reg );
            });
            me.fill( ret, elem );
        });
        
        jQuery('input[name=RoomCountFrom]').keyup(function( e ) {
            var elem = jQuery(this);
            var reg = new RegExp( '^' + elem.val() );
            var ret = me.array3.filter(function(x) {
                return x.replace(/\s/g, '').match( reg );
            });
            me.fill( ret, elem );
        });
        
        jQuery('input[name=RoomCountTo]').keyup(function( e ) {
            var elem = jQuery(this);
            var reg = new RegExp( '^' + elem.val() );
            var ret = me.array4.filter(function(x) {
                return x.replace(/\s/g, '').match( reg );
            });
            me.fill( ret, elem );
        });
        
        jQuery('input[name=PriceFrom]').keyup(function( e ) {
            var elem = jQuery(this);
            var reg = new RegExp( '^' + elem.val() );
            var ret = me.array5.filter(function(x) {
                return x.replace(/\s/g, '').match( reg );
            });
            me.fill( ret, elem );
        });
        
        jQuery('input[name=PriceTo]').keyup(function( e ) {
            var elem = jQuery(this);
            var reg = new RegExp( '^' + elem.val() );
            var ret = me.array6.filter(function(x) {
                return x.replace(/\s/g, '').match( reg );
            });
            me.fill( ret, elem );
        });
           
        jQuery('input[name=AreaFrom], input[name=AreaTo], input[name=RoomCountFrom], input[name=RoomCountTo], input[name=PriceFrom], input[name=PriceTo]').click(function() {
            jQuery('#dom-areafrom-hint, #dom-areato-hint, #dom-roomnumberfrom-hint, #dom-roomnumberto-hint, #dom-pricefrom-hint, #dom-priceto-hint').hide();
            jQuery(this).parent().find('div').show();
            clearInterval( me.interval );
        });
        
        jQuery('input[name=AreaFrom], input[name=AreaTo], input[name=RoomCountFrom], input[name=RoomCountTo], input[name=PriceFrom], input[name=PriceTo]').blur(function() {
            me.interval = setInterval( 'gazetaDomSearch.hideHint()', 1000 );
        });
        
    },
    hideHint: function() {
        var me = gazetaDomSearch;
        jQuery('#dom-areafrom-hint, #dom-areato-hint, #dom-roomnumberfrom-hint, #dom-roomnumberto-hint, #dom-pricefrom-hint, #dom-priceto-hint').hide();
        clearInterval( me.interval );
    },
    load: function( _this ) {
        var me = gazetaDomSearch;
        me.array1 = [];
        me.array2 = [];
        me.array3 = [];
        me.array4 = [];
        me.array5 = [];
        me.array6 = [];
        var html = "";
        switch ( _this.val() ) {
            case "":
            case "50002":
            case "50011":
            case "50012":
                me.array1 = [ "0", "25", "30", "35", "40", "45", "50", "55", "60", "70", "80", "100", "120", "150", "200" ];
                me.array2 = [ "0", "25", "30", "35", "40", "45", "50", "55", "60", "70", "80", "100", "120", "150", "200" ];
                me.array3 = [ "1", "2", "3", "4", "5", "6" ];
                me.array4 = [ "1", "2", "3", "4", "5", "6" ];
                me.array5 = [ "0", "100 000", "200 000", "300 000", "400 000", "500 000", "800 000", "1 000 000", "1 500 000", "2 000 000" ];
                me.array6 = [ "0", "100 000", "200 000", "300 000", "400 000", "500 000", "800 000", "1 000 000", "1 500 000", "2 000 000" ];
                jQuery.each( me.array1, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-areafrom-hint').html( html );
                html = "";
                jQuery.each( me.array2, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-areato-hint').html( html );
                html = "";
                jQuery.each( me.array3, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-roomnumberfrom-hint').html( html );
                html = "";
                jQuery.each( me.array4, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-roomnumberto-hint').html( html );
                html = "";
                jQuery.each( me.array5, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-pricefrom-hint').html( html );
                html = "";
                jQuery.each( me.array6, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-priceto-hint').html( html );
            break;
            case "50001":
                me.array1 = [ "0", "50", "80", "100", "120", "150", "200", "250", "300", "350", "400", "500" ];
                me.array2 = [ "0", "50", "80", "100", "120", "150", "200", "250", "300", "350", "400", "500" ];
                me.array3 = [ "2", "3", "4", "5", "6", "7" ];
                me.array4 = [ "2", "3", "4", "5", "6", "7" ];
                me.array5 = [ "0", "300 000", "400 000", "500 000", "800 000", "1 000 000", "1 500 000", "2 000 000", "3 000 000", "5 000 000" ];
                me.array6 = [ "0", "300 000", "400 000", "500 000", "800 000", "1 000 000", "1 500 000", "2 000 000", "3 000 000", "5 000 000" ];
                jQuery.each( me.array1, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-areafrom-hint').html( html );
                html = "";
                jQuery.each( me.array2, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-areato-hint').html( html );
                html = "";
                jQuery.each( me.array3, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-roomnumberfrom-hint').html( html );
                html = "";
                jQuery.each( me.array4, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-roomnumberto-hint').html( html );
                html = "";
                jQuery.each( me.array5, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-pricefrom-hint').html( html );
                html = "";
                jQuery.each( me.array6, function( index, value ) {
                    html += "<a>" + value + "</a>";
                });
                jQuery('#dom-priceto-hint').html( html );
            break;
        }
        me.mevent();
    },
    removeSpace: function( val ) {
        return val.replace( / /g, "" );
    },
    mevent: function() {
        var me = gazetaDomSearch;
        jQuery('#dom-areafrom-hint a, #dom-areato-hint a, #dom-roomnumberfrom-hint a, #dom-roomnumberto-hint a, #dom-pricefrom-hint a, #dom-priceto-hint a').click(function() {
            jQuery(this).parent().parent().find('input').val( me.removeSpace( jQuery(this).html() ) ).removeClass('placeholder');
            jQuery(this).parent().hide();
        });
    },
    fill: function( _ret, _elem ) {
        var me = gazetaDomSearch;
        var html = "";
        if( _ret.length ) {
            jQuery.each( _ret, function( index, value ) {
                html += "<a>" + value + "</a>";
            });
            _elem.parent().find('div').show();
        } else {
            _elem.parent().find('div').hide();
        }
        _elem.parent().find('div').html( html );
        me.mevent();
    },
	placeholder: {
        init: function(){
	        var me = gazetaDomSearch.placeholder,
	            inputs = jQuery('input[placeholder]');
	  
	        if(inputs.length && !me.placeholderSupport()) {
	            inputs.each(function(){
	                me.placeholderMake(jQuery(this));
	            });
	        }
	    },
        placeholderSupport: function() {
            var i = document.createElement('input');
            return 'placeholder' in i;
        },
        placeholderMake: function($target) {
            if (!$.trim($target.val())) $target.val($target.attr('placeholder')).addClass('placeholder');

            $target.focus(function() {
                if ($target.val() == $target.attr('placeholder')) $target.val('').removeClass('placeholder');
            });

            $target.blur(function() {
                if (!$.trim($target.val())) $target.val($target.attr('placeholder')).addClass('placeholder');
            });
        }
    }
};

// Poprawki dla nowego szukaja Dom i Porta.pl

var fadeInQueue = {
	noOfElementsFadingOut: 0,
	elements: [],
	fadeOutComplete: function () {
		fadeInQueue.noOfElementsFadingOut--;
		if (fadeInQueue.noOfElementsFadingOut <= 0) {
			fadeInQueue.noOfElementsFadingOut = 0;
			while (fadeInQueue.elements.length > 0) {
				fadeInQueue.elements.pop().fadeIn(400);
			}
		}
	},
	add: function (element) {
		fadeInQueue.elements.push(element);
	},
	clear: function () {
		fadeInQueue.elements = [];
	}
};

(function ($) {
	$.fn.clearInput = function () {
		//return;
		return this.each(function () {
			$('input, select', $(this)).each(function () {
				if (this.type === 'checkbox' || this.type === 'radio') {
					this.checked = false;
				} else {
					$(this).val('');
				}
			});
		});
	};
	$.fn.showIf = function (condition) {
		var speedOut = 200;
		return this.each(function () {
			if ($(this).is('option') && $(this).parents('li').length > 0) {
				// jquery selectbox
				if (condition == true) {
					$(this).removeAttr('disabled');
					fadeInQueue.add($(this));
				} else {
					fadeInQueue.noOfElementsFadingOut++;
					$(this).attr('disabled', 'disabled');
					$(this).find('input').attr('disabled', 'disabled');
					$(this).fadeOut(speedOut, fadeInQueue.fadeOutComplete);
				}
			} else {
				// all other DOM elements
				if (condition == true) {
					$(this).removeAttr('disabled');
					$(this).find('input').removeAttr('disabled');
					fadeInQueue.add($(this));
				} else {
					fadeInQueue.noOfElementsFadingOut++;
					$(this).attr('disabled', 'disabled');
					$(this).find('input').attr('disabled', 'disabled');
					$(this).clearInput().fadeOut(speedOut, fadeInQueue.fadeOutComplete);
				}
			}
		});
	};
})(jQuery);

var domiportaSearch = {
    init: function() {
        $('.mod_domiporta2 select.TypOferty').change(function () { domiportaSearch.setParams(); });
        $('.mod_domiporta2 select.TypNieruchomosci').change(function () { domiportaSearch.setParams(); });
        domiportaSearch.setParams();
    },
    setParams: function() {
        var
            $search = $('.mod_domiporta2'),
            typOferty = $search.find('select.TypOferty'),
            typNieruchomosci = $search.find('select.TypNieruchomosci');
        
        fadeInQueue.clear();
        // typ oferty
        $('option[value=Pokoj]', typNieruchomosci).showIf(typOferty.val() != 'Sale');
        
        // pokoje
        $('li.Rooms', $search).showIf(typNieruchomosci.val() == 'Mieszkanie' || typNieruchomosci.val() == 'Dom');
        
        // pietro
        $('li.Pietro', $search).showIf(typNieruchomosci.val() == 'Pokoj');
        
        // cena za metr
        $('li.PricePerMeter', $search).showIf(typNieruchomosci.val() == 'Garaz' || typNieruchomosci.val() == '');
        
        // przeznaczenie
        $('li.Przeznaczenie', $search).showIf(typNieruchomosci.val() == 'Lokal uzytkowy');
        
        // typ działki
        $('li.TypDzialki', $search).showIf(typNieruchomosci.val() == 'Dzialka');
    }
};

domiportaSearch.init();