var UserCreator = UserCreator || {};

UserCreator.UserCreatorModel = function(newAttributes){
	const ATTRIBUTES = {
				name: {value:undefined,
					   isNecessary: false,
				},
				email: {value:undefined,
					   isNecessary: false,
				},
				password: {value:undefined,
					   isNecessary: false,
				},				
			};

	let that = new EventTarget(),
		requester,
		attributes;

	function init() {
	if(!newAttributes){
		attributes = ATTRIBUTES;
	}
	else {
		attributes = newAttributes;
	}		
		sendAttributes();		
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