<?php
require_once '../core/init.php';

if(Input::exists($_SERVER['REQUEST_METHOD'])){
	
		$db = Database::getInstance();
		$dbUpdate=new DBUpdate();
		$dbSelect = new DBSelect();
	
		$isConfirmationTrue=$dbSelect->checkConfirmation($_GET['ConfirmationId']);
		if($isConfirmationTrue){
			header(Action::failureSite());
		}else{
			$dbUpdate->updateConfirmation($_GET['ConfirmationId']);
			header(Action::successSite());
		}

	}
	else{
		header(Action::redirect());
		exit;	
	}
?>
