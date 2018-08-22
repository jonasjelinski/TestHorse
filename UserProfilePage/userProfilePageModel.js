var UserProfilPage = UserProfilPage || {};

UserProfilPage.Model = function(userId){
	let that = new EventTarget(),	
		userData,
		delteId;

	/**
	* @function init
	* @public
	* @memberof! RegularDatesPage.RegularDatesPageModel 
	* @instance
	* @description Initialize this model. Inits the dbRequester and its listeners. Starts a request for the user data
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

	function isParsableString(userDataAsStrings) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

	function changePropertyNames(userData){
		userData.dateOfBirth = userData.date_of_birth
		delete userData.date_of_birth;
	}

	function sendOnDataConverted(){
		let event = new Event("onDataConverted");
		event.details = {};
		event.details.userData = userData;
		that.dispatchEvent(event);
	}

	function setDelteId(id){
		delteId = id;
	}

	function getDeleteId(){
		return delteId;
	}

	function updateData(newOrder){
		console.log("newOrder", newOrder);
	}

	function getDateAttributesById(){

	}		
	
	that.init = init;
	that.setDelteId = setDelteId;
	that.getDeleteId = getDeleteId;
	that.updateData = updateData;
	that.getDateAttributesById = getDateAttributesById;
	return that;
}
