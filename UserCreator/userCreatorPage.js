var UserCreatorPage = UserCreatorPage ||{};

/** 
 * namespace UserCreatorPage 
 * @memberof! UserCreatorPage
 * @description page with is used to create a user. Creates and instance
 * of the UserCreatorPage.StandardPage and returns that instance.
 * Doenst have a dbRequester modul to save the user because the attributes 
 * of the user will be send to UserProfileSaver to save the user into the database.
 */

UserCreatorPage = function(){

	const ATTRIBUTES = {
				name: {value:undefined,
					   isNecessary: true,
				},
				dateOfBirth:{value:undefined,
					   isNecessary: true,					
				},
				email: {value:undefined,
					   isNecessary: true,
				},
				password: {value:undefined,
					   isNecessary: true,
				},				
			};

	let that = UserCreatorPage.StandardPage(ATTRIBUTES);
	return that;
}