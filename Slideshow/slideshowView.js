var Slideshow = Slideshow ||{};

Slideshow.SlideshowView = function(domElements){
	let that = new EventTarget(),
		backButton,
		forwardButton,
		progressBox,
		numberOfPages;

	function init(){
		backButton = domElements.backButton;
		forwardButton = domElements.forwardButton;
		progressBox = domElements.progressBox;
		numberOfPages = domElements.numberOfPages;
		addEventListeners();
	}

	function addEventListeners(){
		backButton.addEventListener("click", sendBackEvent);
		forwardButton.addEventListener("click", sendForwardEvent);
	}

	function sendBackEvent(){
		sendEvent("onBackwards");
		console.log("back");
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function sendForwardEvent(){
		sendEvent("onForward");
		console.log("onForward");
	}

	function setPageNumber(number){
		let progress =  numberOfPages+"/"+number;
		progressBox.innerHTML = progress;
	}

	that.init = init;
	that.setPageNumber = setPageNumber;
	return that;
}