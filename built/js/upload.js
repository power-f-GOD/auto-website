"use strict";
function loadUploadPageScript() {
    var newUploads = {
        imageFiles: [],
        imageNames: []
    }, oldUploads = {
        imageFiles: [],
        imageNames: []
    };
    QAll('.carpic').forEach(function (fileInput) { return fileInput.addEventListener('change', appendImage); });
    function appendImage() {
        if (!this.files[0])
            return;
        var fileInput = this, fileInputFormParent = fileInput.parentNode.parentNode.parentNode, typeofUploadIsNew = /new/.test(fileInputFormParent.className);
        var _a = typeofUploadIsNew ? newUploads : oldUploads, imageFiles = _a.imageFiles, imageNames = _a.imageNames, imageNamesJoined = '';
        var _loop_1 = function (file) {
            if (!imageFiles.find(function (imageFile) { return imageFile.name == file.name; }))
                imageFiles.push(file);
        };
        for (var _i = 0, _b = fileInput.files; _i < _b.length; _i++) {
            var file = _b[_i];
            _loop_1(file);
        }
        ;
        imageNames = imageFiles.map(function (imageFile) {
            var imageURL = URL.createObjectURL(imageFile), imageID = imageFile.name.replace(/(.*)\..*/, '$1'), thumbnail = "\n              <div class='col-4 no-pad pad-r-10px img-upload-thumbnail-wrapper " + imageID + "'>\n                <img src='" + imageURL + "' title='" + imageFile.name + "' class='marg-t-10px d-inline-block img-fluid img-thumbnail' id=" + imageID + " alt='" + imageFile.name + "' data-toggle=\"modal\" data-target=\".img-preview\" />\n                <button type='button' class='remove-img-btn rounded-circle " + imageID + "-btn'>\u2715</button>\n              </div>";
            if (!fileInputFormParent.querySelector("." + imageID))
                fileInputFormParent.querySelector('.images-upload-container').insertAdjacentHTML('beforeend', thumbnail);
            Q("button." + imageID + "-btn").onclick = deleteThumbnail;
            Q("img#" + imageID).onclick = function (e) {
                var curPos = imageNames.indexOf(imageNames.find(function (name) { return name == imageFile.name; }));
                previewImage(e, "(" + (curPos + 1) + " of " + imageFiles.length + ")");
                activateImageSlide(typeofUploadIsNew, curPos);
            };
            return imageFile.name;
        });
        updateImageLabelTextContent(imageFiles[0]);
        function deleteThumbnail() {
            var _this = this;
            var thumbID = this.previousElementSibling.title, thumbToRemove = imageNames.find(function (name) { return name == thumbID; }), indexOfThumbToRemove = imageNames.indexOf(thumbToRemove);
            imageFiles.splice(indexOfThumbToRemove, 1);
            imageNames.splice(indexOfThumbToRemove, 1);
            updateImageLabelTextContent(imageFiles[0]);
            this.parentNode.classList.add('custom-hide');
            this.disabled = true;
            setTimeout(function () { return _this.parentNode.parentNode.removeChild(_this.parentNode); }, 300);
        }
        ;
        function updateImageLabelTextContent(labelHasImage) {
            if (labelHasImage) {
                var boundOfText = Math.ceil((fileInput.nextElementSibling.offsetWidth - 70) / 7.5);
                imageNamesJoined = imageNames.join('; ');
                fileInput.nextElementSibling.textContent = imageNamesJoined.length > boundOfText ?
                    imageNamesJoined.substr(0, boundOfText) + "..." : imageNamesJoined;
                fileInput.title = imageNames.join('\n');
                if (imageFiles.length > 5)
                    flagIfInvalid(fileInput, true, 'Note: Only first five images will be sent and uploaded to server.');
                else
                    flagIfInvalid(fileInput, false);
            }
            else {
                fileInput.value = null;
                fileInput.title = 'No file chosen';
                fileInput.nextElementSibling.textContent = 'Select photo(s) of car (Max: 5)';
            }
        }
    }
    function activateImageSlide(typeofUploadIsNew, curPos) {
        var imageFiles = (typeofUploadIsNew ? newUploads : oldUploads).imageFiles, lim = imageFiles.length - 1, image = { target: { title: '', src: '' } };
        Q('[data-slide=next]').onclick = function () {
            curPos++;
            curPos = curPos > lim ? 0 : curPos;
            image.target.title = imageFiles[curPos].name;
            image.target.src = Q("img#" + imageFiles[curPos].name.replace(/(.*)\..*/, '$1')).src;
            previewImage(image, "(" + (curPos + 1) + " of " + (lim + 1) + ")");
        };
        Q('[data-slide=prev]').onclick = function () {
            curPos--;
            curPos = curPos < 0 ? lim : curPos;
            image.target.title = imageFiles[curPos].name;
            image.target.src = Q("img#" + imageFiles[curPos].name.replace(/(.*)\..*/, '$1')).src;
            previewImage(image, "(" + (curPos + 1) + " of " + (lim + 1) + ")");
        };
    }
    function previewImage(_a, countText) {
        var target = _a.target;
        var title = target.title, src = target.src;
        Q('.preview-img').src = src;
        Q('.preview-img').title = title;
        Q('.modal-title').textContent = title;
        Q('.img-count').textContent = countText;
    }
    function flagIfInvalid(element, isInvalid, msg) {
        if (msg === void 0) { msg = 'Invalid input.'; }
        var errMsg = "<div class='invalid-feedback d-block'>" + msg + "</div>", errNodeParent = element.parentNode.parentNode, foundErrNode = errNodeParent.querySelector('.invalid-feedback');
        if (isInvalid && !foundErrNode) {
            element.parentNode.insertAdjacentHTML('afterend', errMsg);
            element.classList.add('is-invalid');
        }
        else if (foundErrNode && !isInvalid) {
            errNodeParent.removeChild(foundErrNode);
            element.classList.remove('is-invalid');
        }
    }
    console.log("Upload page script deferred and loaded.");
}
