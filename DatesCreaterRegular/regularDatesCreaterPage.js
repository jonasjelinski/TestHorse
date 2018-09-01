var RegulardatesCreatorPage = RegulardatesCreatorPage || {};

/**
 * @instance RegulardatesCreatorPage
 * @memberof! RegulardatesCreatorPage 
 * @param {string} userID. Id of the user
 * @description Modul <code>RegulardatesCreatorPage</code> is the page to create a regular date.
 */
RegulardatesCreatorPage = function(userID){

	let that = new EventTarget(),
		standardPage,
		dbInterface,
		datesCreator,
		horseID;

	/**
	* @function init
	* @public
	* @memberof! RegulardatesCreater
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
	* @memberof! RegulardatesCreater
	* @instance
	* @description Initialize this moduls.
	*/
	function initModuls() {
		standardPage = new RegulardatesCreatorPage.Standard(userID);
		standardPage.init();
		dbInterface = new RegulardatesCreatorPage.DBRequester(userID, horseID);
		dbInterface.init();
	}

	/**
	* @function addListeners
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @description calls handleSave if the user wants to save the date and handleCancel if 
	* he wants to cancle the process of creating the date.
	*/
	function addListeners() {
		standardPage.addEventListener("onSave", handleSave);
		standardPage.addEventListener("onCancel", handleCancel);
		dbInterface.addEventListener("onDataSaved", handleDataSaved);
	}

	/**
	* @function handleSave
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {event} event, contains the data of the created singleDate e.g. time of the date
	* @description Reads the data out of the event and saves them in the database, after that
	* it sends an event to inform other pages that the user saved the new created date in the database
	*/
	function handleSave(event) {
		let data = event.details.data;
		console.log("handle save RegulardatesCreatorPage", data);
		//saveDateIntoDB(data);
	}

	/**
	* @function saveDateIntoDB
	* @private
	* @memberof! RegulardatesCreater
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
	* @memberof! RegulardatesCreater
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
	* @memberof! RegulardatesCreater
	* @instance
	* @param {string}, type
	* @description sends event of type "onCancel" to inform other moduls
	* that the user wants to cancel the creation of the date
	*/
	function handleCancel() {
		sendEvent("onCancel");
	}

	function handleDataSaved(){
		sendEvent("onDataSaved");
	}

	that.init = init;
	return that;
}