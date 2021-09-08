
function show(s){
     
     if(s.length==0){
          $('#dsearch').removeClass('hide');
          $('#livesearch').addClass('hide');
     }
     else{
          $('#dsearch').addClass('hide');
          $('#livesearch').removeClass('hide');
     }
     
     $.ajax({
          url:"/item/srch",
          contentType:'application/json',
          method:'POST',
          data:JSON.stringify({key:s},{length:s.length}),
          success:function(result){
               $('#livesearch').html(result);
          }
     })
}