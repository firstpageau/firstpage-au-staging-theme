var previousPath;
var pathname = window.location.pathname;

$( document ).ready(function() {

    $( ".free-session-btn" ).click(function() {
        console.log('go to strategy form btn clicked');
        console.log(pathname);
        previousPath = pathname;
    });
});