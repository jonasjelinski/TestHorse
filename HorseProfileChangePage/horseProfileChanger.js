var HorseProfileChanger = HorseProfileChanger || {};

HorseProfileChanger = function(data){
	"user strict";
	const 
	HORSE_ID = ""
	PAGE_ID = "horseProfileChange",
	TEMPLATE_ID = "horseProfileTemplate",
	REQUEST_FUNCTION = "getHorseData";

	let that = new EventTarget(),
		profil = {},
		attributes;

	function init(newAttributes){		
		attributes = newAttributes;
		profil =  Profil(PAGE_ID, TEMPLATE_ID, HorseProfileChanger.ViewControll);
		profil.init(attributes);
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
		sendEvent("onSaveHorseProfile", attributes);
	}

	function handleDeleteProfile(){
		sendEvent("onDeleteNewHorseProfile", "");
	}

	that.init = init;
	return that;
} 