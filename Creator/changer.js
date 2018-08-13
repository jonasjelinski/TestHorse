class Changer{
	constructor(necessaryAttributes){
		this.necessaryAttributes = necessaryAttributes;		
	}

	changeAttributes(newAttributes){
		this.attributes = this.addIsNecessaryToAttributes(newAttributes);
		return this.attributes;
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

	removeIsNecessaryFromAttributes(attributes){
		let attributesWithoutIsNecessary = {},
			attributeNames = Object.keys(attributes);
			attributeNames.forEach( function (name){
				let attribute = attributes[name],
					value = attribute.value;
					if(value === undefined){
						value = "";
					}
				attributesWithoutIsNecessary[name] = value;
			});
		return attributesWithoutIsNecessary;
	}
}