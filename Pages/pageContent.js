var Pages = Pages || {};

/**
 * @namespace Pages.Content
 * @memberOf! Pages
 * @description Contains the Strings of the different pages as constants and returns them.
 */
Pages.PageContent = function (){
	let that = {};
	const LOGIN_PAGE = ' <content>'+
						'<div id= "mainpage">' +
							'<button id= "createNewAccount" type="button">neues Konto erstellen</button> '+
							'<p class="loginP" id="userNameTag">Email</p>'+
							'<div class="loginDIV"><input id= "userNameInput" placeholder="Email eingeben"></input></div> '+
							'<p class="loginP" id="passwordTag">Passwort</p>'+
							'<div class="loginDIV"><input id= "passwordInput" placeholder="Passwort eingeben"></input></div> '+
							'<div class="loginDIV" id= "loginFailedText">Anmeldung leider fehlgeschlagen. Bitte überprüfe deine Daten und probiere es noch einmal.</div> '+
							'<div class="loginDIV"><button id= "loginButton" type="button">OK</button> </div>'+
							'<div class="checkbox"><label id="stayLoggedInTag"><input id= "stayLoggedInBox" type="checkbox" value = "stayLoggedIn"/><span>dauerhaft angemeldet bleiben?</span></label></div> '+
							'<p class="loginP" id="userHint">Hast du deine Zugangsdaten vergessen? Bitte kontaktiere unser Team</p>'+
						'</content>',

          DROPDOWN_MENU = '<div class="dropdown">'+
 '<button class="dropdownButton">Dropdown</button>'+
  '<div id="myDropdown" class="dropdown-content">'+
    '<a href="#">Link 1</a>'+
    '<a href="#">Link 2</a>'+
    '<a href="#">Link 3</a>'+
  '</div>'+
'</div>' ,

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

        USER_PROFILE_TEMPLATE = '<script type="text/template" id="userProfileTemplate">'+
  '<div id= "userProfileName">Name <%= name %></div> '+
  '<div id= "userProfileMail">Geburtsdatum <%= dateOfBirth %></div> '+
  '<div id= "userProfileMail">Email <%= email %></div> '+
  '<div id= "userProfilePassword">Password <%= password %></div> '+
'</script> '
'</script> ',

        HORSE_PROFILE_TEMPLATE = '<script type="text/template" id="horseProfileTemplate">'+
  '<div id= "horseProfileName">Name: <%= name %></div> '+
  '<div id= "horseProfileBirth">Geburtsdatum: <%= dateOfBirth %></div> '+
  '<div id= "horseProfileRace">Rasse: <%= race %></div> '+
  '<div id= "horseProfileOwner">Besitzer: <%= owner %></div> '+
  '<div id= "horseProfileSex">Geschlecht: <%= sex %></div> '+
  '<div id= "horseProfileHeight">Höhe: <%= height %></div> '+
  '<div id= "horseProfileGrower">Züchter: <%= grower %></div> '+
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
            '<li ><a id= "burgerOptionLogout" href="#">Logout</a></li>' +
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
    USER_PROFILE_TEMPLATE,


  DATES_PAGE =' <content>'+
 '<div id = "allDates" >' +
  	'<ul id="allDates">'+
  	'</ul>'+
  	' <button id= "manageRegularDates" type="button">manageRegularDates</button> '+
	' <button id= "manageSingleDates" type="button">manageSingleDates</button> '+
  '<button id= "cancelDatesPage" type="button">Zum Hauptmenu</button> '+

  '</div>'+

    '</content>'+

  '<script type="text/template" id="ul-element">'+
  '<li draggable="true" dateId = <%= id %>>'+
    '<p ><%= title %></p>'+
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
    '<p ><%= title %></p>'+
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

  HORSE_PROFILE_SAVER =  ' <content>'+
  '<div id= "horseProfileSaver">' +
    ' <button id= "horseSaverChange" type="button">Ändern</button> '+
    ' <button id= "horseSaverOk" type="button">Speichern</button> '+
    ' <button id= "horseSaverDelete" type="button">Verwerfen</button> '+
    '<div id= "textBox">textBox</div> '+
    POPUP +
  '</div>'+
  '</content>'+
    HORSE_PROFILE_TEMPLATE ,

    CREATE_USER = '<content>'+
  '<div id= "userInteraction">' +
    '<div id= "userInteractionInnerPage"></div>' +
    ' <button id= "userInteractionForward" type="button">Forward</button>' +
    ' <button id= "userInteractionBack" type="button">Backwards</button> '+
    '<div id= "userInteractionProgress"></div> '+
    ' <content>' +
    USER_PROFILE_TEMPLATE,

    USER_PROFILE_SAVER =  ' <content>'+
  '<div id= "userProfileSaver">' +
    ' <button id= "userSaverChange" type="button">Ändern</button> '+
    ' <button id= "userSaverOk" type="button">Speichern</button> '+
    ' <button id= "userSaverDelete" type="button">Verwerfen</button> '+
    '<div id= "textBox">textBox</div> '+
    POPUP +
  '</div>'+
  '</content>'+
    USER_PROFILE_TEMPLATE ,

    CREATE_SINGLE_DATE =   '<content>'+
  '<div id= "dateCreater">' +
   '<div id= "dateTitleInputHeader">Title</div>' +
   '<input id= "dateTitleInput">Title</input> '+
   '<div id= "dateDateInputHeader">Datum</div>' +
   '<input id= "dateDateInput" type="date">Datum</input> '+
   '<div id= "dateTimeInputHeader">Zeit</div>' +
   '<input id= "dateTimeInput" type="time">Zeit</input> '+
   '<div id= "dateLocationInputHeader">Ort</div>' +
   '<input id= "dateLocationInput">Ort</input> '+
   ' <input type="checkbox" id="dateCreaterCheckbox">'+
    '<label>Erinnerung erstellen</label>'+
    '<p>'+
    ' <button id= "dateCreaterReminderButton" type="button">Erinnerung</button> '+
    ' <button id= "dateCreaterDateButton" type="button">Termin</button> '+
    '</p>' +
     '<p>' +
    ' <button id= "dateCreaterSaveButton" type="button">Speichern</button> '+
    ' <button id= "dateCreaterCancelButton" type="button">Abbrechen</button> '+
      '</p>' +

  '</div>'+
  '</content>',

  DROPDOWN_MENU_REGULAR_DATES = '<select>'+
                                    '<option value="Tag">Tag</option>'+
                                    '<option value="Woche">Woche</option>'+
                                    '<option value="Monat">Monat</option>'+
                                    '<option value="Jahr">Jahr</option>'+
                                '</select>',

  REGULAR_DATES_CREATER_PAGE = CREATE_SINGLE_DATE + DROPDOWN_MENU_REGULAR_DATES + '<input id="regular_dates_value" type="number" min=0 max=52 value=1>';

  that.LOGIN_PAGE = LOGIN_PAGE;
  that.START_PAGE = START_PAGE;
  that.USER_PAGE = USER_PAGE;
  that.DATES_PAGE = DATES_PAGE;
  that.REGULAR_DATES_PAGE = REGULAR_DATES_PAGE;
  that.HORSE_PROFIL = HORSE_PROFIL;
  that.CREATE_HORSEBOX = CREATE_HORSEBOX;
  that.HORSE_PROFILE_SAVER = HORSE_PROFILE_SAVER;
  that.CREATE_USER = CREATE_USER;
  that.USER_PROFILE_SAVER = USER_PROFILE_SAVER;
  that.CREATE_SINGLE_DATE = CREATE_SINGLE_DATE;
  that.REGULAR_DATES_CREATER_PAGE = REGULAR_DATES_CREATER_PAGE;
  return that;
};
