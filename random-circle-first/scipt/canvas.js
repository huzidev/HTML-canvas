// first we've to specify the element we wanted to GRAB with query selector
let canvas = document.querySelector("canvas");


// styling with javascript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight


// creating context, c in canvas is for context
// context is used to refer the object in which function is going to be execute therefore we'll target (canvas.getContext) 
let c = canvas.getContext("2d") // because it is going to be appear as 2d



for (let i = 0; i < 5; i++){
    let radius = Math.random() * 30
    let x = (Math.random() * window.innerWidth);
    let y = (Math.random() * window.innerHeight);
    // by default math.random() will just print random number bw 0-1 but when we multiply math.random with any number suppose 10
    // now the limit will be from 0 to 10 since it'll give us float value we can use Math.floor(math.random() * 10)
    // arc / circle
    // value of pi for sphere is 180 hence pi * 2 = 360 which is complete circle
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);// (x-axis, y-axis, radius, startingAngle(0), ending angle (pi*2) for 360, drawClockWise must be false)
    c.strokeStyle = "blue";
    c.stroke();
}
