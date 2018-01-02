<?php
/**
 * Comunic Web APP launcher
 * 
 * @author Pierre HUBERT
 */

//We check if it is a redirection to handle 404 errors
if(isset($_SERVER["REDIRECT_URL"])){
    //We check if it is an asset request
    if(preg_match("<assets>", $_SERVER["REDIRECT_URL"])){
        //This is a 404 not found error...
        echo "<p>Error! 404 not found</p>";
        http_response_code(404);
        exit();
    }
}

//Include system
require __DIR__."/system/system.php";

//Load the page
echo load_page("dev");
