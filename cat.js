

// Get a reference to the preview div element and set its position to relative.
const previewDiv = document.querySelector('.preview');
previewDiv.style.position = "relative";

// Create an image element for the cat and set its properties.
const cat = document.createElement("img");
cat.src = "src/cat.png";
cat.classList.add("cat");
cat.style.position = "absolute";

// Define initial position for the cat.
const initialLeft = 70; 
const initialTop = -5; 

// Set initial position, size, and z-index for the cat.
cat.style.left = `${initialLeft}vw`;
cat.style.top = `${initialTop}vh`;
cat.style.transform = "translate(-50%, -50%)";
cat.style.width = "25vw";
cat.style.height = "52vh";

// Append the cat image element to the preview div.
previewDiv.appendChild(cat);

// Create image elements for the cat's eyes and set their properties.
const leftEye = document.createElement("img");
leftEye.src = "src/eye1.png";
leftEye.style.position = "absolute";

const rightEye = document.createElement("img");
rightEye.src = "src/eye1.png";
rightEye.style.position = "absolute";

// Define initial position and size for the eyes.
const initialEyesLeft = initialLeft - 3.0; 
const initialEyesTop = initialTop - 2.5; 

leftEye.style.left = `${initialEyesLeft}vw`;
leftEye.style.top = `${initialEyesTop}vh`;

rightEye.style.left = `${initialEyesLeft + 4}vw`;
rightEye.style.top = `${initialEyesTop}vh`;

const eyesWidth = 3.5; 
const eyesHeight = 6; 

leftEye.style.width = `${eyesWidth}vw`;
leftEye.style.height = `${eyesHeight}vh`;
rightEye.style.width = leftEye.style.width;
rightEye.style.height = leftEye.style.height;

// Add CSS class to the eyes for styling.
leftEye.classList.add("eye");
rightEye.classList.add("eye");

// Append the eye image elements to the preview div.
previewDiv.appendChild(leftEye);
previewDiv.appendChild(rightEye);

madLibsPreview.style.zIndex = 3
cat.style.zIndex = 2
leftEye.style.zIndex = 3
rightEye.style.zIndex = 3


// Add event listener for Enter key press to animate the cat's position and eyes.
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

/**
 * Calculates the angle between two points and applies angle limits.
 * @param {number} cx - X-coordinate of the center point.
 * @param {number} cy - Y-coordinate of the center point.
 * @param {number} ex - X-coordinate of the external point.
 * @param {number} ey - Y-coordinate of the external point.
 * @param {number} minAngle - Minimum allowed angle.
 * @param {number} maxAngle - Maximum allowed angle.
 * @returns {number} The calculated angle in degrees.
 */
function angle(cx, cy, ex, ey, minAngle, maxAngle) {
    // Angle calculation based on points' coordinates.
    const dy = ey - cy;
    const dx = ex - cx;
    let rad = Math.atan2(dy, dx);
    let deg = rad * 180 / Math.PI;

    // Apply angle limits if provided.
    if (minAngle !== undefined && deg < minAngle) {
        deg = minAngle;
    }
    if (maxAngle !== undefined && deg > maxAngle) {
        deg = maxAngle;
    }

    return deg;
}

// Add event listener for mouse movement to rotate the cat's eyes.
document.addEventListener("mousemove", (event) => {
    // Calculate mouse and cat's positions and angles.
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const rect = cat.getBoundingClientRect();
    const catX = rect.left + rect.width / 2;
    const catY = rect.top + rect.height / 2;

    // Set angle limits for eye rotation.
    const minAngle = -15; // Adjust these values as needed.
    const maxAngle = 30;  // to control the eye rotation range

    // Calculate eye rotation angle.
    const angleDeg = angle(mouseX, mouseY, catX, catY, minAngle, maxAngle);

    // Get all eye elements.
    const eyes = document.querySelectorAll('.eye');

    // Apply the calculated angle to the eye rotation.
    eyes.forEach(eye => {
        eye.style.transform = `rotate(${angleDeg}deg)`;
    });
});


// Add event listener for mouseover to animate the cat's position and eyes.
cat.addEventListener("mouseover", () => {
    cat.style.top = `${-20}vh`;
    leftEye.style.top = `${-20 - 3.5}vh`;
    rightEye.style.top = `${-20 - 2.5}vh`;

    setTimeout(() => {  
        cat.style.top = `${-5}vh`;
        leftEye.style.top = `${-5 - 3.5}vh`;
        rightEye.style.top = `${-5 - 2.5}vh`;
    }, 1000);
});
