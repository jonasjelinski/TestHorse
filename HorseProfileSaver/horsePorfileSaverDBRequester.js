var HorseProfileSaver = HorseProfileSaver || {};

/** 
 * namespace HorseProfileSaver
 * @memberof! DBRequester
 * @param {string}, userID id of the user
 * @description <code>HorseProfilePage.DBRequester</code> 
 * is used to save a horse into the database.
 */
 HorseProfileSaver.DBRequester = function(userID){
	let that = {},
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
	function init(horse) {
		newHorse = horse;
		addUserId();
		initRequester();
	}

	/**
	* @function userID
	* @private
	* @memberof!  HorseProfileSaver.DBRequester 
	* @instance
	* @description adds the userID to the horse, because the database
	* needs to know the userID for saving the horse
	*/ 
	function addUserId(){
		newHorse.userID = userID;
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
		let result = event.details.result;
		console.log("horse saver result", result);
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
	function saveHorseIntoDB(){
		let hadCorrectParameter = {};
		if(isNewHorse){
			hadCorrectParameter = requester.setHorseIntoDB(newHorse);
		}
		else{
			newHorse.horseID = newHorse.id;
			newHorse.userID = newHorse.user_id;			
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

	/**
	* @function setUpdateHorse
	* @public
	* @memberof! HorseProfileSaver.DBRequester 
	* @instance
	* @description sets <code>isNewHorse</code> false, so this modul
	* know it has to update an old horse and not save a new horse in the database
	*/
	function setUpdateHorse(){
		isNewHorse = false;
	}

	
	/**
	* @function setNewHorse
	* @public
	* @memberof! HorseProfileSaver.DBRequester 
	* @instance
	* @description sets <code>isNewHorse</code> true, so this modul
	* know it has to save a new horse in the database
	*/
	function setNewHorse(){
		isNewHorse = true;
	}

	that.init = init;
	that.saveHorseIntoDB = saveHorseIntoDB;
	that.setUpdateHorse = setUpdateHorse;
	that.setNewHorse = setNewHorse;
	return that;
}