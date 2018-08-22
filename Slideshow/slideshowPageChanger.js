var Slideshow = Slideshow ||{};

/** 
 * namespace PageChanger  
 * @memberof! Slideshow 
 * @param{string} innerPageId, id of the domElement in which the sliderpage is shown
 * @param{array} pages, array full of strings, decribing the pages in html
 * @description uses a PageCreator and the html-string of the array <code>pages</code>
 * to show the different pages of the slidershow
 */

Slideshow.PageChanger = function(innerPageId, pages){
	let that = {};

	/**
	* @function init
	* @private
	* @memberof! PageChanger  
	* @instance
	* @description Initialize this modoul.
	*/
	function init(){
		innerPage = document.getElementById(innerPageId);
		pageCreator = new Pages.PageCreator(innerPage);	
	}

	/**
	* @function setPage
	* @private
	* @memberof! PageChanger  
	* @instance
	* @param{number} pageNumber, number of the page which has to be shown
	* @description Gets the page with the number <code>pageNumber</code> and gives it <code>pageCreator</code>
	* <code>pageCreator</code> uses the string to append the html-elements in the string to the dom-Element <code>innerPage</code>
	*/
	function setPage(pageNumber){
		let pageHTMLString = pages[pageNumber-1];
		pageCreator.createPage(pageHTMLString);
	}

	that.init = init;
	that.setPage = setPage;
	return that;
}