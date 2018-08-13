class ChangerPage extends CreatorPage{
	constructor(creator, necessaryAttributes){
		let attributes = undefined;				
		super(attributes, creator);
		this.creator = creator;
		this.changer = new AttributesConverter(necessaryAttributes);		
	}

	init(newAttributes){
		this.changeEntity(newAttributes);
		super.init();
	}

	changeEntity(newAttributes){		
		this.attributes = this.changer.addIsNecessaryToAttributes(newAttributes);
		this.creator.resetCreator(this.attributes);
	}
}