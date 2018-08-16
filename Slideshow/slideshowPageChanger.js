var Slideshow = Slideshow ||{};

Slideshow.PageChanger = function(innerPageId, pages){
	let that = {};

	function init(){
		innerPage = document.getElementById(innerPageId);
		pageCreator = new Pages.PageCreator(innerPage);	
	}

	function setPage(pageNumber){
		let pageHTMLString = pages[pageNumber-1];
		pageCreator.createPage(pageHTMLString);
	}

	that.init = init;
	that.setPage = setPage;
	return that;
}