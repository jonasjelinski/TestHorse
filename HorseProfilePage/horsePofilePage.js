var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage = function(){
	"user strict";
	const 
	HORSE_ID = "";

	let that = new EventTarget(),
		profil = {},
		attributes;

	function init(newAttributes){		
		attributes = newAttributes;
		initProfil();
		initModel();
		addEventListeners();		
	}

	function initProfil(){
		profil =  new  HorseProfilePage.HorseProfile(HORSE_ID);
		profil.init(attributes);	
	}

	function initModel(){
		model = HorseProfileSaver.Model();
		model.init(attributes);	
	}

	function addEventListeners(){
		profil.addEventListener("onChangeProfile", handleChangeProfile);
		profil.addEventListener("onProfileOkay", handleOkayProfile);
		profil.addEventListener("onDeleteProfile", handleDeleteProfile);	
	}

	function handleChangeProfile(){
		sendEvent("onChangeHorseProfile", attributes);
	}

	function sendEvent(type, attributes){
		let event = new Event(type);
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
		console.log("send");
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