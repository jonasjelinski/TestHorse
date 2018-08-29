var UserProfileSaver = UserProfileSaver || {};

/** 
 * namespace DBRequester
 * @memberof! UserProfileSaver
 * @description <code>UserProfileSaver.DBRequester</code> 
 * is used to save a user into the database.
 */

UserProfileSaver.DBRequester = function(){

	let that = new EventTarget();

	/**
	* @function init
	* @public
	* @memberof!  UserProfileSaver.DBRequester
	* @instance
	* @description Initialize this model
	*/ 
	function init(){
		initRequester();
	}


	/**
	* @function initRequester
	* @private
	* @memberof!  UserProfileSaver.DBRequester
	* @instance
	* @description inits the database requester
	*/ 
	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	/**
	* @function handleResult
	* @private
	* @memberof! UserProfileSaver.DBRequester
	* @instance
	* @param {event} event, contains the result of the db request
	* @description handles the result of the db request
	*/
	function handleResult(event){
		let data = event.details.data;
    }


	/**
	* @function saveHorseIntoDB
	* @public
	* @memberof! UserProfileSaver.DBRequester
	* @instance
	* @description saves the user into the database.
	* if it is an old user which is allready in the database
	* another request has to be called to the databse,
	* therefore this function distincts between this two cases.
	*/
	function saveUserIntoDB(isNewUser, user)
	{	let hadCorrectParameter ={};
		user.userID = user.id;
		if(isNewUser){
			hadCorrectParameter = requester.setUserIntoDB(user);
		}
		else{
			hadCorrectParameter = requester.updateUser(user);
		}		
		handleParameterFeedBack(hadCorrectParameter, user);
	}

	/**
	* @function handleParameterFeedBack
	* @private
	* @memberof! UserProfileSaver.DBRequester
	* @instance
	* @param {bool} hadCorrectParameter
	* @description gives a feedback if the object given to the requester had the correct properties
	*/
	function handleParameterFeedBack(hadCorrectParameter, user){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", user);
		}
	}
	
	that.init = init;
	that.saveUserIntoDB = saveUserIntoDB;
	return that;
}