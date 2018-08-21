var DatesPageAll = DatesPageAll || {};

/**
 * @instance DatesPageAll
 * @param {string} userID. Id of the user
 * @description the modul <code>DatesPageAll</code> shows all dates of a horse by requesting
 * them from the database and showing them to the user
 */

DatesPageAll = function(userID){
	let that = new EventTarget(),
		dropList,
		dbInterface,
		model,
		controlls,
		ulDomElementId = "allDates",
		elementTemplateString,
		elementTagId = "dateId",
		horseID;

	/**
	* @function init
	* @public
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {string} newHorseID
	* @description Initialize this modul. starts the database request for the dates.
	*/
	function init(newHorseID){
		horseID = newHorseID || 38;
		elementTemplateString = document.getElementById("ul-element").innerHTML;
		initDBInterface();
		requestDatesFromDB();
		initControlls();	
	}

	/**
	* @function initDBInterface
	* @private
	* @memberof! DatesChangerPageRegular
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
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description starts a database request to get the dates of the horse
	*/
	function requestDatesFromDB(){
		dbInterface.requestDatesFromDB();
	}

	/**
	* @function handleDBResult
	* @private
	* @memberof! DatesChangerPageRegular
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
	* @memberof! DatesChangerPageRegular
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
	* @memberof! DatesChangerPageRegular
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
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {Object} listElementsData, contains the data in this modul data  are dates of the horse
	* @description inits the droplist with the data of listElementsData
	*/
	function initDropList(listElementsData){
		dropList = DropList(ulDomElementId, listElementsData, elementTemplateString, elementTagId);
		dropList.init();
		addDropListListeners();
	}

	/**
	* @function addDropListListeners
	* @private
	* @memberof! DatesChangerPageRegular
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
	* @memberof! DatesChangerPageRegular
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
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description inits the viewcontroll modul DatesPageAll.DatesPageControll
	* which controlls three buttons
	*/
	function initControlls(){
		let regularDatesButton = document.getElementById("manageRegularDates"),
			singleDatesButton = document.getElementById("manageSingleDates"),
			cancelButton = document.getElementById("cancelDatesPage"),
		domElements = {
			regularDatesButton: regularDatesButton,
			singleDatesButton: singleDatesButton,
			cancelButton : cancelButton,
		}
		controlls = DatesPageAll.DatesPageControll(domElements);
		controlls.init();
		addControllListeners();
	}

	/**
	* @function addControllListeners
	* @private
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description adds listener to the instance of DatesPageAll.DatesPageControll
	*/
	function addControllListeners(){
		controlls.addEventListener("onRegularClicked", handleRegularClick);
		controlls.addEventListener("onSingleClicked", handleSingleClick);
		controlls.addEventListener("onCancelDatesPage", handleCancelClick);
	}

	/**
	* @function handleRegularClick
	* @private
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description sends an event of the type "showRegularDates"
	*/
	function handleRegularClick(){
		sendEvent("showRegularDates");
	}


	/**
	* @function sendEvent
	* @public
	* @memberof! DatesPageAll
	* @instance
	* @param {string} type,type of event
	* @description sends event of type "type" and data
	*/
	function sendEvent(type){
			let event = new Event(type);
			event.details = {};
			event.details.attributes = {};
			event.details.attributes.horseID = horseID;
			that.dispatchEvent(event);
	}

	/**
	* @function handleSingleClick
	* @private
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description sends an event of the type "showCreateSingleDate"
	*/
	function handleSingleClick(){
		sendEvent("showCreateSingleDate");
	}

	/**
	* @function handleCancelClick
	* @private
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description sends an event of the type "onCancel"
	*/
	function handleCancelClick() {
		sendEvent("onCancel");
	}

	that.init = init;
	return that;
}