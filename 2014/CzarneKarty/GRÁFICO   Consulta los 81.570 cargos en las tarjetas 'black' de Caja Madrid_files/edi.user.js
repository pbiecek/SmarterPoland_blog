/*
  ===========================================================================
  www.eldiario.es
  User JS functions
  ===========================================================================
*/


Namespace.Register("EDI.user");
Namespace.Register("EDI.user.profile");
Namespace.Register("EDI.user.pol");
Namespace.Register("EDI.user.contact");
Namespace.Register("EDI.user.utils");
Namespace.Register("EDI.user.register");
Namespace.Register("EDI.user.password");
Namespace.Register("EDI.user.facebook");
Namespace.Register("EDI.user.customContact");
Namespace.Register("EDI.user.comments");
Namespace.Register("EDI.user.author");
Namespace.Register("EDI.user.cancelSuscription");
Namespace.Register("EDI.user.simpleContact");

EDI.user.profile.privateSwitcher = function() {
    var publicProfileUrl = jQuery.cookie('628a7746b5b06c7fbde00817d6b6ec74');
    var privateProfileUrl = jQuery.cookie('87b3d21eda3b0d29420d15165410a1c6');
    if (publicProfileUrl != null
	&& privateProfileUrl != null
	&& publicProfileUrl == document.URL) {
	window.location = privateProfileUrl;
    }
}

EDI.user.profile.getAdditionalDatas = function(jForm) {
    return {"newsletters": EDI.validation.getFieldValue(jForm.find("input[name='newsletter']")),
	    "ediSendDigitalMagazine": EDI.validation.getFieldValue(jForm.find("input[name='ediSendDigitalMagazine']"))};
}

EDI.user.profile.editSubmit = function(jForm) {

    jForm.find(".ajaxloader-loader, #edi-form-submit").toggle();
    jForm.ajaxForm({dataType: 'json',
		    success: function(_response) {
			var response = eval(_response);
			if (response["error"] == 0) {
			    alert(response["message"]);
			    window.location.reload();
			} else {
			    EDI.validation.showErrors(jForm, response["fields"]);
			    if (response["message"] != "") {
				alert(response["message"]);
			    } else {
				alert("Rellene correctamente el formulario");
			    }
			}
			jForm.find(".ajaxloader-loader, #edi-form-submit").toggle();
		    },
		    data: EDI.user.profile.getAdditionalDatas(jForm)
		   }
		  );
    jForm.submit();
}

EDI.user.profile.editSubmitSimple = function(jForm) {

    jForm.find(".ajaxloader-loader, #edi-form-submit").toggle();
    var params = EDI.validation.getFields(jForm);
    params["newsletters"] = EDI.validation.getFieldValue(jForm.find("input[name='newsletter']"));

    jQuery.post(jForm.attr("action"), params, function(_response) {
	var response = BBT.fixJson(_response);
	if (response["error"] == 0) {
	    alert(response["message"]);
	    window.location.reload();
	} else {
	    EDI.validation.showErrors(jForm, response["fields"]);
	    if (response["message"] != "") {
		alert(response["message"]);
	    } else {
		alert("Rellene correctamente el formulario");
	    }
	}
	jForm.find(".ajaxloader-loader, #edi-form-submit").toggle();
    });
}

EDI.user.profile.editInit = function(jForm) {
    jForm.find("#edi-form-submit").bind("click", function() {
	validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
		var avatar = EDI.validation.getFieldValue(jForm.find("input[name='avatar']"));
		if (avatar == "") {
			EDI.user.profile.editSubmitSimple(jForm);
		} else {
			EDI.user.profile.editSubmit(jForm);
		}
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });

    jForm.find("#edi-form-discart").bind("click", function() {
	window.location.reload();
	return false;
    });
}

EDI.user.profile.editorInit = function(jObj) {
    jObj.find("#edi-edit-show").bind("click", function() {
	jEditForm = jObj.find("#frm_profile");
	if (jEditForm.hasClass("display-state_hidden") == true) {
	    jEditForm.show("slow");
	    jEditForm.removeClass("display-state_hidden");
	    jEditForm.addClass("display-state_visible");
	} else {
	    jEditForm.hide("slow");
	    jEditForm.removeClass("display-state_visible");
	    jEditForm.addClass("display-state_hidden");
	}
	return false;
    });

    jObj.find(".frm-user-profile-wrapper #edi-delete-profile").bind("click", function() {
	if(confirm("¿Está seguro que desea darse de baja?")) {
	    jQuery.post(jQuery(this).attr("href"), {"userId": BBT.getProperty(jQuery(this), "userId")}, function(_response) {
		var response =  eval(_response);
		alert(response["message"]);
	    });
	}
	return false;
    });
}

