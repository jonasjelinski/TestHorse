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
					   isNecessary: true,
				},
				owner: {value:undefined,
					   isNecessary: true,
				},
				race: {value:undefined,
					   isNecessary: true,
				},
				dateOfBirth: {value:undefined,
					   isNecessary: true,
				},
				sex : {value:undefined,
					   isNecessary: true,
				},
				height: {value:undefined,
					   isNecessary: true,
				},
				grower: {value:undefined,
					   isNecessary: true,
				},
				type: {value: undefined,
						isNecessary: true,
				},
			};

	let that = new HorseCreatorPage.StandardPage(ATTRIBUTES);
	return that;
}
