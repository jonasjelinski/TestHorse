var UserProfilPage = UserProfilPage || {};

/** 
 * namespace UserProfilPage 
 * @memberof! UserProfilPage
 * @description Displays all values of a the user profil to the user. 
 * Therefore it requests the data of the user from the database and
 * after preparing them in the model, inits an instance of <code>Profil</code>
 * returns that instance
 */

UserProfilPage = function(userID){
	const PAGE_ID = "mainpage",
		TEMPLATE_ID = "userProfileTemplate",
		REQUEST_FUNCTION = "getUserData",
		CHANGE_BUTTON_ID = "userProfileChange",
		OKAY_BUTTON_ID = "userProfileOk",
		DELETE_BUTTON_ID = "userProfileDelete";		
		
		
	let dbInterface,
		model,
		that = Profil(PAGE_ID, TEMPLATE_ID, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
	
	/**
	* @function init
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @description Initialize this page.
	*/ 	
	function initPage(){
		initDBRequester();
		requestUserDataFromDB();
		addEventListeners();			
	}

	/**
	* @function init
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @description Initialize this dbInterface.
	*/ 		
	function initDBRequester(){
		dbInterface = new UserProfilPage.DBRequester(userID);
		dbInterface.addEventListener("onResult", handleResult);
		dbInterface.init();
	}

	/**
	* @function handleResult
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @description inits the model with the result of the databse request
	*/ 
	function handleResult(event){
		let userData = event.details.userData;
		initModel(userData);			
	}

	/**
	* @function initModel
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @param {object}, userData
	* @description inits the model with userData
	*/ 
	function initModel(userData){
		model = new UserProfilPage.Model();
		model.addEventListener("onDataConverted", handleConvertedData)
		model.init(userData);
	}

	/**
	* @function handleConvertedData
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @param {event}, event contians converted userdata
	* @description inits the profilPage with the converted data
	*/ 
	function handleConvertedData(event){
		let userData = event.details.userData;
		initProfilePage(userData);
	}

	/**
	* @function initProfilePage
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @param {object}, userData
	* @description inits the profilPage userData
	*/ 
	function initProfilePage(userData){
		that.init(userData);
	}

	/**
	* @function requestUserDataFromDB
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @description stats a database request through dbInterface
	* to get all the data of the user from the database
	*/ 
	function requestUserDataFromDB(){
		dbInterface.requestUserDataFromDB();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @description adds evnetListener to the profil, so this page knows
	* when the user wants to change or delte the horse which is displayed 
	* or if he doesnt want to do anything.
	*/
	function addEventListeners(){
		that.addEventListener("onDeleteProfile", handleDeleteProfile);	
	}

	function handleDeleteProfile(){
		let userID = model.getUserId();
		dbInterface.delteProfil(userID);
	}

	that.initPage = initPage;
	return that;
}