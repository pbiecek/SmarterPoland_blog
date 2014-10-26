/* SiteCatalyst code version: H.26. Copyright 1996-2013 Adobe, Inc. All Rights Reserved More info available at http://www.omniture.com */
/* Specify the Report Suite ID(s) to track here */

//Permitimos modificar la suit definiendo antes la variable s_account
if (typeof(s_account) == "undefined" )
	var s_account = "prisacomelpaiscom,prisacomglobal";

//para anular el marcado automatico
var marcado_automatico = true;

//Filtrado widgets
if (document.location.href.indexOf("/Comentarios/") > -1 || document.location.href.indexOf("/widgets/") > -1 ||
document.location.href.indexOf("/Widgets/") > -1 || document.location.href.indexOf("widget.html") > -1 )
	marcado_automatico = false;
	
var s=s_gi(s_account);
var tagsNoticia = "";

var cadena_titulo =  (document.getElementsByTagName('title')[0] ) ? document.getElementsByTagName('title')[0].innerHTML.replace(/'|"|\|/g, "") : "";
cadena_titulo = cadena_titulo.toLowerCase();


var marcar_noticias_relacionadas = false;

if (typeof(ids_tracking) == "undefined" )
  var ids_tracking = [];


/*Funcion que recoje eventos ajax asociados a una variable de conversion*/
function OMNeventoAjax(eVar,eVar_value,evento){
		s=s_gi('prisacomelpaiscom');

    if(eVar!=''){
        s.linkTrackVars='events,eVar'+eVar;
        eval('s.eVar'+eVar+'="'+eVar_value+'";');
    }

    //Eventos de exito
    if(evento!=''){
        s.linkTrackEvents=evento;
        s.events=evento;
    }
    s.tl(this,'o',eVar_value);
}

function OMNaddEvent (element, evento, func) { 
    if (document.addEventListener){ 
        element.addEventListener(evento, func, false);
    } else { 
        element.attachEvent('on'+evento, func);
    }
}

var comscoreImg = document.createElement("img");
comscoreImg.width = '1';
comscoreImg.height = '1';
comscoreImg.style.display = 'none';
document.body.appendChild(comscoreImg);


/*Nueva funcion de marcado ajax */
function launchAjaxOMN(eVars,eVars_value,evento,listado_tags){
	s.usePlugins = false;
	//Casi todos los eventos en nuestra cuenta
	s=s_gi('prisacomelpaiscom');
	var AeVars = eVars.split("|");
	var AeVars_value = eVars_value.toLowerCase().split("|");
	s.linkTrackVars='events';

	if (typeof(listado_tags) != "undefined" && listado_tags != "")
	{
		//tienen que tener el formato correcto ;id1,;id2,;id3...
		s.linkTrackVars += ",products,list1";
		s.products = listado_tags;
		//tiene el formato id1;id2;id3
		s.list1 = listado_tags.replace(/,|^;/g,"");
	}
	switch(evento) {
		case "event11": case "event12": case "event13": case "event14": 
			//Eventos que se registran en la global
			s=s_gi('prisacomelpaiscom,prisacomglobal');		
			AeVars.push('30');
			AeVars_value.push(s.prop30);
			//Marcado comscore
			if (evento == "event11")
				comscoreImg.src = "http://b.scorecardresearch.com/p?c1=1&c2=8671776&c3=" + escape("EL Pais Sites") + "&c4=" + escape("ELPAIS.COM") + "&c5=03&cv=2.0&cj=1&rnd=" + String(Math.random()).substr(2,9);
			else
				if (evento == "event13")
				{
					comscoreImg.src = "http://b.scorecardresearch.com/p?c1=1&c2=8671776&c3=" + escape("EL Pais Sites") + "&c4=" + escape("ELPAIS.COM") + "&c5=01&cv=2.0&cj=1&rnd=" + String(Math.random()).substr(2,9);
				}

		break;
		
		case "event15": case "event79": case "event57": case "event58": case "event59":
			//Solo se registran en nuestra cuenta
		break;
		
		default :
	
		break;
	}
	
	//La 3 puede llegar, la aniado si no llega
	if (eVars.indexOf("3|") == -1 && eVars.indexOf("|3|") == -1 && eVars.indexOf("|3") == -1)
	{
		AeVars.push('3');
		AeVars_value.push(s.pageName);
	}
	
	//Si no llega la 45 la aniado siempre, el titulo de la pagina
	if (eVars.indexOf("45|") == -1 && eVars.indexOf("|45|") == -1 && eVars.indexOf("|45") == -1)
	{
		AeVars.push('45');
		AeVars_value.push(cadena_titulo);
	}
	
	
	AeVars.push('4');
	AeVars_value.push(s.channel);
	AeVars.push('17');
	AeVars_value.push(s.prop17);
	AeVars.push('20');
	AeVars_value.push(s.prop20);
	AeVars.push('35');
	AeVars_value.push(s.getTimeParting('h', gmt));			
	AeVars.push('48');
	AeVars_value.push( s.prop8);	


	if (typeof(PEPuid) != "undefined")
	{
		AeVars.push('43');
		AeVars_value.push(PEPuid);		
	}
	
	for(var i=0; i < AeVars.length; i++){
		s.linkTrackVars+=',eVar'+AeVars[i];
		if (AeVars[i] == "8")
			AeVars_value[i] = AeVars_value[i].replace(/\-\d+$/, "");
		eval('s.eVar'+AeVars[i]+'="'+AeVars_value[i].replace(/"/gi, "\\\"")+'";');
	}
	
	if(evento!=''){
		s.linkTrackEvents=evento;
		s.events=evento;
	}
	s.tl(this,'o','AjaxOMN');
}


function marcadoLinks(nodo)
{
	var urlref = "";
	if (ids_tracking[nodo.idx].url != undefined && ids_tracking[nodo.idx].url != "")
		urlref = ids_tracking[nodo.idx].url;
		
	if (ids_tracking[nodo.idx].tipo == "compartir")
	{
		launchAjaxOMN("3|39|69",s.pageName + "|" + cadena_titulo + "|" + ids_tracking[nodo.idx].marca ,"event69", tagsNoticia);
	}
	else
	{
		if (ids_tracking[nodo.idx].tipo == "externo")	//las relacionadas se marcaron en el evento onload
		{
			launchAjaxOMN("3|39|68", s.pageName + "|" + cadena_titulo + "|" + ids_tracking[nodo.idx].marca + " (" + ids_tracking[nodo.idx].id + ") : " + (urlref != "" ? urlref : nodo.href) ,"event22");
		}
	}
}


function marcaEnlaceSuscripciones(url)
{
	window.open(url);
	launchAjaxOMN("3|39|68", s.pageName + "|" + cadena_titulo + "|" + "suscripciones (foto) : " + url ,"event22");
}


function trackPublicarComentario()
{
	launchAjaxOMN("3|39", s.pageName + "|" + cadena_titulo  ,"event34", tagsNoticia);
}


/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8"

/* Conversion Config */
s.currencyCode="EUR"

/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkInternalFilters="javascript:,."
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* Page Name Config */
s.siteID="elpaiscom";
s.defaultPage="";
s.queryVarsList="";
s.pathExcludeDelim=";";
s.pathConcatDelim="/";


/* FORMS ANALYSIS*/
s.formList="formcliente, Formcliente, registroForm_CLEAN, registroForm_COL, registroForm_PRE, registroForm_REG, registroForm_ESKUP, registroForm_YOPER, registroForm_TIT, registroForm_PRISACOM, registroForm_FOTOSLECTORES, registroForm_BLOGS, registroForm_FRASES, registroForm_VIP";
s.trackFormList=true
s.trackPageName=true
s.useCommerce=true
s.varUsed="eVar34"
s.eventList="event26,event27,event28" //Abandon,Success,Error
/*END FORMS ANALYSIS*/


/* TimeParting Config */
var fecha = new Date();
var anoActual=fecha.getFullYear(); //Recogemos el año en el que estamos
var gmt = -(fecha.getTimezoneOffset()/60) - 1;
if(gmt>=0){
    gmt = "+" + gmt.toString();
}
s.dstStart="1/1/"+anoActual; 			// update to the correct Daylight Savings Time start
s.dstEnd="12/31/"+anoActual; 			// update to the correct Daylight Savings Time end date
s.currentYear=anoActual; 				// update to the current year 


//DateTime
/* Props used for TimeParting */

	var month=fecha.getMonth()+1;if(month<10)month='0'+month;
	var seconds=fecha.getSeconds();if(seconds<10)seconds='0'+seconds;
	var minutes=fecha.getMinutes();if(minutes<10)minutes='0'+minutes;
	var hours=fecha.getHours();if(hours<10)hours='0'+hours;
	var day=fecha.getDate();if(day<10)day='0'+day;

/************** doPlugins Script **************/

s.usePlugins=true
function s_doPlugins(s) {


/* Configuration for pageName and put it on lowercase */
	
if ((!window.s.pageType) && (!window.s.pageName || s.pageName==""))
{
	s.pageName = s.getPageName();
	s.pageName = s.pageName.toLowerCase();
}

/* External Campaign Tracking */
if(!s.campaign)
	s.campaign=s.getQueryParam('idexterno')
	s.campaign=s.getValOnce(s.campaign,'s_campaign',0)
	
/* External Campaign Tracking */
if(!s.campaign){
    if(s.getQueryParam('id_externo_display')!='') s.campaign=s.getQueryParam('id_externo_display');
    if(s.getQueryParam('id_externo_sem')!='') s.campaign=s.getQueryParam('id_externo_sem');
    if(s.getQueryParam('id_externo_nwl')!='') s.campaign=s.getQueryParam('id_externo_nwl');
    if(s.getQueryParam('id_extrerno_nwl')!='') s.campaign=s.getQueryParam('id_extrerno_nwl');
    if(s.getQueryParam('id_externo_promo')!='') s.campaign=s.getQueryParam('id_externo_promo');
    if(s.getQueryParam('id_externo_rsoc')!='') s.campaign=s.getQueryParam('id_externo_rsoc');
	s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
}


/* Copy pageName, channel subseccion, subsubseccion, tipo, agregador, organizacion, medio, dominio, subdominio term to eVar */

s.eVar3="D=pageName" 			// PageName
s.eVar4="D=ch"					// Channel

if(s.prop1)s.eVar5="D=c1";
if(s.prop2)s.eVar6="D=c2";
if(s.prop3)s.eVar7="D=c3";	
if(s.prop5)s.eVar10=s.prop5;	    //url
if(s.prop6)s.eVar63=s.prop6;		// referrer
if(s.prop8)s.eVar48="D=c8";		// Set day  (Jueves)
if(s.prop9)s.eVar66="D=c9";		// Set weekday (laborable/festivo)
if(s.prop11)s.eVar11="D=c11";
if(s.prop12)s.eVar12="D=c12";	
if(s.prop13)s.eVar13="D=c13";	  
if(s.prop14)s.eVar14="D=c14";	// Pais del Medio 	
if(s.prop15)s.eVar15="D=c15";	
if(s.prop16)s.eVar16="D=c16";	
if(s.prop17)s.eVar17="D=c17"; 	// Canal
if(s.prop18)s.eVar18="D=c18";	// Organizacion 
if(s.prop19)s.eVar19="D=c19";	// Producto 
if(s.prop20)s.eVar20="D=c20";	// Dominio 
if(s.prop21)s.eVar21="D=c21";	// Usuario Nuevo o recurrente
if(s.prop62)s.eVar22="D=c62";
if(s.prop24)s.eVar59="D=c24";	// Set hour:minutes:seconds (12:32:48)
if(s.prop30)s.eVar30="D=c30";	// Unidad de Negocio 
if(s.prop31)s.eVar62="D=c31";	// Tematica
if(s.prop35)s.eVar35="D=c35";	// Set hour (12:00PM) 	  
if(s.prop36)s.eVar33="D=c36";	// Join Date (Jueves-15/9/2012-12:32:48)
if(s.prop39)s.eVar39="D=c45";  	// Titulo página 
if(s.prop34)s.eVar43="D=c34";
if(s.prop44)s.eVar44="D=c44";
if(s.prop45)s.eVar45="D=c45";
if(s.prop47)s.eVar47="D=c47";  
if(s.prop49)s.eVar49="D=c49";     
if(s.prop50)s.eVar50="D=c50";
if(s.prop57)
{
	if (soporteMP4)
		s.eVar57 = 'D="con_mp4-"+User-Agent';
	else
		s.eVar57 = 'D="sin_mp4-"+User-Agent';	
}
if(s.prop60)s.eVar60="D=c60";	// Días desde última visita 
      
/* Set Page View Event */
//s.events=s.events?s.events+',event2':'event2';   //Lo inicializo en el codigo principal.

/*FORMS*/
s.setupFormAnalysis();
/*END FORMS*/

}

s.doPlugins=s_doPlugins


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="prisacom"
s.trackingServer="prisacom.112.2o7.net"

/************** Required Plug-ins *************/
/*
 * Plugin: getPageName v2.0 - parse URL and return
 */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p[p.length-1]=='/'?s.defaultP"
+"age:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;z=s.fl("
+"p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p.substri"
+"ng(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x;z=s.fl"
+"(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.substrin"
+"g(x+1)}return n");


