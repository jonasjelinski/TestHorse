class ChangerPage extends CreatorPage{
	constructor(creator, necessaryAttributes){
		let attributes = undefined;				
		super(attributes, creator);
		this.changer = new Changer(necessaryAttributes);		
	}

	changeEntity(newAttributes){
		
		this.attributes = this.changer.changeAttributes(newAttributes);
		this.updateCreator(this.attributes);
	}
}