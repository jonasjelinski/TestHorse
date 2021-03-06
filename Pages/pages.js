var Pages = Pages || {};

/**
 * @namespace Pages
 * @memberOf! Pages
 * @description Central modul of <code>Pages</code> which handles the communcation between the different pages.
 * <code><Pages/code> contains all pages of the app and determines which page should be showed to the client
 */
Pages = function(){

	let that = {},	
		datesPage,
		datesPageRegular,		
		datesChangerPageRegular,
		datesChangerPageSingle,
		datescreatorPageRegular,
		datesCreatorPageSingle,	
		loginPage,
		logoutPage,
		horseProfilPage,			
		horseCreatorPage,
		horseProfileSaver,
		horseProfileChanger,		
		pageDomElement,
		pageChanger,
		startPage,	
		user,
		userCreatorPage,
		userProfilPage,
		userProfileSaver,
		userProfileChanger,
		isUserLoggedIn = true,
		userID = 141;

	/**
	* @function init
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @description Initialize this model.
	*/ 
	function init(){
		initPageChanger();
		initModulsForLogin();
		initModulsForCreatingANewUser();	
	}

	/**
	* @function initPageChanger
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description Initialize this model.
	* <p>pageDomElement</p> is the dom-element e.g. a "div" which contains the page. 
	* <p>pageChanger</p> changes the user interface to the htmlText of the different pages.	
	*/ 
	function initPageChanger(){
		pageDomElement = document.getElementById("parentPage"),
		pageChanger = Pages.PageChanger(pageDomElement);
		pageChanger.init();
	}

	function initModulsForLogin(){
		initLoginPage();
		addListenersToLoginPage();
	}


	function initLoginPage(){
		loginPage = new LoginPage();
	}

	function addListenersToLoginPage(){
		loginPage.addEventListener("showStartPage", showStartPageAfterLogin);
		loginPage.addEventListener("createNewUser", showUserCreatorPage);
	}

	function initModulsForCreatingANewUser(){
		initUserCreatorPage();
		initUserChangerPage();
		initUserSaverPage();
		addListenersToUserProfileSaver();
		addListenersToUserProfileChanger();
		addListenersToUserProfileCreator();
	}	

	function initUserCreatorPage(){
		userCreatorPage = new UserCreatorPage(userID);
	}

	function addListenersToUserProfileCreator() {
		userCreatorPage.addEventListener("onEnoughAttributes", showUserProfileSaver);
	}

	function initUserChangerPage(){
		userProfileChanger = new UserProfileChanger();
	}

	function initUserSaverPage(){
		userProfileSaver = new UserProfileSaver();
	}

	function addListenersToUserProfileSaver(){
		userProfileSaver.addEventListener("onChangeUserProfile", changeUser);
		userProfileSaver.addEventListener("onSaveUserProfile", handleSaveUserProfile);
		userProfileSaver.addEventListener("onDeleteNewUserProfile", handleDelteNewUserProfile);
	}

	
	/**
	* @function initPages
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description sets the variables of this modul which contain the moduls of the different pages.
	*/ 
	function initPages(){
		datesPage = new DatesPageAll(userID);
		datesCreatorPageRegular = new RegulardatesCreatorPage(userID);
		datesCreatorPageSingle = new SingleDatesCreatorPage(userID);
		datesPageRegular = new RegularDatesPage(userID);
		datesChangerPageSingle = new DatesChangerPageSingle(userID);		
		datesChangerPageRegular = new DatesChangerPageRegular(userID);		
		horseProfilPage = new HorseProfilePage(userID);
		horseCreatorPage = new HorseCreatorPage(userID);
		horseProfileSaver = new HorseProfileSaver(userID);
		horseProfileChanger = new HorseProfileChanger(userID);
		logoutPage = new LogoutPage(userID);				
		startPage = new StartPage(userID);
		userProfilPage = new UserProfilPage(userID);
		userProfileChanger = new UserProfileChanger(userID);		
	}

	/**
	* @function initPageCommunication
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description sets up the communication between the different pages
	*/ 
	function initPageCommunication(){
		addListenersForDates();		
		addListenersForHorse();				
		addListenersToStartPage();
		addListenersForUserProfile();
		addListenersForLogoutPage();	
	}

	function addListenersForDates(){	
		addListenersForDatesPage();
		addListenersToDatesPageRegular();
		addListenersToDatesCreatorPageSingle();				
		addListenersToDatesCreatorPageRegular();
		addListenersToDatesChangerPageSingle();
		addListenersToDatesChangerPageRegular();
		
	}

	function addListenersForDatesPage(){
		datesPage.addEventListener("showRegularDates", showRegularDates);
		datesPage.addEventListener("showCreateSingleDate", showCreateSingleDate);		
		datesPage.addEventListener("onCancel", showStartPage);		
		datesPage.addEventListener("showStartPage", showStartPage);		
		datesPage.addEventListener("showProfilePage", showUserProfilPage);		
		datesPage.addEventListener("showHelpPage", showHelpPage);		
		datesPage.addEventListener("logoutUser", logoutUser);		
		datesPage.addEventListener("onChangeDate", changeSingleDate);		
	}

	function addListenersToDatesPageRegular(){
		datesPageRegular.addEventListener("showAllDates", showAllDates);
		datesPageRegular.addEventListener("onDataSaved", showStartPage);				
		datesPageRegular.addEventListener("onCancel", showStartPage);			
		datesPageRegular.addEventListener("onChangeDate", changeRegularDate);			
		datesPageRegular.addEventListener("showCreateRegularDate", showCreateRegularDate);	
		datesPageRegular.addEventListener("showStartPage", showStartPage);	
		datesPageRegular.addEventListener("showProfilePage", showUserProfilPage);	
		datesPageRegular.addEventListener("showHelpPage", showHelpPage);	
		datesPageRegular.addEventListener("logoutUser", logoutUser);	
	}

	function addListenersToDatesCreatorPageSingle(){
		datesCreatorPageSingle.addEventListener("onDataSaved", showAllDates);				
		datesCreatorPageSingle.addEventListener("onCancel", showAllDates);			
		datesCreatorPageSingle.addEventListener("onChangeClick", changeSingleDate);
	}

	function addListenersToDatesChangerPageSingle(){
		datesChangerPageSingle.addEventListener("onDataSaved", showAllDates);				
		datesChangerPageSingle.addEventListener("onCancel", showAllDates);			
	}


	function addListenersToDatesCreatorPageRegular(){
		datesCreatorPageRegular.addEventListener("onDataSaved", showRegularDates);
		datesCreatorPageRegular.addEventListener("onCancel", showRegularDates);						
	}

	function addListenersToDatesChangerPageRegular(){
		datesChangerPageRegular.addEventListener("onDataSaved", showRegularDates);				
		datesChangerPageRegular.addEventListener("onCancel", showRegularDates);			
	}	

	function addListenersForHorse() {
		horseCreatorPage.addEventListener("onEnoughAttributes", showHorseProfileSaver);
		addListenersToHorseProfilePage();
		addListenersToHorseProfileSaver();
		addListenersToHorseProfileChanger();
	}

	function addListenersToHorseProfilePage(){
		horseProfilPage.addEventListener("onChangeHorseProfile", changeHorse);
		horseProfilPage.addEventListener("onOkayHorseProfile", showStartPage);
		horseProfilPage.addEventListener("onDeleteHorseProfile", showStartPage);
		horseProfilPage.addEventListener("showStartPage", showStartPage);		
		horseProfilPage.addEventListener("showProfilePage", showUserProfilPage);		
		horseProfilPage.addEventListener("showHelpPage", showHelpPage);		
		horseProfilPage.addEventListener("logoutUser", logoutUser);			
	}

	function addListenersToHorseProfileSaver(){
		horseProfileSaver.addEventListener("onChangeHorseProfile", changeHorse);
		horseProfileSaver.addEventListener("onSaveHorseProfile", showStartPage);
		horseProfileSaver.addEventListener("onDeleteNewHorseProfile", showStartPage);
	}	

	function addListenersToHorseProfileChanger(){
		horseProfileChanger.addEventListener("onEnoughAttributes", showHorseProfileSaverToUpdate);
	}

	

	function addListenersToStartPage(){
		startPage.addEventListener("showProfilePage", showUserProfilPage);
		startPage.addEventListener("showHelpPage", showHelpPage);
		startPage.addEventListener("logoutUser", logoutUser);
		startPage.addEventListener("showHorseDates", showAllDates);
		startPage.addEventListener("showHorseProfile", showHorseProfilePage);
		startPage.addEventListener("createNewHorse", showHorseCreatorPage);
	}	

	function addListenersForUserProfile(){
		addListenersToUserProfilePage();
		addListenersToUserProfileSaver();
		addListenersToUserProfileChanger();
		addListenersToUserProfileCreator();
	}

	function addListenersToUserProfilePage(){
		userProfilPage.addEventListener("onProfileOkay", handleChangeProfileOkay);
		userProfilPage.addEventListener("onChangeProfile", changeUser);
		userProfilPage.addEventListener("onDeleteProfile", handleChangeProfileDelete);
		userProfilPage.addEventListener("showHelpPage", showHelpPage);
		userProfilPage.addEventListener("logoutUser", logoutUser);
	}


	function addListenersToUserProfileChanger(){
		userProfileChanger.addEventListener("onEnoughAttributes", showUserProfileSaverToUpdate);
		userProfileChanger.addEventListener("onHorseSaved", showStartPage);
	}

	function addListenersForLogoutPage(event) {
		logoutPage.addEventListener("onLogout", showLoginPage);
	}

		


	function showHelpPage(){

	}

	function logoutUser(){
		logoutPage.init();
		logoutPage.logout();
	}

	
	function showStartPageAfterLogin(event) {
		let newUserID = event.details.userID;
		userID = newUserID;
		isUserLoggedIn = true;
		initAfterLogin();
		showStartPage();
	}

	function initAfterLogin(){
		initPages();
		initPageCommunication();	
	}

	/**
	* @function showAllDates
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows all dates to the user
	*/ 
	function showAllDates(event){
		let horseID;
		if(event) {
			horseID = event.details.horseID
		}
		pageChanger.switchPage("DATES");
		datesPage.init(horseID);
	}
	
	/**
	* @function showRegularDates
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows all regular dates to the user
	*/ 
	function showRegularDates(event){;
		let horseID = event.details.horseID;
		pageChanger.switchPage("REGULAR_DATES_PAGE");
		datesPageRegular.init(horseID);
	}

	function showCreateRegularDate(event) {
		let attributes = event.details.horseID;
		pageChanger.switchPage("REGULAR_DATES_CREATER_PAGE");		
		datesCreatorPageRegular.init(attributes);
	}

	function changeSingleDate(event){		
		let attributes = event.details.attributes;	
		console.log("changeSingleDate", attributes);	
		pageChanger.switchPage("SINGLE_DATE_CREATER_PAGE");
		datesChangerPageSingle.init(attributes);
	}

	function showCreateSingleDate(event){
		let horseID = event.details.horseID;
		pageChanger.switchPage("SINGLE_DATE_CREATER_PAGE");
		datesCreatorPageSingle.init(horseID);
	}


	function changeRegularDate(event){
		let attributes = event.details.attributes;
		pageChanger.switchPage("REGULAR_DATES_CREATER_PAGE");
		datesChangerPageRegular.init(attributes);
	}	


	/**
	* @function showLoginPage
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the loginPage to the user
	*/ 
	function showLoginPage(){
		pageChanger.switchPage("LOGIN");
		loginPage.init();
	}

	/**
	* @function showStartPage
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the startPage to the user
	*/ 
	function showStartPage(){
		pageChanger.switchPage("START");
		startPage.init();
	}	
	
	/**
	* @function showHorseProfile
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the data of one horse to the user
	*/ 
	function showHorseProfilePage(event){
		let attributes = event.details.attributes;
		pageChanger.switchPage("HORSE_PROFILE");
		horseProfilPage.init(attributes);
	}

	function showHorseCreatorPage(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;
		}
		pageChanger.switchPage("CREATE_HORSEBOX");
		horseCreatorPage.init(attributes);
	}

	function showHorseProfileSaver(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;1
			pageChanger.switchPage("HORSE_PROFILE_SAVER");
			horseProfileSaver.init(attributes);
			horseProfileSaver.createNewHorse();				
		}			
	}

	function showHorseProfileSaverToUpdate(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;1
			pageChanger.switchPage("HORSE_PROFILE_SAVER");
			horseProfileSaver.init(attributes);	
			horseProfileSaver.updateOldHorse();					
		}	
	}

	function changeHorse(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;
			pageChanger.switchPage("CREATE_HORSEBOX");		
			horseProfileChanger.init(attributes);
			horseProfileChanger.changeEntity(attributes);
		}		
	}

	/**
	* @function showUserProfilPage
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the user profil to the user
	*/ 
	function showUserProfilPage(){
		pageChanger.switchPage("USER_PROFILE");
		userProfilPage.initPage();
	}	

	function showUserCreatorPage(){
		pageChanger.switchPage("CREATE_USER");
		userCreatorPage.init();
	}

	function showUserProfileSaver(event){
		let attributes = {};
		if(event){
			attributes = event.details.attributes;
		}			
		pageChanger.switchPage("USER_PROFILE_SAVER");
		userProfileSaver.init(attributes);
		userProfileSaver.createNewUser();
	}

	function showUserProfileSaverToUpdate(event){
		let attributes = {};
		if(event){
			attributes = event.details.attributes;
		}			
		pageChanger.switchPage("USER_PROFILE_SAVER");
		userProfileSaver.init(attributes);
		userProfileSaver.updateOldUser();
	}

	function changeUser(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;
			pageChanger.switchPage("CREATE_USER");			
			userProfileChanger.init(attributes);
		}		
	}

	function handleSaveUserProfile(){
		if(isUserLoggedIn){
			showStartPage();
		}
		else{
			showLoginPage();
		}
	}

	function handleDelteNewUserProfile(){
		showLoginPage();
	}

	function handleChangeProfileOkay(){
		if(isUserLoggedIn){
			showStartPage();
		}
		else{
			showLoginPage();
		}
	}

	function handleChangeProfileDelete(){
		if(isUserLoggedIn){
			showStartPage();
		}
		else{
			showLoginPage();
		}
	}

	
	that.init = init;
	that.initAfterLogin = initAfterLogin;
	that.showAllDates = showAllDates;
	that.showRegularDates = showRegularDates;
	that.showCreateRegularDate = showCreateRegularDate;
	that.showHorseProfilePage = showHorseProfilePage;	
	that.showHorseCreatorPage = showHorseCreatorPage;	
	that.showLoginPage = showLoginPage;
	that.showStartPage = showStartPage;
	that.showUserProfilPage = showUserProfilPage;	
	that.showUserCreatorPage = showUserCreatorPage;	
	that.changeRegularDate = changeRegularDate;
	that.showCreateSingleDate = showCreateSingleDate;
	that.showUserProfileSaver = showUserProfileSaver;
	return that;
}


