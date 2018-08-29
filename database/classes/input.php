<?php

class Input{
	
	public static function exists($type){
		switch($type){
			case 'POST':
				return (!empty($_POST)) ? true : false;
			break;
			
			case 'GET':
				return (!empty($_GET))  ? true : false;
			break;
			
			default:
			return false;
			break;
			
		}
	}
	
	public static function areFieldsEmpty($typeValues){
		
		foreach ($typeValues as $key => $value) {
			if(empty($typeValues[$key])){
				return true;
			}
		}
	return false;
	}
}

?>