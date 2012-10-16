$(document).ready(function(){
    var setGreen = function(item)
    {
        $(item).removeClass("red").addClass("green");
    };

    var setRed = function(item)
    {
        $(item).removeClass("green").addClass("red");
    };

    $().jvalidate('init');

    $().jvalidate('addRule', 'numeric', function(n){return !isNaN(parseFloat(n)) && isFinite(n);});

    var rules = $().jvalidate('getRules');

    for (rule in rules)
    {
        $().jvalidate('setErrorCallback',   rule, setRed);
        $().jvalidate('setSuccessCallback', rule, setGreen);
    }
    
    $('a.naam').click(function(){
        $('form').jvalidate('validate');
    });

});
