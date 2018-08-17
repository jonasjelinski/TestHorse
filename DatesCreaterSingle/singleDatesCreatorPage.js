var SingleDatesCreatorPage = SingleDatesCreatorPage || {};

SingleDatesCreatorPage = function(userID){

	let that = new EventTarget(),
		standardPage,
		dbInterface,
		datesCreator,
		horseID;

	function init(newHorseID) {
		horseID = newHorseID;
		initCreator();
		addListeners();
	}

	function initCreator() {
		standardPage = new SingleDatesCreatorPage.Standard(userID);
		dbInterface = new SingleDatesCreatorPage.DBRequester(userID, horseID);
	}

	function addListeners() {
		standardPage.addEventListener("onSave", handleSave);
		standardPage.addEventListener("onCancel", handleCancel);
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