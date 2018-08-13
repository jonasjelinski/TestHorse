var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver = function(data){
	"user strict";
	const 
	HORSE_ID = ""
	USER_PAGE_ID = "userProfileSaver",
	USER_TEMPLATE_ID = "userProfileTemplate";

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
		profil =  new Profil(USER_PAGE_ID, USER_TEMPLATE_ID, UserProfileSaver.ViewControll);
		profil.init(attributes);		
	}

	function initModel(){
		model = new HorseProfileSaver.Model();
		model.init(attributes);
	}

	function addListeners(){
		profil.addEventListener("onChangeProfile", handleChangeProfile);
		profil.addEventListener("onProfileOkay", handleOkayProfile);
		profil.addEventListener("onDeleteProfile", handleDeleteProfile);	
	}

	function handleChangeProfile(){
		sendEvent("onChangeUserProfile", attributes);
	}

	function sendEvent(type, attributes){
		let event = new Event(type);
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
	}

	function handleOkayProfile(){
		//model.saveHorseIntoDB();
		sendEvent("onSaveUserProfile");
	}

	function handleDeleteProfile(){
		sendEvent("onDeleteNewUserProfile", "");
	}

	that.init = init;
	return that;
} 