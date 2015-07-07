var firstVisitSetCookieInfo = true;

function onLoadCookieMsg() {
   try {
        document.getElementById('cookieMsg').contentWindow.postMessage('cookieInfoChecker',"http://cookie.gazeta.pl");
   } catch(e) {
        if (typeof gazeta_plCookiePolicy.getCookie('cookies-domain-accepted') == 'object') {
            var objCookie = document.getElementById('cookieInfoMsgWrapper');
            if (objCookie) objCookie.style.display = 'block';

            gazeta_plCookiePolicy.setCookie( 'cookies-domain-accepted', true, 999999, '/', document.domain, '');
        };

   };
};

var gazeta_plCookiePolicy = {
    messageActive: null,
    init: function() {
        
        document.write('<div id="cookieInfoMsgWrapper" style="display: none; text-align: left; position: relative; z-index:200000; background: #fff; font: '+gazeta_plCookiePolicy.cookieBrowser.font+' Arial,sans-serif; "><div style="width: '+gazeta_plCookiePolicy.cookieBrowser.width+'; padding: 21px 0 18px; background: #F8F8F8; margin: 0 auto; "><div style=" position: relative; padding: '+gazeta_plCookiePolicy.cookieBrowser.padding+'; color: #444; "><span style="cursor: pointer; position: absolute; '+gazeta_plCookiePolicy.cookieBrowser.close+'" onclick="document.getElementById(\'cookieInfoMsgWrapper\').style.display = \'none\';document.getElementsByTagName(\'html\')[0].className.replace(\'cookieMessage\', \'\');  if(typeof(window.firstVisitSetCookieClose)==\'function\') { firstVisitSetCookieClose() }; if ( typeof gazeta_pl != \'undefined\' ) {if ( typeof gazeta_pl.HP != \'undefined\' ) {if ( typeof gazeta_pl.HP.LeftSideBar != \'undefined\' ) { if ( typeof gazeta_pl.HP.LeftSideBar.init == \'function\' ) {gazeta_pl.HP.LeftSideBar.init();}}}}; return false;" ><img src="http://biv.gazeta.pl/info/regulations/cookie/'+gazeta_plCookiePolicy.cookieBrowser.close_img+'.png" alt="close"/></span><h3 style="margin-bottom: 10px; width: 80%; font-size: '+gazeta_plCookiePolicy.cookieBrowser.headMobi+'; font-weight: bold;">Wa\u017cne: nasze strony wykorzystuj\u0105 pliki cookies.</h3><p style=" font-size: 12px; line-height: '+gazeta_plCookiePolicy.cookieBrowser.pLineHeight+';">U\u017cywamy informacji zapisanych za pomoc\u0105 cookies i podobnych technologii m.in. w celach reklamowych i statystycznych oraz w celu dostosowania naszych serwis\u00f3w do indywidualnych potrzeb u\u017cytkownik\u00f3w. Mog\u0105 te\u017c stosowa\u0107 je wsp\u00f3\u0142pracuj\u0105cy z nami reklamodawcy, firmy badawcze oraz dostawcy aplikacji multimedialnych. W programie s\u0142u\u017c\u0105cym do obs\u0142ugi internetu mo\u017cna <a onmouseover = "this.style.background = \'none\'; this.style.textDecoration = \'underline\'" onmouseout = "this.style.background = \'none\'; this.style.textDecoration = \'none\'" style="font-weight: bold; color: #148;" href="'+gazeta_plCookiePolicy.cookieBrowser.href+'" id="cookieSeeMore">zmieni\u0107 ustawienia</a> dotycz\u0105ce cookies.</p><p style="font-size: 12px; padding: 5px 0 0; line-height: '+gazeta_plCookiePolicy.cookieBrowser.pLineHeight+';">Korzystanie z naszych serwis\u00f3w internetowych bez zmiany ustawie\u0144 dotycz\u0105cych cookies oznacza, \u017ce b\u0119d\u0105 one zapisane w pami\u0119ci urz\u0105dzenia. Wi\u0119cej informacji mo\u017cna znale\u017a\u0107 w naszej  <a onmouseover = "this.style.background = \'none\'; this.style.textDecoration = \'underline\'" onmouseout = "this.style.background = \'none\'; this.style.textDecoration = \'none\'" href="http://serwisy.gazeta.pl/O_nas/1,111259,8856779,Ochrona_prywatnosci.html" style="font-weight: bold; color: #148;">Polityce prywatno\u015bci</a></p></div></div></div>');
        
        if (window.addEventListener) {
            window.addEventListener("message", gazeta_plCookiePolicy.receiveMessage, false);
        } else {
            window.attachEvent("onmessage", gazeta_plCookiePolicy.receiveMessage, false);
        };

    },

    setCookie: function (name, value, expires, path, domain, secure) {

        var today = new Date();
        today.setTime(today.getTime());

        if (expires) expires = expires * 1000 * 60 * 60 * 24;

        var expires_date = new Date(today.getTime() + (expires));

        document.cookie = name + "=" +escape( value ) +
        ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
        ( ( path ) ? ";path=" + path : "" ) +
        ( ( domain ) ? ";domain=" + domain : "" ) +
        ( ( secure ) ? ";secure" : "" );
    },

    getCookie: function (check_name) {
        var
            a_all_cookies = document.cookie.split( ';' ),
            a_all_cookies_l = a_all_cookies.length,
            a_temp_cookie = '',
            cookie_name = '',
            cookie_value = '',
            b_cookie_found = false,
            i = 0;

        for (i; i < a_all_cookies_l; i++) {

            a_temp_cookie = a_all_cookies[i].split( '=' );

            cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

            if (cookie_name == check_name) {
                b_cookie_found = true;

                if (a_temp_cookie.length > 1) cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));

                return cookie_value;
                break;
            };

            a_temp_cookie = null;
            cookie_name = '';

        };

        if (!b_cookie_found) {
            return null;
        };
    },

    screenReset: function () {
        var itvs = setInterval(function() {
            if (typeof(window.firstVisitSetCookieClose) === 'function') {
                clearInterval(itvs);
                firstVisitSetCookieClose();
            };
        }, 100);

    },
    receiveMessage: function(e) {

        if (e.origin == 'http://cookie.gazeta.pl' && typeof e.data === 'string') {
            
            var 
                data = e.data.split(','),
                today = expire = new Date(),
                cookieMsg = document.getElementById('cookieMsg'),
                cookieInfoMsgWrapper = document.getElementById('cookieInfoMsgWrapper'),
                elHtml = document.getElementsByTagName('html');        

            if ((gazeta_plCookiePolicy.cookieBrowser.uaVersion[0] == "Safari" && (data[0] == "true" || data[1] == "true")) || (gazeta_plCookiePolicy.cookieBrowser.uaVersion[0] != "Safari" && data[0] == "true")) {
                gazeta_plCookiePolicy.messageActive = true;

                if (cookieMsg) {
                    document.body.removeChild(cookieMsg);
                };

                if (cookieInfoMsgWrapper) {
                    document.body.removeChild(cookieInfoMsgWrapper);                    
                };
                    
                if (document.cookie.match('cookies-domain-accepted=true') == null && document.location.host != "www.gazeta.pl" ) {
                    gazeta_plCookiePolicy.screenReset();
                };
               
            } else {

                var objCookie = document.getElementById('cookieInfoMsgWrapper');
                if (objCookie) {
                    objCookie.style.display = 'block';                               
                    elHtml[0].className += " cookieMessage";          
                }
                
                
            };
            
            expire.setTime(today.getTime() + 3600000*24*10);
            gazeta_plCookiePolicy.setCookie( 'cookies-domain-accepted', true, expire.toGMTString(), '/', document.domain, '');
            
        };
    },
    cookieBrowser: (function() {
      var
        aN = navigator.appName,
        ua = navigator.userAgent,
        tem = null,
        uaMatch = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
        uaSystem = ua.match(/\(.*\)/g)[0],
        mobile = uaSystem.match(/iPhone|iPod|iPad|blackberry|android|htc|kindle|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|sgh|smartphone|symbian|treo mini|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone/i),
        width = '100%',
        padding = '0 15px',
        data = null,
        font = '12px/15px',
        headMobi = '14px',
        pLineHeight = '14px',
        close = 'right: 5px; top: -2px',
        close_img = 'close_mx',
        url = '',
        links = {
            'firefox': 'http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek',
            'opera': 'http://help.opera.com/Linux/12.10/pl/cookies.html',
            'chrome': 'http://support.google.com/chrome/bin/answer.py?hl=pl&answer=95647',
            'safari': 'http://support.apple.com/kb/ph5042',
            'MSIE': {
                '7.0' : 'http://windows.microsoft.com/pl-pl/internet-explorer/change-ie-settings#ie=ie-8',
                '8.0' : 'http://windows.microsoft.com/pl-pl/internet-explorer/change-ie-settings#ie=ie-8',
                '9.0' : 'http://windows.microsoft.com/pl-pl/internet-explorer/change-ie-settings#ie=ie-9',
                '10.0' : 'http://windows.microsoft.com/pl-pl/internet-explorer/change-ie-settings#ie=ie-10'
            }
        }

        if (uaMatch && (tem = ua.match(/version\/([\.\d]+)/i))!= null) uaMatch[2] = tem[1];

        uaMatch = uaMatch ? [uaMatch[1], uaMatch[2]]: [aN, navigator.appVersion, '-?'];

        if (mobile == null) {
            mobile = 'desktop';
            pLineHeight = '16px';
            headMobi = '16px';
            close_img = 'close';
            width = '940px';
            padding = '0 48px';
            close = 'right: 21px; top: 0';
        };

        url = uaMatch[0] != 'MSIE'
            ? (typeof links[uaMatch[0].toLowerCase()] == 'undefined'
                ? 'http://serwisy.gazeta.pl/O_nas/1,111259,13569538,Instrukcja_zmiany_ustawien_cookies_w_przegladarce.html'
                : links[uaMatch[0].toLowerCase()])
            : links['MSIE'][uaMatch[1]];


        data = { system: mobile, width: width, uaVersion: uaMatch , href: url, font: font, padding: padding, close: close, close_img: close_img, headMobi:headMobi, pLineHeight: pLineHeight}
        return data;
    })()
};

gazeta_plCookiePolicy.init();
