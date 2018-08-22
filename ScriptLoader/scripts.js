/*---PAGE: SCRIPTS--*/

//contains all pathes of the script-files

var ScriptLoader = ScriptLoader || {};

ScriptLoader.Scripts = (function(){
	"use strict";

	let scripts = [
	"./DatabaseClientInterface/dbClientInterface.js",
	"./DatabaseClientInterface/dbRequestModul.js",
	"./DatabaseClientInterface/ajaxModul.js",
	"./DatabaseClientInterface/simpleRequester.js",	
	"./libs/underscore/underscore.js",
	"./libs/underscore/underscore-min.js",
	"./DropdownMenu/dropdownMenu.js",
	"./DatesCreater/datesCreator.js",
	"./DatesCreater/datesCreatorModel.js",
	"./DatesCreater/datesCreatorView.js",
	"./DatesCreaterSingle/singleDatesCreator.js",
	"./DatesCreaterSingle/singleDatesCreatorPage.js",
	"./DatesCreaterSingle/singleDatesCreatorDBRequester.js",
	"./DatesCreaterSingle/singleDatesCreatorPageStandard.js",
	"./DatesCreaterRegular/regularDatesCreater.js",	
	"./DatesCreaterRegular/regularDatesCreaterView.js",
	"./DatesCreaterRegular/regularDatesCreaterPage.js",
	"./DatesCreaterRegular/regularDatesCreaterPageStandard.js",
	"./DatesCreaterRegular/regularDatesCreaterDBRequester.js",
	"./DatesChanger/datesChangerPageRegular.js",
	"./DatesChanger/datesChangerPageSingle.js",
	"./DatesChanger/datesChangerDBRequester.js",
	"./DatesChanger/datesChangerModel.js",
	"./Popup/popup.js",
	"./Profiles/profile.js",
	"./Profiles/profileControll.js",	
	"./Profiles/profileControllGeneral.js",			
	"./Profiles/profileView.js",	
	"./Profiles/profileViewAndControll.js",	
	"./HorseBox/horsebox.js",	
	"./DropList/dropList.js",
	"./DropList/listElement.js",
	"./DropList/listModel.js",
	"./DropList/listView.js",
	"./Slideshow/slideshow.js",
	"./Slideshow/slideshowProgress.js",
	"./Slideshow/slideshowPageChanger.js",
	"./Slideshow/slideshowModel.js",
	"./Slideshow/slideshowView.js",
	"./EntityCreator/entity.js",
	"./EntityCreator/entityCreator.js",
	"./EntityCreator/entityCreatorModel.js",
	"./EntityCreator/entityCreatorView.js",
	"./Creator/attributesConverter.js",
	"./Creator/creator.js",
	"./Creator/creatorModel.js",
	"./Creator/creatorView.js",
	"./Creator/creatorPage.js",
	"./Creator/changerPage.js",
	"./TalkingHorse/talkingHorse.js",
	"./HorseCreator/horseCreatorPage.js",
	"./HorseCreator/standardHorseCreatorPage.js",
	"./HorseCreator/horseCreatorSliderPages.js",
	"./HorseCreator/horseCreatorModel.js",
	"./HorseCreator/horseCreatorView.js",
	"./HorseProfileSaver/horseProfileSaver.js",
	"./HorseProfileSaver/horsePorfileSaverDBRequester.js",
	"./HorsePofileChanger/horseProfileChanger.js",	
	"./UserCreator/userCreatorPage.js",
	"./UserCreator/standardUserCreatorPage.js",
	"./UserCreator/userCreator.js",
	"./UserCreator/userCreatorInputValidator.js",
	"./UserCreator/userCreatorDBRequester.js",
	"./UserCreator/userCreatorModel.js",
	"./UserCreator/userCreatorSliderPages.js",
	"./UserCreator/userCreatorView.js",
	"./UserProfileSaver/userProfileSaver.js",
	"./UserProfileSaver/userProfileSaverModel.js",
	"./UserProfileSaver/userProfileSaverDBRequester.js",
	"./UserProfileChanger/userProfileChanger.js",
	"./TalkingHorse/talkingHorse.js",
	"./StartPage/startPage.js",
	"./StartPage/startPageControlls.js",
	"./StartPage/startPageDBRequester.js",
	"./StartPage/startPageModel.js",
	"./HamburgerMenu/hamburgerMenu.js",	
	"./HamburgerMenu/hamburgerMenuView.js",
	"./LoginPage/loginPage.js",
	"./LoginPage/loginDBRequester.js",	
	"./LoginPage/loginView.js",
	"./LogoutPage/logoutPage.js",
	"./UserProfilePage/userProfilePage.js",
	"./UserProfilePage/userProfilePageModel.js",	
	"./UserProfilePage/userProfilePageDBRequester.js",
	"./HorseProfilePage/horsePofilePage.js",
	"./HorseProfilePage/horseProfile.js",
	"./HorseProfilePage/horseProfileModel.js",
	"./HorseProfilePage/horseProfilePageDBRequester.js",
	"./DatesPageAll/allDatesPage.js",
	"./DatesPageAll/allDatesPageControll.js",	
	"./DatesPageAll/allDatesPageModel.js",
	"./DatesPageAll/allDatesDBRequester.js",
	"./DatesPageRegular/regularDatesPage.js",
	"./DatesPageRegular/regularDatesControll.js",	
	"./DatesPageRegular/regularDatesModel.js",
	"./DatesPageRegular/regularDatesDBRequester.js",
	"./Pages/pages.js",
	"./Pages/pageChanger.js",
	"./Pages/pageContent.js",
	"./Pages/pageCreator.js",	
	];

	return scripts;
}());

