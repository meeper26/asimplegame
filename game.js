// Initialize scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple cube (green)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Load skybox textures
const loader = new THREE.CubeTextureLoader();
scene.background = loader.load([
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/skybox/px.jpg',  // Positive X
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/skybox/nx.jpg',  // Negative X
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/skybox/py.jpg',  // Positive Y
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/skybox/ny.jpg',  // Negative Y
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/skybox/pz.jpg',  // Positive Z
  'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/skybox/nz.jpg'   // Negative Z
]);

// Set up controls (using simple keyboard input to rotate the cube)
let rotationSpeed = 0.01; // Speed of cube rotation

function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += rotationSpeed;
  cube.rotation.y += rotationSpeed;

  // Render the scene
  renderer.render(scene, camera);
}

// Adjust camera position and start animation
camera.position.z = 5;
animate();
