'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const MoonModel = () => {
  const mountRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const frameRef = useRef(null)
  const modelRef = useRef(null)
  const roRef = useRef(null)

  // Interaction refs
  const isDraggingRef = useRef(false)
  const lastPointerRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const hoverTargetRef = useRef({ x: 0, y: 0 })
  const isPointerOverRef = useRef(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ---------- Scene + Camera + Renderer ----------
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera.position.set(0, 0, 3)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    rendererRef.current = renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0) // transparent background
    renderer.shadowMap.enabled = false
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 2.0 // moderate exposure
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.domElement.style.display = 'block'

    // place canvas inside the mount and size it to fill the mount (absolute inside relative)
    mount.style.position = mount.style.position || 'relative'
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.zIndex = '50'
    renderer.domElement.style.pointerEvents = 'auto'

    mount.appendChild(renderer.domElement)
    renderer.setSize(mount.clientWidth, mount.clientHeight, false)

    // ---------- Lights ----------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(2048, 2048)
    scene.add(directionalLight)

    const rimLight = new THREE.DirectionalLight(0x8888ff, 0.35)
    rimLight.position.set(-5, 2, -5)
    scene.add(rimLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 10)
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)

    // ---------- Load model ----------
    const loader = new GLTFLoader()
    loader.load(
      '/models/moon.glb',
      (gltf) => {
        const moon = gltf.scene

        // --- Don't overwrite or force transparency/emissive maps ---
        moon.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            if (child.material) {
              // Only set safe defaults when properties are undefined;
              // avoid forcing `transparent=false` or overwriting emissive/map/etc.
              if (child.material.roughness === undefined) child.material.roughness = 0.95
              if (child.material.metalness === undefined) child.material.metalness = 0.05
              // Do not change child.material.transparent or child.material.emissive if present,
              // because textures / layered materials may rely on them.
            }
          }
        })

        // center model
        const bbox = new THREE.Box3().setFromObject(moon)
        const center = new THREE.Vector3()
        bbox.getCenter(center)
        moon.position.sub(center)

        // scale model (smaller than earlier)
        const size = new THREE.Vector3()
        bbox.getSize(size)
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim > 0) {
          const desiredSize = 0.85 // smaller than before to avoid cropping
          const scale = desiredSize / maxDim
          moon.scale.setScalar(scale)
        }

        modelRef.current = moon
        scene.add(moon)

        // frame camera with slightly bigger offset so moon appears smaller
        frameModelToCamera(moon, camera, renderer.domElement, 1.7)
      },
      undefined,
      (err) => {
        console.error('Error loading moon.glb:', err)
      }
    )

    // ---------- ResizeObserver ----------
    const resize = () => {
      if (!mount || !renderer || !camera) return
      const width = mount.clientWidth
      const height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    }

    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    roRef.current = ro

    // ---------- Pointer hover/drag handling ----------
    const DRAG_SENSITIVITY = 0.9 // reduced sensitivity for normal drag feel
    const MAX_VEL = 0.12 // clamp maximum velocity so it never spins wildly

    const isCanvasTarget = (e) => {
      // ensure interactions only happen when pointer is over the actual canvas element
      return e.target === renderer.domElement || renderer.domElement.contains(e.target)
    }

    const handleCanvasPointerEnter = () => { isPointerOverRef.current = true }
    const handleCanvasPointerLeave = () => {
      isPointerOverRef.current = false
      // reset hover target so moon eases back to neutral when pointer leaves
      hoverTargetRef.current = { x: 0, y: 0 }
    }

    const handlePointerHover = (e) => {
      if (!mount || !isPointerOverRef.current) return
      if (isDraggingRef.current) return
      const rect = renderer.domElement.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      hoverTargetRef.current.x = x * 0.14 // smaller hover influence
      hoverTargetRef.current.y = y * 0.08
    }

    const onPointerDown = (e) => {
      if (!isCanvasTarget(e)) return
      isDraggingRef.current = true
      lastPointerRef.current = { x: e.clientX, y: e.clientY }
      // keep small existing velocity instead of zeroing out fully so it doesn't jump
      // velocityRef.current = { x: 0, y: 0 }
      try { e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId) } catch {}
    }

    const onPointerMove = (e) => {
      if (!isCanvasTarget(e)) {
        // update hover state only if pointer is over canvas; otherwise ignore
        return
      }

      if (isDraggingRef.current) {
        const last = lastPointerRef.current
        const dx = e.clientX - last.x
        const dy = e.clientY - last.y
        lastPointerRef.current = { x: e.clientX, y: e.clientY }

        // Normalize by mount size so drag speed doesn't depend on resolution
        const nx = dx / Math.max(mount.clientWidth, 1)
        const ny = dy / Math.max(mount.clientHeight, 1)

        // Add scaled but smaller velocity increments; clamp to avoid spikes
        velocityRef.current.x = clamp(
          velocityRef.current.x + nx * Math.PI * DRAG_SENSITIVITY * 0.45,
          -MAX_VEL,
          MAX_VEL
        )
        velocityRef.current.y = clamp(
          velocityRef.current.y + ny * Math.PI * DRAG_SENSITIVITY * 0.28,
          -MAX_VEL,
          MAX_VEL
        )
      } else {
        handlePointerHover(e)
      }
    }

    const onPointerUp = (e) => {
      if (!isCanvasTarget(e)) return
      isDraggingRef.current = false
      try { e.target.releasePointerCapture && e.target.releasePointerCapture(e.pointerId) } catch {}
    }

    renderer.domElement.addEventListener('pointerenter', handleCanvasPointerEnter)
    renderer.domElement.addEventListener('pointerleave', handleCanvasPointerLeave)
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)
    // fallback hover for some environments
    renderer.domElement.addEventListener('mousemove', handlePointerHover)

    // ---------- Animation ----------
    const AUTO_ROTATION_SPEED = 0.0006 // slow endless rotation (Y axis)
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const moon = modelRef.current
      if (moon) {
        // Hover smoothing only when not dragging and pointer is over canvas
        if (!isDraggingRef.current && isPointerOverRef.current) {
          moon.rotation.x += (hoverTargetRef.current.y - moon.rotation.x) * 0.06
          moon.rotation.y += (hoverTargetRef.current.x - moon.rotation.y) * 0.06
        }

        // Apply velocity spin from drag (inertial)
        moon.rotation.y += velocityRef.current.x
        moon.rotation.x += velocityRef.current.y

        // gentle levitation
        moon.position.y = Math.sin(Date.now() * 0.001) * 0.06

        // constant slow auto-rotation
        moon.rotation.y += AUTO_ROTATION_SPEED
      }

      // damping
      velocityRef.current.x *= 0.90
      velocityRef.current.y *= 0.90
      if (Math.abs(velocityRef.current.x) < 1e-4) velocityRef.current.x = 0
      if (Math.abs(velocityRef.current.y) < 1e-4) velocityRef.current.y = 0

      // subtle lights flicker (non-invasive)
      directionalLight.intensity = 1.0 + Math.sin(Date.now() * 0.0008) * 0.06

      renderer.render(scene, camera)
    }
    animate()

    // ---------- Utility: frame model ----------
    function frameModelToCamera(object, camera, domElement, offset = 1.25) {
      const box = new THREE.Box3().setFromObject(object)
      const size = new THREE.Vector3()
      box.getSize(size)
      const center = new THREE.Vector3()
      box.getCenter(center)

      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = (camera.fov * Math.PI) / 180
      let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * offset
      if (cameraDistance < 1) cameraDistance = 1

      camera.position.copy(center)
      camera.position.z += cameraDistance
      camera.lookAt(center)
      camera.updateProjectionMatrix()

      if (domElement) {
        const w = domElement.clientWidth || 1
        const h = domElement.clientHeight || 1
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
    }

    // ---------- Cleanup ----------
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)

      try {
        renderer.domElement.removeEventListener('pointerenter', handleCanvasPointerEnter)
        renderer.domElement.removeEventListener('pointerleave', handleCanvasPointerLeave)
        renderer.domElement.removeEventListener('pointerdown', onPointerDown)
        window.removeEventListener('pointerup', onPointerUp)
        window.removeEventListener('pointermove', onPointerMove)
        renderer.domElement.removeEventListener('mousemove', handlePointerHover)
      } catch (e) {}

      if (roRef.current) {
        try { roRef.current.disconnect() } catch {}
      }

      if (scene) {
        scene.traverse((child) => {
          if (child.geometry) child.geometry.dispose()
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => {
                if (m.map) m.map.dispose()
                if (m.dispose) m.dispose()
              })
            } else {
              if (child.material.map) child.material.map.dispose()
              if (child.material.dispose) child.material.dispose()
            }
          }
        })
      }

      if (rendererRef.current) {
        try {
          rendererRef.current.forceContextLoss()
          rendererRef.current.dispose()
          if (rendererRef.current.domElement && mount.contains(rendererRef.current.domElement)) {
            mount.removeChild(rendererRef.current.domElement)
          }
        } catch (e) {}
      }

      sceneRef.current = null
      cameraRef.current = null
      rendererRef.current = null
      modelRef.current = null
    }
  }, [])

  return (
    <div ref={mountRef} className="w-full h-full relative">
      {/* canvas injected here (absolute) */}
    </div>
  )
}

export default MoonModel
