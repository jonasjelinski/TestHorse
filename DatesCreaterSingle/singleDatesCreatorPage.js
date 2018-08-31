var SingleDatesCreatorPage = SingleDatesCreatorPage || {};

/**
 * @instance SingleDatesCreatorPage
 * @memberof! SingleDatesCreatorPage 
 * @param {string} userID. Id of the user
 * @description Modul <code>RegulardatesCreatorPage</code> is the page to create a single date.
 */
SingleDatesCreatorPage = function(userID){

	let that = new EventTarget(),
		standardPage,
		dbInterface,
		datesCreator,
		horseID;

	/**
	* @function init
	* @public
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {string} newHorseID, id of the horse. the dates are in a relation in the database with the horseID.
	* @description Initialize this modul.
	*/		
	function init(newHorseID) {		
		horseID = newHorseID;
		initModuls();
		addListeners();
	}

	/**
	* @function initModuls
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @description Initialize this moduls.
	*/
	function initModuls() {
		standardPage = new SingleDatesCreatorPage.Standard(userID);
		standardPage.init();
		dbInterface = new SingleDatesCreatorPage.DBRequester(userID, horseID);
		dbInterface.init();
	}

	/**
	* @function addListeners
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @description calls handleSave if the user wants to save the date and handleCancel if 
	* he wants to cancle the process of creating the date.
	*/
	function addListeners() {
		standardPage.addEventListener("onSave", handleSave);
		standardPage.addEventListener("onCancel", handleCancel);
	}

	/**
	* @function handleSave
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {event} event, contains the data of the created singleDate e.g. time of the date
	* @description Reads the data out of the event and saves them in the database, after that
	* it sends an event to inform other pages that the user saved the new created date in the database
	*/
	function handleSave(event) {
		let data = event.details.data;
		saveDateIntoDB(data);
		sendEvent("onDataSaved");
	}

	/**
	* @function saveDateIntoDB
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {object} date, contains the data of the created singleDate e.g. time of the date
	* @description Saves the date in the database, by using "saveDateIntoDB" of the dbInterface
	*/
	function saveDateIntoDB(date) {
		dbInterface.saveDateIntoDB(date);
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {string}, type
	* @description sends event of type "type"
	*/
	function sendEvent(type) {
		let event = new Event(type);
		event.details = {};
		event.details.horseID = horseID;
		that.dispatchEvent(event);
	}


	/**
	* @function handleCancel
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {string}, type
	* @description sends event of type "onCancel" to inform other moduls
	* that the user wants to cancel the creation of the date
	*/
	function handleCancel() {
		sendEvent("onCancel");
	}

	that.init = init;
	return that;
}