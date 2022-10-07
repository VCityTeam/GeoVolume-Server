function writeGeoVolume(geovolume, htmlParent, i) {
  if (geovolume.id && geovolume.links) {
    var div = document.createElement("div");
    div.className = "geoVolume w3-bar-block w3-hide w3-padding-large w3-medium";
    if (i == 0) div.className += " w3-show";

    // Name of the geovolume
    var a_name = document.createElement("a");
    a_name.className = "w3-btn w3-grey w3-round w3-padding-large w3-left-align";
    a_name.innerText = geovolume.id;


    div.appendChild(a_name);


    // Button to go to HREF of GeoVolume
    var a_selfhref = document.createElement("button");
    a_selfhref.onclick = () => {
      window.location = geovolume.links[0].href;
    };
    a_selfhref.innerText = "get";
    a_selfhref.type = "button";
    a_selfhref.className =
      "w3-btn w3-green w3-round w3-padding-large w3-right-align";
    div.appendChild(a_selfhref);


    //Create table of content
    if (geovolume.content.length > 0) {
      var table = document.createElement("table");
      table.className =
        "w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white";
      for (let c of geovolume.content) {
        table.innerHTML +=
          "<tr><td>" +
          c.title +
          '</td><td> <a href="' +
          c.href +
          '">' +
          c.type +
          "</td></li></tr>";
      }
      div.appendChild(table);
    }
    else {
      var div_no_content = document.createElement("div");
      div_no_content.className ="w3-bar-item w3-button w3-round w3-white";
      div_no_content.style.width = "max-content"; 
      div_no_content.innerText = "No content available"; 
      div.appendChild(div_no_content);
    }

    //Create children
    if (geovolume.children.length > 0) {
      var show_children = document.createElement('button');
      show_children.innerText = "Show children »";
      show_children.onclick = () => {
        myAccFunc(div);
      };
      show_children.className="w3-btn w3-green w3-round w3-padding-large w3-right-align";
      div.appendChild(show_children);
      for (let child of geovolume.children) {
        writeGeoVolume(child, div, i + 1);
      }
    }
    htmlParent.appendChild(div);
  }
}

function myAccFunc(a) {
  var elements = a.children;
  for (let el of elements) {
    if (el.className.indexOf("geoVolume") != -1) {
      if (el.className.indexOf("w3-show") == -1) {
        el.className += " w3-show";
      } else {
        el.className = el.className.replace(" w3-show", "");
      }
    }
  }
}

var div = document.getElementById("collections");
for (el of values) {
  writeGeoVolume(el, div, 0);
}
