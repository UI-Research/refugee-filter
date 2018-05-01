var sector = ["Energy","Consulting","Manufacturing","Technology","Services","Education","Finance","Health","Other"];
var regions = ["Global","Asia","Europe","Africa","North America","Middle East"];
var partners = ["United Nations High Commissioner for Refugees","International non-profits","Government agencies","Refugee-owned businesses","Multiple partners","Private-sector organizations","Local non-profits"]
var filters = {
  "sector":[],
  "regions":[],
  "partners":[  ]
};

var PassFilterSet = []


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

function GrabImage(d) {
  var imgNames = []
  for (var i = 0; i < d.length; i++) {
    if (d[i] == "Global") {imgNames.push("Gl")}
    else if (d[i] == "Europe") {imgNames.push("Eu")}
    else if (d[i] == "Middle East") {imgNames.push("Mi")}
    else if (d[i] == "Asia") {imgNames.push("As")}
    else if (d[i] == "Africa") {imgNames.push("Af")}
    else if (d[i] == "North America") {imgNames.push("No")}
  }

  var img = imgNames.join('-')
  return "/images/maps/map-" + img + ".jpg"
}

function MultiplesString(d) {
  for (var i = 0; i < d.length; i++) {
    if (d[i] == "Middle East") {d[i] = "the Middle East"}
  }
  if (d.length == 1) {
    return d[0];
  } 
  else if (d.length === 2) {    
    return d[0] + " and " + d[1];
  }
  else if (d.length >= 3) {    
    var dd = d.pop()
    return d.join(', ') + ", and " + dd;
  }
}

function cardSort(data) {
    var sortedArray = data.sort(function (a, b) {
          if (a.company < b.company) return -1;
          else if (a.company > b.company) return 1;
          return 0;
        });
    return sortedArray;
}

function mapSort(data) {
    var sortedArray = data.sort(function (a, b) {
        if (a < b) return -1;
        else if (a > b) return 1;
        return 0;
      });
  return sortedArray;
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

function filterType(data,filtersInner,type) {    
  var newData = [];

  if (filtersInner.length == 0) {
    newData = JSON.parse(JSON.stringify(data))
  } else {
    for (var j = data.length - 1; j >= 0; j--) { 
      if (type == "sector") {
        for (var i = 0; i < filtersInner.length; i++) {
          if (data[j][type] == filtersInner[i]) {
            newData.push(data[j])
          }
        }
      } 
      else {
        dance:
        for (var k = 0; k < data[j][type].length; k++) {
          for (var i = 0; i < filtersInner.length; i++) {
            if (data[j][type][k] == filtersInner[i]) {
              newData.push(data[j])
              break dance;              
            }
          }  
        }
      }    
    }     
  }
  return newData;
}

function filterCards(data,filters) {
    // go into first fitler, go through all data
    // if qualifies for any of the filter objects, add to intersticial

    // go into second filter, go through intersticial, if qualifies for any of the filter objects, add to new data, return intersticial (2)
    //  go into third filter, go through intersticial, 

  var finalData = []
  
  for (var type in filters) {
    if (type == "sector") {
      finalData = filterType(data,filters[type],type)
    } else {
      finalData = filterType(finalData,filters[type],type)
    }
  }
  return finalData;

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

  //sort by alphabetical
  tracker = cardSort(tracker)

  // draw this mini cards
  for (var i = 0; i < tracker.length; i++) {
    // add all minis to the DOM
    var mini = '<div class="card-mini"><div class="card-inner mini"><div class="card-inner-mini-text"><h1>' + tracker[i].company +'</h1><h3>' + tracker[i].sector + '</h3></div></div></div>';
    $("#main-container-inner-inner").append(mini);
    $("#main-container-inner-inner").children().last().data(tracker[i]);

   
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


/////////////  // on click of options from the dropdown/ ////////////

  $(".option").click(function(e){
    e.stopPropagation();

    var t0 = performance.now();

    // Add/remove items from filter array
    AddRemoveItem(this,filters)

    var finalData;
    finalData =filterCards(tracker,filters)

    finalData = cardSort(finalData)


    // visibility classes
    $(this).toggleClass("active")
    $(this).prev().toggleClass("active")

    $("#main-container-inner-inner").empty();
    for (var i = 0; i < finalData.length; i++) {
      // add all minis to the DOM
      var mini = '<div class="card-mini"><div class="card-inner mini"><div class="card-inner-mini-text"><h1>' + finalData[i].company +'</h1><h3>' + finalData[i].sector + '</h3></div></div></div>';
      $("#main-container-inner-inner").append(mini);     
      $("#main-container-inner-inner").children().last().data(finalData[i]);
    }


    // timer
    var t1 = performance.now();
    console.log("Filtering took " + (t1 - t0) + " milliseconds.")
  })



  $("#main-container-inner-inner").on("click",".exex",function(e){
    e.stopPropagation();

    $(this).parent().parent().hide();
    $('.card-mini').removeClass('active');
  })  

  
  $("#main-container-inner-inner").on("click",".card-mini",function(e){
    e.stopPropagation();

    // some reason this isn't working for newly createed items

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
        
      // create large card 
      $(".card-large").remove()
      // get the data from this mini card  that was selected... add it to the large card. 
      
      // console.log($(this).data())

      var places = mapSort($(this).data().regions);

      var large = {"mapImg": GrabImage(places),
        "regions": MultiplesString(places),
        "title": $(this).data().company,
        "sector": $(this).data().sector,
        "description": $(this).data().description,
        "partners": MultiplesString($(this).data().partners),
        "year": $(this).data().year
      }

      var largey = '<div class="card-large"><div class="card-inner"><div class="exex"></div><div class="card-inner-large-text"><div class="map"><img src="' + large.mapImg + '"><div class="map-text"><p>Works with refugees in areas in ' + large.regions + '.</p></div></div><div class="large-text-container"><div class="large-text-inner"><h1>' + large.title + '</h1><h3>' + large.sector + '</h3><p>' + large.description + '</p><p><strong>Partners: </strong>' + large.partners + '</p><p><strong>Started: </strong>' + large.year + '</p></div></div></div></div></div>';
      // var largey = "farts"
      $("#main-container-inner-inner").append(largey);

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

      if (screenSize != newScreen) {      
        // move the large item to new spot
        // if ($("card-large").is(":visible")) {
          screenSize = newScreen;
          var cardIndex = $('.card-mini').index($('.card-mini.active'));

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
