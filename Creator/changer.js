class ChangerPage extends CreatorPage{
	constructor(creator, necessaryAttributes){
		let attributes = undefined;				
		super(attributes, creator);
		this.necessaryAttributes = necessaryAttributes;		
	}

	changeEntity(newAttributes){
		this.attributes = this.addIsNecessaryToAttributes(newAttributes);
		this.updateCreator(this.attributes);
	}

	addIsNecessaryToAttributes(attributes){
		let attributesWithNecessary = {},
			that = this,
			attributeNames = Object.keys(attributes);		
		attributeNames.forEach( function (name){		
			attributesWithNecessary[name] = that.createNewAttribute(attributes, name);
		});
		return attributesWithNecessary;		
	}

	createNewAttribute(attributes, name){
		let value = attributes[name],
			isNecessary = this.necessaryAttributes.includes(name),
			newAttribute = {
				 value: value,
				isNecessary: isNecessary,
			};
		return newAttribute;
	}
}