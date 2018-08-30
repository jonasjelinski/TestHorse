var RegulardatesCreatorPage = RegulardatesCreatorPage || {};

/**
 * @instance RegulardatesCreatorPage
 * @memberof! RegulardatesCreatorPage 
 * @param {string} userID. Id of the user
 * @description Modul <code>RegulardatesCreatorPage.Standard</code> is a page to create a regular date.
 * This standardpage contains allready the correct parameters for the RegulardatesCreater
 * and an instance of the RegulardatesCreater.
 * This standardpage is used in RegulardatesCreatorPage and DatesChangerPageRegular for a cleaner code.
 */

RegulardatesCreatorPage.Standard = function(userID){

	const DATE_CLASS = "", 
		REMINDER_CLASS = "", 
		CONTAINER_ELEMENT_ID = "dateCreater",
		TITLE_INPUT_ID = "dateTitleInput",
		DATE_INPUT_ID = "dateDateInput",
		TIME_INPUT_ID = "dateTimeInput",
		LOCATION_INPUT_ID = "dateLocationInput",
		CHECKBOX_ID = "dateCreaterCheckbox",
		DATE_BUTTON_ID = "dateCreaterDateButton",
		REMINDER_BUTTON_ID = "dateCreaterReminderButton",
		SAVE_BUTTON_ID = "dateCreaterSaveButton",
		CANCLE_BUTTON_ID = "dateCreaterCancelButton",
		UNIT_INPUT_ID = "createRegularDate",
		VALUE_INPUT_ID = "regularDatesValue";

	let that = new EventTarget(),
	regularDatesCreater;

	/**
	* @function init
	* @public
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {string} newHorseID
	* @description Initialize this modul.
	*/
	function init(newHorseID){
		initRegularDatesCreator();
		addEventListeners();
	}

	/**
	* @function initRegularDatesCreator
	* @private
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description Initialize the regularDatesCreater
	*/
	function initRegularDatesCreator(){
		regularDatesCreater = new RegulardatesCreater(DATE_CLASS, REMINDER_CLASS, CONTAINER_ELEMENT_ID, TITLE_INPUT_ID, 
	DATE_INPUT_ID, TIME_INPUT_ID, LOCATION_INPUT_ID, CHECKBOX_ID, 
	DATE_BUTTON_ID, REMINDER_BUTTON_ID,
	SAVE_BUTTON_ID, CANCLE_BUTTON_ID, UNIT_INPUT_ID, VALUE_INPUT_ID);
		regularDatesCreater.init();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! DatesChangerPageRegular
	* @instance
	* @description adds event listener to regularDatesCreater
	*/
	function addEventListeners() {
		regularDatesCreater.addEventListener("onSave", handleSave);
		regularDatesCreater.addEventListener("onCancel", handleCancel);
	}

	/**
	* @function handleSave
	* @private
	* @memberof! DatesChangerPageRegular
	* @instance
	* @param {event} event
	* @description sends the data of the event to other moduls
	*/
	function handleSave(event) {
		let data = event.details.data;
		sendEvent("onSave", data);
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! DatesChangerPageRegular
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
	* @memberof! RegulardatesCreater
	* @instance
	* @param {string}, type
	* @description sends event of type "onCancel" to inform other moduls
	* that the user wants to cancel the creation of the date
	*/
	function handleCancel() {
		sendEvent("onCancel");
	}

	/**
	* @function updateCreater
	* @public
	* @memberof! RegulardatesCreater
	* @instance
	* @param {object}, newDate
	* @param {object}, newReminder
	* @param {string}, newDurationValue, e.g. "week"
	* @param {string}, newDurationUnit. e.g.  "2"
	* @description updates the creator in regularDatesCreater
	* this function is useful to use the standaradpage as a datechanger
	*/
	function updateCreater(newDate, newReminder, newDurationValue, newDurationUnit){
		regularDatesCreater.updateCreator(newDate, newReminder, newDurationValue, newDurationUnit);
	}

	that.handleSave = handleSave;
	that.updateCreator = updateCreater;
	that.init = init;
	return that;
}