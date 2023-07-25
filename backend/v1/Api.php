<?php 
	// this is the main php code file it will call all the
	// functions in the other files
    header("Access-Control-Allow-Origin: *");
  	// header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	require_once '../includes/DbOperation.php';



	// two helper functions
	function areTheseParametersAvailable($params){
		$available=true;
		$missingparams="";

		foreach($params as $param){
			if(!ISSET($_POST[$param]) || STRLEN($_POST[$param])<=0){
				$available=false;
				$missingparams=$missingparams.", ".$param;
			}
		}

		if(!$available){
			$response=array();
			$response['error']=true;
			$response['message']='Parameters '.substr($missingparams, 1, strlen($missingparams)). ' missing';

			echo json_encode($response);

			die();
		}
	}
	function checkValidEmailSyntax($email){
		if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
			$errors[]="incorrect email syntax.";
		}
	}
	function checkValidSyntaxPassword( $password){
		$errors = array();
		if (strlen($password) < 8 || strlen($password) > 16) {
		    $errors[] = "Password should be min 8 characters and max 16 characters";
		}
		if (!preg_match("/\d/", $password)) {
		    $errors[] = "Password should contain at least one digit";
		}
		if (!preg_match("/[A-Z]/", $password)) {
		    $errors[] = "Password should contain at least one Capital Letter";
		}
		if (!preg_match("/[a-z]/", $password)) {
		    $errors[] = "Password should contain at least one small Letter";
		}
		if (!preg_match("/\W/", $password)) {
		    $errors[] = "Password should contain at least one special character";
		}
		if (preg_match("/\s/", $password)) {
		    $errors[] = "Password should not contain any white space";
		}

		if ($errors) {
		    return $errors;
		}  else {
		    return true;
		}
	}

	$response=array();

	if(isset($_GET['apicall'])){

		switch($_GET['apicall']){
			// CRUD
			case 'fetchItems':
				$db=new DbOperation();
				$results=$db->getItems();
				if($results){
					$response['error']=false;
					$response['message']='items retrieved';
					$response['items']=$results;
				}else{
					$response['error']=true;
					$response['message']='new item was not created';
				}
			break;
			case 'newItem':
				$json = file_get_contents('php://input');
				$data = json_decode( $json);

				$db=new DbOperation();
				$results=$db->createItem($data);
				if($results){
					$response['error']=false;
					$response['message']='Item created';
					// return the created item
					$response['item']=$results;
				}else{
					$response['error']=true;
					$response['message']='new item was not created';
				}
			break;
			case 'updateItem':
				$json = file_get_contents('php://input');
				$data = json_decode( $json);
				$db=new DbOperation();
				$results=$db->updateItem($data);
				if($results){
					$response['error']=false;
					$response['message']='Item Updated';
				}else{
					$response['error']=true;
					$response['message']='update failed!';
				}
			break;
			case 'deleteItem':
				$db=new DbOperation();
				$results=$db->deleteItem($_GET['id']);
				if($results){
					$response['error']=false;
					$response['message']='item deleted';
				}else{
					$response['error']=true;
					$response['message']='attempt failed';
				}
			break;




			// EXTRA
			case 'register':
				$json = file_get_contents('php://input');
				$data = json_decode( $json);
				$db=new DbOperation();
				areTheseParametersAvailable(array('name', 'email', 'username', 'password'));
				checkValidSyntaxPassword( $data->registerPassword);
				checkValidEmailSyntax($data->registerEmail);
			
				$result=$db->register(
					$data->registerName,
					$data->registerEmail,
					$data->registerUsername,
					$data->registerPassword
				);
					
				

				// checks if successful
				if($result){
					$response['error']=false;

					$response['message']="Welcome!";
				}else{
					$response['error']=true;

					$response['message']='Some error ocurred try again.';
				}
			break;
			case 'login':
				$json = file_get_contents('php://input');
				$data = json_decode( $json);
				$db=new DbOperation();
				checkValidSyntaxPassword($data->loginPassword);
				$result=$db->login($data->loginPassword,$data->loginUsername);

				if($result){
					$response['error']=false;
					$response['message']='Login successfull';
					$response['user']=$result;

				}else{
					$response['error']=true;
					$response['message']='username or password is incorrect.';
				}
			break;
			case 'logout':
				$db=new DbOperation();
				$result=$db->logout();
				if($result){
					$response['error']=false;
					$response['message']='logged out';
				}else{
					$response['error']=true;
					$response['message']='something went wrong.';
				}
			break;
			case 'getItem':
				$db=new DbOperation();
				if(isset($_GET['id'])){
					$result=$db->getItem($_GET['id']);
					if($result){
						$response['error']=false;
						$response['message']='item gotten successfully.';
						$response['item']=$result;
					}else{
						$response['error']=true;
						$response['message']='Some error occurred please try again.';
					}
				}else{
					$response['error']=true;
					$response['message']='No Item selected.';
				}
			break;
			case 'search':
				$db=new DbOperation();
				if(isset($_GET['searchterm'])){
					$result=$db->searchItems($_GET['searchterm']);
					if($result){
						$response['error']=false;
						$response['message']='fetched some items';
						$response['items']=$result;
					}
				}else{
					$response['error']=true;
					$response['message']='no search term provided';
				}
			break;
			// case 'addToCart':
			// 	$db=new DbOperation();
			// 	if(isset($_GET['itemid'])){
			// 		$result=$db->addToCart($_POST['itemid']);
			// 		if($result){
			// 			$response['error']=false;
			// 			$response['message']='the cart has been updated';
			// 			$response['items']=$result;
			// 		}
			// 	}else{
			// 		$response['error']=true;
			// 		$response['message']='no item to add to cart';
			// 	}
			// break;
			case 'getUser':
				$db=new DbOperation();
				$result=$db->getUser();
				if($result){
					$response['error']=false;
					$response['message']='fetched the user';
					$response['user']=$result;
				}else{
					$response['error']=true;
					$response['message']='user is not logged in.';
				}
			break;
			case 'getUserLoggedIn':
				$db=new DbOperation();
				$result=$db->getUserLoggedIn();
				if($result){
					$response['error']=false;
					$response['message']="$result is logged in.";
					$response['username']=$result;
				}else{
					$response['error']=true;
					$response['message']="No user logged in";
					$response['username']=false;
				}	
			break;
		}
	}else{
		$response['error']=true;
		$response['message']='Invalid API call';
	}

	echo json_encode($response);
?>