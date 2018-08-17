var HorseCreatorPage = HorseCreatorPage ||{};

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

	let that = new HorseCreatorPage.StandardPage(ATTRIBUTES);
	return that;
}