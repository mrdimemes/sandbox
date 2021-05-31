menu.onclick = function myFunction() {
  var x = document.getElementById("head")
  if (x.className === "head") {
    x.className += " responsive";
  } else {
    x.className = "head";
  }
}
