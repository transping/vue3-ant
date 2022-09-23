<script setup lang="ts">
import { ref, toRefs, computed, reactive, onMounted, watch } from 'vue'
import { defineStore } from 'pinia'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function init() {
  const sizes = {
    width: 800,
    height: 600
  }
  const canvas = document.querySelector('#c1') as HTMLCanvasElement

  const scene = new THREE.Scene()

  const textureLoader = new THREE.TextureLoader()

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
  )
  floor.rotation.x = - Math.PI * 0.5
  floor.position.y = 0
  scene.add(floor)

  /**
 * Lights
 */
  // Ambient light
  const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
  scene.add(ambientLight)

  // Directional light
  const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
  moonLight.position.set(4, 5, - 2)
  scene.add(moonLight)

  // house
  const house = new THREE.Group()
  scene.add(house)

  const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ color: '#ac8e82'})
  )
  walls.position.y = 1.25
  house.add(walls)

  const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
  )
  roof.position.y = 3
  roof.rotation.y = Math.PI * 0.25
  house.add(roof)

  const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.MeshStandardMaterial({ color: '#aa7b7b'})
  )
  door.position.y = 1
  door.position.z = 2 + 0.01
  house.add(door)

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


  function animate() {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)


    requestAnimationFrame(animate)
  };


  animate()
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
  canvas {
    border: solid 1px red;
  }
</style>
