$(document).ready(function(){
    
    var setGreen = function(item)
    {
        $(item).removeClass("red").addClass("green");
    },
    
    setRed = function(item)
    {
        $(item).removeClass("green").addClass("red");
    },

    form = new $.JValidate( $('form'), {
        
        // Set the class prefix to jv_
        prefix : 'JV_',

        // Set the defaultSuccess
        defaultSuccess : setGreen,

        // Set the defaultError
        defaultError : setRed

    });

    form.addRule('numeric', function(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    });

    $('a.naam').on('click', function(){
        form.validate();
    });

});
