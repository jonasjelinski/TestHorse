var RegulardatesCreatorPage = RegulardatesCreatorPage || {};

RegulardatesCreatorPage = function(userID){

	let that = new EventTarget(),
		standardPage,
		dbInterface,
		datesCreator,
		horseID;

	function init(newHorseID) {
 		newHorseID = newHorseID || 38;
		horseID = newHorseID;
		initModuls();
		addListeners();
	}

	function initModuls() {
		standardPage = new RegulardatesCreatorPage.Standard(userID);
		standardPage.init();
		dbInterface = new RegulardatesCreatorPage.DBRequester(userID, horseID);
		dbInterface.init();
	}

	function addListeners() {
		standardPage.addEventListener("onSave", handleSave);
		standardPage.addEventListener("onCancel", handleCancel);
	}

	function handleSave(event) {
		let data = event.details.data,
			date = data.date;
		saveDateIntoDB(date);
		sendEvent("onDataSaved");
	}

	function saveDateIntoDB(date) {
		dbInterface.saveDateIntoDB(date);
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