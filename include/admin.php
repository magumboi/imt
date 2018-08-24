<?php
session_start();
if (!isset($_SESSION['noice']))
{
    echo "<meta http-equiv='refresh' content='0;url=include/'>";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="Iván Gerardo Caldera Hermosillo">

    <title>Instagram Moderation Tool</title>

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/imt.css" rel="stylesheet">
    <link href="css/jquery.fancybox.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.34.7/css/bootstrap-dialog.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

</head>

<body>

<div id="wrapper">
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><i class="fa fa-instagram"></i> Instagram Moderation Tool</a>
        </div>
        <ul class="nav navbar-right top-nav">
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i>  <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li>
                    <a href="#" onclick="return logout()"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                </li>
            </ul>
        </li>
        </ul>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav side-nav">
                <li>
                    <a href="#" onclick="return paginate(1,0)"><i class="fa fa-fw fa-gavel"></i> Moderate</a>
                </li>
                <li>
                    <a href="#" onclick="return paginate(2,0)"><i class="fa fa-fw fa-thumbs-up"></i> Approved</a>
                </li>
                <li>
                    <a href="#" onclick="return paginate(3,0)"><i class="fa fa-fw fa-floppy-o "></i> Saved</a>
                </li>
                <li>
                    <a href="#" onclick="return paginate(4,0)"><i class="fa fa-fw fa-user-circle-o"></i> Users</a>
                </li>
            </ul>
        </div>
    </nav>

    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">
                        <span id="hdr"><i class="fa fa-gavel"></i> Moderate</span>
                    </h1>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <form class="form-inline" id="getPhotos" style="font-size:18px">
                        <div class="form-group" id="hashtag-div">
                            <label for="hashtag">Hashtag: #</label>
                            <input type="text" class="form-control" id="hashtag" pattern="^[a-zA-Z0-9]+$" autofocus required>
                        </div>
                        <div class="form-group" id="max-div">
                            <label for="max">Max Photos:</label>
                            <select id="max" class="selectpicker" data-width="60px" data-style="btn-primary">
                                <option value="33">33</option>
                                <option value="20">20</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <button id="go" type="submit" style="font-size:18px" class="btn btn-success" data-loading-text='<i class="fa fa-spinner fa-spin" style="font-size:18px"></i> Loading...'>Get Photos</button>
                        <button id="go-approvals" type="button" style="font-size:18px; display: none" class="btn btn-success" data-loading-text='<i class="fa fa-spinner fa-spin" style="font-size:18px"></i> Loading...'>Get Photos</button>
                    </form>
                    <hr/>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12" id="alerts">
                </div>
                <div class="col-lg-12" id="photos">
                </div>
            </div>

        </div>
    </div>
    <a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top" role="button" title="Click to return on the top page" data-toggle="tooltip" data-placement="left"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>

</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>

<!-- Bootstrap Core JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/jquery.fancybox.min.js"></script>
<!--script src="js/api-instagram.js"></script>
<script src="js/moderate.js"></script>
<script src="js/getphotos.js"></script>
<script src="js/pagination.js"></script>
<script src="js/scrollToTop.js"></script-->
<script src="js/app.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.34.7/js/bootstrap-dialog.min.js"></script>
</body>

</html>
