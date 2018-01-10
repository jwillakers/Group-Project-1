<?php
if(isset($_GET['page'])) {
	$page = trim ($_GET['page']); 
	$allowed = array('contactPa')

	if(in_array ($page, $allowed)) {
		echo file_get_content('../pages/contactus.html')
	}

}