EDI.user.profile.headerInit = function(jObj) {
    var nick = jQuery.cookie('64c90a95acc310c9e0ea2440f0ecfb62');
    var avatar = jQuery.cookie('6fd55b239b9d3f0cdc706ce2f4ac3123');

    if (EDI.user.utils.userIsLogged() && nick != null) {
	jObj.find("#edi-header-logged").show();
	jObj.find("#edi-header-notlogged").hide();
	jObj.find("#edi-header-logged").find("img").attr("src", avatar);
	jObj.find("#edi-header-logged").find("img").attr("alt", nick);
	jObj.find("#edi-header-logged").find("img").attr("title", nick);
	jQuery(".main-search").addClass("main-search-logged");
    } else {
	jObj.find("#edi-header-logged").hide();
	jObj.find("#edi-header-notlogged").show();
	jQuery(".mainSearchForm").removeClass("main-search-logged");
    }

    jObj.find("#edi-user-logout").bind("click", function() {
	jQuery.post(jQuery(this).attr("href"), function(_response) {
	    var response = BBT.fixJson(_response);
	    if (response["error"] == 0) {
		window.location.reload();
	    } else {
		alert(response["message"]);
	    }
	});
	return false;
    });
}

EDI.user.pol.init = function(jObj, mode) {

    var contentId = BBT.getProperty(jObj, "contentId");
    var contentUrl = jObj.find(".edi-pol-url").attr("href");

    jObj.find("#edi-pol-submit").bind("click", function() {

	var optionId = jObj.find("input[name='edi-poll-option']:checked").val();

	if (optionId) {
	    jQuery.post("/bbtcontent/poll/vote/" + contentId + "/" + optionId, function (_response) {
		var response = BBT.fixJson(_response);
		if (response["error"] == 0) {
		    if (mode == "module") {
			window.location = contentUrl + "#results";
		    } else {
			window.location.reload();
		    }
		} else {
		    alert(response["message"]);
		}
	    });
	}
	return false;
    });
}

EDI.user.contact.init = function(jObj) {

    var jForm = jObj.find("form");

    EDI.validation.newCaptcha(jForm.find(".captcha-wrp"));

    EDI.validation.refreshCaptcha(jForm);

    jForm.find(".edi-contact-send-button").bind("click", function() {
	validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
	    EDI.user.contact.create(jForm);
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });
}

EDI.user.contact.create = function(jForm) {
    var url = jForm.attr("action");
    var formData = EDI.validation.getFields(jForm);

    jQuery.post(url, formData, function(_response) {
	var response =  eval(_response);
	if (response["error"] == 0) {
	    if (response["message"] != "") {
		alert(response["message"]);
		EDI.validation.newCaptcha(jForm.find(".captcha-wrp"));
		EDI.validation.emptyForm(jForm);
	    } else {
		alert("¡Gracias! Tus datos han sido enviados");
		EDI.validation.newCaptcha(jForm.find(".captcha-wrp"));
		EDI.validation.emptyForm(jForm);
	    }
	} else {
	    EDI.validation.newCaptcha(jForm);
	    EDI.validation.showErrors(jForm, response["fields"]);
	    if (response["message"] != "") {
		alert(response["message"]);
	    } else {
		alert("No se ha podido enviar el formulario, por favor, inténtelo más tarde");
	    }
	}
    });
}

EDI.user.utils.userIsSubscriber = function() {

    var isSubscriber = jQuery.cookie('54dec9d7fb2f16c72df8fe956d32242d');

    if (isSubscriber != 1 && EDI.user.utils.userIsLogged()) {
	    var initialDate = new Date(2014, 8, 18);
	    var finalDate = new Date(2014, 8, 18, 23, 59, 59);
	    var actualDate = new Date();
	    if (actualDate.getTime() >= initialDate.getTime() && actualDate.getTime() <= finalDate.getTime()) {
		    isSubscriber = 1;
	    }
    }

    if (isSubscriber == 1) {
	return true;
    }

    return false;
}

EDI.user.utils.userIsLogged = function() {
    var nick = jQuery.cookie('64c90a95acc310c9e0ea2440f0ecfb62');
    var sessionId = jQuery.cookie('eldiario_session_id_v2');

    return nick != null && sessionId != null;
}

