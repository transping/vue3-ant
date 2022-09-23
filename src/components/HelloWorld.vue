<script setup lang="ts">
import { ref, toRefs, computed, reactive, onMounted, watch } from 'vue'
import { defineStore } from 'pinia'

import * as R from 'ramda'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function init() {
  const sizes = {
    width: 800,
    height: 600
  }
  const canvas = document.querySelector('#c1') as HTMLCanvasElement

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 2

  const renderer = new THREE.WebGLRenderer({
    canvas
  })
  renderer.setSize(sizes.width, sizes.height)

  new OrbitControls(camera, canvas)

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)


  function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
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
