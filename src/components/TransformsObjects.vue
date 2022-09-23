<script setup lang="ts">
import { ref, toRefs, computed, reactive, onMounted, watch } from 'vue'
import { defineStore } from 'pinia'

import * as THREE from 'three'
import { MeshNormalMaterial } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



function init() {
  const canvas = document.querySelector('#c1') as HTMLCanvasElement

  const loadingManager = new THREE.LoadingManager()
  const textureLoader = new THREE.TextureLoader(loadingManager)
  const colorTexture = textureLoader.load(
    '/textures/minecraft.png'
  )
  colorTexture.wrapS = THREE.MirroredRepeatWrapping
  colorTexture.wrapT = THREE.MirroredRepeatWrapping
  colorTexture.generateMipmaps = false
  colorTexture.minFilter = THREE.NearestFilter
  colorTexture.magFilter = THREE.NearestFilter

  // Sizes
  const sizes = {
    width: 800,
    height: 600
  }

  // Cursor
  const cursor = {
    x: 0,
    y: 0
  }

  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
  })

  // Scene
  const scene = new THREE.Scene()

  // Object
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ map: colorTexture })
  )
  scene.add(mesh)

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  // const aspectRatio = sizes.width / sizes.height
  // const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
  camera.position.z = 3
  scene.add(camera)

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)

  const tick = () => {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
}

onMounted(() => {
  console.log('mounted')
  init()
})


</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <canvas id="c1"></canvas>
</template>

<style scoped>
</style>
