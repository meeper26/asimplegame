// Create the scene and set background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

// Set up the camera (higher and looking at the car)
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.set(0, 5, 5); // Positioned above the car (higher) and behind
camera.lookAt(0, 0, 0); // Camera looks at the car (0, 0, 0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple car shape (rectangular body with four wheels)
const carBodyGeometry = new THREE.BoxGeometry(2, 1, 0.5);
const carBodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);

// Create wheels (cylinders)
const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });

const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
frontLeftWheel.position.set(-0.8, -0.5, 0.25); // Front-left wheel

const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
frontRightWheel.position.set(0.8, -0.5, 0.25); // Front-right wheel

const backLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
backLeftWheel.position.set(-0.8, -0.5, -0.25); // Back-left wheel

const backRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
backRightWheel.position.set(0.8, -0.5, -0.25); // Back-right wheel

// Create a parent object (car) to hold the body and wheels
const car = new THREE.Group();
car.add(carBody);
car.add(frontLeftWheel);
car.add(frontRightWheel);
car.add(backLeftWheel);
car.add(backRightWheel);

// Add the car to the scene
scene.add(car);

// Variables for controlling the car's direction
let steeringAngle = 0; // Steering angle in radians
let leftPressed = false;
let rightPressed = false;

// Listen for keyboard input
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'a') {
    leftPressed = true;
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    rightPressed = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'a') {
    leftPressed = false;
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    rightPressed = false;
  }
});

// Update the car's steering based on the key inputs
function updateSteering() {
  // If both left and right are pressed, stop rotating
  if (leftPressed && rightPressed) {
    steeringAngle = 0; // No rotation
  }
  // If only left is pressed, turn left
  else if (leftPressed) {
    steeringAngle = Math.PI / 8; // Turn left (about 22.5 degrees)
  }
  // If only right is pressed, turn right
  else if (rightPressed) {
    steeringAngle = -Math.PI / 8; // Turn right (about -22.5 degrees)
  }
  // Otherwise, reset steering (no key is pressed)
  else {
    steeringAngle = 0;
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update the steering based on user input
  updateSteering();

  // Apply the steering to the car (rotate left/right)
  car.rotation.y = steeringAngle;

  // Render the scene
  renderer.render(scene, camera);
}

animate();
