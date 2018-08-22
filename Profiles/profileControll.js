var Profil = Profil || {};

/** 
 * namespace Controll 
 * @memberof! Profil
 * @param{string} changeButtonId, id of changeButton
 * @param{string} okayButtonId, id of the okayButton
 * @param{string} delteButtonId, id of the delteButton
 * @description returns an instance of <code>Profil.GeneralProfileControll</code>
 */

Profil.Controll = function(changeButtonId, okayButtonId, delteButtonId){
	
	const EVENT_TYPE ={
		CHANGE : "onChange",
		OK: "onOkay",
		DELETE: "onDelete",
	}	
	return	profileControll = Profil.GeneralProfileControll(changeButtonId, okayButtonId, delteButtonId, EVENT_TYPE.CHANGE, EVENT_TYPE.OK, EVENT_TYPE.DELETE);

}