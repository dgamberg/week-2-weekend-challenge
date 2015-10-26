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
            startSlideTimer();
        }
    });
}
function startSlideTimer(){
    setInterval(function(){ nextSlide(); }, 3000);
}

function createCarousel(array){
    $("#carouselControls").append("<div class='main'></div>");
    var $el = $("#carouselControls").children().last();
    createNavButtons($el);
    createIndexPoints(array, $el);
}

function nextSlide(){
    $('.person-container').fadeOut();
    indexTracker++;
    if(indexTracker >= zetaArray.length){
        indexTracker = 0;
    }
    updateIndexPoints();
    $('.person-container').fadeIn();
}

function prevSlide(){
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = zetaArray.length - 1;
    }
    updateIndexPoints();
}

function createNavButtons($el){
    $el.append("<div id='prev' class='nav-button'><<</div>");
    $el.append("<div id='next' class='nav-button'>>></div>");
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
        "<div id='person" + [i] +"' class='person-container well'>" +
            "<div class='zetaName'>" + zetaArray[i].name + "</div>" +
            "<div><img class='git-image' src='" + zetaArray[i].imageUrl + "'></div>" +
            "<div class='shoutout'>" + zetaArray[i].shoutout + "</div>" +
            "<div class='github-link'><a target='_blank' href='" + zetaArray[i].github + "'>GITHUB LINK >></a></div>" +
        "</div>"; //end person
    $('#mainContent').html(slideOutput);
}