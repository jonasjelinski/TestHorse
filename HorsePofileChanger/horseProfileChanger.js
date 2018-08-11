class HorseProfileChanger extends CreatorPage{
	constructor(){
		super();
	}	

	init(newAttributes){
		let attributes = this.addIsNecessaryToAttributes(newAttributes);
		super.init();		
		super.changeHorse(attributes);		
	}

	addIsNecessaryToAttributes(attributes){
		let attributesWithNecessary = {},
			attributeNames = Object.keys(attributes);		
		attributeNames.forEach( function (name){
			let value = attributes[name],
				newAttribute = {
					 value: value,
					isNecessary: false,
				};
			attributesWithNecessary[name] = newAttribute;
		});

		return attributesWithNecessary;		
	}
}