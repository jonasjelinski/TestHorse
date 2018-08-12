var HorseCreator = HorseCreator || {};

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
			};

	let attributes = newAttributes || ATTRIBUTES;
	that = CreatorModel(attributes);
	return that;
	
};