var Pages = Pages || {};

Pages.PageCreator = function(domElement){
	let that = {};

		function createPage(htmlString){
			domElement.innerHTML = htmlString;
		}		

		that.createPage = createPage;
		return that;
}