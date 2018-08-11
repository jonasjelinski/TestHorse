class CreatorPage extends EventTarget{
	constructor(attributes){
		super();
		this.attributes = attributes;	
	}	

	init(){		
		this.horseCreator = new HorseCreator();
		this.horseCreator.init(this.attributes);
		this.horseCreator.addEventListener("onEnoughAttributes", this.changeAttributesAndSendThem.bind(this));
	}

	changeAttributesAndSendThem(event){
		this.attributes = event.details.attributes;
			let attributesWithoutIsNecessary = {},
			that = this,
			attributeNames = Object.keys(this.attributes);
			attributeNames.forEach( function (name){
				let attribute = that.attributes[name],
					value = attribute.value;
					if(value === undefined){
						value = "";
					}
				attributesWithoutIsNecessary[name] = value;
			});
		this.sendAttributes(attributesWithoutIsNecessary);
	}

	sendAttributes(attributes){
		let event = new Event("onEnoughAttributes");
		event.details = {};
		event.details.attributes = attributes;
		this.dispatchEvent(event);
	}

	saveHorse(){
		this.dbRequester = new HorseCreator.HorseCreatorDBRequester();
		dbRequester.init(attributesWithoutIsNecessary);
		this.sendEvent("onHorseSaved");		
	}

	startCreationFromStart(){
		this.horseCreator.init(this.attributes);
	}	

	sendEvent(type){
		let event = new Event(type);		
		this.dispatchEvent(event);
	}
	
	changeHorse(newAttributes){
		this.attributes = newAttributes;
		this.startCreationFromStart();
	}
}