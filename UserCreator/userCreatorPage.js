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

	let that = UserCreatorPage.StandardPage(ATTRIBUTES);
	return that;
}