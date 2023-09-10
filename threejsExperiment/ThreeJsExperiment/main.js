import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);


const geometry = new THREE.TorusKnotGeometry(1, 0.1, 64, 8, 2, 3)
const material = new THREE.MeshStandardMaterial({ color: 0x51655b });

const torusKnot = new THREE.Mesh(
  geometry,
  material
);

torusKnot.position.set(5, 3, 4);

scene.add(torusKnot);

const pointLight = new THREE.PointLight(0xffffff, 1000);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

pointLight.position.set(5, -10, 5);

const floodLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, floodLight);

const controls = new OrbitControls(camera, renderer.domElement);

const marsTexture = new THREE.TextureLoader().load('img/2k_mars.jpg');
const marsNormal = new THREE.TextureLoader().load('img/marsNormal.png');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ 
    map: marsTexture,
    normalMap: marsNormal
  })
);

mars.position.set(-16,-10,13)

scene.add(mars);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function moveCamera(){
  const t = document.body.getBoundingClientRect().top

  mars.rotation.x += 0.0005;
  mars.rotation.y += 0.0075;
  mars.rotation.z += 0.0005;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;

//TODO
const skyTexture = new THREE.TextureLoader().load('img/SpaceBG.png');
scene.background = skyTexture;

function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

Array(300).fill().forEach(addStar);

animate();