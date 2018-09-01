var SingleDatesCreatorPage = SingleDatesCreatorPage || {};

/**
 * @instance SingleDatesCreatorPage.Standard
 * @memberof! SingleDatesCreatorPage 
 * @param {string} userID. Id of the user
 * @description Modul <code>SingleDatesCreatorPage.Standard</code> is a page to create a single date.
 * This standardpage contains allready the correct parameters for the SingleDatesCreator
 * This standardpage is used in SingleDatesCreatorPage and DatesChangerPageSingle for a cleaner code.
 */

SingleDatesCreatorPage.Standard = function(userID){
	const DATE_CLASS = "", 
		REMINDER_CLASS = "reminderSingleDate", 
		CONTAINER_ELEMENT_ID = "dateCreater",
		TITLE_INPUT_ID = "dateTitleInput",
		DATE_INPUT_ID = "dateDateInput",
		TIME_INPUT_ID = "dateTimeInput",
		LOCATION_INPUT_ID = "dateLocationInput",
		CHECKBOX_ID = "dateCreaterCheckbox",
		DATE_BUTTON_ID = "dateCreaterDateButton",
		REMINDER_BUTTON_ID = "dateCreaterReminderButton",
		SAVE_BUTTON_ID = "dateCreaterSaveButton",
		CANCLE_BUTTON_ID = "dateCreaterCancelButton";

	let that = new EventTarget(),
		dbInterface,
		datesCreator;
	
	/**
	* @function init
	* @public
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {string} newHorseID
	* @description Initialize this modul.
	*/
	function init() {
		console.log("initStan");
		initSingleDatesCreator();
		addListeners();
	}

	/**
	* @function initSingleDatesCreator
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @description Initialize the datesCreator
	*/
	function initSingleDatesCreator() {
			datesCreator = new SingleDatesCreator(DATE_CLASS, REMINDER_CLASS, CONTAINER_ELEMENT_ID, TITLE_INPUT_ID, 
	DATE_INPUT_ID, TIME_INPUT_ID, LOCATION_INPUT_ID, CHECKBOX_ID, 
	DATE_BUTTON_ID, REMINDER_BUTTON_ID,
	SAVE_BUTTON_ID, CANCLE_BUTTON_ID);
			datesCreator.init();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @description adds event listener to datesCreator
	*/
	function addListeners() {
		datesCreator.addEventListener("onSave", handleSave);
		datesCreator.addEventListener("onCancel", handleCancel);
	}

	/**
	* @function handleSave
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {event} event
	* @description sends the data of the event to other moduls
	*/
	function handleSave(event) {
		let data = event.details.data;
		data = prepareData(data);
		sendEvent("onSave", data);
	}

	function prepareData(data){
		let noValue = "0";
		data.valueRegular = noValue;
		data.unitRegular =  noValue;
		return data;
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {string} type,type of event
	* @param {object} data, data to send
	* @description sends event of type "type" and data
	*/
	function sendEvent(type, data) {
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.data = data;
		}
		that.dispatchEvent(event);
	}

	/**
	* @function handleCancel
	* @private
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {string}, type
	* @description sends event of type "onCancel" to inform other moduls
	* that the user wants to cancel the creation of the date
	*/
	function handleCancel() {
		console.log("handleCancel 2");
		sendEvent("onCancel");
	}

	/**
	* @function updateCreater
	* @public
	* @memberof! SingleDatesCreatorPage
	* @instance
	* @param {object}, newDate
	* @param {object}, newReminder
	* @description updates the creator in regularDatesCreater
	* this function is useful to use the standaradpage as a datechanger
	*/
	function updateCreator(newDate, newReminder) {
		datesCreator.updateCreator(newDate, newReminder);
	}

	that.updateCreator = updateCreator;
	that.init = init;
	return that;
}