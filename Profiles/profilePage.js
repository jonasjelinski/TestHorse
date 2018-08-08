var Profil = Profil || {};

Profil = function(userId, pageId, templateId, testdata, viewControllConstructor, model){
	"use strict";
	let that = new EventTarget(),
		profilViewTemplateString,
		profileViewData,
		viewControll,
		popup;

	function init(){
		profilViewTemplateString = document.getElementById(templateId).innerHTML;
		initModel();
		profileViewData = testdata ;	
		initViewControll(profileViewData);		
		popup = Popup("Wirklich löschen?");
		popup.init();
		addEventListeners();				
	}

	function initModel(){
		model.addEventListener("onDataReceived", handleDataReceived);	
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
		console.log("deleteProfil");
	}

	function setModelParameter(param){
		model.setParameter(param);
	}

	that.setModelParameter = setModelParameter;
	that.init = init;
	return that;
}