/*
 * Plugin: getQueryParam 2.3 - return query string parameter(s) 
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
* Plugin: getValOnce 1.1 - get a value once per session or number of days 
*/
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");


/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");


/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat 
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-repeat',e);return'repeat';}");


/*
 * Plugin: Form Analysis 2.1 (Success, Error, Abandonment)
 */
s.setupFormAnalysis=new Function(""
+"var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
+"wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
+"tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
+",'','')}");
s.sendFormEvent=new Function("t","pn","fn","en",""
+"var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
+"s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
+"event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
+"th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
+";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
+"if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
+"No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
+"s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
+"mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
+"g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
+"=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
+".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
+"u]='';f.va[1]='';f.va[3]='';}this.su=f.os[this.name];return this.su"
+"?this.su(e):true;");
s.fasl=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
+"eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
+"name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
+"'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
+"='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
+"!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
+"ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
+"ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
+"e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
+",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
+".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
+"vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object"
+"();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us"
+"ePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
+"tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
+"form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
+"which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
+"N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
+"AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
+"n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
+"){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
+"1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
+"_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
+"d(e);");
s.ee=new Function("e","n",""
+"return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a",""
+"var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");

/*
 * Plugin: Days since last Visit 1.1 - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");


/*
* Utility manageVars v1.4 - clear variable values (requires split 1.5)
*/
s.manageVars=new Function("c","l","f",""
+"var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
+"geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
+",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
+"'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
+"it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
+"a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
+"}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
+");return true;}else{return false;}");
s.clearVars=new Function("t","var s=this;s[t]='';");
s.lowercaseVars=new Function("t",""
+"var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index"
+"Of('D=')!=0){s[t]=s[t].toLowerCase();}}");


