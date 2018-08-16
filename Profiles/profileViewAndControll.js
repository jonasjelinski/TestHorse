var Profil = Profil || {};

Profil.ProfileViewAndControll = function(pageId, templateString, data, changeButtonId, okayButtonId, delteButtonId){
	"use strict";

	let that = new EventTarget(),
		page,
		view,
		controll,
		changeEventType = "onChange",
		okayEventType = "onOkay",
		deleteEventType = "onDelete";

		function init(){
			page = document.getElementById(pageId);
			view = Profil.ProfilView(page, templateString, data);
			view.init();
			controll = Profil.ProfileControllChangeOkayAndDelete(changeButtonId, okayButtonId, delteButtonId);
			controll.init();
			addEventListeners();		
		}

		function addEventListeners(){
			controll.addEventListener(changeEventType, handleChange);
			controll.addEventListener(okayEventType, handleOkay);
			controll.addEventListener(deleteEventType, handleDelete);
		}

		function handleChange(){		
			sendEvent(changeEventType);
		}

		function sendEvent(type){
			let event = new Event(type);
			that.dispatchEvent(event);
		}

		function handleOkay(){		
			sendEvent(okayEventType);
		}

		function handleDelete(){		
			sendEvent(deleteEventType);
		}

		that.init = init;
		return that;

}