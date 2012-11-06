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

    }).addRule('RGB', function(value){
        return (/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/).test(value);
    });

    $('a.naam').on('click', function(){
        form.validate();
    });

});
