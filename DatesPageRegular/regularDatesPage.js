var RegularDatesPage = RegularDatesPage || {};

/**
 * @instance RegularDatesPage
 * @param {string} userID. Id of the user
 * @description the modul <code>RegularDatesPage</code> shows all regulat dates of a horse by requesting
 * them from the database and showing them to the user. The user can delte dates ore change them by clicking
 * the buttons of the date in the user interface.
 */

RegularDatesPage = function(userID){
	let that = new EventTarget(),
		dropList,
		dbInterface,
		model,
		controlls,
		ulDomElementId = "allRegularDates",
		elementTemplateString,
		elementTagId = "regularDateId",
		deleteButtonClass = "regularDateDelete",
		changeButtonClass = "regularDateChange",
		backbuttonId= "backToDates",
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
		setHorseIDAndTemplateString(newHorseID);
		initDBInterface();
		requestDatesFromDB();
		initPopup();
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
		elementTemplateString = document.getElementById("ul-element").innerHTML;
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
		model = new RegularDatesPage.Model();
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
	* @memberof! RegularDatesPage
	* @instance
	* @param {Object} listElementsData, contains the data in this modul data  are dates of the horse
	* @description inits the droplist with the data of listElementsData
	*/
	function initDropList(listElementsData){
		dropList = DropList(ulDomElementId, listElementsData, elementTemplateString, elementTagId);
		dropList.init();
		addDropListListeners();
		initControlls();	
	}

	/**
	* @function addDropListListeners
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description adds listener to the droplist to receive an event if the
	* order of the elements in the dropList have changed it calls then hadnleNewOrder
	*/
	function addDropListListeners(){
		dropList.addEventListener("onNewOrder", handleNewOrder);
	}

	/**
	* @function handleNewOrder
	* @private
	* @memberof! RegularDatesPage
	* @instance
	* @description updates the model if the order of the dropList has changed
	*/
	function handleNewOrder(){
		let newData = dropList.getElements();
		model.updateData(newData);
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
		controlls = RegularDatesPage.RegularDatesPageControll(deleteButtonClass, changeButtonClass,backbuttonId);
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
		sendEvent("showAllDates");
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

	that.init = init;
	return that;
}