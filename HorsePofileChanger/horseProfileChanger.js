class HorseProfileChanger extends CreatorPage{
	constructor(){
		let attributes = undefined,
			creator = new HorseCreator(),
			dbRequester = new HorseCreator.HorseCreatorDBRequester()		
		super(attributes, creator, dbRequester);		
	}	

	init(newAttributes){
		this.attributes = this.addIsNecessaryToAttributes(newAttributes);
		super.init();		
		super.changeHorse(this.attributes);		
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