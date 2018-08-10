var HorseCreator = HorseCreator || {};

HorseCreator.HorseCreatorModel = function(newAttributes){
	const ATTRIBUTES = {
				name: {value:undefined,
					   isNecessary: false,
				},
				owner: {value:undefined,
					   isNecessary: false,
				},
				race: {value:undefined,
					   isNecessary: false,
				},
				birth : {value:undefined,
					   isNecessary: false,
				},
				photo: {value:undefined,
					   isNecessary: false,
				},
				sex : {value:undefined,
					   isNecessary: false,
				}, 
				height: {value:undefined,
					   isNecessary: false,
				}, 
				raiser: {value:undefined,
					   isNecessary: false,
				},
			};

	let that = new EventTarget(),
		requester,
		horseObject,
		attributes;

	function init() {
	if(!newAttributes){
		attributes = ATTRIBUTES;
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