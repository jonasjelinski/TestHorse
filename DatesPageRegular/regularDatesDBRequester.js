var RegularDatesPage = RegularDatesPage || {};

/**
 * @instance RegularDatesPage.DBRequester
 * @memberof! RegularDatesPage
 * @description Modul <code>RegularDatesPage.DBRequester</code> is used to change a regulat date
 * @param {string} userID. Id of the user
 * @param {string} horseID. Id of the horse
 * @description this is a simpel datebase requester to receive all dates of the horse wth the id horseID from the database
 */
RegularDatesPage.DBRequester = function(userID, horseID){
	
	let that = new EventTarget(),
	isDeletingDate,
	isUpdating;


	/**
	* @function init
	* @public
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @description Initialize this modul.
	*/
	function init() {
		isDeletingDate = false;
		isUpdating = false;
		initRequester();
		addEventListeners();
	}


	/**
	* @function initRequester
	* @private
	* @memberof! RegularDatesPage.DBRequester
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
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @description calls handleResult if the requester sends an event of type "onResult"
	*/
	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	/**
	* @function handleResult
	* @private
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @param {event} event, contains the result of the db request (all dates of the horse)
	* @description sends the result of the db request to other moduls
	*/
	function handleResult(event){
		let action = event.details.resultAction,
			results = event.details.result;
		if(action === "getAllHorseDates" ){			
			sendEvent("onDates", results);		
		}
		else if(action === "getHorse"){
			sendEvent("onHorse", results);
		}
		if(action === "getReminderRegular"){
			sendEvent("onReminder", results);
		}
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! RegularDatesPage.DBRequester
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
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @description request all dates of the horse with the id horseID from the database
	* and sets isDeleting false
	*/
	function requestDatesFromDB(){
		isDeletingDate = false;
		requester.getAllDatesOfHorse(horseID);
	}

	function requestReminderFromDB(dateId){
		requester.getRegularReminder(dateId);
	}

	/**
	* @function requestHorseFromDB
	* @public
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @description request all dates of the horse with the id horseID from the database
	* and sets isDeleting false
	*/
	function requestHorseFromDB(){
		requester.getHorse(horseID);
	}

	/**
	* @function deleteDate
	* @public
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @param {string}, id , id of the date, that has to be deleted
	* @description request to delte the date with id "id"
	* and sets isDeleting true
	*/

	function deleteDate(id) {
		if(id){
			requester.deleteDateFromDB(id);
		}       
    }

    function updateAllDates(allDates){
		isUpdating = true;
		for(let i = 0; i < allDates.length; i++){
			let date = allDates[i];
			date.dateID = date.id;
			requester.updateDate(date);
		}
		isUpdating = false;			
	}

	function stoppListening(){
		requester.removeEventListener("onResult", handleResult);
	}



	that.init = init;
	that.requestDatesFromDB = requestDatesFromDB;
	that.requestHorseFromDB = requestHorseFromDB;
	that.requestReminderFromDB = requestReminderFromDB;
	that.stoppListening = stoppListening;
	that.deleteDate = deleteDate;
	that.updateAllDates = updateAllDates;
	return that;
}