function createCookie(name,value,days,hours,domain){
	if(days){
		var date=new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000)+(hours*60*60*1000));
		var expires="; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie=name+"="+value+expires+"; path=/"+((domain)?';domain='+domain : '');
}

function readCookie(name){
	var nameEQ=name+"=";
	var ca=document.cookie.split(';');
	var i;
	for(i=0;i<ca.length;i++){
		var c=ca[i];
		while(c.charAt(0)==' ') c=c.substring(1,c.length);
		if(c.indexOf(nameEQ)==0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
var profileCookie=readCookie('USER_PROF');
