var RegularDatesPage = RegularDatesPage || {};

/**
 * @instance RegularDatesPage.RegularDatesPageControll 
 * @memberof! RegularDatesPage
 * @param {string} deleteButtonClass, class of the delte buttons
 * @param {string} changeButtonClass, class of the change buttons
 * @param {string} backButtonId, id of the backbutton
 * @description the modul <code>RegularDatesPage.RegularDatesPageControll </code> is a view controll modul
 * to manage all buttons of the regular dates. Each regular date has two buttons. The page has a backbutton.
 */

RegularDatesPage.RegularDatesPageControll = function(deleteButtonClass, changeButtonClass, backButtonId, newDateId, newSuggestionId){
		let that = new EventTarget(),
			backButton,
			newDateButton,
			newSuggestionButton;


	/**
	* @function init
	* @public
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @description Initialize this modul
	*/
	function init(){
		initNewDatesAndSuggestionControlls();
		initBackButtonControlls();						
	}

	function initNewDatesAndSuggestionControlls(){
		newDateButton = document.getElementById(newDateId);
		newSuggestionButton = document.getElementById(newSuggestionId);
		newDateButton.addEventListener("click", handleNewDate);
		newSuggestionButton:addEventListener("click", handleNewSuggestion);
	}

	function handleNewDate(){
		sendEvent("onNewDate");
	}

	function handleNewSuggestion(){
		sendEvent("onNewSuggestion");
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
			id = li.getAttribute("regulardateid");
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
		sendEvent("onChangeClick", id);
	}

	/**
	* @function initBackButtonControlls
	* @private
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @description adds "click" listener to the backbutton
	*/
	function initBackButtonControlls(){
		backButton = document.getElementById(backButtonId);
		backButton.addEventListener("click", handleBack)
	}

	/**
	* @function handleBack
	* @private
	* @memberof! RegularDatesPage.RegularDatesPageControll 
	* @instance
	* @description  sends event of the type "onBackButtonClicked" to 
	* inform other moduls that the user wants to change the page
	*/
	function handleBack(){
		let event = new Event("onBackButtonClicked");
		that.dispatchEvent(event);
	}

	that.init = init;
	that.initListControlls = initListControlls;
	return that;
}
