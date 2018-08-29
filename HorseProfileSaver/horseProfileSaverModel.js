var HorseProfileSaver = HorseProfileSaver || {};

/** 
 * namespace Model
 * @memberof! UserProfileSaver
 * @description <code>UserProfileSaver.Model</code> 
 * is the model of UserProfileSaver
 * it cotnains the userData and if the ProfileSaver
 * displays a new profile or an old one
 */

HorseProfileSaver.Model = function(userID){
	let that = new EventTarget(),
		newHorse,
		photo,
		isNewHorse;

	/**
	* @function init
	* @public
	* @memberof!  HorseProfileSaver.DBRequester 
	* @instance
	* @param {object}, horse, horse which will be saved into the database
	* @description Initialize this model
	*/ 
	function init(horse){
		newHorse = horse;
		addUserId();
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

	/**
	* @function getUserData
	* @public
	* @memberof! HorseProfileSaver.Model 
	* @instance
	* @description return userData
	*/ 
	function getHorseData(){
		return newHorse;
	}

	/**
	* @function getIsNewUser
	* @public
	* @memberof! HorseProfileSaver.Model 
	* @instance
	* @description return isNewUser
	*/
	function getIsNewHorse(){
		return isNewHorse;
	}

	function handleHorseCreated(horseID){
		if(isNewHorse){			
			newHorse.id = horseID;
			sendUploadPhotoEvent();
		}		
	}

	function handleHorseUpdated(){
		sendUploadPhotoEvent();
	}

	function sendUploadPhotoEvent(){
		console.log("sendUploadPhotoEvent", photo);
		if(photo){
			let event = new Event("onUploadPhotos");
			event.details = {};
			event.details.photo = photo;
			event.details.horseID = newHorse.id;
			that.dispatchEvent(event);
		}
	}

	function setPhoto(newPhoto){
		photo = newPhoto;
	}	

	that.init = init;
	that.setUpdateHorse = setUpdateHorse;
	that.setNewHorse = setNewHorse;
	that.getHorseData = getHorseData;
	that.getIsNewHorse = getIsNewHorse;
	that.handleHorseCreated = handleHorseCreated;	
	that.handleHorseUpdated = handleHorseUpdated;	
	that.setPhoto = setPhoto;
	return that;
}