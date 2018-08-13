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

	function validateInput(attribute){
		switch(attribute){
			case "email": validateEmailInput();
			break;
			case "password": validatePassword(); 
		}
	}

	function validateEmailInput(){

	}

	function validatePassword(){
		
	}
	return that;
};