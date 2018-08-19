var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage = function(){
	"user strict";
	const 
	HORSE_ID = "";

	let that = new EventTarget(),
		profil = {},
		model;

	function init(newAttributes){		
		initProfil(newAttributes);
		initModel(newAttributes);
		addEventListeners();		
	}

	function initProfil(attributes){
		profil =  new  HorseProfilePage.HorseProfile(HORSE_ID);
		profil.init(attributes);	
	}

	function initModel(attributes){
		model = new HorseProfilePage.Model();
		model.init(attributes);	
	}

	function addEventListeners(){
		profil.addEventListener("onChangeProfile", handleChangeProfile);
		profil.addEventListener("onProfileOkay", handleOkayProfile);
		profil.addEventListener("onDeleteProfile", handleDeleteProfile);	
	}

	function handleChangeProfile(){
		let attributes = model.getAttributes();
		sendEvent("onChangeHorseProfile", attributes);
	}

	function sendEvent(type, attributes){
		let event = new Event(type);
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
	}

	function handleOkayProfile(){
		//model.saveHorseIntoDB();
		sendEvent("onSaveHorseProfile");
	}

	function handleDeleteProfile(){
		sendEvent("onDeleteNewHorseProfile", "");
	}

	that.init = init;
	return that;
} 