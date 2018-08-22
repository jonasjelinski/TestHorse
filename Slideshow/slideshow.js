var Slideshow = Slideshow ||{};

/** 
 * namespace Slideshow  
 * @memberof! Slideshow 
 * @param{string} forwardButtonId, id of the button to show the next side of the slideshow
 * @param{string} backwardsButtonId, id of the button to show the previous side of the slideshow
 * @param{string} progressBoxId, id of the box to show the user on which page he is e.g. "7/10"
 * @param{number} numberOfPages, numner of pages of the slideshow
 * @param{array} pages, array full of strings, decribing the pages in html
 * @param{string} innerPageId, id of the domElement in which the sliderpage is shown
 * @description <code>Slideshow</code> is a modul which shows a simple slideshow.
 */

Slideshow = function(forwardButtonId, backwardsButtonId, progressBoxId, numberOfPages, pages, innerPageId){
	let that = new EventTarget(),
		slideShowProgress,
		slideShowPageChanger,
		currentPage;

	/**
	* @function init
	* @public
	* @memberof! Slideshow  
	* @instance
	* @description Initialize this modoul.
	*/
	function init(){
		initModuls();
		addListeners();
	}

	/**
	* @function initModuls
	* @private
	* @memberof! Slideshow  
	* @instance
	* @description Initialize the , SlideshowProgress and PageChanger
	*/
	function initModuls(){
		slideShowProgress = new Slideshow.SlideshowProgress(forwardButtonId, backwardsButtonId, progressBoxId, numberOfPages);
		slideShowPageChanger = new Slideshow.PageChanger(innerPageId, pages);
		slideShowProgress.init();
		slideShowPageChanger.init();
	}

	/**
	* @function addListeners
	* @private
	* @memberof! Slideshow  
	* @instance
	* @description adss listeners to slideShowProgress
	*/
	function addListeners(){
		slideShowProgress.addEventListener("onPageChange", handlePageChange);
		slideShowProgress.addEventListener("slideShowIsOver", handleSlideShowIsOver);
	}

	/**
	* @function showFirstPage
	* @private
	* @memberof! Slideshow  
	* @instance
	* @description shows the first page to the user
	*/
	function showFirstPage(){
		let firstPage = 1;
		slideShowPageChanger.setPage(firstPage);
	}

	/**
	* @function handlePageChange
	* @private
	* @memberof! Slideshow  
	* @instance
	* @param{event} event, contains the pageNumber
	* @description sends the number of the page which is shown at the moment with an event
	*/
	function handlePageChange(event){
		currentPage = event.details.pageNumber;		
		sendPageNumber(currentPage);
	}

	/**
	* @function sendPageNumber
	* @private
	* @memberof! Slideshow  
	* @instance
	* @param{number} pageNumber
	* @description sends the pageNumber with an event
	*/
	function sendPageNumber(pageNumber){
		let event = new Event("onPageChange");
			event.details = {};
			event.details.pageNumber = pageNumber;
		that.dispatchEvent(event);
	}

	/**
	* @function handleSlideShowIsOver
	* @private
	* @memberof! Slideshow  
	* @instance
	* @description tells other moduls that the slideshow is over
	*/
	function handleSlideShowIsOver(){
		let event = new Event("slideShowIsOver");
		that.dispatchEvent(event);
	}

	/**
	* @function setPage
	* @private
	* @memberof! Slideshow  
	* @instance
	* @param{number} pageNumber
	* @description changes the dom, filling in with the page, with the number pageNumber
	*/
	function setPage(pageNumber){
		slideShowPageChanger.setPage(pageNumber);
	}

	/**
	* @function setPageCanChange
	* @public
	* @memberof! Slideshow  
	* @instance
	* @description setter if change can changer or not
	*/
	function setPageCanChange(booleanValue){
		slideShowProgress.setPageCanChange(booleanValue);
	}

	that.init = init;
	that.setPage = setPage;
	that.showFirstPage = showFirstPage;
	that.setPageCanChange = setPageCanChange;
	return that;
}