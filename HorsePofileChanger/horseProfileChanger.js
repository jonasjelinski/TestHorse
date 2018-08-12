var HorseProfileChanger = HorseProfileChanger || {};

HorseProfileChanger = function(attributes){
	let necessaryAttributes = [],
	creator = HorseCreatorPage.StandardPage(attributes).horseCreator,
	that = new ChangerPage(creator, necessaryAttributes);
	return that;
}