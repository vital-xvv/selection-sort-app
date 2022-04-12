var buttonFile = document.querySelector("#chooseFile");
var butsort =  document.querySelector("#butsort");

buttonFile.addEventListener('click', () => {
    $('#file').trigger('click');
    var formData = new FormData();
// добавляем файл
    formData.append('file', $('#file').files[0]); 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/file");
    xhr.send(formData);
});
butsort.addEventListener('click', ()=> {
    $('#sort').trigger('click');
})