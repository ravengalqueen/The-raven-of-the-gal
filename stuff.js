document.addEventListener("DOMContentLoaded", function() {
	const starCount = (Math.random()*50+30); // Number of stars to create
	const shootingStarInterval = (Math.random()*7000+1000); // Interval between shooting stars in milliseconds
  
	function createStar() {
	  const star = document.createElement("div");
	  star.className = "star";
	  star.style.top = `${Math.random() * 100}%`;
	  star.style.left = `${Math.random() * 100}%`;
	  document.getElementById("stars").appendChild(star);
	}
  
	function createShootingStar() {
	  const shootingStar = document.createElement("div");
	  shootingStar.className = "shooting-star";
	  shootingStar.style.top = `${Math.random() * 100}%`;
	  shootingStar.style.left = `${Math.random() * 100}%`;
	  document.body.appendChild(shootingStar);
	  setTimeout(() => {
		document.body.removeChild(shootingStar);
	  }, 3000);
	}
  
	function generateStars() {
	  for (let i = 0; i < starCount; i++) {
		createStar();
	  }
	}
  
	generateStars();
	setTimeout(createShootingStar, Math.random() * shootingStarInterval); // Initial shooting star
  
	// Randomize shooting star interval
	function randomizeShootingStarInterval() {
	  const interval = Math.random() * shootingStarInterval;
	  setTimeout(function() {
		createShootingStar();
		randomizeShootingStarInterval();
	  }, interval);
	}
  
	randomizeShootingStarInterval();
  });
  var i = 0;
var txt = 'Hi im ravengal';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
var act = document.getElementById(active)
function currently() {
act.innerHTML += charAt(0, ">");
}

function Point3D(x,y,z) {
            
	this.x = x;
	this.y = y;
	this.z = z;

	this.rotateX = function(currentAngle) {
		
		var rad = currentAngle * Math.PI / 180;
		var cosa = Math.cos(rad);
		var sina = Math.sin(rad);
		var y = this.y * cosa - this.z * sina;
		var z = this.y * sina + this.z * cosa;
		
		return new Point3D(this.x, y, z);
	};

	this.rotateY = function(currentAngle) {
		
		var rad = currentAngle * Math.PI / 180;
		var cosa = Math.cos(rad);
		var sina = Math.sin(rad);
		var z = this.z * cosa - this.x * sina;
		var x = this.z * sina + this.x * cosa;
		
		return new Point3D(x,this.y, z);
	};

	this.rotateZ = function(currentAngle) {
		
		var rad = currentAngle * Math.PI / 180;
		var cosa = Math.cos(rad);
		var sina = Math.sin(rad);
		var x = this.x * cosa - this.y * sina;
		var y = this.x * sina + this.y * cosa;
		
		return new Point3D(x, y, this.z);
	};

	this.project = function(viewWidth, viewHeight, fieldOfView, viewDistance) {
		
		var factor = fieldOfView / (viewDistance + this.z);
		var x = this.x * factor + viewWidth / 2;
		var y = this.y * factor + viewHeight / 2;
		return new Point3D(x, y, this.z);
	};
}

var vertices = [
	new Point3D(-1,1,-1),
	new Point3D(1,1,-1),
	new Point3D(1,-1,-1),
	new Point3D(-1,-1,-1),
	new Point3D(-1,1,1),
	new Point3D(1,1,1),
	new Point3D(1,-1,1),
	new Point3D(-1,-1,1)
];

var cubeFaces = [[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[0,4,5,1],[3,2,6,7]]

var currentAngle = 0;

var screen = {
	w : 64,
	h: 64
};

function startRendering() {
	
	var canvas = document.getElementById("renderScreen");
	if (canvas && canvas.getContext) {
		
		canvas.width = screen.w;
		canvas.height = screen.h;
		
		ctx = canvas.getContext("2d");
		
		ctx.strokeStyle = "rgb(255,15,155)"

		requestAnimationFrame(renderLoop);
	}
}


function renderLoop() {
	
	var points = new Array();
	
	ctx.fillRect(0,0, screen.h, screen.w);
	
	vertices.map(function(vertex){ 
		points.push(vertex.rotateX(currentAngle).rotateY(currentAngle).rotateZ(currentAngle).project(screen.h, screen.w,128,7));
	});
	
	cubeFaces.map(function(cubeFace){
		ctx.beginPath();
		ctx.moveTo(points[cubeFace[0]].x,points[cubeFace[0]].y);
		ctx.lineTo(points[cubeFace[1]].x,points[cubeFace[1]].y);
		ctx.lineTo(points[cubeFace[2]].x,points[cubeFace[2]].y);
		ctx.lineTo(points[cubeFace[3]].x,points[cubeFace[3]].y);
		ctx.closePath();
		ctx.stroke();          
	});
	
	currentAngle += 2;

	requestAnimationFrame(renderLoop);
}
window.onload = startRendering;