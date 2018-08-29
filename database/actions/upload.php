<?php

require_once '../core/init.php';

if(Input::exists($_SERVER['REQUEST_METHOD'])){
	if(!Input::areFieldsEmpty($_POST)){
		if(!Input::fileUpload($_FILES['file'])){
		

	$path = "../img/";
    $path = $path . basename( $_FILES['file']['name']);
	$path_parts = pathinfo($path);
	$extension = $path_parts['extension'];		
	$newPath="../img/".$_POST['horseID'].".$extension";
			
 	if(move_uploaded_file($_FILES["file"]["tmp_name"], $newPath)){
		$dbUpdate=new DBUpdate();
		
		$horsePicture="https://h2795767.stratoserver.net/database/img/".$_POST['horseID'].".$extension";
		$wasUploaded=$dbUpdate->updateHorsePicture($_POST['horseID'],$horsePicture);
		
		if($wasUploaded){
			echo "true";
		}else{
			echo "Upload to database failed";
		}
		
	}else{
	echo "Failed uploading file";	
	}
	   

	   
	   }else{
			echo "No File found, try again";
		}
	}
	else{
		Action::missingFields();
	}
	}else{
header(Action::redirect());
exit;	
}


?>





















