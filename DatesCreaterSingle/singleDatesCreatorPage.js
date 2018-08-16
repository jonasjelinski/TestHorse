var SingleDatesCreatorPage = SingleDatesCreatorPage || {};

SingleDatesCreatorPage = function(){
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
		CANCLE_BUTTON_ID = "dateCreaterCancelButton";

	let that = new EventTarget(),
		datesCreator;

	function init() {
		initCreator();
		addListeners();
	}

	function initCreator() {
			datesCreator = new SingleDatesCreator(DATE_CLASS, REMINDER_CLASS, CONTAINER_ELEMENT_ID, TITLE_INPUT_ID, 
	DATE_INPUT_ID, TIME_INPUT_ID, LOCATION_INPUT_ID, CHECKBOX_ID, 
	DATE_BUTTON_ID, REMINDER_BUTTON_ID,
	SAVE_BUTTON_ID, CANCLE_BUTTON_ID);
			datesCreator.init();
	}

	function addListeners() {
		datesCreator.addEventListener("onSave", handleSave);
		datesCreator.addEventListener("onCancel", handleCancel);
	}

	function handleSave(event) {
		let data = event.details.data;
		saveDataIntoDB(data);
		sendEvent("onDataSaved");
	}

	function saveDataIntoDB(data) {

	}

	function sendEvent(type) {
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function handleCancel() {
		sendEvent("onCancel");
	}

	function updateDate(newDate) {
		datesCreator.setDate(newDate);
	}

	function updateReminder(newReminder) {
		datesCreator.setReminder(newReminder);
	}

	that.updateDate = updateDate;
	that.updateReminder = updateReminder;
	that.init = init;
	return that;
}