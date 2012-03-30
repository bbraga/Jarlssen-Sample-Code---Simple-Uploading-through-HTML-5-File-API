/*
***************************************************************************************************
This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. 
To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ or send 
a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

Copyright 2012 @ Bruno Braga
*************************************************************************************************** 
*/
(function () {
    var filesUpload = document.getElementById("files-upload"),
        fileList = document.getElementById("file-list");

    // Set a max upload filesize of 200 kb
    var maxFileUploadSize = 204800;
    
    function uploadFile (file) {                                     
        var xhr,
            fileInfo,
            ext;
            
        // Validate file size                    
        if (filesUpload.files[0].size > maxFileUploadSize){
            fileList.innerHTML = "File size is bigger than " + parseInt(maxFileUploadSize / 1024, 10)  + "Kb";
            return false;            
        }        
        
        // Validate Image / Pdf    
        ext = file.name.substr(file.name.lastIndexOf('.') + 1);
        if (ext != "jpg" && ext != "jpeg" && ext != "pdf") {
            fileList.innerHTML = "<p class='upload-red'>File type must be either jpeg or pdf!</p>";
            return false;               
        }               

        // Upload file (only support on firefox safari and chrome)
        xhr = new XMLHttpRequest();

        // Handle file upload event
        xhr.addEventListener("load", function (e) {
            fileList.innerHTML = fileList.innerHTML + e.target.response;
        }, false);
                           
        // Set remote uploading service call
        xhr.open("post", "files/upload.php", true);

        // Set appropriate headers
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.setRequestHeader("X-FILENAME", file.name);
        xhr.setRequestHeader("X-FILESIZE", file.size);
        xhr.setRequestHeader("X-FILETYPE", file.type);

        // Send the file
        xhr.send(file);

        // Present file info and append it to the list of files
        fileInfo = "<div><strong>Name:</strong> " + file.name + "</div>";
        fileInfo += "<div><strong>Size:</strong> " + parseInt(file.size / 1024, 10) + " Kb</div>  ";
        fileInfo += "<div><strong>Type:</strong> " + file.type + "</div>";
        fileList.innerHTML = fileInfo;
    }

    function traverseFiles (files) {
        if (typeof files !== "undefined") {
            for (var i=0, l=files.length; i<l; i++) {
                uploadFile(files[i]);
            }
        }
        else {
            fileList.innerHTML = "HTML5 File API is not supported on this web browser";
        }
    }

    filesUpload.addEventListener("change", function () {
        traverseFiles(this.files);
    }, false);
})();       