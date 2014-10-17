if (!window['_avisoPC']) {
(function(){
var _urlMasInformacion   = 'http://www.prisa.com/es/pagina/politica-de-cookies/';
var _idUrlMasInformacion = 'id_enlace_politica_privacidad_cookies';
var _delayMostradoAviso  = 1*1000;
var _nombreCookie        = 'avisopc';
var _hostPeticion        = window.location.hostname;
var _idDivAviso          = 'capaAvisoPoliticaCookies_superior_mensajes';
var _idBotonCerrarAviso  = 'id_boton_cerrar_aviso_pc';
var _idObjetosNoCookie   = Array(
_idUrlMasInformacion
);
var _idObjetosPubli      = Array(
'elpais_gpt',
'gtp_diarioas',
'cds_gpt',
'mainAdContent',
_idDivAviso
);
var _availableY          = 0;
var _altoDivAviso        = 0;
var _esVersionMovil      = false;
var _hayInter            = false;
var _cssStyleComun  = '';
var _cssStyleNormal = '';
var _cssStyleMovil  = '';
_cssStyleNormal += '.capaAvisoPoliticaCookies_superior_mensajes { padding-top: 6px; background: transparent url(http://ep00.epimg.net/iconos/v1.x/v1.0/fondos/bg-000-20.png) repeat 0 0; width: 100%; z-index: 2147483647; bottom: 0px; position: fixed; }\n';
_cssStyleNormal += '.capaAvisoPoliticaCookies_superior_mensajes .inner { background-color: #f8f8f8; border-top: 1px solid #fff; padding: 10px 0; }\n';
_cssStyleMovil += '.capaAvisoPoliticaCookies_superior_mensajes { padding-bottom: 6px; background: transparent url(http://ep00.epimg.net/iconos/v1.x/v1.0/fondos/bg-000-20.png) repeat 0 0; width: 100%; z-index: 2147483647; }\n';
_cssStyleMovil += '.capaAvisoPoliticaCookies_superior_mensajes .inner { background-color: #f8f8f8; border-bottom: 1px solid #fff; padding: 10px 0; }\n';
_cssStyleComun += '.capaAvisoPoliticaCookies_superior_mensajes .contenidoAvisoPoliticaCookies { max-width: 930px; margin: 0 auto; padding: 7px 37px 7px 17px; vertical-align: middle; background-color: #f1f1f1; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; -webkit-box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.2); box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.2); border: 1px solid #ddd; outline: 1px solid #fff; position: relative; }\n';
_cssStyleComun += '.capaAvisoPoliticaCookies_superior_mensajes .contenidoAvisoPoliticaCookies p { font: normal 11px/16px Tahoma, Arial, Helvetica, Garuda, sans-serif; color: #333; text-shadow: 0 1px 0 #fff; margin: 0;}\n';
_cssStyleComun += '.capaAvisoPoliticaCookies_superior_mensajes .contenidoAvisoPoliticaCookies p strong { background:url(http://ep00.epimg.net/iconos/v1.x/v1.0/varios/aviso_cookie.png) 0 3px no-repeat; display:block; padding-left:19px; margin-bottom:3px; line-height:19px; font-weight:bold;}\n';
_cssStyleComun += '.capaAvisoPoliticaCookies_superior_mensajes .contenidoAvisoPoliticaCookies p a { border-bottom:1px solid #0097C7; font-weight:bold; color:#0097c8; }\n';
_cssStyleComun += '.capaAvisoPoliticaCookies_superior_mensajes .contenidoAvisoPoliticaCookies p a:hover { border-bottom-style:dotted; border-bottom-color:#333; }\n'
_cssStyleComun += '.capaAvisoPoliticaCookies_superior_mensajes .contenidoAvisoPoliticaCookies a.cerrarAvisoPoliticaCookies { display: block; width: 16px; height: 16px; background: transparent url(http://ep00.epimg.net/iconos/v1.x/v1.0/varios/cerrar_999.png) no-repeat 0 0; text-indent: 100%; white-space: nowrap; overflow: hidden; position: absolute; right: 8px; top: 12px; }\n';
_cssStyleComun += '.capaAvisoPoliticaCookies_superior_mensajes .contenidoAvisoPoliticaCookies a.cerrarAvisoPoliticaCookies:hover { background-image: url(http://ep00.epimg.net/iconos/v1.x/v1.0/varios/cerrar_333.png); }';
var _htmlDivAviso = '';
_htmlDivAviso +=  '<div class="inner">\n';
_htmlDivAviso +=  '<div class="contenidoAvisoPoliticaCookies">\n';
_htmlDivAviso +=  '<p><strong>Uso de cookies</strong></p>\n';
_htmlDivAviso +=  '<p>Utilizamos cookies propias y de terceros para mejorar la experiencia de navegación, y ofrecer contenidos y publicidad de interés. Al continuar con la navegación entendemos que se acepta nuestra <a target="_blank" id="' + _idUrlMasInformacion + '" href="' + _urlMasInformacion + '">política de cookies</a>.</p>\n';
_htmlDivAviso +=  '<a id="' + _idBotonCerrarAviso + '" title="Cerrar" class="cerrarAvisoPoliticaCookies" href="javascript:void(0);"></a></div>\n';
_htmlDivAviso +=  '</div>';
window['_avisoPC'] = __gestionarEventoAvisoPC;
domready(function() { setTimeout(__init, _delayMostradoAviso) });
function __init() {
try {
if (typeof top.location.href == 'undefined' || top.location.href != location.href) {
return false;
}
} catch (e) {
return false;
}
var _hayCookie = getcookie(_nombreCookie);
if (_hayCookie) {
return false;
}
if (document.getElementById('mainAdContent')) {
_hayInter = true;
}
if (document.getElementById("taptap_superior")) {
_esVersionMovil = true;
}
var _head  = document.head || document.getElementsByTagName('head')[0];
var _style = document.createElement('style');
var _cssStyle = _cssStyleComun;
if (_esVersionMovil) {
_cssStyle = _cssStyleMovil + _cssStyle;
} else {
_cssStyle = _cssStyleNormal + _cssStyle;
}
_style.type = 'text/css';
if (_style.styleSheet){
_style.styleSheet.cssText = _cssStyle;
} else {
_style.appendChild(document.createTextNode(_cssStyle));
}
_head.appendChild(_style);
var _divAviso = document.createElement('div');
_divAviso.id            = _idDivAviso;
_divAviso.className     = 'capaAvisoPoliticaCookies_superior_mensajes';
_divAviso.innerHTML     = _htmlDivAviso;
if (_hayInter) {
var _objInter = document.getElementById('mainAdContent');
if (typeof _objInter.style.zIndex != 'undefined' && _objInter.style.zIndex) {
_divAviso.style.zIndex = parseInt(_objInter.style.zIndex) - 1;
}
}
if (!_esVersionMovil) {
document.body.appendChild(_divAviso);
} else {
document.body.insertBefore(_divAviso, document.body.childNodes[0]);
}
if (document.documentElement.clientHeight >= 0) {
_availableY = document.documentElement.clientHeight;
} else if (document.body && document.body.clientHeight >= 0) {
_availableY = document.body.clientHeight
} else if (window.innerHeight >= 0) {
_availableY = window.innerHeight;
}
_altoDivAviso = document.getElementById(_idDivAviso).offsetHeight;

addEvent(document, 'mousedown',  window['_avisoPC']);
addEvent(document, 'click',      window['_avisoPC']);
addEvent(window,   'scroll',     window['_avisoPC']);
addEvent(document, 'touchstart', window['_avisoPC']);
}
function __gestionarEventoAvisoPC(e) {
if (!e) e = window.event;
var objEvento;
if (e.srcElement) {
objEvento = e.srcElement;
} else {
objEvento = e.target;
}
if (e.type == 'mousedown' || e.type == 'click' || e.type == 'touchstart') {
if (objEvento.id && objEvento.id == _idBotonCerrarAviso) {
document.getElementById(_idDivAviso).style.display = 'none';
if (document.getElementById("mainAdContent")) {
document.getElementById("mainAdContent").style.top = "0px";
}
}
for (var i = 0; i != _idObjetosNoCookie.length; i++) {
if (objEvento.id && objEvento.id == _idObjetosNoCookie[i]) {
return true;
}
}
if (objEvento.id != _idBotonCerrarAviso)
{
for (var i = 0; i != _idObjetosPubli.length; i++) {
var _objTmp = objEvento;
while (_objTmp.parentNode) {
if (_objTmp.id && typeof _objTmp.id.indexOf == 'function' && _objTmp.id.indexOf(_idObjetosPubli[i]) != -1) {
return true;
}
_objTmp = _objTmp.parentNode;
}
}
}
}
if (e.type == 'scroll') {
var newAvailableY = 0;
if (document.documentElement.clientHeight >= 0) {
newAvailableY = document.documentElement.clientHeight;
} else if (document.body && document.body.clientHeight >= 0) {
newAvailableY = document.body.clientHeight
} else if (window.innerHeight >= 0) {
newAvailableY = window.innerHeight;
}
if (_availableY != newAvailableY) {
_availableY = newAvailableY;
return true;
}
}
var _partesHost    = _hostPeticion.split('.');
if (_partesHost.length < 2) {
return true;
}
var _dominioCookie = '.' + 
_partesHost[_partesHost.length-2] + '.' + 
_partesHost[_partesHost.length-1];
if (_partesHost.length > 3) {
_dominioCookie = '.' + _partesHost[_partesHost.length-3] + _dominioCookie;
}
setcookie(_nombreCookie, '1', _dominioCookie, 365*2);
removeEvent(document, 'mousedown',  window['_avisoPC']);
removeEvent(document, 'click',      window['_avisoPC']);
removeEvent(document, 'touchstart', window['_avisoPC']);
setTimeout (function() {
var _intervalAnima;
var _objDivAviso = document.getElementById(_idDivAviso);
var _altoFin     = 0;
_objDivAviso.style.overflow = 'hidden';
if ( _intervalAnima ) clearInterval ( _intervalAnima );
_intervalAnima = setInterval (
function() {
var alto = ((_objDivAviso.offsetHeight > _objDivAviso.style.height) ? 
_objDivAviso.offsetHeight : parseInt(_objDivAviso.style.height));
var incremento = ( _altoFin - alto ) / 2;
if((incremento>0) && (incremento<1)) incremento = 1;
if((incremento<0) && (incremento>-1)) incremento = -1;
if ( _altoFin >= alto ) {
removeEvent(window,   'scroll',     window['_avisoPC']);
clearInterval ( _intervalAnima );
_objDivAviso.style.display = 'none';
}
alto += incremento;
_objDivAviso.style.height = alto + "px";
},
100);
}, 1*1000);
}
function addEvent( el, type, fn ) {
if (el.attachEvent) {
el.attachEvent && el.attachEvent( 'on' + type, fn );
} else {
el.addEventListener( type, fn, false );
}
}
function removeEvent( el, type, fn ) {
if (el.detachEvent) {
el.detachEvent && el.detachEvent( 'on' + type, fn );
} else {
el.removeEventListener( type, fn, false );
}
}
function domready(callback) {
var
done = false,
top = true;
function init(e) {
if (e.type === 'readystatechange' && document.readyState !== 'complete') return;
removeEvent((e.type === 'load' ? window : document), e.type, init);
if (!done) {
done = true;
callback();
}
}
function poll() {
try { document.documentElement.doScroll('left'); } 
catch(e) { setTimeout(poll, 50); return; }
init('poll');
}
if (document.readyState === 'complete') callback();
else {
if (document.createEventObject && document.documentElement.doScroll) {
try { top = !window.frameElement; } catch(e) { }
if (top) poll();
}
addEvent(document, 'DOMContentLoaded', init);
addEvent(document, 'readystatechange', init);
addEvent(window, 'load', init);
}
}
function setcookie(name,value,domain,days) {
if (days) {
var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}
else var expires = "";
document.cookie = name+"="+value+expires+";domain="+domain+";path=/";
}
function getcookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}
}())
}
