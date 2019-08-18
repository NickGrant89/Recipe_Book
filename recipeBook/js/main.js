
$(document).ready(function(){
    $('.recipe-delete').on('click', function(e){
        $target = $(e.target);
        //console.log($target.attr('data-id'))
        //console.log($target.attr('data-age'))
        //const id = $target.attr('data-age');
        const id = $target.attr('data-id');
        var delIngredients =  confirm('Are you sure you want to delete this recipe?');
        if(delIngredients == true){
            $.ajax({
                type:'DELETE',
                url: '/recipes/'+id,
                success: function(response){
                 alert('Recipe Deleted');
                 window.location.href='/recipes'
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

$(document).ready(function(){
    $('.ingredients-delete').on('click', function(e){
        $target = $(e.target);
        console.log($target.attr('data-id'))
        console.log($target.attr('data-age'))
        const id = $target.attr('data-age');
        const id2 = $target.attr('data-id');
        var delIngredients =  confirm('Are you sure you want to delete this ingredients?');
        if(delIngredients == true){
            $.ajax({
                type:'DELETE',
                url: '/recipes/ingredients/'+id+'/'+id2,
                success: function(response){
                 alert('Ingredients Deleted');
                 window.location.href='/recipes/'+id
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

$(document).ready(function(){
    $('.directions-delete').on('click', function(e){
        $target = $(e.target);
        //console.log($target.attr('data-id'))
        //console.log($target.attr('data-age'))
        const id = $target.attr('data-age');
        const id2 = $target.attr('data-id');
        var delIngredients =  confirm('Are you sure you want to delete this ingredients?');
        if(delIngredients == true){
            $.ajax({
                type:'DELETE',
                url: '/recipes/directions/'+id+'/'+id2,
                success: function(response){
                 alert('Directions Deleted');
                 window.location.href='/recipes/'+id
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
$(document).ready(function(){
    $('.directions-delete').on('click', function(e){
var input = document.getElementById('input');
var picker = new Picker(input, {
  format: 'YYYY/MM/DD HH:mm',
});
});
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
  });

(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);