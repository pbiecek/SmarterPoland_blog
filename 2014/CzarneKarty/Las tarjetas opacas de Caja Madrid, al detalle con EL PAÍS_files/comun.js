

var LANG_MSG = { 
"es":{
"trans_no_disponible":"No disponible para este dispositivo",
"trans_no_comenzado" : "La retransmisión aún no ha comenzado",
"trans_reanudara" : "La retransmisión se reanudará en breve",
"trans_finalizada" : "La retransmisión ha finalizado",
"publicidad" : "Publicidad",
"actualizar_plugin" : "Necesitas actualizar tu plugin de Flash",
"no_mp4" : "El navegador no admite vídeo HTML5/MP4",
"no_mp3" : "El navegador no admite audio HTML5/MP3",
"geobloqueado" : "Vídeo no disponible en su zona geográfica",
"bloqueado" : "Contenido compartido bloqueado",
"aun_no_disponible" : "El vídeo no está disponible todavía",
"no_disponible" : "El vídeo ya no está disponible",	
"audio_geobloqueado" : "Audio no disponible en su zona geográfica",			
"audio_aun_no_disponible" : "Audio no disponible todavía",
"audio_no_disponible" : "Audio ya no disponible",
"audio_no_encontrado": "Audio no encontrado",			
"necesita_plugin" : "Necesita instalar el plugin de flash para ver este contenido",
"no_encontrado": "Vídeo no encontrado",
"cerrar" : "Cerrar",
"tamanio_real" : "Tamaño real",
"ver_perfil_eskup" : "Ver perfil en Eskup",
"teclear_usuario" : "Tienes que teclear usuario y contraseña",
"error_correo" : "El campo 'usuario' no parece un correo electrónico. Por favor, revísalo.",
"foto" : "Foto",
"tamanio_ventana" : "Tamaño ventana",
"ver_perfil_completo" : "Ver perfil completo",
"avatar" : "Avatar",
"ver_video": "Ver vídeo",			
"vervideo_svg": "http://ep00.epimg.net/reproductores/vervideo.svg"
},
"pt-br":{ 
"trans_no_disponible":"Indisponível para este dispositivo",
"trans_no_comenzado" : "La retransmisión aún no ha comenzado",
"trans_reanudara" : "La retransmisión se reanudará en breve",
"trans_finalizada" : "La retransmisión ha finalizado",
"publicidad" : "Publicidade",
"actualizar_plugin" : "Você precisa atualizar seu plugin Flash",
"no_mp4" : "O navegador não suporta vídeo HTML5/MP4",
"no_mp3" : "O navegador não suporta HTML5/MP3",
"geobloqueado" : "Vídeo não disponível para sua região",
"bloqueado" : "Contenido compartido bloqueado",
"aun_no_disponible" : "O vídeo ainda não está disponível",
"no_disponible" : "O vídeo não está mais disponível",
"audio_geobloqueado" : "Audio no disponible en su zona geográfica",			
"audio_aun_no_disponible" : "Audio no disponible todavía",
"audio_no_disponible" : "Audio ya no disponible",
"audio_no_encontrado": "Audio no encontrado",
"necesita_plugin" : "Você precisa instalar o plugin flash para ver este conteúdo",
"no_encontrado": "Vídeo não encontrado",
"cerrar" : "Fechar",
"tamanio_real" : "Tamanho real",
"ver_perfil_eskup" : "Ver perfil em Eskup",
"teclear_usuario" : "Digite usuário e senha",
"error_correo" : "O campo 'usuário' não parece ser um e-mail. Por favor, verifique",
"foto" : "Foto",
"tamanio_ventana" : "Tamanho Janela",
"ver_perfil_completo" : "Ver perfil completo",
"avatar" : "Avatar",
"ver_video": "Ver vídeo",
"vervideo_svg": "http://ep00.epimg.net/reproductores/vervideo_pt-br.svg"
},
"ca":{
"trans_no_disponible":"Transmissió no disponible per a aquest dispositiu",
"trans_no_comenzado" : "La retransmissió encara no ha començat",
"trans_reanudara" : "La retransmissió es reprendrà aviat",
"trans_finalizada" : "La retransmissió ha finalitzat",
"publicidad" : "Publicitat",
"actualizar_plugin" : "Necessites actualitzar el teu plugin de Flash",
"no_mp4" : "El navegador no admet vídeo HTML5/MP4",
"no_mp3" : "El navegador no admet HTML5/MP3",
"geobloqueado" : "Vídeo no disponible en la seva zona geogràfica",
"bloqueado" : "Contingut compartit bloquejat",
"aun_no_disponible" : "El vídeo encara no està disponible",
"no_disponible" : "El vídeo ja no està disponible",
"audio_geobloqueado" : "Áudio no disponible en la seva zona geogràfica",			
"audio_aun_no_disponible" : "Àudio no disponible encara",
"audio_no_disponible" : "Àudio ja no disponible",
"audio_no_encontrado": "Áudio no trobat",
"necesita_plugin" : "Necessita instal·lar el plugin de Flash per veure aquest contingut",
"no_encontrado": "Vídeo no trobat",
"cerrar" : "Tancar",
"tamanio_real" : "Mida real",
"ver_perfil_eskup" : "Veure perfil en Eskup",
"teclear_usuario" : "Has de teclejar usuari i contrasenya",
"error_correo" : "El camp 'usuari' no sembla un correu electrònic. Sisplau, revisa'l",
"foto" : "Foto",
"tamanio_ventana" : "Mida finestra",
"ver_perfil_completo" : "Veure perfil complet",
"avatar" : "Avatar",
"ver_video": "Veure Vídeo",
"vervideo_svg": "http://ep00.epimg.net/reproductores/vervideo_ca.svg"
}                            
};
function obtieneIdioma() { 
var metas = document.getElementsByTagName('meta'); 
var idioma = "es";
var idioma_meta = "";
var i;
for (i=0; i<metas.length; i++) { 
if (metas[i].getAttribute("name") == "lang") { 
idioma_meta = (metas[i].getAttribute("content")).toLowerCase();
break;
} 
}     
if ( LANG_MSG.hasOwnProperty(idioma_meta) ) {
idioma = idioma_meta;
}
return(idioma);
}
if (typeof(LANG) == "undefined")
var LANG = obtieneIdioma();
else
{
if ( !LANG_MSG.hasOwnProperty(LANG) )
{
LANG = "es";
}
}

var isOpera = null;
var isSafari = null; 
var isGecko = null;
var isIE = null;
var isMobile = null;
var userAgent = navigator.userAgent.toLowerCase();
var ua=navigator.userAgent, userAgentMatches;
if ((/KHTML/).test(ua)) {
isSafari=1;
}
userAgentMatches=ua.match(/AppleWebKit\/([^\s]*)/);
if (userAgentMatches&&userAgentMatches[1]) {
isSafari=parseFloat(userAgentMatches[1]);
}
if (!isSafari) {
userAgentMatches=ua.match(/Opera[\s\/]([^\s]*)/);
if (userAgentMatches&&userAgentMatches[1]) {
isOpera=parseFloat(userAgentMatches[1]);
} else {
userAgentMatches=ua.match(/MSIE\s([^;]*)/);
if (userAgentMatches&&userAgentMatches[1]) {
isIE=parseFloat(userAgentMatches[1]);
} else {
userAgentMatches=ua.match(/Gecko\/([^\s]*)/);
if (userAgentMatches) {
isGecko=1;
}
}
}
}

if (typeof(UN) == "undefined" )
var UN = "ep";

