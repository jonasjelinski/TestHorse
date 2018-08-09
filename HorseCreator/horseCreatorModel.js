var HorseCreator = HorseCreator || {};

HorseCreator.HorseCreatorModel = function(){
	const ATTRIBUTES = {
				name: {value:undefined,
					   isNecessary: "true",
				},
				owner: {value:undefined,
					   isNecessary: "true",
				},
				race: {value:undefined,
					   isNecessary: "true",
				},
				dateOfBirth : {value:undefined,
					   isNecessary: "true",
				},
				photo: {value:undefined,
					   isNecessary: "false",
				},
				sex : {value:undefined,
					   isNecessary: "true",
				}, 
				height: {value:undefined,
					   isNecessary: "true",
				}, 
				grower: {value:undefined,
					   isNecessary: "true",
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

	function updateAttributes(newAttributes){
			let attributeNames = Object.keys(attributes);
			attributeNames.forEach(function(attributeName) {
				let attributeValue = newAttributes[attributeName];
				attributes[attributeName] = attributeValue;
			});	
			console.log(attributes);		
	}

	that.init = init;
	that.updateAttributes = updateAttributes;
	return that;
};