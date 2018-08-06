var Profil = Profil || {};

Profil = function(userId, pageId, templateId, data){
	"use strict";
	let that = new EventTarget(),
		profilViewTemplateString,
		viewControll,
		model,
		profileViewData;

	function init(){
		profilViewTemplateString = document.getElementById(templateId).innerHTML;
		initModel();
		profileViewData = data ;	
		initViewControll(profileViewData);		
	}

	function initModel(){
		model = UserProfilPage.UserProfilPageModel(userId);
		model.addEventListener("onDataReceived", handleDataReceived);		
	}

	function handleDataReceived(event){
		let data = event.details.event;		
		initViewControll(data);
	}

	function initViewControll(data){					
		viewControll = new UserProfilPage.UserProfilPageViewControll(pageId, profilViewTemplateString, data);
		viewControll.init();
		addViewControllListeners();
	}

	function addViewControllListeners(){
		viewControll.addEventListener("onChange", handleChange );
		viewControll.addEventListener("onOkay", handleOkay );
		viewControll.addEventListener("onDelete", handleDelete );
	}
		
	function handleChange(){
		console.log("onChange");
	}	

	function handleOkay(){
		console.log("onOkay");
	}

	function handleDelete(){
		console.log("onDelete");
	}

	that.init = init;
	return that;
}