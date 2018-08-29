<?php
session_start();
session_destroy();
setcookie('userid','',time()-3600,'/');

require_once '../core/init.php';

	
?>


