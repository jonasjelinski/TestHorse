var UserCreator = UserCreator || {};

UserCreator.UserCreatorModel = function(newAttributes){
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

	let that = CreatorModel(ATTRIBUTES);
	return that;
};