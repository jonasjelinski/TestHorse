var HorseCreator = HorseCreator || {};

HorseCreator.HorseCreatorModel = function(){
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
				dateOfBirth : {value:undefined,
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
				grower: {value:undefined,
					   isNecessary: false,
				},
			};

	let that = new EventTarget(),
		requester,
		horseObject,
		attributes;

	function init() {		
		attributes = ATTRIBUTES;
		sendAttributes();		
	}

	function sendAttributes() {
		let event = new Event("onAttributesCreated");
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
	}

	function hasEnoughValues(){
		let attribute = attributes["owner"],
			value = attribute.value;
			/*let attributeNames = Object.keys(attributes);
			attributeNames.forEach(function(attributeName) {
				let newAttributeObject = newAttributes[attributeName],
					newValue = newAttributeObject.value;
				attributes[attributeName] = newValue;
				console.log("attributeValue", attributeValue);
			});	
			console.log("updateAttributes", attributes, "names", attributeNames);*/		
	}

	function getValueOfAttribute(attributeName){
		let attribute = attributes[attributeName],
			value = attribute.value;
			return value;
	}

	that.init = init;
	that.hasEnoughValues = hasEnoughValues;
	that.getValueOfAttribute = getValueOfAttribute;
	return that;
};