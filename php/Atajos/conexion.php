<?php
    $link = mysql_connect('localhost','root');
    mysql_select_db('base_telefonos',$link);
    mysql_set_charset('utf8');
    header('Access-Control-Allow-Headers:*'); ///// Para que acepte el POST
?>