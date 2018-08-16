var Profil = Profil || {};

Profil = function(pageId, templateId, viewControllConstructor){
	"use strict";

	const POPUP_MESSAGE = "Wirklich löschen?";

	let that = new EventTarget(),
		profilViewTemplateString,
		attributes,
		viewControll,
		popup;

	function init(profileData){
		profilViewTemplateString = document.getElementById(templateId).innerHTML;
		attributes = profileData;	
		initViewControll(attributes);		
		popup = Popup(POPUP_MESSAGE);
		popup.init();
		addEventListeners();				
	}

	function handleDataReceived(event){
		let data = event.details.event;		
		initViewControll(data);
	}

	function initViewControll(data){		
		viewControll = new viewControllConstructor(pageId, profilViewTemplateString, data);
		viewControll.init();		
	}

	function addEventListeners(){
		addViewControllListeners();
		addPopupListeners();
	}

	function addViewControllListeners(){
		viewControll.addEventListener("onChange", handleChange );
		viewControll.addEventListener("onOkay", handleOkay );
		viewControll.addEventListener("onDelete", handleDelete );
	}
		
	function handleChange(){
		sendEvent("onChangeProfile", attributes);
	}

	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.attributes = data; 
		}
		that.dispatchEvent(event);
	}	

	function handleOkay(){
		sendEvent("onProfileOkay");
	}

	function handleDelete(){
		popup.setPopupVisible();
	}

	function addPopupListeners(){
		popup.addEventListener("onYes", handleYes);
	}

	function handleYes(){
		deleteProfil();
	}

	function deleteProfil(){
		sendEvent("onDeleteProfile");
	}

	that.init = init;
	return that;
}