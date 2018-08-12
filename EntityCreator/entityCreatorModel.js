var EntityCreator = EntityCreator || {};

EntityCreator.EntityCreatorModel = function(pages, attr){
	let that = new EventTarget(),
		pageNumber,
		entity,
		attributes;

	function init(){
		attributes = attr;
		entity = new Entity(attributes);
	}

	function updateAttributeValue(property, value){
		entity.setAttribute(property, value);
	}

	function setPage(pageNum){
		pageNumber = pageNum;
		sendPage();
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

	function setAttributes(newAttributes){
		attributes = newAttributes;
	}

	function createNewEntity(){
		entity = new Entity(attributes);
	}

	function updateModel(attributes){
		setAttributes(attributes);
		createNewEntity();		
	}

	that.init = init;
	that.checkIfEntityHasEnoughValues = checkIfEntityHasEnoughValues;
	that.updateAttributeValue = updateAttributeValue;
	that.setPage = setPage;
	that.updateModel = updateModel;
	return that;

}