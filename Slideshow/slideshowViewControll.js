var Slideshow = Slideshow ||{};

/** 
 * namespace ViewControll  
 * @memberof! Slideshow 
 * @param{object} domElements, domELements for the viewcontroll
 * @description <code>Slideshow.ViewControll</code> is the view controll of Slideshow
 * it handles the button clicks and changes the value which is shown to the user in progressBox
 */

Slideshow.ViewControll = function(domElements){
	let that = new EventTarget(),
		backButton,
		forwardButton,
		progressBox,
		numberOfPages;

	/**
	* @function init
	* @public
	* @memberof! Slideshow.ViewControll  
	* @instance
	* @description Initialize this modoul.
	*/
	function init(){
		backButton = domElements.backButton;
		forwardButton = domElements.forwardButton;
		progressBox = domElements.progressBox;
		numberOfPages = domElements.numberOfPages;
		addEventListeners();
	}

	/**
	* @function addEventListeners
	* @private
	* @memberof! Slideshow.ViewControll  
	* @instance
	* @description adds event listeners to the buttons
	*/
	function addEventListeners(){
		backButton.addEventListener("click", sendBackEvent);
		forwardButton.addEventListener("click", sendForwardEvent);
	}

	/**
	* @function sendBackEvent
	* @private
	* @memberof! Slideshow.ViewControll  
	* @instance
	* @description called if backawrs button  is clicked
	*/
	function sendBackEvent(){
		sendEvent("onBackwards");
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! Slideshow.ViewControll  
	* @instance
	* @param {string}, type event type
	* @description sends event of type type
	*/
	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	/**
	* @function sendBackEvent
	* @private
	* @memberof! Slideshow.ViewControll  
	* @instance
	* @description called if forward button  is clicked
	*/
	function sendForwardEvent(){
		sendEvent("onForward");
	}

	/**
	* @function setPageNumber
	* @public
	* @memberof! Slideshow.ViewControll  
	* @instance
	* @param {number}, number
	* @description setter for the progressbox.
	* the progressbox shows the user the current pagenumber adn the total number
	* of apges e.g. "6/10"
	*/
	function setPageNumber(number){
		let progress =  number+"/"+ numberOfPages;
		progressBox.innerHTML = progress;
	}

	that.init = init;
	that.setPageNumber = setPageNumber;
	return that;
}