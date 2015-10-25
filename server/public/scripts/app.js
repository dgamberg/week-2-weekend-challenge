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
            createCarousel(zetaArray);
            updateIndexPoints();
            $("#next").on('click', nextSlide);
            $("#prev").on('click', prevSlide);
        }
    });
}

//var $el = $('#carouselControls');

function createCarousel(array){
    $("#mainContent").append("<div class='main'></div>");
    var $el =  $("#mainContent").find('#carouselControls');

    createNavButtons($el);
    createIndexPoints(array, $el);
}

function nextSlide(){
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
    var slideOutput =
        "<div id='person' class='person-container well'>" +
        "<div class='git-image'><img src='" + zetaArray[i].imageUrl + "'></div>" +
        "<div class='github-link'><a target='_blank' href='" + zetaArray[i].github + "'>GITHUB LINK >></a>" +
        "</div>" +
        "<div class='zeta-name'>" + zetaArray[i].name + "</div>" +
        "<div class='shout-out'>" + zetaArray[i].shoutout + "</div>" +
        "<div id='carouselControls'></div>" +
        "</div>";

    $('#mainContent').append(slideOutput);
}