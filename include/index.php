<?php
session_start();
if (isset($_SESSION['noice']))
{
    echo "<meta http-equiv='refresh' content='0;url=../'>";
}else{
    include ('login.php');
}
