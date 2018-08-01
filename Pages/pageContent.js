var Pages = Pages || {};

Pages.PageContent = function (){
	let that = {};
	const MAIN_PAGE = ' <content>'+
						'<ul id="horseList" class="frames">'+
						'</ul>'+
 					'</content>'+

'<script type="text/template" id="ul-element">'+
'<li draggable="true" id = <%= id %>>'+
	'<p ><%= name %></p>'+
'</li>'+
'</script> '
	
	that.MAIN_PAGE = MAIN_PAGE;
	return that;
};
 
