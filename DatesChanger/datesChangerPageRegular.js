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
		horseID;

	function init(attributes){
		horseID = attributes.horseID;
		page = new RegulardatesCreatorPage(userID);
		page.setDBInterface(dbInterface);
		dbInterface = new DatesChangerPageSingle.DBRequester(userID, horseID);
		addAttributesAndInitPage(attributes);		
	}

	function addAttributesAndInitPage(attributes) {
		if(!attributes){
			attributes = DEFAULT_DATA;
		}
		if(page){
			page.init();	
			addAttributes(attributes);					
		}
	}

	function addAttributes(attributes){
		let newDate = attributes.date,
				reminder = attributes.reminder,
				newDurationValue = attributes.durationValue,
				newDurationUnit = attributes.unit;
			page.updateCreator(newDate, reminder, newDurationValue, newDurationUnit);
	}

	that.init = init;
	return that;
}