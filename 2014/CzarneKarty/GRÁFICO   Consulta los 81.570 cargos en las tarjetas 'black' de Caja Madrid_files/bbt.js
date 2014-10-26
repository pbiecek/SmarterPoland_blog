var Namespace = {
    Register : function(_Name)
    {
        var chk = false;
        var cob = "";
        var spc = _Name.split(".");
        for(var i = 0; i<spc.length; i++)
        {
            if(cob!=""){cob+=".";}
            cob+=spc[i];
            chk = this.Exists(cob);
            if(!chk){this.Create(cob);}
        }
        if(chk){ throw "Namespace: " + _Name + " is already defined."; }
    },

    Create : function(_Src)
    {
        eval("window." + _Src + " = new Object();");
    },

    Exists : function(_Src)
    {
        eval("var NE = false; try{if(" + _Src + "){NE = true;}else{NE = false;}}catch(err){NE=false;}");
        return NE;
    }
};

Namespace.Register("BBT");

BBT.getProperty = function (jObj, type) {
    var isJQuery = jObj instanceof jQuery;

    if(!isJQuery) { return false; }

    if (!jObj.attr("class")) { return false; }

    var values = jObj.attr("class").split(" ");
    var ret = null;
    var _regexp = new RegExp("^" + type + "_");
    jQuery.each(values, function(i,data) {  if(data.match(_regexp)) ret = data.replace(_regexp, ""); });
    return ret;
};

BBT.setFieldValue = function (fieldName, value, jObj) {

    if(jObj == null) {
	jObj = jQuery(document);
    }


    var field = jObj.find("[name='" + fieldName + "']");

    if (field.length == 0) {
	field = jObj.find("[for='" + fieldName + "']");
    }

    if (field.length == 0) {
	return false;
    }

    var fieldType = BBT.getProperty(field, "bb-field");

    switch (fieldType) {
    case "input":
    case "hidden":
	field.val(value);
	break;
    case "richtext":
	// Tiny inactivo
	field.html(value);

	// Tiny activo
 	var tinyId = jObj.find("div[name='" + fieldName + "']").attr("id");

	if (tinyId != ""
	    && typeof tinyId != 'undefined'
	    && jQuery("#" + tinyId + "_parent").size() > 0) {
	    tinyMCE.getInstanceById(tinyId).setContent(value);
	}

	break;
    case "select":
	field.find("option[value='" + value + "']").attr("selected", "selected");
	break;
    case "label":
	field.html(value);
	break;
    }
    return true;
};

BBT.getFieldValue = function (fieldName, jObj, notNull) {
    if(notNull == null) {
	notNull == false;
    }

    if (jObj == null) {
	jObj = jQuery("body");
    }

    var fieldType = BBT.getProperty(jObj.find("[name='" + fieldName + "']"), "bb-field");
    if(fieldType == false) {
	fieldType = BBT.getProperty(jObj.find(".bb-field-name_" + fieldName), "bb-field");
    }

    var _value = null;

    switch (fieldType) {
    case "checkbox":
	_value = 0;
	if (jObj.find("[name='" + fieldName + "']").is(':checked')) {
	    _value = 1;
	}
	break;
    case "radio":
	_value = jObj.find("[name='" + fieldName + "']:checked").val();
	break;
    case "calendar":
	_value = jObj.find("[name='" + fieldName + "']").val();
	if (_value != "") {
	    var parts = _value.split("/");
	    var date = new Date(parts[2], parts[1] - 1, parts[0]);
	    _value = Math.ceil(date.getTime() / 1000);
	}
	break;
    case "input":
	_value = jObj.find("[name='" + fieldName + "']").val();
	break;
    case "hidden":
	_value = jObj.find("[name='" + fieldName + "']").val();
	break;
    case "select":
	_value = jObj.find("[name='" + fieldName + "'] option:selected").val();
	break;
    case "textarea":
	_value = jObj.find("[name='" + fieldName + "']").val();
	break;
    case "file":
	_value = BBT.getFieldValue("hidden_" + fieldName);
	break;
    case "label":
	// TODO: search for attribute for fieldType
	_value = jObj.find("[for='" + fieldName + "']").html();
	break;
    case "richtext":
	// por el momento solo tenemos tinymce
	var _id = jObj.find("[name='" + fieldName + "']").attr("id");
	if(_id == null) {
	    _value = jObj.find("[name='" + fieldName + "']").html();
	} else {
	    try {
		_value = tinyMCE.get(_id).getContent();
		// Eliminamos saltos de línea, nos dan problemas
		_value = _value.replace(/\n/g, "");
	    } catch(e) {
		// tiny no inicializado, usamos el contenido del div
		_value = jObj.find("[name='" + fieldName + "']").html();
	    }


	}
	break;
    case "datetime":
	var _date = BBT.getFieldValue(fieldName + "_calendar");
	var _minute = BBT.getFieldValue(fieldName + "_minutes");
	var _hour = BBT.getFieldValue(fieldName + "_hour");
	var _second = BBT.getFieldValue(fieldName + "_second");

	if(_minute == null) _minute = 0;
	if(_hour == null) _hour = 0;
	if(_second == null) _second = 0;

	var newDate = "";
	if(_date != null) {
	    newDate = new Date((_date + (parseInt(_hour,10) * 60 * 60) + (parseInt(_minute,10) * 60) + parseInt(_second, 10)) * 1000);
	}
	_value = newDate.getTime() / 1000;

	break;
    default:
	_value = null;
    }

    if(_value === "" || _value == "null") {
	_value = null
    }

    if(_value == null && notNull == true) {
	return "";
    }

    return _value;
};

