App.controller('home', function (page) {

    $(page).delegate('.horoscope-check','click',function(){
        var day = $('select[name="day"]').val();
        var sign = $('select[name="sign"]').val();

        if(day.length == 0){
            launchDialog("Day");
            return false;
        }

        if(sign.length == 0){
            launchDialog("Sun Sign");
            return false;   
        }

        $.ajax({
            url : '/horoscope?day='+day+'&sign='+sign,
            type : 'GET',
            beforeSend: function(){
                $('.loading-section').show();
                $('.result').hide();
            },
            success : function(data){
                $('.loading-section').hide();
                response_data = JSON.parse(data);
                if(response_data["success"] == true){
                    response_data = response_data["response_data"];
                    $('.result').show();
                    $('.content').html(response_data["content"]);
                    $('.mood').html(response_data["mood"]);
                    $('.keywords').html(response_data["keywords"]);
                    $('.intensity').html(response_data["intensity"]);
                }
            }
        });

    });
});


try {
  App.restore();
} catch (err) {
  App.load('home');
}


function launchDialog(input_name){
    App.dialog({
        text         : "Please Select "+ input_name +"!!",
        okButton     : 'Got it!'
    });
}