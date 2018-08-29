<?php

require_once '../core/init.php';

class DBUpdate extends Database{

	public function __construct() {
		parent::__construct();
	}
	

	public function updateConfirmation($userID){
		$this->sql = "UPDATE users set users.confirmed_mail=1 WHERE users.id='$userID'";
		$this->executeUpdateSql($this->sql);
	}





		public function updateUser($id, $name,$email,$dateOfBirth,$password,$orderPosition){

$this->sql = "UPDATE users set name = '$name', email ='$email', date_of_birth='$dateOfBirth', password='$password', order_position='$orderPosition' WHERE id='$id'";
$this->executeUpdateSql($this->sql);
		}

public function updateHorse($id, $name,$owner,$race,$dateOfBirth,$sex,$height,$grower,$type,$userID,$orderPosition){
$this->sql = "UPDATE horses set name = '$name', owner ='$owner', race='$race', date_of_birth='$dateOfBirth', sex='$sex', height='$height', grower='$grower',type='$type',user_id='$userID', order_position='$orderPosition' WHERE id='$id'";
$this->executeUpdateSql($this->sql);
		}
		

public function updateDate($id,$horseID,$title,$date,$time,$location,$dateFuture,$timeFuture,$valueRegular,$unitRegular,$order_position){

$this->sql = "UPDATE dates set horse_id = '$horseID', title ='$title',date='$date', time='$time', location='$location', date_future_date='$dateFuture', time_future_time='$timeFuture',value_regular='$valueRegular',unit_regular='$unitRegular',order_position='$order_position'  WHERE id='$id'";
$this->executeUpdateSql($this->sql);
		}


	public function updateReminderNotification($id, $date,$time){
$this->sql ="UPDATE reminder_notification set date = '$date', time ='$time' WHERE dates_id='$id'";
$this->executeUpdateSql($this->sql);

		}

		public function updateReminderRegular($id, $date,$time,$name,$number){
$this->sql ="UPDATE reminder_regular set date = '$date', time ='$time', contact_name='$name',contact_number='$number' WHERE dates_id='$id'";
$this->executeUpdateSql($this->sql);

		}
	
	
	public function updateHorsePicture($id, $horsePicture){
		$this->sql ="UPDATE horses set photo = '$horsePicture' WHERE id='$id'";
				try{
				$this->pdo->query($this->sql);
				return true;
			}catch(PDOException $e){
				return false;
			}
	}
	
	public function updateForgotPassword($id){
		
				$pwd = bin2hex(openssl_random_pseudo_bytes(4));
					
				$this->sql ="UPDATE users set password = '$pwd' WHERE id='$id'";
				try{
				$this->pdo->query($this->sql);
				return $pwd;
			}catch(PDOException $e){
				return false;
			}
		
	}
	
			private function executeUpdateSql($sql,$oneToOneRelation){
			try{
				$this->pdo->query($sql);
				if(!$oneToOneRelation){
					DatabaseConstants::successMessage();
				}
			}catch(PDOException $e){
				//die($e->getMessage());
				DatabaseConstants::errorMessage();
			}
	}

	



}
?>