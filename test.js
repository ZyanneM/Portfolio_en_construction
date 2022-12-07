
// import * as THREE from '/build/three.module.js';
// import {GLTFLoader} from './jsm/loaders/GLTFLoader.js';
// import {OrbitControls} from './jsm/controls/OrbitControls.js';
// import { FlakesTexture } from './jsm/textures/FlakesTexture.js';
// import { RGBELoader } from './jsm/loaders/RGBELoader.js';


// import with CDN
import * as THREE from 'three';
import {OrbitControls} from 'https://unpkg.com/three@0.146.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/RGBELoader.js';
import {FlakesTexture} from 'https://unpkg.com/three@0.146.0/examples/jsm/textures/FlakesTexture.js';

// init
// import * as THREE from './three.js-master/three.js-master/build/three.module.js';
// import {GLTFLoader} from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/GLTFLoader.js';

console.log(THREE);



// // CODE POUR AVOIR CUBE EN ROTATION


// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10 );
// camera.position.z = 1;

// const scene = new THREE.Scene();

// scene.background = null;

// const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
// const material = new THREE.MeshNormalMaterial();

// const cube = new THREE.Mesh( geometry, material );
// // cube.position.set(0.2,0.6,0.2);

// scene.add( cube );

// // Canvas
// const canvas = document.querySelector('canvas.webgl');

// const renderer = new THREE.WebGLRenderer( { 
// canvas : canvas,
// alpha: true,
// antialias: true });

// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animation );
// document.body.appendChild( renderer.domElement );



// // animation

// function animation( time ) {

// cube.rotation.x = time / 2000;
// cube.rotation.y = time / 1000;

// renderer.render( scene, camera );

// }

// ----------------------------------- CODE SPHERE ----------------------------------

let scene, camera, renderer, controls, pointlight;
let model_container = document.querySelector('.webgl');
const canvasSize = document.querySelector('.canvas-element');

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    canvas: model_container,
    alpha:true,
    antialias:true});
  renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
//   document.body.appendChild(renderer.domElement);

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.setSize( window.innerWidth, window.innerHeight );

  camera = new THREE.PerspectiveCamera(30,canvasSize.offsetWidth / canvasSize.offsetHeight,1,1000);
  camera.position.set(0,0,800);
  controls = new OrbitControls(camera, renderer.domElement);

  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;
  controls.enableDamping = true;
  controls.enableRotate = true;
  controls.enableZoom = false;

  pointlight = new THREE.PointLight(0xffffff,1);
  pointlight.position.set(200,200,200);
  scene.add(pointlight);

  let envmaploader = new THREE.PMREMGenerator(renderer);

  new RGBELoader().setPath('./textures/').load('shanghai_bund_4k.hdr', function(hdrmap) {

    let envmap = envmaploader.fromCubemap(hdrmap);
    let texture = new THREE.CanvasTexture(new FlakesTexture());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 6;


    // const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    // const starMaterial = new THREE.MeshBasicMaterial({
    //     map : THREE.ImageUtils.loadTexture('./texture/galaxy.png'),
    //     side: THREE.BackSide
    // });

    // const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    // scene.add(starMesh);
    // console.log(starMesh);

    const ballMaterial = {
      clearcoat: 1.0,
      clearcoatRoughness:0.3,
      metalness: 0.9,
      roughness:0.5,
      color: 0x8418ca,
      normalMap: texture,
      normalScale: new THREE.Vector2(0.15,0.15),
      envMap: envmap.texture
    };




    let ballGeo = new THREE.SphereGeometry(100,64,64);
    let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
    let ballMesh = new THREE.Mesh(ballGeo,ballMat);
    scene.add(ballMesh);

    animate();

  });
}

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();
