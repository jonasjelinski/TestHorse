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
		horseProfilPage,
		datescreatorPageRegular,
		datesCreatorPageSingle,		
		loginPage,		
		pageDomElement,
		pageChanger,			
		horseCreatorPage,
		horseProfileSaver,
		horseProfileChanger,
		startPage,	
		user,
		userCreatorPage,
		userProfilPage,
		userProfileSaver,
		userProfileChanger;

	/**
	* @function init
	* @public
	* @memberof! Pages.PageChanger  
	* @instance
	* @description Initialize this model.
	*/ 
	function init(){
		initPageChanger();
		initPages();
		initPageCommunication();				
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

	/**
	* @function initPages
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description sets the variables of this modul which contain the moduls of the different pages.
	*/ 
	function initPages(){
		datesPage = new DatesPage();
		datesCreatorPageRegular = new RegulardatesCreatorPage();
		datesCreatorPageSingle = new SingleDatesCreatorPage();
		datesPageRegular = new RegularDatesPage();		
		horseProfilPage = new HorseProfilePage();
		horseCreatorPage = new HorseCreatorPage();
		horseProfileSaver = new HorseProfileSaver();
		horseProfileChanger = new HorseProfileChanger();		
		loginPage = new LoginPage();		
		startPage = new StartPage();
		userCreatorPage = new UserCreatorPage();
		userProfilPage = new UserProfilPage();
		userProfileSaver = new UserProfileSaver();
		userProfileChanger = new UserProfileChanger();
		
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
		addListenersToLoginPage();		
		addListenersToStartPage();
		addListenersForUserProfile();	
	}

	function addListenersForDates(){	
		datesPage.addEventListener("showRegularDates", showRegularDates);
		datesPage.addEventListener("showCreateSingleDate", showCreateSingleDate);		
		datesPage.addEventListener("onCancel", showStartPage);		
		datesPageRegular.addEventListener("showAllDates", showAllDates);
		datesCreatorPageSingle.addEventListener("onDataSaved", showStartPage);				
		datesCreatorPageSingle.addEventListener("onCancel", showStartPage);				
	}	

	function addListenersForHorse() {
		horseCreatorPage.addEventListener("onEnoughAttributes", showHorseProfileSaver);
		horseCreatorPage.addEventListener("onHorseSaved", showStartPage);
		addListenersToHorseProfilePage();
		addListenersToHorseProfileSaver();
		addListenersToHorseProfileChanger();
	}

	function addListenersToHorseProfilePage(){
		horseProfilPage.addEventListener("onChangeHorseProfile", changeHorse);
		horseProfilPage.addEventListener("onSaveHorseProfile", showStartPage);
		horseProfilPage.addEventListener("onDeleteNewHorseProfile", showStartPage);		
	}

	function addListenersToHorseProfileSaver(){
		horseProfileSaver.addEventListener("onChangeHorseProfile", changeHorse);
		horseProfileSaver.addEventListener("onSaveHorseProfile", showStartPage);
		horseProfileSaver.addEventListener("onDeleteNewHorseProfile", showStartPage);
	}	

	function addListenersToHorseProfileChanger(){
		horseProfileChanger.addEventListener("onEnoughAttributes", showHorseProfileSaver);
		horseProfileChanger.addEventListener("onHorseSaved", showStartPage);
	}

	function addListenersToLoginPage(){
		loginPage.addEventListener("showStartPage", showStartPage);
		loginPage.addEventListener("createNewUser", showUserCreatorPage);
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
		userProfilPage.addEventListener("onProfileOkay", showStartPage);
		userProfilPage.addEventListener("onChangeProfile", changeUser);
		userProfilPage.addEventListener("onDeleteProfile", showStartPage);
	}

	function addListenersToUserProfileSaver(){
		userProfileSaver.addEventListener("onChangeUserProfile", changeUser);
		userProfileSaver.addEventListener("onSaveUserProfile", showStartPage);
		userProfileSaver.addEventListener("onDeleteNewUserProfile", showStartPage);
	}

	function addListenersToUserProfileChanger(){
		userProfileChanger.addEventListener("onEnoughAttributes", showUserProfileSaver);
		userProfileChanger.addEventListener("onHorseSaved", showStartPage);
	}

	function addListenersToUserProfileCreator() {
		userCreatorPage.addEventListener("onEnoughAttributes", showUserProfileSaver);
	}	

	
	function showHelpPage(){}
	function showSingleDates(){}
	function showCreateSingleDate(){}
	function logoutUser(){}

	function showSingleDatesCreatorPage() {
		pageChanger.switchPage("CREATE_DATE");
		datesCreatorPageSingle.init();
	}

	/**
	* @function showAllDates
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows all dates to the user
	*/ 
	function showAllDates(){
		pageChanger.switchPage("DATES");
		datesPage.init();
	}
	
	/**
	* @function showRegularDates
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows all regular dates to the user
	*/ 
	function showRegularDates(){
		pageChanger.switchPage("REGULAR_DATES_PAGE");
		datesPageRegular.init();
	}

	function showRegularDatescreatorPage() {
		pageChanger.switchPage("REGULAR_DATES_creator_PAGE");
		datescreatorPageRegular.init();
	}

	function changeSingleDate() {
		
	}

	function changeRegularDate() {

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
	function showHorseProfilePage(){
		let horseId = "myHorse",
		data = {name :"dieter", birth: "24.0488", race: "harfling",  comp: "ja", owner: "klaus", sex: "male", height :"1, 60m", raiser:"unknown"}
		pageChanger.switchPage("HORSE_PROFILE");
		horseProfilPage.init(data);
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
		let attributes = event.details.attributes;
		pageChanger.switchPage("USER_PROFILE_SAVER");
		userProfileSaver.init(attributes);
	}

	function changeUser(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;
			pageChanger.switchPage("CREATE_USER");			
			userProfileChanger.init(attributes);
		}		
	}

	
	that.init = init;
	that.showAllDates = showAllDates;
	that.showRegularDates = showRegularDates;
	that.showSingleDatesCreatorPage = showSingleDatesCreatorPage;
	that.showRegularDatescreatorPage = showRegularDatescreatorPage;
	that.showHorseProfilePage = showHorseProfilePage;	
	that.showHorseCreatorPage = showHorseCreatorPage;	
	that.showLoginPage = showLoginPage;
	that.showStartPage = showStartPage;
	that.showUserProfilPage = showUserProfilPage;	
	that.showUserCreatorPage = showUserCreatorPage;	
	return that;
}


