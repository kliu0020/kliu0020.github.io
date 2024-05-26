// Three JS Template
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.needsUpdate = true;

document.body.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);
var scene = new THREE.Scene();
var cameraRange = 3;

var setcolor = 0x000000;
scene.background = new THREE.Color(setcolor);
scene.fog = new THREE.Fog(setcolor, 2.5, 3.5);

//-------------------------------------------------------------- SCENE
var sceneGroup = new THREE.Object3D();
var particularGroup = new THREE.Object3D();
var modularGroup = new THREE.Object3D();

function generateParticle(num, amp = 2) {
  var gmaterial = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
  var gparticular = new THREE.CircleGeometry(0.2, 5);

  for (var i = 1; i < num; i++) {
    var pscale = 0.001 + Math.abs(mathRandom(0.03));
    var particular = new THREE.Mesh(gparticular, gmaterial);
    particular.position.set(mathRandom(amp), mathRandom(amp), mathRandom(amp));
    particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
    particular.scale.set(pscale, pscale, pscale);
    particular.speedValue = mathRandom(1);

    particularGroup.add(particular);
  }
}
generateParticle(200, 2);

sceneGroup.add(particularGroup);
scene.add(modularGroup);
scene.add(sceneGroup);

function mathRandom(num = 1) {
  var setNumber = -Math.random() * num + Math.random() * num;
  return setNumber;
}

//------------------------------------------------------------- INIT
function init() {
  for (var i = 0; i < 30; i++) {
    var geometry = new THREE.IcosahedronGeometry(1);
    var material = new THREE.MeshStandardMaterial({shading: THREE.FlatShading, color: 0x111111, transparent: false, opacity: 1, wireframe: false});
    var cube = new THREE.Mesh(geometry, material);
    cube.speedRotation = Math.random() * 0.1;
    cube.positionX = mathRandom();
    cube.positionY = mathRandom();
    cube.positionZ = mathRandom();
    cube.castShadow = true;
    cube.receiveShadow = true;

    var newScaleValue = mathRandom(0.3);
    cube.scale.set(newScaleValue, newScaleValue, newScaleValue);

    cube.rotation.x = mathRandom(180 * Math.PI / 180);
    cube.rotation.y = mathRandom(180 * Math.PI / 180);
    cube.rotation.z = mathRandom(180 * Math.PI / 180);

    cube.position.set(cube.positionX, cube.positionY, cube.positionZ);
    modularGroup.add(cube);
  }
}

//------------------------------------------------------------- CAMERA
camera.position.set(0, 0, cameraRange);
var cameraValue = false;
function cameraSet() {
  if (!cameraValue) {
    TweenMax.to(camera.position, 1, {z: cameraRange, ease: Power4.easeInOut});
    cameraValue = true;
  } else {
    TweenMax.to(camera.position, 1, {z: cameraRange, x: 0, y: 0, ease: Power4.easeInOut});
    INTERSECTED = null;
    cameraValue = false;
  }
}

//------------------------------------------------------------- SCENE
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
// scene.add(ambientLight);

var light = new THREE.SpotLight(0xFFFFFF, 3);
light.position.set(5, 5, 2);
light.castShadow = true;
light.shadow.mapSize.width = 10000;
light.shadow.mapSize.height = light.shadow.mapSize.width;
light.penumbra = 0.5;

var lightBack = new THREE.PointLight(0x0FFFFF, 1);
lightBack.position.set(0, -3, -1);

scene.add(sceneGroup);
scene.add(light);
scene.add(lightBack);

var rectSize = 2;
var intensity = 100;
var rectLight = new THREE.RectAreaLight(0x0FFFFF, intensity, rectSize, rectSize);
rectLight.position.set(0, 0, 1);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
// scene.add(rectLightHelper);

//------------------------------------------------------------- RAYCASTER
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
function onMouseDown(event) {
  event.preventDefault();
  onMouseMove(event);
  raycaster.setFromCamera(mouse, camera);
  var intersected = raycaster.intersectObjects(modularGroup.children);
  if (intersected.length > 0) {
    cameraValue = false;
    if (INTERSECTED != intersected[0].object) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

      INTERSECTED = intersected[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xFFFF00);

      TweenMax.to(camera.position, 1, {
        x: INTERSECTED.position.x,
        y: INTERSECTED.position.y,
        z: INTERSECTED.position.z + 3,
        ease: Power2.easeInOut
      });
    } else {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = null;
    }
  }
  console.log(intersected.length);
}
function onMouseUp(event) {
}

window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('mousemove', onMouseMove, false);

//------------------------------------------------------------- RENDER
var uSpeed = 0.1;
function animate() {
  var time = performance.now() * 0.0003;
  requestAnimationFrame(animate);
  //---
  for (var i = 0, l = particularGroup.children.length; i < l; i++) {
    var newObject = particularGroup.children[i];
    newObject.rotation.x += newObject.speedValue / 10;
    newObject.rotation.y += newObject.speedValue / 10;
    newObject.rotation.z += newObject.speedValue / 10;
  }

  for (var i = 0, l = modularGroup.children.length; i < l; i++) {
    var newCubes = modularGroup.children[i];
    newCubes.rotation.x += 0.008;
    newCubes.rotation.y += 0.005;
    newCubes.rotation.z += 0.003;
    newCubes.position.x = Math.sin
