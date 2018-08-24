var HorseCreator = HorseCreator || {};

/**
 * namespace HorseCreatorModel
 * @memberof! HorseCreator
 * @param {object} newAttributes, attributes of the model
 * @description uses and instance of the class <code>CreatorModel</code> to create
 * a model for the HorseCreator. retunrs the instance.
 */
HorseCreator.HorseCreatorModel = function(newAttributes){
	const ATTRIBUTES = {
				name: {value:undefined,
					   isNecessary: false,
				},
				owner: {value:undefined,
					   isNecessary: false,
				},
				race: {value:undefined,
					   isNecessary: false,
				},
				birth : {value:undefined,
					   isNecessary: false,
				},
				photo: {value:undefined,
					   isNecessary: false,
				},
				sex : {value:undefined,
					   isNecessary: false,
				},
				height: {value:undefined,
					   isNecessary: false,
				},
				raiser: {value:undefined,
					   isNecessary: false,
				},
				comp: {value: undefined,
						isNecessary: false,
				},
			};

	let attributes = newAttributes || ATTRIBUTES;
	that = CreatorModel(attributes);
	return that;

};
