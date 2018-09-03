/**
 * @class CreatorView
 * @description Class <code>CreatorView</code> view of the Creator
 * trough a listener observer pattern
 * @param{valueBoxId} id of the valueBox
 * @param{inputId} id of the input
 * @description gets the dom-Elements from the dom with the ids of the domElements
 	* this.input is the input element where the use puts the values in e.g. a dropdown menu or an input-form 
	* this.valueBox is a domElement which contains the attributes "value" and "property"
	*"property" is the name of the attribute which should be save by the creator
	*"value" is the value of the attribute which should be save by the creator
	* "value" is empty at the initialisation, if the user puts a value in the input
	* the value is saved in "value" so the entityCreator can read them with is own view
	* and save it ins its modul. By this way the entityCreator can be easily extended
	* without changing code in its modul
 */

class CreatorView extends EventTarget{	
	constructor(valueBoxId, inputId){
		super();
		this.valueBoxId = valueBoxId;
		this.inputId = inputId;
	}

	/**
	* @function init
	* @public
	* @memberof! CreatorView
	* @instance
	* @description Initialize this.creator gets the domElements and its listener
	*/ 	
	init(){
		this.getDomElements();
		this.addListeners();
	}

	/**
	* @function getDomElements
	* @public
	* @memberof! CreatorView
	* @instance
	* @description gets the dom-Elements from the dom with the ids of the domElements
	*/ 	
	getDomElements() {
		this.valueBox = document.getElementById(this.valueBoxId);
		this.input = document.getElementById(this.inputId);		
	}


	/**
	* @function addListeners
	* @public
	* @memberof! CreatorView
	* @instance
	* @description adds an inputListener to input, so this class recognizes if the user
	* uses the input
	*/
	addListeners() {
		this.input.addEventListener("input", this.changeValueBoxAfterInput.bind(this));
	}

	/**
	* @function changeValueBoxAfterInput
	* @public
	* @memberof! CreatorView
	* @instance
	* @description sets the attribute of valueBox with the value of the input
	* so entityCreator view can read it
	*/
	changeValueBoxAfterInput() {		
		let text = this.input.value;
		this.valueBox.setAttribute("value", text);
		this.sendEvent("onInput");
	}

	/**
	* @function sendEvent
	* @public
	* @memberof! CreatorView
	* @instance
	* @param{string} type, type of the event
	* @description send the event of type "type"
	*/ 	
	sendEvent(type){
		let event = new Event(type);
		this.dispatchEvent(event);
	}

	/**
	* @function setInputValue
	* @public
	* @memberof! CreatorView
	* @instance
	* @param {string} inputvalue, value of the input
	* @description sets the value of the input this is useful to fill the input
	* if there is an old value for the input
	*/
	setInputValue(inputValue) {
		this.input.value = inputValue;
	}

	/**
	* @function setValueBox
	* @public
	* @memberof! CreatorView
	* @instance
	* @param {string} inputvalue, value of the valueBox
	* @description sets the value of the input this is useful to fill the input
	* if there is an old value for the valueBox
	*/
	setValueBox(value){
		this.valueBox.setAttribute("value", value);
	}

	/**
	* @function getCurrentAttribute
	* @public
	* @memberof! CreatorView
	* @instance
	* @description returns the "property" of the valueBox
	*/
	getCurrentAttribute(){
		let attribute = this.valueBox.getAttribute("property");
		return attribute;
	}
};