function approved(id_photo, username, full_name, profile_pic, photo, caption, link, likes, photodiv, btna, btnd, apprv) {
    var datos =
        {
            'accion'        :   'set_photo',
            'id'            :   id_photo,
            'username'      :   username,
            'full_name'     :   full_name,
            'profile_pic'   :   profile_pic,
            'photo'         :   photo,
            'caption'       :   caption,
            'link'          :   link,
            'likes'         :   likes,
            'isApproved'    :   apprv
        };
    $('#' + btna).button('loading');
    $('#' + btnd).button('loading');
    $('.btn').prop('disabled', true);
    $.ajax
    ({
        type: "POST",
        dataType: "json",
        url: "include/reglog.php",
        data: datos,
        success: function(datos)
        {

            if(datos['respuesta'] == 1)
            {
                omitidas++;
                mostradas--;
                $('#alerts').empty().append(
                    '<div class="alert alert-warning"><i class="fa fa-fw fa-exclamation-circle"></i> You already approved/disapproved '+ omitidas +' photos of this query. Showing '+ mostradas +' photos.</div>'
                );
                $('#' + photodiv).fadeOut(700, function() {
                    $('.btn').prop('disabled', false);
                    $('#' + btna).button('reset');
                    $('#' + btnd).button('reset');
                });
            }
            if(datos['respuesta'] == 0)
            {
                alert('Duplicated Entry');
                $('.btn').prop('disabled', false);
                $('#' + btna).button('reset');
                $('#' + btnd).button('reset');
            }
            if(datos['respuesta'] == 2)
            {
                alert('Error');
            }

        }
    });
    return false;
}
function update(id_photo, bool, photodiv, btn) {
    var datos =
        {
            'accion': 'update',
            'id_photo': id_photo,
            'bool': bool
        };
    $('#' + btn).button('loading');
    $('.btn').prop('disabled', true);
    $.ajax
    ({
        type: "POST",
        dataType: "json",
        url: "include/reglog.php",
        data: datos,
        success: function(datos)
        {

            if(datos['respuesta'] == 1)
            {
                $('#' + photodiv).fadeOut(700, function() {
                    $('.btn').prop('disabled', false);
                    $('#' + btn).button('reset');
                });
            }
            if(datos['respuesta'] == 0)
            {
                alert('Duplicated Entry');
                $('.btn').prop('disabled', false);
                $('#' + btn).button('reset');
            }
            if(datos['respuesta'] == 2)
            {
                alert('Error');
            }

        }
    });
    return false;
}
function delet(id_photo, photodiv, btn) {
    var datos =
        {
            'accion': 'delete',
            'id_photo': id_photo
        };
    $('#' + btn).button('loading');
    $('.btn').prop('disabled', true);
    $.ajax
    ({
        type: "POST",
        dataType: "json",
        url: "include/reglog.php",
        data: datos,
        success: function(datos)
        {

            if(datos['respuesta'] == 1)
            {
                $('#' + photodiv).fadeOut(700, function() {
                    $('.btn').prop('disabled', false);
                    $('#' + btn).button('reset');
                });
            }
            if(datos['respuesta'] == 0)
            {
                alert('Duplicated Entry');
                $('.btn').prop('disabled', false);
                $('#' + btn).button('reset');
            }
            if(datos['respuesta'] == 2)
            {
                alert('Error');
            }

        }
    });
    return false;
}