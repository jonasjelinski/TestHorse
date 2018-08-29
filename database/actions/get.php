<?php

require_once '../core/init.php';


if(Input::exists($_SERVER['REQUEST_METHOD'])){
	
	$dbSelect = new DBSelect();	

	switch ($_POST['action']) {
    case ActionGet::GET_USER_ID:
			$userID=$dbSelect->getUserID($_POST['email']);
			Action::convertGetOutput($userID);
       		break;
			
	case ActionGet::GET_USER_DATA:
			$userData=$dbSelect->getUserData($_POST['userID']);
			Action::convertGetOutput($userData);
			break;
			
	case ActionGet::GET_HORSES_USER:
			$horsesData=$dbSelect->getHorsesData($_POST['userID']);
			Action::convertGetOutput($horsesData);
			break;
			
	case ActionGet::GET_HORSE:
			$horseData=$dbSelect->getHorseData($_POST['horseID']);
			Action::convertGetOutput($horseData);
			break;
			
	case ActionGet::GET_HORSE_DATES:
			$horseDates=$dbSelect->getHorseDates($_POST['horseID']);
			Action::convertGetOutput($horseDates);
			break;
			
	case ActionGet::GET_HORSE_DATE:
			$horseDate=$dbSelect->getHorseDate($_POST['dateID']);
			Action::convertGetOutput($horseDate);
			break;
			
			
	case ActionGet::GET_REMINDER_NOTIFICATION:
			$reminderNotification=$dbSelect->getReminderNotification($_POST['dateID']);
			Action::convertGetOutput($reminderNotification);
			break;
			
			case ActionGet::GET_REMINDER_REGULAR:
			$reminderRegular=$dbSelect->getReminderRegular($_POST['dateID']);
			Action::convertGetOutput($reminderRegular);
			break;
			
			
			case ActionGet::GET_DATES_HORSE_PASSED:
			$horseDatesPassed=$dbSelect->getHorseDatesPassed($_POST['horseID']);
			Action::convertGetOutput($horseDatesPassed);
			break;
			
			case ActionGet::GET_DATES_HORSE_FUTURE:
			$horseDatesFuture=$dbSelect->getHorseDatesFuture($_POST['horseID']);
			Action::convertGetOutput($horseDatesFuture);
			break;
			
			case ActionGet::GET_HORSE_REMINDER_NOTIFICATION:
			$horseReminderNotification=$dbSelect->getHorseReminderNotification($_POST['dateID']);
			Action::convertGetOutput($horseReminderNotification);
			break;
			

			case ActionGet::GET_HORSE_REMINDER_REGULAR:
			$horseReminderRegular=$dbSelect->getHorseReminderRegular($_POST['dateID']);
			Action::convertGetOutput($horseReminderRegular);
			break;
			
				default: Action::wrongAction();
			break;
			

		}
	

	

	

		

	}
	

	
else{
	header(Action::redirect());
	exit;
}
	


?>