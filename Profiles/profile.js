var Profil = Profil || {};

/** 
 * namespace Profil 
 * @memberof! Profil
 * @param{string} pageId, id of the page in which the profil should be displayed
 * @param{string} templateId, id of the template to create a new profil
 * @param{string} changeButtonId, id of the changeButton
 * @param{string} okayButtonId, id of the okayButton
 * @param{string} delteButtonId, id of the deleteButonn
 * @description basic modul for creating either a new <code>HorseProfil</code> 
 * or a a new <code>UserProfil</code>.Is basically a view controll modul, without a model or a databse requester.
 */

Profil = function(pageId, templateId, changeButtonId, okayButtonId, delteButtonId){
	"use strict";

	const POPUP_MESSAGE = "Wirklich löschen?";

	let that = new EventTarget(),
		profilViewTemplateString,
		attributes,
		viewControll,
		popup;

	/**
	* @function init
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @param{object} newAttributes, attributes for the profile
	* @description Initialize this page.
	*/
	function init(newAttributes){
		console.log("templateId",templateId);
		profilViewTemplateString = document.getElementById(templateId).innerHTML;
		attributes = newAttributes;	
		initViewControll();		
		popup = Popup(POPUP_MESSAGE);
		popup.init();
		addEventListeners();				
	}


	/**
	* @function initViewControll
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @description Initialize an instance of the viewControllConstructor.
	*/	
	function initViewControll(){		
		viewControll = new Profil.ProfileViewAndControll(pageId, profilViewTemplateString, attributes, changeButtonId, okayButtonId, delteButtonId);
		viewControll.init();		
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @description adds event listener to the profil
	*/
	function addEventListeners(){
		addViewControllListeners();
		addPopupListeners();
	}

	/**
	* @function addViewControllListeners
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @description adds evnetListener to the viewControll,  so this page knows
	* when the user wants to change or delte the profil which is displayed 
	* or if he doesnt want to do anything.
	*/
	function addViewControllListeners(){
		viewControll.addEventListener("onChange", handleChange );
		viewControll.addEventListener("onOkay", handleOkay );
		viewControll.addEventListener("onDelete", handleDelete );
	}


	/**
	* @function handleChange
	* @private
	* @memberof! HorseProfilePage  
	* @instance
	* @description sends the attributes of the profil with an event
	* so the another modul can change this profil
	*/		
	function handleChange(){
		console.log("handleChange");
		sendEvent("onChangeProfile", attributes);
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! HorseProfilePage
	* @instance
	* @param {string} type,type of event
	* @description sends event of type "type"
	*/
	function sendEvent(type, data){
		let event = new Event(type);
		if(data){
			event.details = {};
			event.details.attributes = data; 
		}
		that.dispatchEvent(event);
	}

	/**
	* @function handleOkay
	* @private
	* @memberof! HorseProfilePage
	* @instance
	* @description sends event of type "onProfileOkay" and the attributes
	*/
	function handleOkay(){
		console.log("handleOkay");
		sendEvent("onProfileOkay",attributes);
	}

	/**
	* @function handleDelete
	* @private
	* @memberof! HorseProfilePage
	* @instance
	* @description shows a popup if the user wants to delte this profil
	*/
	function handleDelete(){
		popup.setPopupVisible();
	}

	/**
	* @function addPopupListeners
	* @private
	* @memberof! HorseProfilePage
	* @instance
	* @description listens to the popup if the user clicked yes, calls handleYes
	*/
	function addPopupListeners(){
		popup.addEventListener("onYes", handleYes);
	}

	/**
	* @function handleYes
	* @private
	* @memberof! HorseProfilePage
	* @instance
	* @description sends event of type "onDeleteProfile"
	*/
	function handleYes(){
		console.log("handleYes");
		sendEvent("onDeleteProfile");
	}

	that.init = init;
	return that;
}