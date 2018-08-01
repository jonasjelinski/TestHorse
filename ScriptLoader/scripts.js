/*---PAGE: SCRIPTS--*/

//contains all pathes of the script-files

var ScriptLoader = ScriptLoader || {};

ScriptLoader.Scripts = (function(){
	"use strict";

	let scripts = [
	"./libs/underscore/underscore.js",
	"./libs/underscore/underscore-min.js",	
	"./DropList/dropList.js",
	"./DropList/listElement.js",
	"./DropList/listModel.js",
	"./DropList/listView.js",
	"./HamburgerMenu/hamburgerMenu.js",
	"./HamburgerMenu/hamburgerMenuModel.js",	
	"./HamburgerMenu/hamburgerMenuView.js",
	"./LoginPage/loginPage.js",
	"./LoginPage/loginModel.js",	
	"./LoginPage/loginView.js",
	"./Pages/pageChanger.js",
	"./Pages/pageContent.js",
	"./Pages/pageCreator.js",
	"./Pages/pages.js",
	];

	return scripts;
}());

