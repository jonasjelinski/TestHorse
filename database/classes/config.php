<?php
class DatabaseConstants{
	
	const DATABASE_NAME = "Consilium_Equorum";
	const DATABASE_SERVER = "81.169.212.180";
	const DATABASE_USER = "chris";
	const DATABASE_PASSWORD ="ultima001";
	
	const DATABASE_SUCCESS_MESSAGE = "true";
	const DATABASE_NO_REULT_MESSAGE = "No results";
	const DATABASE_ERROR_MESSAGE = "Failed preparing database request";

	public static function successMessage(){
		echo self::DATABASE_SUCCESS_MESSAGE;
	}
	
	public static function errorMessage(){
		echo self::DATABASE_ERROR_MESSAGE;
	}
	
	public static function noResultMessage(){
		echo self::DATABASE_NO_REULT_MESSAGE;
	}
}

class MailerConstants{
	
	const MAIL_SMTP="mail.gmx.net";
	const MAIL_PORT=587;
	const MAIL_USERNAME="christian.lisik@gmx.net";
	const MAIL_SENDER="Consilium Equorum";
	const MAIL_PASSWORD ="ultima001";
	const MAIL_SECURE = "tls";
	
	const MAIL_CONFIRMATION_URL ='../mailTemplates/confirmationMail.html';
	const MAIL_FORGOT_PASSWORD_URL ='../mailTemplates/forgotPwMail.html';

	
	const MAIL_SUBJECT_CONFIRM_MAIL ='Sie haben sich bei consilium equorum registriert';
	const MAIL_SUBJECT_FORGOT_PW_MAIL = 'Sie haben ihr Passwort bei consilium equorum zurückgesetzt';
	
	const MAIL_ALT_EMAIL_CONFIRM_TEXT = 'Bitte bestätigen Sie Ihr Konto bei consilium equorum: ';
	const MAIL_ALT_EMAIL_FORGOT_PW_TEXT = 'Sie haben ihr Passwort zurückgesetzt';
	
	const MAIL_ALT_EMAIL_CONFIRM_URL ='https://h2795767.stratoserver.net/database/actions/confirm.php/?ConfirmationId=%id%';
	const MAIL_ALT_FORGOT_PW_URL = 'https://h2795767.stratoserver.net/';
}

class ActionSet{
	
	const SET_USER = "setUserIntoDB";
	const SET_HORSE = "setHorseIntoDB";
	const SET_DATE = "setDateIntoDB";
	const SET_HORSE_EVENT = "setHorseEventIntoDB";
	
	const MAIL_SERVER_DOWN ="Mailserver currently now available";
	const EMAIL_ALREADY_EXISTS ="Email already exists";
	
	public static function mailServerDown(){
		echo self::MAIL_SERVER_DOWN;
	}
	
	public static function emailAlreadyExists(){
		echo self::EMAIL_ALREADY_EXISTS;
	}
}

class ActionLogin{
	const TRY_LOGIN = "tryLogin";
	const LOGIN_ALLOWED = "true";
	const FALSE_INPUT = "Some inputs were missing or incorrect";
	const LOGIN_DENIED = "Username or passwod incorrect. May you missed to certify your email";

	
	public static function falseInput(){
		echo self::FALSE_INPUT;
	}
	
	public static function loginDenied(){
		echo self::LOGIN_DENIED;
	}
	
	public static function loginAllowed(){
		echo self::LOGIN_ALLOWED;
	}
	


}

class ActionGet{
	const GET_USER_ID = "getUserID";
	const GET_USER_DATA = "getUserData";
	const GET_HORSES_USER = "getAllHorsesOfUser";
	const GET_HORSE = "getHorse";
	const GET_HORSE_DATES = "getAllHorseDates";
	const GET_HORSE_DATE = "getHorseDate";
	const GET_HORSE_EVENTS = "getAllHorseEvents";
	const GET_HORSE_EVENT = "getHorseEvent";
	const GET_REMINDER_NOTIFICATION = "getReminderNotification";
	const GET_REMINDER_REGULAR = "getReminderRegular";
	const GET_DATES_HORSE_PASSED = "getAllDatesHorsesPassed";
	const GET_DATES_HORSE_FUTURE = "getAllDatesHorsesFuture";
	const GET_HORSE_REMINDER_NOTIFICATION = "getHorseReminderNotification";
	const GET_HORSE_REMINDER_REGULAR = "getHorseReminderRegular";

}


class ActionDelete{
	const DELETE_USER_FROM_DB = "deleteUserFromDB";
	const DELETE_HORSE_FROM_DB = "deleteHorseFromDB";
	const DELETE_HORSE_PICTURE_FROM_DB = "deleteHorsePictureFromDB";
	const DELETE_DATE_FROM_DB = "deleteDateFromDB";
	
	const DELETE_REMINDER_NOTIFICATOIN_DB="deleteReminderNotificationFromDB";
	const DELETE_REMINDER_REGULAR_DB="deleteReminderRegularFromDB";
	
}

class ActionUpdate{
	
	const UPDATE_USER = "updateUser";
	const UPDATE_HORSE ="updateHorse";
	const UPDATE_DATE ="updateDate";
	const UPDATE_REMINDER_NOTIFICATION="updateReminderNotification";
	const UPDATE_REMINDER_REGULAR="updateReminderRegular";
	const UPDATE_FORGOT_PASSWORD="updateForgotPassword";
}

class Action {
	
	
	const WRONG_ACTION = "Your Action request was wrong";
	const FIELDS_MISSING = "Not all Fields were filled";
	const REDIRECT_LINK = "Location: https://h2795767.stratoserver.net/";
	const SUCCESS_SITE = "Location: https://h2795767.stratoserver.net/database/mailTemplates/successSite.html";
	const FAILURE_SITE = "Location: https://h2795767.stratoserver.net/database/mailTemplates/failureSite.html";
	
	public static function wrongAction(){
		echo self::WRONG_ACTION;
	}
	
	public static function missingFields(){
		echo self::FIELDS_MISSING;
	}
	
	public static function redirect(){
		return self::REDIRECT_LINK;
	}
	
	public static function successSite(){
		return self::SUCCESS_SITE;
	}
	
	public static function failureSite(){
		return self::FAILURE_SITE;
	}
	
	public static function convertLoginOutput($input){
		if($input){
			echo "true";
		}
		else{
			echo "undefined";
		}
	}
	
	public static function convertGetOutput($input){
		if(isset($input)){
			
			if((string)$input=='[]'){
				echo "No results found (Empty object)";	
			}else{
				echo $input;
			}
		}	
		else{
			echo "Could not resolve request (Wrong data)";
		}
	}

	

	

	

}


?>