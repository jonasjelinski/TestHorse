var Pages = Pages || {};

/**
 * @namespace Pages
 * @memberOf! Pages
 * @description Central modul of <code>Pages</code> which handles the communcation between the different pages.
 * <code><Pages/code> contains all pages of the app and determines which page should be showed to the client
 */
Pages = function(){
	let that = {},
		pageDomElement,
		pageChanger,
		loginPage,
		startPage,
		userProfilPage,
		horseProfilPage,
		datesPage,
		regularDatesPage,
		appointmentsPage,
		horseCreatorPage,
		user;

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
		loginPage = new LoginPage();
		startPage = new StartPage();
		userProfilPage = new UserProfilPage();
		datesPage = new DatesPage();
		regularDatesPage = new RegularDatesPage();
		horseProfilPage = new HorseProfilePage();
		horseCreatorPage = new HorseCreatorPage();
		horseProfileChanger = new HorseProfileChanger();		
	}

	/**
	* @function initPageCommunication
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description sets up the communication between the different pages
	*/ 
	function initPageCommunication(){
		loginPage.addEventListener("showStartPage", showStartPage);
		startPage.addEventListener("showProfilePage", showUserProfilPage);
		startPage.addEventListener("showHelpPage", showHelpPage);
		startPage.addEventListener("logoutUser", logoutUser);
		startPage.addEventListener("showHorseDates", showAllDates);
		startPage.addEventListener("showHorseProfile", showHorseProfile);
		startPage.addEventListener("createNewHorse", showHorseCreatorPage);
		userProfilPage.addEventListener("onProfileOkay", showStartPage);
		datesPage.addEventListener("showRegularDates", showRegularDates);
		datesPage.addEventListener("showCreateSingleDate", showCreateSingleDate);
		regularDatesPage.addEventListener("showAllDates", showAllDates);
		horseProfilPage.addEventListener("onProfileOkay", showStartPage);
		horseCreatorPage.addEventListener("onEnoughAttributes", showHorseProfileChanger);
		horseCreatorPage.addEventListener("onHorseSaved", showStartPage);
		horseProfileChanger.addEventListener("onChangeHorseProfile", changeNewHorse);
		horseProfileChanger.addEventListener("onSaveHorseProfile", saveNewHorse);
		horseProfileChanger.addEventListener("onDeleteNewHorseProfile", showStartPage);		
	}

	function showHelpPage(){}
	function showSingleDates(){}
	function showCreateSingleDate(){		
	}
	function logoutUser(){

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
	* @function showUserProfilPage
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the user profil to the user
	*/ 
	function showUserProfilPage(){
		pageChanger.switchPage("USER_PROFILE");
		userProfilPage.init();
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
		regularDatesPage.init();
	}

	/**
	* @function showHorseProfile
	* @private
	* @memberof! Pages.PageChanger  
	* @instance
	* @description shows the data of one horse to the user
	*/ 
	function showHorseProfile(){
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

	function showHorseProfileChanger(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;
			pageChanger.switchPage("HORSE_PROFILE_CHANGE");
			horseProfileChanger.init(attributes);				
		}			
	}

	function saveNewHorse(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;
			horseCreatorPage.saveHorse(attributes);
		}
	}

	function changeNewHorse(event){
		let attributes;
		if(event){
			attributes = event.details.attributes;
			pageChanger.switchPage("CREATE_HORSEBOX");
			horseCreatorPage.changeHorse(attributes);
		}
		
	}

	that.init = init;
	that.showLoginPage = showLoginPage;
	that.showStartPage = showStartPage;
	that.showUserProfilPage = showUserProfilPage;
	that.showAllDates = showAllDates;
	that.showRegularDates = showRegularDates;
	that.showHorseProfile = showHorseProfile;	
	that.showHorseCreatorPage = showHorseCreatorPage;
	return that;
}


