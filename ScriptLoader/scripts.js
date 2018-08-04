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
	"./DropList/dropList.js",
	"./DropList/listElement.js",
	"./DropList/listModel.js",
	"./DropList/listView.js",
	"./MainPage/mainPage.js",
	"./HamburgerMenu/hamburgerMenu.js",
	"./HamburgerMenu/hamburgerMenuModel.js",	
	"./HamburgerMenu/hamburgerMenuView.js",
	"./LoginPage/loginPage.js",
	"./LoginPage/loginModel.js",	
	"./LoginPage/loginView.js",
	"./Pages/pages.js",
	"./Pages/pageChanger.js",
	"./Pages/pageContent.js",
	"./Pages/pageCreator.js",	
	];

	return scripts;
}());

