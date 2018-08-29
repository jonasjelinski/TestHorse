<?php
require_once '../core/init.php';

if(Input::exists($_SERVER['REQUEST_METHOD'])){
	
	if(!Input::areFieldsEmpty($_POST)){
	if($_POST['action']==ActionLogin::TRY_LOGIN){
		
			$dbSelect = new DBSelect();	
			$checkUserAndPassword = $dbSelect->checkUserAndPassword($_POST['email'],$_POST['password']);
			
			if($checkUserAndPassword>0){
				ActionLogin::loginAllowed();
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


