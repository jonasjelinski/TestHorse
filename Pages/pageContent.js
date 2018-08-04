var Pages = Pages || {};

/**
 * @namespace Pages
 * @memberOf! Pages
 * @description Contains the Strings of the different pages as constants and returns them.
 */
Pages.PageContent = function (){
	let that = {};
	const MAIN_PAGE = ' <content>'+
						'<ul id="horseList" class="frames">'+
						'</ul>'+
 					'</content>'+

'<script type="text/template" id="ul-element">'+
'<li draggable="true" tid = <%= id %>>'+
	'<p ><%= name %></p>'+
'</li>'+
'</script> '
	
	that.MAIN_PAGE = MAIN_PAGE;
	return that;
};
 
