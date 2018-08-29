var HorseProfileSaver = HorseProfileSaver || {};

/** 
 * namespace HorseProfileSaver
 * @memberof! HorseProfileSaver
 * @param {string}, userID id of the user
 * @description <code>HorseProfileSaver</code> shows the profile of a horse to the user
 * and allows him to save it into the database. It is used after the user either created
 * a new horse with <code>HorseCreatorPage</code> or updated an old horse with <code>HorseProfileChanger</code>.
 * The user can cancel the saving, if he wants.
 */
HorseProfileSaver = function(userID){
	"user strict";
	const 
	HORSE_ID = ""
	PAGE_ID = "horseProfileSaver",
	TEMPLATE_ID = "horseProfileTemplate",
	CHANGE_BUTTON_ID = "horseSaverChange",
	OKAY_BUTTON_ID = "horseSaverOk",
	DELETE_BUTTON_ID = "horseSaverDelete";	

	let that = new EventTarget(),
		profil = {},
		potraitView,
		dbInterface,
		horsePhotoUploader,
		attributes;


	/**
	* @function init
	* @public
	* @memberof! HorseProfileSaver
	* @instance
	* @param {newAttributes}, newAttributes, attributes of the horse
	* @description Initialize this model
	*/ 
	function init(newAttributes){	
		attributes = newAttributes;
		initProfil();
		initPotraitView();
		initDBRequester();
		initHorsePhotoUploader();
		initModel();
		addListeners();				
	}

	/**
	* @function initPofil
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description Initialize <code>profil</code> an instance of Profil
	*/ 
	function initProfil(){
		profil = new Profil(PAGE_ID, TEMPLATE_ID, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
		profil.init(attributes);		
	}

	function initPotraitView(){
		potraitView = new HorseProfileSaver.PotraitView("horseProfileSaverImgContainer");
		potraitView.init();
	}
	

	/**
	* @function initPofil
	* @private
	* @memberof! HorseProfileSaver
	* @initModel
	* @description Initialize the db requester <code>dbInterface</code>
	*/ 
	function initDBRequester(){
		dbInterface = new HorseProfileSaver.DBRequester(userID);
		dbInterface.init(attributes);
		
	}

	function initHorsePhotoUploader(){
		horsePhotoUploader = new HorsePhotoUploader();
		horsePhotoUploader.init();
	}

	

	/**
	* @function initModel
	* @private
	* @memberof! HorseProfileSaver
	* @initModel
	* @description Initialize the model
	*/ 
	function initModel(){
		model = new HorseProfileSaver.Model(userID);
		model.init(attributes);
	}




	/**
	* @function initPofil
	* @private
	* @memberof! HorseProfileSaver  
	* @instance
	* @description adds eventListener to the profile, if the user wants to change,
	* save or delte the horse.
	*/
	function addListeners(){
		profil.addEventListener("onChangeProfile", handleChangeProfile);
		profil.addEventListener("onProfileOkay", handleOkayProfile);
		profil.addEventListener("onDeleteProfile", handleDeleteProfile);
		dbInterface.addEventListener("onNewHorseCreated", handleOnNewHorseCreated);
		dbInterface.addEventListener("onNewHorseUpdated", handleOnHorseUpdated);
		model.addEventListener("onUploadPhotos", handlePhotoUpload);	
		potraitView.addEventListener("onNewPhoto", handleNewPhoto);
	}

	/**
	* @function handleChangeProfile
	* @private
	* @memberof! HorseProfileSaver  
	* @instance
	* @description sends an event of type "onChangeHorseProfile"
	* and the attributes of the horse so <code>HorseProfileChanger</code>.
	* can change the horse if the user is unsatisfied with the horse,
	* which he wanted to save into the database
	*/
	function handleChangeProfile(){
		sendEvent("onChangeHorseProfile", attributes);
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @param {string} type,type of event
	* @description sends event of type "type" and the attributes of the horse
	*/
	function sendEvent(type, attributes){
		let event = new Event(type);
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
	}

	/**
	* @function handleOkayProfile
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description saves the horse into the database and sends the event "onSaveHorseProfile"
	*/
	function handleOkayProfile(){
		let isNewHorse = model.getIsNewHorse(),
			horseData = model.getHorseData();
		console.log("handleOkayProfile", horseData);
		dbInterface.saveHorseIntoDB(isNewHorse, horseData);
		sendEvent("onSaveHorseProfile");
	}

	/**
	* @function handleDeleteProfile
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description sends the event "onDeleteNewHorseProfile" and cancels the saving process
	*/
	function handleDeleteProfile(){
		sendEvent("onDeleteNewHorseProfile", "");
	}	

	function handleOnNewHorseCreated(event){
		let horseID = event.details.horseID;
		console.log("handleOnNewHorseCreated", horseID);	
		model.handleHorseCreated(horseID);
	}

	function handleOnHorseUpdated(){
		model.handleHorseUpdated();
	}

	function handlePhotoUpload(event){
		let horseID = event.details.horseID,
			photo = event.details.photo;			
			horsePhotoUploader.setHorseID(horseID);
			horsePhotoUploader.uploadNewPhoto(photo);
	}

	function handleNewPhoto(event){
		let photo = event.details.photo;
		model.setPhoto(photo);	
	}

	
	/**
	* @function updateOldHorse
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description sets the model to update, so the model knows
	* that it has to update and old horse and not saving a new one
	*/
	function updateOldHorse(){
		model.setUpdateHorse();
	}

	/**
	* @function createNewHorse
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description sets the model to new, so the model knows
	* it has to save a new horse and not update an old one
	*/
	function createNewHorse(){
		model.setNewHorse();
	}

	that.createNewHorse = createNewHorse;
	that.updateOldHorse = updateOldHorse;
	that.init = init;
	return that;
} 