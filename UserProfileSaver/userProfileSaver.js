var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver = function(){
	"user strict";
	const USER_PAGE_ID = "userProfileSaver",
		USER_TEMPLATE_ID = "userProfileTemplate",
		CHANGE_BUTTON_ID = "userSaverChange",
		OKAY_BUTTON_ID = "userSaverOk",
		DELETE_BUTTON_ID = "userSaverDelete";	

	let that = new EventTarget(),
		profil = {},
		dbInterface,
		attributes;

	function init(newAttributes){		
		attributes = newAttributes;
		initPofil();
		initModel();
		initDBRequester();
		addListeners();			
	}

	function initPofil(){
		profil =  new Profil(USER_PAGE_ID, USER_TEMPLATE_ID,CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
		profil.init(attributes);		
	}

	function initModel(){
		model = new UserProfileSaver.Model();
		model.init(attributes);
	}

	function initDBRequester(){
		dbInterface = new UserProfileSaver.DBRequester();
		dbInterface.init();
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
		let isNewUser = model.getIsNewUser(),
			userData = model.getUserData();
		dbInterface.saveUserIntoDB(isNewUser, userData);
		sendEvent("onSaveUserProfile");
	}

	function handleDeleteProfile(){
		sendEvent("onDeleteNewUserProfile", "");
	}

	function createNewUser(){
		model.createNewUser();
	}

	function updateOldUser(){
		model.updateOldUser();
	}

	that.init = init;
	that.createNewUser = createNewUser;
	that.updateOldUser = updateOldUser;
	return that;
} 