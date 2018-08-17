var HorseProfileSaver = HorseProfileSaver || {};

HorseProfileSaver = function(data){
	"user strict";
	const 
	HORSE_ID = ""
	PAGE_ID = "horseProfileSaver",
	TEMPLATE_ID = "horseProfileTemplate";

	let that = new EventTarget(),
		profil = {},
		dbInterface,
		attributes;

	function init(newAttributes){	
		isNewHorse = isNew;	
		attributes = newAttributes;
		initPofil();
		initModel();
		addListeners();			
	}

	function initPofil(){
		profil = new Profil(PAGE_ID, TEMPLATE_ID, HorseProfileSaver.ViewControll);
		profil.init(attributes);		
	}

	function initModel(){
		dbInterface = new HorseProfileSaver.DBRequester(UserId);
		dbInterface.init(attributes);
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
		dbInterface.saveHorseIntoDB(attributes);
		sendEvent("onSaveHorseProfile");
	}

	function handleDeleteProfile(){
		sendEvent("onDeleteNewHorseProfile", "");
	}

	function setDBInterfaceToUpdate(){
		dbInterface.setUpdateHorse();
	}

	function setDBInterfaceToNew(){
		dbInterface.setNewHorse();
	}

	that.setDBInterfaceToNew = setDBInterfaceToNew;
	that.setDBInterfaceToUpdate = setDBInterfaceToUpdate;
	that.init = init;
	return that;
} 