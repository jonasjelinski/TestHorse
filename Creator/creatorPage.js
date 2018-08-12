class CreatorPage extends EventTarget{
	constructor(attributes, creator){
		super();
		this.attributes = attributes;
		this.creator = creator;		
	}	

	init(){		
		this.creator.init();
		this.creator.addEventListener("onEnoughAttributes", this.changeAttributesAndSendThem.bind(this));
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

	sendEvent(type){
		let event = new Event(type);		
		this.dispatchEvent(event);
	}

	updateEntityCreator(attributes){
		this.creator.updateEntityCreator(attributes);
	}	
}