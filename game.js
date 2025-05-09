const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Skybox
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  'https://threejs.org/examples/textures/cube/skybox/px.jpg',
  'https://threejs.org/examples/textures/cube/skybox/nx.jpg',
  'https://threejs.org/examples/textures/cube/skybox/py.jpg',
  'https://threejs.org/examples/textures/cube/skybox/ny.jpg',
  'https://threejs.org/examples/textures/cube/skybox/pz.jpg',
  'https://threejs.org/examples/textures/cube/skybox/nz.jpg',
]);
scene.background = texture;

// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
