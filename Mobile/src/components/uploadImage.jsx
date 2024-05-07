const uploadImage =()=>ImageCropPicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    }).then(image => {
    console.log(image);
    })