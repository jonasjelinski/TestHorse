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

        HORSE_PROFILE_TEMPLATE = '<script type="text/template" id="horseProfileTemplate">'+ 
  '<div id= "horseProfileName">Name: <%= name %></div> '+ 
  '<div id= "horseProfileBirth">Geburtsdatum: <%= birth %></div> '+ 
  '<div id= "horseProfileRace">Rasse: <%= race %></div> '+ 
  '<div id= "horseProfileOwner">Besitzer: <%= owner %></div> '+ 
  '<div id= "horseProfileSex">Geschlecht: <%= sex %></div> '+ 
  '<div id= "horseProfileHeight">Höhe: <%= height %></div> '+ 
  '<div id= "horseProfileRaiser">Züchter: <%= raiser %></div> '+ 
'</script> ' ,

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

  REGULAR_DATES_PAGE = 	  	'<content>'+ 

    '<ul id="allRegularDates">'+ 
  	'</ul>'+ 
    POPUP +
 ' <button id= "backToDates" type="button">backToDates</button> '+
  '</div>'+
 '</content>'+
  
  '<script type="text/template" id="ul-element">'+ 
  '<li draggable="true" regularDateId = <%= id %>>'+ 
    ' <button class= "regularDateDelete" type="button">Delete</button> '+
	' <button class= "regularDateChange" type="button">Change</button> '+
    '<p ><%= name %></p>'+ 
  '</li>',

   HORSE_PROFIL = ' <content>'+ 
  '<div id= "horseProfile">' + 
    ' <button id= "horseProfileChange" type="button">ProfileChange</button> '+ 
    ' <button id= "horseProfileOk" type="button">ProfileOk</button> '+ 
    ' <button id= "horseProfileDelete" type="button">ProfileDelete</button> '+ 
    '<div id= "textBox">textBox</div> '+ 
    POPUP +
  '</div>'+ 
  '</content>'+             
    HORSE_PROFILE_TEMPLATE ,

  CREATE_HORSEBOX = '<content>'+ 
  '<div id= "horseInteraction">' + 
    '<div id= "horseInteractionInnerPage"></div>' +
    ' <button id= "horseInteractionForward" type="button">Forward</button>' + 
    ' <button id= "horseInteractionBack" type="button">Backwards</button> '+ 
    '<div id= "horseInteractionProgress"></div> '+
    ' <content>',

  HORSE_PROFILE_CHANGE =  ' <content>'+ 
  '<div id= "horseProfileChange">' + 
    ' <button id= "horseChangeChange" type="button">ProfileChange</button> '+ 
    ' <button id= "horseChangeOk" type="button">ProfileOk</button> '+ 
    ' <button id= "horseChangeDelete" type="button">ProfileDelete</button> '+ 
    '<div id= "textBox">textBox</div> '+ 
    POPUP +
  '</div>'+ 
  '</content>'+             
    HORSE_PROFILE_TEMPLATE ,



  that.LOGIN_PAGE = LOGIN_PAGE;
  that.START_PAGE = START_PAGE; 
  that.USER_PAGE = USER_PAGE;
  that.DATES_PAGE = DATES_PAGE; 
  that.REGULAR_DATES_PAGE = REGULAR_DATES_PAGE; 
  that.HORSE_PROFIL = HORSE_PROFIL;
  that.CREATE_HORSEBOX = CREATE_HORSEBOX;
  that.HORSE_PROFILE_CHANGE = HORSE_PROFILE_CHANGE;
  return that; 
};
 
