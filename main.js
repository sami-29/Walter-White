import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#app"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(1);
camera.position.setX(0);
camera.position.setY(0);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

//Initialize model

let WW;

const loader = new GLTFLoader();

loader.load(
  "/scene.gltf",
  function (gltf) {
    scene.add(gltf.scene);
    WW = gltf.scene;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

let forwards = true;

function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  if (WW.position.z < 0.3 && forwards === true) {
    WW.rotation.y += 0.001;
    WW.position.z += 0.001;
  }
  if (WW.position.z > 0.3 || !forwards) {
    forwards = false;
    WW.rotation.y -= 0.001;
    WW.position.z -= 0.001;
  }
  if (WW.position.z <= 0) {
    forwards = true;
  }

  renderer.render(scene, camera);
}

animate();
