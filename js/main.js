/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {

//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//    $(this).children().addClass("hover") 
//   }
// }

// filter dropdown actions
$(".dropbtn").mouseover(function(){
  $(this).children().addClass("hover")
})
$(".dropbtn").mouseout(function(){  
  $(this).children().removeClass("hover")
})

$(document).click(function(){
	console.log('hello')
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
  $(this).toggleClass("active")
  $(this).prev().toggleClass("active")
})






