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
		page,
		horseID;

	function init(attributes){
		horseID = attributes.horseID;
		page = new SingleDatesCreatorPage.Standard(userID,horseID);
		addAttributesAndInitPage(attributes);		
	}

	function addAttributesAndInitPage(attributes) {
		if(!attributes){
			attributes = DEFAULT_DATA;
		}
		if(page){
			page.init(horseID);	
			addAttributes(attributes);
					
		}
	}

	function addAttributes(attributes){
		let newDate = attributes.date,
			reminder = attributes.reminder;
		page.updateCreator(newDate, reminder);
	}

	function addListeners() {
		page.addEventListener("onSave", handleSave);
		page.addEventListener("onCancel", handleCancel);
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