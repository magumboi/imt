<?php
include "conexion.php";

class Resultados extends Connection{
    private $Connection = null;
    private $SQL = null;
    public function __construct(){
        parent::__construct();
        $this -> Connection = parent::getConnection();
        $this -> SQL = array(

            "SELECT user, pass FROM admin WHERE user = :user AND pass = :pass;",
            "INSERT INTO admin VALUES (null, :nombre, :email, :pass);",
            "INSERT INTO fotos VALUES (null, :id, :username, :full_name, :profile_pic, :photo, :caption, :likes, :link, :isApproved, null);",
            "SELECT id_photo, username, full_name, profile_pic, photo, caption, likes, link FROM fotos WHERE isApproved = :bool ORDER BY date_added DESC LIMIT :limite;",
            "SELECT id_photo FROM fotos;",
            "UPDATE fotos SET isApproved = :bool WHERE id_photo = :id_photo",
            "SELECT id_photo, username, full_name, profile_pic, photo, caption, likes, link FROM fotos WHERE isApproved = 1 ORDER BY date_added DESC LIMIT :limite;",
            "SELECT id, user, added from admin;",
            "DELETE FROM fotos WHERE id_photo = :id_photo;"
        );
    }
    public function getLog($user, $pass){
        $login = $this -> Connection -> prepare($this -> SQL[0]);
        $login -> bindParam(':user', $user, PDO::PARAM_STR);
        $login -> bindParam(':pass', $pass, PDO::PARAM_STR);
        $login -> execute();
        return ($login -> fetch(PDO::FETCH_NUM) != null);
    }
    public function getPhotos(){
        $getphotos = $this -> Connection -> prepare($this -> SQL[4]);
        $getphotos -> execute();
        $results = $getphotos->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    public function getApprovals($bool, $limite){
        $b = (int)$bool;
        $l = (int)$limite;
        $getapproval = $this -> Connection -> prepare($this -> SQL[3]);
        $getapproval -> bindParam(':bool', $b, PDO::PARAM_INT);
        $getapproval -> bindParam(':limite', $l, PDO::PARAM_INT);
        $getapproval -> execute();
        $results = $getapproval->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    public function setReg($nombre, $email, $pass){
        $signin = $this -> Connection -> prepare($this -> SQL[1]);
        $signin -> bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $signin -> bindParam(':email', $email, PDO::PARAM_STR);
        $signin -> bindParam(':pass', $this->hash($pass), PDO::PARAM_STR);
        $signin -> execute();
    }
    public function setPhoto($id, $username, $full_name, $profile_pic, $photo, $caption, $likes, $link, $isApproved){
        $photos = $this -> Connection -> prepare($this -> SQL[2]);
        $photos -> bindParam(':id', $id, PDO::PARAM_STR);
        $photos -> bindParam(':username', $username, PDO::PARAM_STR);
        $photos -> bindParam(':full_name', $full_name, PDO::PARAM_STR);
        $photos -> bindParam(':profile_pic', $profile_pic, PDO::PARAM_STR);
        $photos -> bindParam(':photo', $photo, PDO::PARAM_STR);
        $photos -> bindParam(':caption', $caption, PDO::PARAM_STR);
        $photos -> bindParam(':likes', $likes, PDO::PARAM_INT);
        $photos -> bindParam(':link', $link, PDO::PARAM_STR);
        $photos -> bindParam(':isApproved', $isApproved, PDO::PARAM_INT);
        $photos -> execute();
    }
    public function update($id_photo, $bool){
        $b = (int)$bool;
        $upates = $this -> Connection -> prepare($this -> SQL[5]);
        $upates -> bindParam(':id_photo', $id_photo, PDO::PARAM_STR);
        $upates -> bindParam(':bool', $b, PDO::PARAM_INT);
        $upates -> execute();
    }
    public function delete($id_photo){
        $upates = $this -> Connection -> prepare($this -> SQL[8]);
        $upates -> bindParam(':id_photo', $id_photo, PDO::PARAM_STR);
        $upates -> execute();
    }
    public function public_getphotos($limite){
        $l = (int)$limite;
        $pgetphotos = $this -> Connection -> prepare($this -> SQL[6]);
        $pgetphotos -> bindParam(':limite', $l, PDO::PARAM_INT);
        $pgetphotos -> execute();
        $results = $pgetphotos->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    public function getusers(){
        $getusers = $this -> Connection -> prepare($this -> SQL[7]);
        $getusers -> execute();
        $results = $getusers->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    public function hash($_PASS)
    {
        $_HASH=hash_pbkdf2("sha512", $_PASS, 666, 1000, 50);
        return $_HASH;
    }
}
