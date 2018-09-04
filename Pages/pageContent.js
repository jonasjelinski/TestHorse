var Pages = Pages || {};

/**
 * @namespace Pages.Content
 * @memberOf! Pages
 * @description Contains the Strings of the different pages as constants and returns them.
 */
Pages.PageContent = function (){
	let that = {};
	const PASSWORD_POPUP = '<div id="popupPassword">' +
	'<p id="popupPasswordText">Trage deine Mailadresse ein, mit der du dich registriert hast.</p>'+
	'<div class="forgotPasswordContainer"><input id= "forgotPasswordInput" placeholder="Mailadresse eingeben"></input></div> '+
	'<button id="passwordButton">neues Passwort generieren</button>'+
	'</div>',

	LOGIN_PAGE = ' <content>'+
						'<div id= "mainpage">' +
							'<button id= "createNewAccount" type="button">neues Konto erstellen</button> '+
							'<p class="loginP" id="userNameTag">Email</p>'+
							'<div class="loginDIV"><input id= "userNameInput" placeholder="Email eingeben"></input></div> '+
							'<p class="loginP" id="passwordTag">Passwort</p>'+
				 			'<div class="loginDIV"><input id= "passwordInput" placeholder="Passwort eingeben"></input></div> '+
							'<div class="loginDIV" id= "loginFailedText">Anmeldung leider fehlgeschlagen. Bitte überprüfe deine Daten und probiere es noch einmal.</div> '+
							'<div class="loginDIV"><button id= "loginButton" type="button">OK</button> </div>'+
							'<div class="checkbox"><label id="stayLoggedInTag"><input id= "stayLoggedInBox" type="checkbox" value = "stayLoggedIn"/><span>dauerhaft angemeldet bleiben?</span></label></div> '+
							'<p class="loginP" id="userHint">Hast du dein Passwort vergessen?</p>'+
							PASSWORD_POPUP +
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

        USER_PROFILE_TEMPLATE = '<script type="text/template" id="userProfileTemplate"> '+
  '<div id= "userProfileName">Name <%= name %> </div> '+
  '<div id= "userProfileBirth">Geburtsdatum <%= dateOfBirth %> </div> '+
  '<div id= "userProfileMail">Email <%= email %> </div> '+
  '<div id= "userProfilePassword">Password <%= password %> </div> '+
'</script> ',

        HORSE_PROFILE_TEMPLATE = '<script type="text/template" id="horseProfileTemplate"> '+

  '<div id= "horseProfileName">Name: <%= name %> </div> '+
  '<div id= "horseProfileBirth">Geburtsdatum: <%= dateOfBirth %> </div> '+
  '<div id= "horseProfileRace">Rasse: <%= race %> </div> '+
	'<div id= "horseProfileType">Schlachtpferd: <%= type %> </div> '+
  '<div id= "horseProfileOwner">Besitzer: <%= owner %> </div> '+
  '<div id= "horseProfileSex">Geschlecht: <%= sex %> </div> '+
  '<div id= "horseProfileHeight">Höhe: <%= height %> </div> '+
  '<div id= "horseProfileGrower">Züchter: <%= grower %> </div> '+
'</script> ' ,

  DATE_RECOMMENDATION_TEMPLATE =
  '<script type="text/template" id="dateRecommendationTemplate">'+
  '<li draggable="true" dateRecommendationId = <%= id %> >'+
'<div> '+
	'<button class= "dateRecommendationDelete" type="button">löschen</button> '+
	'</div> '+
	'<div> '+
	'<button class= "dateRecommendationChange" type="button">ändern</button> '+
	'</div> '+
	'<p class="recommendationDateTitle"> <%= title %> </p> '+
	'<p class="recommendationDateDay"> <%= date %> </p> '+
	'<p class="recommendationDateTime"> <%= time %> </p> '+




  '</li> '+
	'</script> ',

        POPUP = '<div id="popup">' +
                    '<p id="popupText"> </p> '+
                    '<button id="popupTextYes" type="button">Yes</button> '+
                    '<button id="popupTextNo"  type="button">No</button> '+
                '</div>',
HORSEBOXELEMENT_TEMPLATE= '<script type="text/template" id="horseBoxElementTemplate">'+
'<li draggable="true" class= "horseListElement" horseId = <%= id %> > '+
	' <div class = "horseBox" horseBoxId = <%= id %> ' +
		'<img class= "horsePic" horsePicId = <%= id %> src=<%=photo%> </img> ' +
		'<div class="horseName"> <%=name%> </div> '+
		'<div> <button class="horseDateButton" type="button">horseDateButton </button> </div> '+
		'<div> <button class="horseProfileButton" type="button">horseProfileButton </button> </div> '+
		'</div> '+
'</li> ' +
'</script> ',
	START_PAGE =  ' <content>'+
						'<div id= "mainpage">' +
            '<input class="burger" id="burger" type="checkbox" />' +
       			'<label for="burger" class="burgerLabel">' +
        		'</label>' +
        		'<nav class="navigation" id="burgerNavStartPage"> '   +
          		'<ul class="burgerList" id="burgerListStartPage" >' +
            		'<li class="burgerListItem"> <a class="burgerListContent" id="burgerOptionProfile" href="#">Profil</a> </li> ' +
            		'<li class="burgerListItem"> <a class="burgerListContent" id="burgerOptionHelp" href="#">Hilfe</a> </li> ' +
            		'<li class="burgerListItem"> <a class="burgerListContent" id= "burgerOptionLogout" href="#">Logout</a> </li> ' +
          		'</ul>'  +
        		'</nav>'  +
						'<ul id="horseList" class="frames" >'+
						'</ul>'+
						'</div>'+
 					'</content>'+
					HORSEBOXELEMENT_TEMPLATE,

  USER_PAGE = ' <content>'+
  '<div id= "mainpage">' +

	'<input class="burger" id="burger" type="checkbox" /> ' +
	'<label for="burger" class="burgerLabel"> ' +
	'</label> ' +
	'<nav class="navigation" id="burgerNavUserPage">'    +
		'<ul class="burgerList" id="burgerListUserPage" >' +
			'<li class="burgerListItem><a class="burgerListContent" id="burgerOptionUserStart" href="#">Startseite</a></li>' +
			'<li class="burgerListItem><a class="burgerListContent" id="burgerOptionUserHelp" href="#">Hilfe</a></li>' +
			'<li class="burgerListItem><a class="burgerListContent" id= "burgerOptionUserLogout" href="#">Logout</a></li>' +
		'</ul>'  +
	'</nav>'  +

    ' <button id= "userProfileChange" type="button">Ändern</button> '+
    ' <button id= "userProfileOk" type="button">Ok</button> '+
    ' <button id= "userProfileDelete" type="button">löschen</button> '+
    '<div id= "textBox">textBox</div> '+
  '</div>'+
   POPUP+
               '</content>'+
    USER_PROFILE_TEMPLATE,

LIST_ELEMENT_TEMPLATE = '<script type="text/template" id="ulElementTemplate"> '+
'<li draggable="true" dateId = <%= id %> > '+
'<div> '+
	'<button class= "singleDateDelete" type="button">löschen</button> '+
	'</div> '+
	'<div> '+
	'<button class= "singleDateChange" type="button">ändern</button> '+
	'</div> '+
	'<p class="singleDateTitle"> <%= title %> </p> '+
	'<p class="singleDateDay"> <%= date %> </p> '+
	'<p class="singleDateTime"> <%= time %> </p> '+
'</li> '+
'</script> ',

  DATES_PAGE =' <content>'+
 '<div id = "allDates" >' +
 '<input class="burger" id="burger" type="checkbox" /> ' +
 '<label for="burger" class="burgerLabel"> ' +
 '</label> ' +
 '<nav class="navigation" id="burgerNavDatePage">'    +
	 '<ul class="burgerList" id = "burgerListAllDates" >' +
		 '<li class="burgerListItem><a class="burgerListContent" id="burgerOptionAllDatesProfile" href="#">Profil</a></li>' +
		 '<li class="burgerListItem><a class="burgerListContent" id="burgerOptionAllDatesHelp" href="#">Hilfe</a></li>' +
		 '<li class="burgerListItem><a class="burgerListContent" id="burgerOptionAllDatesStart" href="#">Startseite</a></li>' +
		 '<li class="burgerListItem><a class="burgerListContent" id= "burgerOptionAllDatesLogout" href="#">Logout</a></li>' +
	 '</ul>'  +
 '</nav>'  +
  	'<ul id="allDatesList">'+
  	'</ul>'+
  	' <button id= "manageRegularDates" type="button">reguläre Termine verwalten</button> '+
	' <button id= "manageSingleDates" type="button">neuen Einzeltermin hinzufügen</button> '+

  '</div>'+

    '</content>'+
		LIST_ELEMENT_TEMPLATE,

DATE_LIST_TEMPLATE  = '<script type="text/template" id="dateListTemplate">'+
'<li draggable="true" regularDateId = <%= id %> > '+
'<div> '+
	'<button class= "regularDateDelete" type="button">löschen</button> '+
	'</div> '+
	'<div> '+
	'<button class= "regularDateChange" type="button">ändern</button> '+
	'</div> '+
	'<p class="regularDateTitle"> <%= title %> </p> '+
	'<p class="regularDateDay"> <%= date %> </p> '+
	'<p class="regularDateTime"> <%= time %> </p> '+
'</li> </script>' ,

  REGULAR_DATES_PAGE = 	  	'<content>'+
	'<input class="burger" id="burger" type="checkbox" /> ' +
  '<label for="burger" class="burgerLabel"> ' +
  '</label>' +
  '<nav class="navigation" id="burgerNavRegularDatePage">'    +
 	 '<ul class="burgerList" id="burgerListRegularDates" >' +
 		 '<li class="burgerListItem><a class="burgerListContent" id="burgerOptionRegularDatesProfile" href="#">Profil</a></li>' +
 		 '<li class="burgerListItem><a class="burgerListContent" id="burgerOptionRegularDatesHelp" href="#">Hilfe</a></li>' +
 		 '<li class="burgerListItem><a class="burgerListContent" id="burgerOptionRegularDatesStart" href="#">Startseite</a></li>' +
 		 '<li class="burgerListItem><a class="burgerListContent" id= "burgerOptionRegularDatesLogout" href="#">Logout</a></li>' +
 	 '</ul>'  +
  '</nav>'  +

    '<ul id="allRegularDates">'+
  	'</ul>'+
		'<ul id="regularDatesRecommendation">'+
		'</ul>'+
    POPUP +
 '<button id= "backToDates" type="button">zurück zur Terminübersicht</button> '+
 '<button id= "createNewDate" type="button">neuen Termin erstellen</button> '+
  '</div>'+
 '</content>'+
DATE_LIST_TEMPLATE
  +
	DATE_RECOMMENDATION_TEMPLATE,




   HORSE_PROFIL = ' <content>'+
  '<div id= "horseProfile">' +
	'<input class="burger" id="burger" type="checkbox" /> ' +
	'<label for="burger" class="burgerLabel"> ' +
	'</label>' +
	'<nav class="navigation" id="burgerNavHorseProfile">'    +
		'<ul class="burgerList" id = "burgerMenuHorseProfile" >' +
			'<li class="burgerListItem><a class="burgerListContent" id="optionHProfileStart" href="#">Start</a></li>' +
			'<li class="burgerListItem><a class="burgerListContent" id="optionHProfileHelp" href="#">Hilfe</a></li>' +
			'<li class="burgerListItem><a class="burgerListContent" id= "optionHProfileUserProfile" href="#">Nutzerprofil</a></li>' +
			'<li class="burgerListItem><a class="burgerListContent" id= "optionHProfileLogout" href="#">Logout</a></li>' +
		'</ul>'  +
	'</nav>'  +
	'<div id="horseProfileImgContainer">'+
	'<img id="horseProfileImg" src="" alt="Profil Bild Pferd">'+
	'</div>'+
    ' <button id= "horseProfileChange" type="button">ändern</button> '+
    ' <button id= "horseProfileOk" type="button">OK</button> '+
    ' <button id= "horseProfileDelete" type="button">löschen</button> '+
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
		'<div id="horseProfileSaverImgContainer">'+
		'<img id="horseProfileSaverImg" src="" alt="Profil Bild Pferd">'+
		'</div>'+
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
  '<div class="createDate" id= "dateCreater">' +

	'<div id="createDatePopup">' +
	'<p id="createDatePopupText">Bitte erst alle Felder ausfüllen, bevor der Dialog verlassen werden kann!</p>'+
	'<button id="createDatePopupClose" type="button">schließen</button> '+
	'</div>'+
   '<div id= "dateTitleInputHeader">Title</div>' +
   '<input id= "dateTitleInput">Title</input> '+
   '<div id= "dateDateInputHeader">Datum</div>' +
   '<input id= "dateDateInput" type="date">Datum</input> '+
   '<div id= "dateTimeInputHeader">Zeit</div>' +
   '<input id= "dateTimeInput" type="time">Zeit</input> '+
   '<div id= "dateLocationInputHeader">Ort</div>' +
   '<input id= "dateLocationInput">Ort</input> '+
   ' <input type="checkbox" id="dateCreaterCheckbox">'+
    '<labelid="singeDateCheckboxLabel">Erinnerung erstellen</label>'+
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
                                    '<option id="regularDatesDay" value="Tag">Tag</option>'+
                                    '<option id="regularDatesWeek" value="Woche">Woche</option>'+
                                    '<option id="regularDatesMonth" value="Monat">Monat</option>'+
                                    '<option id="regularDatesYear" value="Jahr">Jahr</option>'+
                                '</select>',

  REGULAR_DATES_CREATER_PAGE = CREATE_SINGLE_DATE + '<input class="createRegularDate" id="regularDatesValue" type="number" min=0 max=52 value=1>' + DROPDOWN_MENU_REGULAR_DATES +
	'<div>' +
	'<div id= "regularDateNameHeader">Name des Dienstleisters</div>' +
	'<input id= "regularDateName">Name d. Dienstleisters</input> '+
	'<div id= "regularDatePhoneHeader">Telefonnummer</div>' +
	'<input id= "regularDatePhone">Telefonnummer</input>'+
	'</div>',

	POPUP_VET = '<div id="popupVet">' +
							'<p id="popupVetText">Achtung, Pferd hat Schlachtpferdestatus, nicht alle MEdikamente zugelassen. Tierarzt darauf hinweisen.</p>'+
							'<button id="popupTextOk" type="button">ok</button> '+
					'</div>';


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
