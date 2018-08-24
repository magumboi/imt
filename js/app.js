/**
 * Created by magumbo on 6/14/17.
 */

/***** PUT YOUR API KEY HERE ******/
var token = '5350111689.ba4c844.05cf6f9789ad4017922fcb482575e370';


var omitidas = 0, mostradas = 0;
$("#getPhotos").submit(function(event) {
    event.preventDefault();
    var action = {'accion' :'get_photos'};
    hashtag = $('#hashtag').val();
    num_photos = $('#max').val();
    omitidas = 0;
    mostradas = 0;
    $('#go').button('loading');
    $('#hashtag').prop('disabled', true);
    $('#max').prop('disabled', true);
    $( "#photos" ).empty();
    $( "#alerts" ).empty();
    $.ajax
    ({
        type: "POST",
        dataType: "json",
        url: "include/reglog.php",
        data: action,
        success: function(db_photos)
        {
            if(db_photos['respuesta'] == 2) {
                alert('You dont have authorization to do this');
                $('#go').button('reset');
            }else {
                $.ajax({
                    url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
                    dataType: 'jsonp',
                    type: 'GET',
                    data: {access_token: token, count: num_photos},
                    success: function (data) {
                        $('#go').button('reset');
                        $('#hashtag').prop('disabled', false);
                        $('#max').prop('disabled', false);
                        console.log(data);
                        if(data.meta.code == 200) {
                            if (data.data != 0) {
                                $.each(data.data, function (i, item) {

                                    id = item.id;
                                    photo = item.images.standard_resolution.url;
                                    username = item.user.username;
                                    full_name = escape(item.user.full_name);
                                    profile_picture = item.user.profile_picture;
                                    if(item.caption != null)
                                        caption = escape(item.caption.text);
                                    else
                                        caption = "";
                                    link = item.link;
                                    likes = item.likes.count;
                                    photodiv = 'photo' + i;
                                    approvebtn = 'btna' + i;
                                    disapprovebtn = 'btnd' + i;
                                    flag = false;
                                    type = item.type;

                                    for (j = 0; j < db_photos.length; j++) {
                                        if (db_photos[j]['id_photo'].valueOf() === id.valueOf()) {
                                            flag = true;
                                            omitidas++;
                                            break;
                                        }
                                    }
                                    if (!flag) {
                                        mostradas++;
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
                                            '<a type="button" id="' + approvebtn + '" onclick="return approved(\'' + id + '\', \'' + username + '\', \'' + full_name + '\', \'' + profile_picture + '\', \'' + photo + '\', \'' + caption + '\', \'' + link + '\',\'' + likes + '\', \'' + photodiv + '\', \'' + approvebtn + '\', \'' + disapprovebtn + '\', \'' + 1 + '\')" class="btn btn-success" data-loading-text=\'<i class="fa fa-spinner fa-spin"></i> Loading...\'><i class="fa fa-fw fa-thumbs-up"></i> Approve</a>' +
                                            '<a type="button" id="' + disapprovebtn + '" onclick="return approved(\'' + id + '\', \'' + username + '\', \'' + full_name + '\', \'' + profile_picture + '\', \'' + photo + '\', \'' + caption + '\', \'' + link + '\',\'' + likes + '\', \'' + photodiv + '\', \'' + approvebtn + '\', \'' + disapprovebtn + '\',\'' + 0 + '\')" class="btn btn-primary" data-loading-text=\'<i class="fa fa-spinner fa-spin"></i> Loading...\'><i class="fa fa-fw fa-floppy-o"></i> Save Photo</a>' +
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
                                        if (type === "video") {
                                            $('#isvideo' + photodiv).append(
                                                '<button class="btn btn-primary btn-block" onclick="video(\'' + item.videos.standard_resolution.url + '\')"><i class="fa fa-play" aria-hidden="true"></i> Play Video</button>'
                                            );
                                        }
                                    }

                                });
                                if (omitidas != 0) {
                                    $('#alerts').append(
                                        '<div class="alert alert-warning"><i class="fa fa-fw fa-exclamation-circle"></i> You already approved/saved ' + omitidas + ' photos of this query. Showing ' + mostradas + ' photos.</div>'
                                    );
                                }
                            } else {
                                console.log("array empty");
                                $('#photos').append(
                                    '<div class="alert alert-warning"><i class="fa fa-fw fa-exclamation-circle"></i> No results with the given hashtag.</div>'
                                );
                            }
                        }else{
                            $('#photos').append(
                                '<div class="alert alert-warning"><i class="fa fa-fw fa-exclamation-circle"></i> ' + data.meta.error_message + '</div>'
                            );
                        }

                    },
                    error: function (data) {
                        $('#go').button('reset');
                        $('#hashtag').prop('disabled', false);
                        $('#max').prop('disabled', false);
                        console.log(data);
                        $('#photos').append(
                            '<div class="alert alert-danger"><i class="fa fa-fw fa-exclamation-triangle"></i> <strong>Error!</strong> Query Timeout.</div>'
                        );
                    },
                    timeout: 8000
                });
            }
        }
    });


});

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
function paginate(pag, frombtn) {
    if(pag == 1){
        $( "#photos" ).empty();
        $( "#alerts" ).empty();
        $("#go").show();
        $("#go-approvals").hide();
        $( "#hdr" ).empty().append(
            '<i class="fa fa-fw fa-gavel"></i>&nbsp;Moderate</a>'
        );
        $( "#max-div" ).empty().append(
            '<label for="max">Max Photos:&nbsp;</label>' +
            '<select id="max" class="selectpicker" data-width="60px" data-style="btn-primary">' +
            '<option value="33">33</option>' +
            '<option value="20">20</option>' +
            '<option value="10">10</option>' +
            '</select>'
        );
        $( "#max" ).selectpicker('refresh');
        $( "#hashtag-div" ).show();
    }
    if(pag == 2){

        $("#photos").empty();
        $("#alerts").empty();
        $("#go").hide();
        $("#go-approvals").show().attr("onclick", "paginate(2,1)");
        $("#hdr").empty().append(
            '<i class="fa fa-fw fa-thumbs-up"></i>&nbsp;Approved'
        );
        if(frombtn == 0) {
            $("#max-div").empty().append(
                '<label for="max">Max Photos:&nbsp;</label>' +
                '<select id="max" class="selectpicker" data-width="70px" data-style="btn-primary">' +
                '<option value="100">100</option>' +
                '<option value="50">50</option>' +
                '<option value="30">30</option>' +
                '<option value="10">10</option>' +
                '</select>'
            );

            $("#max").selectpicker('refresh');
            $("#hashtag-div").hide();
        }
        getFromDB(1);

    }
    if(pag == 3) {
        $("#photos").empty();
        $("#alerts").empty();
        $("#go").hide();
        $("#go-approvals").show().attr("onclick", "paginate(3,1)");
        $("#hdr").empty().append(
            '<i class="fa fa-fw fa-floppy-o"></i>&nbsp;Saved'
        );
        if(frombtn == 0) {
            $("#max-div").empty().append(
                '<label for="max">Max Photos:&nbsp;</label>' +
                '<select id="max" class="selectpicker" data-width="70px" data-style="btn-primary">' +
                '<option value="100">100</option>' +
                '<option value="50">50</option>' +
                '<option value="30">30</option>' +
                '<option value="10">10</option>' +
                '</select>'
            );
            if (frombtn == 0)
                $("#max").selectpicker('refresh');
            $("#hashtag-div").hide();
        }
        getFromDB(0);

    }
    if(pag == 4) {
        BootstrapDialog.show({
            title: 'User Administration',
            message: function (dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);

                return $message;
            },
            data: {
                'pageToLoad': 'include/users.php'
            }
        });
    }
}
function logout(){
    var datos =
        {
            'accion': 'logout'
        };
    $.ajax
    ({
        type: "POST",
        dataType: "json",
        url: "include/reglog.php",
        data: datos,
        success: function (datos) {
            console.log(datos);
            if (datos['respuesta']) {
                location.reload();
            }
            else {
                alert('Unkown Error');
            }
        }
    });
    return false;
}
$(document).ready(function(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $('#back-to-top').tooltip('show');

});
function video(videolink) {
    var dialog = new BootstrapDialog({
        message: function(dialogRef){
            var $message = $('<div>' +
                '<video style="max-height: 700px;" width="570" controls autoplay loop>' +
                '<source src="'+videolink+'" type="video/mp4">' +
                '<p>Your browser does not support HTML5 video.</p>' +
                '</video>' +
                '</div>');

            return $message;
        },
        closable: false
    });
    dialog.realize();
    dialog.getModalHeader().hide();
    dialog.getModalFooter().hide();
    dialog.getModalBody().css('background', '-webkit-radial-gradient(50px 220px, #ffda75 18%,#ff3a49 43%,#ff3a49 50%,#e518a1 70%,#6634e1 100%)');
    dialog.getModalBody().css('border-radius', '25px');
    dialog.setClosable(true);
    dialog.open();

}
