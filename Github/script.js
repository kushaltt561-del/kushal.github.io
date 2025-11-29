console.clear();
console.info("Hello World! from script.js");
var elem = document.getElementById("btn");

// elem.addEventListener("click" , function(){
//     alert("button clicked!")
//     var ptag = document.querySelectorAll("p");
//     ptag[0].style.color = "blue"
// });


$("#btn").on("click", function(){
    alert("button clicked!");
    $("#btn").html("clicked");
})