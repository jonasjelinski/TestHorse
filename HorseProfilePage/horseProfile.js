var HorseProfilePage = HorseProfilePage || {};

/** 
 * namespace HorseProfile 
 * @memberof! HorseProfilePage
 * @description returns an instance of <code>Profil</code>
 */
HorseProfilePage.HorseProfile = function(){
	"user strict";
	const PAGE_ID = "horseProfile",
	TEMPLATE_ID = "horseProfileTemplate",
	REQUEST_FUNCTION = "getHorseData";

	return Profil(PAGE_ID, TEMPLATE_ID, HorseProfilePage.HorseProfilePageViewControll);
} 