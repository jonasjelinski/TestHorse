var UserProfileSaver = UserProfileSaver || {};

/** 
 * namespace Model
 * @memberof! UserProfileSaver
 * @description <code>UserProfileSaver.Model</code> 
 * is the model of UserProfileSaver
 * it cotnains the userData and if the ProfileSaver
 * displays a new profile or an old one
 */

UserProfileSaver.Model = function(){
	let that = {},
		attributes,
		isNewUser = true,
		userData;

	/**
	* @function init
	* @public
	* @memberof!  UserProfileSaver.DBRequester
	* @instance
	* @description Initialize this model
	*/ 
	function init(newUser) {
		userData = newUser;		
	}

	/**
	* @function createNewUser
	* @public
	* @memberof!  UserProfileSaver.DBRequester
	* @instance
	* @description sets isNewUser true
	*/ 
	function createNewUser(){
		isNewUser= true;
	}

	/**
	* @function createNewUser
	* @public
	* @memberof!  UserProfileSaver.DBRequester
	* @instance
	* @description sets isNewUser false
	*/ 
	function updateOldUser(){
		isNewUser = false;
	}

	/**
	* @function getUserData
	* @public
	* @memberof!  UserProfileSaver.DBRequester
	* @instance
	* @description return userData
	*/ 
	function getUserData(){
		return userData;
	}

	/**
	* @function getIsNewUser
	* @public
	* @memberof!  UserProfileSaver.DBRequester
	* @instance
	* @description return isNewUser
	*/
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