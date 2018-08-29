<?php

require_once '../core/init.php';

if(Input::exists($_SERVER['REQUEST_METHOD'])){
	
	$dbDelete =new DBDelete();

	switch ($_POST['action']) {
			
   			case ActionDelete::DELETE_USER_FROM_DB:
			$dbDelete->deleteUser($_POST['userID']);
       		break;
			

			case ActionDelete::DELETE_HORSE_FROM_DB:
			$dbDelete->deleteHorse($_POST['horseID']);
       		break;

			case ActionDelete::DELETE_DATE_FROM_DB:
			$dbDelete->deleteDate($_POST['dateID']);
       		break;
			
			case ActionDelete::DELETE_REMINDER_NOTIFICATOIN_DB:
			$dbDelete->deleteReminderNotification($_POST['dateID']);
       		break;
			
			case ActionDelete::DELETE_REMINDER_REGULAR_DB:
			$dbDelete->deleteReminderRegular($_POST['dateID']);
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