<?php

require_once '../core/init.php';

if(Input::exists($_SERVER['REQUEST_METHOD'])){
	if(!Input::areFieldsEmpty($_POST)){
		
		$dbInsert = new DBInsert();
		$dbSelect = new DBSelect();	
		$sendMail = new Sendmail();

		switch ($_POST['action']) {

			case ActionSet::SET_USER:
			$userMail=$dbSelect->getUserID($_POST['email']);

			if(empty($userMail)){
				$dbInsert->insertUser($_POST['name'],$_POST['email'],$_POST['dateOfBirth'],$_POST['password']);
				$userID=$dbSelect->getUserID($_POST['email']);

				if($sendMail->checkSMTPServerStatus()){
					$sendMail->sendConfirmationMail($_POST['email'],$userID);
				}
				else{
					ActionSet::mailServerDown();
				}
			}
			else{
				ActionSet::emailAlreadyExists();
			}
			break;

			case ActionSet::SET_HORSE:
				$dbInsert->insertHorse($_POST['name'],$_POST['owner'],$_POST['race'],$_POST['dateOfBirth'],$_POST['photo'],$_POST['sex'],$_POST['height'],$_POST['grower'],$_POST['userID']);
				
			break;

			case ActionSet::SET_DATE:
			$dbInsert->insertDate($_POST['horseID'],  $_POST['title'],$_POST['date'],$_POST['time'],$_POST['location'],$_POST['dateFuture'],$_POST['timeFuture'],$_POST['valueRegular'],$_POST['unitRegular']);
			break;


			default: Action::wrongAction();
			break;
		}
	}
	else{
		Action::missingFields();
	}
}
else{
	header(Action::redirect());
	exit;
}
?>
