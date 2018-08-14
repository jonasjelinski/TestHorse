class CreatorPage extends EventTarget{
	constructor(creator){
		super();
		this.creator = creator;
		this.neccessaryAttributes = [];
		this.changer = new AttributesConverter(this.neccessaryAttributes);	
	}	

	init(){		
		this.creator.init();
		this.creator.addEventListener("onEnoughAttributes", this.changeAttributesAndSendThem.bind(this));
	}

	setCreator(creator){
		this.creator = creator;
	}

	changeAttributesAndSendThem(event){
		let attributesWithoutIsNecessary,
			attributes = event.details.attributes;
		attributesWithoutIsNecessary = this.changer.removeIsNecessaryFromAttributes(attributes);			
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