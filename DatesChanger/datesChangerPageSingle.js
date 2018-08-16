var DatesChangerPageSingle = DatesChangerPageSingle || {};

DatesChangerPageSingle = function(){

	let that = new EventTarget(),
		page;

	function init(attributes){
		page = new SingleDatesCreatorPage();
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
			reminder = attributes.reminder;
		page.updateCreator(newDate, reminder);
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

	let testdata = {date, reminder};


	that.init = init;
	return that;
}