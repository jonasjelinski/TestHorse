var HorseCreatorPage = HorseCreatorPage ||{};

HorseCreatorPage = function(){
	let that = new EventTarget(),
		horseCreator;

	function init(attributes){
		horseCreator = new HorseCreator();
		horseCreator.init(attributes);
		horseCreator.addEventListener("onEnoughAttributes", changeAttributesAndSendThem);
	}

	function changeAttributesAndSendThem(event){
		let attributes = event.details.attributes,
			attributesWithoutIsNecessary = {},
			attributeNames = Object.keys(attributes);
			attributeNames.forEach( function (name){
				let attribute = attributes[name],
					value = attribute.value;
					if(value === undefined){
						value = "";
					}
				attributesWithoutIsNecessary[name] = value;
			});
		sendAttributes(attributesWithoutIsNecessary);
	}

	function sendAttributes(attributes){
		let event = new Event("onEnoughAttributes");
		event.details = {};
		event.details.attributes = attributes;
		that.dispatchEvent(event);
	}

	that.init = init;
	return that;
}