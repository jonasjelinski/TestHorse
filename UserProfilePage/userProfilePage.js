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
		DELETE_BUTTON_ID = "userProfileDelete"
		BURGER_CLICK_BOX_ID = "burger",
		BURGER_LIST_ID = "burgerListUserPage",
		inVisibleClass = "",
		visibleClass = "",
		BURGER_OPTION_PROFILE = "burgerOptionUserProfile",
		BURGER_OPTION_HELP = "burgerOptionUserHelp",
		BURGER_OPTION_LOGOUT = "burgerOptionUserLogout";			
		
		
	let dbInterface,
		model,
		hamburgerMenu,
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
		initHamburgerMenu();
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
		model = new UserProfilPage.Model(userID);
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

	/**
	* @function handleDeleteProfile
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @description deltes user profil from the database
	*/
	function handleDeleteProfile(){	
		dbInterface.deleteUserFromDB();
	}

	/**
	* @function initHamburgerMenu
	* @private
	* @memberof! MainPage  
	* @instance
	* @description initts the hamburger menu
	*/
	function initHamburgerMenu(){
		console.log("initHamburgerMenu");
		hamburgerMenu = new HamburgerMenu(BURGER_CLICK_BOX_ID, BURGER_LIST_ID, inVisibleClass, visibleClass);
		hamburgerMenu.init();
		hamburgerMenu.addEventListener("onOption", handleHamburgerClick);
	}

	/**
	* @function handleHamburgerClick
	* @private
	* @memberof! MainPage  
	* @instance
	* @param{event}, event, contains the option of the burger menu, which has been clicked by the user
	* @description handles the click of the options of the burgermenu
	*/
	function handleHamburgerClick(event){
		let option = event.details.option;
		switch(option){
			case BURGER_OPTION_PROFILE : handleProfileOption();
				break;
			case BURGER_OPTION_HELP : handleHelpOption();
				break;
			case BURGER_OPTION_LOGOUT : handleLogoutOption();
				break;
			default: break;
		}
	}

	/**
	* @function handleProfileOption
	* @private
	* @memberof! MainPage  
	* @instance
	* @description sends event "showProfilePage" 
	*/
	function handleProfileOption(){
		sendEvent("showProfilePage","");
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! Slideshow.ViewControll  
	* @instance
	* @param {string}, type event type
	* @param {string}, id of the horse
	* @description sends event of type type and the id
	*/
	function sendEvent(type, id){
		console.log(type);
		let event = new Event(type);
		event.details = {};
		event.details.horseID = id;
		that.dispatchEvent(event);	
	}

	/**
	* @function handleProfileOption
	* @private
	* @memberof! MainPage  
	* @instance
	* @description sends event "showHelpPage" 
	*/
	function handleHelpOption(){
		sendEvent("showHelpPage","");	
	}

	/**
	* @function handleProfileOption
	* @private
	* @memberof! MainPage  
	* @instance
	* @description sends event "logoutUser" 
	*/
	function handleLogoutOption(){
		sendEvent("logoutUser","");
	}

	that.initPage = initPage;
	return that;
}