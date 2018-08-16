var DatesChangerPageRegular = DatesChangerPageRegular || {};

DatesChangerPageRegular = function(){

	let that = new EventTarget(),
		page;

	function init(attributes){
		page = new RegulardatesCreatorPage();
		addAttributesAndInitPage(attributes);		
	}

	function addAttributesAndInitPage(attributes) {
		if(!attributes){
			attributes = testdata;
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

	let date = {
		date: "2018-08-02",
		location:"222",
		time:"11:11",
		title:"11",
	}

	let reminder = {
		date: "2018-08-02",
		time:"22:22",
	}

	let testdata = {date, reminder, unit:"Woche", durationValue: "7"};

	that.init = init;
	return that;
}