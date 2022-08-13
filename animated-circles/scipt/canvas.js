let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d") // because it is going to be appear as 2d

// mouse object
let mouse = {
    x : '',
    y : ''
}

let maxRadius = 45;

let colorArray = [
    "white",
    "aqua",
    "purple",
    "green",
    "blue"
]

// for animating affects when hover
window.addEventListener("mousemove", function (event) { // event will receives all properties like client X-axis client y-axis etc
    mouse.x = event.x;
    mouse.y = event.y;
});


// so circles will automatically start adjusting themselves as window height or width expands or shrinks
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// for drawing circles
function Circle(x, y, radius, dx, dy) { // function with CAPITAL letter shows it is an object
    this.x = x; // (this.) here is representing owner which is Circle hence Circle.x or Circle.y
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    // will draw circle
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.strokeStyle = "black";
        c.stroke();
        c.fill()
    }
    
    // will update the circle
    this.update = function () {
        if (this.x >= window.innerWidth - this.radius || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        
        if (this.y >= window.innerHeight - this.radius || this.y - this.radius <= 0) {
            this.dy = -this.dy
        }
        this.x += this.dx; 
        this.y += this.dy;
        
        // interactivity for hover effects
        // mouse.x will change with the hover all around the page
        // circle.x axis can 0 to 1200 which is around window.innerWidth so for example mouse.x is 100 and circle.x
        // is 500 so it'll 100-500 = -400 hence it's true -400 is < 50 therefore increase
        if ( mouse.x - this.x <= 50 && mouse.x - this.x >= -50 && mouse.y - this.y <= 50 && mouse.y - this.y >= -50) {
            if ( this.radius <= maxRadius ) {
                this.radius += 1; // this.radius is basically circle.radius which is 30 here
            }
        }
        else if ( this.radius >= this.minRadius ) { // so each circle will gets back to its original radius
            this.radius -= 1;
        }
        this.draw()
    }
}

let circleArray = [];

for (let i = 0; i < 500; i++) {
    // we've put X and Y values inside for loop so every time the loop runs the Math.random() will provide random pixel to all circles
    let radius = Math.random() * 10 + 1; // +1 so if random number is 0 the we can at least have 1px of radius
    let x = Math.random() * (window.innerWidth - radius * 2) + radius; // so the circles will not stuck at anywhere
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = Math.random() * 2; // velocity at x-axis
    let dy = Math.random() * 2;
    circleArray.push(new Circle(x, y, radius, dx, dy)) // for creating multiple objects of similar properties instead of creating same object again and again
}


// creating loop with parameters requestAnimationFrame will runs the params which is animate a function we created
function animate() {
    requestAnimationFrame(animate)//it is a js built-in function will runs whatever inside the params
    c.clearRect(0, 0, window.innerWidth, window.innerHeight) // to overcome overwrite after every update 
    
    for (let i = 0; i < circleArray.length; i++) {
        // for updating function circles every time
        circleArray[i].update();
        // circletArray [i] will update it to 1, 2, 3, 4, 5 ..... 100
    }
}

animate()
