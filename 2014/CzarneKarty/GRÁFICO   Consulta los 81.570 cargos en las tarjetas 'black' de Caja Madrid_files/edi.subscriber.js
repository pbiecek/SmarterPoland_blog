/*
===========================================================================
www.eldiario.es
Subscriber JS functions
===========================================================================
*/

Namespace.Register("EDI.subscriber");
Namespace.Register("EDI.subscriber.content");

EDI.subscriber.identificationInit = function(jObj) {
	BBT.log("identification init");

	var jFieldSetHaveuser = jObj.find("#step-haveuser");
	var jFieldSetWho = jObj.find("#step-who");
	var jRadioHaveUser = jFieldSetHaveuser.find("input[name='haveuser']");
	var jRadioWho = jFieldSetWho.find("input[name='who']");

	jRadioWho.bind("click", function() {
			jFieldSetHaveuser.show();
		});

	jRadioHaveUser.bind("click", function() {
			var who = jFieldSetWho.find("input[name='who']:checked").val();
			if (typeof who == 'undefined') {
				jRadioHaveUser.prop('checked',false);
				alert("Debe elegir el afortunado");
				return false;
			}

			EDI.user.utils.renderMO(jObj.find(".step-haveuser"), {"module": "EDISubscriberSignUpFormMO", "step": jQuery(this).val()});
		});
};

EDI.subscriber.haveuserInit = function(jForm) {
	BBT.log("haveuser init");
	EDI.validation.init(jForm);
	jForm.find("#edi-haveuser-submit").bind("click", function() {
			var validForm = EDI.validation.IsValidForm(jForm);

			if (validForm == true) {
				jForm.find(".ajaxloader-loader, #edi-haveuser-submit").toggle();
				jQuery.post(jForm.attr("action"), EDI.validation.getFields(jForm), function(_response) {
						var response = eval(_response);
						if (response["error"] == 0) {
							jForm.closest("div").html(response["html"]);
						} else if (response["error"] == 10) {
							alert(response["message"]);
							EDI.validation.showErrors(jForm, {"email": {"fieldErrorCode": 100, "fieldErrorMessage": ""},
										"password": {"fieldErrorCode": 200, "fieldErrorMessage": ""}});
						} else if (response["error"] == 11) {
							alert(response["message"]);
							window.location = "https://seguro.eldiario.es/usuarios/mi-perfil.html";
						}
						jForm.find(".ajaxloader-loader, #edi-haveuser-submit").toggle();
					});
			} else {
				alert("Rellene correctamente el formulario");
			}

			return false;
		});
};

EDI.subscriber.finalFormInit = function (jForm) {
	EDI.validation.init(jForm);

	jForm.find("#edi-signup-pay").bind("click", function() {
			var validForm = EDI.validation.IsValidForm(jForm);
			if (validForm == true) {

				var params = EDI.validation.getFields(jForm);

				jQuery.extend(params, {"haveuser": jQuery("#step-haveuser").find("input[name='haveuser']:checked").val()});
				jForm.find(".ajaxloader-loader, #edi-signup-pay").toggle();
				jQuery.post(jForm.attr("action"), params, function(_response) {
						var response = eval(_response);
						if (response["error"] == 0) {
   							window.location = response["TPVURL"];
						} else {
							EDI.validation.showErrors(jForm, response["fields"]);
							if (response["message"] != "") {
							    if (response["buttonText"] != ""
								&& response["buttonLink"] != "") {
								EDI.subscriber.modalMessage(response["message"], response["buttonText"], response["buttonLink"]);
							    } else {
								alert(reponse["message"]);
							    }
							}
						}
						jForm.find(".ajaxloader-loader, #edi-signup-pay").toggle();
					});
			}
			return false;
		});
};

EDI.subscriber.modalMessage = function(message, buttonText, buttonLink) {
    var button = "";
    if (buttonText != undefined
	&& buttonLink != undefined) {
	button = '<p></p><p class="button-send tx-ct edi-report-ok"><a href="' + buttonLink + '" class="bt3 typ-s5 rnd5">' + buttonText + '</a></p>';
    }

    var html = '<div style="padding:10px" class="cp-login-reply mssg md"><div class="bd"><p><strong class="dest">' + message + '</strong></p>' + button + '</div></div>';

    jQuery.colorbox({html: html, width:"740", opacity:".7"});
};


EDI.subscriber.content.init = function(jObj) {

	if (EDI.user.utils.userIsLogged()) {
		jNotSubscriber = jObj.find(".edi-user-not-subscriber");
		if (EDI.user.utils.userIsSubscriber() == true) {
			jObj.find(".msg-edi-user-subscriber").show();
		} else {
			jObj.find(".msg-edi-user-not-subscriber").show();
			jNotSubscriber.show();
		}
	} else {
		var jNotLogged = jObj.find(".edi-user-not-logged");
		jObj.find(".msg-edi-user-not-subscriber").show();
		jNotLogged.show();
		EDI.subscriber.content.loginInit(jNotLogged.find("form"));
	}
};

EDI.subscriber.content.loginInit = function(jForm) {

	EDI.validation.init(jForm);
	jForm.find(".edi-login-button").bind("click", function() {
			validForm = EDI.validation.IsValidForm(jForm);

			if (validForm == true) {
				jForm.find(".ajaxloader-loader, .edi-login-button").toggle();
				jQuery.post(jForm.attr("action"), EDI.validation.getFields(jForm), function(_response) {
						var response = BBT.fixJson(_response);
						if (response["error"] == 1) {
							alert(response["message"]);
							EDI.validation.showErrors(jForm, {"email": {"fieldErrorCode": 100, "fieldErrorMessage": ""},
										"password": {"fieldErrorCode": 200, "fieldErrorMessage": ""}});
						} else {
							window.location.reload();
						}
						jForm.find(".ajaxloader-loader, .edi-login-button").toggle();
					});
			} else {
				alert("Rellene correctamente el formulario");
			}

			return false;
		});

    jForm.find("input").keypress(function (e) {
	if (e.which == 13) {
	    jForm.find(".edi-login-button").trigger('click');

	    jForm.find("#edi-login-submit").click();
	}
    });
};
