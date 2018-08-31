var DatesPageAll = DatesPageAll || {};

/**
 * @instance DatesPageAll.DatesPageControll
 * @memberof! DatesPageAll
 * @param {object} domElements, object which contains the domELements
 * @description the modul <code>DatesPageAll.DatesPageControll</code> is a view controll modul
 * to manage three buttons
 */

DatesPageAll.DatesPageControll = function(domElements, deleteButtonClass, changeButtonClass){
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
	* @function initListControlls
	* @private
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @description gets all buttons of the classes "deleteButtonClass" and "changeButtonClass"
	* uses the arrays to add listeners to the buttons
	*/
	function initListControlls(){
		let delteButtons = document.getElementsByClassName(deleteButtonClass),
			changeButtons = document.getElementsByClassName(changeButtonClass);
		addListener(delteButtons, handleDelete);
		addListener(changeButtons, handleChange);		
	}

	/**
	* @function addListener
	* @private
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @param{array}, buttons
	* @param{function}, handler, a function which is called if the event "click" is dispatched
	* @description adds a "click" listener to each button
	*/
	function addListener(buttons, handler){
		for(let i = 0; i < buttons.length; i++){
			let button = buttons[i];
			button.addEventListener("click", handler);				
		}
	}

	/**
	* @function handleDelete
	* @private
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @param{event}, event, contains the event.target
	* @description sends the id of the domElement which has called this function
	*/
	function handleDelete(event){
		let id = getIdFromEvent(event);
		sendEvent("onDeleteClick", id);
	}

	/**
	* @function getIdFromEvent
	* @private
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @param{event}, event, contains the event.target
	* @description returns the id of the event.target
	*/
	function getIdFromEvent(event) {
		let target = event.target,
			li = target.closest("li"),
			id = li.getAttribute("dateid");
		return id;
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @param{string}, type, event type
	* @param{string}, id, id to send with the event
	* @description sends the given id with an event
	*/
	function sendEvent(type, id){
		let event = new Event(type);
		if(id){
			event.details = {};
			event.details.id = id;		
		}
		that.dispatchEvent(event);			
	}

	/**
	* @function handleChange
	* @private
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @param{event}, event, contains the id of the clicked element
	* @description sends the id of the clicked element with an event
	*/
	function handleChange(event){
		let id = getIdFromEvent(event);
		console.log("getIdFromEvent", id);
		sendEvent("onChangeClick", id);
	}

	that.init = init;
	that.initListControlls = initListControlls;
	return that; 	
}