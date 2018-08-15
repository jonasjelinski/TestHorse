var DatesCreator = DatesCreator || {};

DatesCreator = function(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId){
	let that = new EventTarget(),
		model,
		view;

	function init(){
		initModelAndView();
		addEventListeners();
	}

	function initModelAndView() {
		model = new DatesCreator.Model();
		view = new DatesCreator.View(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId);
		model.init();
		view.init();
	}

	function addEventListeners(){
		addModelListeners();
		addViewListeners();
	}

	function addModelListeners(){
		model.addEventListener("onNoTitle", handleNoTitle);
		model.addEventListener("onNoDate", handleNoDate);
		model.addEventListener("onNoTime", handleNoTime);
		model.addEventListener("onNoLocation", handleNoLocation);
		model.addEventListener("onFinaleSaveOkay", handleFinaleSave);
		model.addEventListener("onShowDateOkay", handleShowDateOkay);
		model.addEventListener("onShowReminderOkay", handleShowReminderOkay);
	}

	function handleNoTitle(){
		view.giveNoTitleFeedback();
	}	

	function handleNoDate(){
		view.giveNoDateFeedback();
	}

	function handleNoTime(){
		view.giveNoTimeFeedback();
	}

	function handleNoLocation(){
		view.giveNoLocationFeedback();
	}

	function handleFinaleSave(event){
		let data = event.details.data;
		sendEvent("onSave", data);
	}

	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.data = data;
		}
		that.dispatchEvent(event);
	}

	function handleShowDateOkay(event){
		let dateData = event.details.data;
		view.showDateCreater(dateData);
	}

	function handleShowReminderOkay(event) {
		let reminderData =  event.details.data;
		view.showReminderCreater(reminderData);
	}

	function addViewListeners(){
		view.addEventListener("onWantsReminder", handleWantsReminder);
		view.addEventListener("onWantsNoReminder", handleonWantsNoReminder);
		view.addEventListener("onDateButtonClicked", handleDateButtonClick);
		view.addEventListener("onReminderButtonClick", handleReminderButtonClick);
		view.addEventListener("onSaveButtonClick", handleViewSave);
		view.addEventListener("onCancel", handleCancle);
	}

	function handleWantsReminder(event) {
		model.setWantsReminder(true);
	}

	function handleonWantsNoReminder(event) {
		model.setWantsReminder(false);
	}

	function handleDateButtonClick(event) {
		let inputData = event.details.input;
		model.tryToShowDateCreator(inputData);
	}

	function handleReminderButtonClick(event) {
		let inputData = event.details.input;
		model.tryToShowReminderCreator(inputData);
	}

	function handleViewSave(event) {
		let inputData = event.details.input;
		model.tryToSaveAtTheEnd(inputData);
	}

	function handleCancle() {
		sendEvent("onCancel");	
	}

	function setDate(newDate) {
		model.setDate(newDate);
	}

	function setReminder(newReminder) {
		model.setReminder(newReminder);
	}

	that.init = init;
	that.setDate = setDate;
	that.setReminder = setReminder;
	return that;
}