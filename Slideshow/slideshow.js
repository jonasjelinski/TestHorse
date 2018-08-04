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
		console.log("domElements", domElements);
		slideshowView = new Slideshow.SlideshowView(domElements);
		slideshowView.init();
	}	

	function addListeners(){
		modelListeners();
		addViewListeners();
	}

	function modelListeners(){
		slideshowModel.addEventListener("onPageChange", handlePageChange);
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
		slideshowView.addEventListener("onBackwards", handleForward);
		slideshowView.addEventListener("onForward", handleBackwards);	
	}

	function handleForward(){
		slideshowModel.setNextPage();
	}

	function handleBackwards(){
		slideshowModel.setPreviousPage();
	}
	
	that.init = init;
	return that;
} 