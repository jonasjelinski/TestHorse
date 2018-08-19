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
		model,
		horseID;

	function init(attributes){
		horseID = attributes.horseID;
		initModuls(horseID);		
		addAttributesAndInitPage(attributes);
		addListeners();		
	}

	function initModuls(horseID){
		standardPage = new RegulardatesCreatorPage.Standard (userID);
		dbInterface = new DatesChangerPageSingle.DBRequester(userID, horseID);
		model = new DatesChangerPageSingle.Model();
	}

	function addAttributesAndInitPage(attributes) {
		if(!attributes){
			attributes = DEFAULT_DATA;
		}
		if(standardPage){
			standardPage.init();
			model.init(attributes);	
			addAttributes(attributes);					
		}
	}

	function addAttributes(attributes){
		console.log("attributes",attributes);
		let newDate = attributes,	//atrributes besitzt noch keinen reminder und duration value unit
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
		let updatedData = prepareDataForDBRequest(event);	
		saveDateIntoDB(updatedData);
		sendEvent("onDataSaved");
	}

	function prepareDataForDBRequest(event){
		let data = event.details.data,
			changedDate = data.date,
			updatedDate;
			console.log("changedDate", changedDate, "data", data);
		model.updateDate(changedDate);
		updatedDate = model.getDate();
		data.date = updatedDate;
		return data;
	}

	function saveDateIntoDB(changedDate) {
		dbInterface.saveDateIntoDB(updatedData);
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