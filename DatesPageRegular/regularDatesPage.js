var RegularDatesPage = RegularDatesPage || {};

/**
 * @instance RegularDatesPage
 * @param {string} userID. Id of the user
 * @description the modul <code>RegularDatesPage</code> shows all regulat dates of a horse by requesting
 * them from the database and showing them to the user. The user can delte dates ore change them by clicking
 * the buttons of the date in the user interface.
 */

RegularDatesPage = function(userID){
	"use strict";

	const BURGER_CLICK_BOX_ID = "burger",
		BURGER_LIST_ID = "burgerListRegularDates",
		inVisibleClass = "",
		visibleClass = "",
		BURGER_OPTION_PROFILE = "burgerOptionRegularDatesProfile",
		BURGER_OPTION_HELP = "burgerOptionRegularDatesHelp",
		BURGER_OPTION_START = "burgerOptionRegularDatesStart",
		BURGER_OPTION_LOGOUT = "burgerOptionRegularDatesLogout";

	let that = new EventTarget(),
		regularDatesList,
		dateSuggestionsList,
		dbInterface,
		model,
		controlls,
		datesListId = "allRegularDates",
		suggestionsListId = "regularDatesRecommendation",
		regularDateTemplateString,
		dateSuggestionTemplateString,
		regularTagId = "regularDateId",
		suggestionsTagId = "dateRecommendationId",
		deleteButtonClass = "regularDateDelete",
		changeButtonClass = "regularDateChange",
		backbuttonId= "backToDates",
		newDateButtonId = "createNewDate",
		newSuggestionButtonId = "createNewRecommendation",
		innerListCommunication,
		hamburgerMenu,
		popup,
		changeId,
		horseID;
		

	/**
	* @function init
	* @public
	* @memberof! RegularDatesPage
	* @instance
	* @param {string} newHorseID
	* @description Initialize this modul. starts the database request for the dates.
	*/
	function init(newHorseID){		
		dateSuggestionTemplateString = document.getElementById("TEMPLATE_DATE_RECOMMENDATION").innerHTML;
		setHorseIDAndTemplateString(newHorseID);
		initDBInterface();
		requestDatesFromDB();
		initPopup();
		initControlls();
		initHamburgerMenu();
	}

	/**
	* @function setHorseIDAndTemplateString
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @param {string} newHorseID
	* @description sets the horseId and the templateString
	*/
	function setHorseIDAndTemplateString(newHorseID){
		horseID = newHorseID || 38;
		regularDateTemplateString = document.getElementById("ul-element").innerHTML;
	}

	/**
	* @function initDBInterface
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @param {string} newHorseID
	* @description Initialize dbInterface
	*/
	function initDBInterface(){
		dbInterface = RegularDatesPage.DBRequester(userID,horseID);
		dbInterface.init();
		dbInterface.addEventListener("onResult", handleDBResult);
	}

	/**
	* @function requestDatesFromDB
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description starts a database request to get the dates of the horse
	*/
	function requestDatesFromDB(){
		dbInterface.requestDatesFromDB();
	}


	/**
	* @function handleDBResult
	* @private
	* @memberof! RegularDatesPage
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
	* @memberof! RegularDatesPage
	* @instance
	* @param {string} allDatesAsStrings
	* @description inits the model with the dates as a string
	*/
	function initModel(allDatesAsStrings){
		model = new RegularDatesPage.Model(horseID);
		model.addEventListener("onDataConverted", handleOnDataConverted);
		model.init(allDatesAsStrings);	
	}

	/**
	* @function handleOnDataConverted
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @param {event} event, contains the dates
	* @description inits the regularDatesList with the dates of the event
	* the dates are now objects and not a string because the model converted them
	*/
	function handleOnDataConverted(event){
		let regularDates = event.details.regularDates,
			dateSuggestions = event.details.dateSuggestions;
		initRegularDatesList(regularDates);
		initDatesSuggestionList(dateSuggestions);
		initInterListCommunication();
		addRegularDatesListListeners();
		controlls.initListControlls();
			
	}

	/**
	* @function initRegularDatesList
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @param {Object} listElementsData, contains the data in this modul data  are dates of the horse
	* @description inits the regularDatesList with the data of listElementsData
	*/
	function initRegularDatesList(listElementsData){
		regularDatesList = new DropList(datesListId, listElementsData, regularDateTemplateString, regularTagId);
		regularDatesList.init();
		
	}

	function initDatesSuggestionList(listElementsData){
		dateSuggestionsList = new DropList(suggestionsListId, listElementsData, dateSuggestionTemplateString, suggestionsTagId);
		dateSuggestionsList.init();
	}

	function initInterListCommunication(){
		innerListCommunication = SortableLists(datesListId, suggestionsListId, regularTagId, suggestionsTagId);
		innerListCommunication.init();
		innerListCommunication.addEventListener("onItemReceived", handleOnItemsReceived);
	}

	function handleOnItemsReceived(event){
		let listId = event.details.listID,
			elementID = event.details.elementID;
		console.log("listId",listId,"elementID",elementID);
	}

	/**
	* @function addregularDatesListListeners
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description adds listener to the regularDatesList to receive an event if the
	* order of the elements in the regularDatesList have changed it calls then hadnleNewOrder
	*/
	function addRegularDatesListListeners(){
		regularDatesList.addEventListener("onNewOrder", handleNewOrder);
	}

	/**
	* @function handleNewOrder
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description updates the model if the order of the regularDatesList has changed
	*/
	function handleNewOrder(){
		let newData = regularDatesList.getElements();
		model.updateRegularDates(newData);
	}

	/**
	* @function initControlls
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description inits the viewcontroll modul DatesPageAll.DatesPageControll
	* which controlls three buttons
	*/
	function initControlls(){
		controlls = RegularDatesPage.RegularDatesPageControll(deleteButtonClass, changeButtonClass,backbuttonId, newDateButtonId, newSuggestionButtonId);
		controlls.init();
		addControllListeners();
	}

	/**
	* @function addControllListeners
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description adds listener to the instance of DatesPageAll.DatesPageControll
	*/
	function addControllListeners(){
		controlls.addEventListener("onDeleteClick", handleDeleteClick);
		controlls.addEventListener("onChangeClick", handleChangeClick);
		controlls.addEventListener("onBackButtonClicked", handleBackClick);
		controlls.addEventListener("onNewDate", handleNewDate);
		controlls.addEventListener("onNewSuggestion", handleNewSuggestion);
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
		showPopup();
		let id = event.details.id;
		model.setDelteId(id);
	}

	/**
	* @function showPopup
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description shows the popup to as the user
	*/
	function showPopup() {
		popup.setPopupVisible();
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description Dispatches the event of the type "type" and the data
	*/ 	
	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = data;
		}
		that.dispatchEvent(event);
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
			attributes = model.getDateAttributesById(id),
			data = {
				attributes: attributes,
			}
		sendEvent("onChangeDate", data);
	}

	/**
	* @function handleBackClick
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description Sends an event "showAllDates" that he user wants to see all dates
	*/ 
	function handleBackClick(){
		let id = {
			horseID: horseID,
		};
		updateDatesAndSuggestions();
		sendEvent("showAllDates", id);
	}

	function handleNewDate(){
		sendEvent("showCreateRegularDate");
	}

	function handleNewSuggestion(){
		sendEvent("showCreateDateSuggestion");
	}

	/**
	* @function initPopup
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description inits the popup
	*/ 
	function initPopup(){
		popup = Popup("Wirklich löschen?");
		popup.addEventListener("onYes", handleYes);
		popup.init();
	}

	/**
	* @function handleYes
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description deletes the date from the database with the delteId of the model
	*/ 
	function handleYes(){
		let id = model.getDeleteId();
		dbInterface.deleteDate(id);
	}

	function updateDatesAndSuggestions(){
		let regularDates = regularDatesList.getElements(),
			suggestions = dateSuggestionsList.getElements(),
			allDates;
		model.updateAllDates(regularDates, suggestions);
		allDates = model.getAllDates();
		dbInterface.updateAllDates(allDates);
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
		updateDatesAndSuggestions();
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
		updateDatesAndSuggestions();
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
		updateDatesAndSuggestions();
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
		updateDatesAndSuggestions();
		sendEvent("logoutUser","");
	}

	that.init = init;
	return that;
}