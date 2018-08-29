<?php

require_once '../core/init.php';

class DBInsert extends Database{
	
		public function __construct() {
		parent::__construct();
	}
	
		public function insertUser($name,$email,$dateOfBirth,$password,$orderPosition){
		$this->sql = "INSERT INTO users (name,email,date_of_birth,password,order_position) VALUES ('$name','$email','$dateOfBirth','$password','$orderPosition')";
		$this->executeInsertSql($this->sql);
	}

	public function insertHorse($name,$owner,$race,$dateOfBirth,$sex,$height,$grower,$type,$userID,$orderPosition){
		$this->sql = "INSERT INTO horses (name,owner,race,date_of_birth,sex,height,grower,type,user_id,order_position) VALUES ('$name','$owner','$race','$dateOfBirth','$sex','$height','$grower','$type','$userID','$orderPosition')";
		$this->executeInsertSql($this->sql,true);
		$lastID=$this->pdo->lastInsertId();
		echo $lastID;
		
	}

	public function insertDate($horseID,$title,$date,$time,$location,$dateFuture,$timeFuture,$valueRegular,$unitRegular,$orderPosition){
		$this->sql = "INSERT INTO dates (horse_id,title,date,time,location,date_future_date,time_future_time,value_regular,unit_regular,order_position)VALUES ('$horseID','$title','$date','$time','$location','$dateFuture','$timeFuture','$valueRegular','$unitRegular','$orderPosition')";
		$this->executeInsertSql($this->sql,true);

		$lastID=$this->pdo->lastInsertId();

		$this->insertReminderNotification($lastID);
		$this->insertReminderRegular($lastID);
		echo $lastID;
	}

	private function insertReminderNotification($id){
		$this->sql = "INSERT INTO reminder_notification (dates_id)VALUES ('$id')";
		$this->executeInsertSql($this->sql,true);
	}

	private function insertReminderRegular($id){
		$this->sql = "INSERT INTO reminder_regular (dates_id)VALUES ('$id')";
		$this->executeInsertSql($this->sql,true);
	}
	
		private function executeInsertSql($sql,$oneToOneRelation){
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