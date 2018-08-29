var Slideshow = Slideshow ||{};

/** 
 * namespace SlideshowProgress  
 * @memberof! Slideshow 
 * @param{string} forwardButtonId, id of the button to show the next side of the slideshow
 * @param{string} backwardsButtonId, id of the button to show the previous side of the slideshow
 * @param{string} progressBoxId, id of the box to show the user on which page he is e.g. "7/10"
 * @param{number} numberOfPages, numner of pages of the slideshow
 * @description <code>SlideshowProgress</code> is the model which handels the communcation between
 * the model, view and controll of the slideshow. It has all logical information of the slideshow, but not the pages.
 */

Slideshow.SlideshowProgress = function(forwardButtonId, backwardsButtonId, progressBoxId, numberOfPages){
	let that = new EventTarget(),
		slideshowModel,
		slideshowView,
		forwardButton,
		backwardsButton,
		progressBox;

	/**
	* @function init
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description Initialize this modoul.
	*/	
	function init(){
		getDomElements();
		initModel();
		initView();		
		addListeners();
	}

	/**
	* @function getDomElements
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description Gets the domElements through the ids
	*/
	function getDomElements(){
		forwardButton = document.getElementById(forwardButtonId);
		backwardsButton = document.getElementById(backwardsButtonId);
		progressBox = document.getElementById(progressBoxId);
	}

	/**
	* @function initModel
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description Initialize the model of the slideshow
	*/
	function initModel(){
		slideshowModel = new Slideshow.SlideshowModel(numberOfPages);
		slideshowModel.init();
	}

	/**
	* @function initView
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description Initialize the view of the slideshow
	*/
	function initView(){
		let domElements = {
			backButton: backwardsButton,
			forwardButton: forwardButton,
			progressBox: progressBox,
			numberOfPages: numberOfPages,
		}
		slideshowView = new Slideshow.ViewControll(domElements);
		slideshowView.init();
	}

	/**
	* @function addListeners
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description adds the listener to view and model
	*/
	function addListeners(){
		addModelListeners();
		addViewListeners();
	}

	/**
	* @function addModelListeners
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description adds the listener to the model
	*/
	function addModelListeners(){
		slideshowModel.addEventListener("onPageChange", handlePageChange);
		slideshowModel.addEventListener("slideShowIsOver", handleSlideShowIsOver);
	}

	/**
	* @function handlePageChange
	* @private
	* @memberof! SlideshowProgress  
	* @instance
	* @param{event} event, contains the pageNumber
	* @description sends the number of the page which is shown at the moment with an event
	*/
	function handlePageChange(event){
		let pageNumber = event.details.pageNumber;
		slideshowView.setPageNumber(pageNumber);
		sendPageNumber(pageNumber);
	}

	/**
	* @function sendPageNumber
	* @private
	* @memberof! SlideshowProgress  
	* @instance
	* @param{number} number
	* @description sends the number with an event
	*/
	function sendPageNumber(number){
		let event = new Event("onPageChange");
		event.details = {};
		event.details.pageNumber = number;
		that.dispatchEvent(event);
	}

	/**
	* @function addViewListeners
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description adds the listener to the view
	*/
	function addViewListeners(){
		slideshowView.addEventListener("onBackwards", handleBackwards);
		slideshowView.addEventListener("onForward", handleForward);				
	}

	/**
	* @function handleForward
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description called if slideshow progresses
	*/
	function handleForward(){
		slideshowModel.setNextPage();
	}

	/**
	* @function handleForward
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description called if slideshow goes backwards
	*/
	function handleBackwards(){
		slideshowModel.setPreviousPage();
	}

	/**
	* @function handleSlideShowIsOver
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description called if slideshow is over
	*/
	function handleSlideShowIsOver(){
		let event = new Event("slideShowIsOver");
		that.dispatchEvent(event);
	}

	/**
	* @function setPageCanChange
	* @public
	* @memberof! SlideshowProgress  
	* @instance
	* @description allowToChange the page or not
	*/
	function setPageCanChange(booleanValue){
		slideshowModel.setPageCanChange(booleanValue);
	} 

	function setPage(pageNumber){
		slideshowModel.setPageNumber(pageNumber);
		slideshowView.setPageNumber(pageNumber);
	}
	
	that.init = init;
	that.setPageCanChange = setPageCanChange;
	that.setPage = setPage;
	return that;
} 