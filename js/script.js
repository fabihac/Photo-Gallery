//for adding/removing new images
var form = document.getElementById('form');
var parentDiv = document.getElementById('result');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    var reader = new FileReader();

    var name = document.getElementById('image').files[0].name;
    console.log(name);
    reader.readAsDataURL(document.getElementById('image').files[0]);

    reader.addEventListener('load', function() {
        if (this.result && localStorage) {
            window.localStorage.setItem(name, this.result);
            parentDiv.innerHTML='';
            showImage();
            
        } else {
            alert("there is a problem");

        }
    })

})


function showImage() {
    for ( i = 0; i < window.localStorage.length; i++) {
        var res = window.localStorage.getItem(window.localStorage.key(i));
        let image = new Image();
        image.src = res;
        parentDiv.appendChild(image);

    }
}
function remove() {
    window.localStorage.clear();
    parentDiv.innerHTML = '';
}

showImage();
