var DatesChangerPageSingle = DatesChangerPageSingle || {};

/**
 * @instance DatesChangerPageSingle
 * @description Modul <code>DatesChangerPageSingle</code> is used to change a Single Dates
 * @param {string} userID. Id of the user
 * @description receives new attributes at inititalisation. Those attributes are shown to
 * the user in a view so he can change them.
 */

DatesChangerPageSingle = function(userID){
	const DATE = {
		date: "2018-08-02",
		location:"222",
		time:"11:11",
		title:"11",
	},
	REMINDER = {
		date: "2018-08-02",
		time:"22:22",
	},
	DEFAULT_DATA = {DATE, REMINDER};

	let that = new EventTarget(),
		standardPage,
		horseID;

	/**
	* @function init
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @param {object} attributes
	* @description Initialize this modul.
	*/	
	function init(attributes){
		initModuls(attributes);
		addAttributesAndInitPage(attributes);
		addListeners();
		dbInterface.init();		
	}


	/**
	* @function initModuls
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @description creats the instances of the modles of this modul.
	*/	
	function initModuls(attributes) {
		horseID = attributes.horseID;
		standardPage = new SingleDatesCreatorPage.Standard(userID,horseID);
		dbInterface = new DatesChangerPage.DBRequester(userID, horseID);
		model = new DatesChangerPage.Model();
	}

	/**
	* @function addAttributesAndInitPage
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @param {object} attributes
	* @description inits modul with attributes
	*/	
	function addAttributesAndInitPage(attributes) {
		if(!attributes){
			attributes = DEFAULT_DATA;
		}
		if(standardPage){
			standardPage.init();	
			model.init(attributes);
			addAttributesAndUpdateCreator(attributes);					
		}
	}

	/**
	* @function addAttributesAndUpdateCreator
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @param {object} attributes
	* @description updates the creator with attributes
	* so the creator has those attributes and can show them to the user
	*/
	function addAttributesAndUpdateCreator(attributes){
		let newDate = attributes.date,
			reminder = attributes.reminder;
		standardPage.updateCreator(newDate, reminder);
	}

	/**
	* @function addListeners
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @description addListeners to the standaraPage
	* the standardPage tells this modul if the user saved new values
	* or if he want to cancel the creation of the entity
	*/
	function addListeners() {
		standardPage.addEventListener("onSave", handleSave);
		standardPage.addEventListener("onCancel", handleCancel);
	}

	/**
	* @function handleSave
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @param {event} event, contains the changed date
	* @description prepares changed date so it can be safed into the database
	* after that it saved the changed date
	*/
	function handleSave(event) {
		console.log("handleSave");
		let updatedDate = prepareDataForDBRequest(event);
		saveDateIntoDB(updatedDate);
		sendEvent("onDataSaved");
	}

	/**
	* @function prepareDataForDBRequest
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @param {event} event, contains the changed date
	* @description prepares changed date so it can be safed into the database
	*/
	function prepareDataForDBRequest(event){
		let data = event.details.data,
			changedDate = data.date,
			updatedDate;
		model.updateDate(changedDate);
		updatedDate = model.getDate();
		data.date = updatedDate;
		return data;
	}

	/**
	* @function saveDateIntoDB
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @param {object} changedDate, date which is updated in the database
	* @description saves the date in the database
	*/
	function saveDateIntoDB(changedDate) {
		dbInterface.saveDateIntoDB(changedDate);
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @param {string} type,type of event
	* @description sends event of type "type"
	*/
	function sendEvent(type) {
		let event = new Event(type);
		event.details = {};
		event.details.horseID = horseID;
		that.dispatchEvent(event);
	}

	/**
	* @function handleCancel
	* @public
	* @memberof! DatesChangerPageSingle
	* @instance
	* @description sends event of type "onCancel"
	* to signal other moduls that the user doesnt want to save the changes in the databse
	*/
	function handleCancel() {
		sendEvent("onCancel");
	}

	that.init = init;
	return that;
}