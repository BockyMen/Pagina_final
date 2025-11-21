import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const contenedor = document.getElementById('three-1')
const camera = new THREE.PerspectiveCamera( 75, contenedor.clientWidth / contenedor.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer(`three`);
renderer.setSize( contenedor.clientWidth, contenedor.clientHeight );
renderer.setAnimationLoop( animate );
contenedor.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xBD2000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.set(-0.5,0,0)

const cube2 = new THREE.Mesh( geometry, material );
scene.add( cube2 );
cube2.position.set(0.5,0,0)
cube2.rotation.set(0,0,0.5)

const geometry3 = new THREE.SphereGeometry( 0.1, 16, 16 );
const material3 = new THREE.MeshBasicMaterial( { color: 0xfffffff } );
const sphere1 = new THREE.Mesh( geometry3, material3 );
scene.add( sphere1 );
sphere1.position.set(-0.5,0,0.5)

const sphere2 = new THREE.Mesh( geometry3, material3 );
scene.add( sphere2 );
sphere2.position.set(0.6,0.3,0.5)

const sphere3 = new THREE.Mesh( geometry3, material3 );
scene.add( sphere3 )
sphere3.position.set(0.81,-0.1,0.5)

const sphere4 = new THREE.Mesh( geometry3, material3 );
scene.add( sphere4 )
sphere4.position.set(0.4,-0.3,0.5)

const sphere5 = new THREE.Mesh( geometry3, material3 );
scene.add( sphere5 )
sphere5.position.set(0.2,0.1,0.5)

const sphere6 = new THREE.Mesh( geometry3, material3 );
scene.add( sphere6 );
sphere6.position.set(-0.8,0.3,0.5)

const sphere7 = new THREE.Mesh( geometry3, material3 );
scene.add( sphere7 );
sphere7.position.set(-0.2,-0.3,0.5)

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);
var isHover = false;

function onMouseMove(event){
    event.preventDefault();

    mouse.x=(event.clientX / window.innerWidth) * 2 - 1;
    mouse.y= - (event.clientY / window.innerHeight) * 2 + 1;

}

window.addEventListener("mousemove", onMouseMove, false);

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    cube.position.y=scrollPosition
});

camera.position.z = 2;

function animate() {

    raycaster.setFromCamera(mouse, camera);
    const intersection = raycaster.intersectObjects(scene.children, true);

    if(intersection.length > 0){
        isHover = true;
    }if(intersection.length > 0){
        const obj = intersection[0].object;
        if(obj === cube || obj === cube2){
            obj.material.color.set( Math.random() * 0xffffff );
        }
        else{
            isHover = false;
        }
    }
    renderer.render( scene, camera );
}