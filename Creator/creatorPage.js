/**
 * @class CreatorPage
 * @description Class <code>CreatorPage</code> inits an instance of creator and handles its event
 * trough a listener observer pattern
 * @param{object} creator, instance of the Class creator
 */

class CreatorPage extends EventTarget{
	constructor(creator){
		super();
		this.creator = creator;
		this.neccessaryAttributes = [];
		this.changer = new AttributesConverter(this.neccessaryAttributes);	
	}

	/**
	* @function init
	* @public
	* @memberof! CreatorPage
	* @instance
	* @description Initialize this.creator
	*/ 	
	init(){		
		this.creator.init();
		this.creator.addEventListener("onEnoughAttributes", this.changeAttributesAndSendThem.bind(this));
	}

	/**
	* @function setCreator
	* @public
	* @memberof! CreatorPage
	* @instance
	* @description sets the creator
	*/ 	
	setCreator(creator){
		this.creator = creator;
	}

	/**
	* @function changeAttributesAndSendThem
	* @public
	* @memberof! CreatorPage
	* @instance
	* @param{event} event, event contains the attributes from this.creator 
	* @description reds the attributes from this creator cleans them form the
	* property isNecessary and sends them
	*/ 	
	changeAttributesAndSendThem(event){
		let attributesWithoutIsNecessary,
			attributes = event.details.attributes;
		attributesWithoutIsNecessary = this.changer.removeIsNecessaryFromAttributes(attributes);			
		this.sendAttributes(attributesWithoutIsNecessary);
	}

	/**
	* @function sendAttributes
	* @public
	* @memberof! CreatorPage
	* @instance
	* @param{object} attributes, attributes which will be send
	* @description send the given attributes through an event
	*/ 	
	sendAttributes(attributes){
		let event = new Event("onEnoughAttributes");
		event.details = {};
		event.details.attributes = attributes;
		this.dispatchEvent(event);
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! CreatorPage
	* @instance
	* @param{string} type, type of the event
	* @description send the event of type "type"
	*/ 	
	sendEvent(type){
		let event = new Event(type);		
		this.dispatchEvent(event);
	}


	/**
	* @function updateCreator
	* @public
	* @memberof! CreatorPage
	* @instance
	* @param{object} attributes, attributes with wich the creator should be updated
	* @description updates the creator with the given attributes. After that the model of
	* this.creator contains "attributes" as attributes.
	*/ 	
	updateCreator(attributes){
		this.creator.updateCreator(attributes);
	}	
}