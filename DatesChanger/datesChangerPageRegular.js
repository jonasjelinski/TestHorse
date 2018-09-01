var DatesChangerPageRegular = DatesChangerPageRegular || {};

/**
 * @instance DatesChangerPageRegular
 * @description Modul <code>DatesChangerPageRegular</code> is used to change a regulat date
 * @param {string} userID. Id of the user
 * @description receives new attributes at inititalisation. Those attributes are shown to
 * the user in a view so he can change them.
 */

DatesChangerPageRegular = function(userID){

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
	DEFAULT_DATA = {DATE, REMINDER, unit:"Woche", durationValue: "7"};

	let that = new EventTarget(),
		dbInterface,
		standardPage,
		model,
		horseID;

	/**
	* @function init
	* @public
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {object} attributes
	* @description Initialize this modul.
	*/
	function init(attributes){
		horseID = attributes.horseID;
		initModuls(horseID, attributes);		
		addAttributesAndInitPage(attributes);
		addListeners();		
	}

	/**
	* @function initModuls
	* @public
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description creats the instances of the modles of this modul.
	*/
	function initModuls(horseID, attributes){
		let dateId = attributes.date.id;
		standardPage = new RegulardatesCreatorPage.Standard(userID);
		if(isNewDateSuggestion(attributes)){
			dbInterface = new  RegulardatesCreatorPage.DBRequester(userID, horseID);
		}
		else{
			dbInterface = new DatesChangerPage.DBRequester(userID, horseID);
		}
		model = new DatesChangerPage.Model();
	}

	function isNewDateSuggestion(attributes){
		return attributes.isDateSuggestion;
	}

	/**
	* @function addAttributesAndInitPage
	* @public
	* @memberof! DatesChangerPageRegular
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
			addAttributes(attributes);					
		}
	}

	/**
	* @function addAttributesAndUpdateCreator
	* @public
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {object} attributes
	* @description updates the creator with attributes
	* so the creator has those attributes and can show them to the user
	*/
	function addAttributes(attributes){
		console.log("attributes", attributes);
		let newDate = attributes.date,	//atrributes besitzt noch keinen reminder und duration value unit
				reminder = attributes.reminder,
				newDurationValue = newDate.valueRegular,
				newDurationUnit = newDate.unitRegular;				
			standardPage.updateCreator(newDate, reminder, newDurationValue, newDurationUnit);
	}

	/**
	* @function addListeners
	* @public
	* @memberof! DatesChangerPageRegular
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
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {event} event, contains the changed date
	* @description prepares changed date so it can be safed into the database
	* after that it saved the changed date
	*/
	function handleSave(event) {
		let updatedData = prepareDataForDBRequest(event);	
		saveDateIntoDB(updatedData);
		sendEvent("onDataSaved");
	}

	/**
	* @function prepareDataForDBRequest
	* @public
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {event} event, contains the changed date
	* @description prepares changed date so it can be safed into the database
	*/
	function prepareDataForDBRequest(event){
		let data = event.details.data,
			changedDate = data.date,
			updatedDate;
		console.log("prepareDataForDBRequest data", JSON.stringify(data));
		console.log("prepareDataForDBRequest changedDate", JSON.stringify(changedDate));
		model.updateDate(changedDate);
		updatedDate = model.getDate();		
		console.log("prepareDataForDBRequest", JSON.stringify(updatedDate));
		data.date = updatedDate;
		return data;
	}

	/**
	* @function saveDateIntoDB
	* @public
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {object} changedDate, date which is updated in the database
	* @description saves the date in the database
	*/
	function saveDateIntoDB(updatedData) {
		dbInterface.saveDateIntoDB(updatedData);
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! DatesChangerPageRegular
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
	* @memberof! DatesChangerPageRegular
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