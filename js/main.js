var sector = ["Energy","Consulting","Manufacturing","Technology","Services","Education","Finance","Health","Other"];
var regions = ["Global","Asia","Europe","Africa","North America","Middle East"];
var partners = ["United Nations High Commissioner for Refugees","International nonprofits","Government agencies","Refugee-owned businesses","Multiple partners","Private-sector organizations","Local nonprofits"]
var filters = {
  "sector":[],
  "regions":[],
  "partners":[  ]
};

var PassFilterSet = {
  "yes":[],
  "no":[]

}


var numCards = [4,3,2,1];
var screenSize;
function detectSize(w) {
  var s;
  if (w >= 1100) {
    s = 0;
  } else if (w >= 769) {
    s = 1;
  } else if (w >= 500) {
    s = 2;
  } else {
    s = 3;
  }

  return s;
}

function AddRemoveItem(dis,filters) {

  // figure out which group was selected from
    var nowList;
    if ($(dis).hasClass("sector")) {nowList = filters.sector;}
    else if ($(dis).hasClass("regions")) {nowList = filters.regions;} 
    else if ($(dis).hasClass("partners")) {nowList = filters.partners}
    
    // if not active, activate this filter by adding it to the filters item
    if ($(dis).hasClass("active") == false) {      
      var q = 0;
      for (var i = 0; i < nowList.length; i++) {
        if (nowList[i] == $(dis)[0].innerHTML) {
          q++;
        }
      }
      if (q < 1) {
        nowList.push($(dis)[0].innerHTML)
      }      
    } 
    // if the clicked thing is already an active filter, remove the filter
    else {      
      var index = nowList.indexOf($(dis)[0].innerHTML);
      if (index > -1) {
        nowList.splice(index, 1);
      }
    }
}

function filterCards(data,filters,PassFilterSet,AddRemove) {
  if (AddRemove == false) {
    var active = "yes";
    var passive = "no"
  } else {
    var active = "no"
    var passive = "yes"
  }

  
  for (var type in filters) {
    // console.log(type)
    // console.log(filters)
    if (filters[type].length != 0) {
      for (var i = 0; i < filters[type].length; i++) {
        for (var j = PassFilterSet[active].length - 1; j >= 0; j--) {
          var correctIndex = 0;

          // console.log(PassFilterSet)
          // console.log(j)
          // console.log(PassFilterSet[active].length)
          // console.log(PassFilterSet[active])

          for (var k = 0; k < PassFilterSet[active][j][type].length; k++) {    
            if (PassFilterSet[active][j][type][k] === filters[type][i]) {              
              correctIndex +=1;
            } 
          }

          if (correctIndex != 1 && active == "yes") {
            PassFilterSet[passive].push(PassFilterSet[active][j])
            PassFilterSet[active].splice(j,1)
          } else if (correctIndex != 0 && active == "no") {
            
            console.log('hello')
            PassFilterSet[passive].push(PassFilterSet[active][j])
            PassFilterSet[active].splice(j,1)
          }    
        }
      }
    }   
  }

  console.log(PassFilterSet)

  // filter for sector
  // filter for region
  // filter for partner

  // return array of filtered Cards
  // return array of filter items

}


///////////document is ready ////////////////
$(document).ready(function(){
  // Add options to DOM
 for (var i = 0; i < sector.length; i++) {
    var bar = "<div class='bar'></div>"
    var option = "<div class='option sector'>"+ sector[i] +"</div>"
    $('#myDropdown1').append(bar)
    $('#myDropdown1').append(option)
  } 

 for (var i = 0; i < regions.length; i++) {
    var bar = "<div class='bar'></div>"
    var option = "<div class='option regions'>"+ regions[i] +"</div>"
    $('#myDropdown2').append(bar)
    $('#myDropdown2').append(option)
  }

  for (var i = 0; i < partners.length; i++) {
    var bar = "<div class='bar'></div>"
    var option = "<div class='option partners'>"+ partners[i] +"</div>"
    $('#myDropdown3').append(bar)
    $('#myDropdown3').append(option)
  }

  // should we sort by alphabetical?
  // draw this mini cards
  for (var i = 0; i < tracker.length; i++) {
    // add all minis to the DOM
    var mini = '<div class="card-mini"><div class="card-inner mini"><div class="card-inner-mini-text"><h1>' + tracker[i].company +'</h1><h3>' + tracker[i].sector + '</h3></div></div></div>';
    $("#main-container-inner-inner").append(mini);

    // add all minis to the PassFilterSet=yes to begin with
    // console.log(PassFilterSet)
    PassFilterSet["yes"].push(tracker[i])
   
  }


  // console.log(tracker[4])


  /////////// Jquery interaction functions ////////////

    // filter dropdown actions
  $(".dropbtn").mouseover(function(){
    $(this).children().addClass("hover")
  })
  $(".dropbtn").mouseout(function(){  
    $(this).children().removeClass("hover")
  })

  $(document).click(function(){
    $('.dropbtn').children().removeClass("active")
  })

  $(".dropbtn").click(function(e){  
    e.stopPropagation();
    $(this).siblings().children().removeClass("active")
    $(this).siblings().children().removeClass("active")
    $(this).children().toggleClass("active")  
  })

  $(".option").click(function(e){
    e.stopPropagation();

    var t0 = performance.now();

    // Add/remove items from filter array
    AddRemoveItem(this,filters)


    filterCards(tracker,filters,PassFilterSet,$(this).hasClass("active"))
    // function search cards based on 
      // filter items
      // previous group...

    // if add item
      // search PassFilterSet=yes items for JUST new search term
    // if remove item 
      // search PassFilterSet=no items for ALL search terms
    
    // visibility classes
    $(this).toggleClass("active")
    $(this).prev().toggleClass("active")

    // timer
    var t1 = performance.now();
    console.log("Filtering took " + (t1 - t0) + " milliseconds.")
  })

  $(".exex").click(function(e){
    e.stopPropagation();
    $(this).parent().parent().hide();
    $('.card-mini').removeClass('active');

    // remove active from the mini card
  })

  $(".card-mini").click(function(e){
    e.stopPropagation();

    // if active already do nothing
    // else 
      // remove all active
      $('.card-mini').removeClass('active')
      // add "active" class to selected mini
      $(this).addClass('active')      

      // find index of "this" relative to .card-mini's
      var cardIndex = $('.card-mini').index(this);
      var width = $( document ).width();
      screenSize = detectSize(width);
      var row = Math.floor(cardIndex / numCards[screenSize]) + 1;
      var cardspRow = numCards[screenSize];
      var Largeposition = row*cardspRow-1;
      
      // change large card location
      $(".card-large").insertAfter('.card-mini:eq(' + Largeposition +')');

      // TO DO
      // update large card information
        //change large card data/text
        //change large card map
      
      // "show" the large card
      $(".card-large").show();

  })

  $( window ).resize(function() {
      var width = $( document ).width();
      var newScreen = detectSize(width);

      // console.log(screenSize)

      if (screenSize != newScreen) {      
        // move the large item to new spot
        // if ($("card-large").is(":visible")) {
          screenSize = newScreen;
          var cardIndex = $('.card-mini').index($('.card-mini.active'));
          // console.log(cardIndex)

          // console.log($('.card-mini.active'))

          var row = Math.floor(cardIndex / numCards[screenSize]) + 1;
          var cardspRow = numCards[screenSize];
          var Largeposition = row*cardspRow-1;
          
          // change large card location
          $(".card-large").insertAfter('.card-mini:eq(' + Largeposition +')');
        // }

      }

      // var screenSize = detectSize(width);
  })

})
