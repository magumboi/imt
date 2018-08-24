<?php
session_start();
include ("resultados.php") ;
$Resultados = new Resultados();
if (is_ajax()) {
    if (isset($_POST["accion"]) && !empty($_POST["accion"])) {
        $action = $_POST["accion"];
        switch($action) {
            case "login": funcion_login(); break;
            case "reg"  : funcion_registro(); break;
            case "set_photo"  : funcion_setPhoto(); break;
            case "get_photos"  : funcion_getPhotos(); break;
            case "get_approvals"  : funcion_getApprovals(); break;
            case "update"    : funcion_update(); break;
            case "approved"    : funcion_publica_getPhotos(); break;
            case "logout"   : logout(); break;
            case "delete"   : funcion_delete(); break;
        }
    }
}
if (isset($_GET["accion"]) && !empty($_GET["accion"])) {
    $action_get = $_GET["accion"];
    switch($action_get) {
        case "approved"  : funcion_publica_getPhotos(); break;
    }
}
function is_ajax(){
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
function funcion_login(){
    global $Resultados;
    $response = ['respuesta' => $Resultados -> getLog( $_POST['user'], $_POST['pass'])];
    if ($response['respuesta']){
        $_SESSION['noice'] = 1;
    }
    echo json_encode($response);
}
function funcion_getPhotos(){
    global $Resultados;
    if (!isset($_SESSION['noice'])) {
        $response = ['respuesta' => 2];
    }else{
        $response = $Resultados -> getPhotos();
    }
    echo json_encode($response);
}

function funcion_getApprovals(){
    global $Resultados;
    if (!isset($_SESSION['noice'])) {
        $response = ['respuesta' => 2];
    }else{
        $response = $Resultados -> getApprovals($_POST['bool'], $_POST['limite']);
    }
    echo json_encode($response);
}
function funcion_registro(){
    global $Resultados;
    if (!isset($_SESSION['noice'])) {
        $response = ['respuesta' => 3];
    }else {

        if (strcmp($_POST["pass"], $_POST["repass"]) !== 0) {
            $response = ['respuesta' => 2];
        } else {
            try {
                $Resultados->setReg($_POST['nombre'], $_POST['email'], $_POST['pass']);
                $response = ['respuesta' => 1];
            } catch (Exception $e) {
                $response = ['respuesta' => 0];
            }
        }
    }
        echo json_encode($response);
}
function funcion_setPhoto(){
    global $Resultados;
    if (!isset($_SESSION['noice'])) {
        $response = ['respuesta' => 2];
    }else {

            try {
                $Resultados->setPhoto($_POST['id'], $_POST['username'], $_POST['full_name'], $_POST['profile_pic'], $_POST['photo'], $_POST['caption'], $_POST['likes'], $_POST['link'],$_POST['isApproved']);
                $response = ['respuesta' => 1];
            } catch (Exception $e) {
                $response = ['respuesta' => 0];
            }

    }
    echo json_encode($response);
}
function funcion_update(){
    global $Resultados;
    if (!isset($_SESSION['noice'])) {
        $response = ['respuesta' => 2];
    }else {

        try {
            $Resultados->update($_POST['id_photo'], $_POST['bool']);
            $response = ['respuesta' => 1];
        } catch (Exception $e) {
            $response = ['respuesta' => 0, 'error' => $e];
        }

    }
    echo json_encode($response);
}
function funcion_delete(){
    global $Resultados;
    if (!isset($_SESSION['noice'])) {
        $response = ['respuesta' => 2];
    }else {

        try {
            $Resultados->delete($_POST['id_photo']);
            $response = ['respuesta' => 1];
        } catch (Exception $e) {
            $response = ['respuesta' => 0, 'error' => $e];
        }

    }
    echo json_encode($response);
}
function funcion_publica_getPhotos(){
    global $Resultados;
    $limite = $_POST['limit'];

    /** YOU CAN SET A PUBLIC MAX LIMIT HERE **/
    if($limite > 50)
        $limite = 50;

        try {
            $response = $Resultados->public_getphotos($limite);
        } catch (Exception $e) {
            $response = ['respuesta' => 0, 'error' => $e];
        }

    echo json_encode($response);
}

function logout(){
    session_destroy();
    $response['respuesta'] = true;
    echo json_encode($response);
}

