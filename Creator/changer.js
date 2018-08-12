class ChangerPage extends CreatorPage{
	constructor(creator, necessaryAttributes){
		let attributes = undefined;		
		super(attributes, creator);
		this.necessaryAttributes = necessaryAttributes;		
	}	

	init(newAttributes){
		this.attributes = this.addIsNecessaryToAttributes(newAttributes);
		super.init();		
		super.changeHorse(this.attributes);		
	}

	addIsNecessaryToAttributes(attributes){
		let attributesWithNecessary = {},
			that = this,
			attributeNames = Object.keys(attributes);		
		attributeNames.forEach( function (name){
			let value = attributes[name],
				isNecessary = that.necessaryAttributes.includes(name);
				newAttribute = {
					 value: value,
					isNecessary: isNecessary,
				};
			attributesWithNecessary[name] = newAttribute;
		});

		return attributesWithNecessary;		
	}
}