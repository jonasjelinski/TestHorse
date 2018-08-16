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
			singleDatesCreator	= new DatesCreator(dateClass, reminderClass, containerElementId, titleInputId, 
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

		that.init = init;
		return that;	
}