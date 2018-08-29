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
				$dbInsert->insertUser($_POST['name'],$_POST['email'],$_POST['dateOfBirth'],$_POST['password'],$_POST['orderPosition']);
				$userID=$dbSelect->getUserID($_POST['email']);
				
				if(!empty($userID)){
					if($sendMail->checkSMTPServerStatus()){
					$sendMail->sendConfirmationMail($_POST['email'],$userID);
				}
				else{
					ActionSet::mailServerDown();
				}
				}
			}
			else{
				ActionSet::emailAlreadyExists();
			}
			break;

			case ActionSet::SET_HORSE:
				$dbInsert->insertHorse($_POST['name'],$_POST['owner'],$_POST['race'],$_POST['dateOfBirth'],$_POST['sex'],$_POST['height'],$_POST['grower'],$_POST['type'],$_POST['userID'],$_POST['orderPosition']);
			
			break;

			case ActionSet::SET_DATE:
			$dbInsert->insertDate($_POST['horseID'],  $_POST['title'],$_POST['date'],$_POST['time'],$_POST['location'],$_POST['dateFuture'],$_POST['timeFuture'],$_POST['valueRegular'],$_POST['unitRegular'],$_POST['orderPosition']);
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
