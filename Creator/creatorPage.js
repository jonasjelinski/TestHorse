class CreatorPage extends EventTarget{
	constructor(attributes, creator){
		super();
		this.attributes = attributes;
		this.creator = creator;
		this.neccessaryAttributes = [];
		this.changer = new Changer(this.neccessaryAttributes);	
	}	

	init(){		
		this.creator.init();
		this.creator.addEventListener("onEnoughAttributes", this.changeAttributesAndSendThem.bind(this));
	}

	setCreator(creator){
		this.creator = creator;
	}

	changeAttributesAndSendThem(event){
		let attributesWithoutIsNecessary;
		this.attributes = event.details.attributes;
		attributesWithoutIsNecessary = this.changer.removeIsNecessaryFromAttributes(this.attributes);			
		this.sendAttributes(attributesWithoutIsNecessary);
	}

	sendAttributes(attributes){
		let event = new Event("onEnoughAttributes");
		event.details = {};
		event.details.attributes = attributes;
		this.dispatchEvent(event);
	}

	sendEvent(type){
		let event = new Event(type);		
		this.dispatchEvent(event);
	}

	updateCreator(attributes){
		this.creator.updateCreator(attributes);
	}	
}