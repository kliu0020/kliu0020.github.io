// 1. Renderer setup
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.needsUpdate = true;

// Append to body
document.body.appendChild(renderer.domElement);

// Handle resizing
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 2. Camera & Scene
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);
var scene = new THREE.Scene();
var cameraRange = 3;

var setcolor = 0x000000;
scene.background = new THREE.Color(setcolor);
scene.fog = new THREE.Fog(setcolor, 2.5, 3.5);

// 3. Object Groups
var sceneGroup = new THREE.Object3D();
var particularGroup = new THREE.Object3D();
var modularGroup = new THREE.Object3D();

// Generate particles
function generateParticle(num, amp = 2) {
  var gmaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff, side: THREE.DoubleSide });
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
generateParticle(500, 2);

sceneGroup.add(particularGroup);
scene.add(modularGroup);
scene.add(sceneGroup);

// Utility to randomize positions
function mathRandom(num = 1) {
  return -Math.random() * num + Math.random() * num;
}

var noCubes = 75;
// Init function: create n cubes
const pastelPalette = [
  0xEFEEEE, // Light Gray
  0xE9CCB1, // Light Brown
  0xD3C4BE, // Pale Pink
  0xE4DAC2, // Light Beige
  0xF4EEE1, // Off White
  0xC4BDAC, // Taupe
  0xEBCFC4, // Peach
  0xE8E6D9, // Light Taupe
  0x999999, // Gray
  0xF3ECE7  // Very Light Pink
];

function init() {
  for (var i = 0; i < noCubes; i++) {
    var geometry = new THREE.IcosahedronGeometry(1);
    var material = new THREE.MeshStandardMaterial({
      shading: THREE.FlatShading,
      color: pastelPalette[i % pastelPalette.length], // Use colors in sequence
      transparent: false,
      opacity: 1,
      wireframe: false
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.speedRotation = Math.random() * 0.1;
    cube.positionX = mathRandom(5);
    cube.positionY = mathRandom(5);
    cube.positionZ = mathRandom(5);
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

// Camera positioning
camera.position.set(0, 0, cameraRange);
var cameraValue = false;
function cameraSet() {
  if (!cameraValue) {
    // If you’re using TweenMax/GSAP, ensure you have GSAP included in index.html
    TweenMax.to(camera.position, 1, { z: cameraRange, ease: Power4.easeInOut });
    cameraValue = true;
  } else {
    TweenMax.to(camera.position, 1, { z: cameraRange, x: 0, y: 0, ease: Power4.easeInOut });
    INTERSECTED = null;
    cameraValue = false;
  }
}

// Lights
var ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(ambientLight);

var light = new THREE.SpotLight(0xffffff, 1.5);
light.position.set(5, 5, 2);
light.castShadow = true;
light.shadow.mapSize.width = 10000;
light.shadow.mapSize.height = light.shadow.mapSize.width;
light.penumbra = 0.05;

var lightBack = new THREE.PointLight(0x0fffff, 0.5);
lightBack.position.set(0, -3, -1);

scene.add(sceneGroup);
scene.add(light);
scene.add(lightBack);

var rectSize = mathRandom(3);
var intensity = 0.001; // light intensity change 
var rectLight = new THREE.RectAreaLight(0x0fffff, intensity, rectSize, rectSize);
rectLight.position.set(0, 0, 1);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

var rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
// scene.add(rectLightHelper);

// Raycaster for interactions
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
  INTERSECTED;

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
      INTERSECTED.material.emissive.setHex(0xffff00);

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
  event.preventDefault();
  // Add any logic if needed
}

// Event listeners
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('mousemove', onMouseMove, false);

// Render loop
var mouseSpeed = 0.5 // User's mouse speed 
var uSpeed = 0.2 // Rotation speed

var xAxisRotation = mathRandom(0.05);
var yAxisRotation = mathRandom(0.05);
var zAxisRotation = mathRandom(0.05);

function animate() {
  var time = performance.now() * 0.0001;
  requestAnimationFrame(animate);

  // Rotate / animate particles
  for (var i = 0, l = particularGroup.children.length; i < l; i++) {
    var newObject = particularGroup.children[i];
    newObject.rotation.x += newObject.speedValue / 1000;
    newObject.rotation.y += newObject.speedValue / 1000;
    newObject.rotation.z += newObject.speedValue / 1000;
  }

  // Animate cubes
  for (var i = 0, l = modularGroup.children.length; i < l; i++) {
    var newCubes = modularGroup.children[i];
    newCubes.rotation.x += xAxisRotation; 
    newCubes.rotation.y += yAxisRotation;
    newCubes.rotation.z += zAxisRotation;
    newCubes.position.x = Math.sin(time * newCubes.positionZ) * newCubes.positionY;
    newCubes.position.y = Math.cos(time * newCubes.positionX) * newCubes.positionZ;
    newCubes.position.z = Math.sin(time * newCubes.positionY) * newCubes.positionX;
  }

  particularGroup.rotation.y += 0.005;

  // Subtle rotation based on mouse
  modularGroup.rotation.y -= ((mouse.x * mouseSpeed) + modularGroup.rotation.y) * uSpeed;
  modularGroup.rotation.x -= ((-mouse.y * mouseSpeed) + modularGroup.rotation.x) * uSpeed;

  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

// Initialize + start rendering
init();
animate();

//
// === FETCH LOGIC & TABLE RENDERING ===
//

// Called by the buttons in index.html
window.fetchData = function (type) {
  let url = '';
  if (type === 'sports') {
    url = 'http://127.0.0.1:5000/fetch_sports';
  } else if (type === 'racing') {
    url = 'http://127.0.0.1:5000/fetch_racing';
  } else if (type === 'jumpouts') {
    url = 'http://127.0.0.1:5000/fetch_jumpouts';
  }

  // Clear old table & indicate loading
  document.getElementById('table-container').innerHTML = '';
  document.getElementById('json-output').textContent = 'Loading...';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Filter for today's date, e.g. "YYYY-MM-DD"
      const today = new Date().toISOString().slice(0, 10);
      const todaysResults = data.filter((item) => item.date === today);

      // Render the table with only today's results
      renderTable(todaysResults);

      // Show raw JSON as fallback/debug
      const formattedData = JSON.stringify(todaysResults, null, 4);
      document.getElementById('json-output').textContent = formattedData;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      document.getElementById('json-output').textContent = 'Error fetching data. Please try again.';
    });
};

// Utility function to build the table
function renderTable(data) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';

  if (!data || data.length === 0) {
    tableContainer.innerHTML = '<p>No results found for today.</p>';
    return;
  }

  // Create table
  const table = document.createElement('table');
  // For Bootstrap styling:
  table.className = 'table table-bordered';

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Customize columns to match your JSON structure
  const columns = ['date', 'event', 'tip', 'odds'];

  // Header row
  const headerRow = document.createElement('tr');
  columns.forEach((col) => {
    const th = document.createElement('th');
    th.textContent = col.toUpperCase();
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Rows
  data.forEach((item) => {
    const row = document.createElement('tr');
    columns.forEach((col) => {
      const td = document.createElement('td');
      td.textContent = item[col] ?? '';
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}
