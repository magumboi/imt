
/***** PUT YOUR API KEY HERE ******/
var token = '5350111689.ba4c844.05cf6f9789ad4017922fcb482575e370';


var omitidas = 0, mostradas = 0;
$("#getPhotos").submit(function() {
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
