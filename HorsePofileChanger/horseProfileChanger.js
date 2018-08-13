var HorseProfileChanger = HorseProfileChanger || {};

HorseProfileChanger = function(attributes){
	let necessaryAttributes = [],
	creator = HorseCreatorPage.StandardPage(attributes);
	that = new ChangerPage(creator, necessaryAttributes);

	return that;
}