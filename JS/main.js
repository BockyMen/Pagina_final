import * as THREE from 'three';

const scene = new THREE.Scene();
const contenedor = document.getElementById('three-1')
const camera = new THREE.PerspectiveCamera( 75, contenedor.clientWidth / contenedor.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer(`three`);
renderer.setSize( contenedor.clientWidth, contenedor.clientHeight );
renderer.setAnimationLoop( animate );
contenedor.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xBD2000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.set(-0.5,0,0)

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xBD2000 } );
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );
cube2.position.set(0.5,0,0)
cube2.rotation.set(0,0,0.5)

camera.position.z = 3;

function animate() {


  renderer.render( scene, camera );

}