BBT.log = function (txt) {
    try {
	console.log(txt);
    } catch(e) {
	// no esta instalado fb
    }
};

BBT.error = function (txt) {
    alert(txt);
};

BBT.modal = function (html, _params) {
    // BBT.log("Open modal..");

    var params = { bgiframe: true,
		   width: 950,
		   height: 600,
		   position: "center",
		   modal: true,
		   draggable: false,
		   zindex: 100,
		   close: function () { jQuery("#bbt-modal").remove(); },
		   beforeClose: function () {
		       if (jQuery("#bbt-modal .modal-tab").size() == 1) {
			   jQuery("body").css({ overflow: 'inherit' });
		       }
		       return BBT.closeModal(false);
		   },
		   create: function() {
		       jQuery("body").css({ overflow: 'hidden' })
		   }
		 };

    if(_params != null) {
	jQuery.each(_params, function(i) {
	    params[i] = _params[i];
	});
    }

    var rnd = Math.round(Math.random() * 10000);

    if(jQuery("#bbt-modal").length < 1) {
	jQuery("body").append("<div id='bbt-modal' class='bbt-modal-" + rnd + "'><ul class='modal-tab-container'><li class='modal-tab'>" + html + "</li></ul></div>");

	jQuery(".bbt-modal-" + rnd).dialog(params);
    } else {
	// Evitamos que se abran dos veces los modales
	if (jQuery("#bbt-modal ul.modal-tab-container .modal-tab:last").html() == html) {
	    console.log("Same modal html detected");
	    return true;
	}
	jQuery("#bbt-modal ul.modal-tab-container").append("<li class='modal-tab'>" + html + "</li>");
	jQuery("#bbt-modal ul.modal-tab-container li.modal-tab").hide();
	jQuery("#bbt-modal ul.modal-tab-container li.modal-tab:last").show();

    }
};

BBT.closeModal = function(forzeClose) {

    if(forzeClose == null) {
	forzeClose = true;
    }

    if (jQuery("#bbt-modal .modal-tab").size() == 1) {
	jQuery("body").css({ overflow: 'inherit' });
    }

    jQuery("#bbt-modal ul.modal-tab-container li.modal-tab:last").remove();
    jQuery("#bbt-modal ul.modal-tab-container li.modal-tab:last").show();

    if(jQuery("#bbt-modal ul.modal-tab-container li.modal-tab").length == 0) {
	if(forzeClose) {
	    jQuery("#bbt-modal").remove();
	}
	return true;
    }
    return false;

};

BBT.fixJson = function (jsonString) {

    // Only when receving dirty jsonString
    if (jsonString[0] != "(") {
	return jsonString;
	return JSON.parse(jsonString);
    }

    var _response = jsonString;
    if(jsonString.indexOf("<pre>") >= 0) {
	_response = jsonString.split("<pre>")[1].split("</pre>")[0];
    }

    try {
	ret = eval("(" + _response + ")");
	return ret;
    } catch (e) {
	BBT.log(e + " " + jsonString);
	return null;
    }

};

BBT.loading = function (loading_text, modal, jObj) {

    console.warn("Deprecated method BBT.loading");

    if(modal == null) {
	modal = false;
    }

    if (modal == true) {
	BBT.notifybar.show(loading_text, "load");
	return true;
    }

    if(loading_text == null) {
	loading_text = "Cargando...";
    }

    BBT.notifybar.show("<img src='/static/BBTCore/images/loading.gif'> " + loading_text, "load");

    if(close == true) {
	BBT.message_close();
    }
};

BBT.getLoadingImage = function () {
    return "<img src='/static/BBTContent/images/loading.gif'>";
};

