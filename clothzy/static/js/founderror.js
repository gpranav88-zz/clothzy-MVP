/*global $, jQuery*/
/*
*
* jQuery Feedback Plugin
* 
* File:			jquery.feedback_me.js
* Version:		0.4.6
* Author:		Daniel Reznick
* Info:			https://github.com/vedmack/feedback_me
* Contact:		vedmack@gmail.com
* Twitter:		https://twitter.com/danielreznick
* 
* Copyright 2013 Daniel Reznick, all rights reserved.
*
* Copyright 2013 Licensed under the MIT License (just like jQuery itself)
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
* 
* Parameters:
*
*					
* -------------

* feedback_url
				Required:			true
				Type:				String
				Description:		URL of your servlet/php etc ('name', 'message' and 'email' parameters will be send to your servlet/php etc...)

* position				
				Required:			false
				Type:				String
				Default value:		left-top
				Possible values:	left-top / left-bottom / right-top / right-bottom 
				Description:		Set the position where the feedback widget will be located
* jQueryUI
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Tell the plugin to use jQuery UI theme

* bootstrap
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Tell the plugin to use twitter bootstrap

* show_email
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Tell the plugin to display email input field

* show_radio_button_list
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Tell the plugin to set of 5 radio buttons
				
* name_label
				Required:			false
				Type:				String
				Default value:		"Name"
				Description:		Label for name input

* email_label
				Required:			false
				Type:				String
				Default value:		"Email"
				Description:		Label for email input

* message_label
				Required:			false
				Type:				String
				Default value:		"Message"
				Description:		Label for message input

* radio_button_list_labels
				Required:			false
				Type:				Array of 5 strings
				Default value:		["1","2","3","4","5"]
				Description:		Labels for radio button list

* radio_button_list_title
				Required:			false
				Type:				String
				Default value:		"How would you rate my site?"
				Description:		Label that will appear above the list of radio button
				
* submit_label
				Required:			false
				Type:				String
				Default value:		"Send"
				Description:		Label for submit input

* title_label
				Required:			false
				Type:				String
				Default value:		"Feedback"
				Description:		Label for title text

* trigger_label
				Required:			false
				Type:				String
				Default value:		"Feedback"
				Description:		Label for open/close (trigger) button

* name_placeholder
				Required:			false
				Type:				String
				Default value:		""
				Description:		Watermark for name input

* email_placeholder
				Required:			false
				Type:				String
				Default value:		""
				Description:		Watermark for email input

* message_placeholder
				Required:			false
				Type:				String
				Default value:		""
				Description:		Watermark for message input

* name_required
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Makes input required

* email_required
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Makes input required

* message_required
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Makes input required

* radio_button_list_required
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Makes radio inputs required

* show_asterisk_for_required
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Add an asterisk to the label of the required inputs

* close_on_click_outisde				
				Required:			false
				Type:				boolean
				Default value:		true
				Description:		Will cause the feedback dialog to be closed on clicking anywhere outside the dialog
				
* custom_params				
				Required:			false
				Type:				associative array
				Default value:		{}
				Description:		Use it if you want to send additional data to the server (can be used for sending: csrf token / logged in user_name / etc`)
* iframe_url				
				Required:			false
				Type:				String
				Default value:		undefined
				Description:		Allows you to use any html file that you want, it will be placed inside feedback_me widget, in order to close the feedback_me widget
									just call the followinog command: parent.fe.triggerAction(event); dont forget to pass the "event" from you onclick call to the triggerAction function
*
*
*/
var fe = (function () {

	'use strict';

	var fe_options,
		supportsTransitions = false;

	function triggerAction(event) {

		var animation_show = {},
			animation_hide = {};

		animation_show.marginLeft = "+=380px";
		animation_hide.marginLeft = "-=380px";

		if ($("body").attr("dir") === "rtl" || fe.getFmOptions().position.indexOf("right-") !== -1) {
			animation_show.marginRight = "+=380px";
			animation_hide.marginRight = "-=380px";
		}

		if ($("#founderror_trigger").hasClass("founderror_trigger_closed")) {
			if (supportsTransitions === true) {
				$("#founderror_trigger").removeClass("founderror_trigger_closed");
				$("#founderror_content").removeClass("founderror_content_closed");
			} else {
				$("#founderror_trigger , #founderror_content").animate(
					animation_show,
					150,
					function () {
						$("#founderror_trigger").removeClass("founderror_trigger_closed");
						$("#founderror_content").removeClass("founderror_content_closed");
					}
				);
			}
		} else {
			//first add the closed class so double (which will trigger closeFeedback function) click wont try to hide the form twice
			$("#founderror_trigger").addClass("founderror_trigger_closed");
			$("#founderror_content").addClass("founderror_content_closed");
			if (supportsTransitions === false) {
				$("#founderror_trigger , #founderror_content").animate(
					animation_hide,
					150
				);
			}
		}
	}

	function closeFeedback(event) {

		if ($("#founderror_content").hasClass("founderror_content_closed") || event.target.id === "founderror_content" || $(event.target).parents("div#founderror_content").length > 0) {
			return;
		}

		var animation_hide = {};
		animation_hide.marginLeft = "-=380px";
		if ($("body").attr("dir") === "rtl" || fe.getFmOptions().position.indexOf("right-") !== -1) {
			animation_hide.marginRight = "-=380px";
		}

		$("#founderror_trigger").addClass("founderror_trigger_closed");
		$("#founderror_content").addClass("founderror_content_closed");
		if (supportsTransitions === false) {
			$("#founderror_trigger , #founderror_content").animate(
				animation_hide,
				150
			);
		}
	}

	function emailValid(str) {
		var lastAtPos = str.lastIndexOf('@');
		return (lastAtPos < (str.length - 1) && lastAtPos > 0 && str.indexOf('@@') === -1 && str.length > 2);
	}

	function validateFeedbackForm() {
		if ((fe_options.name_required === true && $("#feedback_name").val() === "") ||
				((fe_options.email_required === true && $("#feedback_email").val() === "") || (fe_options.email_required === true && emailValid($("#feedback_email").val()) === false)) ||
				(fe_options.message_required === true && $("#feedback_message").val() === "") ||
				(fe_options.radio_button_list_required === true && $("#feedback_me_form input[name=feedback_radio]:checked").val() === undefined)) {
			return false;
		}
		return true;

	}



	function checkRequiredFieldsOk() {
		var $reqFields = $("[required]"),
			$fm_form,
			form_valid = true;

		if ($reqFields.length > 0) {
			form_valid = validateFeedbackForm();
		}
		return form_valid;
	}

	function applyCloseOnClickOutside() {
		var jqVersion = $().jquery.split(".");
		jqVersion[0] = +jqVersion[0];
		jqVersion[1] = +jqVersion[1];
		if (jqVersion[0] >= 1 && jqVersion[1] >= 7) {
			$(document).on("click", document, function (event) {
				closeFeedback(event);
			});
		} else {
			$(document).delegate("body", document, function (event) {
				closeFeedback(event);
			});
		}
	}

	function appendFeedbackToBody() {
		var form_html = "",
			iframe_html = "",
			jQueryUIClasses1 = "",
			jQueryUIClasses2 = "",
			jQueryUIClasses3 = "",
			jQueryUIClasses4 = "",
			email_html = "",
			phone_html="",
			email_founderror_content_class = "",
			radio1_button_list_html = "",
			radio1_button_list_class = "",
			radio2_button_list_html = "",
			radio2_button_list_class = "",
			radio3_button_list_html = "",
			radio3_button_list_class = "",
			radio4_button_list_html = "",
			radio4_button_list_class = "",	
			radio5_button_list_html = "",								
			fm_class = " fm_clean ",
			jquery_class = "",
			bootstrap_class = "",
			bootstrap_btn = "",
			bootstrap_hero_unit = "",

			name_required = fe_options.name_required ? "required" : "",
			email_required = fe_options.email_required ? "required" : "",
			message_required = fe_options.message_required ? "required" : "",
			radio_button_list_required = fe_options.radio_button_list_required ? "required" : "",

			name_asterisk  = fe_options.name_required && fe_options.show_asterisk_for_required ? "<span class=\"required_asterisk\">*</span>" : "",
			email_asterisk  = fe_options.email_required && fe_options.show_asterisk_for_required ? "<span class=\"required_asterisk\">*</span>" : "",
			message_asterisk  = fe_options.message_required && fe_options.show_asterisk_for_required ? "<span class=\"required_asterisk\">*</span>" : "",
			radio_button_list_asterisk = fe_options.radio_button_list_required && fe_options.show_asterisk_for_required ? "<span class=\"required_asterisk\">*</span>" : "";

		if (fe_options.bootstrap === true) {
			bootstrap_class = " fm_bootstrap ";
			bootstrap_btn = " btn btn-primary ";
			bootstrap_hero_unit = " hero-unit ";

			fm_class = "";
			jquery_class = "";
		}

		if (fe_options.jQueryUI === true) {
			jquery_class = " fm_jquery ";
			jQueryUIClasses1 = " ui-widget-header ui-corner-all ui-helper-clearfix ";
			jQueryUIClasses2 = " ui-dialog ui-widget ui-widget-content ui-corner-all ";
			jQueryUIClasses3 = " ui-dialog-titlebar ";
			jQueryUIClasses4 = " ui-dialog-title ";

			fm_class = "";
			bootstrap_class = "";
			bootstrap_hero_unit = "";
			bootstrap_btn = "";

		}

		if (fe_options.show_radio_button_list === true) {
		
		}

		if (fe_options.show_email === true) {

			email_founderror_content_class = " email_present";
		}

		if (fe_options.iframe_url === undefined) {
			form_html = '<form id="feedback_me_form">'
				+	'<ul>'
				
				+ 		'<li>	<label>' + 'Please give some details of the error you spotted: ' + '</label> '
		
				+		'<li>	<label for="feedback_message">' + fe_options.message_label + '</label> ' + message_asterisk + ' <textarea rows="5" id="feedback_message" ' + message_required + ' placeholder="' + fe_options.message_placeholder + '"></textarea> </li>'
				+		 radio5_button_list_html		
				+		'<li>	<button id="feedback_submit" type="submit" onclick="fe.sendFeedback(event);" class="' + bootstrap_btn + '">' + fe_options.submit_label + '</button> </li>'
				+	'</ul>'
				+	'</form>';
		} else {
			iframe_html = '<iframe name="feedback_me_frame" id="feedback_me_frame" frameborder="0" src="' + fe_options.iframe_url + '"></iframe>';
		}

		$('body').append('<div id="founderror_trigger" onclick="fe.stopPropagation(event);fe.triggerAction(event);" class="founderror_trigger_closed ' + fe_options.position + jQueryUIClasses1 + fm_class + jquery_class + bootstrap_class + bootstrap_hero_unit + '">'
				+	'<span class="founderror_trigger_text">' + fe_options.trigger_label
				+	'</span></div>');

		$('body').append('<div id="founderror_content" class="founderror_content_closed ' + fe_options.position + email_founderror_content_class + radio1_button_list_class + jQueryUIClasses2 + fm_class + jquery_class + bootstrap_class + bootstrap_hero_unit + '">'
							+ '<div class="feedback_title ' + jQueryUIClasses1 + jQueryUIClasses3 + '">'
							+	'<span class="' + jQueryUIClasses4 + '">' + fe_options.title_label + '</span>'
							+ '</div>'
							+  form_html
							+  iframe_html
						+ '</div>');

		if (fe_options.jQueryUI === true) {
			$('#feedback_submit').button({
				icons: {
					primary: 'ui-icon-mail-closed'
				}
			});
		}

		if (fe_options.close_on_click_outisde === true) {
			applyCloseOnClickOutside();
		}

		//prevent form submit (needed for validation)
		$('#feedback_me_form').submit(function (event) {
			event.preventDefault();
		});
	}

	function stopPropagation(evt) {
		if (evt.stopPropagation !== undefined) {
			evt.stopPropagation();
		} else {
			evt.cancelBubble = true;
		}
	}

	function clearInputs() {
		$("#feedback_name").val("");
		$("#feedback_message").val("");
		$("#feedback_email").val("");
		$("#feedback_me_form input[name=feedback_radio]").prop('checked', false);
	}

	function sendFeedback(event) {
		var checkValid = checkRequiredFieldsOk(),
			dataArray;
		// if (checkValid === false) {
		// 	stopPropagation(event);
		// 	return;
		// }

		dataArray = {			
			email: $("#feedback_email").val(),
			web_design: $("#feedback_me_form input[name=feedback_radio1]:checked").val(),
			ease_of_use: $("#feedback_me_form input[name=feedback_radio2]:checked").val(),
			quality: $("#feedback_me_form input[name=feedback_radio3]:checked").val(),
			range: $("#feedback_me_form input[name=feedback_radio4]:checked").val(),					
			use_again: $("#feedback_me_form input[name=feedback_radio5]:checked").val(),						
			message: $("#feedback_message").val()			

		};
		console.log(dataArray)
		dataArray = $.extend(fe.getFmOptions().custom_params, dataArray);

		$.ajax({
			type: 'POST',
			url: fe.getFmOptions().feedback_url,
			data: dataArray,
			beforeSend: function (xhr) {
				var animation_hide = {};
				animation_hide.marginLeft = "-=380px";
				if ($("body").attr("dir") === "rtl" || fe.getFmOptions().position.indexOf("right-") !== -1) {
					animation_hide.marginRight = "-=380px";
				}

				if (supportsTransitions === true) {
					$("#founderror_trigger").addClass("founderror_trigger_closed");
					$("#founderror_content").addClass("founderror_content_closed");
				} else {
					$("#founderror_trigger , #founderror_content").animate(
						animation_hide,
						150,
						function () {
							$("#founderror_trigger").addClass("founderror_trigger_closed");
						}
					);
				}
			},
			success: function (data) {
				fe.clearInputs();
            },
			error: function (ob, errStr) {
				alert("Failed to send feedback (please double check your feedback_url parameter)");
			}
		});
	}

	function detectTransitionSupport() {
		var be = document.body || document.documentElement,
			style = be.style,
			p = 'transition',
			vendors,
			i;
		if (typeof style[p] === 'string') {
			supportsTransitions = true;
			return;
		}

		vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
		p = p.charAt(0).toUpperCase() + p.substr(1);
		for (i = 0; i < vendors.length; i++) {
			if (typeof style[vendors[i] + p] === 'string') {
				supportsTransitions = true;
				return;
			}
		}
		supportsTransitions = false;
		return;
	}

	function getFmOptions() {
		return fe_options;
	}

	function init(options) {

		var default_options = {
			feedback_url : "",
			position : "left-bottom",
			jQueryUI : false,
			bootstrap : false,
			show_email : true,
			show_radio_button_list : false,
			close_on_click_outisde: true,
			name_label : "Name",
			email_label : "Email",
			message_label : "Message",
			radio_button_list_labels : ["1", "2", "3", "4", "5"],
			radio_button_list_title : "How would you rate my site?",
			name_placeholder : "",
			email_placeholder : "",
			message_placeholder : "",
			name_required : false,
			email_required : false,
			message_required : false,
			radio_button_list_required : false,
			show_asterisk_for_required : false,
			submit_label : "Send",
			title_label : "Feedback",
			trigger_label : "Feedback",
			custom_params : {},
			iframe_url : undefined
		};

		fe_options = $.extend(default_options, options);

		appendFeedbackToBody();

		detectTransitionSupport();
	}

    return {
		init : init,
		sendFeedback : sendFeedback,
		getFmOptions : getFmOptions,
		triggerAction : triggerAction,
		stopPropagation : stopPropagation,
		clearInputs : clearInputs
    };

}());