/*
  ===========================================================================
  www.eldiario.es
  Validation JS functions
  ===========================================================================
*/

Namespace.Register("EDI.validation");

EDI.validation.newCaptcha = function (jObj) {
    _image = new Image();
    _image.src = "/bbtcaptcha/captcha?rand=" + Math.round(Math.random() * 1000);
    jObj.find(".image-captcha").empty();
    jObj.find(".image-captcha").append(_image);
    jObj.find(".image-captcha img").addClass("captcha");
}

EDI.validation.refreshCaptcha = function (jObj) {
    jObj.find(".edi-refresh-captcha").bind("click", function() {
	EDI.validation.newCaptcha(jObj);
	return false;
    });
}

EDI.validation.showErrors = function(jForm, fields) {

    jQuery.each(fields, function(fieldName, data) {

	jErrorField = jForm.find("input[name='" + fieldName + "']");
	jErrorField.addClass("edi-error");

	var jErrorWrapper = jErrorField.closest("p");
	jErrorWrapper.addClass("edi-error");
	jErrorWrapper.find(".info-error").show("slow");

	if (data["fieldErrorMessage"] != "") {
	    BBT.log(jErrorWrapper.find(".info-error"));
	    jErrorWrapper.find(".info-error").text(data["fieldErrorMessage"]);
	}

	jErrorField.focus();
    });
}

EDI.validation.emptyForm = function(jForm) {
    jForm.find(".edi-field").each(function(i, data) {
	jField = jQuery(data);
	if (jField.attr("type") == "checkbox"
	    || jField.attr("type") == "radio") {
	    jField.attr("checked", false);
	} else {
	    jField.val("");
	}
    });
}

EDI.validation.getFieldValue = function(jField) {
    var _name = jField.attr("name");
    var fieldValue = "";
    if (jField.attr("type") == "checkbox") {
	if (jField.size() > 1) {
	    var value = [];
	    jField.each(function () {
		if (jQuery(this).is(':checked')) {
		    var __value = jQuery(this).val();
		    value[value.length] = __value;
		}
	    });
	    fieldValue = value.join(",");
	} else {
	    var value = jField.is(':checked');
	    fieldValue = value;
	}
    } else if (jField.attr("type") == "radio") {
	var value = jField.closest("form,.edi-landingpage-subscription").find("[name='" + _name + "']:checked").val();
	fieldValue = value;
    } else {
	var value = jField.val();
	fieldValue = value;
    }

    return fieldValue;
}

EDI.validation.getFields = function (jForm) {
    var postData = {};

    jForm.find(".edi-field").each(function(i, data) {
	var _name = jQuery(data).attr("name");

	if(_name != null) {
	    var jField = jForm.find("[name='" + _name + "']");
	    postData[_name] = EDI.validation.getFieldValue(jField);
	}
    });

    return postData;
}

EDI.validation.init = function(jObj) {
    jObj.find(".edi-validation").bind("keyup change", function() {
	EDI.validation.validateField(jQuery(this));
    });
}

EDI.validation.IsValidForm = function (jForm) {
    var res = true;

    jForm.find(".edi-validation").each(function() {
	error = EDI.validation.validateField(jQuery(this));

	if (error == false) {
	    res = false;
	}
    });
    return res;
}

EDI.validation.IsValidField = function (jField, value) {
    var func = BBT.getProperty(jField, "validation");

    var mandatory = BBT.getProperty(jField, "validation-mandatory");
    // Fields ar mandatory by default
    // If field value is empty and field is not mandatory then the field is valid
    if (value == ""
	&& mandatory != null
	&& mandatory == 0) {
	return true;
    }

    return  EDI.validation.functions[func](value, jField);
}

