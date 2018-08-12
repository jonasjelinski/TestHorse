var UserProfileChanger = UserProfileChanger || {};

UserProfileChanger = function(attributes){
	let necessaryAttributes = [],
	creator = UserCreatorPage.StandardPage(attributes).userCreator,
	that = new ChangerPage(creator, necessaryAttributes);
	return that;
}