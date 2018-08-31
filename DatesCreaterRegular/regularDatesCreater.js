var RegulardatesCreater = RegulardatesCreater || {};

/**
 * @instance RegulardatesCreater
 * @memberof! RegulardatesCreater 
 * @param {string} dateClass. class of dates
 * @param {string} reminderClass. class of the reminder
 * @param {string} containerElementId. id of the container
 * @param {string} titleInputId. id of the input for title
 * @param {string} dateInputId. id of the input for date
 * @param {string} timeInputId. id of the input for time
 * @param {string} locationInputId. id of the input for location
 * @param {string} wantsReminderCheckboxId. id for the checkbox
 * @param {string} dateButtonId. Id of the dateButton
 * @param {string} reminderButtonId. Id of the reminderButton
 * @param {string} saveButtonId. Id of the saveButton
 * @param {string} cancelButtonId. Id of the cancelButton
 * @description Modul <code>DatesChangerPage</code> is used to create a regular date
 * a regular date contains all values of a single date, plus an time intervall
 * the timeintervall consits of a unit(day, week, month, year) and a value 1,2,4,5...
 */

RegulardatesCreater = function(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId,dropDownMenuId, unitInputId){
	
	let that = new EventTarget(),
		singleDatesCreator, 
		view;

	/**
	* @function init
	* @public
	* @memberof! RegulardatesCreater
	* @instance
	* @description Initialize this modul.
	*/
	function init() {
		initSingleDatesCreator();
		initView();
		addEventListeners();	
	}

	/**
	* @function initSingleDatesCreator
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @description inits the singleCreator
	* as the regular date has more attributes as a singleCrator it extends the modul SingleDatesCreator
	*/
	function initSingleDatesCreator() {
		singleDatesCreator	= new SingleDatesCreator(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId);
		singleDatesCreator.init();
	}

	/**
	* @function initView
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @description inits the view
	*/
	function initView() {
		view = RegulardatesCreater.View(dropDownMenuId, unitInputId);
		view.init();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @description adds the eventlisteners
	*/
	function addEventListeners() {
		singleDatesCreator.addEventListener("onSave", handleSave);
		singleDatesCreator.addEventListener("onCancel", handleCancel);
	}

	/**
	* @function handleSave
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @description function which is called if the singleCreator sends an "onSave" event
	* adds the reularDateData and the durationData to the data of the event
	* sends new data to other moduls
	*/
	function handleSave(event) {
		
		let regularDateData = event.details.data,
			duration = view.getUnitAndValue(),
			data = Object.assign(regularDateData, duration);
			sendEvent("onSave", data);
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {string}, type
	* @param {object}, data
	* @description sends event of type "type" with data
	*/
	function sendEvent(type, data){
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
	* @description sends event of type "onCancel"
	*/
	function handleCancel() {
		sendEvent("onCancel");
	}

	/**
	* @function updateCreator
	* @public
	* @memberof! RegulardatesCreater
	* @instance
	* @description updates the creator of this modul
	* is useful, because this functions allows to use this modul to use it as a modul to change a regular date
	*/
	function updateCreator(newDate, newReminder, newDurationValue, newDurationUnit){
		singleDatesCreator.updateCreator(newDate, newReminder);
		updateDurationValue(newDurationValue);
		updateDurationUnit(newDurationUnit);
	}

	/**
	* @function updateDurationValue
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {string}, value, new value of the duration e.g. 1,7, 9
	* @description updates the value of the duration
	*/	
	function updateDurationValue(value) {
		view.setDurationValue(value);
	}

	/**
	* @function updateDurationUnit
	* @private
	* @memberof! RegulardatesCreater
	* @instance
	* @param {string}, unit, the unit of the rminder, e.g. week, day or month
	* @description updates the value of the unit
	*/	
	function updateDurationUnit(unit) {
		view.setDurationUnit(unit);
	}

	that.init = init;
	that.updateCreator = updateCreator;		
	return that;	
}