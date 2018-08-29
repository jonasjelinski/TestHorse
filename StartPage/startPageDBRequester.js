var StartPage = StartPage || {};

/**
 * @namespace DBRequester
 * @memberof! StartPage
 * @description 
 * @param {string} userID. Id of the user
 * @description Modul <code>StartPage.DBRequester</code> is used to get the horses of the user 
 * with the id userID from the database
 */

StartPage.DBRequester = function(userID){
	let that = new EventTarget(),
		isUpdating;


	/**
	* @function init
	* @public
	* @memberof! StartPage  
	* @instance
	* @description inits this modul. The Request modul makes the AJAX requests.
	*/ 	
	function init() {
		initRequester();
		addEventListeners();
		isUpdating = false;
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
	* @memberof! StartPage.DBRequester
	* @instance
	* @description calls handleResult if the requester sends an event of type "onResult"
	*/
	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	/**
	* @function handleResult
	* @private
	* @memberof! StartPage.DBRequester
	* @instance
	* @param {event} event, contains the result of the db request (all dates of the horse)
	* @description sends the result of the db request to other moduls
	*/
	function handleResult(event){		
		let results = event.details.result;
		if(!isUpdating){
			sendEvent("onResult", results);
		}
		else{
			console.log("handleResult",results);
		}		
		
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! StartPage.DBRequester
	* @instance
	* @param {string} type,type of event
	* @param {object} data, data to send
	* @description sends event of type "type" and data
	*/
	function sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.allHorses = data;
		that.dispatchEvent(event);
	}

	/**
	* @function requestAllHorsesFromDB
	* @public
	* @memberof! StartPage.DBRequester
	* @instance
	* @param {string}, id , id of the date, that has to be deleted
	* @description request to get all horses from the user with the id userID
	*/
	function requestAllHorsesFromDB(){
		requester.getAllHorsesOfUser(userID);
	}

	function updateAllHorses(allHorses){
		isUpdating = true;
		for(let i = 0; i < allHorses.length; i++){
			let horse = allHorses[i];
			horse.horseID = horse.id;
			requester.updateHorse(horse);
		}					
			
	}	

	that.init = init;
	that.requestAllHorsesFromDB = requestAllHorsesFromDB;
	that.updateAllHorses = updateAllHorses;
	return that;
}