EDI.user.utils.modalIdentification = function() {
    var msgType = "comentar"
    var url = "/utils/rendermo.json";
    jQuery.get(url, {"module" : "EDIUserModalIdentificationMO","msgType" : msgType}, function(_response) {
	var response =  BBT.fixJson(_response);
	if (response["error"] != 0) {
	    alert("No se ha podido enviar el formulario, por favor, inténtelo más tarde");
	    return false;
	}
	jQuery.colorbox({html: response["html"], width:"703", opacity:".7"});

	jModal = jQuery("#inline_content");

	
	
	EDI.user.facebook.loginInit(jModal.find("#edi-fb-login"), "/bbtfacebook/login_redirect.html?scope=email");
	

	jForm = jModal.find("form");

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
			EDI.user.utils.modalSendComment();
		    }
		    jForm.find(".ajaxloader-loader, .edi-login-button").toggle();
		});

	    } else {
		alert("Rellene correctamente el formulario");
	    }

	    return false;
	});

	jForm.find(".edi-create-button").bind("click", function() {
	    EDI.user.utils.renderMO(jModal, {"module" : "EDIUserRegisterFormMO", "registerMode": "modal"});
	    return false;
	});
    });
}

EDI.user.utils.modalSendComment = function() {
    var jForm = jQuery("#edi-comment-submit form");
    if (jForm.length > 0) {
	EDI.comments.create(jForm, "");
	jQuery.colorbox.close();
    } else {
	window.location = "/";
    }
}

EDI.user.utils.renderMO = function (jObj, params) {

    var url = "/utils/rendermo.json";
    jQuery.get(url, params, function(_response) {
	var response =  BBT.fixJson(_response);

	if (response["error"] == 0) {
	    jObj.html(response["html"]);
	} else {
	    alert(params["message"]);
	}
    });
}

EDI.user.utils.renderMONotFilmed = function (jObj, params) {

    var url = "/utils/rendermonotfilmed.json";
    jQuery.get(url, params, function(_response) {
	var response =  BBT.fixJson(_response);

	if (response["error"] == 0) {
	    jObj.html(response["html"]);
	} else {
	    alert(params["message"]);
	}
    });
}

