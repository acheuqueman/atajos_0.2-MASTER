<?php

    include "conexion.php";

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $tipo_localidad = $request->tipo_localidad;

    $municipios = mysql_query("SELECT * FROM localidades WHERE tipo_localidad = '$tipo_localidad' ");
   
    $array_municipios_php = array(); 
    
    $i = 0;
    while ( $municipios_array = mysql_fetch_array($municipios))
    {
        $array_municipios_php[$i]['nombre_municipio'] = $municipios_array['localidad']; //Nombre
        $array_municipios_php[$i]['id_municipio'] = $municipios_array['id_localidad']; //id
        $i++;
        //echo($municipios_array[2]);
    }
    $array_municipios_php['lenght'] = count($array_municipios_php);
    echo json_encode($array_municipios_php);
     
?>