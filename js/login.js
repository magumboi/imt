$("#loginform").submit(function(event) {
    event.preventDefault();
    var datos =
        {
            'accion': 'login',
            'user': document.getElementById("user").value,
            'pass': document.getElementById("pass").value
        };
    $.ajax
    ({
        type: "POST",
        dataType: "json",
        url: "reglog.php",
        data: datos,
        success: function (datos) {
            console.log(datos);
            if (datos['respuesta']) {
                location.reload();

            }
            else {
                alert('incorrect user or password');
            }
        }
    });
    return false;
});