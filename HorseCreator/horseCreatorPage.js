var HorseCreatorPage = HorseCreatorPage ||{};

HorseCreatorPage = function(){

	const  ATTRIBUTES = {
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
		horseCreator,
		attributesWithoutIsNecessary,
		dbRequester;

	function init(){
		attributes = ATTRIBUTES;
		horseCreator = new HorseCreator();
		horseCreator.init(attributes);
		horseCreator.addEventListener("onEnoughAttributes", changeAttributesAndSendThem);
	}

	function changeAttributesAndSendThem(event){
		attributes = event.details.attributes;
			attributesWithoutIsNecessary = {};
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

	function saveHorse(){
		dbRequester = new HorseCreator.HorseCreatorDBRequester();
		dbRequester.init(attributesWithoutIsNecessary);
		sendEvent("onHorseSaved");
		//dbRequester.request(); 
	}

	function changeHorse(){
		horseCreator.init(attributes);
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function setAttributes(attr){
		attributes = attr;
	}

	that.setAttributes = setAttributes;
	that.saveHorse = saveHorse;
	that.changeHorse = changeHorse;
	that.init = init;
	return that;
}