var UserProfileSaver = UserProfileSaver || {};

/** 
 * namespace UserProfileSaver
 * @memberof! UserProfileSaver
 * @param {string}, userID id of the user
 * @description <code>UserProfileSaver</code> shows the profile of the user to the user
 * and allows him to save it into the database. It is used after the user either created
 * a new user with <code>UserCreatorPage</code> or updated an old horse with <code>UserProfileChanger</code>.
 * The user can cancel the saving, if he wants.
 */

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


	/**
	* @function init
	* @public
	* @memberof! UserProfileSaver
	* @instance
	* @param {newAttributes}, newAttributes, attributes of the horse
	* @description Initialize this model
	*/ 
	function init(newAttributes){		
		attributes = newAttributes;
		initPofil();
		initModel();
		initDBRequester();
		addListeners();			
	}

	/**
	* @function initPofil
	* @private
	* @memberof! UserProfileSaver
	* @instance
	* @description Initialize <code>profil</code> an instance of Profil
	*/ 
	function initPofil(){
		profil =  new Profil(USER_PAGE_ID, USER_TEMPLATE_ID,CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
		profil.init(attributes);		
	}

	/**
	* @function initModel
	* @private
	* @memberof! UserProfileSaver
	* @initModel
	* @description Initialize the model
	*/ 
	function initModel(){
		model = new UserProfileSaver.Model();
		model.init(attributes);
	}

	/**
	* @function initPofil
	* @private
	* @memberof! UserProfileSaver
	* @initModel
	* @description Initialize the db requester <code>dbInterface</code>
	*/ 
	function initDBRequester(){
		dbInterface = new UserProfileSaver.DBRequester();
		dbInterface.init();
	}
	/**
	* @function initPofil
	* @private
	* @memberof! UserProfileSaver  
	* @instance
	* @description adds eventListener to the profile, if the user wants to change,
	* save or delte the profil.
	*/
	function addListeners(){
		profil.addEventListener("onChangeProfile", handleChangeProfile);
		profil.addEventListener("onProfileOkay", handleOkayProfile);
		profil.addEventListener("onDeleteProfile", handleDeleteProfile);	
	}

	/**
	* @function handleChangeProfile
	* @private
	* @memberof! UserProfileSaver  
	* @instance
	* @description sends an event of type "onChangeUserProfile"
	* and the attributes of the user so <code>UserProfileChanger</code>.
	* can change the profil if the user is unsatisfied with the profil,
	* which he wanted to save into the database
	*/
	function handleChangeProfile(){
		sendEvent("onChangeUserProfile", attributes);
	}


	/**
	* @function sendEvent
	* @private
	* @memberof! UserProfileSaver
	* @instance
	* @param {string} type,type of event
	* @description sends event of type "type" and the attributes of the user
	*/
	function sendEvent(type, attributes){
		let event = new Event(type);
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
	}

	/**
	* @function handleOkayProfile
	* @private
	* @memberof! UserProfileSaver
	* @instance
	* @description saves the user into the database and sends the event "onSaveUserProfile"
	*/
	function handleOkayProfile(){
		let isNewUser = model.getIsNewUser(),
			userData = model.getUserData();
		dbInterface.saveUserIntoDB(isNewUser, userData);
		sendEvent("onSaveUserProfile");
	}

	/**
	* @function handleDeleteProfile
	* @private
	* @memberof! UserProfileSaver
	* @instance
	* @description sends the event "onDeleteNewUserProfile" and cancels the saving process
	*/
	function handleDeleteProfile(){
		sendEvent("onDeleteNewUserProfile", "");
	}

	/**
	* @function createNewUser
	* @private
	* @memberof! UserProfileSaver
	* @instance
	* @description sets the dbInterface to update, so the dbInterface knows
	* that it has to update an old profil and not saving a new one
	*/
	function createNewUser(){
		model.createNewUser();
	}

	/**
	* @function updateOldUser
	* @private
	* @memberof! UserProfileSaver
	* @instance
	* @description sets the dbInterface to new, so the dbInterface knows
	* it has to save a new profile  and not update an old one
	*/
	function updateOldUser(){
		model.updateOldUser();
	}

	that.init = init;
	that.createNewUser = createNewUser;
	that.updateOldUser = updateOldUser;
	return that;
} 