EDI.user.utils.initLogin = function(jForm, locationUrl) {

    EDI.validation.init(jForm);

    if(locationUrl == null) {
	if (location.search.split("=")[0] == "?url") {
	    locationUrl = location.search.split("=")[1];
	} else {
	    locationUrl = "/";
	}
	BBT.log(locationUrl);
    }

    jForm.find("#edi-login-submit").click(function() {

	validForm = EDI.validation.IsValidForm(jForm);
	if (validForm == true) {
	    jForm.find(".ajaxloader-loader, #edi-login-submit").toggle();
	    var url = "/login.json";
	    jQuery.post(url, EDI.validation.getFields(jForm), function(_response) {
		var response = BBT.fixJson(_response);
		if (response["error"] == 0) {
		    window.location = locationUrl;;
		} else {
		    alert(response["message"]);
		    EDI.validation.showErrors(jForm, {"email": {"fieldErrorCode": 100, "fieldErrorMessage": ""},
						      "password": {"fieldErrorCode": 200, "fieldErrorMessage": ""}});
		}
		jForm.find(".ajaxloader-loader, #edi-login-submit").toggle();
	    });
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });

    jForm.find("input").keypress(function (e) {
	if (e.which == 13) {
	    jForm.find("#edi-login-submit").click();
	}
    });
}

EDI.user.utils.launchLogin = function(evento) {

    var keyCode = (window.Event) ? evento.which : event.keyCode;

    if (keyCode == 13) {
	jQuery("#edi-login-submit").trigger('click');
	return true;
    }
}


EDI.user.register.init = function(jForm) {

    var registerMode = BBT.getProperty(jForm, "register-mode");

    jForm.find(".edi-btn-submit").bind("click", function() {
	validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
	    jForm.find(".ajaxloader-loader, .edi-btn-submit").toggle();
	    jQuery.post(jForm.attr("action"), EDI.validation.getFields(jForm), function(_response) {
		var response = eval(_response);
		if (response["error"] == 0) {

		    BBT.log("Register success mode: " + registerMode);

		    if (registerMode == "modal") {
			var jModal = jQuery("#inline_content");
			var commentData = EDI.validation.getFields(jQuery("#edi-commentCreateForm"));
			commentData["contentId"] = BBT.getProperty(jQuery("#edi-commentCreateForm"), "contentId");

			var resultMap = EDI.comments.mapUserComment(response["userId"], commentData);

			EDI.user.utils.renderMO(jModal, {"module": "EDIUserInfoMessageMO", "mode": "modalRegister"});

		    } else if (registerMode == "page") {
			EDI.user.utils.renderMO(jForm.closest(".pg-body").find(".edi-msg-wrp"), {"module": "EDIUserInfoMessageMO", "mode": "pageRegister"});
		    } else {
			alert("Has sido registrado");
		    }

		} else {
		    if (response["error"] > 10) {
			alert(response["message"]);
		    }
		    EDI.validation.showErrors(jForm, response["fields"]);
		}
		jForm.find(".ajaxloader-loader, .edi-btn-submit").toggle();
	    });
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });
}

EDI.user.password.initForgot = function(jForm) {

    EDI.validation.init(jForm);

    jForm.find("#edi-forgot-pass-submit").bind("click", function() {
	validForm = EDI.validation.IsValidForm(jForm);
	if (validForm == true) {
	    jForm.find(".ajaxloader-loader, #edi-forgot-pass-submit").toggle();
	    jQuery.post(jForm.attr("action"), EDI.validation.getFields(jForm), function(_response) {
		var response = eval(_response);
		if (response["error"] == 0) {
		    alert(response["message"]);
		    window.location = "/";
		} else {
		    if (response["error"] > 10) {
			alert(response["message"]);
		    }
		    EDI.validation.showErrors(jForm, response["fields"]);
		}
		jForm.find(".ajaxloader-loader, #edi-forgot-pass-submit").toggle();
	    });
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });

    jForm.find("input").keypress(function (e) {
	if (e.which == 13) {
	    jForm.find("#edi-forgot-pass-submit").click();
	}
    });
}

EDI.user.password.initReset = function(jForm) {
    jForm.find("#edi-reset-pass-submit").bind("click", function() {
	validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
	    jForm.find(".ajaxloader-loader, #edi-reset-pass-submit").toggle();
	    jQuery.post(jForm.attr("action"), EDI.validation.getFields(jForm), function(_response) {
		var response = eval(_response);
		if (response["error"] == 0) {
		    alert(response["message"]);
		    window.location = "/";
		} else {
		    alert(response["message"]);
		    EDI.validation.showErrors(jForm, response["fields"]);
		}
		jForm.find(".ajaxloader-loader, #edi-reset-pass-submit").toggle();
	    });
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });
}

EDI.user.facebook.loginInit = function(jObj, url) {
    var signinWin = null;
    jObj.bind("click", function () {
	var _posx = 100;
	var _posy = 100;
	signinWin = window.open(url, "SignIn", "width=780,height=500,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + _posx + ",top=" + _posy);
	signinWin.focus();
	return false;
    });
}

FBLoginCallback = function () {
    BBT.log("Facebook login callback");
    EDI.user.utils.modalSendComment();
}

EDI.user.customContact.loginInit = function(jObj) {

    var jHaveUser =  jObj.find("#step-have-user");
    var jNewUser =  jObj.find("#step-new-user");
    var boardId = jObj.find("input[name='boardId']").val();
    var moduleId = jObj.find("input[name='moduleId']").val();

    // Si existe sessión se pasa directamente a formulario
    if (EDI.user.utils.userIsLogged()) {
	jObj.find("#step-user-question").hide();
	jNewUser.html("");
	EDI.user.utils.renderMONotFilmed(jNewUser, {"module": "EDIUserCustomContactFormMO", "boardId" : boardId, "moduleId" : moduleId});

    } else {
	jObj.find("input[name='haveUser']").click( function() {
	    var value = jObj.find("input[name='haveUser']:checked").val();
	    if (value == "haveUser") {
		jHaveUser.show();
		jNewUser.html("");
	    } else {
		EDI.user.utils.renderMONotFilmed(jNewUser, {"module": "EDIUserCustomContactFormMO", "boardId" : boardId, "moduleId" : moduleId});
		jHaveUser.hide();
	    }
	});
    }
}

EDI.user.customContact.haveUserInit = function(jForm) {

    EDI.validation.init(jForm);
    jForm.find("#edi-haveuser-submit").bind("click", function() {
	var validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
	    jForm.find(".ajaxloader-loader, #edi-haveuser-submit").toggle();
	    jQuery.post(jForm.attr("action"), EDI.validation.getFields(jForm), function(_response) {
		var response = eval(_response);
		if (response["error"] == 0) {

		    var form = jQuery(jForm).parents("div");
		    var moduleData = jQuery(form).parents("div");
		    jQuery(moduleData).find("#step-user-question").html("");

		    jQuery("#step-new-user").html(response["html"]);
		    jQuery("#step-have-user").slideUp("slow").hide();
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
}

EDI.user.customContact.init = function(jObj) {

    var jForm = jObj.find("form");

    EDI.validation.newCaptcha(jForm.find(".captcha-wrp"));

    EDI.validation.refreshCaptcha(jForm);

    jForm.find(".edi-customContact-send-button").bind("click", function() {
	validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
	    var params = EDI.validation.getFields(jForm);
	    jForm.find(".ajaxloader-loader, #edi-customContact-send").toggle();
	    jQuery.post(jForm.attr("action"), params, function(_response) {
		var response = eval(_response);
		if (response["error"] == 0) {
		    jQuery("#customContact-login fieldset").slideUp("slow").hide();
		    jQuery("#customContact-msg").show("slow");
		} else {
		    if (response["message"] != "") {
			alert(response["message"]);
		    }
		    EDI.validation.showErrors(jForm, response["fields"]);
		}
		jForm.find(".ajaxloader-loader, #edi-customContact-send").toggle();
	    });
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });
}

EDI.user.comments.init = function(jObj) {

    jObj.find(".cp-paginator a").bind("click", function() {

	var page = BBT.getProperty(jQuery(this).parent(), "page");

	var url  = jQuery(this).attr("href")

	jQuery.get(url, function(_response) {
	    var response = BBT.fixJson(_response);
	    if(response["error"] == "0") {
		jQuery("#md-comments-user-container").html(response["html"]);
	    } else {
		BBT.log(response["message"]);
	    }
	});

	return false;
    });
}

EDI.user.author.initPaginator = function(jObj) {

    jObj.find(".cp-paginator a").bind("click", function() {

	var page = BBT.getProperty(jQuery(this).parent(), "page");

	var url  = jQuery(this).attr("href")

	jQuery.get(url, function(_response) {
	    var response = BBT.fixJson(_response);
	    if(response["error"] == "0") {
		jObj.html(response["html"]);
	    } else {
		BBT.log(response["message"]);
	    }
	});

	return false;
    });
}

EDI.user.cancelSuscription.init = function(jObj) {
    var jForm = jObj.find("form");
    EDI.validation.init(jForm);
    jForm.find("#edi-form-submit").click(function() {

	validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
	    submit(jForm);
	}
	return false;
    });

    function submit(jForm) {
	jForm.find(".ajaxloader-loader, #edi-form-submit").toggle();
	var data = EDI.validation.getFields(jForm);
	BBT.log(data);
	jQuery.post(jForm.attr("action"), EDI.validation.getFields(jForm), function(_response) {
	    var response = eval(_response);
	    if (response["error"] == 0) {
		EDI.user.utils.renderMO(jObj, {"module": "EDISubscriptionCancelSubscriptionMO", "step" : 2});
	    } else {
		alert(response["message"]);
		EDI.validation.showErrors(jForm, response["fields"]);
	    }
	    jForm.find(".ajaxloader-loader, #edi-form-submit").toggle();
	});
    }
}

EDI.user.simpleContact.init = function(jObj) {

    var jForm = jObj.find("form");
    BBT.log(jForm);

    EDI.validation.init(jForm);

    EDI.validation.newCaptcha(jForm.find(".captcha-wrp"));

    EDI.validation.refreshCaptcha(jForm);

    jForm.find(".edi-contact-send-button").bind("click", function() {
	validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
	    EDI.user.simpleContact.create(jForm);
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });
}

EDI.user.simpleContact.create = function(jForm) {
    var url = jForm.attr("action");
    var formData = EDI.validation.getFields(jForm);

    jQuery.post(url, formData, function(_response) {
	var response =  eval(_response);
	if (response["error"] == 0) {
	    if (response["message"] != "") {
		alert(response["message"]);
		EDI.validation.emptyForm(jForm);
	    } else {
		alert("¡Gracias! Tus datos han sido enviados");
		EDI.validation.newCaptcha(jForm.find(".captcha-wrp"));
		EDI.validation.emptyForm(jForm);
	    }
	} else {
	    EDI.validation.newCaptcha(jForm);
	    EDI.validation.showErrors(jForm, response["fields"]);
	    if (response["message"] != "") {
		alert(response["message"]);
	    } else {
		alert("No se ha podido enviar el formulario, por favor, inténtelo más tarde");
	    }
	}
    });
}