var camera, scene, renderer;
var sphere1, sphere2, sphere3, sphere4, sphere5,  sphere6, sphere7, sphere8, material;

var count = 0, cubeCamera1, cubeCamera2;

var fov = 145,
isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0,
onPointerDownPointerX, onPointerDownPointerY,
onPointerDownLon, onPointerDownLat,
container;

function init( texture, _container) {
    container = _container;
    camera = new THREE.PerspectiveCamera( fov, container.clientWidth / container.clientHeight, 1, 1000 );

    scene = new THREE.Scene();

    var mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 32, 16 ), new THREE.MeshBasicMaterial( { map: texture } ) );
    mesh.scale.x = -1;
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( container.devicePixelRatio );
    renderer.setSize( container.clientWidth, container.clientHeight );

    cubeCamera1 = new THREE.CubeCamera( 1, 1000, 256 );
    cubeCamera1.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add( cubeCamera1 );

    cubeCamera2 = new THREE.CubeCamera( 1, 1000, 256 );
    cubeCamera2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add( cubeCamera2 );

    container.appendChild( renderer.domElement );

    material = new THREE.MeshBasicMaterial({
        envMap: cubeCamera2.renderTarget.texture
    });

    sphere1 = new THREE.Mesh( new THREE.IcosahedronGeometry( 20, 3 ), material );
    scene.add( sphere1 );

    sphere2 = new THREE.Mesh( new THREE.IcosahedronGeometry( 6, 3 ), material );
    scene.add( sphere2 );

    sphere3 = new THREE.Mesh( new THREE.IcosahedronGeometry( 8, 3 ), material );
    scene.add( sphere3 );

    sphere4 = new THREE.Mesh( new THREE.IcosahedronGeometry( 9, 3 ), material );
    scene.add( sphere4 );

    sphere5 = new THREE.Mesh( new THREE.IcosahedronGeometry( 7, 3 ), material );
    scene.add( sphere5 );

    sphere6 = new THREE.Mesh( new THREE.IcosahedronGeometry( 4, 3 ), material );
    scene.add( sphere6 );

    sphere7 = new THREE.Mesh( new THREE.IcosahedronGeometry( 5, 3 ), material );
    scene.add( sphere7 );

    sphere8 = new THREE.Mesh( new THREE.IcosahedronGeometry( 3, 3 ), material );
    scene.add( sphere8 );

    container.addEventListener( 'mousedown', onDocumentMouseDown, false );
    container.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
    container.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);
    window.addEventListener( 'resize', onWindowResized, false );

    onWindowResized( null );

};

function onWindowResized( event ) {

    renderer.setSize( container.clientWidth, container.clientHeight );
    camera.projectionMatrix.makePerspective( fov, container.clientWidth / container.clientHeight, 1, 1100 );
};

function onDocumentMouseDown( event ) {

    event.preventDefault();

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );

};

function onDocumentMouseMove( event ) {

    lon = ( event.clientX - onPointerDownPointerX ) * 0.1 + onPointerDownLon;
    lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

};

function onDocumentMouseUp( event ) {

    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );

};

function onDocumentMouseWheel( event ) {

    if ( event.wheelDeltaY ) {

        fov -= event.wheelDeltaY * 0.05;

    } else if ( event.wheelDelta ) {

        fov -= event.wheelDelta * 0.05;

    } else if ( event.detail ) {

        fov += event.detail * 1.0;

    }

    camera.projectionMatrix.makePerspective( fov, container.clientWidth / container.clientHeight, 1, 1100 );
};

function animate() {
    requestAnimationFrame( animate );
    render();
};

function render() {

    var time = Date.now();

    lon += .15;

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    sphere2.position.x = Math.cos( time * 0.001 ) * 30;
    sphere2.position.y = Math.sin( time * 0.001 ) * 30;
    sphere2.position.z = Math.sin( time * 0.001 ) * 30;

    sphere2.rotation.x += 0.02;
    sphere2.rotation.y += 0.03;

    sphere3.position.x = Math.cos( time * 0.001 + 4 ) * 45;
    sphere3.position.y = Math.sin( time * 0.001 + 4 ) * 45;
    sphere3.position.z = Math.sin( time * 0.001 + 4 ) * 45;

    sphere3.rotation.x += 0.02;
    sphere3.rotation.y += 0.03;

    sphere4.position.x = Math.cos( time * 0.003 + 5 ) * 60;
    sphere4.position.y = Math.sin( time * 0.003 + 5 ) * 60;
    sphere4.position.z = Math.sin( time * 0.003 + 5 ) * 60;

    sphere4.rotation.x += 0.02;
    sphere4.rotation.y += 0.03;

    sphere5.position.x = Math.cos( time * 0.002 + 7 ) * 80;
    sphere5.position.y = Math.sin( time * 0.002 + 7 ) * 80;
    sphere5.position.z = Math.sin( time * 0.002 + 7 ) * 80;

    sphere5.rotation.x += 0.02;
    sphere5.rotation.y += 0.03;    

    sphere6.position.x = Math.cos( time * 0.004 + 6 ) * 120;
    sphere6.position.y = Math.sin( time * 0.004 + 6 ) * 120;
    sphere6.position.z = Math.sin( time * 0.004 + 6 ) * 120;

    sphere6.rotation.x += 0.02;
    sphere6.rotation.y += 0.03;    

    sphere7.position.x = Math.cos( time * 0.002 + 3 ) * 130;
    sphere7.position.y = Math.sin( time * 0.002 + 3 ) * 130;
    sphere7.position.z = Math.sin( time * 0.002 + 3 ) * 130;

    sphere7.rotation.x += 0.02;
    sphere7.rotation.y += 0.03;    

    sphere8.position.x = Math.cos( time * 0.001 + 8 ) * 150;
    sphere8.position.y = Math.sin( time * 0.001 + 8 ) * 150;
    sphere8.position.z = Math.sin( time * 0.001 + 8 ) * 150;

    sphere8.rotation.x += 0.02;
    sphere8.rotation.y += 0.03;            

    camera.position.x = 100 * Math.sin( phi ) * Math.cos( theta );
    camera.position.y = 100 * Math.cos( phi );
    camera.position.z = 100 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( scene.position );

    sphere1.visible = false;

    if ( count % 2 === 0 ) {
        material.envMap = cubeCamera1.renderTarget.texture;
        cubeCamera2.updateCubeMap( renderer, scene );
    } else {
        material.envMap = cubeCamera2.renderTarget.texture;
        cubeCamera1.updateCubeMap( renderer, scene );
    }

    count ++;

    sphere1.visible = true; // *cough*

    renderer.render( scene, camera );

};

var textureLoader = new THREE.TextureLoader();

module.exports.init = function (_container) {
    textureLoader.load( '/libs/three/textures/extra/shining.jpg', function ( texture ) {

        texture.mapping = THREE.UVMapping;

        init( texture, _container);
        animate();

    } );    
}