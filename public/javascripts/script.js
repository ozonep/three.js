var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300);
camera.position.z = 100;
camera.position.y = 50;


var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var sunGeometry = new THREE.SphereGeometry(30, 64, 64);
var sunMaterial = new THREE.MeshPhongMaterial();
sunMaterial.map = new THREE.TextureLoader().load('../images/sun.jpg');
var sunMesh = new THREE.Mesh( sunGeometry, sunMaterial);
// sunMesh.position.set(30, 10, -5);
scene.add(sunMesh);

var geometry = new THREE.SphereGeometry(5, 64, 64);
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load('../images/Earth4k.jpg');
material.bumpMap = new THREE.TextureLoader().load('../images/Bump4k.jpg');
material.bumpScale = 0.005;
material.specularMap = new THREE.TextureLoader().load('../images/Water4k.png');
material.specular = new THREE.Color('grey');
var earthMesh = new THREE.Mesh( geometry, material);
var earth_r = 90;
var earth_theta = 0;
var earth_dTheta = 2 * Math.PI / 500;
earthMesh.position.set(earth_r, 0, 0);

var cloudGeometry = new THREE.SphereGeometry(5.05, 64, 64);
var cloudMaterial = new THREE.MeshPhongMaterial();
cloudMaterial.map = new THREE.TextureLoader().load('../images/Clouds4k.png');
cloudMaterial.transparent = true;
var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
var cloud_r = 90;
var cloud_theta = 0;
var cloud_dTheta = 2 * Math.PI / 500;
cloudMesh.position.set(cloud_r, 0, 0);

var marsGeometry = new THREE.SphereGeometry(2.5, 64, 64);
var marsMaterial = new THREE.MeshPhongMaterial();
marsMaterial.map = new THREE.TextureLoader().load('../images/mars4k.jpg');
var marsMesh = new THREE.Mesh( marsGeometry, marsMaterial);
var mars_r = 120;
var mars_theta = 0;
var mars_dTheta = 2 * Math.PI / 700;
marsMesh.position.set(mars_r, 0, 0);

var venusGeometry = new THREE.SphereGeometry(5, 64, 64);
var venusMaterial = new THREE.MeshPhongMaterial();
venusMaterial.map = new THREE.TextureLoader().load('../images/venus.jpg');
var venusMesh = new THREE.Mesh( venusGeometry, venusMaterial);
var venus_r = 60;
var venus_theta = 0;
var venus_dTheta = 2 * Math.PI / 300;
venusMesh.position.set(venus_r, 0, 0);

var moonGeometry = new THREE.SphereGeometry(1, 64, 64);
var moonMaterial = new THREE.MeshPhongMaterial();
moonMaterial.map = new THREE.TextureLoader().load('../images/moon4k.jpg');
var moonMesh = new THREE.Mesh( moonGeometry, moonMaterial);
var r = 10;
var theta = 0;
var dTheta = 2 * Math.PI / 100;
moonMesh.position.set(r, 0, 0);

sunMesh.add(earthMesh);
sunMesh.add(cloudMesh);
sunMesh.add(marsMesh);
sunMesh.add(venusMesh);
earthMesh.add(moonMesh);

var light = new THREE.AmbientLight(0x333333);
scene.add(light);
var lightsource = new THREE.PointLight( 0xFDFDFD, 5, 200 );
// lightsource.position.set( 30, 10, -5 );
scene.add( lightsource );

var imagePrefix = "../images/";
var urls = [ 'space.png', 'space.png', 'space.png', 'space.png', 'space.png', 'space.png' ];
var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

var loader = new THREE.FontLoader();
loader.load( '../fonts/PTSans_Regular.json', function (font) {
    var textGeo = new THREE.TextGeometry( 'Inner space is so much more interesting...(c)', {
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
    earth_theta += earth_dTheta;
    earthMesh.position.x = earth_r * Math.cos(earth_theta);
    earthMesh.position.z = earth_r * Math.sin(earth_theta);
    cloud_theta += cloud_dTheta;
    cloudMesh.position.x = cloud_r * Math.cos(cloud_theta);
    cloudMesh.position.z = cloud_r * Math.sin(cloud_theta);
    mars_theta += mars_dTheta;
    marsMesh.position.x = mars_r * Math.cos(mars_theta);
    marsMesh.position.z = mars_r * Math.sin(mars_theta);
    venus_theta += venus_dTheta;
    venusMesh.position.x = venus_r * Math.cos(venus_theta);
    venusMesh.position.z = venus_r * Math.sin(venus_theta);
    moonMesh.rotation.y += 0.007;
    marsMesh.rotation.y += 0.003;
    sunMesh.rotation.y += 0.006;
    renderer.render(scene, camera);
};

render();