BBT.alert = function (alert_text) {
    console.warn("Deprecated method BBT.alert");
    BBT.notifybar.show(alert_text, "warn", true);
};

BBT.cacheUrls = {};

BBT.getUrl = function (className, params) {

    var _hash = className;
    jQuery.each(params, function (i) {
	_hash += "_" + i + "_" + params[i];
    });

    var hash = hex_md5(_hash);

    if(BBT.cacheUrls[hash] != null) {
	BBT.log("url cached");
	return BBT.cacheUrls[hash];
    }

    var _params = {type: "GET",
		   url: "/bbtdispatch/getUrl/" + className + ".json",
		   async: false,
		   dataType: "json",
		   data: params
		  };
    var request = jQuery.ajax(_params);

    var response = JSON.parse(request.responseText);

    if(response.error == 0) {
	return response["data"];
    } else {
	console.error("Error getting URL for...");
	console.error(_params);
	console.error(request);
    }

    return "";
};

BBT.generateGETUrl = function (urlPath, params) {
    var ret = [];
    jQuery.each(params, function (i, data) {
	ret[ret.length] = i + "=" + escape(data)
    });
    return urlPath + "?" + ret.join("&");
};

BBT.message_close = function (jObj)  {

    console.warn("Deprecated method BBT.message_close");
    BBT.notifybar.hide();
    return;
};

BBT.message = function (message_txt, error, jObj) {

    console.warn("Deprecated method BBT.message");
    switch (error) {
    case 0:
	type = "success";
	break;
    case 1:
	type = "warn";
	break;
    case 2:
	type = "error";
	break;
    default:
	type = "info";
    }

    BBT.notifybar.show(message_txt, type, false);
    return;
};

BBT.getGETParams = function (s) {
    if ( s == null ) {
	s = window.location.href;
    }

    var a = s.match(/[^&?=]*=[^&?=]*/g);

    if(a == null) {
	return {};
    }

    var r = {};
    for (i=0; i<a.length; i++) {
	var _key = a[i].match(/[^&?=]*/)[0];
	var _value = a[i].match(/=([^&?]*)/)[0].replace('=', '');
	r[_key] = _value;

    }
    return r;
};

Namespace.Register("BBT.hook");

BBT.hook.hooks = {};

BBT.hook.append = function (group, callback) {
    if(BBT.hook.hooks[group] == null) {
	BBT.hook.hooks[group] = [];
    }

    params = [];
    if (arguments.length > 2) {
	for (var x = 2; x < arguments.length; x++) {
	    params[params.length] = arguments[x];
	};
    };
    BBT.hook.hooks[group][BBT.hook.hooks[group].length] = [callback, params];

};

BBT.hook.execute = function (group) {
    if(BBT.hook.hooks[group] != null) {
	jQuery.each(BBT.hook.hooks[group], function (i, data) {
	    data[0].apply(null, data[1]);
	});
    }
};


Namespace.Register("BBT.highlight");

BBT.highlight.highlight = function (search_string, _params) {
    var params = { span_class: 'bb-highlight-color',
		   search_block: jQuery(document),
		   search_class: "bb-highlight-field",
		   clear_mat: null
		 };

    if(_params != null) {
	jQuery.each(_params, function(i) {
	    params[i] = _params[i];
	});
    }

    var search_objs = BBT.highlight.getSearchObjs(params['search_block'], params['search_class']);

    jQuery(search_objs).each(function() {
	BBT.highlight.setHighlight(search_string,jQuery(this), params['span_class'], params['clear_mat']);
    });

    return params;
};

BBT.highlight.getSearchObjs = function (search_block, search_class) {
    var ret = jQuery(search_block).find("." + search_class);
    return ret;
};

BBT.highlight.setHighlight = function (search_string, obj, span_class, clear_mat) {
    jQuery(obj).contents()
	.filter(function() {
	    if (this.nodeType == 1) {

		//&& this.childNodes
		//Recursivamente si no es un texto miramos en el nuevo nodo
		return BBT.highlight.setHighlight(search_string, jQuery(this), span_class);

	    } else {
		var nodeclone = this.cloneNode(true);

		/* Limpiamos acentos */
		nodeclone.data = BBT.clearString(nodeclone.data, clear_mat);
		search_string = BBT.clearString(search_string, clear_mat);

		var pos = nodeclone.data.indexOf(search_string);

		if (pos >= 0) {

		    var span = document.createElement('span'); /*Creamos el nodo span para meter dentro posteriormente el highlight */

		    span.className = span_class; /* Le añadimos el class indicado */

		    var middle_s = this.splitText(pos);/* Nos quedamos con el nodo cortando hasta la cadena buscada, y el resto en middle_s */

		    var end_s = middle_s.splitText(search_string.length); /* Copiamos el nodos desde el fin de la cadena buscada, dejando la palabra a buscar en middle_s */

		    var middle_s_clone = middle_s.cloneNode(true); /* Clonamos la cadena central */

		    span.appendChild(middle_s_clone); /* A nuestro span le metemos el nodo clonado, (el highlight), para evitar perder middle_s */

		    middle_s.parentNode.replaceChild(span, middle_s);  /* Al nodo (div)  en el está la palabra que buscamos le susutituimos la cadena a buscar por el span creado ya con el highlight*/

		    return true;
		}

		return false;
	    }
	})
};

