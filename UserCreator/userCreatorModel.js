var UserCreator = UserCreator || {};

/** 
 * namespace UserCreator 
 * @memberof! UserCreatorModel
 * @param {object} newAttributes, attributes of the model
 * @description uses and instance of the class <code>CreatorModel</code> to create
 * a model for the UserCreatorModel. returns the instance.
 */

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