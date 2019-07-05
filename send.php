<?php
//$headers = "From: Оставлена заявка: bla<bla>\r\n"; 

function checkGoogleRecaptcha() {	
	$secret='';
	$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$_POST['response']."&remoteip=".$_SERVER['REMOTE_ADDR']);

	$response = json_decode($response, true);

	return $response["success"];
}

$to  = "mail@urlsite.com";
$subject = "Заявка с сайта ".$_SERVER['HTTP_HOST'];
$message = "";

$name  = $_POST['username'] ? "\nИмя: ".$_POST['username'] : '';
$phone  = $_POST['phone'] ? "\nТелефон: ".$_POST['phone'] : '';
$email  = $_POST['email'] ? "\nE-Mail: ".$_POST['email'] : '';
$msg  = $_POST['message'] ? "\nСообщение: ".$_POST['message'] : '';

$message = $subject.$name.$phone.$email.$msg;

if(checkGoogleRecaptcha()){
	if(mail($to, $subject, $message)){
		echo 'Спасибо! Ваша заявка принята. Мы свяжемся с Вами в ближайшее время.';
	}else{
		echo 'Возникла ошибка при отправке письма. Попробуйте позже.';
	}	
}else{
	echo 'Не пройдена антиспам-проверка.';
}

//header("Location: ".$_SERVER['HTTP_REFERER']);
?>