BBT.mat_clearString = {
    "Á": "A",
    "Ä": "A",
    "É": "E",
    "Ë": "E",
    "Í": "I",
    "Ï": "I",
    "Ó": "O",
    "Ö": "O",
    "Ú": "U",
    "Ü": "U"
};

BBT.clearString = function (string, _mat) {

    var mat = BBT.mat_clearString;

    if(_mat != null) {
	mat = _mat;
    }

    string = string.toUpperCase();

    jQuery.each(mat, function(i) {
	string.replace(/i/, mat[i]);
    });

    return string;
};

BBT.stripTags = function (string, availableTags) {

    var _regExpr = /<\/?[^>]+>/gi;

    if (availableTags == ""
	|| availableTags == undefined) {
	return string.replace(_regExpr, '');
    }

    var _availableTags = availableTags.split(",");

    var text = string.replace(_regExpr, function (tag, position) {

	for (var i in _availableTags) {
	    _regExprTag = "^<\/*" + _availableTags[i];
	    // Existe en los availables, lo dejamos como esta
	    if (tag.match(_regExprTag) != null) {
		return tag;
	    }
	}

	return "";
    });


    return text;
};

BBT.ajaxloader = function($launcher, wrapperSelector) {

    if ($launcher.closest(wrapperSelector).find(".bbt-image-loading").size() == 0) {
	$launcher.closest(wrapperSelector).append('<img class="bbt-image-loading" style="display:none;" src="/static/BBTCore/images/loading.gif?hash=58e339aba83e23d4c69dc4e0c8b97774" />');
    }
    $launcher.toggle();
    $launcher.closest(wrapperSelector).find(".bbt-image-loading").toggle();
};

BBT.notifybar = {

    $el: null,
    duration: 300,
    timeout: 1500,
    types: {"success": "bb-notify-msg-success",
	    "error": "bb-notify-msg-error",
	    "warn": "bb-notify-msg-warning",
	    "info": "bb-notify-msg-info",
	    "load": "bb-notify-msg-info"},

    init: function() {
	this.$el = jQuery(".bb-notify-bar");
	var _this = this;
	this.$el.find(".bb-notify-hide").on("click", function(e) {
	    _this.hide();
	    e.preventDefault();
	});


    },

    show: function(text, type, overlay, timeout) {

	if (this.$el == null) {
	    console.error("Undefined element $el");
	    return;
	}

	var _this = this;

	// Close button not avaiable on load type
	if (type == "load") {
	    this.$el.find(".bb-notify-hide").hide();
	    overlay = true;
	    if (text == "" || text == null || typeof text == "undefined") {
		text = "<img src='/static/BBTCore/images/loading.gif'> Cargando...";
	    }
	} else {
	    this.$el.find(".bb-notify-hide").show();
	}


	if (overlay) {
	    this.$el.addClass("overlay");
	} else {
	    this.$el.removeClass("overlay");
	}

	for (i in this.types) {
	    _this.$el.find(".bb-notify-msg").removeClass(this.types[i]);
	};

	this.$el.find(".bb-notify-msg").addClass(this.types[type]);

	if (text == "" || text == null || typeof text == "undefined") {
	    switch (type) {
	    case 'error':
		break
		// TODO: default messages;
	    default:
		text = "";
	    }

	}

	this.$el.find(".bb-notify-txt").html(text);

	this.$el.fadeIn({duration: this.duration});

	if (timeout != null) {
	    setTimeout(function() {
		_this.hide();
	    }, timeout);
	}
    },

    hide: function() {

	if (this.$el == null) {
	    console.error("Undefined element $el");
	    return;
	}

	this.$el.fadeOut({duration: this.duration});
    }
};

BBT.imageExists = function(url){

    var http = new XMLHttpRequest();

    http.open('HEAD', url, false);
    http.send();

    return http.status != 404;
}

BBT.admin = {

    init: function() {
	BBT.notifybar.init();
	alert = function(text) {
	    console.warn("Deprecated method alert");
	    BBT.notifybar.show(text, "warn", true);
	};
    }
};
