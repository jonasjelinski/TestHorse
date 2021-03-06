var HorseProfileSaver = HorseProfileSaver || {};

/** 
 * namespace DBRequester
 * @memberof! HorseProfileSaver
 * @param {string}, userID id of the user
 * @description <code>HorseProfilePage.DBRequester</code> 
 * is used to save a horse into the database.
 */
 HorseProfileSaver.DBRequester = function(userID){
	let that = new EventTarget(),
		isNewHorse,
		newHorse;

	/**
	* @function init
	* @public
	* @memberof!  HorseProfileSaver.DBRequester 
	* @instance
	* @param {object}, horse, horse which will be saved into the database
	* @description Initialize this model
	*/ 
	function init() {
		initRequester();
	}
	
	/**
	* @function initRequester
	* @private
	* @memberof!  HorseProfileSaver.DBRequester 
	* @instance
	* @description inits the database requester
	*/ 
	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.addEventListener("onResult", handleResult);
		requester.init();
	}

	/**
	* @function handleResult
	* @private
	* @memberof! HorseProfileSaver.DBRequester 
	* @instance
	* @param {event} event, contains the result of the db request
	* @description handles the result of the db request
	*/
	function handleResult(event){
		let result = event.details.result,
			horseID;			
		if(isNewHorse){
			horseID = result;
			sendOnNewHorseCreated(horseID);						
		}
		else{
			sendOnHorseUpdated();
		}		
	}

	function sendOnNewHorseCreated(horseID){
		let event = new Event("onNewHorseCreated");
		event.details = {};
		event.details.horseID = horseID;
		that.dispatchEvent(event);
	}

	function sendOnHorseUpdated(){
		let event = new Event("onNewHorseUpdated");
		that.dispatchEvent(event);
	}

	/**
	* @function saveHorseIntoDB
	* @public
	* @memberof! HorseProfileSaver.DBRequester 
	* @instance
	* @description saves the horse into the database.
	* if it is an old horse which is allready in the database
	* another request has to be called to the databse,
	* therefore this function distincts between this two cases.
	*/
	function saveHorseIntoDB(isNew, newHorse){
		let hadCorrectParameter = {};
			isNewHorse = isNew;
		
		if(isNewHorse){
			delete newHorse.photo;
			hadCorrectParameter = requester.setHorseIntoDB(newHorse);
		}
		else{
			newHorse.horseID = newHorse.id;					
			hadCorrectParameter = requester.updateHorse(newHorse);
		}
		handleParameterFeedBack(hadCorrectParameter);
	}

	/**
	* @function handleParameterFeedBack
	* @private
	* @memberof! HorseProfileSaver.DBRequester 
	* @instance
	* @param {bool} hadCorrectParameter
	* @description gives a feedback if the object given to the requester had the correct properties
	*/
	function handleParameterFeedBack(hadCorrectParameter){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", newHorse);
		}
	}

	

	that.init = init;
	that.saveHorseIntoDB = saveHorseIntoDB;
	return that;
}