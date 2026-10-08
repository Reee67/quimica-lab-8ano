import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { moleculeData } from '../data/molecules.js';

export function initMoleculeViewer(container, moleculeKey) {
  const mol = moleculeData[moleculeKey];
  if (!mol) return null;

  const width = container.clientWidth;
  const height = container.clientHeight || 400;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.5;

  const ambient = new THREE.AmbientLight(0x404040, 2.5);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xb0ff00, 0.8);
  dirLight2.position.set(-5, -3, -5);
  scene.add(dirLight2);

  const group = new THREE.Group();
  const scale = 0.8;

  mol.atoms.forEach((atom) => {
    const geo = new THREE.SphereGeometry(atom.radius * scale, 32, 32);
    const mat = new THREE.MeshPhongMaterial({
      color: atom.color,
      shininess: 80,
      specular: 0x333333
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(atom.pos[0] * scale, atom.pos[1] * scale, atom.pos[2] * scale);
    group.add(mesh);
  });

  mol.bonds.forEach((bond) => {
    const a = mol.atoms[bond.from].pos;
    const b = mol.atoms[bond.to].pos;
    const aV = new THREE.Vector3(a[0] * scale, a[1] * scale, a[2] * scale);
    const bV = new THREE.Vector3(b[0] * scale, b[1] * scale, b[2] * scale);
    const dist = aV.distanceTo(bV);

    if (bond.type === "double") {
      const offset = 0.18;
      const dir = new THREE.Vector3().subVectors(bV, aV).normalize();
      const perp = new THREE.Vector3(dir.y, -dir.x, 0).normalize();
      makeBond(group, aV.clone().add(perp.clone().multiplyScalar(offset)), bV.clone().add(perp.clone().multiplyScalar(offset)), dist);
      makeBond(group, aV.clone().add(perp.clone().multiplyScalar(-offset)), bV.clone().add(perp.clone().multiplyScalar(-offset)), dist);
    } else {
      makeBond(group, aV, bV, dist);
    }
  });

  function makeBond(parent, start, end, dist) {
    const geo = new THREE.CylinderGeometry(0.08, 0.08, dist, 16);
    const mat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, shininess: 40 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(start.clone().add(end).multiplyScalar(0.5));
    mesh.lookAt(end);
    mesh.rotateX(Math.PI / 2);
    parent.add(mesh);
  }

  scene.add(group);

  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight || 400;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  function dispose() {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', onResize);
    controls.dispose();
    renderer.dispose();
    container.innerHTML = '';
  }

  return { dispose, scene, camera, group };
}
