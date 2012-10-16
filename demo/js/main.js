$(document).ready(function(){
    var setGreen = function(item)
    {
        $(item).removeClass("red").addClass("green");
    },
    setRed = function(item)
    {
        $(item).removeClass("green").addClass("red");
    };

    $().jvalidate('init');  //initializing default validating rules
    $().jvalidate('setDefaultSuccessCallback', setGreen); //default success setting 
    $().jvalidate('setDefaultErrorCallback', setRed);     //defailt error setting

    $().jvalidate('addRule', 'numeric', function(n){return !isNaN(parseFloat(n)) && isFinite(n);});

    $('a.naam').click(function(){
        $('form').jvalidate('validate'); //run validation
    });

});
