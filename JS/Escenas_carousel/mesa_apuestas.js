import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function crearEscena(divID, rutamodelo, x, y, z, cam_x, cam_y, cam_z, amb_l, direct_l) {
    let plane, mixer;
    const clock = new THREE.Clock();
    const container = document.getElementById(divID);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(cam_x, cam_y, cam_z);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, amb_l);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, direct_l);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const loaderGLTF = new GLTFLoader();
    loaderGLTF.load(rutamodelo, (gltf) => {
        plane = gltf.scene;

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

const modelos = {
    'maquina_lasvegas': { ruta: './JS/Escenas_carousel/models/source/maquina_vegas/maquina_lasvegas.gltf', x: 3, y: 3, z: 3, camX: 4.5, camY: 1, camZ: 6, amb_l: 2, direct_l: 2 },
    'messi': { ruta: './JS/Escenas_carousel/models/source/messi/messi.gltf', x: 4, y: 4, z: 4, camX: 3, camY: 1.1, camZ: 3.5, amb_l: 2, direct_l: 5 },
    'poker_jugando': { ruta: './JS/Escenas_carousel/models/source/poker_jugando/poker_jugando.gltf', x: 1, y: 1, z: 1, camX: 2, camY: 1.5, camZ: 3, amb_l: 2.8, direct_l: 10 },
    'smartphone': { ruta: './JS/Escenas_carousel/models/source/smartphone/smartphone.gltf', x: 22, y: 22, z: 22, camX: 3, camY: 2.8, camZ: 3.5, amb_l: 2.8, direct_l: 10 },
};

crearEscena('maquina_lasvegas', modelos['maquina_lasvegas'].ruta,
    modelos['maquina_lasvegas'].x,
    modelos['maquina_lasvegas'].y,
    modelos['maquina_lasvegas'].z,
    modelos['maquina_lasvegas'].camX,
    modelos['maquina_lasvegas'].camY,
    modelos['maquina_lasvegas'].camZ,
    modelos['maquina_lasvegas'].amb_l,
    modelos['maquina_lasvegas'].direct_l
);

const carouselEl = document.getElementById('carouselExampleIndicators');
carouselEl.addEventListener('slid.bs.carousel', function (event) {
    const slide = event.relatedTarget;
    const div = slide.querySelector('div');
    const divID = div.id;

    if (!div.dataset.sceneCreated && modelos[divID]) {
        crearEscena(divID, modelos[divID].ruta,
            modelos[divID].x,
            modelos[divID].y,
            modelos[divID].z,
            modelos[divID].camX,
            modelos[divID].camY,
            modelos[divID].camZ,
            modelos[divID].amb_l,
            modelos[divID].direct_l
        );
        div.dataset.sceneCreated = true;
    }
});
