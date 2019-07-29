$(document).ready(function(){
    $('.delete-device').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        var delDevice =  confirm('Are you sure you want to delete this device?');
        if(delDevice == true){
            $.ajax({
                type:'DELETE',
                url: '/devices/'+id,
                success: function(response){
                 alert('Device Deleted');
                 window.location.href='/'
                },
                error: function(err){
                       console.log(err); 
                }
            });
        }
        else{
           
        }

    });
});