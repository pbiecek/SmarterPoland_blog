if(document.addEventListener){
	window.addEventListener("load", anadirCompartir, false);
}
else{
	window.attachEvent('onload', anadirCompartir ); //IE
}

function anadirCompartir() {
	
	
	var i;
	var j;
	if(!CompartirRS.hasOwnProperty('titulo'))
	{ CompartirRS.titulo = ( document.getElementsByTagName('title') )? document.getElementsByTagName('title')[0].innerHTML : '';}
	
	if(!CompartirRS.hasOwnProperty('url'))
	{ CompartirRS.url = window.location.href;}
	
	var divs = document.getElementsByTagName("div");
	for(i=0;i<divs.length;i++){

		if(divs[i].className.indexOf("barra_compartir")!=-1)
		{
		
			var enlaces = divs[i].getElementsByTagName("a"); 	
				for(j=0;j<enlaces.length;j++){
				var url = '';
				var clase = enlaces[j].className;
				var tituloCompartirEnc = encodeURIComponent(CompartirRS.titulo);
				var urlCompartirEnc = encodeURIComponent(CompartirRS.url);
				
				var mod_compartir = {
					'eskup': 'http://eskup.elpais.com/todos.html?m='+tituloCompartirEnc+'+-+'+urlCompartirEnc,
					'twitter': 'http://twitter.com/intent/tweet?status='+tituloCompartirEnc+'+%3E%3E+'+urlCompartirEnc,
					'tuenti': 'http://www.tuenti.com/share?url='+urlCompartirEnc,
					'facebook': 'http://www.facebook.com/share.php?u='+CompartirRS.url,
					'meneame': 'http://meneame.net/submit.php?url='+urlCompartirEnc+'&amp;ei=UTF',
					'reader': 'http://www.google.com/reader/link?title='+tituloCompartirEnc+'&amp;url='+urlCompartirEnc,
					'googlemas1': 'https://plus.google.com/share?url='+CompartirRS.url,
					'google': 'https://plus.google.com/share?url='+CompartirRS.url
					} 
				
				if (mod_compartir.hasOwnProperty(clase))
				{
					var url = mod_compartir[clase];
					enlaces[j].onclick =  function(url){return function() {window.open(url,'_blank');return false;}}(url);				
				}
			}
		}
	}
}
