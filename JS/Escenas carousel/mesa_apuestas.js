import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

function crearEscena(divID, rutamodelo, x, y, z) {
    const container = document.getElementById(divID);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75,container.clientWidth / container.clientHeight,0.1,1000);
    camera.position.set(0, 1.5, 3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0x404040, 2);
    scene.add(directionalLight);

    const loaderFBX = new FBXLoader();
    loaderFBX.load(rutamodelo, function (object) {
        object.scale.set(x, y, z);
        object.position.set(0, 1, 0);
        scene.add(object);
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

crearEscena(
    'maquina_lasvegas','../../Archivos/models/source/maquina_lasvegas.fbx',0.02,0.02,0.02
);
