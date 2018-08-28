var HorseCreatorPage = HorseCreatorPage ||{};

/**
 * namespace HorseCreatorPage
 * @memberof! HorseCreatorPage
 * @description page with is used to create a horse. Creates and instance
 * of the HorseCreatorPage.StandardPage and returns that instance.
 * Doenst have a dbRequester modul to save the horse because the attributes
 * of the horse will be send to HorseProfileSaver to save the horse into the database.
 */
HorseCreatorPage = function(){

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
				dateOfBirth: {value:undefined,
					   isNecessary: false,
				},
				sex : {value:undefined,
					   isNecessary: false,
				},
				height: {value:undefined,
					   isNecessary: false,
				},
				grower: {value:undefined,
					   isNecessary: false,
				},
				type: {value: undefined,
						isNecessary: false,
				},
			};

	let that = new HorseCreatorPage.StandardPage(ATTRIBUTES);
	return that;
}
