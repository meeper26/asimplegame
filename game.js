// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple car (a box for now)
const carGeometry = new THREE.BoxGeometry(2, 1, 4);
const carMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);

// Create a flat plane as terrain
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - Math.PI / 2;  // Rotate plane to be flat
plane.position.y = -1;
scene.add(plane);

// Set the camera behind the car
camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(car.position);

// Car movement variables
let carSpeed = 0;
let carTurn = 0;

// Listen for keypresses to control the car
document.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'ArrowUp') carSpeed = 0.1;
  if (event.key === 's' || event.key === 'ArrowDown') carSpeed = -0.1;
  if (event.key === 'a' || event.key === 'ArrowLeft') carTurn = 0.05;
  if (event.key === 'd' || event.key === 'ArrowRight') carTurn = -0.05;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'w' || event.key === 's' || event.key === 'ArrowUp' || event.key === 'ArrowDown') carSpeed = 0;
  if (event.key === 'a' || event.key === 'd' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') carTurn = 0;
});

// Game loop
function animate() {
  requestAnimationFrame(animate);

  // Move the car
  car.position.x += carSpeed * Math.sin(car.rotation.y);
  car.position.z -= carSpeed * Math.cos(car.rotation.y);

  // Turn the car
  car.rotation.y += carTurn;

  // Update camera position
  camera.position.x = car.position.x + 10 * Math.sin(car.rotation.y);
  camera.position.z = car.position.z - 10 * Math.cos(car.rotation.y);
  camera.lookAt(car.position);

  renderer.render(scene, camera);
}

// Resize handler
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

animate();
