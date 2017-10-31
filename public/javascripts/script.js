var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.z = 40;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(5, 64, 64);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load('../images/Earth4k.jpg');
material.bumpMap = new THREE.TextureLoader().load('../images/Bump4k.jpg');
material.bumpScale = 0.005;
material.specularMap = new THREE.TextureLoader().load('../images/Water4k.png');
material.specular = new THREE.Color('grey');
var earthMesh = new THREE.Mesh( geometry, material);
scene.add(earthMesh);

var cloudGeometry = new THREE.SphereGeometry(5.05, 64, 64);
var cloudMaterial = new THREE.MeshPhongMaterial();
cloudMaterial.map = new THREE.TextureLoader().load('../images/Clouds4k.png');
cloudMaterial.transparent = true;
var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

var moonGeometry = new THREE.SphereGeometry(1, 64, 64);
var moonMaterial = new THREE.MeshPhongMaterial();
moonMaterial.map = new THREE.TextureLoader().load('../images/moon4k.jpg');
var moonMesh = new THREE.Mesh( moonGeometry, moonMaterial);
moonMesh.position.set(13, 0, 0);
scene.add(moonMesh);
var r = 13;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;
var marsGeometry = new THREE.SphereGeometry(2.5, 64, 64);
var marsMaterial = new THREE.MeshPhongMaterial();
marsMaterial.map = new THREE.TextureLoader().load('../images/mars4k.jpg');
var marsMesh = new THREE.Mesh( marsGeometry, marsMaterial);
marsMesh.position.set(-23, 10, -5);
scene.add(marsMesh);

var light = new THREE.AmbientLight(0x333333);
scene.add(light);
var dirlight = new THREE.DirectionalLight(0xffffff, 0.6);
dirlight.position.set(-3,1,5);
scene.add(dirlight);

var imagePrefix = "../images/";
var urls = [ 'space.png', 'space.png', 'space.png', 'space.png', 'space.png', 'space.png' ];
var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

var loader = new THREE.FontLoader();
loader.load( '../fonts/PTSans_Regular.json', function (font) {
    var textGeo = new THREE.TextGeometry( 'Inner space is so much more interesting...', {
        font: font,
        size: 6,
        height: 1,
        curveSegments: 64,
        bevelEnabled: false
    });
    // textGeo.computeBoundingBox();
    var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 'grey' } );
    var textMesh = new THREE.Mesh(textGeo, textMaterial);
    textMesh.position.set(-80, 30, -50);
    textMesh.castShadow = false;
    textMesh.recieveShadow = true;
    scene.add(textMesh);
});

var render = function() {
    requestAnimationFrame(render);
    earthMesh.rotation.y += 0.005;
    cloudMesh.rotation.x += 0.003;
    cloudMesh.rotation.y += 0.004;
    theta += dTheta;
    moonMesh.position.x = r * Math.cos(theta);
    moonMesh.position.z = r * Math.sin(theta);
    moonMesh.rotation.y += 0.007;
    marsMesh.rotation.y += 0.003;
    renderer.render(scene, camera)
};

render();


// var skyGeometry = new THREE.SphereGeometry(100, 32, 32);
// var skyMaterial = new THREE.MeshPhongMaterial();
// skyMaterial.map = new THREE.TextureLoader().load('../images/starfield.jpg');
// skyMaterial.side = THREE.DoubleSide;
// skyMaterial.map.wrapS = THREE.RepeatWrapping;
// skyMaterial.map.wrapT = THREE.RepeatWrapping;
// skyMaterial.map.repeat.set(3, 2);
// var skyMesh = new THREE.Mesh( skyGeometry, skyMaterial);
// scene.add(skyMesh);