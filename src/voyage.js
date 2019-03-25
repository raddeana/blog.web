/**
 * 海盗
 * @author Philip
 */
const THREE = window.THREE
const WEBGL = window.WEBGL

if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage())
}

let container
let camera, scene, renderer, light
let controls, water

init()
animate()

function init () {
    container = document.getElementById('container')

    // 渲染器
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // 场景
    scene = new THREE.Scene()

    // 摄像头
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000)
    camera.position.set(30, 30, 100)

    // 光源
    light = new THREE.DirectionalLight(0xffffff, 0.8)
    scene.add(light)

    // Water
    let waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000)

    water = new THREE.Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('https://raddeana-materials.oss-cn-hangzhou.aliyuncs.com/images/chartlets/waternormals.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }),
        alpha: 1.0,
        sunDirection: light.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
    })

    water.rotation.x = -Math.PI / 2
    scene.add(water)

    // Skybox
    let sky = new THREE.Sky()
    sky.scale.setScalar(10000)
    scene.add(sky)

    let uniforms = sky.material.uniforms

    uniforms['turbidity'].value = 10
    uniforms['rayleigh'].value = 2
    uniforms['luminance'].value = 1
    uniforms['mieCoefficient'].value = 0.005
    uniforms['mieDirectionalG'].value = 0.8

    let parameters = {
        distance: 400,
        inclination: 0.49,
        azimuth: 0.205
    }

    let cubeCamera = new THREE.CubeCamera(1, 20000, 256)
    cubeCamera.renderTarget.texture.generateMipmaps = true
    cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter

    function updateSun () {
        let theta = Math.PI * (parameters.inclination - 0.5)
        let phi = 2 * Math.PI * (parameters.azimuth - 0.5)

        light.position.x = parameters.distance * Math.cos(phi)
        light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta)
        light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta)

        sky.material.uniforms['sunPosition'].value = light.position.copy(light.position)
        water.material.uniforms['sunDirection'].value.copy(light.position).normalize()

        cubeCamera.update(renderer, scene)
    }

    updateSun()

    let geometry = new THREE.IcosahedronBufferGeometry(20, 1)
    let count = geometry.attributes.position.count

    let colors = []
    let color = new THREE.Color()

    for (let i = 0; i < count; i += 3) {
        color.setHex(Math.random() * 0xffffff)

        colors.push(color.r, color.g, color.b)
        colors.push(color.r, color.g, color.b)
        colors.push(color.r, color.g, color.b)
    }

    geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    // 控制器
    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.maxPolarAngle = Math.PI * 0.495
    controls.target.set(0, 10, 0)
    controls.minDistance = 40.0
    controls.maxDistance = 200.0
    camera.lookAt(controls.target)

    // 窗口大小变化
    window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
    water.material.uniforms['time'].value += 1.0 / 60.0

    requestAnimationFrame(animate)
    render()
}

function render () {
    renderer.render(scene, camera)
}
