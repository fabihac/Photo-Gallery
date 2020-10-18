let galleryImages = document.querySelectorAll(".gallery-image");//taking full image section
let getLatestOpenedImage; //it used to keep track of the images 
let windowWidth = window.innerWidth; //taking window width for image popup

if(galleryImages) {
	//forEach function runs for every image section and (image) parameter is the reference 
  galleryImages.forEach(function(image,index){
  	image.onclick = function(){
  		let getElementCss = window.getComputedStyle(image);/*getComputedStyle is a js method that takes all the css styles from css folder*/
  		let getFullImageUrl = getElementCss.getPropertyValue("background-image");/*taking a background image property for getting the actual img file*/
  		let getImageUrlPos = getFullImageUrl.split("/img/thumbs/");//spliting the url in two section
  		let setNewUrl = getImageUrlPos[1].replace('")', '');/*in those section which is now an array taking the 2nd part and replacing remaing things to empty string*/

  		getLatestOpenedImage = index + 1;/*this refers the index of gallary images it means whenever one image is opened it is the last image that is opened*/

         //popUpwindow 
  		let container = document.body;
  		let newImgWindow = document.createElement("div");
  		container.appendChild(newImgWindow);
  		newImgWindow.setAttribute("class","img-window");
  		newImgWindow.setAttribute("onclick","closeImg()");
  		


        //popUp image   
  		let newImg = document.createElement("img");
  		newImgWindow.appendChild(newImg);
  		newImg.setAttribute("src","img/" + setNewUrl);/*taking the actual image link from before as its been separated*/
  		newImg.setAttribute("id","current-image" );
        //loading the image first before adding next and prev buttons 
        newImg.onload = function() {

        let imgWidth = this.width;//taking image width
        let calcImgToEdgeRight = ((windowWidth - imgWidth) / 2 ) - 95;/*subtracting imgWidth from windowWidth to get the remaining sides then deving with  2 to get one part of the remaing side then subtracting a little amount to get a distance from image*/
        let calcImgToEdgeLeft = ((windowWidth - imgWidth) / 2 ) - 80;		
        	//next buttons
  		let newBtnNext = document.createElement("a");//creating button links
  		let btnNextText = document.createTextNode("Next");
  		newBtnNext.appendChild(btnNextText);
  		container.appendChild(newBtnNext);
  		newBtnNext.setAttribute("class","img-btn-next");
  		newBtnNext.setAttribute("onclick","changeImg(1)");//giving 1 perameter for adding next image

  		newBtnNext.style.cssText = "right: "+ calcImgToEdgeRight +"px;" ;
  	
        //prev button
  		let newBtnPrev = document.createElement("a");//creating button links
  		let btnPrevText = document.createTextNode("Prev");
  		newBtnPrev.appendChild(btnPrevText);
  		container.appendChild(newBtnPrev);
  		newBtnPrev.setAttribute("class","img-btn-prev");
  		newBtnPrev.setAttribute("onclick","changeImg(0)");//giving 0 perameter for adding prev image

        newBtnPrev.style.cssText = "left: "+ calcImgToEdgeLeft +"px;" ;
        } 	
  		
  	}
     
  });
  

}  	

function closeImg() {
	document.querySelector(".img-window").remove();//deleting for close window popup
	document.querySelector(".img-btn-next").remove();/*deleting buttons for not showing in actual document*/ 
	document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
	document.querySelector("#current-image").remove();//deleting the current image when any button is being clicked
let getImgWindow = document.querySelector(".img-window");//then setting again new window img
	let newImg =document.createElement("img");//taking againg img element to show another image
	getImgWindow.appendChild(newImg);
	let calcNewImg;

	if(changeDir === 1){
       //if Next button is clicked then getLatestOpendImage will increase 1 index
		calcNewImg = getLatestOpenedImage + 1;
		if (calcNewImg > galleryImages.length) {
			calcNewImg = 1;//if calcNewImg(8) > galleryImages.length(7) then it will refer to the first image of the gallery
		}


	}else if(changeDir === 0){
//if Prev button is clicked then getLatestOpendImage will increase 1 index
		calcNewImg = getLatestOpenedImage - 1;
		if (calcNewImg < 1) {
			calcNewImg = galleryImages.length;//if calcNewImg(0) < 1 then it will refer to the last image of the gallery(7)
		}

	}

	newImg.setAttribute("src","img/img" +calcNewImg +".jpg")//creating new img attribute for changing the iages 
	newImg.setAttribute("id","current-image" );

	getLatestOpenedImage = calcNewImg;//have to assing to calcNewImg to existing imgae otherwise it will give wrong value 

	newImg.onload = function () {
         //resizing the butons again because of changing images and different  width of each images
		let imgWidth = this.width;
		let calcImgToEdgeRight = ((windowWidth - imgWidth) / 2 ) - 95;
        let calcImgToEdgeLeft = ((windowWidth - imgWidth) / 2 ) - 80;

        let nextBtn =document.querySelector(".img-btn-next");
        nextBtn.style.cssText ="right: "+ calcImgToEdgeRight +"px;" ;

        let prevBtn =document.querySelector(".img-btn-prev");
        prevBtn.style.cssText ="left: "+ calcImgToEdgeLeft +"px;" ;	
	}

	
}
