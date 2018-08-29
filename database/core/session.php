<?php

print_r($_COOKIE['userid']);

?>



<script>
	
	function initPage(){
			   let scriptLoader = new ScriptLoader();
      scriptLoader.addEventListener("onLoaded", showPage);             
      scriptLoader.loadScripts();
	}

	
</script>


<?php if(isset($_SESSION['userid']) || isset($_COOKIE['userid'])): ?>

<script >  
	
initPage();
      
       function showPage(){
	   

	           let pages = new Pages();  
            pages.init();
           pages.initAfterLogin();
            pages.showStartPage();
			//pages.showLoginPage();
	   
	   
	
	   }
        
	
</script> 

<?php endif ?>



<?php if(!isset($_SESSION['userid'])&& isset($_COOKIE['userid']) ): ?>

<script >  
	

    	initPage();
      
       function showPage(){
	   

	           let pages = new Pages();  
            pages.init();
           	pages.initAfterLogin();
            pages.showStartPage();
			//pages.showLoginPage();
	   
	   
	
  
        }
	
</script> 

<?php endif ?>




<?php if(!isset($_SESSION['userid'])&& !isset($_COOKIE['userid']) ): ?>

<script >  
	

    	initPage();
      
       function showPage(){
	   

	           let pages = new Pages();  
            pages.init();
			 //pages.initAfterLogin();
            //pages.showStartPage();
			pages.showLoginPage();
	   
	   
	
  
        }
	
</script> 

<?php endif ?>

