var c_response;
var onReturnCallback = function(response) { 
    c_response = response;
}; 

$(document).ready(function () {

     $("#start").click(function(){
         //test
         console.log($('#height').val());
      $.ajax({
        url:"/init",
        type:"POST",
        data: JSON.stringify({
          information:{
            height: $('#height').val(),
            weight: $('#weight').val(),
            age: $('#age').val(),
            category: $('.btn.btn-primary').val(),
            goals:  $('input[name=body_goal]:checked','form').val(),
            situation: $('input[name=inlineRadioOptions]:checked', 'form').val(),
            Gender: $('input[name=Gender]:checked', 'form').val()
          },
          "g-recaptcha-response": c_response
        }),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
	        console.log(data);
            window.location.href = "game.html";
        }
      });
    });
    
    $('.main-cus .btn').on('click', function(e) {
      $('.main-cus .btn').removeClass('btn-primary');
      $('.main-cus .btn').addClass('btn-default');
      $(this).removeClass('btn-default');
      $(this).addClass('btn-primary');
    })

    
});
