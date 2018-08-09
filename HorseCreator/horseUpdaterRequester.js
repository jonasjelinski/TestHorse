var HorseCreator = HorseCreator || {};

HorseCreator.HorseUpdaterRequester = function(horseId){
	const REQUEST_FUNCTION = "getHorse",
		ATTRIBUTES = {
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
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(horseId, "getHorse");
		requester.addEventListener("onDataReceived", handleOnDataReceived);
	}

	function handleOnDataReceived(event) {
		let data = event.details.data,
		horseObject = JSON.parse(receivedData);
		fillAttributesWithReceivedData(horseObject);
		sendAttributes();		
	}

	function fillAttributesWithReceivedData(horseObject) {
		let horseAttributes = Object.keys(horseObject);
		horseAttributes.forEach(function(attributeName) {
				let horseAttributeValue = horseObject[attributeName],
					attributesAttribute = attributes[attributeName];
				attributesAttribute.value = horseAttributeValue; 
			});
	}

	function sendAttributes() {
		let event = new Event("onAttributesCreated");
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
	}

	function fillHorseObjectWithNewValuesFromAttributes(attributes){
			let attributeNames = Object.keys(horseObject);
			attributeNames.forEach(function(attributeName) {
				let attributeValue = attributes[attributeName];
				horseObject[attributeName] = attributeValue;
			});			
	}

	that.init = init;
	return that;
};