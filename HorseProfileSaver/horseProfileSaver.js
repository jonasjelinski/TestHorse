var HorseProfileSaver = HorseProfileSaver || {};

/** 
 * namespace HorseProfileSaver
 * @memberof! HorseProfileSaver
 * @param {string}, userID id of the user
 * @description <code>HorseProfileSaver</code> shows the profile of a horse to the user
 * and allows him to save it into the database. It is used after the user either created
 * a new horse with <code>HorseCreatorPage</code> or updated an old horse with <code>HorseProfileChanger</code>.
 * The use can cancel the saving, if he wants.
 */
HorseProfileSaver = function(userID){
	"user strict";
	const 
	HORSE_ID = ""
	PAGE_ID = "horseProfileSaver",
	TEMPLATE_ID = "horseProfileTemplate";

	let that = new EventTarget(),
		profil = {},
		dbInterface,
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
		initPofil();
		initDBRequester();
		addListeners();			
	}

	/**
	* @function initPofil
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description Initialize <code>profil</code> an instance of Profil
	*/ 
	function initPofil(){
		profil = new Profil(PAGE_ID, TEMPLATE_ID, HorseProfileSaver.ViewControll);
		profil.init(attributes);		
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
		dbInterface.saveHorseIntoDB();
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

	/**
	* @function setDBInterfaceToUpdate
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description sets the dbInterface to update, so the dbInterface knows
	* that it has to update and old horse and not saving a new one
	*/
	function setDBInterfaceToUpdate(){
		dbInterface.setUpdateHorse();
	}

	/**
	* @function setDBInterfaceToNew
	* @private
	* @memberof! HorseProfileSaver
	* @instance
	* @description sets the dbInterface to new, so the dbInterface knows
	* it has to save a new one horse  and not update an old one
	*/
	function setDBInterfaceToNew(){
		dbInterface.setNewHorse();
	}

	that.createNewHorse = setDBInterfaceToNew;
	that.updateOldHorse = setDBInterfaceToUpdate;
	that.init = init;
	return that;
} 