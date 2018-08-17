var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver.Model = function(){
	let that = {},
		attributes,
		user;

	function init(newUser) {
		user = newUser;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(user, "setUserIntoDB");
		requester.init();
	}

	function saveUserIntoDB()
	{	console.log("saveUserIntoDB", user);
		//requester.request();
	}

	that.init = init;
	that.saveUserIntoDB = saveUserIntoDB;
	return that;
}