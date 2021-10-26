function writeGeoVolume(geovolume,htmlParent)
{   
    if(geovolume.id && geovolume.links){
        var li = document.createElement("li");
        li.className="ordered";
        var linkToSelf = "";
        for(let link of geovolume.links){
            if(link.rel == "self"){
                linkToSelf = link.href; 
            }
        }
        var innerHTML = '<a href="' + linkToSelf + '">'  + geovolume.id + '</a>' ;
        if(geovolume.content.length > 0){
            innerHTML+= '<br>    Representations : ';
            innerHTML+= '<ul> ';
            for(let c of geovolume.content){
                innerHTML+= '<li>'+ c.title+' : <a href="' + c.href + '">'  + c.type + '</a></li>';
            }
            innerHTML+= '</ul> ';
        }
        li.innerHTML = innerHTML;
        if(geovolume.children.length > 0){
            var ol = document.createElement("ol");
            for(let child of geovolume.children){
                writeGeoVolume(child,ol);
            }
            li.appendChild(ol);
        }
        htmlParent.appendChild(li);
    }
}

var div = document.getElementById("collections");
var ol = document.createElement("ol");

for (el of values){
    writeGeoVolume(el,ol);    
}

div.appendChild(ol);