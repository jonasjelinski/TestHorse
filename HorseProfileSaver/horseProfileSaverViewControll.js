var HorseProfileSaver = HorseProfileSaver || {};

/** 
 * namespace ViewControll
 * @memberof! HorseProfileSaver
 * @param{string} pageId, id of the page in which the profil should be displayed
 * @param{object} templateString, templateString for creating the html elements with the attributes of profile
 * @param{object} data, attributes of the horse which are displayed by this page.
 * @description returns an instance of <code>Profil.ProfileViewAndControll</code>
 */
HorseProfileSaver.ViewControll = function(pageId, templateString, data){
	const CHANGE_BUTTON_ID = "horseSaverChange",
			OKAY_BUTTON_ID = "horseSaverOk",
			DELETE_BUTTON_ID = "horseSaverDelete";					
	return Profil.ProfileViewAndControll(pageId, templateString, data, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);
}