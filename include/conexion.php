<?php
include ("config.php");
class Connection
{
    private $Connection = null;
    public function __construct()
    {
        try
        {
            $this -> Connection = new PDO
            ("mysql:host=".HOST.";dbname=".NAME.";charset=utf8", "".USER."", "".PASS."");
            $this -> Connection -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        }
        catch(PDOException $e)
        {
            echo "Connection failed: " . $e -> getMessage();
        }
    }
    public function getConnection()
    {
        return $this -> Connection;
    }
}
?>