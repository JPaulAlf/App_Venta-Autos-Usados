function calculoCotizacion() {

    var valVehiculo, plzAnno, pgIntereses
    var part1, part2, p, ms, tm;
    var msj;

    if (validacionVacios_Cotizacion() == false && validaEsNumero()==false) {

        valVehiculo = document.getElementById("input_vehiculo").value;
        plzAnno = document.getElementById("input_plazo").value;

        p = parseInt(plzAnno * 12);
        ms = parseInt(valVehiculo);
        tm = parseFloat(7.10);

        part1 = ms * (tm / 100) * Math.pow(1 + (tm / 100), p);
        part2 = Math.pow(1 + (tm / 100), p) - 1;

        pgIntereses = parseInt(part1 / part2);
        pgIntereses = pgIntereses / 12;

        var n = plzAnno * 12;
        var i = tm / 1200;
        var factor = Math.pow(i + 1, n);
        var cuota = valVehiculo * i * factor / (factor - 1);

        var amortizacion= cuota-pgIntereses;

        var pgInteresesMensual = pgIntereses.toLocaleString('en-US', {
            style: 'currency',
            currency: 'CRC',
        });
        amortizacion= amortizacion.toLocaleString('en-US', {
            style: 'currency',
            currency: 'CRC',
        });
        var pgMensualCompleto= cuota.toLocaleString('en-US', {
            style: 'currency',
            currency: 'CRC',
        });


        msj = "Cuota a pagar: <br><br>" +
            "Intereses: " + pgInteresesMensual + "<br>" +
            "Amortización: " + amortizacion + "<br>" +
            "&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" +
            " &nbsp; &nbsp; &nbsp; &nbsp;  -------------------<br>" +
            "Total: " + pgMensualCompleto + "<br><br>" +
            "Si desea más detalles, favor enviar un email de cita, y " +
            "un representante se pondrá en contacto con usted";

        document.getElementById("resultadoEncuesta").innerHTML = msj;

    } else {

        msj = "FAVOR INGRESAR DATOS PRIMERO<br><br>Gracias";
        document.getElementById("resultadoEncuesta").innerHTML = msj;

        document.getElementById("input_vehiculo").value='';
        document.getElementById("input_plazo").value='';
    }
}

function validaEsNumero(){
    var valVehiculo, plzAnno;
    var bandera=false;
    valVehiculo = document.getElementById("input_vehiculo").value;
    plzAnno = document.getElementById("input_plazo").value;

    if(isNaN(valVehiculo)){
        bandera=true;
        alert("El valor del vehículo debe ser numérico ")
    }
    if(isNaN(plzAnno)){
        bandera=true;
        alert("El plazo de años debe ser numérico ")
    }
    return bandera;
}

function validacionVacios_Cotizacion() {
    var valVehiculo, plzAnno;
    var bandera = false;

    valVehiculo = document.getElementById("input_vehiculo").value;
    plzAnno = document.getElementById("input_plazo").value;

    if (valVehiculo == '') {
        bandera = true;
    }
    if (plzAnno == '') {
        bandera = true;
    }
    return bandera;
}






//var valorAuto = document.getElementById("input_vehiculo");
//valorAuto.addEventListener("keypress", formatear());
function formatear() {
    var valVehiculo, form;
    valVehiculo = document.getElementById("input_vehiculo").value;

    if (valVehiculo != null) {
        form = valVehiculo.toLocaleString();
        document.getElementById("input_vehiculo").value = form;
    }
}

