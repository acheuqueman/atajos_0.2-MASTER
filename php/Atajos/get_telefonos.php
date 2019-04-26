<?php

    include "conexion.php";

    ////// ++++++ Para recibir el POST del ts
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $Localidad = $request->localidad;
    $Categoria = $request->categoria;
    $tipo_localidad = $request->tipo_localidad;
    $busqueda = $request->busqueda;
    $buscando = $request->buscando;

    if ($buscando == "true"){
        $sql_detalles = "SELECT * FROM telefonos WHERE nombre_telefono LIKE '%$busqueda%'";
    } else {
        if ($tipo_localidad <= 2){
            $sql_detalles = "SELECT * FROM telefonos WHERE id_localidad = '$Localidad' AND id_categoria='$Categoria' ";
        } else{
            $sql_detalles = "SELECT * FROM telefonos WHERE id_localidad = '$Localidad'";
        }
    }
    
    $telefono = mysql_query($sql_detalles);
   
    

    $array_telefono_php = array(); 
    $i = 0;
    while ( $telefono_array = mysql_fetch_array($telefono))
    {
        $sql_numeros = "SELECT numero_numero FROM numeros WHERE lugar_numero = '$telefono_array[0]'";
        $numero = mysql_query($sql_numeros);
        $array_numero = mysql_fetch_array($numero);

        $array_telefono_php[$i]['nombre'] = $telefono_array[2]; //Nombre
        $array_telefono_php[$i]['direccion'] = $telefono_array[3]; //Direccion
        //$array_telefono_php[$i][2] = $telefono_array[4]; //Telefono
        $array_telefono_php[$i]['telefono'] = $array_numero[0]; //Telefono
        $array_telefono_php[$i]['pagina'] = $telefono_array[5]; //Pagina Web
        $array_telefono_php[$i]['categoria'] =  $telefono_array[6]; //Categoria

        $sql_localidad = "SELECT localidad FROM localidades WHERE id_localidad = '$telefono_array[id_localidad]'";
        $query_localidad = mysql_query($sql_localidad);
        $array_localidad = mysql_fetch_array($query_localidad);
        $array_telefono_php[$i]['nombre_localidad'] = $array_localidad[0];

        //$array_telefono_php[$i][3] = $telefono_array[6]; //Imagen
        $i++;
        //echo($telefono_array[2]);
    }
    $array_telefono_php['lenght'] = count($array_telefono_php);
    echo json_encode($array_telefono_php);
?>