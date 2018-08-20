var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver.Model = function(){
	let that = {},
		attributes,
		isNewUser = true,
		userData;

	function init(newUser) {
		userData = newUser;		
	}

	function createNewUser(){
		isNewUser= true;
	}

	function updateOldUser(){
		isNewUser = false;
	}

	function getUserData(){
		return userData;
	}

	function getIsNewUser(){
		return isNewUser;
	}	

	that.init = init;
	that.getUserData = getUserData;
	that.getIsNewUser = getIsNewUser;
	that.createNewUser = createNewUser;
	that.updateOldUser = updateOldUser;
	return that;
}