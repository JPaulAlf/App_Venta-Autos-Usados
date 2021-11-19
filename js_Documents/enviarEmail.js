
function annoMaxMinEdad() {
    var annoActual = new Date().getFullYear();
    var annoMaximo = annoActual - 18;
    var annoMinimo = annoActual - 90;
    console.log(annoMaximo + "-01-01");
    var maxDate = annoMaximo + "-01-01";
    var minDate = annoMinimo + "-01-01";
    document.getElementById("input_Nacimiento").setAttribute("max", maxDate);
    document.getElementById("input_Nacimiento").setAttribute("min", minDate);
}

function validaCampos() {
    var email, nombre, apellido, nacimiento, gradoAcademico, gender;
    var bandera = false;
    email = document.getElementById('input_Email').value;
    nombre = document.getElementById('input_Nombre').value;
    apellido = document.getElementById('input_Apellido').value;
    nacimiento = document.getElementById('input_Nacimiento').value;

    gender = document.getElementById('input_Genero').value;

    var select = document.getElementById("input_GradoAcademico");
    //gradoAcademico = select.options[select.selectedIndex].innerText;
    var options = document.getElementsByTagName("option");

    if (email == '') {
        bandera = true;
        console.log("email");

    }

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(email)) {
        bandera = true;
        console.log("email");
    }

    if (nombre == '') {
        bandera = true;
        console.log("nombre");
    }

    if (apellido == '') {
        bandera = true;
        console.log("apellido");
    }

    if (nacimiento == '') {
        bandera = true;
        console.log("nacimiento");
    }

    var radios = document.getElementsByName('input_Genero');
    var count = 0;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            count++;
        }
    }
    if (count == 0) {
        bandera = true;
        console.log("gender");
    }

    var frecuencia = document.getElementById('input_GradoAcademico');
    if (frecuencia.value.trim() == "") {
        bandera = true;
        console.log("options");
    }
    if (options == '') {
        bandera = true;
        console.log("options");
    }

    return bandera;
}

function validaSoloLetras() {
    var nombre, apellido;
    var bandera = true;
    const pattern = new RegExp('^[A-Z]+$', 'i');

    nombre = document.getElementById('input_Nombre').value;
    apellido = document.getElementById('input_Apellido').value;


    if (pattern.test(nombre)) {
        // Si queremos agregar letras acentuadas y/o letra ñ debemos usar
        // codigos de Unicode (ejemplo: Ñ: \u00D1  ñ: \u00F1)
        bandera = false;
    }

    if (pattern.test(apellido)) {
        // Si queremos agregar letras acentuadas y/o letra ñ debemos usar
        // codigos de Unicode (ejemplo: Ñ: \u00D1  ñ: \u00F1)
        bandera = false;
    }

    return bandera;
}

function limpiarCampos() {
    document.getElementById('input_Email').value = null;
    document.getElementById('input_Nombre').value = null;
    document.getElementById('input_Apellido').value = null;
    document.getElementById('input_Nacimiento').value = null;
    document.getElementById('input_GradoAcademico').value = '';
    document.querySelectorAll('[name=input_Genero]').forEach((x) => x.checked = false);
    document.querySelectorAll('[name=input_AceptoTerminos]').forEach((x) => x.checked = false);
}

function sendEmail() {

    if (validaCampos() == false) {

        var terminos = document.getElementById('input_AceptoTerminos');
        if (!terminos.checked) {
            terminos.focus();
            alert('Para continuar acepte los términos y condiciones');
            return;
        }

        var email, nombre, apellido, nacimiento, gradoAcademico, genero;

        email = document.getElementById('input_Email').value;
        nombre = document.getElementById('input_Nombre').value;
        apellido = document.getElementById('input_Apellido').value;
        nacimiento = document.getElementById('input_Nacimiento').value;

        var select = document.getElementById("input_GradoAcademico");
        gradoAcademico = select.options[select.selectedIndex].innerText;


        var radios = document.getElementsByName('input_Genero');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                if (radios[i].value == 'F') {
                    genero = "Femenino"
                    break;
                } else {
                    genero = "Masculino"
                    break;
                }
            }
        }

        //Calculo de la edad, con la fecha de nacimiento:
        var annoIndividuo = nacimiento.substr(0, 4);
        var annoActual = new Date().getFullYear();
        var edadUsuario = annoActual - annoIndividuo;

        var mensaje =
            "<div style = ' color:#2f3131;  width:100%'>" +

            "<img width='200px' height='65px'  style='float: left;' " +
            "src='https://webdesing.netlify.app/proyectoprogramadofinal/menuImages/FastCarsLogo.png'>" +

            " <h1'>Gracias por realizar una cita con nosotros!</h1>" +
            " <h3>Sera un gusto atenderle " + nombre + " " + apellido + "</h3>" + "\n\n\n" +

            "<p style = 'padding: 3px;'>" +
            "<b>Nuestro representante se pondrá en contacto con usted muy pronto.</b><br><br>\n" +

            "Esta es la información suministrada anteriormente:<br>" +
            "Este es su correo electrónico:<b> " + email + "</b><br>\n" +
            "Este es su nombre: <b>" + nombre + " </b><br>\n" +
            "Este es su apellido: <b>" + apellido + " </b><br>\n" +
            "Su fecha de nacimiento es: <b>" + nacimiento + " </b><br>\n" +
            "Su edad es: <b>" + edadUsuario + "  </b><br>\n" +
            "Este es su grado académico: <b>" + gradoAcademico + "</b><br>\n" +
            "Este es su género: <b>" + genero + "</b><br><br><br>\n" +

            "FastCars.cr<br>" +
            "San José, Costa Rica<br> </p></div>";

        console.log(mensaje);

        Email.send({
            Host: "smtp.gmail.com",
            Username: "paul.pry.utn@gmail.com",
            // Password: "jowpo3-byctaJ-zivzi8", // contrasenna normal
            Password: "exhbpfriazitgtno", // contrasenna de aplicacion TOP SECRET
            // SecureToken: "6c835b0a-d7c9-4e6c-8de8-3eeaf20369f5", //viejo
            // SecureToken: "bf838408-d352-4178-9f06-8aea76a1f074", //nuevo
            To: email,
            From: "paul.pry.utn@gmail.com",
            Subject: "Mensaje de confirmación de cita en FastCars.cr",
            Body: mensaje,
        })
            .then(function (message) {
                alert("Correo enviado exitosamente.\nGracias por su preferencia!");
                //alert(message);
                limpiarCampos();
            });

    } else {
        alert("Favor llenar todo el formulario, antes de enviar una solicitud de cita")
    }
}

function caractGenerales() {
    annoMaxMinEdad();
}