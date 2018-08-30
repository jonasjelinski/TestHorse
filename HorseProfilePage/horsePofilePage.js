var HorseProfilePage = HorseProfilePage || {};

/** 
 * namespace HorseProfilePage 
 * @memberof! HorseProfilePage
 * @description Displays all values of a horse to the user. Allows the user to delete
 * the horse from the database.
 */
HorseProfilePage = function(){
	"user strict";

	const BURGER_CLICK_BOX_ID = "burger",
		BURGER_LIST_ID = "burgerMenuHorseProfile",
		inVisibleClass = "",
		visibleClass = "",
		BURGER_OPTION_START = "optionHProfileStart",
		BURGER_OPTION_HELP = "optionHProfileHelp",
		BURGER_OPTION_PROFILE = "optionHProfileUserProfile",
		BURGER_OPTION_LOGOUT = "optionHProfileLogout";
	
	let that = new EventTarget(),
		profil = {},
		potrait,
		model,
		hamburgerMenu,
		dbRquester;	

	/**
	* @function init
	* @public
	* @memberof! HorseProfilePage  
	* @instance
	* @param{object} newAttributes, attributes of the horse which are displayed by this page.
	* @description Initialize this page.
	*/ 
	function init(newAttributes){		
		initProfil(newAttributes);
		initPotrait(newAttributes);
		initModel(newAttributes);
		initDBRequester();
		addEventListeners();
		initHamburgerMenu();		
	}

	/**
	* @function initProfil
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @param{object} attributes, attributes of the horse which are displayed by this page.
	* @description Initialize an instance of the HorseProfilePage.HorseProfile
	*/ 
	function initProfil(attributes){
		profil =  new HorseProfilePage.HorseProfile();
		profil.init(attributes);	
	}

	function initPotrait(attributes){
		console.log(attributes);
		let src = attributes.photo;
		potrait = new Potrait("horseProfileImgContainer");
		potrait.init();
		potrait.setPicture(src);
	}

	/**
	* @function initModel
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @param{object} attributes, attributes of the horse which are displayed by this page.
	* @description Initialize an instance of the HorseProfilePage.Model
	*/
	function initModel(attributes){
		model = new HorseProfilePage.Model();
		model.init(attributes);	
	}

	/**
	* @function initDBRequester
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @description Initialize an instance of the HorseProfilePage.DBRequester
	*/
	function initDBRequester() {
		dbRquester = new HorseProfilePage.DBRequester();
		dbRquester.init();
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
		profil.addEventListener("onChangeProfile", handleChangeProfile);
		profil.addEventListener("onProfileOkay", handleOkayProfile);
		profil.addEventListener("onDeleteProfile", handleDeleteProfile);	
	}

	/**
	* @function handleChangeProfile
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @description sends the attributes of the horse with an event
	* so the modul <code>HorseProfileChanger</code> can change the horse
	*/
	function handleChangeProfile(){
		let attributes = model.getAttributes();
		sendEvent("onChangeHorseProfile", attributes);
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! HorseProfilePage
	* @instance
	* @param {string} type,type of event
	* @description sends event of type "type"
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
	* @memberof! HorseProfilePage
	* @instance
	* @description sends event of type "onSaveHorseProfile",
	* so the modul <code>Pages</code> knows that the user wants to change the sied
	* without changing the horse
	*/
	function handleOkayProfile(){
		sendEvent("onOkayHorseProfile");
	}

	/**
	* @function handleDeleteProfile
	* @private
	* @memberof! HorseProfilePage
	* @instance
	* @description sends event of type "onDeleteHorseProfile"
	* and deltes the horse from the datanase by using the <code>dbRquester</code>
	*/
	function handleDeleteProfile(){
		let id = model.getHorseId();
		dbRquester.delteHorseFromDB(id);
		sendEvent("onDeleteHorseProfile", "");
	}

	/**
	* @function initHamburgerMenu
	* @private
	* @memberof! MainPage  
	* @instance
	* @description initts the hamburger menu
	*/
	function initHamburgerMenu(){
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
			case BURGER_OPTION_START : handleStartOption();
				break;
			case BURGER_OPTION_PROFILE : handleProfileOption();
				break;
			case BURGER_OPTION_HELP : handleHelpOption();
				break;
			case BURGER_OPTION_LOGOUT : handleLogoutOption();
				break;
			default: break;
		}
	}

	function handleStartOption(){
		sendEvent("showStartPage","");
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


	that.init = init;
	return that;
} 