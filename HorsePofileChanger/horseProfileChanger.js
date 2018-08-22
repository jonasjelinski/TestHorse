var HorseProfileChanger = HorseProfileChanger || {};

/** 
 * namespace HorseProfileChanger 
 * @memberof! HorseProfileChanger
 * @description Creates and instance of the <code>ChangerPage</code> an returns that.
 * Uses the <code>Creator</code> of <code>HorseCreatorPage.StandardPage</code>
 * attributes are empty because they will later be given to the HorseProfileChanger
 * in the modul <code>pages</code> from other moduls
 */
HorseProfileChanger = function(){
	let necessaryAttributes = [],
	attributes = {},
	creator = HorseCreatorPage.StandardPage(attributes).horseCreator;
	changerPage = new ChangerPage(creator, necessaryAttributes);

	return changerPage;
}