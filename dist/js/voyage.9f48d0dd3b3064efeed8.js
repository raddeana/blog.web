(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{KzPL:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__("VIrW");var THREE=window.THREE,WEBGL=window.WEBGL;!1===WEBGL.isWebGLAvailable()&&document.body.appendChild(WEBGL.getWebGLErrorMessage());var container=void 0,camera=void 0,scene=void 0,renderer=void 0,light=void 0,controls=void 0,water=void 0;function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}!function(){container=document.getElementById("container"),(renderer=new THREE.WebGLRenderer).setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),container.appendChild(renderer.domElement),scene=new THREE.Scene,(camera=new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,1,2e4)).position.set(30,30,100),light=new THREE.DirectionalLight(16777215,.8),scene.add(light);var waterGeometry=new THREE.PlaneBufferGeometry(1e4,1e4);(water=new THREE.Water(waterGeometry,{textureWidth:512,textureHeight:512,waterNormals:(new THREE.TextureLoader).load("https://raddeana-materials.oss-cn-hangzhou.aliyuncs.com/images/chartlets/waternormals.jpg",function(texture){texture.wrapS=texture.wrapT=THREE.RepeatWrapping}),alpha:1,sunDirection:light.position.clone().normalize(),sunColor:16777215,waterColor:7695,distortionScale:3.7,fog:void 0!==scene.fog})).rotation.x=-Math.PI/2,scene.add(water);var sky=new THREE.Sky;sky.scale.setScalar(1e4),scene.add(sky);var uniforms=sky.material.uniforms;uniforms.turbidity.value=10,uniforms.rayleigh.value=2,uniforms.luminance.value=1,uniforms.mieCoefficient.value=.005,uniforms.mieDirectionalG.value=.8;var parameters_distance=400,parameters_inclination=.49,parameters_azimuth=.205,cubeCamera=new THREE.CubeCamera(1,2e4,256);cubeCamera.renderTarget.texture.generateMipmaps=!0,cubeCamera.renderTarget.texture.minFilter=THREE.LinearMipMapLinearFilter,function(){var theta=Math.PI*(parameters_inclination-.5),phi=2*Math.PI*(parameters_azimuth-.5);light.position.x=parameters_distance*Math.cos(phi),light.position.y=parameters_distance*Math.sin(phi)*Math.sin(theta),light.position.z=parameters_distance*Math.sin(phi)*Math.cos(theta),sky.material.uniforms.sunPosition.value=light.position.copy(light.position),water.material.uniforms.sunDirection.value.copy(light.position).normalize(),cubeCamera.update(renderer,scene)}();for(var geometry=new THREE.IcosahedronBufferGeometry(20,1),count=geometry.attributes.position.count,colors=[],color=new THREE.Color,i=0;i<count;i+=3)color.setHex(16777215*Math.random()),colors.push(color.r,color.g,color.b),colors.push(color.r,color.g,color.b),colors.push(color.r,color.g,color.b);geometry.addAttribute("color",new THREE.Float32BufferAttribute(colors,3)),(controls=new THREE.OrbitControls(camera,renderer.domElement)).maxPolarAngle=.495*Math.PI,controls.target.set(0,10,0),controls.minDistance=40,controls.maxDistance=200,camera.lookAt(controls.target),window.addEventListener("resize",onWindowResize,!1)}(),function animate(){water.material.uniforms.time.value+=1/60;requestAnimationFrame(animate);renderer.render(scene,camera)}()},VIrW:function(module,exports,__webpack_require__){}},[["KzPL",0]]]);