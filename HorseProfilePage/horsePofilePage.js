var HorseProfilePage = HorseProfilePage || {};

HorseProfilePage = function(){
	"user strict";

	let that = new EventTarget(),
		profil = {},
		model,
		dbRquester;		

	function init(newAttributes){		
		initProfil(newAttributes);
		initModel(newAttributes);
		initDBRequester();
		addEventListeners();		
	}

	function initProfil(attributes){
		profil =  new  HorseProfilePage.HorseProfile();
		profil.init(attributes);	
	}

	function initModel(attributes){
		model = new HorseProfilePage.Model();
		model.init(attributes);	
	}

	function initDBRequester() {
		dbRquester = new HorseProfilePage.DBRequester();
		dbRquester.init();
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
		let id = model.getHorseId();
		console.log("handleDeleteProfile id", id);
		dbRquester.delteHorseFromDB(id);
		sendEvent("onDeleteHorseProfile", "");
	}

	that.init = init;
	return that;
} 