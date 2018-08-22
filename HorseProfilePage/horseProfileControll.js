var HorseProfilePage = HorseProfilePage || {};

/** 
 * namespace HorseProfile 
 * @memberof! HorseProfilePage
 * @param{string} pageId, id of the page in which the profil should be displayed
 * @param{object} templateString, templateString for creating the html elements with the attributes of profile
 * @param{object} data, attributes of the horse which are displayed by this page.
 * @description returns an instance of <code>Profil.ProfileViewAndControll</code>
 */
HorseProfilePage.HorseProfilePageViewControll = function(pageId, templateString, data){
	const CHANGE_BUTTON_ID = "horseProfileChange",
			OKAY_BUTTON_ID = "horseProfileOk",
			DELETE_BUTTON_ID = "horseProfileDelete";
					
	return Profil.ProfileViewAndControll(pageId, templateString, data, CHANGE_BUTTON_ID, OKAY_BUTTON_ID, DELETE_BUTTON_ID);

}  