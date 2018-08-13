var HorseProfileChanger = HorseProfileChanger || {};

HorseProfileChanger = function(){
	let necessaryAttributes = [],
	attributes = {},
	creator = HorseCreatorPage.StandardPage(attributes).horseCreator;
	that = new ChangerPage(creator, necessaryAttributes);

	return that;
}