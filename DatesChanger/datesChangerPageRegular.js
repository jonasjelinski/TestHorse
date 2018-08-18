var DatesChangerPageRegular = DatesChangerPageRegular || {};

DatesChangerPageRegular = function(userID){

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
	DEFAULT_DATA = {DATE, REMINDER, unit:"Woche", durationValue: "7"};

	let that = new EventTarget(),
		dbInterface,
		standardPage,
		horseID;

	function init(attributes){
		horseID = attributes.horseID;
		standardPage = new RegulardatesCreatorPage.Standard (userID);
		dbInterface = new DatesChangerPageSingle.DBRequester(userID, horseID);
		addAttributesAndInitPage(attributes);
		addListeners();		
	}

	function addAttributesAndInitPage(attributes) {
		if(!attributes){
			attributes = DEFAULT_DATA;
		}
		if(standardPage){
			standardPage.init();	
			addAttributes(attributes);					
		}
	}

	function addAttributes(attributes){
		let newDate = attributes.date,
				reminder = attributes.reminder,
				newDurationValue = attributes.durationValue,
				newDurationUnit = attributes.unit;
			standardPage.updateCreator(newDate, reminder, newDurationValue, newDurationUnit);
	}

	function addListeners() {
		standardPage.addEventListener("onSave", handleSave);
		standardPage.addEventListener("onCancel", handleCancel);
	}

	function handleSave(event) {
		let data = event.details.data,
			changedDate = data.date;
		saveDateIntoDB(date);
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