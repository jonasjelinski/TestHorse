var HorseProfileChanger = HorseProfileChanger || {};

HorseProfileChanger= function(attributes){
	let necessaryAttributes = ["name"],
	creator = HorseCreatorPage.StandardPage(attributes).horseCreator,
	that = new ChangerPage(creator, necessaryAttributes);
	return that;
}