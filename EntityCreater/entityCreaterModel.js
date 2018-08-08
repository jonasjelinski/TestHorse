var EntityCreater = EntityCreater || {};

EntityCreater.EntityCreaterModel = function(pages, attributes){
	let that = new EventTarget(),
		pageNumber,
		entity;

	function init(){
		entity = new Entity(attributes);
	}

	function updatePropertyValue(property, value){
		entity.setAttribute(property, value);
	}

	function setPage(pageNum){
		pageNumber = pageNum;
	}

	function sendPage(){
		let pageHTMLString = pages[pageNumber-1],
			data = {page: pageHTMLString};
		sendEvent("onPageChange", data);
	}

	function sendEvent(type, data){
		let event = new Event(type);
		event.details = data;
		that.dispatchEvent(event);
	}

	function checkIfEntityHasEnoughValues(){
		if(entity.hasAllNecessaryAttributes()){
			let attributes = entity.getAllAttributes(),
				data = {data:attributes}; 
			sendEvent("hasEnoughValues", data);
		}
		else{
			sendEvent("hasNotEnoughValues");
		}
	}

	that.checkIfEntityHasEnoughValues = checkIfEntityHasEnoughValues;
	that.updatePropertyValue = up;
	that.setPage = setPage;
	return that;

}