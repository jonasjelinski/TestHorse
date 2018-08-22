var HorseProfilePage = HorseProfilePage || {};

/** 
 * namespace DBRequester
 * @memberof! HorseProfilePage
 * @description <code>HorseProfilePage.DBRequester</code> 
 * is used to delte horses from the database
 */
HorseProfilePage.DBRequester = function(){
	
	let that = {};


	/**
	* @function init
	* @public
	* @memberof! HorseProfilePage.DBRequester  
	* @instance
	* @description Initialize this model
	*/ 
	function init() {
		initRequester();
		addEventListeners();
	}

	/**
	* @function initRequester
	* @public
	* @memberof! HorseProfilePage.DBRequester  
	* @instance
	* @description Initialize this the requester
	*/ 
	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! HorseProfilePage.DBRequester  
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
	* @param {event} event, contains the result of the db request
	* @description handles the result of the db request
	*/
	function handleResult(event) {
		let result = event.details.result;
		console.log("horseDelteResult", result);
	}

	/**
	* @function delteHorseFromDB
	* @private
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @param {string} horseID
	* @description delte the horse with the id "horseID" from the database
	*/
	function delteHorseFromDB(horseID) {
		requester.deleteHorseFromDB(horseID);
	}

	that.init = init;
	that.delteHorseFromDB = delteHorseFromDB;
	return that;
}

	
