var RegulardatesPage = RegulardatesPage || {};

RegulardatesPage = function(){

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
		DROPDOWN_MENU_ID = "myDropdown",
		UNIT_INPUT_ID = "regular_dates_unit";

	let that = new EventTarget(),
	regularDatesCreater;

	function init(){
		initRegularDatesCreator();
		addEventListeners();

	}

	function initRegularDatesCreator(){
		regularDatesCreater = new RegulardatesCreater(DATE_CLASS, REMINDER_CLASS, CONTAINER_ELEMENT_ID, TITLE_INPUT_ID, 
	DATE_INPUT_ID, TIME_INPUT_ID, LOCATION_INPUT_ID, CHECKBOX_ID, 
	DATE_BUTTON_ID, REMINDER_BUTTON_ID,
	SAVE_BUTTON_ID, CANCLE_BUTTON_ID, DROPDOWN_MENU_ID, UNIT_INPUT_ID);
		regularDatesCreater.init();
	}

	function addEventListeners() {
		regularDatesCreater.addEventListener("onSave", handleSave);
		regularDatesCreater.addEventListener("onCancel", handleCancel);
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

	that.init = init;
	return that;
}