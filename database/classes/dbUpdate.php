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





		public function updateUser($id, $name,$email,$dateOfBirth,$password){

$this->sql = "UPDATE users set name = '$name', email ='$email', date_of_birth='$dateOfBirth', password='$password' WHERE id='$id'";
$this->executeUpdateSql($this->sql);
		}

		public function updateHorse($id, $name,$owner,$race,$dateOfBirth,$photo,$sex,$height,$grower,$userID){

$this->sql = "UPDATE horses set name = '$name', owner ='$owner',race='$race', date_of_birth='$dateOfBirth', photo='$photo', sex='$sex', height='$height', grower='$grower', user_id='$userID' WHERE id='$id'";
$this->executeUpdateSql($this->sql);
		}

public function updateDate($id,$horseID,$title,$date,$time,$location,$dateFuture,$timeFuture){

$this->sql = "UPDATE dates set horse_id = '$horseID', title ='$title',date='$date', time='$time', location='$location', date_future_date='$dateFuture', time_future_time='$timeFuture'  WHERE id='$id'";
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