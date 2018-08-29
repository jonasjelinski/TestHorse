<?php

require_once '../core/init.php';

if(Input::exists($_SERVER['REQUEST_METHOD'])){
	
	$db = Database::getInstance();
	$dbUpdate=new DBUpdate();

	switch ($_POST['action']) {
			
			
case ActionUpdate::UPDATE_USER:
$dbUpdate->updateUser($_POST['userID'],$_POST['name'],$_POST['email'],$_POST['dateOfBirth'],$_POST['password']);
break;
			
	
case ActionUpdate::UPDATE_HORSE:		$dbUpdate->updateHorse($_POST['dateID'],$_POST['horseID'],$_POST['name'],$_POST['owner'],$_POST['race'],$_POST['dateOfBirth'],$_POST['photo'],$_POST['sex'],$_POST['height'],$_POST['grower'],$_POST['userID']);
break;
			
case ActionUpdate::UPDATE_DATE:		$dbUpdate->updateDate($_POST['dateID'],$_POST['horseID'],$_POST['title'],$_POST['date'],$_POST['time'],$_POST['location'],$_POST['dateFuture'],$_POST['timeFuture'],$_POST['valueRegular'],$_POST['unitRegular']);
break;	
			
case ActionUpdate::UPDATE_REMINDER_NOTIFICATION:		
$dbUpdate->updateReminderNotification($_POST['dateID'],$_POST['date'],$_POST['time']);
break;

case ActionUpdate::UPDATE_REMINDER_REGULAR:		
$dbUpdate->updateReminderRegular($_POST['dateID'],$_POST['date'],$_POST['time'],$_POST['name'],$_POST['number']);
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