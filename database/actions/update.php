<?php

require_once '../core/init.php';

if(Input::exists($_SERVER['REQUEST_METHOD'])){
	

	$dbUpdate=new DBUpdate();
	$dbSelect = new DBSelect();	
	$sendMail = new Sendmail();

	switch ($_POST['action']) {
			
			
case ActionUpdate::UPDATE_USER:
$dbUpdate->updateUser($_POST['userID'],$_POST['name'],$_POST['email'],$_POST['dateOfBirth'],$_POST['password'],$_POST['orderPosition']);
break;
			
	
case ActionUpdate::UPDATE_HORSE:	
		$dbUpdate->updateHorse($_POST['horseID'],$_POST['name'],$_POST['owner'],$_POST['race'],$_POST['dateOfBirth'],$_POST['sex'],$_POST['height'],$_POST['grower'],$_POST['type'],$_POST['userID'],$_POST['orderPosition']);
break;
			
case ActionUpdate::UPDATE_DATE:		$dbUpdate->updateDate($_POST['dateID'],$_POST['horseID'],$_POST['title'],$_POST['date'],$_POST['time'],$_POST['location'],$_POST['dateFuture'],$_POST['timeFuture'],$_POST['valueRegular'],$_POST['unitRegular'],$_POST['orderPosition']);
break;	
			
case ActionUpdate::UPDATE_REMINDER_NOTIFICATION:		
$dbUpdate->updateReminderNotification($_POST['dateID'],$_POST['date'],$_POST['time']);
break;

case ActionUpdate::UPDATE_REMINDER_REGULAR:		
$dbUpdate->updateReminderRegular($_POST['dateID'],$_POST['date'],$_POST['time'],$_POST['name'],$_POST['number']);
break;			
			
		case ActionUpdate::UPDATE_FORGOT_PASSWORD:
		$userID=$dbSelect->getUserID($_POST['email']);
			if(!empty($userID)){
				
				$wasUpdatedPassword=$dbUpdate->updateForgotPassword($userID);
				
				if(!$wasUpdatedPassword){
					echo "DB Request went wrong";
				}else{
					
					echo $wasUpdatedPassword;
							if($sendMail->checkSMTPServerStatus()){
					$wasSend=$sendMail->sendNewPassword($_POST['email'],$wasUpdatedPassword);
								if($wasSend){
									echo "true";
								}else{
									echo "could not send Mail";
								}
				}
				else{
					ActionSet::mailServerDown();
				}
				}
				
				
			}else{
			echo "Email does net exists";	
			}
			
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