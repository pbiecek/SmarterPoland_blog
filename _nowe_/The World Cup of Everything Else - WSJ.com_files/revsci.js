/*
 * Build version UW-11.0.0-91
 */
var rsi_k;
var rsi_now = new Date();
var rsi_csid = 'G07608';
//<!-- 
// v3 //
// Start Config // 
var DM_CSID = "G07608";
var DM_PIX = "pix01.revsci.net";
var DM_DREF = 0;
var DM_MULT = 0;
var DM_REF_ON = 1;
var DM_TIT_ON = 0;
// End Config // 
var DM_TEST = 0;var _DM_DTE = new Date();var _DM_UDC = document;var _DM_CHR = null;var _DM_sImg = new Array();var _DM_hexc = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");var _DM_BCL1 = "?&=%.()";var _DM_GCL2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";var _DM_TGID = "b" + _DM_hexc[(DM_TEST<<3 | 0x3)];var _DM_EURI = typeof(encodeURIComponent)=="function";var _DM_CCA = typeof("".charCodeAt)=="function";for(_DM_CHR="",i=0;i<256;i++) { _DM_CHR += String.fromCharCode(i); }var _DM_ASCII = _DM_CHR.substr(0,128);var _DM_UTZ = (-1*_DM_DTE.getTimezoneOffset())+720;var _DM_CNV, _DM_LOC, _DM_REF;var _DM_CLD = 0;_DM_rstReq();function DM_tag() { if (_DM_CLD == 0 || DM_MULT == 1) { _DM_CLD = 1; if(DM_DREF==1) { _DM_addNV("DM_LOC",_DM_encd(_DM_REF,_DM_BCL1,0)); } else { _DM_addNV("DM_LOC",_DM_encd(_DM_LOC,_DM_BCL1,0)); } if(DM_REF_ON==1){ _DM_addNV("DM_REF",_DM_encd(_DM_REF,_DM_BCL1,0)); } if(DM_TIT_ON==1){ _DM_addNV("DM_TIT",_DM_encd(_DM_UDC.title.toString(),_DM_BCL1,0)); } _DM_CNV+="&DM_EOM=1"; _DM_pack(_DM_CNV); } _DM_rstReq();}function _DM_pack(d) { var rdte = new Date(); var rid = _DM_toHex(Math.floor(rdte)); var bse="",hdr="",dat=""; var prt=location.protocol+"//"; var mrl=2000,usd=0; d=_DM_encd(d,_DM_GCL2,1); hdr="/"+DM_CSID+"/"+_DM_TGID+"/0/3/"+_DM_UTZ+"/1/0/"+rid+"/0/0/00000000"; bse="/"+Math.floor(Math.random()*Math.pow(10,9))+".gif?D="; usd=(prt+DM_PIX+hdr+bse).length; dat=d.substr(0,(mrl-usd-(d.charAt(mrl-usd-1)=='%'?1:(d.charAt(mrl-usd-2)=='%'?2:0)))); _DM_ship(_DM_toHex(Math.floor(Math.random()*Math.pow(10,9))),prt,DM_PIX,hdr+bse+dat,0); return 1;}function _DM_ship(srl,p,s1,u,t) { _DM_sImg[srl]=new Image(2,3); _DM_sImg[srl].src = p+s1+u;}function _DM_addNV(n,v) {  _DM_CNV += (_DM_CNV?"&":"")+n+"="+v; }function _DM_hexesc(i) { return "%"+_DM_pad(_DM_toHex(i),2);}function _DM_esc(c) { if(_DM_EURI){ return encodeURIComponent(c); }else{ var ci=_DM_CCA?c.charCodeAt(0):_DM_CHR.indexOf(c); if(ci<0){ return ""; } if(ci<=0x007f){ return _DM_hexesc(ci); }else if(ci<=0x07ff){ return _DM_hexesc(0xc0|(ci>>6))+_DM_hexesc(0x80|(ci&0x3f)); }else{ return _DM_hexesc(0xe0|(ci>>12))+_DM_hexesc(0x80|((ci>>6)&0x3f))+_DM_hexesc(0x80|(ci&0x3f)); } }}function _DM_encd(s,chrs,b){ for(var i=0,ns="",c="";i<s.length;i++){ c=s.charAt(i); if((b==1 ? chrs.indexOf(c)>=0 : chrs.indexOf(c)<0)){ ns+=c; }else{ ns+=_DM_esc(c); } } return ns;}function _DM_asciiOnly(s){ for (var i=0,ns="",c="";i<s.length;++i){ c=s.charAt(i); if(_DM_ASCII.indexOf(c)>=0) ns+=c; } return ns;}function _DM_appendToUrl(u,n,v) { return u+((u.indexOf("?")==-1)?"?":"&")+_DM_asciiOnly(n)+"="+_DM_asciiOnly(v);}function _DM_toHex(n){ var rmd=0,quo=0,hex=""; if(n < 16) { return _DM_hexc[n]; }else{ rmd = (n%16); quo = Math.floor((n - rmd)/16); return (_DM_toHex(quo)+_DM_toHex(rmd)); }}function _DM_pad(d,p){ d += ""; while(d.length < p){ d = "0"+d; } return d;}function _DM_deFrag(u){ var i=u.indexOf('#'); if(i>=0){ return u.substr(0,i); } return u;}function _DM_rstReq() { _DM_CNV = ""; _DM_LOC = _DM_deFrag(_DM_UDC.location.toString()); _DM_REF = _DM_deFrag(_DM_UDC.referrer.toString());}function DM_cat(cat) { _DM_addNV("DM_CAT",_DM_encd(cat,_DM_BCL1,0))}function DM_name(f) { _DM_addNV("DM_NAM",_DM_encd(f,_DM_BCL1,0))}function DM_keywords(k) { _DM_addNV("DM_KYW",_DM_encd(k,_DM_BCL1,0))}function DM_addToLoc(n,v) { _DM_LOC=_DM_appendToUrl(_DM_LOC,n,v); if(DM_DREF==1) { _DM_REF=_DM_appendToUrl(_DM_REF,n,v); }}function DM_addEncToLoc(n,v) { DM_addToLoc(_DM_encd(n,_DM_GCL2,1),_DM_encd(v,_DM_GCL2,1));}function DM_setLoc(u) { _DM_LOC=u; if(DM_DREF==1) { _DM_REF=u; }}//--> 
var rsi_td=rsi_now.getFullYear()+'_'+(rsi_now.getMonth()+1)+'_'+rsi_now.getDate();
var rsi_ct=0;
var rsi_beg=document.cookie.indexOf('rsi_ct=');
if(rsi_beg>=0){
rsi_beg=document.cookie.indexOf('=',rsi_beg)+1;
if(rsi_beg>0){
if(rsi_td==document.cookie.substring(rsi_beg,rsi_beg+rsi_td.length)){
rsi_beg+=(rsi_td.length+1);
var rsi_end=document.cookie.indexOf(';',rsi_beg);
if(rsi_end==-1)
rsi_end=document.cookie.length;
var rsi_par=parseInt(document.cookie.substring(rsi_beg,rsi_end));
if(!isNaN(rsi_par))
rsi_ct=rsi_par;
}}}
var rsi_tom=new Date(rsi_now.getTime()+86400000);
document.cookie=('rsi_ct='+rsi_td+':'+(rsi_ct+1)+';expires='+rsi_tom.toGMTString()+';path=/');
rsi_k = '&ko=' + rsi_td + '__' + Math.floor((rsi_ct+6)/7);
document.writeln('<script type="text/javascript" src="' + location.protocol + '//js.revsci.net/common/pcx.js?tmpl=cm&csid=G07608' + rsi_k + '" charset="ISO-8859-1"></s' + 'cript>');
