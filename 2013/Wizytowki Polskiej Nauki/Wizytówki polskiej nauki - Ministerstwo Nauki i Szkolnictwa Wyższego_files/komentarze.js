var parametr = '';
window.addEvent('domready', function() {
	ustawEventyListy();
	if( $('komentarz-dodaj-button') ) {
		$('komentarz-dodaj-button').addEvent('click', function() {
			wyslijKomentarz();
		});
		$('komentarzOpis').addEvent('keypress', function() {
			return ($('komentarzOpis').get('value').length <= JS.lang.limitZnakow);
		});
	}
});

function ustawEventyListy() {
	$$('a[id^=komentarzstrona_]').each(function(element) {
		$(element).addEvent('click',function() {
			var idEl = $(element).get('id');
			pobierzKomentarze(idEl.substr(16));
			return false;
		});
	});

	$$('a[id^=stronapoprzednianastepna_]').each(function(element) {
		$(element).addEvent('click',function() {
			var idEl = $(element).get('id');
			pobierzKomentarze(idEl.substr(25));
			return false;
		});
	});

	$$('a[id^=naruszenie_]').each(function(element) {
		$(element).addEvent('click',function() {
			var idEl = $(element).get('id');
			zglosNaruszenieTresci(idEl.substr(11));
		});
	});

	$$('a[id^=wartosciowanietak_]').each(function(element) {
		$(element).addEvent('click',function() {
			var idEl = $(element).get('id');
			wartosciowanieKomentarza(idEl.substr(18), 'tak');
		});
	});

	$$('a[id^=wartosciowanienie_]').each(function(element) {
		$(element).addEvent('click',function() {
			var idEl = $(element).get('id');
			wartosciowanieKomentarza(idEl.substr(18), 'nie');
		});
	});
}

function pobierzKomentarze(element) {
	var dataAjax = 'typ='+typKomentarz+'&element='+elementKomentarz;
	if( kategoriaKomentarz != '' ) {
		dataAjax += '&kategoria='+kategoriaKomentarz;
	}

	new Request({
		url: '/ajax/komentarze/strona,'+element+'.html',
		data: dataAjax,
		method: 'post',
		onSuccess: function(data){
			if( data != undefined && data != null ) {
				$('lista-komentarzy').set('html',data);
				ustawEventyListy();
			}
		},
		onFailure: function(){
		}
	}).send();

}

function wartosciowanieKomentarza(element, typ) {
	var dataAjax = 'typ='+typKomentarz+'&element='+elementKomentarz;
	if( kategoriaKomentarz != '' ) {
		dataAjax += '&kategoria='+kategoriaKomentarz;
	}
	dataAjax += '&komentarz='+element;
	dataAjax += '&wartosc='+typ;

	new Request({
		url: '/ajax/komentarze/akcja,wartosciowanie.html',
		data: dataAjax,
		method: 'post',
		onSuccess: function(data){
			if( data != undefined && data != null ) {
				if( data == 'ponowne' ) {
					$('wartosciowanie-komunikat_'+element).set('html', JS.lang.wartosciowanieKomunikatPonowne);
				} else if( data == 'blad' ) {
					$('wartosciowanie-komunikat_'+element).set('html', JS.lang.naruszenieKomunikatBlad);
				} else {
					$('wartosciowanie-komunikat_'+element).set('html', JS.lang.wartosciowanieKomunikat);
					if( typ == 'nie' ) {
						$('k_suma_nie_'+element).set('html','(' + data.substr(6) + ')');
					} else {
						$('k_suma_tak_'+element).set('html','(' + data.substr(6) + ')');
					}
				}
			}
		},
		onFailure: function(){
		}
	}).send();

}

function zglosNaruszenieTresci(element) {
	var dataAjax = 'typ='+typKomentarz+'&element='+elementKomentarz;
	if( kategoriaKomentarz != '' ) {
		dataAjax += '&kategoria='+kategoriaKomentarz;
	}
	dataAjax += '&komentarz='+element;

	new Request({
		url: '/ajax/komentarze/akcja,naruszenie.html',
		data: dataAjax,
		method: 'post',
		onSuccess: function(data){
			if( data != undefined && data != null ) {
				if( data == 'ponowne' ) {
					$('naruszenie-komunikat_'+element).set('html', JS.lang.naruszenieKomunikatPonowne);
				} else if( data == 'blad' ) {
					$('naruszenie-komunikat_'+element).set('html', JS.lang.naruszenieKomunikatBlad);
				} else {
					$('naruszenie-komunikat_'+element).set('html', JS.lang.naruszenieKomunikat);
				}
			}
		},
		onFailure: function(){
		}
	}).send();

}

function wyslijKomentarz() {
	var opisKom = encodeURIComponent($('komentarzOpis').get('value'));
	var autorKom = null;

	if( opisKom == '' ) {
		alert('Uzupełnij pole "Komentarz".');
	} else if( $('komentarzAutor') != null && $('komentarzAutor').get('value') == '' ) {
		alert('Uzupełnij pole "Autor".');
	} else {
		var dataAjax = 'typ='+typKomentarz+'&element='+elementKomentarz;
		if( kategoriaKomentarz != '' ) {
			dataAjax += '&kategoria='+kategoriaKomentarz;
		}
		dataAjax += '&opis='+opisKom;
		if( $('komentarzAutor') != null){
			autorKom = $('komentarzAutor').get('value');
		}
		if( autorKom != null ) {
			dataAjax += '&autor='+autorKom;
		}

		if( $$("input[name=captchakomentarz_dodaj]")[0] != undefined ) {
			dataAjax += '&captcha='+$$("input[name=captchakomentarz_dodaj]")[0].get('value');
		}


		new Request.JSON({
			url: '/ajax/komentarze/akcja,dodaj.html',
			data: dataAjax,
			method: 'post',
			onSuccess: function(data){
				if( data != undefined && data != null ) {
					if( data.komunikat == 'sukces' ) {
						$('komentarz-komunikat').set('html', JS.lang.dodanoKomentarz);
						$('komentarzOpis').set('value','');
					} else {
						$('komentarz-komunikat').set('html',data.komunikat);
					}
					if( $$("input[name=captchakomentarz_dodaj]")[0] != undefined ) {
						wygenerujCaptche($('captchaRandId')[0].get('value'));
					}

					//jeśli komentarze nie są premoderowalne - pobieram raz jeszcze komentarze
					if( premoderowalne == 0 ) {
						pobierzKomentarze(1);
					}
				}
			},
			onFailure: function(){
			}
		}).send();

	}

	function wygenerujCaptche( captchaRandId ) {
		$('captcha'+captchaRandId).set('src','/captcha/komentarz_dodaj.html?'+Math.random());
		$('captcha-form'+captchaRandId).focus();
	}
}