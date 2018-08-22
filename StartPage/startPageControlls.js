var StartPage = StartPage || {};

/**
 * @namespace Controlls
 * @memberOf! StartPage
 * @param{string} dateButtonClass, class of the dateButtons
 * @param{string} profileButtonClass, class of the profileButtons
 * @description <code> StartPage.Controlls</code> adds listeners to all buttons
 * of the horseBoxes and handles the events
 */

 StartPage.Controlls = function(dateButtonClass, profileButtonClass){
	"user strict";

	let that = new EventTarget(),
		backButton;

	/**
	* @function init
	* @private
	* @memberof! StartPage  
	* @instance
	* @description Initialize this modul
	*/ 
	function init(){
		initListControlls();					
	}

	/**
	* @function initListControlls
	* @private
	* @memberof! StartPage  
	* @instance
	* @description adds listernsto all buttons
	*/ 
	function initListControlls(){
		let dateButtons = document.getElementsByClassName(dateButtonClass),
			profileButtons = document.getElementsByClassName(profileButtonClass);
		addListener(dateButtons, handleDate);
		addListener(profileButtons, handleProfile);		
	}


	/**
	* @function initListControlls
	* @private
	* @memberof! StartPage  
	* @instance
	* @param {array}, buttons
	* @param {callback}, handler
	* @description adds listerns to all buttons in "buttons" and let them call "handler"
	*/ 
	function addListener(buttons, handler){
		for(let i = 0; i < buttons.length; i++){
			let button = buttons[i];
			button.addEventListener("click", handler);				
		}
	}

	/**
	* @function handleDate
	* @private
	* @memberof! StartPage  
	* @instance
	* @param {event}, event, contains the id of the target which has been clicked
	* @description gets the if of the horseBox which buttons has been clicked an sends it
	*/ 
	function handleDate(event){
		let target = event.target,
			li = target.closest("li"),
			id = li.getAttribute("horseid");			
		sendIdEvent("onDateClick", id);
	}

	/**
	* @function sendIdEvent
	* @private
	* @memberof! StartPage  
	* @instance
	* @param {string}, type, eventtype
	* @param {string}, id, id which is send
	* @description sends it the id with an event
	*/ 
	function sendIdEvent(type, id){
		let event = new Event(type);
		event.details = {};
		event.details.id = id;
		that.dispatchEvent(event);		
	}

	/**
	* @function handleProfile
	* @private
	* @memberof! StartPage  
	* @instance
	* @param {event}, event, contains the id of the target which has been clicked
	* @description gets the if of the horseBox which buttons has been clicked an sends it
	*/ 
	function handleProfile(event){
		let target = event.target,
			li = target.closest("li"),
			id = li.getAttribute("horseid");
		sendIdEvent("onProfileClick", id);
	}

	that.init = init;
	return that;
}