/*
 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
 */
s.getTimeParting=new Function("t","z",""
+"var s=this,cy;dc=new Date('1/1/2000');"
+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
+"var days=['domingo','lunes','martes','miercoles','jueves','viernes',"
+"'sabado'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
+"var dow=days[thisd];var ap='AM';var dt='laborable';var mint='00';"
+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='festivo'};"
+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
+"if(t=='d'){return dow};if(t=='w'){return dt}}};");

/********************************************************************
 *
 * Supporting functions that may be shared between plug-ins
 *
 *******************************************************************/

/* s.join: 1.0 - s.join(v,p)
 *
 * v - Array (may also be array of array)
 * p - formatting parameters (front, back, delim, wrap)
 *
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
s.split=new Function("l","d",""
+"var i,x=0,a= new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.26';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\"
+"\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return "
+"y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;retur"
+"n 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x)"
+";for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.subs"
+"tring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+',"
+"'%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+"
+"x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescap"
+"e(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z"
+"+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,"
+"2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f"
+");return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibi"
+"litychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while("
+"s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s"
+".sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.link"
+"Type=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,"
+"n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.'"
+",'c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?"
+"c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60)"
+";if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');"
+"return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l"
+"[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf="
+"new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.w"
+"d,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;r"
+"eturn true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s."
+"tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for("
+"n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingS"
+"erverBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLower"
+"Case();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.versio"
+"n+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!"
+"s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r"
+";return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[im"
+"n];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if"
+"(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s"
+"._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<50"
+"0)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){"
+"if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&"
+"&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf("
+"\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp("
+"q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.len"
+"gth-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk "
+"in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++"
+")if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf="
+"(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.con"
+"textData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else "
+"if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var "
+"s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.p"
+"e){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s."
+"events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0"
+")&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substr"
+"ing(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServe"
+"r'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()"
+"=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvid"
+"er')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c'"
+";else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType'"
+")q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],f"
+"v,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='re"
+"trieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q"
+"='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){"
+"t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLower"
+"Case():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.w"
+"d.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0"
+"&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;"
+"if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.b"
+"ct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else "
+"if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e."
+"target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a"
+".href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.w"
+"d.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEven"
+"t(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n"
+",e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h="
+"o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathna"
+"me.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.sc"
+"opeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();"
+"else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('ja"
+"vascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.inner"
+"Text;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.subs"
+"tring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this"
+".un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1))"
+";s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ="
+"new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s"
+".sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r="
+"true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.ind"
+"exOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s"
+".b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListene"
+"r('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''"
+"),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>"
+"=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){"
+"var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m."
+"toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun="
+"un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];i"
+"f(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r"
+"','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m="
+"s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_"
+"\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x"
+"(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_"
+"nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){"
+"if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o"
+".l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i"
+"(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementBy"
+"Id(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDel"
+"ay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id"
+"=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Obj"
+"ect;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,"
+"v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l"
+"=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo)"
+"{if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(v"
+"o){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.gfid=function(){var s=this,d='012"
+"3456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random("
+")*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.applyADMS=function(){var s=this,vb=new Object;if(s.wd.ADMS&&!s.vis"
+"itorID&&!s.admsc){if(!s.adms)s.adms=ADMS.getDefault();if(!s.admsq){s.visitorID=s.adms.getVisitorID(new Function('v','var s=s_c_il['+s._in+'],l=s.admsq,i;if(v==-1)v=0;if(v)s.visitorID=v;s.admsq=0;if"
+"(l){s.admsc=1;for(i=0;i<l.length;i++)s.t(l[i]);s.admsc=0;}'));if(!s.visitorID)s.admsq=new Array}if(s.admsq){s.vob(vb);vb['!visitorID']=0;s.admsq.push(vb);return 1}else{if(s.visitorID==-1)s.visitorI"
+"D=0}}return 0};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y="
+"tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q=''"
+",qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N"
+"',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j="
+"'1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';i"
+"f(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh="
+"s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;i"
+"f(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct"
+"=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps"
+")<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo"
+"){s.vob(vb);s.voa(vo)}s.fid=s.gfid();if(s.applyADMS())return '';if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s."
+"pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s."
+"eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s"
+"_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkTyp"
+"e.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceI"
+"ndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if("
+"s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.cha"
+"rAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx"
+"=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('o"
+"bjectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs)"
+"{s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles"
+"=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s"
+".wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss"
+",i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l["
+"i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.m"
+"l)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];i"
+"f(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.lo"
+"cation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns"
+"6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer'"
+");s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=pa"
+"rseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUp"
+"perCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationS"
+"erverSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProf"
+"iles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSec"
+"onds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_"
+"t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDept"
+"h,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackin"
+"gServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownlo"
+"adLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_refer"
+"rer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1"
+").t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


s.events = "event2"; //por defecto el evento de pagina vista
s.products = "";
s.prop45 = cadena_titulo; 

if (typeof(marcado_omniture_particular) == "undefined")
{  

	var regexpNoticia = /http.?:\/\/([^\/]*)\/([^\/]*)\/(\d+)\/(\d+)\/(\d+)\/([^\/]*)\/.*\.html/i;
	var regexpEspecialesPortadas = /http.?:\/\/([^\/]*)\/([^\/]*)\/([^\/]*)\//i;
	var regexpEspeciales = /http.?:\/\/[^\/]*\/([^\/]*)\/(\d{4})\/([^\/]*)\//i;
	var regexpDiario = /http.?:\/\/([^\/]*)\/diario\/(\d+)\/(\d+)\/(\d+)\/([^\/]*)\/?/i;
	var regexpPortadilla = /http.?:\/\/([^\/]*)\/([^\/]*)\/(.*)/i;
	var regexpSeccionVirtual = /http.?:\/\/([^\/]*)\/seccion\/([^\/]*)/i;
	var regexpPortada = /http.?:\/\/([^\/]*)\/?(.*)/i;
	var regexpMovil = /(http.?:\/\/[^\/]*)\/m\/(.*)/i;
	
	//smoda
	var regexpNivel1 = /^http.?:\/\/[^\/]*\/([^\/]+)/i;
	var regexpNivel2 = /^http.?:\/\/[^\/]*\/([^\/]+)\/(.*)/i;
	var regexpNivel3 = /^http.?:\/\/[^\/]*\/([^\/]+)\/\d+\/(.*)/i;	
	
	var result_re;
	var result_re2;
	var result_re3;
	var result_re4;
	var result_re5;
	var result_re6;

	var canal_omniture = "web";	
	var direccion = document.location.href;

	result_re = regexpMovil.exec(direccion);
	if (result_re)   //version movil lo registramos y la ajustamos a una url no movil
	{
		canal_omniture = "web_movil";
		direccion = result_re[1] + "/" + result_re[2];
	}

	var dominio_omniture = "elpais.com";
	var seccion_omniture = "seccion";
	var subseccion_omniture = "subseccion";
	var channel_omniture = "channel";
	var prop1_omniture = "seccion";
	var prop3_omniture = "";
	var prop31_omniture = "informacion";

	//Sacamos el portal
	var regexSeccion = /http.?:\/\/([^\.]*)\./i;
	result_re4 = regexSeccion.exec(direccion);
	seccion_omniture = result_re4[1];

	s.pageName = s.getPageName().toLowerCase();

	if (seccion_omniture == 'brasil')
		dominio_omniture = "brasil.elpais.com";

	switch(seccion_omniture) {
	case "smoda":
		//Los blogs los detectamos en la seccion blogs
		
		s_account="prisacomelpaiscom,prisacomsmoda,prisacomglobal";
		var s=s_gi(s_account);
		channel_omniture = "smoda";
		seccion_omniture = "smoda";
		var seccion = "";
		var subseccion = "";
		direccion = direccion.replace(/\?gclid=.*$|\/pag\/\d+$/, ""); //no aporta informacion y viene en varios accesos a portada y portadillas
		
		s.pageName = s.pageName.replace("elpaiscom", "elpaiscom/smoda");
		
		//informacion local proporcionada por smoda
		if (typeof(omniture_info) != "undefined")
		{
			seccion = omniture_info.seccion.toLowerCase();
			subseccion = omniture_info.subseccion.toLowerCase();
		}
		
		if ( direccion == "http://smoda.elpais.com/" )  //la portada
		{
			prop3_omniture = "portada"
			prop1_omniture = seccion_omniture + ">home";
		}
		else
		{
			result_re = regexpNivel1.exec(direccion);
			if (result_re)
			{
				switch(result_re[1]) {
					case "articulos" : case "videos" :
						if (direccion == "http://smoda.elpais.com/videos")
						{
							prop1_omniture = seccion_omniture + ">videos";
							prop3_omniture = "portada";
						}
						else
						{
							prop1_omniture = seccion_omniture + (seccion != "" ?  ">" + seccion : "") + (subseccion != "" ? ">" + subseccion : "");
							prop3_omniture = "articulo";
							s.prop39 = "D=c45";
							s.events += ',event77';

							setTimeout('launchAjaxOMN("3|39",s.pageName + "|" + cadena_titulo,"event80")',60000);	
						}
					break;
					
					case "galerias" :
						prop1_omniture = seccion_omniture + ">album" + ((seccion != "") ? ">" + seccion : "" ) + ((subseccion != "") ? ">" + subseccion : "");
						prop3_omniture = "fotogaleria";
					break;				
					case  "lo-ultimo" : case  "lo-mas-leido" : case  "lo-mas-valorado" : case "listado-noticias-smoda" :
						prop1_omniture = seccion_omniture + ">" + result_re[1];
						prop3_omniture = "portada";
					break;
					
					case "fotos" : case  "tags" : case  "moda" : case  "celebrities" : case  "blogs" : case "belleza" : case "placeres" : //en blogs solo va por aqui la portada
						result_re2 = regexpNivel2.exec(direccion);
						if (result_re2)
						{
							if (result_re2[1] != "")
							{
								prop1_omniture = seccion_omniture + ">" + result_re2[1];
								prop3_omniture = "portada";
							}
						}
						else
						{
							prop1_omniture = seccion_omniture + ">" + result_re[1];
							prop3_omniture = "portada";
						}
					break;
					
					case "servicios" :
						if (direccion.indexOf("http://smoda.elpais.com/servicios/buscador?q=") == 0)					
						{
							s.prop16 = direccion.replace(/^.*buscador\?q=/, "");
							prop1_omniture = seccion_omniture + ">buscador";
							prop3_omniture = "portada";		
							s.pageName = "elpaiscom/smoda/servicios/buscador";					
						}
						else
						{
							result_re2 = regexpNivel2.exec(direccion);
							if (result_re2)
							{
								prop1_omniture = seccion_omniture + ">" + result_re2[1];
								prop3_omniture = "portada";	
							}
							else
							{
								prop1_omniture = "desconocido";
								prop3_omniture = "";
							}
						}
					break;		

					case "especial" :
						prop1_omniture = seccion_omniture + ">especial" + ((seccion != "") ? ">" + seccion : "" );
						prop3_omniture = "portada";
					break							
														
					default :
						prop1_omniture = "desconocida";
						prop3_omniture = "";
						
					break;
				}
			}
			else
			{
				prop1_omniture = "desconocido";
				prop3_omniture = "";
			}
		}	
		break;
		
	case "tienda":
		//Por ahora la de smoda. La nuestra no está activa pero nos aseguramos
		if (direccion.indexOf("http://tienda.smoda.es") == 0)
		{
			s_account="prisacomelpaiscom,prisacomsmoda,prisacomglobal";
			var s=s_gi(s_account);
			channel_omniture = "smoda";
			seccion_omniture = "smoda>tienda";
			prop1_omniture = seccion_omniture;
			
			s.pageName = s.pageName.replace("smodaes", "smodaes/tienda");
		
			prop3_omniture = "";
			if ( direccion == "http://tienda.smoda.es" )  //la portada
			{
				prop3_omniture = "portada"
				prop1_omniture = seccion_omniture + ">home";
			}
		}

		break;
		
		
	case "blogs":
		if (direccion.indexOf("http://blogs.smoda.elpais.com") == 0)
		{
			s_account="prisacomelpaiscom,prisacomsmoda,prisacomglobal";
			var s=s_gi(s_account);	
			channel_omniture = "smoda";		
			seccion_omniture = "smoda";			

			s.pageName = s.pageName.replace("elpaiscom", "elpaiscom/smoda/blogs");
			
			result_re3 = regexpNivel2.exec(direccion);
			//Se diferenciaba portada, pero pasamos a marcarlos como los nuestros
			if (result_re3 )
			{
				prop1_omniture = seccion_omniture + ">blogs_" + result_re3[1];				
				prop3_omniture = "contenido generado por usuarios";		
			}
			else
			{
				prop1_omniture = "smoda>blogs_desconocido";
				prop3_omniture = "";						
			}
		}	
		else
		{
			channel_omniture = "blogs";
			seccion_omniture = "blogs";
			s.pageName = s.pageName.replace("elpaiscom", "elpaiscom/blogs");
			var regexpBlogs = /http.?:\/\/([^\/]+)\/([^\/]+)\/(.*)/i;
			result_re = regexpBlogs.exec(direccion);
			if (result_re )
			{
				switch(result_re[2]) {
					case "la-voz-de-inaki":
						subseccion_omniture = "la voz de iñaki";
					break;
					
					default:
						subseccion_omniture = result_re[2].replace(/-/, " ");
				}
				
				prop3_omniture = "contenido generado por usuarios";
			}
			else
			{
				subseccion_omniture = "desconocido"; 
				prop3_omniture = "";
			}
			
			prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
			
			document.write('<script language="JavaScript" type="text/javascript" src="http://ep00.epimg.net/js/comun/avisopc.js"></scr' + 'ipt>');			
			
		}
		break;
		
	case "resultados":
		channel_omniture = "resultados";
		s.pageName = s.pageName.replace("elpaiscom", "elpaiscom/resultados");
		var regexpElecciones = /http.?:\/\/([^\/]*)\/elecciones\/(\d{4})\/([^\/]*)\/.*/i;
		result_re = regexpElecciones.exec(direccion);
		if (result_re )
		{
			seccion_omniture = "elecciones";
			subseccion_omniture = result_re[3] + "_" + result_re[2]; 
			prop3_omniture = "";
			prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
		}
		else
		{
			var regexpEleccionesPortadas = /http.?:\/\/([^\/]*)\/elecciones\/(\d{4})\//i;
			result_re2 = regexpEleccionesPortadas.exec(direccion)
			if (result_re2)
			{
				seccion_omniture = "elecciones";
				subseccion_omniture = result_re2[2]; 
				prop3_omniture = ""
				prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
			}
			else
			{
				var regexpEleccionesHome = /http.?:\/\/([^\/]*)\/elecciones\/(.*?).html/i;
				result_re3 = regexpEleccionesHome.exec(direccion)
				if (result_re3)
				{
					seccion_omniture = "elecciones";
					subseccion_omniture = result_re3[2]; 
					prop3_omniture = "portada"
					prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
				}
				else
				{
					var reg_n3 = /^http.?:\/\/[^\/]*\/([^\/]+)\/([^\/]+)\//i;
					result_re4 = reg_n3.exec(direccion);
					if (result_re4)
					{
						seccion_omniture = result_re4[1];
						subseccion_omniture = result_re4[2]; 
						prop1_omniture = seccion_omniture + ">" + subseccion_omniture;						
					}
					else
					{
						subseccion_omniture = "desconocido"; 
						prop3_omniture = ""
						prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
					}
				}
			}
		}		
		break;

	case "servicios" :
		channel_omniture = "servicios";
		s.pageName = s.pageName.replace("elpaiscom", "elpaiscom/servicios");
		result_re = regexpPortadilla.exec(direccion);
		if (result_re )
		{
			//Todos los servicios como portada, incluso horoscopo que tiene profundidad
			prop3_omniture = ""
			prop1_omniture = seccion_omniture + ">" + result_re[2];
			
			if (result_re[2] == "diccionarios" && result_re[3] != "" && result_re[3] != "index.html")
			{
				s.pageName = "elpaiscom/servicios/diccionarios/buscador";
				s.prop47 = result_re[3].replace(/\//, ">");
			}
			else
			{
				if (result_re[2] == "sorteos" && result_re[3] != "" && result_re[3] != "index.html")
				{
					var regexpSorteos = /([^\/]*)\/?/;	
					var result_so = regexpSorteos.exec(result_re[3]);
					if (result_so)
					{
						prop1_omniture += ">" + result_so[1];
					}
				}
			}			
		}
		else
		{
			//La portada de servicios
			if (direccion == "http://servicios.elpais.com" || "http://servicios.elpais.com/index.html")
			{
				prop3_omniture = "portada"
				prop1_omniture = seccion_omniture + ">" + "home";
			}
			else
			{
				//Vamos a marcarlas para ver cuales son
				prop3_omniture = ""
				subseccion_omniture = "desconocido";
				prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
			}
		}
		break;
		
	case "eskup" :
		channel_omniture = "eskup";
		s.pageName = s.pageName.replace("elpaiscom", "elpaiscom/eskup");
		result_re3 = regexpPortada.exec(direccion);
		if (result_re3)
		{
			if ( result_re3[2].indexOf("*") == 0)
			{	//tema
				prop3_omniture = "eskup"
				subseccion_omniture = result_re3[2].substr(1); //el tema
				prop1_omniture = seccion_omniture + ">temas"; 
				s.prop49 = subseccion_omniture.replace(/\#.*$/, "");
			}
			else
			{
				if (result_re3[2].indexOf("-") > -1)  //enlace permanente
				{
					prop3_omniture = "eskup"
					//subseccion_omniture = result_re3[2];
					prop1_omniture = seccion_omniture + ">enlaces"; 
				}
				else
				{
					if (result_re3[2].indexOf(".html") == -1 && result_re3[2].indexOf(".pl") == -1)
					{
						//autor
						prop3_omniture = "eskup"
						subseccion_omniture = result_re3[2].replace(/\/.*/, ""); //el usuario
						prop1_omniture = seccion_omniture + ">usuarios"; 
						s.prop50 = 	subseccion_omniture;			
					}
					else
					{
						if (direccion == "http://eskup.elpais.com/index.html")
						{
							//autor
							prop3_omniture = "eskup"
							prop1_omniture = seccion_omniture + ">home"; 
						}
						else
						{
							if (direccion == "http://eskup.elpais.com/todos.html")
							{
								prop3_omniture = "eskup"
								subseccion_omniture = "todos"; 
								prop1_omniture = seccion_omniture + ">" + subseccion_omniture; 
							}
							else
							{
								prop3_omniture = "eskup"
								subseccion_omniture = "desconocido"; //incluye todos.html
								prop1_omniture = seccion_omniture + ">" + subseccion_omniture; 
							}
						}
					}
					
				}
			}
		}
		break;
			
	default :
	//todo
		//nuestra plataforma, los pagenames estan bien excepto en portadas de portales, lo arreglo en ese caso
		result_re = regexpNoticia.exec(direccion);
		if (result_re )
		{
			
			channel_omniture = result_re[2];	
			//Es una noticia
			seccion_omniture = result_re[2];
			subseccion_omniture = result_re[6];
			
			s.prop39 = "D=c45";
			
			if (typeof(listado_id_tags) != "undefined" )
			{
				tagsNoticia = ';' + listado_id_tags.replace(/,/g, ",;");
				s.products = tagsNoticia;
				s.list1 = listado_id_tags.replace(/,/g, ";");				
			}
			
			if (subseccion_omniture.indexOf("album") > -1 || subseccion_omniture == "fotorrelato")
			{
				if (typeof(subseccion_publi) != "undefined" && subseccion_publi != "")
						subseccion_omniture = subseccion_publi;
				else
					if (seccion_omniture == "elpais" || seccion_omniture == "brasil")
						subseccion_omniture = "sin_subseccion";
					else
						subseccion_omniture = seccion_omniture;

				seccion_omniture = "album";  
				
				prop3_omniture = "fotogaleria";
				prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
			}
			else
			{
				prop3_omniture = "articulo";
				if (seccion_omniture == "elpais" || seccion_omniture == "brasil")
				{
					seccion_omniture = subseccion_omniture; //caso de videos...
					subseccion_omniture = "";
					prop1_omniture = seccion_omniture;
				}
				else
				{
					prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
				}

				s.prop44 = result_re[3] + "/" + result_re[4] + "/" + result_re[5];
				
				s.events += ',event77';
				s.prop10 = "D=g";

				setTimeout('launchAjaxOMN("3|39",s.pageName + "|" + cadena_titulo,"event80", tagsNoticia)',60000);
			}
		
			//subimos a categoria de seccion lo que cae por debajo de elpais
			if (channel_omniture == "elpais" || channel_omniture == "brasil")
				channel_omniture = seccion_omniture;
			
			//desencadena el evento onload
			marcar_noticias_relacionadas = true;
			
			//Indicamos los ids de los botones de compartir
			ids_tracking.push({"id":"fb","tipo":"compartir","marca":"facebook"});
			ids_tracking.push({"id":"twit","tipo":"compartir","marca":"twitter"});
			ids_tracking.push({"id":"linkedin","tipo":"compartir","marca":"linkedin"});
			ids_tracking.push({"id":"gp","tipo":"compartir","marca":"google"});
			ids_tracking.push({"id":"bomn_tuenti","tipo":"compartir","marca":"tuenti"});
			ids_tracking.push({"id":"bomn_meneame","tipo":"compartir","marca":"meneame"});
			ids_tracking.push({"id":"bomn_whatsapp","tipo":"compartir","marca":"whatasapp"});
			ids_tracking.push({"id":"bomn_eskup","tipo":"compartir","marca":"eskup"});
			ids_tracking.push({"id":"enviar","tipo":"compartir","marca":"enviar"});
			ids_tracking.push({"id":"bomn_imprimir","tipo":"compartir","marca":"imprimir"});
			ids_tracking.push({"id":"bomn_guardar","tipo":"compartir","marca":"guardar"});
			
			
			//CXENSE
			var cX = cX || {}; cX.callQueue = cX.callQueue || [];
			cX.callQueue.push(['setSiteId', '9222334054942283911']);
			cX.callQueue.push(['sendPageViewEvent']);
			
			(function() { try { var scriptEl = document.createElement('script');
			scriptEl.type = 'text/javascript'; scriptEl.async = 'async';
			scriptEl.src = ('https:' == document.location.protocol) ?
			'https://scdn.cxense.com/cx.js' :
			'http://ep00.epimg.net/js/comun/cx/cx_new.js';
			var targetEl = document.getElementsByTagName('script')[0];
			targetEl.parentNode.insertBefore(scriptEl, targetEl); } catch (e) {};} ());
			
			if (typeof(listado_norm_tags) != "undefined")
			{
				var TAGS = listado_norm_tags.split(",");
				var it;
				var meta;
				for (it=0; it<TAGS.length; it++)
				{
					meta = document.createElement('meta');
					meta.setAttribute('name', 'cXenseParse:pri-collabulary');
					meta.setAttribute('content', TAGS[it]);
					document.getElementsByTagName('head')[0].appendChild(meta);
				}	
			}
			// FIN CXENSE			
		}
		else
		{
			if (direccion.indexOf("http://brasil.elpais.com/seccion") == 0) //portadilla de seccion virtual
			{
				result_re5 = regexpSeccionVirtual.exec(direccion);
				if (result_re5)
				{
					channel_omniture = result_re5[2];
					prop3_omniture = "portada"
					prop1_omniture =  result_re5[2] + ">home";				
				}
				else
				{
					channel_omniture = "brasil_desconocido";
					prop3_omniture = "portada"
					prop1_omniture =  "desconocido>home";				
				}
			}
			else
			{
				if (direccion.indexOf("http://elpais.com/especiales/") == 0 || direccion.indexOf("http://elpais.com/promociones/") == 0 || direccion.indexOf("elpais.com/publi-especial/") > -1 || direccion.indexOf("elpais.com/concursos/") > -1 || direccion.indexOf("http://www.elpais.com/especial") == 0 || direccion.indexOf("http://elpais.com/suscripciones/especiales") == 0) //especiales y concursos y suscripciones
				{
					result_re5 = regexpEspeciales.exec(direccion);
					if (result_re5)
					{
						channel_omniture = result_re5[1];
						seccion_omniture = result_re5[1];					
						
						prop1_omniture = seccion_omniture + ">" + result_re5[3] + "_" + result_re5[2]; //concatenamos el anio
						prop3_omniture = "especiales";					
					}
					else
					{
						result_re6 = regexpEspecialesPortadas.exec(direccion);
						if (result_re6)
						{
							channel_omniture = result_re6[2];
							seccion_omniture = result_re6[2];						
							prop1_omniture = seccion_omniture + ">" + result_re6[3];
							prop3_omniture = "portada";						
						}
						else
						{
							if (direccion == "http://elpais.com/especiales/" || direccion == "http://elpais.com/especiales/index.html")
							{
								channel_omniture = "especiales";
								seccion_omniture = "especiales";						
								prop1_omniture = seccion_omniture + ">home";
								prop3_omniture = "portada";							
							}
							else
							{
								if (direccion == "http://elpais.com/promociones/")
								{
									channel_omniture = "promociones";
									seccion_omniture = "promociones";
									prop1_omniture = seccion_omniture + ">home";
									prop3_omniture = "portada";										
								}
								else
								{
									channel_omniture = "especiales";
									seccion_omniture = "especiales";						
									prop1_omniture = seccion_omniture + ">desconocido";
									prop3_omniture = "";
								}
							}
						}
					}
				}
				else
				{
					//Diario lo marcamos distinto . las noticias ya se filtraron mas atras y la portada de diario hara match como portadilla
					result_re6 = regexpDiario.exec(direccion); 
					if(result_re6)
					{
						channel_omniture = "diario";
						seccion_omniture = "diario";	
						prop3_omniture = "portada"
						if (result_re6[5] == "")  //portadilla del dia
							subseccion_omniture = "primera";
						else
							subseccion_omniture = result_re6[5]; //portadilla de seccion
							
						prop1_omniture = seccion_omniture + ">" + subseccion_omniture;
					}
					else
					{
						result_re2 = regexpPortadilla.exec(direccion);
						//No tiene forma de noticia ni especial puede ser una portadilla u otra cosa. ej tags
						if (result_re2)
						{
						  channel_omniture = result_re2[2];
						  //Es portada o portadilla
						  seccion_omniture = result_re2[2];
						  if (result_re2[3].indexOf("index.html") == 0 || result_re2[3] == "") //Portada de seccion
						  {
							if(result_re2[2] == "buscador")
							{
								if (typeof(texto_busqueda) != "undefined" && texto_busqueda != "")
									s.prop16 = texto_busqueda;
								else
									s.prop16 = "";
									
								s.events += ",event1";
								
								if (typeof(contador_busqueda) != "undefined" && parseInt(contador_busqueda) > 0)
									s.events += ",event31";
								else
									s.events += ",event32";
							}
							prop3_omniture = "portada"
							prop1_omniture = seccion_omniture + ">home";
						  }
						  else
						  {
							//Si no tiene / es portadilla y sino  cualquier cosa
							//Portadilla subseccion
																						
							if (result_re2[3].indexOf("/") == -1)
							{
								subseccion_omniture = result_re2[3].replace(/\.html.*/, "");
								if (seccion_omniture == "elpais")
								{
									seccion_omniture = subseccion_omniture;
									subseccion_omniture = "";
								}

								prop3_omniture = "portada"
								prop1_omniture =  subseccion_omniture != "" ? seccion_omniture + ">" + subseccion_omniture : seccion_omniture + ">home";
							}
							else
							{
								if (result_re2[2] == "tag" || result_re2[2] == "autor" || result_re2[2] == "agr")
								{
									if (result_re2[3].indexOf("listado") == 0 )
									{
										
										prop3_omniture = "portada"
										prop1_omniture = "tag>listado";
									}
									else
									{
										//Varias posibilidades
										var tagRegex = /([^\/]+)\/([^\/]+)\/?.*/i; 
										var result_re6 = tagRegex.exec(result_re2[3]);
			
										if (result_re6)
											subseccion_omniture = result_re6[1] + "_" + result_re6[2];
										else
												subseccion_omniture = result_re2[3];

										if (result_re2[1] == "elviajero.elpais.com") //Derivamos el marcado de los tag a un subnivel de elviajero
										{
												prop1_omniture = "elviajero>" + result_re2[2] + ">" +  subseccion_omniture;
												channel_omniture = "elviajero";
										}       
										else
												prop1_omniture = result_re2[2] + ">" +  subseccion_omniture;


										prop3_omniture = "portada"
									}
								}
								else
								{
									
									if (result_re2[2] == "elviajero" && result_re2[3].indexOf("destinos/" > -1)) //caso especial del viajero incluye uno por cada letra del alfabeto, pero marcamos igual
									{
											channel_omniture = "elviajero";
											prop3_omniture = "portada"
											prop1_omniture = "elviajero>destinos";
									}
									else
									{
										prop3_omniture = ""
										prop1_omniture = seccion_omniture + ">" + "desconocido";
									}
								}
							}
						  }
						}
						else
						{
							
							//Portales desapareceran
							//Puede ser portada
							
							result_re3 = regexpPortada.exec(direccion);
							if (result_re3)
								result_re3[2] = result_re3[2].replace(/\?.*/,""); //quitamos lo parametros

							if (result_re3 && (result_re3[2].indexOf("index.html") == 0 || result_re3[2] == ""))						
							{
								prop3_omniture = "portada" 
								seccion_omniture = result_re3[1].replace(/elpais\.com/, "");
								
								if (seccion_omniture == "" || result_re3[1] == "brasil.elpais.com" )
								{
									prop1_omniture = "home";
									channel_omniture = "home";
								}
								else
								{
									channel_omniture = seccion_omniture.substring(0,seccion_omniture.length-1);
									prop1_omniture = channel_omniture + ">home";
									s.pageName = "elpaiscom/" + channel_omniture;
								}
							}
							else //Ni idea de lo que puede ser
							{
								channel_omniture = "desconocido"
								prop3_omniture = ""
								prop1_omniture = "desconocido" + ">" + "desconocido";
							}
						}
						if (channel_omniture == "elpais")
							channel_omniture = seccion_omniture;
					}
				}
			}
		}
	}

	if (prop1_omniture == "cultura>television")
	{
		channel_omniture = "sociedad";
		prop1_omniture = "sociedad>television";
	}
	
	s.channel = channel_omniture;

	if (channel_omniture == "deportes")
		prop31_omniture = "deportes";
	
	s.prop1 = prop1_omniture;
	s.prop2 = "";
	s.prop3 = prop3_omniture;
	s.prop4 = "";
	s.prop5 = "D=g";
	s.prop6 = "D=r";	
	s.prop7 = "";
	s.prop8 = s.getTimeParting('d',gmt); 			// Set day  (Jueves)
	s.prop9 = s.getTimeParting('w', gmt);			// Set weekday (laborable/festivo) 		
	s.prop11 = "";
	s.prop12 = "";
	s.prop13 = "";
	s.prop14 = "españa";							// Pais del medio
	s.prop15 = "";
	s.prop17 = canal_omniture;						// Canal
	s.prop18 = "prisa";								// Organizacion
	s.prop19 = "el pais";							// Producto
	s.prop20 = dominio_omniture;					// Dominio
	s.prop21 = s.getNewRepeat();   					// Usuario Nuevo o recurrente
	if (typeof(PEPuname) != "undefined")
		s.prop62 = "logueado";
	else
		s.prop62 = "anónimo";
	s.prop24 = hours+":"+minutes+":"+seconds;		// Set hour:minutes:seconds (12:32:48)  	
	s.prop35 = s.getTimeParting('h', gmt);			// Set hour (12:00PM) 
	s.prop30 = "noticias";							// Unidad de Negocio 	
	s.prop31 = prop31_omniture;						// tematica
	if (typeof(PEPuid) != "undefined")
		s.prop34 = PEPuid;
	s.prop36 = s.getTimeParting('d', gmt)+"-"+day+"/"+month+"/"+fecha.getFullYear()+"-"+s.prop24;	// Join Date (Jueves-15/9/2012-12:32:48)   
	
	//soperte mp4 indicado en el useragent
	var v=document.createElement('video');
	var soporteMP4 = v.canPlayType && (!!v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,'') || !!v.canPlayType( 'video/mp4; codecs="avc1.42E01E"').replace(/no/,''));		
	
	if (soporteMP4)
		s.prop57 = 'D="con_mp4-"+User-Agent';
	else
		s.prop57 = 'D="sin_mp4-"+User-Agent';
	
		
	s.prop60 = s.getDaysSinceLastVisit('s_lv');   																	// Dias última visita 
	
	/*
	Jerarquias
	*/
	s.hier1 = 'D=c18+">"+c19+">"+c20+">"+c1+">"pageName';
	
	
	
	if (marcar_noticias_relacionadas || ids_tracking.length > 0)
	{
		OMNaddEvent(window, 'load', function(){
			//Noticias relacionadas
			if (document.getElementById('elpais_gpt-BTN1'))
			{
					var nodoPubli  = document.getElementById('elpais_gpt-BTN1');
					var nodosColumna = nodoPubli.parentNode.parentNode.getElementsByTagName("div");
					var idx;
					for (idx=0; idx<nodosColumna.length; idx++)
					{
							if (nodosColumna[idx].className.indexOf('otros_medios') > -1)
							{
									var nodosInternos = nodosColumna[idx].getElementsByTagName("a");
									var idx_int;
									for (idx_int=0; idx_int < nodosInternos.length; idx_int++)
									{
											if (nodosInternos[idx_int].hostname.indexOf('elpais.com') == -1)
											{
													nodosInternos[idx_int].target = "_blank";
													var nod = nodosInternos[idx_int];
													nod.onclick = function(){
															launchAjaxOMN("3|39|68", s.pageName + "|" + cadena_titulo + "|" + this.href, "event22");
													}
											}
									}
									
									break;
							}
					}
			}
			
			var i;
			for (i=0; i< ids_tracking.length; i++)
			{
				if (document.getElementById(ids_tracking[i].id))
				{
					if (document.getElementById(ids_tracking[i].id).href != undefined && document.getElementById(ids_tracking[i].id).href != "" && document.getElementById(ids_tracking[i].id).href.indexOf('javascript') == -1)
						document.getElementById(ids_tracking[i].id).target = "_blank";
					document.getElementById(ids_tracking[i].id).idx = i;
					EPETaddEvent(document.getElementById(ids_tracking[i].id), "click", function(){marcadoLinks(this)});
				}
			}
		});				 
	}
	
	//redefinicion de variables del objeto s. Permite un marcado forzado.

	if (typeof(redefinicion_variables_om) != "undefined")
	{
		for (var key in redefinicion_variables_om)
		{
			s[key] = redefinicion_variables_om[key];
		}
	}

}
else
{
    cambiaDatosOmniture();
}


