class UserProfileChanger extends ChangerPage{
	constructor(){
		let creator = new UserCreatorClass(),
			dbRequester = new UserCreator.DBRequester;
		super(creator, dbRequester);	
	}
}