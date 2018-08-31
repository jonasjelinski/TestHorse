var DatesPageAll = DatesPageAll || {};

/**
 * @instance DatesPageAll
 * @param {string} userID. Id of the user
 * @description the modul <code>DatesPageAll</code> shows all dates of a horse by requesting
 * them from the database and showing them to the user
 */

DatesPageAll = function(userID){

	"user strict";

	const BURGER_CLICK_BOX_ID = "burger",
		BURGER_LIST_ID = "burgerListAllDates",
		inVisibleClass = "",
		visibleClass = "",
		BURGER_OPTION_START = "burgerOptionAllDatesStart",
		BURGER_OPTION_PROFILE = "burgerOptionAllDatesProfile",
		BURGER_OPTION_HELP = "burgerOptionAllDatesHelp",
		BURGER_OPTION_LOGOUT = "burgerOptionAllDatesLogout";
		DATE_TEMPLATE_ID= "ulElementTemplate",
		DELETE_BUTTON_CLASS = "singleDateDelete",
		CHANGE_BUTTON_CLASS = "singleDateChange";	

	let that = new EventTarget(),
		dropList,
		dbInterface,
		model,
		hamburgerMenu,
		controlls,
		ulDomElementId = "allDates",
		elementTemplateString,
		elementTagId = "dateId",
		horseID;

	/**
	* @function init
	* @public
	* @memberof! DatesPageAll
	* @instance
	* @param {string} newHorseID
	* @description Initialize this modul. starts the database request for the dates.
	*/
	function init(newHorseID){
		horseID = newHorseID;
		elementTemplateString = document.getElementById(DATE_TEMPLATE_ID).innerHTML;
		initDBInterface();	
		initControlls();	
		requestDatesFromDB();	
		initHamburgerMenu();	
	}

	/**
	* @function initDBInterface
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @param {string} newHorseID
	* @description Initialize dbInterface
	*/
	function initDBInterface(){
		dbInterface = DatesPageAll.DBRequester(userID,horseID);
		dbInterface.init();
		dbInterface.addEventListener("onResult", handleDBResult);
	}

	/**
	* @function requestDatesFromDB
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description starts a database request to get the dates of the horse
	*/
	function requestDatesFromDB(){
		dbInterface.requestDatesFromDB();
	}

	/**
	* @function handleDBResult
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @param {event} event
	* @description inits the model with the results of the databse request
	*/
	function handleDBResult(event){
		let allDatesAsStrings = event.details.allDates;		
		initModel(allDatesAsStrings);		
	}

	/**
	* @function initModel
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @param {string} allDatesAsStrings
	* @description inits the model with the dates as a string
	*/
	function initModel(allDatesAsStrings){
		model = new DatesPageAll.DatesPageModel();
		model.addEventListener("onDataConverted", handleOnDataConverted);
		model.init(allDatesAsStrings);	
	}

	/**
	* @function handleOnDataConverted
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @param {event} event, contains the dates
	* @description inits the droplist with the dates of the event
	* the dates are now objects and not a string because the model converted them
	*/
	function handleOnDataConverted(event){
		let convertedDates = event.details.allDates;
		initDropList(convertedDates);
	}

	/**
	* @function initDropList
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @param {Object} listElementsData, contains the data in this modul data  are dates of the horse
	* @description inits the droplist with the data of listElementsData
	*/
	function initDropList(listElementsData){
		dropList = DropList(ulDomElementId, listElementsData, elementTemplateString, elementTagId);
		dropList.init();
		addDropListListeners();
		controlls.initListControlls();
	}

	/**
	* @function addDropListListeners
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description adds listener to the droplist to receive an event if the
	* order of the elements in the dropLIst have changed it calls then hadnleNewOrder
	*/
	function addDropListListeners(){
		dropList.addEventListener("onNewOrder", handleNewOrder);
	}

	/**
	* @function handleNewOrder
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description updates the model if the order of the dropList has changed
	*/
	function handleNewOrder(){
		let newOrder = dropList.getElements();
		model.updateData(newOrder);
	}

	/**
	* @function initControlls
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description inits the viewcontroll modul DatesPageAll.DatesPageControll
	* which controlls three buttons
	*/
	function initControlls(){
		let regularDatesButton = document.getElementById("manageRegularDates"),
			singleDatesButton = document.getElementById("manageSingleDates"),
		domElements = {
			regularDatesButton: regularDatesButton,
			singleDatesButton: singleDatesButton,
		}
		controlls = DatesPageAll.DatesPageControll(domElements,  DELETE_BUTTON_CLASS, CHANGE_BUTTON_CLASS);
		controlls.init();
		addControllListeners();
	}

	/**
	* @function addControllListeners
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description adds listener to the instance of DatesPageAll.DatesPageControll
	*/
	function addControllListeners(){
		controlls.addEventListener("onRegularClicked", handleRegularClick);
		controlls.addEventListener("onSingleClicked", handleSingleClick);
		controlls.addEventListener("onChangeClick", handleChangeClick);
		controlls.addEventListener("onDeleteClick", handleDeleteClick);
	}

	/**
	* @function handleRegularClick
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description sends an event of the type "showRegularDates"
	*/
	function handleRegularClick(){
		updateList();
		closePage();
		sendEvent("showRegularDates");		
	}

	/**
	* @function handleSingleClick
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description sends an event of the type "showCreateSingleDate"
	*/
	function handleSingleClick(){
		sendEvent("showCreateSingleDate");
	}

	function updateList(){
		if(dropList){
			let elements = dropList.getElements(),
			allDates;
			model.updateDates(elements);
			allDates = model.getDatesData();
			dbInterface.updateAllDates(allDates);
		}		
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
		closePage();
		updateList();
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
		closePage();
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
	function sendEvent(type){
		let event = new Event(type);
		event.details = {};
		event.details.horseID = horseID;
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
		closePage();
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
		closePage();		
		sendEvent("logoutUser","");
	}

	function closePage(){
		updateList();
		dbInterface.stoppListening();
	}

	/**
	* @function handleDeleteClick
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description shows the popup to as the user if he wants to delte
	* the date and saves the id of the date in the model
	*/
	function handleDeleteClick(event){
		let id = event.details.id;
		dbInterface.deleteDate(id);
	}

	/**
	* @function handleChangeClick
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description Sends an event that he user wants to change the date
	* an send the attributes of the date with the event
	*/ 
	function handleChangeClick(event){
		let id = event.details.id,
			attributes = model.getDateAttributesById(id);
		sendChangeEvent(attributes);
	}

	function sendChangeEvent(attributes){
		let event = new Event("onChangeDate");
		if(attributes){
			event.details = {}
			event.details.attributes = attributes;
		}
		that.dispatchEvent(event);
	}

	that.init = init;
	return that;
}