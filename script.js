// THREE.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#bg"), alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const geometry = new THREE.IcosahedronGeometry(1, 1);
const material = new THREE.MeshStandardMaterial({color: 0x2575fc, wireframe: true});
const mesh = new THREE.Mesh(geometry, material);

// ✅ Move ball below button
mesh.position.set(0, -1.5, 0); // push it below text
mesh.scale.set(0.9, 0.9, 0.9);


scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.004;
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

// Hide ball when leaving hero section
ScrollTrigger.create({
  trigger: "#hero",
  start: "top top",
  end: "bottom 80%",
  onLeave: () => gsap.to(mesh.scale, {x: 0, y: 0, z: 0, duration: 1}),
  onEnterBack: () => gsap.to(mesh.scale, {x: 0.9, y: 0.9, z: 0.9, duration: 1})
});



// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Theme Toggle
// Theme Toggle
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  if(document.body.classList.contains("dark-theme")){
    themeBtn.textContent = "☀️ Light";
    mesh.material.color.set(0xffffff); // White ball in dark mode
  } else {
    themeBtn.textContent = "🌙 Dark";
    mesh.material.color.set(0x2575fc); // Original blue color in light mode
  }
});
// Node.js with nodemailer
// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      alert('Message sent successfully! Thank you.');
      contactForm.reset();
    } else {
      alert('Error sending message: ' + (result.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Network error:', err);
    alert('Failed to send message. Check your network or try again later.');
  }
});





