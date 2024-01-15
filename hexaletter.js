const grid = document.getElementsByTagNameNS(
  "http://www.w3.org/2000/svg",
  "svg"
)[0]; // Get the button from the page
var hexlevels = {};

var selecting = false;
var selection = [];
var currentlevel = 0;
var hexword = "";
var hexagrid = "UQUEQEISQUTYTNIKIOR";
var hint = "";
var solvedHex = 0;
var words = ["QUIET", "QUESTION", "QUIRKY"];
var letterPolys = [];
var wordshow = document.getElementById("currentword");
function showtheme() {
  alert("The theme is: " + hint);
}
function checkword(e) {
  if (words.includes(hexword)) {
    for (let a of letterPolys) {
      a.style.fill = "#00AA00";
      a.setAttribute("solved", "true");
      solvedHex++;
    }
  } else {
    for (let a of letterPolys) {
      if (!a.hasAttribute("solved")) {
        a.style.fill = "#FFFFFF";
      } else {
        a.style.fill = "#00AA00";
      }
    }
  }
  letterPolys = [];
  console.log(words.includes(hexword));
  selection = [];
  hexword = "";
  if (solvedHex == hexagrid.length) {
    alert("You won! NEXT LEVEL!");
    currentlevel++;
    setupGrid();
  }
}
function hexclicked(e) {
  var hex = e.srcElement.parentNode;
  var polyg = hex.getElementsByTagName("polygon")[0];
  var text = hex.getElementsByTagName("text")[0];
  var distance = 0;
  if (letterPolys.length > 0 && !polyg.hasAttribute("solved")) {
    var npt = polyg.parentNode.attributes["transform"].value.split(",");
    var npc = [parseFloat(npt[0].split("(")[1]), parseFloat(npt[1])];
    var cpt =
      letterPolys[letterPolys.length - 1].parentNode.attributes[
        "transform"
      ].value.split(",");
    var cpc = [parseFloat(cpt[0].split("(")[1]), parseFloat(cpt[1])];
    distance = Math.sqrt(
      Math.pow(npc[1] - cpc[1], 2) + Math.pow(npc[0] - cpc[0], 2)
    );
  }

  if (!letterPolys.includes(polyg) && distance < 90) {
    polyg.style.fill = letterPolys.length > 0 ? "#3333FF" : "#AAAAFF";
    selection.push(parseInt(text.id.split("letter")[1]) - 1);
    hexword += text.innerHTML;
    letterPolys.push(polyg);
  }
  if (letterPolys.includes(polyg)){
    
  }

  wordshow.innerHTML = hexword;
}
function setupGrid() {
  selection = [];
  hexword = "";
  hexagrid = hexlevels[currentlevel]["grid"];
  words = hexlevels[currentlevel]["words"];
  hint = hexlevels[currentlevel]["hint"];
  solvedHex = 0;
  letterPolys = [];
  for (let i = 0; i < 19; i++) {
    var le = document.getElementById("letter" + (i + 1));
    var poly = le.parentNode.getElementsByTagName("polygon")[0];
    poly.style.fill = "#FFFFFF";
    poly.removeAttribute("solved");
    le.innerHTML = hexagrid.charAt(i);
  }
}
fetch("./samplehexagrids.json")
  .then((response) => response.json())
  .then(function (json) {
    hexlevels = json["hexaletters"];
    setupGrid();
  });
var myModal = new bootstrap.Modal(document.getElementById('hexModal'), {})
myModal.show();