function getFromDB(bool) {
    var datos =
        {
            'accion'        :   'get_approvals',
            'bool'          :   bool,
            'limite'        :   $('#max').val()
        };
    console.log(datos);
    $('#go').button('loading');
    $.ajax
    ({
        type: "POST",
        dataType: "json",
        url: "include/reglog.php",
        data: datos,
        success: function(datos)
        {
            console.log(datos);

            if(datos['respuesta'] == 2)
            {
                alert('Error');
                $('#go').button('reset');
            }else {
                $('#go').button('reset');
                for (i = 0; i < datos.length; i++) {

                    id = datos[i]['id_photo'];
                    photo = datos[i]['photo'];
                    username = datos[i]['username'];
                    full_name = datos[i]['full_name'];
                    profile_picture = datos[i]['profile_pic'];
                    caption = datos[i]['caption'];
                    link = datos[i]['link'];
                    likes = datos[i]['likes'];
                    photodiv = 'photo' + i;
                    btn = 'btn' + i;
                    deletebtn = 'btnd' + i;
                    if(bool === 1) {
                        $('#photos').append(
                            '<div class="media" id="' + photodiv + '">' +
                            '<div class="media-left">' +
                            '<a data-fancybox="gallery" href="' + photo + '">' +
                            '<img class="photo" src="' + photo + '"/>' +
                            '</a>' +
                            '<div id="isvideo' + photodiv + '">' +
                            '</div>' +
                            '</div>' +
                            '<div class="media-body">' +
                            '<div class="btn-group-justified" style="margin-bottom:10px">' +
                            '<a type="button" id="' + btn + '" onclick="return update(\'' + id + '\', \'' + (bool-1) + '\', \'' + photodiv + '\', \'' + btn + '\')" class="btn btn-primary" data-loading-text=\'<i class="fa fa-spinner fa-spin"></i> Loading...\'><i class="fa fa-fw fa-thumbs-down"></i> Disapprove and Save</a>' +
                            '<a type="button" id="' + deletebtn + '" onclick="return delet(\'' + id + '\', \'' + photodiv + '\', \'' + deletebtn + '\')" class="btn btn-danger" data-loading-text=\'<i class="fa fa-spinner fa-spin"></i> Loading...\'><i class="fa fa-fw fa-times"></i> Delete</a>' +
                            '</div>' +
                            '<ul class="list-group">' +
                            '<li class="list-group-item"><img src="' + profile_picture + '" style="width:60px; display:inline-block;" class="img-circle"> @' + username + '</li>' +
                            '<li class="list-group-item">' + unescape(full_name) + '</li>' +
                            '<li class="list-group-item"><div class="texto-loco"><p align="justify">' + unescape(caption) + '</p></div></li>' +
                            '<li class="list-group-item"><i class="fa fa-heart" aria-hidden="true"></i> ' + likes + '</li>' +
                            '<li class="list-group-item" style="font-size: 20px"><a href="' + link + '" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i> See on Instagram</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '<hr/>' +
                            '</div>'
                        );
                    }else{
                        $('#photos').append(
                            '<div class="media" id="' + photodiv + '">' +
                            '<div class="media-left">' +
                            '<a data-fancybox="gallery" href="' + photo + '">' +
                            '<img class="photo" src="' + photo + '"/>' +
                            '</a>' +
                            '<div id="isvideo' + photodiv + '">' +
                            '</div>' +
                            '</div>' +
                            '<div class="media-body">' +
                            '<div class="btn-group-justified" style="margin-bottom:10px">' +
                            '<a type="button" id="' + btn + '" onclick="return  update(\'' + id + '\', \'' + (bool+1) + '\', \'' + photodiv + '\', \'' + btn + '\')" class="btn btn-success" data-loading-text=\'<i class="fa fa-spinner fa-spin"></i> Loading...\'><i class="fa fa-fw fa-thumbs-up"></i> Approve</a>' +
                            '<a type="button" id="' + deletebtn + '" onclick="return delet(\'' + id + '\', \'' + photodiv + '\', \'' + deletebtn + '\')" class="btn btn-danger" data-loading-text=\'<i class="fa fa-spinner fa-spin"></i> Loading...\'><i class="fa fa-fw fa-times"></i> Delete</a>' +
                            '</div>' +
                            '<ul class="list-group">' +
                            '<li class="list-group-item"><img src="' + profile_picture + '" style="width:60px; display:inline-block;" class="img-circle"> @' + username + '</li>' +
                            '<li class="list-group-item">' + unescape(full_name) + '</li>' +
                            '<li class="list-group-item"><div class="texto-loco"><p align="justify">' + unescape(caption) + '</p></div></li>' +
                            '<li class="list-group-item"><i class="fa fa-heart" aria-hidden="true"></i> ' + likes + '</li>' +
                            '<li class="list-group-item" style="font-size: 20px"><a href="' + link + '" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i> See on Instagram</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '<hr/>' +
                            '</div>'
                        );
                    }
                }
            }

        }
    });
    return false;
}