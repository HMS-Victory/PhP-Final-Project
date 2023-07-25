<?php 
	include("User.php");
	
	class DbOperation{
		private $con;
		private $userLoggedIn;
		private $username;

		function __construct(){
			require_once dirname(__FILE__).'/DbConnect.php';

			// use the class to create a new object with the class properties inside DbConnect
			$db=new DbConnect();

			// run the code in the class that connects to the db.
			$this->con=$db->connect();
			if(isset($_SESSION['userLoggedIn'])){
				$this->userLoggedIn=new User($this->con, $_SESSION['userLoggedIn']);
				$this->username=$userLoggedIn->getUsername();
			}
		}

		// CRUD
		function getItems(){
		$stmt=$this->con->prepare("SELECT id, name, price, reviews, description, image FROM items LIMIT 20");
		$stmt->execute();
		$stmt->bind_result($id, $name, $price, $reviews, $description, $image);

		$items=array();
		while($stmt->fetch()){
			$item=array();
			$item['id']=$id;
			$item['name']=$name;
			$item['price']=$price;
			$item['reviews']=$reviews;
			$item['description']=$description;
			$item['image']=$image;

			array_push($items, $item);
		}
		return $items;
	}
	// pass in a json object
	function createItem($itemData){
		$stmt=$this->con->prepare("INSERT INTO items (name, price, description, image) VALUES(?,?,?,?)");
		$stmt->bind_param("siss", $itemData->name, $itemData->price, $itemData->description, $itemData->image);
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}
	}
	function updateItem($itemData){
		$stmt = mysqli_query($this->con, "UPDATE items SET name = '$itemData->name', price = '$itemData->price', description='$itemData->description', image='$itemData->image' WHERE id='$itemData->id'");
		 return true;
	}
	function deleteItem($itemId){
		$stmt=mysqli_query($this->con, "DELETE FROM items WHERE id = $itemId");
		return true;
	}






	// EXTRA
	// creating methods that will eventually be run when we create a new object using this class.
	function register($name, $email, $username, $password){
		$stmt=$this->con->prepare("INSERT INTO users (name, email, username, password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $name, $email, $username, $password);
		if($stmt->execute()){
			return true;
		}else{
			return false;
		}		
	}
	function login($loginPassword, $loginUsername){
		$stmt = mysqli_query($this->con, "SELECT * FROM users WHERE username='$loginUsername' AND password='$loginPassword'");

		if(mysqli_num_rows($stmt) == 1) {
				$_SESSION['userLoggedIn']=$loginUsername;
				$this->userLoggedIn=new User($this->con, $_SESSION['userLoggedIn']);
				$this->username=$this->userLoggedIn->getUsername();
				return $_SESSION['userLoggedIn'];
			}
			else {
				return false;
			}
	}
	function logout(){
		session_destroy();
		return true;
	}
	function getItem($itemId){
		$stmt=mysqli_query($this->con, "SELECT * FROM items WHERE id='$itemId'");
		
		$item=mysqli_fetch_array($stmt);

		return $item;
	}
	
	function searchItems($term){
		$itemsQuery=$this->con->prepare("SELECT id, name, price, reviews FROM items WHERE name LIKE '%$term%' LIMIT 20");
		$itemsQuery->execute();
		$itemsQuery->bind_result($id, $name, $price, $reviews);

		$items=array();
		while($itemsQuery->fetch()){
			$item=array();
			$item['id']=$id;
			$item['name']=$name;
			$item['price']=$price;
			$item['reviews']=$reviews;

			array_push($items, $item);
		}
		return $items;
	}

	function getUser(){
		if($this->username){
			$user=$this->username;
			$stmt=mysqli_query($this->con, "SELECT * FROM users WHERE username='$user'");
			$user=mysqli_fetch_array($stmt);
			return $user;
		}else{
			return false;
		}
	}
	function getUserLoggedIn(){
		if($this->username){
			return $this->username;
		}else{
			return false;
		}
	}
	// function addToCart($cart){
	// 	// submit a json response from the frontend
	// 	$stmt=$this->con->prepare("INSERT INTO users (cart) VALUES(?)");
	// 	$stmt->bind_param("s", $cart);

	// 	if($stmt->execute()){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}
	// }
}
?>