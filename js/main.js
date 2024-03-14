import * as THREE from './../node_modules/three/build/three.module.js';

//scene
const scene = new THREE.Scene();
const backgroundScene = new THREE.TextureLoader().load('images/space.jpg');
scene.background = backgroundScene;

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
document.body.appendChild(renderer.domElement);

//lighting
const lighting = new THREE.AmbientLight(0xffffff);
scene.add(lighting);



//cube
const TextureCube = new THREE.TextureLoader().load('images/cube.jpg');
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ map: TextureCube}));
cube.position.z = -2;
cube.rotation.x = 10;
cube.rotation.y = 10;
scene.add(cube);


//earth
const earthTexture = new THREE.TextureLoader().load('images/earth.jpg');
const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), new THREE.MeshBasicMaterial({ map: earthTexture}));
earth.position.z = -5;
scene.add(earth);

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.003;
	earth.rotation.x += 0.002;
	earth.rotation.z += 0.002;
    renderer.render(scene, camera);
}

animate();

document.body.onscroll = animateScroll;
function animateScroll() {
    const t = document.body.getBoundingClientRect().top;

    if(cube.rotation.y > 0 && cube.rotation.x > 0) {
        cube.rotation.y -= 0.01;
        cube.rotation.x -= 0.01;
    }

    if(camera.position.z < -1.4) {
        cube.rotation.y = 0;
        cube.rotation.x = 0;
        if( earth.position.x > -0.8) {
            earth.position.x -= 0.02;
        }
    } else {
        earth.position.x = 0;
    }

    camera.position.z = t * 0.001;
}
