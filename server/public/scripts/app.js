var indexTracker = 0;
var zetaArray = [];

$(document).ready(function(){
   start();
});


function start(){
    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data){
            zetaArray = data.zeta;
            init(zetaArray);
        }
    });
}
function init(data){
    createCarousel(zetaArray);
    updateIndexPoints();
    $("#next").on('click', nextSlide);
    $("#prev").on('click', prevSlide);
}

function createCarousel(array){
    $("#carousel").append("<div class='main'></div>");
    var $el = $("#carousel").children().last();
    createNavButtons($el);
    createIndexPoints(array, $el);
}

function nextSlide(){
    $('.person-container').css('opacity', '0');
    indexTracker++;
    if(indexTracker >= zetaArray.length){
        indexTracker = 0;
    }
    updateIndexPoints();
}

function prevSlide(){
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = zetaArray.length - 1;
    }
    updateIndexPoints();
}

function createNavButtons($el){
    $el.append("<div id='prev' class='nav-button'>Prev</div>");
    $el.append("<div id='next' class='nav-button'>Next</div>");
}

function createIndexPoints(array, $el){
    $el.append("<div class='controls'>");
    $el = $el.children().last();
    for(var i = 0; i < array.length; i++){
        $el.append("<div class='index-point' id='index" + i + "'></div>")
    }
}

function updateIndexPoints(){

    for(var i = 0; i < zetaArray.length; i++){

        $("#index" + i).removeClass("index-point-active");

        if(i == indexTracker){

            $("#index" + i).addClass("index-point-active");
            displaySlide(i);
        }
    }
}

function displaySlide(i){
    var slideOutput =  "<div id='person" + [i] +"' class='person-container well'>" +
        "<span class='zetaName'>" + zetaArray[i].name + "</span>" +
        "<img class='git-image' src='" + zetaArray[i].imageUrl + "'>" +
        "<blockquote>" + zetaArray[i].shoutout + "</blockquote>" +
        "<div class='github-link'><a target='_blank' href='" + zetaArray[i].github + "'>GITHUB LINK >></a>" +
        "</div></div></div>";

    $('#mainContent').html(slideOutput);
}