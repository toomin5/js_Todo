const imgs = ["0.jpeg","1.jpeg","2.jpeg","3.jpeg"];

const randomImg = imgs[Math.floor(Math.random() * imgs.length)];
//imgs[0,3,2,1];

bgImg = document.createElement('img');
bgImg.src = `img/${randomImg}` // <img src="img/0.jpeg">

document.body.appendChild(bgImg);