var UserProfilPage = UserProfilPage || {};

/** 
 * namespace HorseProfilePage.Model 
 * @memberof! UserProfilPage
 * @description contains the attributes of userProfil
 * converts the data from the database request so it can be used by templates
 */

UserProfilPage.Model = function(userId){
	let that = new EventTarget(),	
		userData,
		delteId;

	/**
	* @function init
	* @public
	* @memberof! UserProfilPage
	* @instance
	* @param {string} userDataAsStrings, data of the user as a string
	* @description Initialize this model. converts the data from a string to an object and send an event
	*/ 	
	function init(userDataAsStrings){
		let userDataAsArray = [];
		if(isParsableString(userDataAsStrings)){
			JSON.parse(userDataAsStrings);
			userData = userDataAsArray[0];
			changePropertyNames(userData);
			sendOnDataConverted();  
		}   			 			
	}

	/**
	* @function isParsableString
	* @public
	* @memberof! UserProfilPage
	* @instance
	* @param {string} userDataAsStrings, data of the user as a string
	* @description retruns false if not parsable else true
	*/
	function isParsableString(userDataAsStrings) {
	    try {
	        JSON.parse(userDataAsStrings);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

	/**
	* @function changePropertyNames
	* @public
	* @memberof! UserProfilPage
	* @instance
	* @param {object} userData, data of the user as a object
	* @description deletes the proeprty date_of_birth and saves its value in property dateOfBirth
	*/
	function changePropertyNames(userData){
		userData.dateOfBirth = userData.date_of_birth
		delete userData.date_of_birth;
	}

	/**
	* @function sendOnDataConverted
	* @public
	* @memberof! UserProfilPage
	* @instance
	* @description dispatches event of type "onDataConverted"
	*/
	function sendOnDataConverted(){
		let event = new Event("onDataConverted");
		event.details = {};
		event.details.userData = userData;
		that.dispatchEvent(event);
	}
	

	/**
	* @function getUserId
	* @public
	* @memberof! UserProfilPage
	* @instance
	* @description returns userID
	*/
	function getUserId(){
		return userData.id;
	}	
	
	that.init = init;
	that.getUserId = getUserId;
	return that;
}
