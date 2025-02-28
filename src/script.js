import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'


// Scene
const scene = new THREE.Scene()
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

//Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog



/**
 * Textures 
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksHeightTexture = textureLoader.load('/textures/bricks/height.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')


const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassHeightTexture = textureLoader.load("/textures/grass/height.jpg");
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping

grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping

grassNormalTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping

grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping





//Group
const house = new THREE.Group()
scene.add(house)

//Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  // new THREE.MeshStandardMaterial({ map: textureLoader.load('textures/wood.jpg') })
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    displacementMap: bricksHeightTexture,
    // displacementScale: 0.1,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 1.25;
house.add(walls);

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI / 4
house.add(roof)

//Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
  })
);
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.z = 2 + 0.01
door.position.y = 1
house.add(door)


//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#3e8e41' })
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.5, 0.5, 0.5);
bush2.position.set(1.4, 0.1, 2.1);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.25, 0.25, 0.25);
bush3.position.set(-1, 0.1, 2.2);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.4, 0.4, 0.4);
bush4.position.set(-1.5, 0.1, 2.2);
house.add(bush1, bush2, bush3, bush4);


// // Graves
// const graves = new THREE.Group();
// scene.add(graves);

// const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
// const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

// for (let i = 0; i < 50; i++) {
//     const angle = Math.random() * Math.PI * 2;
//     const radius = 3 + Math.random() * 6; // Spread out graves between 3 and 9 units
//     const x = Math.sin(angle) * radius;
//     const z = Math.cos(angle) * radius;

//     const grave = new THREE.Mesh(graveGeometry, graveMaterial);
//     grave.position.set(x, 0.3, z);
//     grave.castShadow = true;
//     grave.rotation.y = (Math.random() - 0.5) * 0.4; // Slight random rotation
//     grave.rotation.z = (Math.random() - 0.5) * 0.2; // Small tilt

//     graves.add(grave);
//     console.log(grave);
// }

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);

// Function to create a texture with "RIP" on the top face
function createRIPTexture() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;

    // Background (same as the grave)
    context.fillStyle = '#b2b6b1';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // RIP Text (red)
    context.fillStyle = '#ff0000'; // Red color
    context.font = 'Bold 32px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('RIP', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

const ripTexture = createRIPTexture();
const ripMaterial = new THREE.MeshStandardMaterial({ map: ripTexture });
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

// Array of materials (apply texture to the top face)
const materials = [
    graveMaterial, // Right
    graveMaterial, // Left
    graveMaterial, // Front
    graveMaterial, // Back
    ripMaterial,   // Top (RIP texture applied here)
    graveMaterial  // Bottom
];

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6; // Spread out graves between 3 and 9 units
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, materials);
    grave.position.set(x, 0.3, z);
    grave.castShadow = true;
    grave.rotation.y = (Math.random() - 0.5) * 0.4; // Slight random rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.2; // Small tilt

    graves.add(grave);
}



/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        displacementMap: grassHeightTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
     })
)
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)


//Ghosts
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost3);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('262837')

//Shadows

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
floor.receiveShadow = true
walls.receiveShadow = true
roof.receiveShadow = true
door.receiveShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true
graves.castShadow = true
walls.castShadow = true
floor.castShadow = true
roof.castShadow = true
door.castShadow = true


doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;


/**
 * Animate
 */

const clock = new THREE.Clock()
const options = {
  cameraAnimation: false, // Toggle for camera animation
};
gui.add(options, "cameraAnimation").name("Enable Camera Animation");

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime();

  //Update Ghost
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(ghost1Angle * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(ghost2Angle * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y =
    Math.sin(ghost3Angle * 4) + (7 + Math.sin(elapsedTime * 2.5));
    if (options.cameraAnimation) {
      // Camera animation (Circular path around the house)
      camera.position.x = Math.cos(elapsedTime * 0.2) * 6;
      camera.position.z = Math.sin(elapsedTime * 0.2) * 6;
      camera.lookAt(house.position); // Make the camera always look at the house
    }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick()