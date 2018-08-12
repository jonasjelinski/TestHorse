class UserProfileChanger extends ChangerPage{
	constructor(){
		let creator = new UserCreatorClass(),
			necessaryAttributes = [];
		super(creator, necessaryAttributes);	
	}
}