var DatesChangerPageSingle = DatesChangerPageSingle || {};

DatesChangerPageSingle = function(userID){
	const DATE = {
		date: "2018-08-02",
		location:"222",
		time:"11:11",
		title:"11",
	},
	REMINDER = {
		date: "2018-08-02",
		time:"22:22",
	},
	DEFAULT_DATA = {DATE, REMINDER};

	let that = new EventTarget(),
		standardPage,
		horseID;

	function init(attributes){
		horseID = attributes.horseID;
		standardPage = new SingleDatesCreatorPage.Standard(userID,horseID);
		dbInterface = new DatesChangerPageSingle.DBRequester(userID, horseID);
		addAttributesAndInitPage(attributes);
		dbInterface.init();		
	}

	function addAttributesAndInitPage(attributes) {
		if(!attributes){
			attributes = DEFAULT_DATA;
		}
		if(standardPage){
			standardPage.init(horseID);	
			addAttributes(attributes);
					
		}
	}

	function addAttributes(attributes){
		let newDate = attributes.date,
			reminder = attributes.reminder;
		standardPage.updateCreator(newDate, reminder);
	}

	function addListeners() {
		standardPage.addEventListener("onSave", handleSave);
		standardPage.addEventListener("onCancel", handleCancel);
	}

	function handleSave(event) {
		let changedDate = event.details.data.date;
		saveDateIntoDB(changedDate);
		sendEvent("onDataSaved");
	}

	function saveDateIntoDB(changedDate) {
		dbInterface.saveDateIntoDB(changedDate);
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