var Profil = Profil || {};

Profil = function(pageId, templateId, viewControllConstructor){
	"use strict";

	const POPUP_MESSAGE = "Wirklich löschen?";

	let that = new EventTarget(),
		profilViewTemplateString,
		profileViewData,
		viewControll,
		popup;

	function init(profileData){
		profilViewTemplateString = document.getElementById(templateId).innerHTML;
		profileViewData = profileData;	
		initViewControll(profileViewData);		
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
		sendShowSide("onChangeProfile");
	}

	function sendShowSide(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}	

	function handleOkay(){
		sendShowSide("onProfileOkay");
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
		sendShowSide("onDeleteProfile");
	}

	that.init = init;
	return that;
}