<?php

require_once 'classes/config.php';

class Database{

	protected $pdo;
	protected $sql;
	protected $query;

	private static $instance = null;

	public function __construct(){
		try{
			$this->pdo = new PDO('mysql:
			host='.DatabaseConstants::DATABASE_SERVER.';
			dbname='.DatabaseConstants::DATABASE_NAME.';',''.DatabaseConstants::DATABASE_USER.'',''.DatabaseConstants::DATABASE_PASSWORD .'');
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch (PDOException $e){
			//die($e->getMessage());
			DatabaseConstants::errorMessage();
		}
	}

	public static function getInstance(){
		if(!isset(self::$instance)){
			self::$instance = new Database();
		}
		return self::$instance;
	}
}
?>
