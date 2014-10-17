/*
  ===========================================================================
  www.eldiario.es
  Comments JS functions
  ===========================================================================
*/

Namespace.Register("EDI.comments");

EDI.comments.votepos = function(jObj){
    jObj.click(function () {
	if (EDI.user.utils.userIsLogged()) {
	    var lnk = jObj.data("lnk");
	    BBT.comment._vote(jObj.parents(".bb-comment-entity:first"), lnk);
	} else {
	    EDI.user.utils.modalIdentification("votar");
	}
	return false;
    });
};

EDI.comments.voteneg = function(jObj){
    jObj.click(function () {
	if (EDI.user.utils.userIsLogged()) {
	    var lnk = jObj.data("lnk");
	    BBT.comment._vote(jObj.parents(".bb-comment-entity:first"), lnk);
	} else {
	    EDI.user.utils.modalIdentification("votar");
	}
	return false;
    });
};

EDI.comments.init = function(jObj, commentMode) {

    var jForm = jObj.find("form");

    if (commentMode == "") {
	commentMode = 0;
    }

    if (commentMode == 1) {
	var successMsg = "¡Gracias! El mensaje ha sido enviado y será publicado en breve.";
    } else {
	var successMsg = "";
    }

    if (EDI.user.utils.userIsLogged()) {
	jForm.find("#edi-user-login-link").show();
    }

    jForm.find("#edi-user-login-link").bind("click", function() {
	EDI.user.utils.modalIdentification();

	return false;
    });

    jForm.find("#edi-comment-button").bind("click", function() {

	validForm = EDI.validation.IsValidForm(jForm);

	if (validForm == true) {
	    EDI.comments.create(jForm, successMsg);
	} else {
	    alert("Rellene correctamente el formulario");
	}

	return false;
    });

    var contentId = BBT.getProperty(jQuery("#edi-subscriber-comments"), "contentId");
    if (contentId) {
	EDI.user.utils.renderMO(jQuery("#edi-subscriber-comments") , {"module": "EDISubscriberSliderCommentsMO", "contentId": contentId});
    }
};

EDI.comments.scrollToLastComment = function() {
    jQuery.scrollTo("#bb-comment-end", 800);
};

EDI.comments.create = function (jForm, successMsg) {

    var url = jForm.attr("action");
    var formData = EDI.validation.getFields(jForm);
    jForm.find(".ajaxloader-loader, #edi-comment-button").toggle();
    jQuery.post(url, formData, function(_response) {
	var response = BBT.fixJson(_response);
	if (response["error"] == 0) {
	    if (successMsg != "") {
		alert(successMsg);
		EDI.validation.emptyForm(jForm);
		EDI.comments.reload(jForm);
	    } else {
		EDI.comments.scrollToLastComment();

		EDI.validation.emptyForm(jForm);
		EDI.comments.reload(jForm);
	    }
	} else if (response["error"] == 106
		   || response["error"] == 101
		   || response["error"] == 102) {
	    EDI.user.utils.modalIdentification();
	} else {
	    if (response["message"] != "") {
		alert(response["message"]);
	    } else {
		alert("No se ha podido crear el comentario. Por favor, inténtelo más tarde");
	    }
	}
	jForm.find(".ajaxloader-loader, #edi-comment-button").toggle();
    });
};

EDI.comments.reload = function (jForm) {
    var createUrl = jForm.attr("action").split("/");
    var contentId = createUrl[4];
    var url = "/bbtcomment/entityComments/0/" + contentId + ".json?commentsPage=last&limit=50";
    jQuery(function() {BBT.comment._showEntityComments(jQuery(".bb-comment-content-comments-ajax"), url); } );
};

EDI.comments.initToogle = function (jObj) {
    jObj.find(".edi-toggle").toggle(
	function() {
	    var toggleTarget = BBT.getProperty(jQuery(this), "commentId");
	    BBT.log(toggleTarget);
	    jQuery(this).text("Ocultar mensaje");
	    jObj.find(".panel-commentId_" + toggleTarget).show("slow");
	    return false;
	},
	function() {
	    var toggleTarget = BBT.getProperty(jQuery(this), "commentId");
	    jQuery(this).text("Mostrar mensaje");
	    jObj.find(".panel-commentId_" + toggleTarget).hide("slow");
	    return false;
	}
    );
};

EDI.comments.initReply = function (jObj) {
    jObj.find(".comment-actions-v2-reply a").bind("click", function() {
	EDI.comments.reply(jQuery(this));
	return false;
    });
};

EDI.comments.reply = function (jObj) {
    var commentId = BBT.getProperty(jObj.parents(".comment-actions-v2-reply"), "cid");
    var num = BBT.getProperty(jObj.parents(".comment-actions-v2-reply"), "num");
    var jTextAreaP = jQuery("#edi-comment-submit textarea").parents("p");
    if (jTextAreaP.find("input[name='parentCommentId']").size() == 1) {
	jTextAreaP.find("input[name='parentCommentId']").val(commentId);
    } else {
	jTextAreaP.append("<input name='parentCommentId' type='hidden' value='" + commentId + "' class='bb-field edi-field' />");
    }
    jTextAreaP.find("textarea").focus();
};

EDI.comments.mapUserComment = function (userId, commentData) {
    var url = "/usuarios/map-comment.json"

    jQuery.ajax({"type": "POST", "async": false, "url": url, "data": {"userId": userId, "commentData" : commentData}}).done(function(_response) {
	var response = eval(_response);
	BBT.log(response);
    });

    return true;
};

EDI.comments.initReports = function (jObj) {
    jObj.find(".edi-report-comment").click(function () {
	EDI.comments.modalReports(jQuery(this));
	return false;
    });
};

EDI.comments.modalReports = function(jObj) {
    var url = "/utils/rendermo.json";
    jQuery.get(url, {"module" : "EDIDiarioModalReportMO"}, function(_response) {
	var response =  BBT.fixJson(_response);
	if (response["error"] != 0) {
	    alert("No se ha podido enviar el formulario, por favor, inténtelo más tarde");
	    return false;
	}

	jQuery.colorbox({html: response["html"], width:"703", opacity:".7"});
	jModal = jQuery("#inline_content");

	jModal.find(".edi-report-ok").bind("click", function() {
	    var url = jObj.attr("href");
	    BBT.comment._report(jObj.parents(".bb-comment-entity:first"), url);
	    jQuery.colorbox.close();
	    return false;
	});
    });
};
