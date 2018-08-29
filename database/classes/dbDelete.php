<?php

require_once '../core/init.php';

class DBDelete extends Database{

	public function __construct() {
		parent::__construct();
	}
	
		public function deleteUser($id){
	$this->sql = "DELETE FROM users WHERE id ='$id'";
		$this->executeDeleteSql($this->sql);
	}


		public function deleteHorse($id){
		$this->sql = "DELETE FROM horses WHERE id ='$id'";
		$this->executeDeleteSql($this->sql);
	}
	
		public function deleteHorsePicture($id){
			
		$this->sql = "UPDATE horses set photo = 'https://h2795767.stratoserver.net/database/img/standardPhoto.jpg' WHERE id='$id' ";

		$this->executeDeleteSql($this->sql);
		}


		public function deleteDate($id){
		$this->sql = "DELETE FROM dates WHERE id = '$id'";
		$this->executeDeleteSql($this->sql);

		$this->sql = "DELETE FROM reminder_notification WHERE dates_id='$id'";
		$this->executeDeleteSql($this->sql,true);

		$this->sql = "DELETE FROM reminder_regular WHERE dates_id='$id'";
		$this->executeDeleteSql($this->sql,true);
	}

		public function deleteReminderNotification($id){
		$this->sql = "UPDATE reminder_notification set date = NULL,time = NULL WHERE dates_id='$id' ";

		$this->executeDeleteSql($this->sql);
	}

		public function deleteReminderRegular($id){
		$this->sql = "UPDATE reminder_regular set date = NULL,time = NULL, contact_name=NULL, contact_number=NULL WHERE dates_id='$id' ";

		$this->executeDeleteSql($this->sql);
	}
	
		private function executeDeleteSql($sql,$oneToOneRelation){
			try{

				if(!$oneToOneRelation){
				$query=$this->pdo->query($sql);

						if($query->rowCount()>0){
					DatabaseConstants::successMessage();
				}else{
					DatabaseConstants::noResultMessage();
				}
				}

			}
		catch(PDOException $e){
		//die($e->getMessage());
		DatabaseConstants::errorMessage();
		}

	}
	



}
?>