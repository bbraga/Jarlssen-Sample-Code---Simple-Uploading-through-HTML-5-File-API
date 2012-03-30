<?php
/****************************************************************************************************
This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. 
To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ or send 
a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

Copyright 2012 @ Bruno Braga
****************************************************************************************************/
       
$fileName = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
    
// just as a precaution lets make sure some harmful files can't be uploaded
$backlist = array('php', 'php3', 'php4', 'phtml','exe');
if(in_array(end(explode('.', $fileName)), $backlist))
{
    echo "<p class='upload-red'>Invalid file type!</p>";
    exit(0);
}
            
if ($fileName) {  
    // XHR request
    file_put_contents(  
        './' . $fileName,  
        file_get_contents('php://input')  
    );  
    echo "<p class='upload-green'>$fileName uploaded successfully!</p>";  
    exit();  
} 