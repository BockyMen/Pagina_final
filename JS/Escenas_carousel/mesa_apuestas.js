import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function crearEscena(divID, rutamodelo, x, y, z, cam_x, cam_y, cam_z ) {

    let plane, mixer;
    const clock = new THREE.Clock();

    const container = document.getElementById(divID);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(cam_x, cam_y, cam_z);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setAnimationLoop(animate);

    container.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0x404040, 2);
    scene.add(directionalLight);

    const loaderGLTF = new GLTFLoader();
    loaderGLTF.load(rutamodelo, (gltf) => {
        plane = gltf.scene;

        const box = new THREE.Box3().setFromObject(plane);
        const size = new THREE.Vector3();
        box.getSize(size);
        console.log(`Tamaño del modelo (${divID}):`, size); 

        plane.scale.set(x, y, z);
        plane.position.set(0, 1, 0);
        scene.add(plane);

        if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(plane);
            mixer.clipAction(gltf.animations[0]).play();
        }
    });

    function animate() {
        if (mixer) mixer.update(clock.getDelta());

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

crearEscena('maquina_lasvegas', './JS/Escenas_carousel/models/source/maquina_vegas/maquina_lasvegas.gltf', 3, 3, 3, 4.5, 1, 6);
crearEscena('messi', './JS/Escenas_carousel/models/source/messi/messi.gltf', 4, 4, 4, 0, 1.5, 6);
crearEscena('smartphone', './JS/Escenas_carousel/models/source/smartphone/smartphone.gltf', 10, 10, 10, 0, 1.5, 6);