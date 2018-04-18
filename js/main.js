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

$(".dropbtn").click(function(){
  $(this).siblings().children().removeClass("active")
  $(this).siblings().children().removeClass("active")
  $(this).children().toggleClass("active")  
})

$(".option").click(function(){
  $(this).toggleClass("active")
  $(this).prev().toggleClass("active")
})