var Creator = Creator || {};

Creator.CreatorModel = function(newAttributes){

	let that = new EventTarget(),
		requester,
		attributes;

	function init() {
		attributes = newAttributes;	
	}

	function sendAttributes() {
		let event = new Event("onAttributesCreated");
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
	}

	function getAttributes(){
		return attributes;	
	}

	function getValueOfAttribute(attributeName){
		let value,
			attribute = attributes[attributeName];
			if(attribute){
				value = attribute.value;
			}
			return value;
	}

	that.init = init;
	that.getAttributes = getAttributes;
	that.getValueOfAttribute = getValueOfAttribute;
	return that;
};