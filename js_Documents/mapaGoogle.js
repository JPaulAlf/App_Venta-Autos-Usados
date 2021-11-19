//FUNCIONES PARA QUE EL MAPA FUNCIONE CORRECTAMENTE

class Localizacion {

    constructor(callback) {
        if (navigator.geolocation) {
            //obtenemos ubicacion
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                callback();
            });
        } else {
            //enviar alert
            alert("Navegador no soporta Geolocalizacion!! :c")
        }
    }
}

function initMap() {
    const ubicacion = new Localizacion(() => {
        //*****************************************************
        //Ubicacion en vivo del usuario
        const myLatLong = { lat: ubicacion.latitude, lng: ubicacion.longitude }
        //Se especifica la ubicacion del individuo en el mapa
        const options = {
            center: myLatLong,
            zoom: 8,
            mapTypeControl: false
        }
        //Crea el mapa y lo muestra en el elemento dado por ID
        var MapaHTML = document.getElementById('mapaGoogle');
        const gMapa = new google.maps.Map(MapaHTML, options);
        //*****************************************************


        //======================================================
        //MARCADOR_1 
        //Se crea un marcador y ventana informativa para el mismo!!
        //Mensaje del lugar
        var textoMensaje = '<h4>Usted esta aqui!</h4>' +
            '<p>Ubicacion de su persona en tiempo real</p>';
        //Se crea un marcador
        const marcador_Usuario = new google.maps.Marker({
            position: myLatLong,
            map: gMapa,
            animation: google.maps.Animation.DROP,
           // draggable:true,
            title: "Usted esta aca"
        });
        marcador_Usuario.setIcon('../iconsWebPage/posicion.png')//64x64
        //Se crea una ventana informativa
        var informacion = new google.maps.InfoWindow({
            content: textoMensaje
        });
        //Se adjunta al marcador la ventana informativa al dar click
        marcador_Usuario.addListener('click', function () {
            informacion.open(gMapa, marcador_Usuario);
        });
        //======================================================

        //======================================================
        //MARCADOR_2 
        //Se crea un marcador y ventana informativa para el mismo!!
        //Mensaje del lugar
        const myLatLong_Negocio = { lat: 9.952531, lng: -84.108323 }
        var textoMensaje2 = '<h4>Fast Cars</h4>' +
            '<p>Ubicacion de las oficinas centrales y venta de autos</p>';
        //Se crea un marcador
        const marcador_Negocio = new google.maps.Marker({
            position: myLatLong_Negocio,
            map: gMapa,
            animation: google.maps.Animation.DROP,
            title: "Oficinas centrales"
        });
        marcador_Negocio.setIcon('../iconsWebPage/sala-de-exposicion.png')
        //Se crea una ventana informativa
        var informacion2 = new google.maps.InfoWindow({
            content: textoMensaje2
        });
        //Se adjunta al marcador la ventana informativa al dar click
        marcador_Negocio.addListener('click', function () {
            informacion2.open(gMapa, marcador_Negocio);
        });
        //======================================================


        //######################################################
        //Trazar ruta de un punto a otro
        var objConfigDR = {
            map: gMapa,
            suppressMarkers:true
        }
        var objConfigDS = {
            origin: myLatLong,//Ubicacion del usuario
            destination: myLatLong_Negocio,//Ubicacion del negocio
            travelMode: google.maps.TravelMode.DRIVING
        }
        //Obtiene coordenadas
        var ds = new google.maps.DirectionsService();
        //Traduce las coordenadas a la ruta visible
        var dr = new google.maps.DirectionsRenderer(objConfigDR);
        //se encarga de hacer la ruta
        ds.route(objConfigDS,fnRutear);

        function fnRutear(resultados,status){
            if(status=='OK'){
                dr.setDirections(resultados);
            }else{
                alert('Error: '+status)
            }
        }
        //######################################################


    });
}


