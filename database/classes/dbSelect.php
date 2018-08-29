<?php

require_once '../core/init.php';

class DBSelect extends Database{

	public function __construct() {
		parent::__construct();
	}

	public function checkConfirmation($userID){
		$this->sql = "SELECT confirmed_mail FROM users where id= '$userID'";
		$values=$this->executeSelectSql($this->sql);
		return $values[0]['confirmed_mail'];
	}

	public function checkUserAndPassword($email,$password){
		$this->sql = "SELECT id,email FROM users WHERE email='$email' AND password='$password' AND confirmed_mail='1'";
		$this->query = $this->pdo->query($this->sql);
		return $this->query->rowCount();
	}

	public function getUserID($email){
		$this->sql = "SELECT * FROM users where email = '$email'";
		return $this->executeSelectSql($this->sql)[0]['id'];
	}

	public function getUserData($id){
		$this->sql = "SELECT * FROM users where id = '$id'";
		return json_encode($this->executeSelectSql($this->sql));
	}

	public function getHorsesData($id){
		$this->sql = "SELECT * FROM horses where user_id= '$id'";
		return json_encode($this->executeSelectSql($this->sql));
	}

	public function getHorseData($id){
		$this->sql = "SELECT * FROM horses where id= '$id'";
		return json_encode($this->executeSelectSql($this->sql));
	}

	public function getHorseDates($id){
		$this->sql = "SELECT * FROM dates where horse_id= '$id'";
		return json_encode($this->executeSelectSql($this->sql));
	}

	public function getHorseDate($id){
		$this->sql = "SELECT * FROM dates where id= '$id'";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	public function getHorseEvents($id){
		$this->sql = "SELECT * FROM horse_event where horse_id='$id'";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	public function getHorseEvent($id){
		$this->sql = "SELECT * FROM horse_event where id='$id'";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	public function getReminderNotification($id){
		$this->sql = "SELECT * FROM reminder_notification where dates_id='$id'";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	public function getReminderRegular($id){
		$currentTime=date('H:i:s');
		$this->sql = "SELECT * FROM reminder_regular where dates_id='$id'";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	public function getHorseDatesPassed($id){
		$currentDate=date('Y-m-d');
		$currentTime=date('H:i:s');
		$this->sql = "SELECT * FROM dates where horse_id= '$id' AND date < '$currentDate' AND time >'$currentTime'";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	public function getHorseDatesFuture($id){
		$currentDate=date('Y-m-d');
		$currentTime=date('H:i:s');
		$this->sql = "SELECT * FROM dates where horse_id= '$id' AND date > '$currentDate' AND time >'$currentTime'";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	public function getHorseReminderNotification($id){
		$this->sql = "SELECT * FROM dates,reminder_notification where dates.id='$id' AND reminder_notification.dates_id= dates.id";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	public function getHorseReminderRegular($id){
		$this->sql = "SELECT * FROM dates,reminder_regular where dates.id='$id' AND reminder_regular.dates_id= dates.id";
		$values=$this->executeSelectSql($this->sql);
		return json_encode($values);
	}

	private function executeSelectSql($sql){
		try{
			$query = $this->pdo->query($sql);
			$values = $query->fetchAll(PDO::FETCH_ASSOC);
			return $values;
		}catch(PDOException $e){
			//die($e->getMessage());
			DatabaseConstants::errorMessage();
		}
	}
}
?>