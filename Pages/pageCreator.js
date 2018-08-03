var Pages = Pages || {};

/**
 * @namespace PageCreator
 * @memberOf! Pages
 * @description Overwrites the innerHTML of the given <code>domElement</code> 
 * @param {object} domElement html-Object e.g. a "div" which contains the html-text of the page
 */
Pages.PageCreator = function(domElement){
	let that = {};

		/**
		* @function createPage
		* @public
		* @memberof! Pages.PageCreator  
		* @instance
		* @param {String} htmlString String containing the html-text.
		* @description Overwrites the innerHTML of the given <code>domElement</code> with the given parameter htmlString
		*/ 
		function createPage(htmlString){
			domElement.innerHTML = htmlString;
		}		

		that.createPage = createPage;
		return that;
}