
function loadUploadPageScript()
{
  let newUploads = {
        imageFiles: [],
        imageNames: []
      },
      oldUploads = {
        imageFiles: [],
        imageNames: []
      };



  QAll('.carpic').forEach(fileInput => fileInput.addEventListener('change', addCarImages));
  
  function addCarImages()
  {
    if (!this.files[0])
      return;

    let fileInput = this,
        fileInputFormParent = this.parentNode.parentNode.parentNode,
        imageNamesJoined = '',
        uploadTypeIsNew = /new/.test(fileInputFormParent.className);
    
    let { imageFiles, imageNames } = uploadTypeIsNew ? newUploads : oldUploads;

    for (let file of this.files) 
    {
      if (!imageFiles.find(imageFile => imageFile.name == file.name))
        imageFiles.push(file);
    };
 
    imageNames = imageFiles.map(image =>
    {
      const imageURL = URL.createObjectURL(image),
            imageID = image.name.replace(/(.*)\..*/, '$1'),
            thumbnail = `
              <div class='col-4 no-pad pad-r-10px img-upload-thumbnail-wrapper ${imageID}'>
                <img src='${imageURL}' title='${image.name}' class='marg-t-10px d-inline-block img-fluid img-thumbnail' id=${imageID} alt='${image.name}' data-toggle="modal" data-target=".img-preview" />
                <button type='button' class='remove-img-btn rounded-circle ${imageID}-btn'>✕</button>
              </div>`;

      if (!fileInputFormParent.querySelector(`.${imageID}`))
        fileInputFormParent.querySelector('.images-upload-container').insertAdjacentHTML('beforeend', thumbnail);
      
      Q(`button.${imageID}-btn`).onclick = deleteThumbnail;
      Q(`img#${imageID}`).onclick = function(e) {
        previewImage(e);
        activateImageSlide(uploadTypeIsNew);
      };

      return image.name;
    });
    
    updateImageLabelTextContent(imageFiles[0]);


    
    function deleteThumbnail() 
    {
      const thumbID = this.previousElementSibling.title,
            thumbToRemove = imageNames.find(name => name == thumbID),
            indexOfThumbToRemove = imageNames.indexOf(thumbToRemove);

      imageFiles.splice(indexOfThumbToRemove, 1);
      imageNames.splice(indexOfThumbToRemove, 1);
      updateImageLabelTextContent(imageFiles[0]);

      this.parentNode.classList.add('custom-hide');
      this.disabled = true;
      setTimeout(() => this.parentNode.parentNode.removeChild(this.parentNode), 300);
    };


    function updateImageLabelTextContent(labelHasImage)
    {
      if (labelHasImage)
      {
        const boundOfText = Math.ceil((fileInput.nextElementSibling.offsetWidth - 70) / 7);
        imageNamesJoined = imageNames.join('; ');

        fileInput.nextElementSibling.textContent = imageNamesJoined.length > boundOfText ?
          `${imageNamesJoined.substr(0, boundOfText)}...` : imageNamesJoined;
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



  function activateImageSlide(uploadTypeIsNew)
  {
    let { imageFiles } = uploadTypeIsNew ? newUploads : oldUploads,
        lim = imageFiles.length - 1,
        curPos = 0,
        image = { target: {} };
    
    Q('[data-slide=next]').onclick = () =>
    {
      curPos++;
      curPos = curPos > lim ? 0 : curPos;
      image.target.title = imageFiles[curPos].name;
      image.target.src = Q(`img#${imageFiles[curPos].name.replace(/(.*)\..*/, '$1')}`).src;
      previewImage(image);
    }

    Q('[data-slide=prev]').onclick = () =>
    {
      curPos--;
      curPos = curPos < 0 ? lim : curPos;
      image.target.title = imageFiles[curPos].name;
      image.target.src = Q(`img#${imageFiles[curPos].name.replace(/(.*)\..*/, '$1')}`).src;
      previewImage(image);
    }
  }



  function previewImage({ target })
  {
    const { title, src } = target;

    Q('.preview-img').src = src;
    Q('.preview-img').title = title;
    Q('.modal-title').textContent = title;
  }



  function flagIfInvalid(element, isInvalid, msg = 'Invalid input.')
  {
    const errMsgHTML = `<div class='invalid-feedback d-block'>${msg}</div>`,
          errNodeParent = element.parentNode.parentNode,
          errNode = errNodeParent.querySelector('.invalid-feedback');
    
    if (isInvalid && !errNode)
    {
      element.parentNode.insertAdjacentHTML('afterend', errMsgHTML);
      element.classList.add('is-invalid');
    }
    else if (errNode && !isInvalid)
    {
      errNodeParent.removeChild(errNode);
      element.classList.remove('is-invalid');
    }
  }


  console.log("Upload page script deferred and loaded.");
}
