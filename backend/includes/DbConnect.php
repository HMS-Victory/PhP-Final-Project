<!-- connection file -->
<?php 
// create a class
	class DbConnect{
		private $con;

		function __construct(){

		}
		function connect(){
			ob_start();
			if(!isset($_SESSION)){ 
				session_start(); 
			} 
			$timexone=date_default_timezone_set("America/Anchorage");
			
			include_once dirname(__FILE__).'/Constants.php';

			// this is the most important line of code in the file. We connect to the DB
			$this->con=new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

			// Here we check for errors created in the previous step
			if(mysqli_connect_errno()){
				echo "Failed to connect to MySQL: ".mysqli_connect_error();
			}
			return $this->con;
		}
}
?>