var DatesChangerPageRegular = DatesChangerPageRegular || {};

DatesChangerPageRegular = function(){

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
		page;

	function init(attributes){
		page = new RegulardatesCreatorPage();
		//dbInterface = new DatesChangerPageSingle.DBRequester(userID, horsID);
		page.setDBInterface(dbInterface);
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