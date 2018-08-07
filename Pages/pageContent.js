var Pages = Pages || {};

/**
 * @namespace Pages
 * @memberOf! Pages
 * @description Contains the Strings of the different pages as constants and returns them.
 */
Pages.PageContent = function (){
	let that = {};
	const LOGIN_PAGE = ' <content>'+
						'<div id= "mainpage">' +						
							'<button id= "createNewAccount" type="button">userProfileChange</button> '+
							'<input id= "userNameInput">userNameInput</input> '+
							'<div id= "loginFailedText">loginFailedText</div> '+						
							'<input id= "passwordInput">passwordInput</input> '+
							'<button id= "loginButton" type="button">login</button> '+
							'<input id= "stayLoggedInBox" type="checkbox" value = "stayLoggedIn"></input> '+
						'</div>'+
 						'</content>', 

          BURGER_MENU =  '<input id="burger" type="checkbox" />' +

       '<label for="burger">' +
            '<span></span>' +
            '<span></span>' +
            '<span></span>' +
        '</label>' +
        '<nav>'    +
          '<ul id = "burgerList" >' +
            '<li><a href="#">Link #1</a></li>' +
            '<li><a href="#">Link #2</a></li>' +
            '<li><a href="#">Link #3</a></li>' +
          '</ul>'  +
        '</nav>' ,

        POPUP = '<div id="popup">' +
                    '<p id="popupText"></p>'+
                    '<button id="popupTextYes" type="button">Yes</button> '+ 
                    '<button id="popupTextNo"  type="button">No</button> '+
                '</div>',

	START_PAGE =  ' <content>'+
						'<div id= "mainpage">' +
            '<input id="burger" type="checkbox" />' +

       '<label for="burger">' +
            '<span></span>' +
            '<span></span>' +
            '<span></span>' +
        '</label>' +
        '<nav>'    +
          '<ul id = "burgerListStartPage" >' +
            '<li><a  id="burgerOptionProfile" href="#">Profil</a></li>' +
            '<li ><a id="burgerOptionHelp" href="#">Help</a></li>' +
            '<li ><a id= "burgerOptionLogut" href="#">Logout</a></li>' +
          '</ul>'  +
        '</nav>'  +
							'<ul id="horseList" class="frames">'+
							'</ul>'+
						'</div>'+
 					'</content>'+

					'<script type="text/template" id="horseBoxElement">'+
					'<li draggable="true" class= "horseListElement" horseId = <%= id %> '+
						' <div class = "horseBox" horseBoxId = <%= id  %>' +
              '</div>'+
              '<img class= "horsePic" horsePicId = <%=id%> src=<%=photo%>> </img>' +
              '</div>'+
              '<div>'+
              '<button class="horseDateButton" type="button">horseDateButton</button> '+ 
              '<button class="horseProfileButton" type="button">horseProfileButton</button> '+
              '</div>'+ 
              '</div>'+
					'</li>', 

  USER_PAGE = ' <content>'+ 
  '<div id= "mainpage">' + 
    ' <button id= "userProfileChange" type="button">userProfileChange</button> '+ 
    ' <button id= "userProfileOk" type="button">userProfileOk</button> '+ 
    ' <button id= "userProfileDelete" type="button">userProfileDelete</button> '+ 
    '<div id= "textBox">textBox</div> '+ 
  '</div>'+ 
   POPUP+
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
     POPUP +
    '</content>'+ 
 ' <button id= "backToDates" type="button">backToDates</button> '+
  '<script type="text/template" id="ul-element">'+ 
  '<li draggable="true" regularDateId = <%= id %>>'+ 
    ' <button class= "regularDateDelete" type="button">Delete</button> '+
	' <button class= "regularDateChange" type="button">Change</button> '+
    '<p ><%= name %></p>'+ 
  '</li>',

   HORSE_PROFIL = ' <content>'+ 
  '<div id= "horseProfil">' + 
    ' <button id= "horseProfileChange" type="button">ProfileChange</button> '+ 
    ' <button id= "horseProfileOk" type="button">ProfileOk</button> '+ 
    ' <button id= "horseProfileDelete" type="button">ProfileDelete</button> '+ 
    '<div id= "textBox">textBox</div> '+ 
    POPUP +
  '</div>'+ 
               '</content>'+ 
            
'<script type="text/template" id="horseProfileTemplate">'+ 
  '<div id= "horseProfileName"><%= name %></div> '+ 
  '<div id= "horseProfileBirth"><%= birth %></div> '+ 
  '<div id= "horseProfileRace"><%= race %></div> '+ 
  '<div id= "horseProfileOwner"><%= comp %></div> '+ 
  '<div id= "horseProfileSex"><%= owner %></div> '+ 
  '<div id= "horseProfileHeight"><%= sex %></div> '+ 
  '<div id= "horseProfileRaiser"><%= height %></div> '+ 
'</script> ' 
'</script> ', 



  that.LOGIN_PAGE = LOGIN_PAGE;
  that.START_PAGE = START_PAGE; 
  that.USER_PAGE = USER_PAGE;
  that.DATES_PAGE = DATES_PAGE; 
  that.REGULAR_DATES_PAGE = REGULAR_DATES_PAGE; 
  that.HORSE_PROFIL = HORSE_PROFIL;
  return that; 
};
 
