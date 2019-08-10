
function loadUploadPageScript()
{
  document.title = 'Upload Cars | Auto-Web';

  interface Upload
  {
    imageFiles: File[],
    imageNames: string[]
  }

  const newUploads: Upload = 
        {
          imageFiles: [],
          imageNames: []
        },
        oldUploads: Upload = 
        {
          imageFiles: [],
          imageNames: []
        };



  QAll('.carpic').forEach((fileInput: any) => fileInput.addEventListener('change', appendImage));
  
  function appendImage(this: any) 
  {
    if (!this.files[0])
      return;

    const fileInput = this,
          fileInputFormParent = fileInput.parentNode.parentNode.parentNode,
          typeofUploadIsNew = /new/.test(fileInputFormParent.className);
    
    let { imageFiles, imageNames }: any = typeofUploadIsNew ? newUploads : oldUploads,
        imageNamesJoined = '';

    for (let file of fileInput.files) 
    {
      if (!imageFiles.find((imageFile: File) => imageFile.name == file.name))
        imageFiles.push(file);
    };
 
    imageNames = imageFiles.map((imageFile: File) =>
    {
      const imageURL = URL.createObjectURL(imageFile),
            imageID = imageFile.name.replace(/(.*)\..*/, '$1'),
            thumbnail = `
              <div class='col-4 no-pad pad-r-10px img-upload-thumbnail-wrapper ${imageID}'>
                <img src='${imageURL}' title='${imageFile.name}' class='marg-t-10px d-inline-block img-fluid img-thumbnail' id=${imageID} alt='${imageFile.name}' data-toggle="modal" data-target=".img-preview" />
                <button type='button' class='remove-img-btn rounded-circle ${imageID}-btn'>✕</button>
              </div>`;

      if (!fileInputFormParent.querySelector(`.${imageID}`))
        fileInputFormParent.querySelector('.images-upload-container').insertAdjacentHTML('beforeend', thumbnail);
      
      Q(`button.${imageID}-btn`).onclick = deleteThumbnail;
      Q(`img#${imageID}`).onclick = (e: Event) =>
      {
        const curPos = imageNames.indexOf(imageNames.find((name: string) => name == imageFile.name));
        previewImage(e, `(${curPos + 1} of ${imageFiles.length})`);
        activateImageSlide(typeofUploadIsNew, curPos);
      };

      return imageFile.name;
    });
    
    updateImageLabelTextContent(imageFiles[0]);


    
    function deleteThumbnail(this: any) 
    {
      const thumbID = this.previousElementSibling.title,
            thumbToRemove = imageNames.find((name: string) => name == thumbID),
            indexOfThumbToRemove = imageNames.indexOf(thumbToRemove);

      imageFiles.splice(indexOfThumbToRemove, 1);
      imageNames.splice(indexOfThumbToRemove, 1);
      updateImageLabelTextContent(imageFiles[0]);

      this.parentNode.classList.add('custom-hide');
      this.disabled = true;
      setTimeout(() => this.parentNode.parentNode.removeChild(this.parentNode), 300);
    };


    function updateImageLabelTextContent(labelHasImage: boolean)
    {
      if (labelHasImage)
      {
        const boundOfText = Math.ceil((fileInput.nextElementSibling.offsetWidth - 70) / 7.5);
        
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



  function activateImageSlide(typeofUploadIsNew: boolean, curPos: number)
  {
    let { imageFiles } = typeofUploadIsNew ? newUploads : oldUploads,
        lim = imageFiles.length - 1,
        image = { target: { title: '', src: '' } };


    Q('[data-slide=next]').onclick = () =>
    {
      curPos++;
      curPos = curPos > lim ? 0 : curPos;
      image.target.title = imageFiles[curPos].name;
      image.target.src = Q(`img#${imageFiles[curPos].name.replace(/(.*)\..*/, '$1')}`).src;
      previewImage(image, `(${curPos + 1} of ${lim + 1})`);
    }


    Q('[data-slide=prev]').onclick = () =>
    {
      curPos--;
      curPos = curPos < 0 ? lim : curPos;
      image.target.title = imageFiles[curPos].name;
      image.target.src = Q(`img#${imageFiles[curPos].name.replace(/(.*)\..*/, '$1')}`).src;
      previewImage(image, `(${curPos + 1} of ${lim + 1})`);
    }
  }



  function previewImage({ target }: any, countText: string)
  {
    const { title, src } = target;

    Q('.preview-img').src = src;
    Q('.preview-img').title = title;
    Q('.modal-title').textContent = title;
    Q('.img-count').textContent = countText;
  }



  function flagIfInvalid(element: any, isInvalid: boolean, msg = 'Invalid input.')
  {
    const errMsg = `<div class='invalid-feedback d-block'>${msg}</div>`,
          errNodeParent = element.parentNode.parentNode,
          foundErrNode = errNodeParent.querySelector('.invalid-feedback');
    
    if (isInvalid && !foundErrNode)
    {
      element.parentNode.insertAdjacentHTML('afterend', errMsg);
      element.classList.add('is-invalid');
    }
    else if (foundErrNode && !isInvalid)
    {
      errNodeParent.removeChild(foundErrNode);
      element.classList.remove('is-invalid');
    }
  }


  console.log("Upload page script deferred and loaded.");
}
