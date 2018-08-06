var Pages = Pages || {};

/**
 * @namespace Pages
 * @memberOf! Pages
 * @description Contains the Strings of the different pages as constants and returns them.
 */
Pages.PageContent = function (){
	let that = {};
	const LOGIN_PAGE = "",
	MAIN_PAGE = " ' <content>'"+
	'<div id= "mainpage">' +
						'<ul id="horseList" class="frames">'+
						'</ul>'+
						' <button id= "userProfileChange" type="button">userProfileChange</button> '+
						' <button id= "userProfileOk" type="button">userProfileOk</button> '+
						' <button id= "userProfileDelete" type="button">userProfileDelete</button> '+
						'<div id= "textBox">textBox</div> '+
	'</div>'+
 					'</content>'+


'<script type="text/template" id="ul-element">'+
'<li draggable="true" tid = <%= id %>>'+
	'<p ><%= name %></p>'+
'</li>',

  USER_PAGE = ' <content>'+ 
  '<div id= "mainpage">' + 
    ' <button id= "userProfileChange" type="button">userProfileChange</button> '+ 
    ' <button id= "userProfileOk" type="button">userProfileOk</button> '+ 
    ' <button id= "userProfileDelete" type="button">userProfileDelete</button> '+ 
    '<div id= "textBox">textBox</div> '+ 
  '</div>'+ 
               '</content>'+ 
            
'<script type="text/template" id="userProfileTemplate">'+ 
  '<div id= "userProfileName"><%= userProfileName %></div> '+ 
  '<div id= "userProfileMail"><%= userProfileMail %></div> '+ 
  '<div id= "userProfilePassword"><%= userProfilePassword %></div> '+ 
'</script> ' 
'</script> ', 
 
  DATES_PAGE =' <content>'+ 
 '<div id = "allDates" >' +
  	'<ul id="allDates">'+ 
  	'</ul>'+ 
  	' <button id= "manageRegularDates" type="button">manageRegularDates</button> '+
	' <button id= "manageSingleDates" type="button">manageSingleDates</button> '+

  '</div>'+
 
    '</content>'+ 
 
  '<script type="text/template" id="ul-element">'+ 
  '<li draggable="true" dateId = <%= id %>>'+ 
    '<p ><%= name %></p>'+ 
  '</li>',

  REGULAR_DATES_PAGE = 	  	'<ul id="allRegularDates">'+ 
  	'</ul>'+ 


  '</div>'+
 
    '</content>'+ 
 ' <button id= "backToDates" type="button">backToDates</button> '+
  '<script type="text/template" id="ul-element">'+ 
  '<li draggable="true" regularDateId = <%= id %>>'+ 
    ' <button class= "regularDateDelete" type="button">Delete</button> '+
	' <button class= "regularDateChange" type="button">Change</button> '+
    '<p ><%= name %></p>'+ 
  '</li>';  

  that.MAIN_PAGE = MAIN_PAGE; 
  that.USER_PAGE = USER_PAGE;
  that.DATES_PAGE = DATES_PAGE; 
  that.REGULAR_DATES_PAGE = REGULAR_DATES_PAGE; 
  return that; 
};
 
