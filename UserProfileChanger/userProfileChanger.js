var UserProfileChanger = UserProfileChanger || {};

/** 
 * namespace UserProfileChanger 
 * @memberof! UserProfileChanger
 * @description Creates and instance of the <code>ChangerPage</code> an returns that.
 * Uses the <code>Creator</code> of <code>UserCreatorPage.StandardPage</code>
 * attributes are empty because they will later be given to the UserProfileChanger
 * in the modul <code>pages</code> from other moduls during init
 */

UserProfileChanger = function(attributes){
	let necessaryAttributes = [],
	creator = UserCreatorPage.StandardPage(attributes).userCreator,
	that = new ChangerPage(creator, necessaryAttributes);
	return that;
}