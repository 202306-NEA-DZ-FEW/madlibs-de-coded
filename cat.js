const previewDiv = document.querySelector('.preview');
previewDiv.style.position = "relative";

const cat = document.createElement("img");
cat.src = "/cat.png";

cat.style.position = "absolute";

const initialLeft = 70; 
const initialTop = -5; 

cat.style.left = `${initialLeft}vw`; 
cat.style.top = `${initialTop}vh`; 
cat.style.transform = "translate(-50%, -50%)"; 
cat.style.zIndex = "-1"; 
cat.style.width = "25vw"; 
cat.style.height = "52vh"; 

previewDiv.appendChild(cat);

const leftEye  = document.createElement("img");
leftEye.src = "/eye1.png"
leftEye.style.position = "absolute";

const rightEye  = document.createElement("img");
rightEye.src = "/eye1.png"
rightEye.style.position = "absolute";


const initialEyesLeft = initialLeft -3.5; 
const initialEyesTop = initialTop - 2.5; 

leftEye.style.left = `${initialEyesLeft}vw`; 
leftEye.style.top = `${initialEyesTop}vh`; 

rightEye.style.left = `${initialEyesLeft + 4}vw`; 
rightEye.style.top = leftEye.style.top

const eyesWidth = 4; 
const eyesHeight = 5.4; 

leftEye.style.width = `${eyesWidth}vw`;
leftEye.style.height = `${eyesHeight}vh`;
rightEye.style.width = leftEye.style.width
rightEye.style.height = leftEye.style.height




leftEye.classList.add("eye")
rightEye.classList.add("eye")

previewDiv.appendChild(leftEye);
previewDiv.appendChild(rightEye);

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        cat.style.top = `${-20}vh`;
        leftEye.style.top = `${-20 - 3.5}vh`;
        rightEye.style.top = `${-20 - 2.5}vh`;
        
        setTimeout(() => {  
            cat.style.top = `${-5}vh`;
            leftEye.style.top = `${-5 - 3.5}vh`;
            rightEye.style.top = `${-5 - 2.5}vh`;
                }, 1000);
    }
});

function angle(cx, cy, ex, ey, minAngle, maxAngle) {
    const dy = ey - cy;
    const dx = ex - cx;
    let rad = Math.atan2(dy, dx);
    let deg = rad * 180 / Math.PI;

    // Apply angle limits
    if (minAngle !== undefined && deg < minAngle) {
        deg = minAngle;
        rad = deg * Math.PI / 180;
    }
    if (maxAngle !== undefined && deg > maxAngle) {
        deg = maxAngle;
        rad = deg * Math.PI / 180;
    }

    return deg;
}

document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const rect = cat.getBoundingClientRect();
    const catX = rect.left + rect.width / 2;
    const catY = rect.top + rect.height / 2;

    const minAngle = -15; // Adjust these values as needed
    const maxAngle = 30;  // to control the eye rotation range

    const angleDeg = angle(mouseX, mouseY, catX, catY, minAngle, maxAngle);
    const eyes = document.querySelectorAll('.eye');

    eyes.forEach(eye => {
        eye.style.transform = `rotate(${ angleDeg}deg)`;
    });
});




document.addEventListener("mouseover", () => {
    
        cat.style.top = `${-20}vh`;
        leftEye.style.top = `${-20 - 3.5}vh`;
        rightEye.style.top = `${-20 - 2.5}vh`;

        setTimeout(() => {  
            cat.style.top = `${-5}vh`;
            leftEye.style.top = `${-5 - 3.5}vh`;
            rightEye.style.top = `${-5 - 2.5}vh`;
                }, 1000);
    }
);