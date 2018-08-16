var RegulardatesCreater = RegulardatesCreater || {};

RegulardatesCreater = function(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId,dropDownMenuId, unitInputId){
	
	let that = new EventTarget(),
		singleDatesCreator, 
		view;

	function init() {
		initSingleDatesCreator();
		initView();
		addEventListeners();	
	}

	function initSingleDatesCreator() {
		singleDatesCreator	= new SingleDatesCreator(dateClass, reminderClass, containerElementId, titleInputId, 
	dateInputId, timeInputId, locationInputId, wantsReminderCheckboxId, dateButtonId, reminderButtonId,
	saveButtonId, cancelButtonId);
		singleDatesCreator.init();
	}

	function initView() {
		view = RegulardatesCreater.View(dropDownMenuId, unitInputId);
		view.init();
	}

	function addEventListeners() {
		singleDatesCreator.addEventListener("onSave", handleSave);
		singleDatesCreator.addEventListener("onCancel", handleCancel);
	}

	function handleSave(event) {
		let regularDateData = event.details.data,
			duration = view.getUnitAndValue(),
			data = Object.assign(regularDateData, duration);
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

	function handleCancel() {
		sendEvent("onCancel");
	}

	function updateCreator(newDate, newReminder, newDurationValue, newDurationUnit){
		singleDatesCreator.updateCreator(newDate, newReminder);
		updateDurationValue(newDurationValue);
		updateDurationUnit(newDurationUnit);
	}

	function updateDate(newDate) {
		singleDatesCreator.setDate(newDate);
	}

	function updateReminder(newReminder) {
		singleDatesCreator.setReminder(newReminder);		
	}

	function updateDurationValue(value) {
		view.setDurationValue(value);
	}

	function updateDurationUnit(unit) {
		view.setDurationUnit(unit);
	}

	that.init = init;
	that.updateCreator = updateCreator;		
	return that;	
}