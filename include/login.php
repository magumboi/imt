<?php
session_start();
if (isset($_SESSION['noice'])) {
    echo "<meta http-equiv='refresh' content='0;url=../'>";
}
else {
    echo '

    <!DOCTYPE html >
<html lang = "en" >

<head >

    <meta charset = "utf-8" >
    <meta http-equiv = "X-UA-Compatible" content = "IE=edge" >
    <meta name = "viewport" content = "width=device-width, initial-scale=1, user-scalable=no" >
    <meta name = "description" content = "" >
    <meta name = "author" content = "Iván Gerardo Caldera Hermosillo" >

    <title > Instagram Moderation Tool </title >

    <link href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel = "stylesheet" >
    <link href = "../css/login.css" rel = "stylesheet" >
    <link href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel = "stylesheet" type = "text/css" >

</head >

<body >

<div id = "wrapper" >
    <div class="container" >
        <div class="card card-container" >
            <h4 align = "center" ><i class="fa fa-instagram" ></i > Instagram Moderation Tool </h4 >
            <p id = "profile-name" class="profile-name-card" ></p >
            <form class="form-signin" id = "loginform" >
                <span id = "reauth-email" class="reauth-email" ></span >
                <input type = "text" id = "user" class="form-control" placeholder = "Username" required autofocus >
                <input type = "password" id = "pass" class="form-control" placeholder = "Password" required >
                <button class="btn btn-lg btn-primary btn-block btn-signin" type = "submit" > Sign in </button >
            </form >
        </div >
    </div >
</div >

<!--jQuery -->
<script src = "https://code.jquery.com/jquery-3.2.1.min.js" integrity = "sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin = "anonymous" ></script >
<script src = "../js/login.js" ></script >
<script src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script >

</body >

</html >

';}