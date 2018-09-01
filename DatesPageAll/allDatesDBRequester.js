var DatesPageAll = DatesPageAll || {};

/**
 * @instance DatesPageAll.DBRequester
 * @description Modul <code>DatesChangerPage.DBRequester</code> is used to change a regulat date
 * @param {string} userID. Id of the user
 * @param {string} horseID. Id of the horse
 * @description this is a simpel datebase requester to receive all dates of the horse wth the id horseID from the database
 */

DatesPageAll.DBRequester = function(userID, horseID){
	
	let that = new EventTarget(),
		isUpdating;

	/**
	* @function init
	* @public
	* @memberof! DatesPageAll
	* @instance
	* @description Initialize this modul.
	*/
	function init() {
		initRequester();
		addEventListeners();
		isUpdating = false;
	}

	/**
	* @function initRequester
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description Initialize the interface for database request
	*/
	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}


	/**
	* @function addEventListeners
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @description calls handleResult if the requester sends an event of type "onResult"
	*/
	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	/**
	* @function handleResult
	* @private
	* @memberof! DatesPageAll
	* @instance
	* @param {event} event, contains the result of the db request (all dates of the horse)
	* @description sends the result of the db request to other moduls
	*/
	function handleResult(event){		
		let results = event.details.result,
			action = event.details.resultAction;
		if(action==="getAllHorseDates"){
			sendEvent("onAllDates", results);
		}
		else if(action === "getReminderNotification"){
			sendEvent("onReminder", results);
		}
		else{
			console.log("handleResult", action);
		}
		
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! DatesPageAll
	* @instance
	* @param {string} type,type of event
	* @param {object} data, data to send
	* @description sends event of type "type" and data
	*/
	function sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.results = data;
		that.dispatchEvent(event);
	}

	/**
	* @function requestDatesFromDB
	* @public
	* @memberof! DatesPageAll
	* @instance
	* @description request all dates of the horse with the id horseID from the database
	*/
	function requestDatesFromDB(){
		requester.getAllDatesOfHorse(horseID);
	}

	function requestReminderFromDB(dateId){
		requester.getSingleReminder(dateId);
	}

	function updateAllDates(allDates){
		isUpdating = true;
		for(let i = 0; i < allDates.length; i++){
			let date = allDates[i];
			date.dateID = date.id;
			requester.updateDate(date);
		}			
	}

	function stoppListening(){
		requester.removeEventListener("onResult", handleResult);
	}

	function deleteDate(id) {
       requester.deleteDateFromDB(id);
    }		

	that.init = init;
	that.requestDatesFromDB = requestDatesFromDB;
	that.requestReminderFromDB = requestReminderFromDB;
	that.updateAllDates = updateAllDates;
	that.stoppListening = stoppListening;
	that.deleteDate = deleteDate;
	return that;
}