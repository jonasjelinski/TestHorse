/*---PAGE: SCRIPTS--*/

//contains all pathes of the script-files

var ScriptLoader = ScriptLoader || {};

ScriptLoader.Scripts = (function(){
	"use strict";

	let scripts = [
	"./DatabaseClientInterface/dbRequestModul.js",
	"./DatabaseClientInterface/ajaxModul.js",
	"./DatabaseClientInterface/dbClientInterface.js",
	"./libs/underscore/underscore.js",
	"./libs/underscore/underscore-min.js",
	"./Profiles/profileControll.js",
	"./Profiles/profileControllTypes.js",		
	"./Profiles/profileDisplayControll.js",	
	"./Profiles/profileChangeControll.js",	
	"./Profiles/profileView.js",	
	"./Profiles/profileDisplayPage.js",	
	"./HorseBox/horsebox.js",	
	"./DropList/dropList.js",
	"./DropList/listElement.js",
	"./DropList/listModel.js",
	"./DropList/listView.js",
	"./Slideshow/slideshow.js",
	"./Slideshow/slideshowModel.js",
	"./Slideshow/slideshowView.js",
	"./MainPage/mainPage.js",
	"./HamburgerMenu/hamburgerMenu.js",
	"./HamburgerMenu/hamburgerMenuModel.js",	
	"./HamburgerMenu/hamburgerMenuView.js",
	"./LoginPage/loginPage.js",
	"./LoginPage/loginModel.js",	
	"./LoginPage/loginView.js",
	"./UserProfilePage/userProfilePage.js",
	"./UserProfilePage/userProfilePageModel.js",	
	"./UserProfilePage/userProfilePageViewControll.js",
	"./RegularDatesPage/regularDatesPage.js",
	"./RegularDatesPage/regularDatesControll.js",	
	"./RegularDatesPage/regularDatesModel.js",
	"./Pages/pages.js",
	"./Pages/pageChanger.js",
	"./Pages/pageContent.js",
	"./Pages/pageCreator.js",	
	];

	return scripts;
}());

