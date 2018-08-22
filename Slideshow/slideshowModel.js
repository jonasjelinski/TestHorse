var Slideshow = Slideshow || {};

/** 
 * namespace SlideshowModel  
 * @memberof! Slideshow 
 * @param{number} numberOfPages, numner of pages of the slideshow
 * @description <code>SlideshowModel</code> is the model of Slideshow
 * it contains which page is shown is shown at the moment and if the page can change
 */

Slideshow.SlideshowModel = function(numberOfPages){
	let that = new EventTarget(),
		pageNumber,
		pageCanChange = true;

	/**
	* @function init
	* @public
	* @memberof! SlideshowModel  
	* @instance
	* @description Initialize this modoul.
	*/	
	function init(){
		pageNumber = 1;
	}

	/**
	* @function setNextPage
	* @public
	* @memberof! SlideshowModel  
	* @instance
	* @description Increases the pagenumber
	*/
	function setNextPage(){
		if(pageCanChange){
			increasePageNumberAndSendIt();
		}		
	}

	/**
	* @function increasePageNumberAndSendIt
	* @private
	* @memberof! SlideshowModel  
	* @instance
	* @description increases the pagenumber and sends it
	* sends an event if the slideshow reached the last page
	*/
	function increasePageNumberAndSendIt(){
		if(!isSlideShowOver()){
			pageNumber++;
			sendPageNumber();			
		}
		else{
			sendSlideShowOverEvent();
		}
	}

	/**
	* @function isSlideShowOver
	* @private
	* @memberof! SlideshowModel  
	* @instance
	* @description return ture if the slideshow is over
	*/
	function isSlideShowOver(){
		return pageNumber === numberOfPages;
	}

	/**
	* @function sendSlideShowOverEvent
	* @private
	* @memberof! SlideshowModel  
	* @instance
	* @description sends an event that the slideshow reached the last page
	*/
	function sendSlideShowOverEvent(){
		let event = new Event("slideShowIsOver");
			event.details = {};
			event.details.pageNumber = pageNumber;
		that.dispatchEvent(event);
	}

	/**
	* @function setNextPage
	* @public
	* @memberof! SlideshowModel  
	* @instance
	* @description decreases the pagenumber and sends it
	*/
	function setPreviousPage(){	
		if(pageCanChange){
			decreasePackeNumberAndSendIt();
		}
	}
		
	/**
	* @function decreasePackeNumberAndSendIt
	* @private
	* @memberof! SlideshowModel  
	* @instance
	* @description decreases the pagenumber and sends it
	*/
	function decreasePackeNumberAndSendIt(){		
		if(!isFirstPage()){
			pageNumber--;
			sendPageNumber();		
		}	
	}

	/**
	* @function isFirstPage
	* @private
	* @memberof! SlideshowModel  
	* @instance
	* @description returns true if the pageNumber === 1
	*/
	function isFirstPage(){
		return pageNumber === 1;
	}

	/**
	* @function sendPageNumber
	* @private
	* @memberof! SlideshowModel  
	* @instance
	* @description send the pageNumber with an event
	*/
	function sendPageNumber(){
		let event = new Event("onPageChange");
			event.details = {};
			event.details.pageNumber = pageNumber;
		that.dispatchEvent(event);
	}

	/**
	* @function setPageCanChange
	* @public
	* @memberof! SlideshowModel  
	* @instance
	* @description setter if change can changer or not
	*/
	function setPageCanChange(booleanValue){
		pageCanChange = booleanValue;
	}

	that.init = init;
	that.setNextPage = setNextPage;
	that.setPreviousPage = setPreviousPage;
	that.setPageCanChange = setPageCanChange;
	return that;
}