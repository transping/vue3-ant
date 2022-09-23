<script setup lang="ts">
import { ref, toRefs, computed, reactive, onMounted, watch, render } from 'vue'
import { defineStore } from 'pinia'

import * as THREE from 'three'
import { MeshNormalMaterial } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



function addBall(scene: THREE.Scene, flat: THREE.MeshNormalMaterialParameters) {
  const shape = new THREE.SphereGeometry(100)
  const cover = new THREE.MeshNormalMaterial(flat)
  const ball = new THREE.Mesh(shape, cover)
  ball.position.set(-250, 250, -250)
  scene.add(ball)
}

function addBox(scene: THREE.Scene, flat: THREE.MeshNormalMaterialParameters) {
  const cube = new THREE.BoxGeometry(300, 100, 80)
  const material = new THREE.MeshNormalMaterial(flat)
  const box = new THREE.Mesh(cube, material)
  box.rotation.set(0.5, 0.5, 0)
  box.position.set(250, 250, -250)
  scene.add(box)
}

function addCylinder(scene: THREE.Scene, flat: THREE.MeshNormalMaterialParameters) {
  const shape = new THREE.CylinderBufferGeometry(1, 100, 100, 4)
  const material = new THREE.MeshNormalMaterial(flat)
  const tube = new THREE.Mesh(shape, material)
  tube.rotation.set(0.5, 0, 0)
  scene.add(tube)
}

function init() {
  const size = {
    width: 800,
    height: 600
  }

  const scene = new THREE.Scene()
  const flat = { flatShading: true }
  const light = new THREE.AmbientLight('white', 0.8)
  scene.add(light)

  const aspectRatio = size.width / size.height
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 10000)
  camera.position.z = 500
  scene.add(camera)

  const canvas = document.querySelector('#c1') as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
  })
  renderer.setSize(size.width, size.height)

  // code
  addBall(scene, flat)
  addBox(scene, flat)
  addCylinder(scene, flat)

  // render
  renderer.render(scene, camera)
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