if (typeof(url_cache) == "undefined" )
var url_cache = "http://ep02.epimg.net";
if (typeof(css_multimedia) == "undefined" )
var css_multimedia = "http://ep00.epimg.net/estilos/multimedia/multimedia_20140407.css";
if (typeof(url_reproductor_epet) == "undefined" )
var url_reproductor_epet = "http://ep00.epimg.net/reproductores/playerPEP.swf";
if (typeof(reproductorAudioPEP) == "undefined" )
var reproductorAudioPEP = "/reproductores/playerAudioPEP_v0.5.swf";
if (typeof(UrlPublicidad) == "undefined")
var UrlPublicidad = "http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F7811748%2Felpais_web%2Fplayer_video%2Fflash&ciu_szs=&impl=s&gdfp_req=1&env=vp&output=xml_vast2&correlator={random}&unviewed_position_start=1";
if (typeof(UrlPublicidadOveron) == "undefined")
var UrlPublicidadOveron = "http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F7811748%2Foveron_player%2Felpais_web%2Fflash&ciu_szs=&impl=s&gdfp_req=1&env=vp&output=xml_vast2&correlator={random}&unviewed_position_start=1";
if (typeof(postroll_HTML5) == "undefined")
var postroll_HTML5 = true;
if (typeof(publicidad_HTML5) == "undefined")
var publicidad_HTML5 = false;
if (typeof(controlesNativosAudio) == "undefined")
var controlesNativosAudio = false;
if (typeof(controlesNativosVideo) == "undefined")
var controlesNativosVideo = false;
if (typeof(orden_busqueda_url_externa) == 'undefined')
var orden_busqueda_url_externa = ["muzu","youtube"];
var code_ima3_HTML5_cargado = "nocargado";
function arreglaUrl(url)
{
var result;
if (!url.match(/youtu/i))
{
if (url.match(/muzu/i))
url = url.replace("/a/","/i/");
return url;
}
else
{
var esYT = /youtube.*\/embed\//i;
if (!esYT.test(url))
{
var reg = /([^\/]*\/\/[^\/]*youtube[^\/]*)\/.*v=([^&]+)/i;
result = reg.exec(url);
if (result)
{
return result[1] + "/embed/" + result[2];
}
else
{
var esYTCorta = /http:\/\/youtu\.be\/([^\?\/]+)/
result = esYTCorta.exec(url);
if (result)
return "http://www.youtube.com/embed/" + result[1];				
}
}
return url;
}
}
if (typeof(eligeUrlenlace) == 'undefined')
{
function eligeUrlenlace(arrayUrls)
{
var n = arrayUrls.length;
if (n == 0)
return "";
if (n == 1)
return arreglaUrl(arrayUrls[0]);
var re;
var regexp;
var cadena_urls;
var result;			
cadena_urls = "||" + arrayUrls.join("||") + "||";		
for (i=0; i< orden_busqueda_url_externa.length; i++)
{
re = "/" + "\\|\\|([^\\/]*\\/\\/[^\\/]*" + orden_busqueda_url_externa[i] + "[^\\/]*\\/?[^\\|\\|]*)\\|\\|" + "/";
regexp = new RegExp(eval(re));
result = regexp.exec(cadena_urls);
if (result)
{
return arreglaUrl(result[1]);
}
}
return arreglaUrl(arrayUrls[0]);
}
}
var PAGE_TITLE = (document.getElementsByTagName('title')[0] ) ? document.getElementsByTagName('title')[0].innerHTML.replace(/'|"|\|/g, "") : "sin título";
var FlashDetect = new function(){
var self = this;
self.release = "1.0.2";
self.installed = false;
self.major = -1;
self.minor = -1;
self.revision = -1;
self.revisionStr = "";
self.activeXVersion = "";
var activeXDetectRules = [
{
"name":"ShockwaveFlash.ShockwaveFlash.7",
"version":function(obj){
return getActiveXVersion(obj);
}
},
{
"name":"ShockwaveFlash.ShockwaveFlash.6",
"version":function(obj){
var version = "6,0,21";
try{
obj.AllowScriptAccess = "always";
version = getActiveXVersion(obj);
}catch(err){}
return version;
}
},
{
"name":"ShockwaveFlash.ShockwaveFlash",
"version":function(obj){
return getActiveXVersion(obj);
}
}
];
var getActiveXVersion = function(activeXObj){
var version = -1;
try{
version = activeXObj.GetVariable("$version");
}catch(err){}
return version;
};
var getActiveXObject = function(name){
var obj = -1;
try{
obj = new ActiveXObject(name);
}catch(err){}
return obj;
};
var parseActiveXVersion = function(str){
var versionArray = str.split(",");
return {
"major":parseInt(versionArray[0].split(" ")[1], 10),
"minor":parseInt(versionArray[1], 10),
"revision":parseInt(versionArray[2], 10),
"revisionStr":versionArray[2]
};
};
var parseRevisionStrToInt = function(str){
return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
};
self.majorAtLeast = function(version){
return self.major >= version;
};
self.FlashDetect = function(){
if(navigator.plugins && navigator.plugins.length>0){
var type = 'application/x-shockwave-flash';
var mimeTypes = navigator.mimeTypes;
if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
var desc = mimeTypes[type].enabledPlugin.description;
var descParts = desc.split(' ');
var majorMinor = descParts[2].split('.');
self.major = parseInt(majorMinor[0], 10);
self.minor = parseInt(majorMinor[1], 10); 
self.revisionStr = descParts[3];
self.revision = parseRevisionStrToInt(self.revisionStr);
self.installed = true;
}
}else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
var version = -1;
for(var i=0; i<activeXDetectRules.length && version==-1; i++){
var obj = getActiveXObject(activeXDetectRules[i].name);
if(typeof obj == "object"){
self.installed = true;
version = activeXDetectRules[i].version(obj);
if(version!=-1){
var versionObj = parseActiveXVersion(version);
self.major = versionObj.major;
self.minor = versionObj.minor; 
self.revision = versionObj.revision;
self.revisionStr = versionObj.revisionStr;
self.activeXVersion = version;
}
}
}
}
}();
};
var versionFlash = FlashDetect.major;
var revisionFlash = FlashDetect.revisionStr;
var subVersionFlash = revisionFlash.replace(/[^\d]+/g, "");
function EPET_FlashHTML(minVersion, source, width, height, op, id){
var self = this; 
var baseElement = document.createElement("div");
var options = arguments[4] || {};
var winIE = ((navigator.appVersion.toLowerCase().indexOf("win")!=-1) && (navigator.appName=="Microsoft Internet Explorer"));
var idCount = EPET_FlashHTML.idCount++;
var namespaceAdded = false;
var namespaceName = "flashtml";
var namespaceURN = "http://www.featureblend.com/2007/flashtml/";
if (typeof(id) == "undefined" )
var id = "objetoFlash" + String(Math.random()).substr(2,9);
var idObjeto = id;
self.domTemplate = "";
self.innerHTML = "";
self.xhtml = "";
self.inDocumentElement = "";
var getCabVersion = function(minVersion){
return minVersion + ",0,0,0";
};
var getNameValueAttrFromOptions = function(name){
return (typeof options[name] != "undefined")?getNameValueAttributes(name, options[name].toString()):"";
};
var getNameValueAttributes = function(name, value){
return {
"@name":name,
"@value":value
};
};
var createElementFromRule = function(name, target){
var newElement = safeCreateElement(name.replace("#",""));
return target.appendChild(newElement);
};
var getID = function(){
if (idObjeto != undefined && idObjeto != "")
return idObjeto;
var patron = /.*\/([\w-]+)\.swf\??/i;
if (patron.test(source))
{
return (RegExp.$1);
}
return "ObjetoSWF";
};
var setAttributeFromRule = function(name, value, target){
target.setAttribute(name.replace("@",""), value);
};
var safeCreateElement = function(name){
if((name=="object" || name=="param") && document.namespaces){
if(!namespaceAdded){
document.namespaces.add(namespaceName, namespaceURN);
namespaceAdded = true;
}
return document.createElement(namespaceName + ":" + name);
}else{
return document.createElement(name);
}
};
var htmlTidy = function(str){
str = str.replace(/<\?xml([^>]*)>/, "");
str = str.replace(eval("/"+namespaceName+":/g"),"");
str = str.replace(/><\/param>/g,">");
str = str.replace(/(<param )(.*?)(>)/g, "<param $2 \/>");
return str;
};
var parseRules = function(position, target){
for(var i in position){
if(i.charAt(0)=="#"){
var appendedElement;
if(typeof position[i] == "object" && position[i].length){
for(var j=0; j<position[i].length; j++){
if(position[i][j]()!==""){
appendedElement = createElementFromRule(i, target);
parseRules(position[i][j](), appendedElement);
}
}
}else if(typeof position[i]=="function" && position[i]()!==""){
appendedElement = createElementFromRule(i, target);
parseRules(position[i](), appendedElement);
}
}else if(i.charAt(0)=="@"){
if(typeof position[i]=="function" && position[i]()!==""){
setAttributeFromRule(i, position[i](), target);
}else if(typeof position[i] == "string"){
setAttributeFromRule(i, position[i], target);
}
}
}
};
var structuralRules = {
"#object":function(){
return {
"@type":function(){
return (!winIE)?"application/x-shockwave-flash":"";
},
"@codebase":function(){
return (winIE)?"http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version="+getCabVersion(minVersion):"";
},
"@classid":function(){
return (winIE)?"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000":"";
},
"@data":function(){
return (!winIE)?source:"";
},
"@width":function(){
return width.toString();
},
"@height":function(){
return height.toString();
},
"@id":function(){
return getID();
},
"@tabindex":function(){
return options.tabindex || "";
},
"#param":[
function(){
return (winIE)?getNameValueAttributes("movie", source):"";
},
function(){
return getNameValueAttrFromOptions("allowscriptaccess");
},
function(){
return getNameValueAttrFromOptions("allowfullscreen");
},
function(){
return getNameValueAttrFromOptions("swliveconnect");
},
function(){
return getNameValueAttrFromOptions("play");
},
function(){
return getNameValueAttrFromOptions("loop"); 
},
function(){
return getNameValueAttrFromOptions("menu"); 
},
function(){
return getNameValueAttrFromOptions("quality"); 
},
function(){
return getNameValueAttrFromOptions("scale"); 
},
function(){
return getNameValueAttrFromOptions("align"); 
},
function(){
return getNameValueAttrFromOptions("salign"); 
},
function(){
return getNameValueAttrFromOptions("wmode"); 
},
function(){
return getNameValueAttrFromOptions("bgcolor");
},
function(){
return getNameValueAttrFromOptions("base");
},
function(){
var result = "";
if(options.flashvars){
var flashVarsStr = (typeof options.flashvars == "object")?EPET_FlashHTML.getQueryStrFromObj(options.flashvars):options.flashvars;
result = getNameValueAttributes("flashvars", flashVarsStr);
}
return result;
}
]
};
}
};
self.append = function(target){
return addToElement(target, false);
};
self.replace = function(target){
return addToElement(target, true);
};
var addToElement = function(target, replace){
var result = false;
var targetObj = (typeof target=="object")?target:document.getElementById(target);
if(!self.inDocumentElement){
if(winIE){
if(replace){
targetObj.innerHTML = self.xhtml;
}else{
targetObj.innerHTML += self.xhtml;
}
self.inDocumentElement = document.getElementById(getID());
window.attachEvent("onunload", self.garbageCollection);
}else{
if(replace){
while (targetObj.firstChild) {
targetObj.removeChild(targetObj.firstChild);
}					
}
self.inDocumentElement = targetObj.appendChild(baseElement.childNodes[0]);
}
result = self.inDocumentElement;
}
return result;
};
self.garbageCollection = function(){
if(winIE && self.inDocumentElement){
self.inDocumentElement = null;
}
};
self.EPET_FlashHTML = function(){
parseRules(structuralRules, baseElement);
self.domTemplate = baseElement.childNodes[0];
self.innerHTML = baseElement.innerHTML;
self.xhtml = htmlTidy(self.innerHTML);
}();
self.writeHTML = function(){
document.write(self.xhtml);
};
}
EPET_FlashHTML.getQueryStrFromObj = function(nameValue){
var str = "";
for(var i in nameValue){
if(nameValue.hasOwnProperty(i)){
str += (encodeURI(i) + "=" + encodeURI(nameValue[i]) + "&");
}
}
return str.substring(0, str.length-1);
};
EPET_FlashHTML.idCount = 0;
EPET_FlashHTML.idPattern = "EPET_FlashHTML_";
EPET_FlashHTML.release = "1.0.1";
function EPET_Grafico_Flash(grafico, GF_version, GF_params, flash_params, GF_width, GF_height, img_altenativa, url_alternativa, texto_alt, idDivContenedor, idObjectFlash)
{
var id_div_Graficoflash;
if (typeof(idDivContenedor) == "undefined" )
{
id_div_Graficoflash =  "div_GraficoFlash_" + String(Math.random()).substr(2,9);
document.write('<div id="' + id_div_Graficoflash + '"></div>');
}
else
id_div_Graficoflash = idDivContenedor;
if (versionFlash >= GF_version)
{
var params = {"menu":"false", "wmode":"window" };
for(var key in flash_params)
{
params[key] = flash_params[key];
}
var cadena_params = "";
for(var key in GF_params)
{
cadena_params += encodeURIComponent(key) + "=" + encodeURIComponent(GF_params[key]) + "&";
}
if (cadena_params.length > 0)
grafico = grafico + "?" + cadena_params.substr(0,cadena_params.length-1);
var objeto_grafico = new EPET_FlashHTML(GF_version, grafico, GF_width, GF_height, params , idObjectFlash);
objeto_grafico.replace(id_div_Graficoflash);
}
else
{
if (img_altenativa != "")
{
document.getElementById(id_div_Graficoflash).innerHTML = "<a href=\"" + url_alternativa + "\" target=\"_blank\" ><img src=\"" + img_altenativa + "\" width=\"" + GF_width + "\" height=\"" + GF_height + "\" border=\"0\"  alt=\"" + texto_alt + "\" /></a>\n";
}
}
}
var EPET_Marcado_Multimedia = function(datosMarcado)
{
this._datosMarcado = datosMarcado;
this.eventos = {};
var evars = '70|8|2|74|42|67|24|25';
this.marcaEvento = function(evento)
{
var event = "";
var key = evento;
switch (evento)
{
case "adStart" :
event = "event13";
key = evento + " _" + this._datosMarcado.adCue;
break;
case "adComplete" :
event = "event14";
key = evento + " _" + this._datosMarcado.adCue;
break;
case "adSkip" :
event = "event15";
key = evento + " _" + this._datosMarcado.adCue;
break;		
case "mediaBegin" :
event = "event11";
break;
case "mediaComplete" :
event = "event12";
break;
case "halfmediaComplete" :
event = "event79";
break;

default :
break;
}
if (this.eventos[key])
return;
this.eventos[key] = 1;
if (event != "")
{
var evars_value = this._datosMarcado.tipoReproduccion + "|" + this._datosMarcado.titulo.replace(/'|"|\|/g, "") + " - " + this._datosMarcado.referencia + "|" + (this._datosMarcado.playerName ? this._datosMarcado.playerName.replace(/'|"|\|/g, ""):"") + "|" + Math.floor(this._datosMarcado.duracion) + "|" + this._datosMarcado.media + "|" + this._datosMarcado.publicidad + (this._datosMarcado.ad != "" ? " " + this._datosMarcado.ad : "" ) + "|" + this._datosMarcado.adCue + "|" + this._datosMarcado.agencia;
if (typeof(launchAjaxOMN) == "function")
launchAjaxOMN(evars, evars_value, event,this._datosMarcado.tags); 
}
}
}
function marcadoReproductorMultimedia(datos)
{
var objetoVideo = MultimediaPEP[datos.id].multimedia;
objetoVideo.marcado(datos);
}
var isIphone = false;
var isIpad = false;
if (userAgent.indexOf("iphone") > -1)
isIphone = true
else
if (userAgent.indexOf("ipad") > -1)
isIpad = true;
var iDevice = (isIphone || isIpad);
var dispositivoMovil = iDevice || userAgent.indexOf("android") > -1 || userAgent.indexOf("mobile") > -1;
var videoFlash =  versionFlash > 10 || (versionFlash == 10 && FlashDetect.minor >= 2);
if (dispositivoMovil && (userAgent.indexOf("firefox") > -1 || userAgent.indexOf("android 2") > -1))
publicidad_HTML5 = false;
var reproduciendo = false;
var MultimediaActual = "";
var MultimediaPEP = {};
var id_pidiendoDatos  = "";
MultimediaPEP['lista_ids'] = "";  
var contadorMultimedia = 0;
function soporteVideo()
{
var v=document.createElement('video');
return typeof(v.canPlayType) != "undefined" && (!!v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,'') || !!v.canPlayType( 'video/mp4; codecs="avc1.42E01E"').replace(/no/,''));
}
var canPlayMP4 = soporteVideo();
var versionMovil = document.location.href.indexOf("elpais.com/m/") > -1;  
var supportsOrientationChange = "onorientationchange" in window;
var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
function EPETaddEvent (element, evento, func) { 
if (document.addEventListener){ 
element.addEventListener(evento, func, false);
} else { 
element.attachEvent('on'+evento, func);
}
}
function EPET_setScrollPosition(val)
{
if (document.documentElement.scrollTop)
document.documentElement.scrollTop  = val
else
window.scrollTo(0,val);
}
function EPET_calculaTopPosition(obj)
{
var curTop = 0;
if (obj.offsetParent) {
do {
curTop += obj.offsetTop;
} while (obj = obj.offsetParent);
}
return curTop;
}
function VideoReproduciendo(id, play)
{
MultimediaReproduciendo(id, play)
}
function MultimediaReproduciendo(id, play)
{
if ( MultimediaActual != "" && id != MultimediaActual)
{
MultimediaPEP[MultimediaActual].multimedia.pause();
if (play)
setTimeout(function() {	MultimediaPEP[id].multimedia.play();}, 300);
}
MultimediaActual = id;
}
function MultimediaReinicio(id)
{
MultimediaPEP[id].multimedia.resetMarcado();
}
function reseteaVideo(datosVideo, id_div_ReproductorVideo,id)
{
MultimediaPEP[id].multimedia.stop();
}
function EPET_PlayerRetransmisionDirecto(datosTransmision, id_divContenedor, estado)
{
var id_div_ReproductorVideo;
if (typeof(id_divContenedor) == "undefined" )
{
id_div_ReproductorVideo = "VideoPlayer_Directo_" + String(Math.random()).substr(2,9);
document.write('<div id="' + id_div_ReproductorVideo + '"></div>');
}
else
id_div_ReproductorVideo = id_divContenedor;	
if (typeof(estado) == "undefined" || estado == "" || estado == 0)
estado = "0";
var texto_error = "";
switch(String(estado))
{
case "1":
texto_error =  LANG_MSG[LANG].trans_no_comenzado; 
break;
case "2":
texto_error = LANG_MSG[LANG].trans_reanudara;
break;
case "3":
texto_error =  LANG_MSG[LANG].trans_finalizada;
break;
default:
texto_error = "";
}
if (texto_error != "")
{
document.getElementById(id_div_ReproductorVideo).onclick = null;
document.getElementById(id_div_ReproductorVideo).innerHTML = '<div class="video_previa video_no_disponible"><div class="fondo_mensaje_video" ><span>' + texto_error + 
'</span></div><img src="' + datosTransmision.caratula + '" width="' +  datosTransmision.ancho + '" height="' +  
datosTransmision.alto + '"/></div>';
}
else
{
datosVideo = {};
datosVideo.playerEPETParams = {"mediaWidth":datosTransmision.ancho, "mediaHeight":datosTransmision.alto, "URLMediaFile":"", "URLMediaStill":datosTransmision.caratula, "URLFirstFrame":"", "compactMode": 'false'};
datosVideo.anchoPlayer = datosTransmision.ancho;
datosVideo.altoPlayer = datosTransmision.alto;
datosVideo.idRefBrightcove = datosTransmision.refRetransmisionBC;
datosVideo.publiActiva = datosTransmision.publicidad;
datosVideo.keywordsVideo = datosTransmision.keywords;
if (datosTransmision.refRetransmisionBC.indexOf("akamai") > -1 || datosTransmision.refRetransmisionBC.indexOf("level3") > -1)
{
if (datosVideo.keywordsVideo == "")
datosVideo.keywordsVideo = "overon_stream";
else
datosVideo.keywordsVideo += ",overon_stream";
}
datosVideo.urlNoticia = document.location.href;
datosVideo.tituloVideo = "Retransmisión en Directo";
datosVideo.tipoReproduccion = "streaming";
datosVideo.m3u8 = datosTransmision.transmision_m3u8 ? datosTransmision.transmision_m3u8 : "";
datosVideo.autoplay = false;
var video = new EPET_Video(datosVideo, id_div_ReproductorVideo);
}
}
function pideDatosVideo(id_video)
{
var url = "http://elpais.com/vdpep/1/?pepid=";
var head = document.getElementsByTagName("head")[0];
if (!MultimediaPEP[id_video])
MultimediaPEP[id_video] = new Object;
if( MultimediaPEP[id_video].script){
head.removeChild(MultimediaPEP[id_video].script);
}
MultimediaPEP[id_video].script = document.createElement("script");
MultimediaPEP[id_video].script.type = "text/javascript";
id_pidiendoDatos = id_video;
MultimediaPEP[id_video].script.src = url + id_video.replace(/\-\d+$/, "");
head.appendChild(MultimediaPEP[id_video].script);
}
function EPET_VideoPlayer_callback(datos)
{
MultimediaPEP[id_pidiendoDatos].multimedia.cargaDatos(datos);
}
function EPET_VideoPlayer (datosVideo, idDivContenedor)
{
var id_div_ReproductorVideo;
if (typeof(idDivContenedor) == "undefined" )
{
id_div_ReproductorVideo = "VideoPlayer_" + String(Math.random()).substr(2,9);
document.write('<div id="' + id_div_ReproductorVideo + '"></div>');
}
else
id_div_ReproductorVideo = idDivContenedor;	
var video = new EPET_Video(datosVideo, id_div_ReproductorVideo);
}
function PlayerMultimedia(datosMultimedia, divMultimedia)
{
var id_div_ReproductorMultimedia;
if (typeof(divMultimedia) == "undefined" )
{
id_div_ReproductorMultimedia = "multimediaPlayer_" + String(Math.random()).substr(2,9);
document.write('<div id="' + id_div_ReproductorMultimedia + '"></div>');
}
else
id_div_ReproductorMultimedia = divMultimedia;	
switch(datosMultimedia.tipo)
{
case "video":
if (datosMultimedia.id_referencia)
datosMultimedia.idRefBrightcove = datosMultimedia.id_referencia;
if (datosMultimedia.id)
datosMultimedia.id_video = datosMultimedia.id;
if (datosMultimedia.player)
datosMultimedia.playerVideo = datosMultimedia.player;
if (datosMultimedia.titulo)
datosMultimedia.tituloVideo = datosMultimedia.titulo;
if (datosMultimedia.keywords)
datosMultimedia.keywordsVideo = datosMultimedia.keywords;
if (!datosMultimedia.playerEPETParams)
datosMultimedia.playerEPETParams = {"mediaWidth":datosMultimedia.anchoPlayer, "mediaHeight":datosMultimedia.altoPlayer, "URLMediaFile":"", "URLMediaStill":datosMultimedia.poster, "URLFirstFrame":"", "compactMode": 'false'};
var video = new EPET_Video(datosMultimedia, id_div_ReproductorMultimedia);
break;
case "audio":
if (datosMultimedia.id)
datosMultimedia.id_audio = datosMultimedia.id;
if (datosMultimedia.player)
datosMultimedia.playerAudio = datosMultimedia.player;
if (datosMultimedia.titulo)
datosMultimedia.tituloAudio = datosMultimedia.titulo;
if (datosMultimedia.keywords)
datosMultimedia.keywordsAudio = datosMultimedia.keywords;			
var audio = new EPET_Audio(datosMultimedia, id_div_ReproductorMultimedia);
break;
case "externo":
var url = datosMultimedia.src;
if (datosMultimedia.src && datosMultimedia.src.substr(datosMultimedia.src.length -3,3) == "mp3")
{
datosMultimedia.id_audio = String(Math.random()).substr(2,9);
if (datosMultimedia.player)
datosMultimedia.playerAudio = datosMultimedia.player;
if (datosMultimedia.titulo)
datosMultimedia.tituloAudio = datosMultimedia.titulo;
if (datosMultimedia.keywords)
datosMultimedia.keywordsAudio = datosMultimedia.keywords;			
var audio = new EPET_Audio(datosMultimedia, id_div_ReproductorMultimedia);
}
else
{
var url = eligeUrlenlace(datosMultimedia.urls);
if (url != "")
{
var iframe = document.createElement("iframe");
iframe.setAttribute("width",datosMultimedia.anchoPlayer);
iframe.setAttribute("height",datosMultimedia.altoPlayer);
iframe.setAttribute("scrolling", "no");
iframe.frameBorder = 0;
if (document.location.href.indexOf("autoplay=1") > -1 && !reproduciendo)
{
reproduciendo = true;
datosMultimedia.autoplay = true;
setTimeout(function(){
var posVideo = EPET_calculaTopPosition(document.getElementById(id_div_ReproductorMultimedia));
var DimsNav = EPETBrowserDims();
if (posVideo > DimsNav.alto)
EPET_setScrollPosition(parseInt(posVideo) - 90);
},300);
}
if (datosMultimedia.autoplay)
{
if (url.match(/muzu/i))
{
url = url.replace(/&(amp;)?autostart=n/,"");
url += "&autostart=y";
}
else
if (url.match(/youtube/i))
url += "?autoplay=1";
}
if (url.match(/youtube/i))
{
if(url.indexOf('?') > -1) 
url += "&wmode=transparent";
else
url += "?wmode=transparent";
}
iframe.src = url;
document.getElementById(id_div_ReproductorMultimedia).appendChild(iframe);
}
}
break;
default:
break;
}
}
var css_multimedia_cargado = false;
var EPET_Video = function(datosVideo,  idDivVideo)
{
if (datosVideo.idRefBrightcove)
datosVideo.id_referencia = datosVideo.idRefBrightcove;
if (datosVideo.playerVideo)
datosVideo.player = datosVideo.playerVideo;
if (datosVideo.tituloVideo)
datosVideo.titulo = datosVideo.tituloVideo;
if (datosVideo.keywordsVideo)
datosVideo.keywords = datosVideo.keywordsVideo;
var _datosVideo = datosVideo;
var _idDivVideo = idDivVideo;
var cadena_titulo;
if (_datosVideo.tituloVideo != undefined && _datosVideo.tituloVideo != "")
cadena_titulo = _datosVideo.tituloVideo;
else
cadena_titulo = PAGE_TITLE;	
var _id_video;
if (_datosVideo.id_video)
_id_video = _datosVideo.id_video;
else
{
if (_datosVideo.un)
UN = _datosVideo.un;
_id_video = _datosVideo.id_referencia + UN;
}
_id_video += '-' + (++contadorMultimedia);
_datosVideo.id_video = _id_video;
MultimediaPEP[_id_video] = new Object();		
MultimediaPEP[_id_video].multimedia = this;
var primero_flash = videoFlash && !versionMovil;
if (_datosVideo.forzarHTML5 != undefined && _datosVideo.forzarHTML5)
primero_flash = false;
var _postroll_HTML5 = postroll_HTML5;	
var _divVideo = document.getElementById(_idDivVideo);
_divVideo.className = "video_MPEP";
var _marcado = new EPET_Marcado_Multimedia({"referencia":_datosVideo.id_video,"titulo": cadena_titulo, "agencia": _datosVideo.keywordsVideo != undefined ? _datosVideo.keywordsVideo : "", "media":"vídeo" });
if (datosVideo.tipoReproduccion && datosVideo.tipoReproduccion == "streaming")
{
_marcado._datosMarcado.tipoReproduccion = "streaming";
_postroll_HTML5 = false;
}
else
_marcado._datosMarcado.tipoReproduccion = "vod";
var _idPosicionador = "posicionador_" + _id_video;
var _idDivImage = "divimg_" + _id_video;
var _imgCaratula = "caratula_" + _id_video;
var _idObjeto = "obj_" + _id_video;	
var _duration = 0;
var _firstTime = false;
var _anchoMovil = _datosVideo.anchoPlayer;
var _altoMovil = _datosVideo.altoPlayer;
var fullscreen_HTML5 = false;
var _resizeTM;
var _mainController;
var intervalTimmerFotograma;	
var urlAdServer;
var _HTML5vsFLASH = "";  
if (versionMovil)
{
_altoMovil = Math.floor(_divVideo.parentNode.offsetWidth * _datosVideo.altoPlayer / _datosVideo.anchoPlayer);
_anchoMovil = (_divVideo.parentNode.offsetWidth);
_datosVideo.anchoPlayer = _anchoMovil;
_datosVideo.altoPlayer = _altoMovil;
_divVideo.style.overflow = "hidden";
EPETaddEvent(window, orientationEvent, function(){
clearTimeout(_resizeTM);
_resizeTM = setTimeout( function() {
changeOrientation()}, 300)
});
}
_divVideo.style.width = _datosVideo.anchoPlayer + "px"
_divVideo.style.height = _datosVideo.altoPlayer + "px";
if (!dispositivoMovil && document.location.href.indexOf("autoplay=1") > -1 && !reproduciendo)
{
reproduciendo = true;
_datosVideo.autoplay = true;
var posVideo = EPET_calculaTopPosition(_divVideo);
var DimsNav = EPETBrowserDims();
if (posVideo > DimsNav.alto)
EPET_setScrollPosition(posVideo - 30);	
}
var _divCaratula = document.createElement("div");
_divCaratula.id = _idDivImage;
_divCaratula.style.zIndex = 1;
_divCaratula.className = "img_MPEP";
_divCaratula.style.width = _datosVideo.anchoPlayer + "px";
_divCaratula.style.height = _datosVideo.altoPlayer + "px";
var codigoVideo = '<a class="posicionador" id="' + _idPosicionador + '" title="'+LANG_MSG[LANG].ver_video+'" href="javascript:void(0)">';
if (_anchoMovil > 300)
codigoVideo += '<span class="mosca_elpaistv"></span>';
var cod_img;
if (typeof(window.lzld) == 'function')
cod_img = '<img border="0" width="' + _datosVideo.anchoPlayer + '" height="' + _datosVideo.altoPlayer +'" id="' + _imgCaratula + '" onload="lzld(this)" src="/t.gif" data-src="' + _datosVideo.playerEPETParams["URLMediaStill"] + '" style="height:' + _datosVideo.altoPlayer + 'px" />';
else
cod_img = '<img border="0" width="' + _datosVideo.anchoPlayer + '" height="' + _datosVideo.altoPlayer +'" id="' + _imgCaratula + '" src="' + _datosVideo.playerEPETParams["URLMediaStill"] + '" style="height:' + _datosVideo.altoPlayer + 'px" />';
codigoVideo += '<span class="boton_video"></span>' + cod_img + '</a>';	
_divCaratula.innerHTML = codigoVideo;	
_divVideo.appendChild(_divCaratula);
var _span = document.getElementById(_idPosicionador);
if (_datosVideo.autoplay && !dispositivoMovil)
{
if (!isIE && code_ima3_HTML5_cargado == "nocargado")
{
code_ima3_HTML5_cargado = "cargado";
var ss = document.createElement('script');
ss.type= 'text/javascript';
ss.src = '//s0.2mdn.net/instream/html5/ima3.js';
document.getElementsByTagName('head')[0].appendChild(ss);
}
if ( !css_multimedia_cargado)
{
css_multimedia_cargado = true;
loadCSS(css_multimedia, function(){setTimeout(dibujaPlayer,1500)});
EPETaddEvent(document, mouseWheelEvent, wheel);
}
_span.className += " video_cargando";
intervalTimmerFotograma = setTimeout(function(){_divCaratula.style.display = "none";},4000);
}
else
{
if ( !css_multimedia_cargado)
{
css_multimedia_cargado = true;
var css = document.createElement("link");
css.type = "text/css";
css.rel = "stylesheet";
css.href = css_multimedia;
document.getElementsByTagName("head")[0].appendChild(css);
EPETaddEvent(document, mouseWheelEvent, wheel);		
}		
if (!isIE && code_ima3_HTML5_cargado == "nocargado")
{
code_ima3_HTML5_cargado = "cargando";
var ss = document.createElement('script');
ss.type= 'text/javascript';
ss.src = '//s0.2mdn.net/instream/html5/ima3.js';
if (document.all)
ss.onreadystatechange = function(){ 
if (ss.readyState == 'complete' || ss.readyState == 'loaded')
code_ima3_HTML5_cargado = "cargado";
}
else
ss.onload = function() {
code_ima3_HTML5_cargado = "cargado";
};
document.getElementsByTagName('head')[0].appendChild(ss);		
}
_divVideo.onclick = function() 
{
_divVideo.onclick = null;
_span.className += " video_cargando";		
intervalTimmerFotograma = setTimeout(function(){_divCaratula.style.display = "none";},4000);
dibujaPlayer();
MultimediaReproduciendo(_datosVideo.id_video, false); 
}
}
function changeOrientation()
{
_datosVideo.altoPlayer = Math.floor(_divVideo.parentNode.offsetWidth * _datosVideo.altoPlayer / _datosVideo.anchoPlayer);
_datosVideo.anchoPlayer = (_divVideo.parentNode.offsetWidth);
if ( _divCaratula.style.display != "none")
{
_divCaratula.style.width = _datosVideo.anchoPlayer + "px";
_divCaratula.style.height = _datosVideo.altoPlayer + "px";
document.getElementById(_imgCaratula).style.width = _datosVideo.anchoPlayer + "px";
document.getElementById(_imgCaratula).style.height = _datosVideo.altoPlayer + "px";
}
else
{
if (_datosVideo.nodoVideo != null)
{
_datosVideo.nodoVideo.setAttribute("width", _datosVideo.anchoPlayer);
_datosVideo.nodoVideo.setAttribute("height", _datosVideo.altoPlayer);
if (!isIphone)
{
}
}
}
_divVideo.style.width = _datosVideo.anchoPlayer + "px";
_divVideo.style.height = _datosVideo.altoPlayer + "px";	
}	
function ocultaFotograma()
{
clearTimeout(intervalTimmerFotograma);
_divCaratula.style.display = "none";
}
function dibujaPlayer()
{
if (typeof(_datosVideo.publiActiva) == "string")
if (_datosVideo.publiActiva == "true")
_datosVideo.publiActiva = true;
else
{
_datosVideo.publiActiva = false;
}
if (!_datosVideo.seekTimeout)
_datosVideo.seekTimeout = 7;
if (_datosVideo.publiActiva)
{
_datosVideo.publicidad_pre_roll = true;
_datosVideo.publicidad_post_roll = true;
}
else
{
_datosVideo.publicidad_pre_roll = false;
_datosVideo.publicidad_post_roll = false;			
}
_marcado._datosMarcado.publicidad = _datosVideo.publiActiva ? "con publicidad" : "sin publicidad";
var keywords = "";
if (_datosVideo.tagsNombreNormalizado != undefined && _datosVideo.tagsNombreNormalizado != "")
keywords = _datosVideo.tagsNombreNormalizado;
else
if (typeof(listado_norm_tags) != "undefined" && listado_norm_tags != "")
keywords = listado_norm_tags;
if (_datosVideo.keywordsVideo != undefined && _datosVideo.keywordsVideo != "")
{
if (keywords != "")
keywords += "," + _datosVideo.keywordsVideo;
else
keywords = _datosVideo.keywordsVideo;
}
keywords = "&cust_params=paiskey%3D" + escape(keywords) + "%26pos%3D{cuePointType}";
if (_datosVideo.keywordsVideo.indexOf("agencia_overonaelpais") > -1 || _datosVideo.keywordsVideo.indexOf("agencia_reuters_live") > -1 || _datosVideo.keywordsVideo.indexOf("overon_stream") > -1)
urlAdServer = UrlPublicidadOveron + keywords;
else
urlAdServer = UrlPublicidad + keywords;
_marcado._datosMarcado.duracion = 0;
_marcado._datosMarcado.adCue = "";
_marcado._datosMarcado.ad = "";		
if (_datosVideo.tagsIds != undefined && _datosVideo.tagsIds != "")
{
_marcado._datosMarcado.tags = ';' + _datosVideo.tagsIds.replace(/,/g, ",;");
}
if ( primero_flash)
{
_HTML5vsFLASH = "flash";
pideDatosVideo(_id_video);
}
else
{
if (canPlayMP4)
{
_HTML5vsFLASH = "html5";
creaPlayerHTML5();
}
else
{
if  (videoFlash )
{
_HTML5vsFLASH = "flash";
pideDatosVideo(_id_video);
}
else
sinPlayer();
}
}
}
function creaPlayerFlash()
{		
_datosVideo.adServerURL = urlAdServer + "%26fpd%3Dvpaid";
var params = {"menu":"false", "wmode":"opaque", "allowscriptaccess":"always", "bgcolor":"#000000", "allowfullscreen":"true" };
for(var key in _datosVideo.playerEPETOpcionesSWF)
{
params[key] = _datosVideo.playerEPETOpcionesSWF[key];
}
_datosVideo.autoplay = true;
_datosVideo.idioma = LANG;
params["flashvars"] = "datosVideo=" + escape(JSON.stringify(_datosVideo));
var multimedia_player;
multimedia_player = new EPET_FlashHTML(10, url_reproductor_epet, _datosVideo.anchoPlayer, _datosVideo.altoPlayer, params, _idObjeto );
multimedia_player.replace(_idDivVideo);
ocultaFotograma();
}
function creaPlayerHTML5()
{
if (_datosVideo.tipoReproduccion != undefined && _datosVideo.tipoReproduccion == "streaming")
{ 
if (_datosVideo.m3u8 == undefined || _datosVideo.m3u8 == "" || !(iDevice || userAgent.indexOf("android 4") > -1))
{
sinPlayer(1);
return;
}
}
if (_datosVideo.publiActiva && publicidad_HTML5 &&  code_ima3_HTML5_cargado == "cargado" )
{
_datosVideo.publicidad_pre_roll = true;
_datosVideo.publicidad_post_roll = _postroll_HTML5;
}
else
{
_datosVideo.publiActiva = false;
_datosVideo.publicidad_pre_roll = false;
_datosVideo.publicidad_post_roll = false;
}
if (_marcado._datosMarcado.tipoReproduccion == "streaming")
_marcado._datosMarcado.playerName = "HTML5 VÍDEO V2 - Transmisiones";
else
_marcado._datosMarcado.playerName = "HTML5 VÍDEO V2";
_datosVideo.marcado = _marcado;
_datosVideo.adServerURL = urlAdServer.replace("%2Fflash","%2Fhtml5");	
_datosVideo.nodoVideo = document.createElement("video");
if (dispositivoMovil)
_datosVideo.nodoVideo.play();
_mainController = new MainController(new playerHTML5(_divVideo,_datosVideo));
pideDatosVideo(_id_video);
ocultaFotograma();		
} 
function sinPlayer(cod)
{
clearTimeout(intervalTimmerFotograma);
_span.parentNode.parentNode.className += " video_previa video_no_disponible";
var spanFondo = document.createElement("span");
spanFondo.className = "fondo_mensaje_video";
var spanBoton = document.createElement("span");
spanFondo.appendChild(spanBoton);
_span.parentNode.appendChild(spanFondo);
if (cod)
{
spanBoton.innerHTML = LANG_MSG[LANG].trans_no_disponible;
}
else
{
if (versionFlash > 0) {
spanBoton.innerHTML = LANG_MSG[LANG].actualizar_plugin;
}
else {
spanBoton.innerHTML = LANG_MSG[LANG].no_mp4;			
}
}
}
this.objvideo = function()
{
return _datosVideo.nodoVideo;
}
this.cargaDatos = function(datos)
{
if (typeof(datos) == "undefined")
{
return;
}
if ((!datos.mp4 || datos.mp4.indexOf("http") != 0) && _datosVideo.playerEPETParams.URLMediaFile && _datosVideo.playerEPETParams.URLMediaFile != "")
{
datos.status = 100;
datos.mp4 = _datosVideo.playerEPETParams.URLMediaFile;
datos.ftgrm1 = _datosVideo.playerEPETParams.URLMediaStill;
}
if ( datos.status != 100)
{
EPET_VideoPlayerBloqueado(datos.id_video, _datosVideo.anchoPlayer, _datosVideo.altoPlayer, _datosVideo.playerEPETParams.URLMediaStill, datos.status, _idDivVideo);
return;
}
var cad_video = datos.mp4.replace(/^.*\//,"");
if (cad_video != "" && MultimediaPEP['lista_ids'].indexOf(cad_video) != -1)
{
_datosVideo.publiActiva = false;
}
else
MultimediaPEP['lista_ids'] += "," + cad_video;
_datosVideo.playerEPETParams.URLMediaFile = (datos.mp4.indexOf('/') == 0) ? url_cache + datos.mp4 : datos.mp4;
_datosVideo.playerEPETParams.URLFirstFrame = (datos.ftgrm1.indexOf('/') == 0) ? url_cache + datos.ftgrm1 : datos.ftgrm1;
_datosVideo.src = _datosVideo.playerEPETParams.URLMediaFile;
_datosVideo.poster = _datosVideo.playerEPETParams.URLFirstFrame;
if (datos.sprite && !_datosVideo.spriteImg)
{
_datosVideo.spriteImg = ( datos.sprite.indexOf('/') == 0) ? url_cache + datos.sprite :datos.sprite;
_datosVideo.nSprites = (datos.n_sprites) ? datos.n_sprites : 0;
}
if (_datosVideo.playerEPETParams.URLMediaFile.indexOf("rtmp") == 0)
_datosVideo.rtmpStream = datos.rtmpStream;
if (_HTML5vsFLASH == "flash")
creaPlayerFlash();
else
{
_mainController.cargaDatos(_datosVideo);
}
}	
this.play = function()
{
if (_HTML5vsFLASH == "flash")
{
if (document.getElementById(_idObjeto))
{
document.getElementById(_idObjeto).playjs();
}
}
else
{
_datosVideo.nodoVideo.play();
}
MultimediaReproduciendo(_datosVideo.id_video, false);
}
this.pause = function()
{
if (_HTML5vsFLASH == "flash")
{
if (document.getElementById(_idObjeto))
document.getElementById(_idObjeto).pausejs();
}
else
{
if (isIpad)
{
if ( _mainController.adPlaying)
{
_mainController.restart();
_mainController.playerHTML5.adContainer.innerHTML = "";
_mainController.playerHTML5.controles.style.display = 'none';
_mainController.playerHTML5.adContainer.style.display = 'none';
}
}
_mainController.pause();
}
}
this.stop = function()
{
if (_HTML5vsFLASH == "html5")
{
_mainController.restart();
}
}	
this.marcado = function(datos)
{
if (datos.duracion != undefined)
_marcado._datosMarcado.duracion = datos.duracion;
if (datos.playerName != undefined)
_marcado._datosMarcado.playerName = datos.playerName;
if (datos.ad != undefined)
_marcado._datosMarcado.ad = datos.ad;
if (datos.adCue != undefined)
_marcado._datosMarcado.adCue = datos.adCue;	
if (datos.evento == "adStart" || datos.evento == "adComplete" || datos.evento == "adSkip" || datos.evento == "mediaBegin" || datos.evento == "mediaComplete" || datos.evento == "halfmediaComplete" )
_marcado.marcaEvento(datos.evento);		
}
this.seek = function(segundo)
{
if (_HTML5vsFLASH == "flash")
{
if (document.getElementById(_idObjeto))
{
document.getElementById(_idObjeto).seekjs(segundo);
}
}
else
{
if (_HTML5vsFLASH == "html5")
{
if (_mainController.adPlaying)
return;
_mainController.seekjs(segundo);
}
}
MultimediaReproduciendo(_datosVideo.id_video, false);
}	
this.resetMarcado = function()
{
_marcado.eventos = {};
}
}
var playerHTML5 = function(contenedor, datosVideo) 
{
this.contenedorVideo = typeof contenedor == 'object' ? contenedor : document.getElementById(contenedor);
this.datosVideo = datosVideo;
this.width = this.datosVideo.anchoPlayer;
this.height = this.datosVideo.altoPlayer;
this.contenedorVideo.style.width = this.width + "px";
this.contenedorVideo.style.height = this.height + "px";
this.contenedorVideo.className = "playerMPEPV_c_video playerMPEPV_unselectable";
this.adContainer = null;
this.controles = null;
this.adTagUrl = this.datosVideo.adServerURL;
this.primeraVez = true;
this.autoplay = this.datosVideo.autoplay;
this.controlesNativosVideo = controlesNativosVideo ? controlesNativosVideo : (dispositivoMovil ? true : false);
this.adSaltar = null;
this.playing = false;
this.marcado = this.datosVideo.marcado;
this.nodoVideo = this.datosVideo.nodoVideo;
this.nodoVideo.setAttribute("width", this.width);
this.nodoVideo.setAttribute("height", this.height);
this.nodoVideo.style.position = 'absolute';
this.nodoVideo.style.zIndex = 0;
this.nodoVideo.style.top = '0px';
this.nodoVideo.style.left = '0px';
this.nodoVideo.setAttribute("id", "pepvideo_" + this.datosVideo.id_video);	
this.nodoVideo.setAttribute("poster", this.datosVideo.playerEPETParams.URLMediaStill); 
this.nodoVideo.style.display = 'none';
this.contenedorVideo.appendChild(this.nodoVideo); 
this.volumenActual = this.nodoVideo.volume;
if (typeof(google) == "undefined" || typeof(google.ima) == "undefined")
this.datosVideo.publiActiva = false;
if (this.datosVideo.publiActiva)
{
this.adContainer = document.createElement('div');
this.adContainer.style.position = "absolute";
this.adContainer.style.cursor = "pointer";
this.adContainer.style.left = "0px";
this.adContainer.style.top = "0px";
this.adContainer.style.width = this.width + "px";
this.adContainer.style.height = this.height + "px";
this.adContainer.style.zIndex = 2;
this.contenedorVideo.appendChild(this.adContainer);
if (!isIphone)
{
this.creaControles();	
this.adSaltar = document.createElement('div');
this.adSaltar.className = "playerMPEPV_adsaltar";
if (dispositivoMovil)
this.adSaltar.innerHTML = '<img src="'+ LANG_MSG[LANG].vervideo_svg+'" width="146" height="40" border="0" style="width:146px;height:40px" \/>';
else
this.adSaltar.innerHTML = '<img src="'+ LANG_MSG[LANG].vervideo_svg+'" width="84" height="23" border="0" style="width:84px;height:23px" \/>';
this.contenedorVideo.appendChild(this.adSaltar);	
}
}
else
{
this.nodoVideo.style.display = 'block';
if (this.controlesNativosVideo)
this.nodoVideo.setAttribute ( "controls" , "controls" );
else
this.creaControles();
}
};
playerHTML5.prototype.preloadContent = function(contentLoadedAction) {
if (dispositivoMovil) 
{
this.nodoVideo.addEventListener(
'loadedmetadata',
contentLoadedAction,
false);
this.nodoVideo.load();
} 
else 
contentLoadedAction();
};
playerHTML5.prototype.play = function() {
this.nodoVideo.play();
this.playing = true;
if (!this.controlesNativosVideo && this.controles)
this.controles.playpause.className = "playerMPEPV_boton_play_pause playerMPEPV_boton_pause";
MultimediaReproduciendo(this.datosVideo.id_video, false); 
};
playerHTML5.prototype.pause = function() {
this.nodoVideo.pause();
this.playing = false;
if (!this.controlesNativosVideo && this.controles)
this.controles.playpause.className = "playerMPEPV_boton_play_pause playerMPEPV_boton_play";
};
playerHTML5.prototype.setVolume = function(volumen) {
if (volumen > 1 || volumen < 0 )
return;
this.nodoVideo.volume = volumen;
this.actualizaVolumen();
};
playerHTML5.prototype.actualizaVolumen = function() 
{
var volumen = this.nodoVideo.volume || 0;
if (volumen == 0)
this.controles.volumen.nivel.style.height = '0px';
else
this.controles.volumen.nivel.style.height = (this.controles.volumen.maximo * volumen) + 'px';
};
playerHTML5.prototype.resize = function(
position, top, left, width, height) {
this.videoPlayerContainer.style.position = position;
this.videoPlayerContainer.style.top = top + 'px';
this.videoPlayerContainer.style.left = left + 'px';
this.videoPlayerContainer.style.width = width + 'px';
this.videoPlayerContainer.style.height = height + 'px';
this.nodoVideo.style.width = width + 'px';
this.nodoVideo.style.height = height + 'px';
};
playerHTML5.prototype.getVideoPlayer = function() {
return this.nodoVideo;
};
playerHTML5.prototype.creaControles = function() {
this.controles = document.createElement("div");
this.controles.className = "playerMPEPV_controles";
this.controles.style.zIndex = "10";
this.controles.style.width =  (this.width >  640 ? 640 : this.width) + "px";
this.controles.style.visibility = 'hidden';
var ancho_controles = 0;
var boton_play_pause = document.createElement("span");
boton_play_pause.className = "playerMPEPV_boton_play_pause playerMPEPV_boton_play";
var em = document.createElement("em");
em.appendChild ( document.createTextNode ( "PLAY" ) );
boton_play_pause.appendChild(em);			
this.controles.appendChild(boton_play_pause);
this.controles.playpause = boton_play_pause;
var tiempo = document.createElement("span");
tiempo.className = "playerMPEPV_posicion";			
em = document.createElement("em");
em.appendChild ( document.createTextNode ( "00:00" ) );
tiempo.appendChild(em);
tiempo.texto = em;		
this.controles.appendChild(tiempo);
this.controles.tiempo = tiempo;
var barra = document.createElement("span");
barra.className = "playerMPEPV_barra";
em = document.createElement("em");
barra.appendChild(em);	
barra.progreso = em;
var sliderseek = document.createElement("div"); 
sliderseek.className = "playerMPEPV_sliderseek";
barra.appendChild(sliderseek);
barra.sliderseek = sliderseek;
this.controles.appendChild(barra);
this.controles.barra = barra;
var duracion = document.createElement("span");
duracion.className = "playerMPEPV_duracion";
em = document.createElement("em");
em.appendChild ( document.createTextNode ( "00:00" ) );
duracion.appendChild(em);			
duracion.texto = em;
this.controles.appendChild(duracion);
this.controles.textoDuracion = duracion;
var pantalla_completa = document.createElement("span");
pantalla_completa.className = "playerMPEPV_pantalla_completa";	
pantalla_completa.innerHTML = "PC";		
this.controles.appendChild(pantalla_completa);			
this.controles.fullscreen = pantalla_completa;
var volumen = document.createElement("span");
em = document.createElement("em");
var altavoz = document.createElement("span");
altavoz.className = "playerMPEPV_altavoz";			
em.appendChild ( altavoz );
volumen.appendChild(em);
this.controles.appendChild(volumen);
volumen.altavoz = em;
volumen.style.position = "relative";
var slider = document.createElement("div");
slider.className = "playerMPEPV_slider";
var selectorNivel = document.createElement("div"); 
selectorNivel.className = 'playerMPEPV_selector_nivel';
selectorNivel.id = "vdpep_audio"
slider.appendChild(selectorNivel);
var nivel = document.createElement("div"); 
nivel.className = "playerMPEPV_nivel_slider";
slider.appendChild(nivel);
volumen.appendChild(slider);
volumen.slider = slider;
volumen.selectorNivel = selectorNivel;
volumen.nivel = nivel;
this.contenedorVideo.appendChild(this.controles);
this.controles.volumen = volumen;
slider.style.bottom = ( volumen.offsetHeight ) + "px";
ancho_controles += boton_play_pause.offsetWidth;
ancho_controles += tiempo.offsetWidth;	
ancho_controles += duracion.offsetWidth;				
ancho_controles += pantalla_completa.offsetWidth;				
ancho_controles += volumen.offsetWidth;	
barra.style.width = (this.controles.offsetWidth - ancho_controles) + "px";
barra.sliderseek.style.width = barra.style.width;
this.controles.volumen.maximo = slider.offsetHeight - 6;
this.controles.style.display = "block";
if (this.width > 640)
this.controles.style.left = this.width / 2 - 320 + "px";
if (!dispositivoMovil)
{
volumen.onmouseover = function() { slider.style.visibility = "visible" };
volumen.onmouseout = function() { slider.style.visibility = "hidden" };
this.actualizaVolumen();
}			
};
var MainController = function(playerHTML5) {
this.playerHTML5 = playerHTML5;
this.duracion = -1;
this.firstTime = false;
this.adsActive = false;
this.adsDone = false;
this.fullscreen = false;
this.adPlaying = false;
this.adsController = null;
this.puntoMedio = false;
this.finVideo = false;
if (this.playerHTML5.controles)
{
this.barra = this.playerHTML5.controles.barra;
this.playButton = this.playerHTML5.controles.playpause;
this.boton = -1;
if (this.playerHTML5.adSaltar != null)
{
this.adSkip = this.playerHTML5.adSaltar;
this.adSkip.addEventListener(
'click',
this.bind(this, this.onAdSkip),
false);		
}
this.playButton.addEventListener(
'click',
this.bind(this, this.onClick),
false);
this.fullscreenButton = this.playerHTML5.controles.fullscreen;
this.fullscreenButton.addEventListener(
'click',
this.bind(this, this.onFullscreenClick),
false);
this.barra.sliderseek.addEventListener(
'click',
this.bind(this, this.seek),
false);    
this.volumen = this.playerHTML5.controles.volumen;		  
this.tiempo = this.playerHTML5.controles.tiempo;
this.textoDuracion = this.playerHTML5.controles.textoDuracion;
this.volumen.altavoz.addEventListener(
'click',
this.bind(this, this.onAltavozClick),
false);
this.volumen.selectorNivel.addEventListener(
'click',
this.bind(this, this.onSliderClick),
false);
this.volumen.selectorNivel.addEventListener(
'mousemove',
this.bind(this, this.onSliderMouseMove),
false);
this.volumen.selectorNivel.addEventListener(
'mousedown',
this.bind(this, this.onSliderMouseDown),
false);
this.volumen.selectorNivel.addEventListener(
'mouseup',
this.bind(this, this.onSliderMouseUp),
false);
this.volumen.selectorNivel.addEventListener(
mouseWheelEvent,
this.bind(this, this.onMousewheel),
false);		  
}
this.video = this.playerHTML5.nodoVideo;
this.video.addEventListener(
'timeupdate',
this.bind(this, this.onTimeupdate),
false);

this.video.addEventListener(
mouseWheelEvent,
this.bind(this, this.onMousewheel),
false);      
if (this.playerHTML5.adContainer != null)
this.adsController = new AdsController(this, this.playerHTML5);
this.onClick();
};
MainController.prototype.cargaDatos = function(nuevosDatos)
{
for (var key in nuevosDatos)
this.playerHTML5.datosVideo[key] = nuevosDatos[key];
if (this.playerHTML5.datosVideo.m3u8 && (iDevice || userAgent.indexOf("android 4") > -1))
{
this.video.setAttribute("poster", "");	
this.video.setAttribute("src", this.playerHTML5.datosVideo.m3u8);	
}
else
this.video.setAttribute("src", this.playerHTML5.datosVideo.src);
if (this.playerHTML5.datosVideo.spriteImg && !dispositivoMovil)
{
var thumbnails = document.createElement("div");
thumbnails.className = 'playerMPEPV_thumbnails';
thumbnails.id = 'thumbnails';
em = document.createElement("div");
em.className = "playerMPEPV_time";
em.appendChild ( document.createTextNode ( "00:00" ) );
thumbnails.appendChild(em);	
thumbnails.time = em;		
this.barra.appendChild(thumbnails);
thumbnails.style.backgroundImage = 'url(' + this.playerHTML5.datosVideo.spriteImg + ')';
this.playerHTML5.controles.thumbnails = thumbnails;
thumbnails.onmouseover = function(e) { thumbnails.style.visibility = "hidden";
e.stopPropagation();
}
this.playerHTML5.controles.barra.onmouseover = function(e) { 
thumbnails.style.visibility = "visible" 
}
this.barra.sliderseek.ns = this.playerHTML5.datosVideo.nSprites;			
this.barra.sliderseek.onmouseout = function() { thumbnails.style.visibility = "hidden" }
this.barra.sliderseek.onmousemove = function(e) { 
var pos = e.layerX  / e.target.offsetWidth;
var n = Math.floor(pos * this.ns);
var fila = 0;
var columna = 0;
if (n < this.ns)
{	
fila = Math.floor(n / 10);
columna = n % 10;
thumbnails.style.backgroundPosition = (-1 * columna * 100) + 'px ' + (-1 * fila * 56) + 'px';	
thumbnails.style.left = (pos * e.target.offsetWidth - 30 ) + 'px';
}
}					
}	
if (!dispositivoMovil)
{
if (this.playerHTML5.controles.thumbnails)
{
this.time = this.playerHTML5.controles.thumbnails.time;
this.playerHTML5.controles.barra.sliderseek.addEventListener(
'mousemove',
this.bind(this, this.seekmove),
false); 
}
this.volumen.addEventListener(
'mouseout',
this.bind(this, this.volumenMouseOut),
false);
}
}
MainController.prototype.bind = function(thisObj, fn) 
{
return function() {
fn.apply(thisObj, arguments);
};
};
MainController.prototype.onTimeupdate = function(e) 
{
if (isNaN(e.target.duration) || e.target.duration < 0 ||  this.video.currentTime < 0.1)
{	
e.preventDefault();
return false;
}
if (!this.firstTime)
{
if (this.playerHTML5.controlesNativosVideo)
{
this.playerHTML5.nodoVideo.setAttribute ( "controls" , "controls" );
}
this.firstTime = true;
this.puntoMedio = false;
this.playerHTML5.nodoVideo.style.display = 'block';
if (this.playerHTML5.controles)
this.playerHTML5.controles.style.visibility = 'visible';
if (this.playerHTML5.adContainer != null)		
this.playerHTML5.adContainer.style.display = 'none';	
this.duracion = e.target.duration;	
if (!this.playerHTML5.controlesNativosVideo)
this.actualizaTiempo(-1);
this.playerHTML5.marcado._datosMarcado.ad = "";
this.playerHTML5.marcado._datosMarcado.adCue = "";
this.playerHTML5.marcado._datosMarcado.duracion = this.duracion;		
this.playerHTML5.marcado.marcaEvento("mediaBegin");
MultimediaReproduciendo(this.playerHTML5.datosVideo.id_video, false); 
}	
if (this.playerHTML5.marcado._datosMarcado.tipoReproduccion == 'streaming')
return;
if (!this.playerHTML5.controlesNativosVideo && this.playerHTML5.controles)
{
this.tiempo.texto.innerHTML = tiempoBonito( this.video.currentTime );
this.barra.progreso.style.width = (this.video.currentTime * 100  / this.duracion) + "%";
}
if (!this.puntoMedio && Math.abs(this.duracion/2 - this.video.currentTime) < 0.3)
{
this.puntoMedio = true;
this.playerHTML5.marcado._datosMarcado.ad = "";
this.playerHTML5.marcado._datosMarcado.adCue = "";
this.playerHTML5.marcado._datosMarcado.duracion = this.duracion;		
this.playerHTML5.marcado.marcaEvento("halfmediaComplete");
}
if (!this.finVideo && Math.abs(this.duracion - this.video.currentTime) < 0.3)
{
this.finVideo = true;
this.onContentEnded();
}
};
MainController.prototype.onContentEnded = function() {
this.playerHTML5.marcado._datosMarcado.ad = "";
this.playerHTML5.marcado._datosMarcado.adCue = "";
this.playerHTML5.marcado._datosMarcado.duracion = this.duracion;		
this.playerHTML5.marcado.marcaEvento("mediaComplete");
if (this.playerHTML5.datosVideo.publicidad_post_roll)
{
this.adsDone = false;
if (this.adsController)
this.adsController.contentEnded();
}
else
{
this.restart();
}
};
MainController.prototype.restart = function()
{
if (this.playerHTML5.controlesNativosVideo)
this.playerHTML5.nodoVideo.setAttribute ( "controls" , "controls" );
if (this.playerHTML5.controles && this.playerHTML5.controles.thumbnails)
this.playerHTML5.controles.thumbnails.style.visibility = "hidden";
if (this.adPlaying)
{
this.ocultaSaltar();
this.adsController.adSkip();
this.playerHTML5.nodoVideo.style.display = 'block';		
}	
else
{
this.playerHTML5.nodoVideo.currentTime = 0.01;
this.playerHTML5.nodoVideo.pause();
this.playerHTML5.playing = false;
}
this.updateChrome();
this.adsDone = false;
this.firstTime = false;
this.finVideo = false;
this.playerHTML5.marcado.eventos = {};
if (this.adsController)
{
this.adsController.contentCompleteCalled = false;
this.adsController.adPosition = "pre-roll";
}
}
MainController.prototype.actualizaTiempo = function(tiempo, ad)
{
if (isIphone)
return;
if (ad)
{
if (tiempo == 0)
this.textoDuracion.texto.innerHTML = "";
else
this.textoDuracion.texto.innerHTML = tiempo.toFixed(0) + " s";
}
else
{
if (!this.playerHTML5.controlesNativosVideo)
{
if (tiempo == -1)
this.textoDuracion.texto.innerHTML = tiempoBonito(this.duracion);
else
this.textoDuracion.texto.innerHTML = tiempoBonito(tiempo);
}
}
}
MainController.prototype.onAltavozClick = function() {
this.playerHTML5.controles.volumen.altavoz.className = this.playerHTML5.controles.volumen.altavoz.className.replace(/ playerMPEPV_silencio/g,"");
if (this.playerHTML5.nodoVideo.volume == 0)
{
if (this.adsActive) 
this.adsController.setVolume(this.playerHTML5.volumenActual);
this.playerHTML5.setVolume(this.playerHTML5.volumenActual);				
}
else
{
this.playerHTML5.volumenActual = this.playerHTML5.nodoVideo.volume;
this.playerHTML5.controles.volumen.altavoz.className += " playerMPEPV_silencio";
if (this.adsActive)			
this.adsController.setVolume(0);
this.playerHTML5.setVolume(0);			
}
};
MainController.prototype.volumenMouseOut = function() {
this.boton = -1;
}
MainController.prototype.setVolume = function(volumen) {
if (volumen <0 || volumen > 1)
return;
if (this.adsActive) 
this.adsController.setVolume(volumen);
this.playerHTML5.setVolume(volumen);
};
MainController.prototype.seekjs = function(segundo) {
this.video.currentTime = segundo;
if (!this.playerHTML5.playing)
{
this.playerHTML5.play();
this.adsActive = false;
this.adsDone = true;
this.updateChrome();		
}
};
MainController.prototype.seek = function(e) {
var pos = this.duracion * e.layerX  / e.target.offsetWidth;
this.video.currentTime = pos;
if (!this.playerHTML5.playing)
{
this.playerHTML5.play();
this.adsActive = false;
this.adsDone = true;
this.updateChrome();		
}
};
MainController.prototype.seekmove = function(e) {
var pos = this.video.duration * e.layerX  / e.target.offsetWidth;
this.time.innerHTML = tiempoBonito(pos);
this.time.style.left = (50 - this.time.offsetWidth / 2) + "px";
};
MainController.prototype.onSliderClick = function(event) {
var volumen = 1-((event.offsetY ? event.offsetY : event.layerY)  / event.target.offsetHeight);
this.setVolume(volumen);
};
MainController.prototype.onSliderMouseMove = function(event) {
if (this.boton != 1)
return;
var volumen = 1-((event.offsetY ? event.offsetY : event.layerY) / event.target.offsetHeight);
this.setVolume(volumen);
};
MainController.prototype.onSliderMouseDown = function(event) {
this.boton = event.buttons ? event.buttons : event.which;
};
MainController.prototype.onSliderMouseUp = function(event) {
this.boton = -1
};
MainController.prototype.onMousewheel = function(event) {
var e = window.event || event;
var delta = e.detail ? event.detail : event.wheelDelta;
delta = delta * factorVolumen;
if (delta > 0)
this.setVolume(this.playerHTML5.nodoVideo.volume + 0.05);
else
this.setVolume(this.playerHTML5.nodoVideo.volume - 0.05);
};
MainController.prototype.onClick = function() {
if (this.playerHTML5.adContainer != null && !this.adsDone) 
{
this.adsController.initialUserAction();
this.playerHTML5.preloadContent(this.bind(this, this.loadAds));
this.adsDone = true;
return;
}
if (this.adsActive) 
{
if (this.adPlaying) 
this.adsController.pause();
else 
this.adsController.resume();
this.adPlaying = !this.adPlaying;
} 
else 
{
if (this.playerHTML5.playing) 
this.playerHTML5.pause();
else 
this.playerHTML5.play();
}
this.updateChrome();
};
MainController.prototype.onFullscreenClick = function() {
if (this.adsActive)
return;
if (this.playerHTML5.nodoVideo.requestFullscreen) 
{
this.playerHTML5.nodoVideo.requestFullscreen();
} 
else 
if (this.playerHTML5.nodoVideo.mozRequestFullScreen) 
{
this.playerHTML5.nodoVideo.mozRequestFullScreen();
} 
else 
if (this.playerHTML5.nodoVideo.webkitRequestFullscreen) 
{
this.playerHTML5.nodoVideo.webkitRequestFullscreen();
}	
};
MainController.prototype.updateChrome = function() {
if ( !this.playerHTML5.controles)
return;
var activo = (this.adsActive) ? this.adPlaying : this.playerHTML5.playing;
if (activo) 
this.playButton.className = "playerMPEPV_boton_play_pause playerMPEPV_boton_pause";
else 
this.playButton.className = "playerMPEPV_boton_play_pause playerMPEPV_boton_play";
};
MainController.prototype.resumeAfterAd = function() {
this.adPlaying = false;
this.adsActive = false;	
this.playerHTML5.play();
this.updateChrome();
};
MainController.prototype.pause = function() {
if (this.adPlaying)
this.adsController.pause();
if (this.playerHTML5.playing)
this.playerHTML5.pause();
this.adPlaying = false;
this.updateChrome();	
};
MainController.prototype.pauseForAd = function() {
this.adsActive = true;
this.adPlaying = false;
this.playerHTML5.pause();
this.updateChrome();
};
MainController.prototype.startAd = function() {
this.adsActive = true;
this.adPlaying  = true;
this.updateChrome();
};
MainController.prototype.adClicked = function() {
this.adsActive = true;
this.adsController.pause();
this.adPlaying = false; 
this.updateChrome();
};
MainController.prototype.loadAds = function() {
this.adsController.requestAds(this.playerHTML5.adTagUrl);
};
MainController.prototype.onAdSkip = function() {
this.playerHTML5.marcado._datosMarcado.ad = this.adsController.adInfo;
this.playerHTML5.marcado._datosMarcado.adCue = this.adsController.adPosition;
this.playerHTML5.marcado._datosMarcado.duracion = this.adsController.duracionAd;
this.playerHTML5.marcado.marcaEvento("adSkip");	
this.ocultaSaltar();
this.adsController.adSkip();
};
MainController.prototype.muestraSaltar = function()
{
if (this.adSkip)
this.adSkip.style.display = 'block';
}
MainController.prototype.ocultaSaltar = function()
{
if (this.adSkip)
this.adSkip.style.display = 'none';
}
var AdsController = function(controller, player) {
this.controller = controller;
this.player = player;
this.contentCompleteCalled = false;
this.duracionAd = 0;
this.adPosition = "pre-roll";
this.adInfo = "dfp";
this.adDisplayContainer = new google.ima.AdDisplayContainer(this.player.adContainer);
this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
this.adsManager = null;
this.adsLoader.addEventListener(
google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
this.onAdsManagerLoaded,
false,
this);
this.adsLoader.addEventListener(
google.ima.AdErrorEvent.Type.AD_ERROR,
this.onAdError,
false,
this);
};
AdsController.prototype.bind = function(thisObj, fn) 
{
return function() {
fn.apply(thisObj, arguments);
};
};
AdsController.prototype.initialUserAction = function() {
this.adDisplayContainer.initialize();
};
AdsController.prototype.requestAds = function(adTagUrl) {
adTagUrl = adTagUrl.replace("{random}", String(Math.random()).substr(2,9));
if (this.adPosition == "pre-roll")
adTagUrl = adTagUrl.replace("{cuePointType}", "pre");
else
adTagUrl = adTagUrl.replace("{cuePointType}", "post");
var adsRequest = new google.ima.AdsRequest();
adsRequest.adTagUrl = adTagUrl;
adsRequest.linearAdSlotWidth = this.player.width;
adsRequest.linearAdSlotHeight = this.player.height;
adsRequest.nonLinearAdSlotWidth = this.player.width;
adsRequest.nonLinearAdSlotHeight = this.player.height;
this.adsLoader.requestAds(adsRequest);
};
AdsController.prototype.onAdsManagerLoaded = function(adsManagerLoadedEvent) {
this.controller.actualizaTiempo(0,true);
this.adsManager = adsManagerLoadedEvent.getAdsManager(
this.player.nodoVideo);
this.processAdsManager(this.adsManager);
};
AdsController.prototype.processAdsManager = function(adsManager) {
adsManager.addEventListener(
google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
this.onContentPauseRequested,
false,
this);
adsManager.addEventListener(
google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
this.onContentResumeRequested,
false,
this);
adsManager.addEventListener(
google.ima.AdErrorEvent.Type.AD_ERROR,
this.onAdError,
false,
this);
var events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
google.ima.AdEvent.Type.CLICK,
google.ima.AdEvent.Type.COMPLETE,
google.ima.AdEvent.Type.LOADED,
google.ima.AdEvent.Type.PAUSED,
google.ima.AdEvent.Type.RESUMED,
google.ima.AdEvent.Type.STARTED
];
for (var index in events) 
{
adsManager.addEventListener(
events[index],
this.onAdEvent,
false,
this);
}
var initWidth, initHeight;
if (this.controller.fullscreen) 
{
initWidth = this.controller.fullscreenWidth;
initHeight = this.controller.fullscreenHeight;
} 
else 
{
initWidth = this.player.width;
initHeight = this.player.height;
}
adsManager.init(
initWidth,
initHeight,
google.ima.ViewMode.NORMAL);
adsManager.start();
};
AdsController.prototype.pause = function() {
if (this.adsManager)
this.adsManager.pause();
};
AdsController.prototype.resume = function() {
if (this.adsManager) {
this.adsManager.resume();
}
};
AdsController.prototype.setVolume = function(volumen) {
if (this.adsManager) 
{
this.adsManager.setVolume(volumen);
this.player.actualizaVolumen();
}
};
AdsController.prototype.onContentPauseRequested = function() {
this.controller.pauseForAd();
};
AdsController.prototype.onContentResumeRequested = function() {
if (this.adPosition == 'post-roll')
return;
if (!this.contentCompleteCalled)
this.controller.resumeAfterAd();
};
AdsController.prototype.onAdEvent = function(adEvent) {
switch (adEvent.type)
{
case google.ima.AdEvent.Type.CLICK:
clearInterval(this.intervalTimmer);
this.controller.adClicked();
break;
case google.ima.AdEvent.Type.STARTED:
clearTimeout(this.timeoutLoadedStarted);
var ad = adEvent.getAd();
if (ad.isLinear())
{
if (this.player.adContainer != null)	
{
this.player.adContainer.style.display = 'block';
if (this.player.controles)
{
this.player.controles.barra.style.visibility = 'hidden';
this.player.controles.fullscreen.style.visibility = 'hidden';
this.player.controles.tiempo.texto.innerHTML = (LANG_MSG[LANG].publicidad).toUpperCase();
if (isIpad)
this.player.controles.volumen.style.visibility = 'hidden';
}
if (dispositivoMovil || this.player.controlesNativosVideo)
{
this.player.contenedorVideo.className = this.player.contenedorVideo.className.replace(/ playerMPEPV_touch_\w*/g,"");
this.player.contenedorVideo.className += " playerMPEPV_touch_publicidad";
this.player.nodoVideo.removeAttribute("controls");
}
this.controller.startAd();
MultimediaReproduciendo(this.player.datosVideo.id_video, false);
this.duracionAd = -2;
this.intervalTimmer = setInterval( this.onProgress.bind(this), 300);
}
}
break;
case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
this.player.nodoVideo.style.display = 'block';
if (this.player.controles)
{
this.player.controles.style.visibility = 'visible';			
this.player.controles.barra.style.visibility = 'visible';
this.player.controles.fullscreen.style.visibility = 'visible';
this.player.controles.tiempo.texto.innerHTML = '00:00';
}
this.player.adContainer.style.display = 'none';
this.controller.adPlaying = false;
this.controller.adsActive = false;
this.controller.actualizaTiempo(-1);			
this.controller.ocultaSaltar()			
if (this.adsManager.getRemainingTime() < 0.5)
{
this.player.marcado._datosMarcado.duracion = this.duracionAd;
this.player.marcado._datosMarcado.ad = this.adInfo;
this.player.marcado._datosMarcado.adCue = this.adPosition;
this.player.marcado.marcaEvento("adComplete");
if (this.adPosition == "post-roll")
{
this.adPosition = 'pre-roll';
this.controller.restart();
}
}		
clearInterval(this.intervalTimmer);
if (dispositivoMovil || this.player.controlesNativosVideo)
{
this.player.contenedorVideo.className = this.player.contenedorVideo.className.replace(/ playerMPEPV_touch[\w_]*/g,"");
this.player.contenedorVideo.className += " playerMPEPV_touch";
this.player.nodoVideo.setAttribute ( "controls" , "controls" );
}				
break;
case google.ima.AdEvent.Type.PAUSED:
clearInterval(this.intervalTimmer);
break;
case google.ima.AdEvent.Type.RESUMED:
this.intervalTimmer = setInterval( this.onProgress.bind(this), 300);
MultimediaReproduciendo(this.player.datosVideo.id_video, false);
break;
case google.ima.AdEvent.Type.LOADED:
var ad = adEvent.getAd();
if (!ad.isLinear()) {
this.controller.resumeAfterAd();
return;
}
if (ad.a.adWrapperIds.length == 0)
this.adInfo = "dfp";
else
this.adInfo = "tercero";
if (this.player.controles && this.player.controles.thumbnails)
this.player.controles.thumbnails.style.visibility = "hidden";
this.timeoutLoadedStarted = setTimeout(this.resumeOnError.bind(this), 6000);
break;
}
};
AdsController.prototype.resumeOnError = function() 
{
this.adsManager.stop();
}
AdsController.prototype.onProgress = function() 
{
if (this.adsManager.getRemainingTime() <= 0)
return;
if (!this.controller.adPlaying || this.duracionAd <= 1 || this.duracionAd >99 )
{
this.duracionAd = this.adsManager.getRemainingTime();
if (this.player.controles)
this.player.controles.style.visibility = 'visible';
this.player.marcado._datosMarcado.duracion = this.duracionAd;
this.player.marcado._datosMarcado.ad = this.adInfo;
this.player.marcado._datosMarcado.adCue = this.adPosition;
this.player.marcado.marcaEvento("adStart");
return;
}
if (this.adPosition == "pre-roll" )
{
if (!isIphone && this.adsManager.getRemainingTime() > 2 && this.adsManager.getRemainingTime() < this.duracionAd - 7)
{
this.controller.muestraSaltar();
}
if (isIphone  && this.adsManager.getRemainingTime() < this.duracionAd - 21)
{
clearInterval(this.intervalTimmer);  
this.adsManager.stop();
}
}
if (!isIphone && this.adsManager.getRemainingTime() > 1)
this.controller.actualizaTiempo(this.adsManager.getRemainingTime(), true);
};
AdsController.prototype.onAdError = function(adErrorEvent) {
this.player.nodoVideo.style.display = 'block';
if (this.player.controles)
this.player.controles.style.visibility = 'visible';		
this.player.adContainer.style.display = 'none';
if (dispositivoMovil || this.player.controlesNativosVideo)
{
this.player.contenedorVideo.className = this.player.contenedorVideo.className.replace(/ playerMPEPV_touch[\w_]+/g,"");
this.player.contenedorVideo.className += " playerMPEPV_touch";
this.player.nodoVideo.setAttribute ( "controls" , "controls" );
}
if (this.adPosition == 'post-roll')
{
this.adPosition = 'pre-roll';
this.controller.restart();
}
else
{
this.controller.resumeAfterAd();
}
if (this.adsManager) {
this.adsManager.destroy();
}
if (isIphone)
{
this.player.contenedorVideo.innerHTML = "<video src='" + this.player.datosVideo.src + "' controls='controls' width='" + this.player.width + "' height='" + this.player.height + "'></video>";
}
};
AdsController.prototype.resize = function(width, height) {
if (this.adsManager) 
this.adsManager.resize(width, height, google.ima.ViewMode.FULLSCREEN);
};
AdsController.prototype.contentEnded = function() {
if (!dispositivoMovil)
{
this.adPosition = 'post-roll';
this.contentCompleteCalled = true;
this.adsActive = false;
this.duracionAd = -2;		
this.controller.onClick();
}
else
this.controller.restart();
};
AdsController.prototype.adSkip = function() {
clearInterval(this.intervalTimmer);
this.adsManager.stop();
this.adsActive = false;
this.controller.adPlaying = false;
};
function VDPEP_Player_Cartelera(refVideo, ancho, alto, idDiv, publi, keywords, fotograma, urlNoticia, genero)
{
id_div_ReproductorVideo = idDiv;	
datosVideo = {};
datosVideo.playerEPETParams = {"mediaWidth":ancho, "mediaHeight":alto, "URLMediaFile":"", "URLMediaStill":fotograma, "URLFirstFrame":fotograma, "compactMode": 'false'};
datosVideo.anchoPlayer = ancho;
datosVideo.altoPlayer = alto;
datosVideo.idRefBrightcove = refVideo.replace(/_0$/,"");
datosVideo.publiActiva = publi;
datosVideo.keywordsVideo = keywords;
datosVideo.urlNoticia = "";
datosVideo.tituloVideo = "";
var video = new EPET_Video(datosVideo, id_div_ReproductorVideo);
}
function EPET_VideoPlayerGeobloqueado(idReferencia, ancho, alto, fotograma, idDivContenedor)
{
EPET_VideoPlayerBloqueado(idReferencia, ancho, alto, fotograma, '0', idDivContenedor);
}
function EPET_VideoPlayerBloqueado(idReferencia, ancho, alto, fotograma, causaBloqueo, idDivContenedor, esAudio)
{
if ( !css_multimedia_cargado)
{
css_multimedia_cargado = true;
var css = document.createElement("link");
css.type = "text/css";
css.rel = "stylesheet";
css.href = css_multimedia;
document.getElementsByTagName("head")[0].appendChild(css);		
}
var id_div_ReproductorVideo;
var idImage = "img_" + idReferencia;
var texto_error;
switch(String(causaBloqueo)) {
case "0": 
texto_error = esAudio ? LANG_MSG[LANG].audio_geobloqueado : LANG_MSG[LANG].geobloqueado;
break;
case "1":
texto_error = esAudio ? LANG_MSG[LANG].audio_aun_no_disponible : LANG_MSG[LANG].aun_no_disponible;
break;
case "2":
texto_error = esAudio ? LANG_MSG[LANG].audio_no_disponible : LANG_MSG[LANG].no_disponible;
break;
case "3":
texto_error = LANG_MSG[LANG].actualizar_plugin;
break;
case "4":
texto_error = LANG_MSG[LANG].bloqueado;
break;
case "-1":
case "-2":
texto_error = esAudio ? LANG_MSG[LANG].audio_no_encontrado : LANG_MSG[LANG].no_encontrado;
break;
default :
texto_error = " Error Cod. " + String(causaBloqueo);
break;
}    
var estiloMSJ = "";
if (esAudio)
estiloMSJ = 'style="bottom:5px"';
if (typeof(idDivContenedor) == "undefined" )
{
id_div_ReproductorVideo = "VideoPlayer_" + String(Math.random()).substr(2,9);
document.write('<div id="' + id_div_ReproductorVideo + '"></div>');
}
else
id_div_ReproductorVideo = idDivContenedor;
document.getElementById(id_div_ReproductorVideo).innerHTML = '<div class="video_previa video_no_disponible" id="' + idImage + 
'"><div class="fondo_mensaje_video" ' + estiloMSJ + '><span>'+texto_error+'</span></div><img src="' + 
fotograma + '" width="' + ancho + '" height="' + alto + '" style="height:' + alto + 'px;width:' + ancho + 'px"/></div>';
}
function EPET_MultimediaPlayer(player, MP_params, flash_params, flash_width, flash_height, idDivContenedor, idObject, autoplay)
{
var id_div_ReproductorVideo;
if (typeof(idDivContenedor) == "undefined" )
{
id_div_ReproductorVideo = "VideoPlayer_" + String(Math.random()).substr(2,9);
document.write('<div id="' + id_div_ReproductorVideo + '"></div>');
}
else
id_div_ReproductorVideo = idDivContenedor;		
var datosVideo = {};
datosVideo.playerEPETParams = {"mediaWidth":flash_width, "mediaHeight":flash_height, "URLMediaFile":MP_params.URLMediaFile, "URLMediaStill":MP_params.URLMediaStill, "URLFirstFrame":"", "compactMode": 'false'};
datosVideo.anchoPlayer = flash_width;
datosVideo.altoPlayer = flash_height;
datosVideo.idRefBrightcove = idObject;
datosVideo.publiActiva = false;
datosVideo.keywordsVideo = "";
datosVideo.urlNoticia = "";
datosVideo.tituloVideo = "";
datosVideo.autoplay = (typeof(autoplay) != "undefined" && autoplay) ? autoplay : false;
var video = new EPET_Video(datosVideo, id_div_ReproductorVideo);
}
function EPET_VideoPlayerBrightcoveExterno(ancho, alto, idVideo, playerKey )
{
var idDiv = "div_" + idVideo;
document.write('<div id="' + idDiv + '"></div>');
var bcParams = {};
bcParams.playerKey = playerKey;
bcParams.isVid = "true"; 
bcParams.isUI = "true"; 
bcParams.dynamicStreaming = "true"; 
bcParams.width =  ancho ;
bcParams.height = alto;
bcParams.bgcolor = "#000000";
bcParams.autoStart = "false";
bcParams.videoSmoothing = "true";
bcParams.forceHTML = "true";
var idIframe = "Iframe_" + idVideo;
var codigoHTML = '<html>\n<head><style type="text/css"> body { margin: 0px;}</style>\n' + 
'<script language="JavaScript" type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences.js"></scr' + 'ipt>\n<\head>\n' +
'<body>\n'+
'<object id="Video_' + idVideo + '" class="BrightcoveExperience">\n';
for(var p in bcParams)
{
codigoHTML += '<param name="' + p + '" value="' + bcParams[p] + '" />\n';
}
codigoHTML += '<param name="@videoPlayer" value="' + idVideo + '" />\n';
codigoHTML += '</object>\n' +
'</body>\n</html>\n';
EPETCreaIframe(idIframe, bcParams.width, bcParams.height, "no", 0, idDiv, codigoHTML);
}
var id_pidiendoDatosAudio;
var audioFlash =  versionFlash >= 10;
function soporteAudio()
{
var a=document.createElement('audio');
return typeof(a.canPlayType) != "undefined" && (!!a.canPlayType('audio/mpeg').replace(/no/,''));
}
var canPlayMP3 = soporteAudio();
function EPET_AudioPlayer_callback(datos)
{
MultimediaPEP[id_pidiendoDatosAudio].multimedia.cargaDatos(datos);
}
function pideDatosAudio(id_audio)
{
var url = "http://elpais.com/adpep/1/?pepid=";
var head = document.getElementsByTagName("head")[0];
if (!MultimediaPEP[id_audio])
{
MultimediaPEP[id_audio] = new Object;
}
if(MultimediaPEP[id_audio].script){
head.removeChild(MultimediaPEP[id_audio].script);
}
MultimediaPEP[id_audio].script = document.createElement("script");
MultimediaPEP[id_audio].script.type = "text/javascript";
id_pidiendoDatosAudio = id_audio;
var id_audio_srv = id_audio.replace(/\-\d+$/, "");	
MultimediaPEP[id_audio].script.src = url + id_audio_srv;
head.appendChild(MultimediaPEP[id_audio].script);
if (MultimediaPEP[id_audio].multimedia && typeof(MultimediaPEP[id_audio].multimedia.objaudio) == "function")
{
MultimediaPEP[id_audio].multimedia.play();
}
}
function EPET_AudioPlayer (datosAudio, idDivContenedor)
{
var id_div_ReproductorAudio;
if (typeof(idDivContenedor) == "undefined" )
{
id_div_ReproductorAudio = "AudioPlayer_" + String(Math.random()).substr(2,9);
document.write('<div id="' + id_div_ReproductorAudio + '"></div>');
}
else
id_div_ReproductorAudio = idDivContenedor;	
var audio = new EPET_Audio(datosAudio, id_div_ReproductorAudio);
}
var EPET_Audio = function(datosAudio,  idDivAudio)
{
var _datosAudio = datosAudio;
var _idDivAudio = idDivAudio;
var _anchoMovil;
var _altoMovil;
var nodoAudio;
var _divAudio = document.getElementById(_idDivAudio);
var cadena_titulo;
var _resizeTM;
var _id_audio;
var _controlesNativos = controlesNativosAudio;
var _controles = null;
var _duracion = -1;
var _playing = false;
var _volumenActual = 0;
var _tmDescarga;
var _puntoMedio = false;
var _puntoInicio = false;
if (_datosAudio.id_audio)
_id_audio = _datosAudio.id_audio;
else
{
if (_datosAudio.un)
UN = _datosAudio.un;
_id_audio = _datosAudio.id_referencia + UN;
}
_id_audio += '-' +(++contadorMultimedia);
_datosAudio.id_audio = _id_audio;
var _idObjeto = "obj_" + _id_audio;
MultimediaPEP[_id_audio] = new Object();		
MultimediaPEP[_id_audio].multimedia = this;
if (_datosAudio.tituloAudio != undefined && _datosAudio.tituloAudio != "")
cadena_titulo = _datosAudio.tituloAudio;
else
cadena_titulo = (document.getElementsByTagName('title')[0] ) ? document.getElementsByTagName('title')[0].innerHTML.replace(/'|"|\|/g, "") : "sin título";	
var _marcado = new EPET_Marcado_Multimedia({"referencia":_datosAudio.id_audio,"titulo": cadena_titulo, "agencia": _datosAudio.keywordsAudio != undefined ? _datosAudio.keywordsAudio : "" });
_marcado._datosMarcado.media = "audio";
if (datosAudio.tipoReproduccion && datosAudio.tipoReproduccion == "streaming")
_marcado._datosMarcado.tipoReproduccion = "streaming";
else
_marcado._datosMarcado.tipoReproduccion = "aod";
_marcado._datosMarcado.adCue = "";
_marcado._datosMarcado.ad = "";
_marcado._datosMarcado.duracion = 0;
var _HTML5vsFLASH = "";  
if (versionMovil)
{
_altoMovil = Math.floor(_divAudio.parentNode.offsetWidth * _datosAudio.altoPlayer / _datosAudio.anchoPlayer);
_anchoMovil = (_divAudio.parentNode.offsetWidth);
EPETaddEvent(window, orientationEvent, function(){
clearTimeout(_resizeTM);
_resizeTM = setTimeout( function() {
changeOrientationAudio()}, 300)
});
}
else
{
_anchoMovil = _datosAudio.anchoPlayer;
_altoMovil = _datosAudio.altoPlayer;
}
_divAudio.className = 'playerMPEPA_rounded';
_divAudio.style.backgroundColor = "#000000";
_divAudio.style.width = _anchoMovil + "px";
_divAudio.style.height = _altoMovil + "px";	
_divAudio.style.overflow = 'hidden';
if (!dispositivoMovil && document.location.href.indexOf("autoplay=1") > -1 && !reproduciendo)
{
reproduciendo = true;
_datosAudio.autoplay = true;
var posAudio = EPET_calculaTopPosition(_divAudio);
var DimsNav = EPETBrowserDims();
if (posAudio > DimsNav.alto)
EPET_setScrollPosition(posAudio - 30);	
}
var _divCaratula = document.createElement("div");
_divCaratula.style.width = _anchoMovil + "px";
_divCaratula.style.height = _altoMovil + "px";
_divCaratula.style.backgroundColor = "#000000";
_divCaratula.style.position = "relative";
var codigoAudio = '<a title="Escuchar Audio" href="javascript:void(0)">' + 
'<span class="playerMPEPA_playAudio"></span></a>';	
_divCaratula.innerHTML = codigoAudio;
_divAudio.appendChild(_divCaratula);
if (_datosAudio.autoplay)
{
if ( !css_multimedia_cargado)
{
css_multimedia_cargado = true;
loadCSS(css_multimedia, function(){setTimeout(preDibujado(),1500)});
EPETaddEvent(document, mouseWheelEvent, wheel);
}
_divCaratula.style.display = "none";
}
else
{
if ( !css_multimedia_cargado)
{
css_multimedia_cargado = true;
var css = document.createElement("link");
css.type = "text/css";
css.rel = "stylesheet";
css.href = css_multimedia;
document.getElementsByTagName("head")[0].appendChild(css);	
EPETaddEvent(document, mouseWheelEvent, wheel);	
}			
_divAudio.onclick = function() 
{
_divAudio.onclick = null;
if (!audioFlash )
{
nodoAudio = document.createElement('audio');
nodoAudio.play();
}
preDibujado();		
}
}
function preDibujado()
{
if (!audioFlash && !canPlayMP3 && (!audioFlash && (typeof(_datosAudio.m3u8) == "undefined" || _datosAudio.m3u8 == "" ) ))
sinAudioPlayer();
else
{
if (_datosAudio.tipo == "externo")
dibujaAudioPlayer();
else
pideDatosAudio(_id_audio);
}
}
function changeOrientationAudio()
{
}
function sinAudioPlayer()
{
_divCaratula.className+= " video_previa video_no_disponible";
var spanFondo = document.createElement("span");
spanFondo.className = "fondo_mensaje_video";
var spanBoton = document.createElement("span");
spanFondo.appendChild(spanBoton);
_divCaratula.appendChild(spanFondo);
if (!audioFlash) 
{
spanBoton.innerHTML = LANG_MSG[LANG].actualizar_plugin;
}
else
{
spanBoton.innerHTML = LANG_MSG[LANG].no_mp3;			
}
}	
function dibujaAudioPlayer()
{
var forzarFlash = _datosAudio.tipoReproduccion && _datosAudio.tipoReproduccion == "streaming" && (!_datosAudio.m3u8 || _datosAudio.m3u8 == "");
_datosAudio.publiActiva = false;
_marcado._datosMarcado.publicidad = "sin publicidad";
if (_datosAudio.tagsIds != undefined && _datosAudio.tagsIds != "")
{
_marcado._datosMarcado.tags = ';' + _datosAudio.tagsIds.replace(/,/g, ",;");
}
MultimediaReproduciendo(_id_audio, false);
if (!forzarFlash && canPlayMP3 )
creaPlayerAudioHTML5();
else
if (audioFlash )
creaPlayerAudioFlash();
}
function creaPlayerAudioHTML5()
{
_HTML5vsFLASH = "html5";
var idAudio = "AUDIO_" + _id_audio;
_marcado._datosMarcado.playerName = "HTML5 Audio";
if (nodoAudio == null )
nodoAudio = document.createElement('audio');
_divAudio.className += " playerMPEPA_c_audio playerMPEPA_unselectable";
nodoAudio.setAttribute("width", _anchoMovil);
nodoAudio.setAttribute("height", 50);
nodoAudio.setAttribute("id", idAudio);		
nodoAudio.setAttribute("preload", 'metadata');		
nodoAudio.setAttribute('src', _datosAudio.src);
_volumenActual = nodoAudio.volume;
_divCaratula.style.display = 'none';
if (_controlesNativos)
{
nodoAudio.setAttribute( "controls" , "controls" );
nodoAudio.style.marginTop = '10px';
_divAudio.appendChild(nodoAudio);
}
else
{
creaControlesAudioHTML5();
}	
EPETaddEvent(_divAudio, mouseWheelEvent, function(event){onMouseWheel(event)});
EPETaddEvent(nodoAudio, 'ended', function(event){endAudioHTML5(event)});
EPETaddEvent(nodoAudio, 'timeupdate', function(event){progressAudioHTML5(event)});
nodoAudio.play();
_playing = true;
}
function onMouseWheel(event) {
var e = window.event || event;
var delta = e.detail ? event.detail : event.wheelDelta;
delta = delta * factorVolumen;
if (delta > 0)
cambiaVolumen(0.05);
else
cambiaVolumen(-0.05)
}
function cambiaVolumen(vol)
{
_volumenActual += vol;
if (_volumenActual > 1)
_volumenActual = 1
else
{
if (_volumenActual <= 0)
{
_volumenActual = 0;
_controles.sonido.className = "playerMPEPA_silencio";				
}
else
_controles.sonido.className = "";				
}
nodoAudio.volume = _volumenActual;
}
function creaPlayerAudioFlash()
{
_HTML5vsFLASH = "flash";
var params = {"menu":"false", "wmode":"opaque", "allowscriptaccess":"always", "bgcolor":"#000000" };
for(var key in _datosAudio.playerEPETOpcionesSWF)
{
params[key] = _datosAudio.playerEPETOpcionesSWF[key];
}
_marcado._datosMarcado.playerName = "FLASH Audio";
_datosAudio.bgColor = _datosAudio.bgColor ? _datosAudio.bgColor : 0x000000;
_datosAudio.autoplay = true;
params["flashvars"] = "datosAudio=" + escape(JSON.stringify(_datosAudio));
var multimedia_player;
multimedia_player = new EPET_FlashHTML(10, reproductorAudioPEP, _anchoMovil, _altoMovil, params, _idObjeto );
multimedia_player.replace(_idDivAudio);		
}
function descarga()
{
if (Math.abs(nodoAudio.buffered.end(nodoAudio.buffered.length-1) - _duracion) < 0.05)
clearInterval(_tmDescarga);
_controles.barra.down.style.width = (nodoAudio.buffered.end(nodoAudio.buffered.length-1) * 100 / _duracion) + "%";
}
function endAudioHTML5(e)
{
_marcado.marcaEvento("mediaComplete");
nodoAudio.currentTime = 0;
nodoAudio.pause();
_marcado.eventos = {};
_puntoMedio = false;
_puntoInicio = false;
_playing = false;
actualizaPlayStatus();
}
function progressAudioHTML5(e)
{
if (isNaN(e.target.duration) || e.target.currentTime == 0)
{	
if (e.target.currentTime == 0 && !_controlesNativos)
{
_controles.tiempo.texto.innerHTML = tiempoBonito( 0 );
_controles.barra.progreso.style.width = "0%";
}
e.preventDefault();
return false;
}
if (_duracion == -1 )
{
_duracion = e.target.duration;
_marcado._datosMarcado.duracion = _duracion;										
if (!_controlesNativos)
{
_tmDescarga = setInterval( descarga, 300);
_controles.textoDuracion.texto.innerHTML = tiempoBonito(e.target.duration);
}
}
if (!_puntoInicio && _playing)
{
_marcado.marcaEvento("mediaBegin");	
_puntoInicio = true;
}
_duracion = e.target.duration;		
if (!_controlesNativos)
{
_controles.tiempo.texto.innerHTML = tiempoBonito( e.target.currentTime );
_controles.barra.progreso.style.width = (e.target.currentTime * 100  / _duracion) + "%";
}
if (!_puntoMedio && Math.abs(_duracion / 2 - e.target.currentTime) < 0.3)
{
_puntoMedio = true;
_marcado.marcaEvento("halfmediaComplete");					
}		
}
function actualizaPlayStatus()
{
if (!_controles)
return;
if (_playing)
_controles.playpause.className = "playerMPEPA_boton_play_pause playerMPEPA_boton_pause";
else
_controles.playpause.className = "playerMPEPA_boton_play_pause playerMPEPA_boton_play";
}
function creaControlesAudioHTML5()
{
_controles = document.createElement("div");
_controles.className = "playerMPEPA_controles";
_controles.style.width =  _anchoMovil + "px";
var boton_play_pause = document.createElement("span");
boton_play_pause.className = "playerMPEPA_boton_play_pause playerMPEPA_boton_pause";
var em = document.createElement("em");
em.appendChild ( document.createTextNode ( "PLAY" ) );
boton_play_pause.onclick = function()
{
if (_playing)
{
nodoAudio.pause();
}
else
{
nodoAudio.play();
MultimediaReproduciendo(_id_audio, false);
}
_playing = !_playing;
actualizaPlayStatus();			
}
boton_play_pause.appendChild(em);			
_controles.appendChild(boton_play_pause);
_controles.playpause = boton_play_pause;
var tiempo = document.createElement("span");
tiempo.className = "playerMPEPA_posicion";			
em = document.createElement("em");
em.appendChild ( document.createTextNode ( "0:00:00" ) );
tiempo.appendChild(em);
tiempo.texto = em;		
_controles.appendChild(tiempo);
_controles.tiempo = tiempo;
var barra = document.createElement("span");
barra.className = "playerMPEPA_barra";			
em = document.createElement("em");
barra.appendChild(em);	
barra.progreso = em;
var down = document.createElement("em");
down.className = "playerMPEPA_down";
barra.appendChild(down);	
barra.down = down;
var sliderseek = document.createElement("div"); 
sliderseek.className = "playerMPEPA_sliderseek";
barra.appendChild(sliderseek);
barra.sliderseek = sliderseek;
_controles.appendChild(barra);
_controles.barra = barra;
if (!dispositivoMovil)
{
var time_tooltip = document.createElement("div");
time_tooltip.className = "playerMPEPA_timetooltip";
em = document.createElement("div");
em.appendChild ( document.createTextNode ( "00:00" ) );
time_tooltip.appendChild(em);	
time_tooltip.time = em;		
_controles.time_tooltip = time_tooltip;
barra.appendChild(time_tooltip);
time_tooltip.onmouseover = function(e) { _controles.time_tooltip.style.visibility = "hidden";
e.stopPropagation();
}			
barra.onmouseover = function(e) { 
_controles.time_tooltip.style.visibility = "visible";		
}		
barra.onmouseout = function() { _controles.time_tooltip.style.visibility = "hidden" }
barra.onmousemove = function(e) { 
var pos = e.layerX;
_controles.time_tooltip.time.innerHTML = tiempoBonito(pos/this.offsetWidth * _duracion);
_controles.time_tooltip.style.left = (pos - 20) + 'px';	
}
}
barra.onmousedown = function(e)
{
var boton = e.buttons ? e.buttons : e.which;
if (boton == 1)
{	
var pos = e.layerX;
nodoAudio.currentTime = pos/this.offsetWidth * _duracion;
}
}							
var duracion = document.createElement("span");
duracion.className = "playerMPEPA_duracion";
em = document.createElement("em");
em.appendChild ( document.createTextNode ( "0:00:00" ) );
duracion.appendChild(em);			
duracion.texto = em;
_controles.appendChild(duracion);
_controles.textoDuracion = duracion;
var volumen = document.createElement("span");
if (!iDevice)
{
var volumen = document.createElement("span");
volumen.className = "playerMPEPA_volumen";
var sonido = document.createElement("em");
var altavoz = document.createElement("span");
altavoz.className = "playerMPEPA_altavoz";
sonido.appendChild ( altavoz );
volumen.appendChild(sonido);
_controles.appendChild(volumen);
_controles.sonido = sonido;
volumen.onclick = function()
{
if (nodoAudio.volume == 0)
{
sonido.className = "";
nodoAudio.volume = _volumenActual;
}
else
{
sonido.className = "playerMPEPA_silencio";
nodoAudio.volume = 0;			
}			
}
}
_divAudio.appendChild(_controles);
_controles.style.display = "block";
_controles.volumen = volumen;
var ancho_controles = 0;
ancho_controles += boton_play_pause.offsetWidth;
ancho_controles += tiempo.offsetWidth;	
ancho_controles += duracion.offsetWidth;
ancho_controles += volumen.offsetWidth;	
barra.style.width = (_anchoMovil - ancho_controles) + "px";
barra.sliderseek.style.width = barra.style.width;
duracion.texto.innerHTML = "00:00";
tiempo.texto.innerHTML = "00:00";
}
this.objaudio = function()
{
if (document.getElementById(_idObjeto))
return document.getElementById(_idObjeto);
return nodoAudio;
}
this.cargaDatos = function(datos)
{
if (typeof(datos) == "undefined")
{
return;
}
if (_datosAudio.src && _datosAudio.src != "")
{
datos.status = 100;
datos.mp3 = _datosAudio.src;
}
if ( datos.status != 100)
{
_divAudio.style.position = 'relative';
EPET_VideoPlayerBloqueado(datos.id_audio, _anchoMovil, _altoMovil, "/t.gif", datos.status, _idDivAudio, true);
return;
}
_datosAudio.src = (datos.mp3.indexOf('/') == 0) ? url_cache + datos.mp3 : datos.mp3;
_datosAudio.duracion = datos.duracion ? datos.duracion : 0;
if (_datosAudio.src.indexOf("rtmp") == 0)
_datosAudio.rtmpStream = datos.rtmpStream;
dibujaAudioPlayer();
}		
this.seek = function(segundo)
{
if (_HTML5vsFLASH == "flash")
{
if (document.getElementById(_idObjeto))
{
document.getElementById(_idObjeto).seekjs(segundo);
VideoReproduciendo(_id_video, false);				
}
}
else
{		
nodoAudio.currentTime = segundo;
}		
}
this.play = function()
{
_playing = true;
if (_HTML5vsFLASH == "flash")
{
if (document.getElementById(_idObjeto))
{
document.getElementById(_idObjeto).playjs();
MultimediaReproduciendo(_id_audio, false);
}
}
else
{
if (_HTML5vsFLASH == "html5")
{
nodoAudio.play();
actualizaPlayStatus();
MultimediaReproduciendo(_id_audio, false);				
}
}		
}
this.pause = function()
{
if (_HTML5vsFLASH == "flash")
{
if (document.getElementById(_idObjeto))
document.getElementById(_idObjeto).pausejs();
}
else
{		
_playing = false;
nodoAudio.pause();		
actualizaPlayStatus();
}
}
this.marcado = function(datos)
{
if (datos.duracion != undefined)
_marcado._datosMarcado.duracion = datos.duracion;
if (datos.playerName != undefined)
_marcado._datosMarcado.playerName = datos.playerName;
if ( datos.evento == "mediaBegin" || datos.evento == "mediaComplete" || datos.evento == "halfmediaComplete")
_marcado.marcaEvento(datos.evento);		
}	
this.resetMarcado = function()
{
_marcado.eventos = {};
}	
}
function tiempoBonito(tiempo) 
{			
if ( tiempo == -1 ) 
return("--:--")
else
if (tiempo == 0)
return("00:00")
tiempo = parseInt(tiempo);
var horas = parseInt ( tiempo / 3600 );
var minutos = parseInt ( (tiempo - horas * 3600) / 60 );
var segundos = tiempo - horas * 3600 - minutos * 60;
if ( minutos < 10 ) minutos = "0" + minutos;
if ( segundos < 10 ) segundos = "0" + segundos;
if (tiempo > 3599)
return horas+":"+minutos+":"+segundos;
else
return minutos+":"+segundos;
};
var mouseWheelEvent;
var factorVolumen;
if (/Firefox/i.test(navigator.userAgent))
{
mouseWheelEvent =  "DOMMouseScroll";
factorVolumen = -1;
}
else
{
mouseWheelEvent =  "mousewheel";
factorVolumen = 1;
}
function wheel(event) {
if (event.target && event.target.className && (event.target.className.indexOf("playerMPEP") > -1 || (event.target.parentNode && event.target.parentNode.className && event.target.parentNode.className.indexOf("playerMPEP") > -1)))
{
event.preventDefault();
event.stopPropagation();		
}
}
function EPETUtils_calcPosition(obj, attr) {
var val=0;
while (obj) {
val+=obj[attr];
obj=obj.offsetParent
}
return val
}
function EPETUtils_calcAbsPosition(el) {
if (document.documentElement.getBoundingClientRect && el.getBoundingClientRect) {
var box = el.getBoundingClientRect();
var rootNode;
if (el.ownerDocument) {
rootNode = el.ownerDocument;
} else {
rootNode = document;
}
return [box.left + Math.max(rootNode.documentElement.scrollLeft, rootNode.body.scrollLeft), 
box.top + Math.max(rootNode.documentElement.scrollTop, rootNode.body.scrollTop)];
} else {
var pos = [el.offsetLeft, el.offsetTop];
var parentNode = el.offsetParent;
var accountForBody = (isSafari &&
el.style.position == 'absolute' &&
el.offsetParent == el.ownerDocument.body);
if (parentNode != el) {
while (parentNode) {
pos[0] += parentNode.offsetLeft;
pos[1] += parentNode.offsetTop;
if (!accountForBody && isSafari && 
parentNode.style.position == 'absolute' ) { 
accountForBody = true;
}
parentNode = parentNode.offsetParent;
}
}
if (accountForBody) {
pos[0] -= el.ownerDocument.body.offsetLeft;
pos[1] -= el.ownerDocument.body.offsetTop;
}
if (el.parentNode) {
parentNode = el.parentNode;
var ROOT_TAG = /^body|html$/i;
while ( parentNode.tagName && !ROOT_TAG.test(parentNode.tagName) ) {
if (parentNode.style.display.search(/^inline|table-row.*$/i)) { 
pos[0] -= parentNode.scrollLeft;
pos[1] -= parentNode.scrollTop;
}
parentNode = parentNode.parentNode;
} 
}
return pos;
}
}
function EPETUtils_calcAbsPositionV2(el) {
if (document["documentElement"]["getBoundingClientRect"]) {
var scrollLeft, scrollTop, box, doc,
off1, off2, mode, bLeft, bTop,
xy = false;
if (el.style.display != 'none' && el["getBoundingClientRect"]) {
try {
box = el["getBoundingClientRect"]();
} catch (e) {
return ([0,0]);
}
doc = el["ownerDocument"];
scrollLeft = Math.max(doc["documentElement"].scrollLeft, doc.body.scrollLeft);
scrollTop  = Math.max(doc["documentElement"].scrollTop, doc.body.scrollTop);
xy = [Math.round(box["left"]), Math.round(box["top"])];
if (isIE && isIE < 8) {
off1 = 2;
off2 = 2;
mode = doc["compatMode"];
if (window["getComputedStyle"]) {
bLeft = doc["documentElement"]["defaultView"]["getComputedStyle"](doc["documentElement"], null)["borderLeftWidth"];
bTop  = doc["documentElement"]["defaultView"]["getComputedStyle"](doc["documentElement"], null)["borderTopWidth"];
} else if (doc["documentElement"]["currentStyle"]) {
bLeft = doc["documentElement"]["clientLeft"];
bTop  = doc["documentElement"]["clientTop"];
}
if (isIE == 6) {
if (mode != "BackCompat" && mode != "CSS1Compat") {
off1 = 0;
off2 = 0;
}
}
if ((mode == "BackCompat" || mode == "CSS1Compat")) {
if (bLeft != "medium") {
off1 = parseInt(bLeft, 10);
}
if (bTop != "medium") {
off2 = parseInt(bTop, 10);
}
}
xy[0] -= off1;
xy[1] -= off2;
}
if ((scrollTop || scrollLeft)) {
xy[0] += scrollLeft;
xy[1] += scrollTop;
}
xy[0] = Math.round(xy[0]);
xy[1] = Math.round(xy[1]);
} else {
xy = [0,0];
}
return xy;
} else {
var doc, docScrollLeft, docScrollTop,
scrollTop, scrollLeft,
bCheck,
xy = false,
parentNode = el;
if (el.style.display != 'none') {
xy = [el["offsetLeft"], el["offsetTop"]];
doc = el["ownerDocument"];
docScrollLeft = Math.max(doc["documentElement"].scrollLeft, doc.body.scrollLeft);
docScrollTop = Math.max(doc["documentElement"].scrollTop, doc.body.scrollTop);
bCheck = ((isGecko || isSafari > 519) ? true : false);
while ((parentNode = parentNode["offsetParent"])) {
xy[0] += parentNode["offsetLeft"];
xy[1] += parentNode["offsetTop"];
if (bCheck) {
var t = 0, l = 0;
if (window["getComputedStyle"]) {
t = parseInt(parentNode["ownerDocument"]["defaultView"]["getComputedStyle"](parentNode, null)["borderTopWidth"], 10) || 0;
l = parseInt(parentNode["ownerDocument"]["defaultView"]["getComputedStyle"](parentNode, null)["borderLeftWidth"], 10) || 0;
} else if (parentNode["currentStyle"]) {
t = parseInt(parentNode["clientTop"], 10) || 0;
l = parseInt(parentNode["clientLeft"], 10) || 0;
}
if (isGecko) {
if (/^t(?:able|d|h)$/i.test(parentNode["tagName"])) {
t = 0;
l = 0;
}
}
xy[0] += l;
xy[1] += t;
}
}
if (el.style.position != "fixed") {
parentNode = el;
while ((parentNode = parentNode["parentNode"]) && parentNode["tagName"]) {
scrollTop = parentNode["scrollTop"];
scrollLeft = parentNode["scrollLeft"];
if (scrollTop || scrollLeft) {
xy[0] -= scrollLeft;
xy[1] -= scrollTop;
}
}
xy[0] += docScrollLeft;
xy[1] += docScrollTop;
} else {
if (isOpera) {
xy[0] -= docScrollLeft;
xy[1] -= docScrollTop;
} else if (isSafari || isGecko) {
xy[0] += docScrollLeft;
xy[1] += docScrollTop;
}
}
xy[0] = Math.round(xy[0]);
xy[1] = Math.round(xy[1]);
} else {
xy[0] = 0;
xy[1] = 0;
}
}
return xy;                
}
function EPETUtils_posicionarScrollEnPagina(posY) {
if (typeof document.documentElement.scrollTop != "undefined") {
document.documentElement.scrollTop = parseInt(posY);
}
if (typeof document.body.scrollTop != "undefined" && !isOpera) {
document.body.scrollTop = parseInt(posY);
}
}
function EPETUtils_windowOpen(url, nombreVentana, attrs) {
var nuevoNombre = nombreVentana;
if (nuevoNombre == '') {
nuevoNombre = Math.random();
}
var _window = window.open(url, nombreVentana, attrs);
}
function EPETUtils_IFrameRequest() {
var reqCount = 0;
this.readyState = 0;
this.status = 0;
this.responseText = "";
reqCount++;
this.req_id = reqCount;
}
EPETUtils_IFrameRequest.prototype = {
open: function(protocol, url, async) {
this.protocol = protocol;
this.url      = url;
},
onreadystatechange: function() { },
send: function(postBody) {
var self = this;
if (this.protocol.toUpperCase()=='POST') {
this.url = this.url + "&" + postBody;
}
var IFrameDoc = document.createElement('iframe');
IFrameDoc.setAttribute('id', 'req'+this.req_id);
IFrameDoc.setAttribute('name', 'req'+this.req_id);
IFrameDoc.style.width = "0";IFrameDoc.style.height = "0";IFrameDoc.style.border = "0";
document.body.appendChild(IFrameDoc);
try {
IFrameDoc.src = this.url;
}catch(e){
return false;
}
this.readyState = 1; this.onreadystatechange();
setTimeout(function(){self.IFht(4);}, 4);
},
overrideMimeType: function() { },
getResponseHeader: function (name) { return ''; },
setRequestHeader: function (name, data) { },
IFht: function (d) {
var self=this;
var el=document.getElementById('req'+self.req_id);
if (el.readyState=='complete') {
self.responseText = document.frames['req'+self.req_id].document.body.innerHTML.replace(/[\n\r]+/ig, "");
el.parentNode.removeChild(el);
self.status = 200;
self.readyState = 4;
self.onreadystatechange();
}else{
d*=1.5;
setTimeout(function(){self.IFht(d);},d);
}
}
};
function EPETUtils_makeHttpRequest(callbackFunction, url, postData, contentType) {
var EPETUtils_xmlHttpRequest = EPETUtils_createHttpRequestObj(contentType);
if (!EPETUtils_xmlHttpRequest) return;
EPETUtils_xmlHttpRequest.onreadystatechange = function () {
if (EPETUtils_xmlHttpRequest.readyState != 4) return;
callbackFunction(EPETUtils_xmlHttpRequest);
}
EPETUtils_xmlHttpRequest.open('POST', url, true);
EPETUtils_xmlHttpRequest.setRequestHeader('Content-type','application/x-www-form-urlencoded');
EPETUtils_xmlHttpRequest.send(postData);
}
function EPETUtils_makeHttpRequestGet (callbackFunction, url, contentType) {
var EPETUtils_xmlHttpRequest = EPETUtils_createHttpRequestObj(contentType);
if (!EPETUtils_xmlHttpRequest) return;
EPETUtils_xmlHttpRequest.onreadystatechange = function () {
if (EPETUtils_xmlHttpRequest.readyState != 4) return;
callbackFunction(EPETUtils_xmlHttpRequest);
}
EPETUtils_xmlHttpRequest.open('GET', url, true);
EPETUtils_xmlHttpRequest.setRequestHeader('Content-type','application/x-www-form-urlencoded');
EPETUtils_xmlHttpRequest.send(null);
}
function EPETUtils_createHttpRequestObj(contentType) {
var httpRequest;
if (window.XMLHttpRequest) {
httpRequest = new XMLHttpRequest();
if (httpRequest.overrideMimeType && contentType) {
httpRequest.overrideMimeType(contentType);
}
}else if (window.ActiveXObject) {
try {
httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
}
catch (e) {
try {
httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
catch (e) {
try {
httpRequest = new EPETUtils_IFrameRequest();
}
catch (e) {
httpRequest = false;
}
}
}
}
return httpRequest;
}
function marcadoAmpliaFoto(tituloPagina, fotoUrl)
{
if (typeof(launchAjaxOMN) == "function")
{
tituloPagina = tituloPagina.replace(/'|"|\|/g, "");
launchAjaxOMN("39|46", tituloPagina + "|" + fotoUrl, "event76");
}
}
function EPETtrackNewInfoFromAJAX()
{
var rndPXLAJAX = parseInt(Math.random()*10000000);
var imgMMDAJAX = new Image(1,1);
imgMMDAJAX.src = "/pxlctl.gif?"+rndPXLAJAX;
if (typeof(launchAjaxOMN) == "function" && typeof(omnEvars) != "undefined" && typeof(omnInfo) != "undefined" &&  typeof(omnEvents) != "undefined" )
{	
launchAjaxOMN(omnEvars, omnInfo, omnEvents);
}
}
function EPETtrackWidgetNewInfoFromAJAX()
{
var rndPXLAJAX = parseInt(Math.random()*10000000);
var imgMMDAJAX = new Image(1,1);
imgMMDAJAX.src = "/pxlctl.gif?"+rndPXLAJAX;
}

function EPETCreaIframe(id, ancho, alto, scroll, borde, div, code)
{
var iframe=document.createElement("iframe");
iframe.setAttribute("id",id);
iframe.setAttribute("width",ancho);
iframe.setAttribute("height",alto);
iframe.setAttribute("scrolling", scroll);
iframe.frameBorder = borde;
document.getElementById(div).appendChild(iframe);
iFrDoc = document.getElementById(id).contentWindow.document || document.getElementById(id).contentDocument.document;
iFrDoc.write(code);
iFrDoc.close();
}

function EPETaddClass(id, name) {
var obj;
if ( typeof(id) == 'string' ) {
if ( document.getElementById(id) ) {
obj = document.getElementById(id);
} else {
return true;
}
} else if ( typeof(id) == 'object' ) {
obj = id;
} else {
return true;
}
var estilo = obj.className;
estilo += ' ' + name;
obj.className = estilo;
}
function EPETremoveClass(id, name) {
var obj;
if ( typeof(id) == 'string' ) {
if ( document.getElementById(id) ) {
obj = document.getElementById(id);
} else {
return true;
}
} else if ( typeof(id) == 'object' ) {
obj = id;
} else {
return true;
}
var estilo = obj.className;
var Exp = new RegExp('\\s*'+name+'(\\s|$)','g');
estilo = estilo.replace(Exp, ' ');
obj.className = estilo;
}
function EPETUtils_userSelectOff() {
if (isGecko) { document.body.style.MozUserSelect = "none"; }
if (isSafari) { document.body.style.KhtmlUserSelect = "none"; }
if (isIE) { document.body.unselectable = "on"; }
document.body.style.userSelect = "none";
}
function EPETUtils_userSelectOn() {
if (isGecko) { document.body.style.MozUserSelect = "text"; }
if (isSafari) { document.body.style.KhtmlUserSelect = "text"; }
if (isIE) { document.body.unselectable = "off"; }
document.body.style.userSelect = "text";
}
function EPETUtils_fullEncodeURIComponent(str) {
str = encodeURIComponent(str)
return (str.replace(/'/g, "%27"));
}
function EPETnewsNotify() {
EPETUtils_makeHttpRequestGet ( function() { return true; }, '/notificarelacionadas', '');
}
function EPETgetVScrollPosition()
{
if (typeof(document.documentElement.scrollTop) != "undefined" && document.documentElement.scrollTop)
return document.documentElement.scrollTop;
else
if (typeof(window.pageYOffset) != "undefined")
return window.pageYOffset;
else
return 0;
}

function EPETBrowserDims()
{
var viewportwidth = 0;
var viewportheight = 0;
if (typeof window.innerWidth != 'undefined') {
viewportwidth = window.innerWidth,
viewportheight = window.innerHeight
}
else if (typeof document.documentElement != 'undefined'
&& typeof document.documentElement.clientWidth !=
'undefined' && document.documentElement.clientWidth != 0) {
viewportwidth = document.documentElement.clientWidth,
viewportheight = document.documentElement.clientHeight
}
else {
viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
viewportheight = document.getElementsByTagName('body')[0].clientHeight
}
return {"ancho" : viewportwidth , "alto" : viewportheight};
}
function EPETalternacampos(id_campo1, estilo_campo1, id_campo2, estilo_campo2) {
if (document.getElementById(id_campo1)) {
document.getElementById(id_campo1).style.display = estilo_campo1;
}
if (document.getElementById(id_campo2)) {
document.getElementById(id_campo2).style.display = estilo_campo2;
}
}
function teclaPulsada(key)
{
var keycode;
if (window.event) 
keycode = window.event.keyCode;
else 
if (key) 
keycode = key.which;
if (keycode == 27)
cerrarTelonMultimedia();
}
function teclaTelonEvent(e)
{ 
if (e.keyCode == 27 ){
cerrarTelonMultimedia();
}
}
var htmlCapaCentral = '<img id="imagen_contenedor" src="/t.gif" width="" height="" alt="' + LANG_MSG[LANG].foto + '"/><p id="pie_contenedor" class="figcaption estirar"></p>';
var htmlCapaFlotante = '<div id="flotante_foto" class="flotante_foto">\n' +
'        <div class="contenedor_foto estirar">\n' +
'            <a title="' + LANG_MSG[LANG].cerrar + '" href="javascript:void(0);" id="id_cerrar_arriba" class="cerrar" onClick="javascript:cerrarTelonMultimedia()">' + LANG_MSG[LANG].cerrar + '</a>\n' +
'			 <a id="ampliar" style="display:none" class="boton ampliar" href="javascript:void(0);">' + LANG_MSG[LANG].tamanio_real + '</a>\n' +
'            <div id="contenedor_central_telon" class="foto figure">' + htmlCapaCentral + '</div>' +
'        </div>\n' +
'</div>\n';
var fotoTamanioReal = false;
function bloqueaClick(e)
{
if (!e) var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation();
}
function crearTelonMultimedia()
{
if (document.getElementById("id_telon"))
document.getElementById("id_telon").parentNode.removeChild(document.getElementById("id_telon"));
if (document.getElementById("id_contenedorCapaFlotante"))
document.getElementById("id_contenedorCapaFlotante").parentNode.removeChild(document.getElementById("id_contenedorCapaFlotante"));
var telon = document.createElement('div');
telon.id = 'id_telon';
telon.style.display = 'none';
telon.className = 'telon';
telon.onclick = function() { cerrarTelonMultimedia();};
document.body.appendChild(telon);     		
var contenedor = document.createElement('div');
contenedor.id = 'id_contenedorCapaFlotante';
contenedor.style.top = '0px';
contenedor.style.left = '0px';
contenedor.style.display = 'none';
contenedor.className = 'contenedor_capa_flotante';
contenedor.onclick = function() { cerrarTelonMultimedia();};
contenedor.innerHTML = htmlCapaFlotante;
document.body.appendChild(contenedor);		
}
function cerrarTelonMultimedia()
{
if (document.getElementById("id_telon").style.display != "none")
{
EPETalternacampos('id_telon', 'none', 'id_contenedorCapaFlotante', 'none');
var nodoCentral = document.getElementById("contenedor_central_telon");        
if (nodoCentral)
nodoCentral.innerHTML =  htmlCapaCentral;	
if (window.addEventListener)
window.removeEventListener('keydown', teclaTelonEvent,true);	
else
document.onkeydown = null;
}
}
function ampliaFoto(boton, url_foto, ancho_foto, alto_foto, pie_foto)
{
var nodoCentral = document.getElementById("contenedor_central_telon");
if (!nodoCentral)
crearTelonMultimedia();
setTimeout(function() {
if (ancho_foto > 0 && alto_foto > 0)
{
setTimeout(function(){
ampliaFotoCallback(boton, url_foto, ancho_foto, alto_foto, pie_foto);
}, 100);
}
else
{
var oculto = document.createElement('div');
oculto.style.width = '0px';
oculto.style.height = '0px';
oculto.style.overflow = 'hidden';
document.body.appendChild(oculto);     		
var oImg=document.createElement("img");
oImg.onload = function() { ampliaFotoCallback(boton, url_foto, (this.naturalWidth != undefined ? this.naturalWidth : this.offsetWidth), (this.naturalHeight != undefined ? this.naturalHeight : this.offsetHeight), pie_foto); oculto.parentNode.removeChild(oculto) };
oImg.setAttribute('src', url_foto + "?" + Math.random());
oculto.appendChild(oImg);
}
}, 100);
}
function ampliaFotoCallback(boton, url_foto, ancho_foto, alto_foto, pie_foto) 
{
var telon = document.getElementById('id_telon');
var capaFlotante = document.getElementById('id_contenedorCapaFlotante');
document.getElementById('ampliar').className = 'boton ampliar';
document.getElementById('ampliar').innerHTML= LANG_MSG[LANG].tamanio_real;	
fotoTamanioReal = false;
var altoPie = 0 ;
if (telon != undefined  && capaFlotante != undefined ) 
{
pie_foto = pie_foto.replace(new RegExp("\&amp;", "gm"), "&");
pie_foto = pie_foto.replace(new RegExp("\&lt;", "gm"), "<");
pie_foto = pie_foto.replace(new RegExp("\&gt;", "gm"), ">");
document.getElementById('pie_contenedor').onclick = bloqueaClick;
document.getElementById('pie_contenedor').innerHTML = pie_foto;
EPETalternacampos('id_telon','block', 'id_contenedorCapaFlotante','block');
var dimsNavegador = EPETBrowserDims();
if (dispositivoMovil)
{
var altoBody = document.body.scrollHeight;
telon.style.position = 'absolute';			
telon.style.height = altoBody + 'px';
telon.style.width = dimsNavegador.ancho + 'px';	
capaFlotante.style.position = 'absolute';
}
else
{
capaFlotante.style.position = 'fixed';
telon.style.position = 'fixed';
}
altoPie = document.getElementById('pie_contenedor').offsetHeight;
var YscrollVertical = EPETgetVScrollPosition(); 
var altoBloqueCentral = parseInt(alto_foto) + parseInt(altoPie) + 60;
if (altoBloqueCentral <= dimsNavegador.alto)
{
document.getElementById('ampliar').style.display = 'none';
if (dispositivoMovil)
{
capaFlotante.style.top =  Math.round(YscrollVertical + (dimsNavegador.alto - altoBloqueCentral ) / 2 ) + 'px';
}
else
capaFlotante.style.top =  (Math.round(dimsNavegador.alto / 2 - altoBloqueCentral / 2)) + 'px' ;
capaFlotante.style.left = '0px';
document.getElementById('imagen_contenedor').style.height = alto_foto + 'px';
document.getElementById('imagen_contenedor').style.width = ancho_foto + 'px';
document.getElementById('flotante_foto').style.width = (parseInt(ancho_foto) + 20) + "px";
}
else
{
if (dispositivoMovil)
{
capaFlotante.style.top =  YscrollVertical + 'px';
}
else
capaFlotante.style.top = '0px' ;
altoPie = 55;
var imgH = dimsNavegador.alto - parseInt(altoPie) - 60;
var imgW = Math.round(imgH * ancho_foto / alto_foto);
document.getElementById('imagen_contenedor').style.height = imgH + "px";
document.getElementById('imagen_contenedor').style.width = imgW + "px";
document.getElementById('flotante_foto').style.width = (imgW + 20) + "px";
document.getElementById('ampliar').style.display = 'block';
document.getElementById('ampliar').onclick = function (e) { 
bloqueaClick(e); 
if (!fotoTamanioReal)
{
document.getElementById('ampliar').className = 'boton reducir';
document.getElementById('ampliar').innerHTML = LANG_MSG[LANG].tamanio_ventana;					
capaFlotante.style.position = 'absolute';
capaFlotante.style.top = YscrollVertical + 'px';
document.getElementById('flotante_foto').style.width = (parseInt(ancho_foto) + 20) + "px";
document.getElementById('imagen_contenedor').style.width = ancho_foto + 'px';	
document.getElementById('imagen_contenedor').style.height = alto_foto + 'px';	
}
else
{
document.getElementById('ampliar').className = 'boton ampliar';
document.getElementById('ampliar').innerHTML= LANG_MSG[LANG].tamanio_real;
if (dispositivoMovil)
{
capaFlotante.style.position = 'absolute';
capaFlotante.style.top = YscrollVertical + 'px';
}
else
{
capaFlotante.style.position = 'fixed';
capaFlotante.style.top = '0px';
}
document.getElementById('imagen_contenedor').style.height = (dimsNavegador.alto - parseInt(altoPie) - 60) + "px";
document.getElementById('imagen_contenedor').style.width = imgW + "px";
document.getElementById('flotante_foto').style.width = (imgW + 20) + "px";
}
fotoTamanioReal = !fotoTamanioReal;
};
}
document.getElementById('imagen_contenedor').onclick = bloqueaClick;
document.getElementById('imagen_contenedor').src    = 'http://ep00.epimg.net' + url_foto;	
if (window.addEventListener)
{
window.addEventListener('keydown', teclaTelonEvent,true);
} 
else
{
document.onkeydown = teclaPulsada;
}
marcadoAmpliaFoto(document.getElementsByTagName('title')[0] ? document.getElementsByTagName('title')[0].innerHTML : "", 'http://ep00.epimg.net' + url_foto);
}
}

function f_pinta_datos(nick, datosUsuario, idVentana, boton) {
var nombreCompleto = nick;
var descripcionUsuario = '';
var fotoUsuario = '';
if ( (datosUsuario.perfilesUsuarios) && (datosUsuario.perfilesUsuarios[nick]) )  {
datosUsuario = datosUsuario.perfilesUsuarios[nick];
var nombreUsuario    = datosUsuario.nombre;
var apellidosUsuario = datosUsuario.apellidos;
var descripcionUsuario = datosUsuario.descripcion;
var fotoUsuario = datosUsuario.pathfoto;
if (apellidosUsuario != '') {
nombreCompleto = apellidosUsuario + ', ' + nombreUsuario;
}
else {
if (nombreUsuario != '') {
nombreCompleto = nombreUsuario;
}
}
}
var contenido_html = '';
contenido_html = contenido_html + '<div class="encabezado estirar">';
contenido_html = contenido_html + '<a onclick="javascript:document.getElementById(\'' + idVentana + '\').style.display=\'none\';" title="' + LANG_MSG[LANG].cerrar + '" class="autor" href="javascript:void(0);">' + nombreCompleto + '</a>';
contenido_html = contenido_html + '<a title="' +  LANG_MSG[LANG].ver_perfil_completo + '" href="http://eskup.elpais.com/' + nick + '" target="_blank">' + LANG_MSG[LANG].ver_perfil_eskup + ' &raquo;</a>';
contenido_html = contenido_html + '<a onclick="javascript:document.getElementById(\'' + idVentana + '\').style.display=\'none\';" title="' + LANG_MSG[LANG].cerrar + '" class="cerrar" href="javascript:void(0);"></a>';
contenido_html = contenido_html + '</div><!-- === .encabezado === -->';
contenido_html = contenido_html + '<div class="contenido estirar">';
if (fotoUsuario != '' ) {
contenido_html = contenido_html + '<div class="foto"><img width="100" height="100" src="' + fotoUsuario + '" alt="' + LANG_MSG[LANG].avatar + '"></div><!-- === .foto === -->';
}
contenido_html = contenido_html + '<p>' + descripcionUsuario + '</p>';
contenido_html = contenido_html + '</div><!-- === .contenido === -->';
var posX = boton.offsetLeft;
var posY = boton.offsetTop;
if (posY < 0) {
posY = 0;
}
var panel = document.getElementById(idVentana);
panel.innerHTML = contenido_html;
panel.style.display = 'block';
panel.style.top  = posY + 'px';
panel.style.left = posX + 'px';
}
function f_muestra_ficha_colaborador(nick, idDiv, boton) {
var urlEskup = '/Profileeskup';
var date_actual  = new Date();
var ts_actual = date_actual.getTime();
var cadena_params = 'action=info_usuarios&user=' + nick;
cadena_params += '&ts=' + parseInt(ts_actual);
EPETUtils_makeHttpRequestGet(function(httpRequest) {
if (httpRequest.status != 200) {
var hashDatos = {};
f_pinta_datos(nick, hashDatos, idDiv, boton);
}
else {
var hashDatos = Array();
var data = httpRequest.responseText;
eval("_hashDatos = " + data);
f_pinta_datos(nick, _hashDatos, idDiv, boton);
}
}, urlEskup + "?" + cadena_params);  
}
function f_comprobar_submit(evento, idFormulario, idCampoLogin, idCampoPasswd) {
if (window.event) {
tecla = evento.keyCode;
src   = evento.srcElement;
}
else if (evento.which) {
tecla = evento.which;
src   = evento.target;
}
if (tecla == 13) {
f_iniciar_sesion(idFormulario, idCampoLogin, idCampoPasswd);
}
}
function f_iniciar_sesion(idFormulario, idCampoLogin, idCampoPasswd) {
var campoLogin  = document.getElementById(idCampoLogin);
var campoPasswd = document.getElementById(idCampoPasswd);
if ( (campoLogin.value == '') || (campoPasswd.value == '') )  {
alert(LANG_MSG[LANG].teclear_usuario);
return false;
}
var valor_usuario = campoLogin.value;
if ( valor_usuario.match(/(\w*)@(\w+)/) ) {
var formulario = document.getElementById(idFormulario);
formulario.submit();
}
else {
alert(LANG_MSG[LANG].error_correo);
return false;
}
}


function EPETUtils_filtraAlfanumerico (datos_contaminados)
{
var datos_filtrados= datos_contaminados.replace(/[^a-z0-9_ñÑáÁéÉíÍóÓúÚüÜ]/g, "");
return datos_filtrados;
}

function EPETUtils_filtraJavascript (datos_contaminados)
{
var datos_filtrados= datos_contaminados.replace(/[';"]/g, "");
return datos_filtrados;
}

function EPETUtils_filtraFormulario (datos_contaminados)
{
var datos_filtrados= datos_contaminados.replace(/[<>"=]/g, "");
return datos_filtrados;
}
var JSON = JSON || {};
JSON.stringify = JSON.stringify || function (obj) {
var t = typeof (obj);
if (t != "object" || obj === null) {
if (t == "string") obj = '"'+obj+'"';
return String(obj);
}
else {
var n, v, json = [], arr = (obj && obj.constructor == Array);
for (n in obj) {
v = obj[n]; t = typeof(v);
if (t == "string") v = '"'+v+'"';
else if (t == "object" && v !== null) v = JSON.stringify(v);
json.push((arr ? "" : '"' + n + '":') + String(v));
}
return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
}
};
JSON.parse = JSON.parse || function (str) {
if (str === "") str = '""';
eval("var p=" + str + ";");
return p;
};
if (typeof(launchAjaxOMN) != 'function')
{
try{
if (typeof(parent) != "undefined" && typeof(parent.launchAjaxOMN) == 'function')
{
launchAjaxOMN = parent.launchAjaxOMN;
}
}
catch(err)
{}
}
function loadCSS(archivo_css, callback) {
var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.type = "text/css";
link.rel = "stylesheet"
link.href = archivo_css;
if (link.addEventListener)
{
link.addEventListener('load', callback, false);		
}
else
{
if (link.onload) {
link.onload = callback;
}
else
{
if (isIE)
{
link.onreadystatechange = function() {
var state = link.readyState;
if (state === 'loaded' || state === 'complete') {
callback();
link.onreadystatechange = null;
}
}
}
else
{
var cssnum = document.styleSheets.length;
var ti = setInterval(function() {
if (document.styleSheets.length > cssnum) {
callback();
clearInterval(ti);
}
}, 30);
}
}
}
head.appendChild(link);
}
