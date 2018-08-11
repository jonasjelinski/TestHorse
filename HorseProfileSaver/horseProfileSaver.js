var HorseProfileSaver = HorseProfileSaver || {};

HorseProfileSaver = function(data){
	"user strict";
	const 
	HORSE_ID = ""
	PAGE_ID = "horseProfileSaver",
	TEMPLATE_ID = "horseProfileTemplate";

	let that = new EventTarget(),
		profil = {},
		attributes;

	function init(newAttributes){		
		attributes = newAttributes;
		initPofil();
		initModel();
		addListeners();			
	}

	function initPofil(){
		profil =  Profil(PAGE_ID, TEMPLATE_ID, HorseProfileSaver.ViewControll);
		profil.init(attributes);		
	}

	function initModel(){
		model = HorseProfileSaver.Model();
		model.init(attributes);
	}

	function addListeners(){
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