name = "album-1";

titles = document.getElementsByTagName("H1");
for(var index = 0;index < titles.length;index++){
    rainbowstring(titles[index]);    
}
rainbow(document.getElementsByTagName("A"));

codesquaresize = 170;
marginsize = 40;
fontsize = 12;
//globalurl = "http://www.trashrobot.org/qrcode.html";

globalurl = window.location.href;

qrcode = new QRCode(document.getElementById("qrcode"), {
	text: globalurl,
	width: codesquaresize,
	height: codesquaresize,
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
});



wall = "";
var httpc = new XMLHttpRequest();
httpc.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        wall = this.responseText;
        document.getElementById("wall").value = wall;  
    }
};
httpc.open("GET", "load-file.php?filename=wall.txt", true);
httpc.send();

document.getElementById("wall").onkeyup = function() {
    wall = this.value;
    data = encodeURIComponent(this.value);
    var httpc = new XMLHttpRequest();
    var url = "save-file.php";        
    httpc.open("POST", url, true);
    httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    httpc.send("data="+data+"&filename=wall.txt");//send text to save-file.php
}


albums = [];
var httpcAlbums = new XMLHttpRequest();
httpcAlbums.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        albums = JSON.parse(this.responseText);
        document.getElementById("albums").innerHTML = "";
        
        for(let index = 0;index < albums.length;index++){
            let newAlbum = document.createElement("DIV");
            newAlbum.innerHTML = albums[index];
            document.getElementById("albums").appendChild(newAlbum);
            newAlbum.classList.add("album");
            newAlbum.classList.add("button");
            newAlbum.onclick = function(){
                name = this.innerHTML;
                document.getElementById("title").innerHTML = name;
                rainbowstring(document.getElementById("title"))
                loadAlbum();
            }
        }
    }
};
httpcAlbums.open("GET", "list-albums.php", true);
httpcAlbums.send();


function loadAlbum(){
    files = [];
    var httpcUpload = new XMLHttpRequest();
    httpcUpload.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            files = JSON.parse(this.responseText);
            loadfiles();
        }
    };
    httpcUpload.open("GET", "list-files.php?directory=" + name, true);
    httpcUpload.send();
}


function loadfiles(){
    document.getElementById("track-list").innerHTML = "";
    document.getElementById("pdf-feed").innerHTML = "";
    document.getElementById("text-feed").innerHTML = "";
    document.getElementById("image-feed").innerHTML = "";
    document.getElementById("web-feed").innerHTML = "";

    songs = [];
    for(var index = 0;index < files.length;index++){
        if(files[index].substring(files[index].length-4,files[index].length) == ".mp3" || files[index].substring(files[index].length-4,files[index].length) == ".wav"){
            songs.push(files[index]);  
        }

    }
    if(songs.length > 0){
        listhtml = "<track-list>\n";
        listhtml += "  <ol slot = \"tracks\">\n";
        for(var index = 0;index < files.length;index++){
            if(files[index].substring(files[index].length-4,files[index].length) == ".mp3" || files[index].substring(files[index].length-4,files[index].length) == ".wav"){
                listhtml += "    <li>\n";
                listhtml += "      <strong>" + name + "/" + files[index] + "</strong>\n";
            listhtml += "      <audio controls src = \"" + name + "/" + files[index] + "\"></audio>\n";
                listhtml += "    </li>\n";                
            }
    
        }
        listhtml += "  </ol>\n";
        listhtml += "</track-list>";
        document.getElementById("track-list").innerHTML = listhtml;
        rainbow(document.getElementsByTagName("li"));
        
    }



    for(var index = 0;index < files.length;index++) {
        if(files[index].includes(".png") || files[index].includes(".PNG") || files[index].includes(".jpg") || files[index].includes(".JPG") ||files[index].includes(".jpeg")||files[index].includes(".SVG") ||files[index].includes(".svg") || files[index].includes(".gif") ||files[index].includes(".GIF")){
            
            var newuploadbox = document.createElement("DIV");
            newuploadbox.classList.add("imagebox");
            var newimg = document.createElement("IMG");
            newimg.src = name + "/" + files[index];
            newimg.classList.add("uploadimage");
            newuploadbox.appendChild(newimg);
            document.getElementById("image-feed").appendChild(newuploadbox);
    
        }
    }    

    for(var index = 0;index < files.length;index++) {
        if(files[index].includes(".pdf")){
            var newlink = document.createElement("a");
            newlink.href = name + "/" + files[index];
            newlink.innerHTML = files[index];
            document.getElementById("pdf-feed").appendChild(newlink);
        }
    }        

    for(var index = 0;index < files.length;index++) {
        if(files[index].includes(".txt")){
            var newlink = document.createElement("a");
            newlink.href = name + "/" + files[index];
            newlink.innerHTML = files[index];
            document.getElementById("text-feed").appendChild(newlink);
        }
    }        

    for(var index = 0;index < files.length;index++) {
        if(files[index].includes(".html")){
            var newlink = document.createElement("a");
            newlink.href = name + "/" + files[index];
            newlink.innerHTML = files[index];
            document.getElementById("web-feed").appendChild(newlink);
        }
    }        

    rainbow(document.getElementsByTagName("A"));

}

