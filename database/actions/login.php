<?php
session_start();
require_once '../core/init.php';

if(Input::exists($_SERVER['REQUEST_METHOD'])){
	
	if(!Input::areFieldsEmpty($_POST)){
	if($_POST['action']==ActionLogin::TRY_LOGIN){
		
			$dbSelect = new DBSelect();	
			$checkUserAndPassword = $dbSelect->checkUserAndPassword($_POST['email'],$_POST['password']);
			
			if($checkUserAndPassword>0){
				ActionLogin::loginAllowed();
				
				$userID=$dbSelect->getUserID($_POST['email']);
				$_SESSION['userid'] = $userID;
				
				if($_POST['keepLogged']=='true'){
					
					setcookie("userid", $userID, time() + 3600, "/");
					$_COOKIE['userid'] = $userID;
					print_r($_COOKIE['userid']);
								
				}
				
	


				}
			else{
				ActionLogin::loginDenied();
				}
		
	}else{
		Action::wrongAction();
	}
	
	}else{
		Action::missingFields();
	}
	
	
	
	
	}
	else{
		header(Action::redirect());
		exit;	
	}
?>