EDI.validation.validateField = function (jField) {
    var field = jField.attr("name");

    if (jField.attr("type") == "checkbox") {
	var value = jField.is(':checked');
    } else if (jField.attr("type") == "radio") {
	var value = jField.is(':checked');
    } else {
	var value = jField.val();
    }

    if (EDI.validation.IsValidField(jField, value)) {
	jQuery(jField).removeClass("edi-error");
	jQuery(jField).closest("p").find(".info-error").hide("slow");
	jQuery(jField).closest("p").removeClass("edi-error");
	return true;
    } else {
	jQuery(jField).addClass("edi-error");
	jQuery(jField).closest("p").find(".info-error").show("slow");
	jQuery(jField).closest("p").addClass("edi-error");
	return false;
    }
}

EDI.validation.functions = {};

EDI.validation.functions["nick"] = function (value, jField) {
    var filter = /^[a-zA-Z]([-._]?[a-zA-Z0-9])*$/;
    if (filter.test(value)) {
	if (value.length >= 3 && value.length <= 30) {
	    return true;
	}
    }
    return false;
}

EDI.validation.functions["email"] = function (value, jField) {

    if (value.length == 0 || value.length > 128) {
	return false;
    }

    var filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    return filter.test(value);
}

EDI.validation.functions["comment-text"] = function (value, jField) {
    if ((value.length >= 2 && value.length <= 2048)) {
	return true;
    }
    return false;
}

EDI.validation.functions["cancelation"] = function (value, jField) {
    if ((value.length >= 10 && value.length <= 2048)) {
	return true;
    }
    return false;
}

EDI.validation.functions["contact-text"] = function (value, jField) {
    if ((value.length >= 2 && value.length <= 1400)) {
	return true;
    }
    return false;
}

EDI.validation.functions["not-empty"] = function (value, jField) {
    if (value.length > 1
	|| value == true) {
	return true;
    }
    return false;
}

EDI.validation.functions["name"] = function (value, jField) {
    if ((value.length > 2 && value.length <= 32)) {
	return true;
    }
    return false;
}

EDI.validation.functions["phone"] = function (value, jField) {
    var filter = /^[689]\d{8}$/;
    if (filter.test(value)) {
	return true;
    }
    return false;
}

EDI.validation.functions["password"] = function (value, jField) {
    var filter = /^.{6,}$/i;
    if (filter.test(value)) {
	return true;
    }
    return false;
}

EDI.validation.functions["repeat-password"] = function (value, jField) {
    var filter = /^.{6,}$/i;
    var jBlkPassword = jField.parents(".validation-passblk");
    var passwordVal = jBlkPassword.find(".validation_password:first").val();
    if (filter.test(value)) {
	if (value == passwordVal) {
	    return true;
	}
    }
    return false;
}

EDI.validation.functions["repeat-email"] = function (value, jField) {
    if (value.length == 0 || value.length > 128) {
	return false;
    }
    var filter = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    var jBlkEmail = jField.parents(".validation-emailblk");
    var emailVal = jBlkEmail.find(".validation_email:first").val();
    if (filter.test(value)) {
	if (value == emailVal) {
	    return true;
	}
    }
    return false;
}

EDI.validation.functions["url"] = function (value, jField) {
    var filter = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (filter.test(value)) {
	return true;
    }
    return false;
}

EDI.validation.functions["bio"] = function (value, jField) {
    if (value.length == 0 || value.length > 300) {
	return false;
    }

    return true;
}

EDI.validation.functions["avatar"] = function (value, jField) {
    var filter = /^.*\.(jpg|JPG|jpeg|JPEG|gif|GIF)$/;
    if (filter.test(value)) {
	return true;
    }
    return false;
}

EDI.validation.functions["IBANNormal"] = function(value, jField) {
    var filter = /^\d{4}$/;
    if (filter.test(value)) {
	return true;
    }
    return false;
}

EDI.validation.functions["IBANPre"] = function(value, jField) {
    var filter = /^.{2}\d{2}$/;

    if (filter.test(value)) {
	return true;
    }
    return false;
}