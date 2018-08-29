<?php

class Sendmail{
	
	
	
	private $mailer,
			$smtpServer=MailerConstants::MAIL_SMTP,
			$port=MailerConstants::MAIL_PORT,
			$userName=MailerConstants::MAIL_USERNAME,
			$name=MailerConstants::MAIL_SENDER,
			$password=MailerConstants::MAIL_PASSWORD,
			$smtpSecure=MailerConstants::MAIL_SECURE;
	
			
		
public function __construct(){
	
	$this->mailer = new PHPMailer;
}
		
	
public function checkSMTPServerStatus(){
		

	$smtp = new SMTP;
	
	if (!$smtp->connect($this->smtpServer, $this->port)) {
		$smtp->quit(true);
        return false;
    }
	else{
		$smtp->quit(true);
		return true;
	}

	
	}
	
	public function sendConfirmationMail($userEmail,$userID){
		

		
	$this->mailer->isSMTP();                     
	$this->mailer->Host = $this->smtpServer;
	$this->mailer->SMTPAuth = true;
	$this->mailer->Username = $this->userName;
	$this->mailer->Password = $this->password;
	$this->mailer->SMTPSecure = $this->smtpSecure;
	$this->mailer->Port = $this->port;
	$this->mailer->setFrom($this->userName, $this->name);
	$this->mailer->addAddress($userEmail);


	
	$confirmationId=$userID;
	
		
	$content = str_replace('%id%', $userID, file_get_contents(MailerConstants::MAIL_CONFIRMATION_URL));
	
	
	
	$this->mailer->isHTML(true);                                  
	$this->mailer->Subject = MailerConstants::MAIL_SUBJECT_MAIL;

	$this->mailer->msgHTML($content, dirname(__FILE__));

	$this->mailer->AltBody = MailerConstants::MAIL_ALT_EMAIL_TEXT.''.MailerConstants::MAIL_ALT_EMAIL_URL;
	
	if($this->mailer->Send()){
		return true;
	}else{
		return false;
	}

		
	}
	

	


}


?>



