var UserProfilPage = UserProfilPage || {};

/** 
 * namespace DBRequester
 * @memberof! UserProfilPage
 * @description <code>HorseProfilePage.DBRequester</code> 
 * is used to delte user  and get the data of the user from the database
 */

UserProfilPage.DBRequester = function(userID){
	let that = new EventTarget(),
		isNewHorse,
		newHorse,
		isDeleting;

	/**
	* @function init
	* @public
	* @memberof! UserProfilPage.DBRequester  
	* @instance
	* @description Initialize this model
	*/ 
	function init(horse) {
		isDeleting = false;
		newHorse = horse;
		initRequester();
		addEventListeners();
	}

	/**
	* @function initRequester
	* @public
	* @memberof! UserProfilPage.DBRequester  
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
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @description adds a listener to the requester if he has the rsult of db request
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
	* @description handles the result of the db request. Sends the results.
	*/
	function handleResult(event){
		if(!isDeleting){
			let results = event.details.result;
			sendEvent("onResult", results);
		}
		else{
			isDeleting == false;
		}		
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @param {string} type, eventtype
	* @param {data} event,  data attached to the event
	* @description sends the data with an event
	*/
	function sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.userData = data;
		that.dispatchEvent(event);
	}

	/**
	* @function requestUserDataFromDB
	* @private
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @description starts a request to get the data from the user
	*/
	function requestUserDataFromDB(){
		requester.getUserData(userID);
	}

	/**
	* @function delteUserFromDB
	* @private
	* @memberof! RegularDatesPage.DBRequester
	* @instance
	* @param {string} userID
	* @description delte the user with the id "userID" from the database
	*/
	function delteUserFromDB(userID) {
		isDeleting = true;
		requester.delteUserFromDB(userID);
	}	

	that.init = init;
	that.requestUserDataFromDB = requestUserDataFromDB;
	that.delteUserFromDB = delteUserFromDB;
	return that;
}
