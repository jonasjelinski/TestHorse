var Slideshow = Slideshow ||{};

Slideshow = function(forwardButtonId, backwardsButtonId, progressBoxId, numberOfPages){
	let that = new EventTarget(),
		slideshowModel,
		slideshowView,
		forwardButton,
		backwardsButton,
		progressBox;

	function init(){
		getDomElements();
		initModel();
		initView();		
		addListeners();
	}

	function getDomElements(){
		forwardButton = document.getElementById(forwardButtonId);
		backwardsButton = document.getElementById(backwardsButtonId);
		progressBox = document.getElementById(progressBoxId);
	}

	function initModel(){
		slideshowModel = new Slideshow.SlideshowModel(numberOfPages);
		slideshowModel.init();
	}

	function initView(){
		let domElements = {
			backButton: backwardsButton,
			forwardButton: forwardButton,
			progressBox: progressBox,
			numberOfPages: numberOfPages,
		}
		slideshowView = new Slideshow.SlideshowView(domElements);
		slideshowView.init();
	}	

	function addListeners(){
		modelListeners();
		addViewListeners();
	}

	function modelListeners(){
		slideshowModel.addEventListener("onPageChange", handlePageChange);
		slideshowModel.addEventListener("slideShowIsOver", handleSlideShowIsOver);
	}

	function handlePageChange(event){
		let pageNumber = event.details.pageNumber;
		slideshowView.setPageNumber(pageNumber);
		sendPageNumber(pageNumber);
	}

	function sendPageNumber(number){
		let event = new Event("onPageChange");
		event.details = {};
		event.details.pageNumber = number;
		that.dispatchEvent(event);
	}

	function addViewListeners(){
		slideshowView.addEventListener("onBackwards", handleBackwards);
		slideshowView.addEventListener("onForward", handleForward);				
	}

	function handleForward(){
		slideshowModel.setNextPage();
	}

	function handleBackwards(){
		slideshowModel.setPreviousPage();
	}

	function handleSlideShowIsOver(){
		let event = new Event("slideShowIsOver");
		that.dispatchEvent(event);
	} 
	
	that.init = init;
	return that;
} 