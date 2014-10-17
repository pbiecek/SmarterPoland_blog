Namespace.Register("BBT.comment");

// Inicializa el formulario de enviar un comentario
BBT.comment.initForm = function (jObj, url) {
	BBT.component.cardForm.initForm(jObj);

	var url = jObj.attr("action");
	var fname = jObj.attr("name");

	if(fname == "" || url == "") {
		alert("Error. Cannot initialize comments form");
		jObj.hide();
		return false;
	}


	jObj.find(".bbt-comment-create-submit").click(function() {
			try {
				data = BBT.comment[fname + "_getData"](jObj);
			} catch(e) {
				// BBT.log("BBTComment:no custom method _getData " + fname + "_getData");
				data = BBT.comment._getData(jObj);
			}

			if(data === false) {
				return false;
			}


			try {
				BBT.comment[fname + "_submit"](url, data);
			} catch(e) {
				// BBT.log("BBTComment:no custom method " + fname + "_submit." + e);
				BBT.comment._submit(url, data);
			}

			return false;
		});
};

BBT.comment._submit = function (url, data) {
	jQuery.post(url, data, function (_response) {
			var response = BBT.fixJson(_response);
			if (response["error"] == 0) {
				window.location.reload()
					} else {
				BBT.error(response["message"]);
			}
		});

	return false;
};

BBT.comment._getData = function (form) {
	// Obtenemos los datos
	var data = BBT.component.cardForm.getFields(form);
	if (data["text"] == null
	    || data["text"] == ""
	    || data["nick"] == null
	    || data["nick"] == ""
	    || data["email"] == null
	    || data["email"] == "") {
		return false;
	}
	return data;
};

// Pide por ajax los comentarios de una entidad  y los muestra en jObj
BBT.comment._showEntityComments = function(jObj, url, htm) {

	// eval html new arg for backward compatibility
	if(htm != null) {

		// TODO: if string (con typeof(htm))

		jObj.queue(function(e) {
			if (jQuery.browser.msie && jQuery.browser.version > '6') {
				//plain method
				jObj.append(htm);
			} else {
				//animated method
				jObj.append(htm).css({ opacity: 0 }).fadeTo("fast",1);
			}
			jQuery(this).dequeue();
		});

		// TODO: else if is_function (callback?)
		// htm()
	}

	jQuery.get(url, function (_response) {
			var response = BBT.fixJson(_response);
			if (response["error"] == 0) {

				if (jQuery.browser.msie && jQuery.browser.version > '6') {
					// plain method
					jObj.html(response["html"]);
				} else {
					//animated method
					jObj.css({ opacity: 0 }).html(response["html"]).fadeTo("fast",1);
				}

				if(response["numComments"] != null) {
					jQuery(".bb-numComments").html(response["numComments"]);
					jQuery(".bb-numComments-published").html(response["numPublishedComments"]);
				}

				// let's bind AJAX request to pager actions
				jObj.find(".bb-wg-paginator a").click(function () {
					var url = jQuery(this).attr("href");
					BBT.comment._showEntityComments(jObj, url, htm);
					return false;
				});

				BBT.comment.initVotes(jObj);

				BBT.comment.initReports(jObj);
			}
	});
};


BBT.comment.initVotes = function (jObj) {
	jObj.find(".bb-vote-comment").click(function () {
			var url = jQuery(this).attr("href");
			BBT.comment._vote(jQuery(this).parents(".bb-comment-entity:first"), url);
			return false;
		});
};

BBT.comment.initReports = function (jObj) {
	jObj.find(".bb-report-comment").click(function () {
			var url = jQuery(this).attr("href");
			BBT.comment._report(jQuery(this).parents(".bb-comment-entity:first"), url);
			return false;
		});
};


BBT.comment._vote = function (jObj, url) {

	if(BBT.getProperty(jObj, "voted") == 1) {
		return false;
	}

	jObj.addClass("voted_1");

	jQuery.post(url, {}, function (_response) {
			var response = BBT.fixJson(_response);


			if(response["replaceHTML"] != null ) {
				jObj.html(response["replaceHTML"]);
				return false;
			}

			if(response["error"] == 0) {
				jObj.find(".bb-num-pos").html(response["positive"]);
				jObj.find(".bb-num-neg").html(response["negative"]);
				jObj.find(".bb-num-ret").html(response["result"]);
			} else {
				alert(response["message"]);
			}

			try {
				BBT.comment.hook_post_vote(jObj, response);
			} catch (e) {
				// Si el callback no existe, no pasa nada
			}
		});
	return false;
};

BBT.comment._report = function (jObj, url) {
	jQuery.post(url, {}, function (_response) {
			var response = BBT.fixJson(_response);

			if (response["replaceHTML"] != null ) {
				jObj.html(response["replaceHTML"]);
			}

			alert(response["message"]);
		});
	return false;
};
