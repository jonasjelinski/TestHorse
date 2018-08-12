var UserCreatorPage = UserCreatorPage ||{};

UserCreatorPage = function(){

	const ATTRIBUTES = {
				name: {value:undefined,
					   isNecessary: false,
				},
				email: {value:undefined,
					   isNecessary: false,
				},
				password: {value:undefined,
					   isNecessary: false,
				},				
			};

	let userCreator = new UserCreator(),
		dbRequester = new UserCreator.DBRequester();
		that = new CreatorPage(ATTRIBUTES, userCreator);

	return that;
}