function colorwheel(angle){
    H = angle;
    z = 255*(1 - Math.abs((H/60)%2 - 1));
    if(H < 60){
        red = 255;
        green = Math.round(z);
        blue = 0;
    }
    if(H >= 60 && H < 120){
        red = Math.round(z);
        green = 255;
        blue = 0;
    }
    if(H >= 120 && H < 180){
        red = 0;
        green = 255;
        blue = Math.round(z);
    }
    if(H >= 180 && H < 240){
        red = 0;    
        green = Math.round(z);
        blue = 255;
    }
    if(H >= 240 && H < 300){
        red = Math.round(z);    
        green = 0;
        blue = 255;
    }
    if(H >= 300 && H < 360){
        red = 255;    
        green = 0;
        blue = Math.round(z);
    }
    
    redstring = red.toString(16);
    if(redstring.length < 2){
        redstring = "0" + redstring;    
    }
    greenstring = green.toString(16);
    if(greenstring.length < 2){
        greenstring = "0" + greenstring; 
    }
    bluestring = blue.toString(16);
    if(bluestring.length < 2){
        bluestring = "0" + bluestring; 
    }
    color = "#" + redstring + greenstring + bluestring;   
    return(color);
}

function rainbowstring(localelement){
    text = localelement.innerHTML;
    localelement.innerHTML = "";
    n = text.length;
    for(var index = 0; index < n; index++){
        var newspan = document.createElement("SPAN");    
        newspan.innerHTML = text.charAt(index);
    
        H = index*360/n;
        z = 255*(1 - Math.abs((H/60)%2 - 1));
    
        if(H < 60){
            red = 255;
            green = Math.round(z);
            blue = 0;
        }
        if(H >= 60 && H < 120){
            red = Math.round(z);
            green = 255;
            blue = 0;
        }
        if(H >= 120 && H < 180){
            red = 0;
            green = 255;
            blue = Math.round(z);
        }
        if(H >= 180 && H < 240){
            red = 0;    
            green = Math.round(z);
            blue = 255;
        }
        if(H >= 240 && H < 300){
            red = Math.round(z);    
            green = 0;
            blue = 255;
        }
        if(H >= 300 && H < 360){
            red = 255;    
            green = 0;
            blue = Math.round(z);
        }
        
        redstring = red.toString(16);
        if(redstring.length < 2){
            redstring = "0" + redstring;    
        }
        greenstring = green.toString(16);
        if(greenstring.length < 2){
            greenstring = "0" + greenstring; 
        }
        bluestring = blue.toString(16);
        if(bluestring.length < 2){
            bluestring = "0" + bluestring; 
        }
        color = "#" + redstring + greenstring + bluestring;   
        newspan.style.color = color;
        localelement.appendChild(newspan);
    }
    

}
function rainbow(localarray){
    n = localarray.length;
    theta = 0;
    for(var index = 0;index < n;index++){
    
        H = index*360/n;
        z = 255*(1 - Math.abs((H/60)%2 - 1));
    
        if(H < 60){
            red = 255;
            green = Math.round(z);
            blue = 0;
        }
        if(H >= 60 && H < 120){
            red = Math.round(z);
            green = 255;
            blue = 0;
        }
        if(H >= 120 && H < 180){
            red = 0;
            green = 255;
            blue = Math.round(z);
        }
        if(H >= 180 && H < 240){
            red = 0;    
            green = Math.round(z);
            blue = 255;
        }
        if(H >= 240 && H < 300){
            red = Math.round(z);    
            green = 0;
            blue = 255;
        }
        if(H >= 300 && H < 360){
            red = 255;    
            green = 0;
            blue = Math.round(z);
        }
        
        redstring = red.toString(16);
        if(redstring.length < 2){
            redstring = "0" + redstring;    
        }
        greenstring = green.toString(16);
        if(greenstring.length < 2){
            greenstring = "0" + greenstring; 
        }
        bluestring = blue.toString(16);
        if(bluestring.length < 2){
            bluestring = "0" + bluestring; 
        }
        color = "#" + redstring + greenstring + bluestring;
        //console.log(color);
        localarray[index].style.backgroundColor = color;// + "80";
        localarray[index].style.borderColor = color;
    }
}

function googleyeyes(n){
    var square = 1;
    if(innerWidth > innerHeight){
        square = innerHeight;
    }
    else{
        square = innerWidth;
    }
    for(var index = 0;index < n;index++){
        var eye = document.createElement("DIV");
        eye.style.position = "absolute";
        eye.style.borderRadius = "50%";
        eye.style.border = "solid";
        eye.style.backgroundColor = "white";
        eye.style.zIndex = "-1";
        var pupil = document.createElement("DIV");
        pupil.style.position = "absolute";
        pupil.style.borderRadius = "50%";
        pupil.style.border = "solid";
        pupil.style.backgroundColor = "black";
        pupil.style.zIndex = "0";
        eyesize = Math.round(0.2*Math.random()*square);
        if(eyesize < 20){
            eyesize = 20;
        }
        eyeleft = Math.round(Math.random()*innerWidth);
        eyetop = Math.round(Math.random()*innerHeight);

        eye.style.width = eyesize.toString() + "px";
        eye.style.height = eyesize.toString() + "px";
        if(eyetop > innerHeight - eyesize - 30){
            eyetop = innerHeight - eyesize - 30;
        }
        if(eyeleft > innerWidth - eyesize - 30){
            eyeleft = innerWidth - eyesize - 30;
        }

        eye.style.top = eyetop.toString() + "px";
        eye.style.left = eyeleft.toString() + "px";


        pupil.style.width = (0.3*eyesize).toString() + "px";
        pupil.style.height = (0.3*eyesize).toString() + "px";

        pupilleft = Math.round(0.7*Math.random()*eyesize);
        pupiltop = Math.round(0.7*Math.random()*eyesize);
        pupil.style.left = pupilleft.toString() + "px";
        pupil.style.top = pupiltop.toString() + "px";

        eye.appendChild(pupil);
        
        document.body.appendChild(eye);

    }
}
