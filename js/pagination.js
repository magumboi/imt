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
            '<option value="10">10</option>' +
            '<option value="20">20</option>' +
            '<option value="33">33</option>' +
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