s.server = window.location.host;

if (marcado_automatico)
{
	var s_code=s.t();
	if (s_code)
		document.write(s_code);
}



//digilant
if (typeof(code_digilant) == "undefined" )
{
	function EPETCreaIframeDigilant(id, ancho, alto, scroll, borde, div, code)
	{
		//Creamos el iframe
		var iframe=document.createElement("iframe");
		iframe.setAttribute("id",id);
		iframe.setAttribute("width",ancho);
		iframe.setAttribute("height",alto);
		iframe.setAttribute("scrolling", scroll);
		iframe.frameBorder = borde; //para que funcione en iexplorer

		//Lo insertamos en el div
		document.getElementById(div).appendChild(iframe);

		//Escribimos ese codigo en el iframe
		iFrDoc = document.getElementById(id).contentWindow.document || document.getElementById(id).contentDocument.document;
		iFrDoc.write(code);
		iFrDoc.close();
	}	

	var codigoDigilant = '<html>\n<body>\n' +
		'<script language="JavaScript" type="text/javascript" src="http://www.wtp101.com/pixel?id=16302&pb=1100&rd=3&st=' + escape(s.prop20) + '&se=' + escape(s.channel) + '&yr=&s=&ct=&ca=' + escape(s.prop31) +'"></scr' + 'ipt>\n'+
		'</body>\n</html>\n';
	document.write('<div id="idDigilant" style="display:none"></div>');
	setTimeout(function(){
		if (document.getElementById("idDigilant"))
			EPETCreaIframeDigilant("ifDigilant", 1, 1, "no", 0, "idDigilant", codigoDigilant);
	},300);
}

	
