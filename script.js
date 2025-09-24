// THREE.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#bg"), alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const geometry = new THREE.IcosahedronGeometry(1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x2575fc, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

// Move ball below button
mesh.position.y = -2;  
mesh.scale.set(0.9, 0.9, 0.9);
scene.add(mesh);

// Lights
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Ambient light to make ball visible in dark mode
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Animate ball
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animate();

// GSAP Scroll Animations
gsap.utils.toArray(".panel").forEach((panel) => {
  gsap.from(panel, {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// Hide ball after hero section
ScrollTrigger.create({
  trigger: "#hero",
  start: "bottom top",
  onLeave: () => gsap.to(mesh.scale, { x: 0, y: 0, z: 0, duration: 1 }),
  onEnterBack: () => gsap.to(mesh.scale, { x: 0.9, y: 0.9, z: 0.9, duration: 1 })
});

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Theme Toggle with smooth color transition
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  if(document.body.classList.contains("dark-theme")){
    themeBtn.textContent = "☀️ Light";
    gsap.to(mesh.material.color, { r: 1, g: 1, b: 1, duration: 0.5 }); // white
  } else {
    themeBtn.textContent = "🌙 Dark";
    gsap.to(mesh.material.color, { r: 0.15, g: 0.46, b: 0.99, duration: 0.5 }); // original blue
  }
});
