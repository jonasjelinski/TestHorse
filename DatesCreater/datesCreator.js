var DatesCreator = DatesCreator || {};

/**
 * @instance DatesCreator
 * @memberof! DatesCreator 
 * @description Modul <code>DatesChangerPage</code> is used to create a date
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
 */

DatesCreator = function(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId){
	let that = new EventTarget(),
		model,
		popup,
		view;

	/**
	* @function init
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description Initialize this modul.
	*/
	function init(){
		initModelAndView();
		addEventListeners();
	}

	/**
	* @function initModelAndView
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description Initialize model and view
	*/
	function initModelAndView() {
		model = new DatesCreator.Model();
		view = new DatesCreator.View(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId);
		model.init();
		view.init();
	}

	/**
	* @function addEventListeners
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description adds the listeners to model and view
	*/
	function addEventListeners(){
		addModelListeners();
		addViewListeners();
	}

	/**
	* @function addModelListeners
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description adds the listeners to model
	*/
	function addModelListeners(){
		model.addEventListener("onNoTitle", handleNoTitle);
		model.addEventListener("onNoDate", handleNoDate);
		model.addEventListener("onNoTime", handleNoTime);
		model.addEventListener("onNoLocation", handleNoLocation);
		model.addEventListener("onFinaleSaveOkay", handleFinaleSave);
		model.addEventListener("onShowDateOkay", handleShowDateOkay);
		model.addEventListener("onShowReminderOkay", handleShowReminderOkay);
		model.addEventListener("showPopup", handleShowPopup);
	}

	/**
	* @function handleNoTitle
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description gives feedback to the user
	*/
	function handleNoTitle(){
		view.giveNoTitleFeedback();
	}

	/**
	* @function handleNoDate
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description gives feedback to the user
	*/
	function handleNoDate(){
		view.giveNoDateFeedback();
	}

	/**
	* @function handleNoTime
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description gives feedback to the user
	*/
	function handleNoTime(){
		view.giveNoTimeFeedback();
	}

	/**
	* @function handleNoLocation
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description gives feedback to the user
	*/
	function handleNoLocation(){
		view.giveNoLocationFeedback();
	}

	/**
	* @function handleFinaleSave
	* @public
	* @memberof! DatesCreator
	* @instance
	* @param {event}, event
	* @description recieves data in an event and sends it with an event op type "onsave"
	*/
	function handleFinaleSave(event){
		let data = event.details.data;
		sendEvent("onSave", data);
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! DatesCreator
	* @instance
	* @param {event}, event
	* @param {object}, data
	* @description sends event with data
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
	* @function handleShowDateOkay
	* @public
	* @memberof! DatesCreator
	* @instance
	* @param {event}, event
	* @description receives date in an event and updates the view with the data
	*/
	function handleShowDateOkay(event){
		let dateData = event.details.data;
		view.showDateCreater(dateData);
	}

	/**
	* @function handleShowReminderOkay
	* @public
	* @memberof! DatesCreator
	* @instance
	* @param {event}, event
	* @description receives date in an event and updates the view with the data
	*/
	function handleShowReminderOkay(event) {
		let reminderData =  event.details.data;
		view.showReminderCreater(reminderData);
	}

	/**
	* @function addViewListeners
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description adds the listeners to view
	*/
	function addViewListeners(){
		view.addEventListener("onWantsReminder", handleWantsReminder);
		view.addEventListener("onWantsNoReminder", handleonWantsNoReminder);
		view.addEventListener("onDateButtonClicked", handleDateButtonClick);
		view.addEventListener("onReminderButtonClick", handleReminderButtonClick);
		view.addEventListener("onSaveButtonClick", handleViewSave);
		view.addEventListener("onCancel", handleCancle);
	}

	/**
	* @function handleWantsReminder
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description tells model that user wants a reminder
	*/
	function handleWantsReminder(event) {
		model.setWantsReminder(true);
	}

	/**
	* @function handleWantsReminder
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description tells model that user doesnt want a reminder
	*/
	function handleonWantsNoReminder(event) {
		model.setWantsReminder(false);
	}

	/**
	* @function handleDateButtonClick
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description tells the model that the user wants to see the view to create a date
	* the models uses the inputdata and checks if the user had put in the correct values
	*/
	function handleDateButtonClick(event) {
		let reminderData = event.details.input;
		model.tryToShowDateCreator(reminderData);
	}

	/**
	* @function handleReminderButtonClick
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description tells the model that the user wants to see the view to create a reminder
	* the models uses the inputdata and checks if the user had put in the correct values
	*/
	function handleReminderButtonClick(event) {
		let inputData = event.details.input;
		model.tryToShowReminderCreator(inputData);
	}

	/**
	* @function handleViewSave
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description tells the model that the user wants to save the data.
	* model tests the data if they are correct
	*/
	function handleViewSave(event) {
		let inputData = event.details.input;
		model.tryToSaveAtTheEnd(inputData);
	}

	/**
	* @function handleCancle
	* @public
	* @memberof! DatesCreator
	* @instance
	* @description sends event of tpye "onCancle" to other moduls so they know the user
	* wants to cancel the creation
	*/
	function handleCancle() {
		sendEvent("onCancel");	
	}

	function handleShowPopup(){
		view.showPopup();
	}

	/**
	* @function setDate
	* @public
	* @memberof! DatesCreator
	* @instance
	* @param{object}, newDate
	* @description sets the date of the model
	*/
	function setDate(newDate) {
		model.setDate(newDate);
	}

	/**
	* @function setReminder
	* @public
	* @memberof! DatesCreator
	* @instance
	* @param{object}, newReminder
	* @description sets the reminder of the model
	*/
	function setReminder(newReminder) {
		model.setReminder(newReminder);
	}

	/**
	* @function updateCreator
	* @public
	* @memberof! DatesCreator
	* @instance
	* @param{object}, newDate
	* @param{object}, newReminder
	* @description updates the creator with new values of newDate and newReminder
	*/
	function updateCreator(newDate, newReminder){		
		setDate(newDate);
		if(newReminder){
			setReminder(newReminder);
			view.setReminderTrue();	
			model.setWantsReminder(true);
		}
		view.updateView(newDate);
	}

	that.init = init;
	that.updateCreator = updateCreator;
	return that;
}