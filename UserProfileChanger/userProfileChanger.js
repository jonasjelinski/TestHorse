class UserProfileChanger extends ChangerPage{
	constructor(){
		let creator = new UserCreator(),
			dbRequester = new UserCreator.DBRequester;
		super(creator, dbRequester);	
	}
}