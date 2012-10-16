$(document).ready(function(){
    var setGreen = function(item)
    {
        $(item).removeClass("red").addClass("green");
    },
    setRed = function(item)
    {
        $(item).removeClass("green").addClass("red");
    };

    $().JValidate('init');  //initializing default validating rules
    $().JValidate('setDefaultSuccessCallback', setGreen); //default success setting 
    $().JValidate('setDefaultErrorCallback', setRed);     //defailt error setting

    $().JValidate('addRule', 'numeric', function(n){return !isNaN(parseFloat(n)) && isFinite(n);});

    $('a.naam').click(function(){
        $('form').JValidate('validate'); //run validation
    });

});
