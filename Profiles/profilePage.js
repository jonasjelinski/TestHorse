var Profil = Profil || {};

Profil = function(userId, pageId, templateId, testdata, viewControllConstructor, model){
	"use strict";
	let that = new EventTarget(),
		profilViewTemplateString,
		profileViewData,
		viewControll;

	function init(){
		profilViewTemplateString = document.getElementById(templateId).innerHTML;
		initModel();
		profileViewData = testdata ;	
		initViewControll(profileViewData);		
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
		addViewControllListeners();
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
		sendShowSide("onProfileDelete");
	}

	that.init = init;
	return that;
}