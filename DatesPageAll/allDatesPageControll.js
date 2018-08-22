var DatesPageAll = DatesPageAll || {};

/**
 * @instance DatesPageAll.DatesPageControll
 * @memberof! DatesPageAll
 * @param {object} domElements, object which contains the domELements
 * @description the modul <code>DatesPageAll.DatesPageControll</code> is a view controll modul
 * to manage three buttons
 */

DatesPageAll.DatesPageControll = function(domElements){
	"user strict";
	let that = new EventTarget(),
		regularDatesButton,
		singleDatesButton;

	/**
	* @function init
	* @public
	* @memberof! DatesPageAll.DatesPageControll
	* @instance
	* @description Initialize this modul.Read the properties of domElements
	*/
	function init(){
		regularDatesButton = domElements.regularDatesButton;
		singleDatesButton = domElements.singleDatesButton;
		cancelButton = domElements.cancelButton;
		addEventListeners();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! DatesPageAll.DatesPageControll
	* @instance
	* @description adds event listener to call functions if a button has been clicked
	*/
	function addEventListeners(){
		regularDatesButton.addEventListener("click", handleRegularClick);
		singleDatesButton.addEventListener("click", handleSingleClick);
		cancelButton.addEventListener("click", handleCancelClick);
	}

	/**
	* @function handleRegularClick
	* @private
	* @memberof! DatesPageAll.DatesPageControll
	* @instance
	* @description sends event of type "onRegularClicked"
	*/
	function handleRegularClick(){
		sendEvent("onRegularClicked");
	}


	/**
	* @function sendEvent
	* @public
	* @memberof! DatesPageAll.DatesPageControll
	* @instance
	* @param {string} type,type of event
	* @description sends event of type "type"
	*/
	function sendEvent(type){
			let event = new Event(type);
			that.dispatchEvent(event);
	}

	/**
	* @function handleSingleClick
	* @private
	* @memberof! DatesPageAll.DatesPageControll
	* @instance
	* @description sends event of type "onSingleClicked"
	*/
	function handleSingleClick(){
		sendEvent("onSingleClicked");
	}

	/**
	* @function handleCancelClick
	* @private
	* @memberof! DatesPageAll.DatesPageControll
	* @instance
	* @description sends event of type "onCancelDatesPage"
	*/
	function handleCancelClick() {
		sendEvent("onCancelDatesPage");
	}

	that.init = init;
	return that; 	
}