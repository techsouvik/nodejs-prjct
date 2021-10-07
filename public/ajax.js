
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


function showv(s){
     
     if(s.length==0){
          $('#dsearch').removeClass('hide');
          $('#livesearch').addClass('hide');
     }
     else{
          $('#dsearch').addClass('hide');
          $('#livesearch').removeClass('hide');
     }
     
     $.ajax({
          url:"/item/srchv",
          contentType:'application/json',
          method:'POST',
          data:JSON.stringify({key:s}),
          success:function(result){
               $('#livesearch').html(result);
          }
     })
}