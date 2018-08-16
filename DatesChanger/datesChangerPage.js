var DateschangerPage = DateschangerPage || {};

DateschangerPage = function(){
	const SINGLE = "SINGLE", 
		REGULAR = "REGULAR";


	let that = new EventTarget(),
		page;

	function init(type, attributes){
		if(type === SINGLE){
			page = new SingleDatesCreatorPage();
		}
		else if(type === REGULAR){
			page = new RegulardatesCreatorPage();
		}
		addAttributesAndInitPage(attributes);		
	}

	function addAttributesAndInitPage(attributes) {
		if(page){
			page.
		}
	}

	that.init = init;
	return that;
}