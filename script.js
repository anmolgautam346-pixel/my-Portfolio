/* =========================================================
   1. CORE INITIALIZATION & VANTA BACKGROUND
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Vanta.js NET Animation Initializing
    // Ensure Three.js is loaded before this
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xe1467a,      // Signature Pink
            backgroundColor: 0x080808, 
            points: 12.00,        // Slightly increased for better density
            maxDistance: 22.00,
            spacing: 16.00
        });
    }

    // AOS Animation Init
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Start Utilities
    startImageShuffle();
    
    // Study Card Flip (Click to flip on Mobile/Desktop)
    const studyCards = document.querySelectorAll('.study-card');
    studyCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});

/* =========================================================
   2. MOBILE MENU & UTILITIES
   ========================================================= */
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Image Stack Shuffling (Hero Section)
function startImageShuffle() {
    const images = document.querySelectorAll('.image-stack .main-img');
    if (images.length <= 1) return;
    
    let currentIndex = 0;
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 4000); 
}

/* =========================================================
   3. P5.JS INTERACTIVE EYES (Optimized)
   ========================================================= */
let blinkTimer = 0;
let isBlinking = false;

function setup() {
    // Responsive Canvas Size
    let container = document.getElementById('eye-container');
    let w = container.offsetWidth > 300 ? 300 : container.offsetWidth;
    let cnv = createCanvas(w, 150); 
    cnv.parent('eye-container'); 
    angleMode(DEGREES);
}

function windowResized() {
    let container = document.getElementById('eye-container');
    let w = container.offsetWidth > 300 ? 300 : container.offsetWidth;
    resizeCanvas(w, 150);
}

function draw() {
    clear(); 

    // Blink Logic
    blinkTimer++;
    if (blinkTimer > 150) { 
        isBlinking = true;
        if (blinkTimer > 160) { 
            isBlinking = false;
            blinkTimer = 0;
        }
    }

    // Layout setup
    let centerX = width / 2;
    let leftX = centerX - 70;
    let rightX = centerX + 70;
    let eyeY = height / 2;

    // Support Mouse & Touch
    let targetX = (touches.length > 0) ? touches[0].x : mouseX;
    let targetY = (touches.length > 0) ? touches[0].y : mouseY;

    let leftAngle = atan2(targetY - eyeY, targetX - leftX);
    let rightAngle = atan2(targetY - eyeY, targetX - rightX);

    drawEye(leftX, eyeY, leftAngle);
    drawEye(rightX, eyeY, rightAngle);
}

function drawEye(x, y, angle) {
    push();
    translate(x, y);
    fill(255);
    noStroke();
    
    if (isBlinking) {
        ellipse(0, 0, 70, 2); // Blink state
    } else {
        ellipse(0, 0, 70, 70); // Eye white
        rotate(angle);
        fill(10, 10, 10); 
        ellipse(18, 0, 32, 32); // Pupil
        fill(255, 180);
        ellipse(22, -6, 10, 10); // Reflection
    }
    pop();
}

/* =========================================================
   4. SKILLS MODAL LOGIC
   ========================================================= */
const skillDetails = {
    python: { title: "Python", desc: "Expertise in automation, scripting, and Data Science.", project: "E-commerce backend & Iris ML Classifier." },
    sql: { title: "SQL", desc: "Database architecture and complex query optimization.", project: "SIC Mart relational database structure." },
    java: { title: "Java", desc: "Core OOP concepts and GUI application development.", project: "Custom Calculator & Banking System logic." },
    cpp: { title: "C++", desc: "Efficient algorithm design and competitive programming.", project: "DSA problem solving and memory management." },
    js: { title: "JavaScript", desc: "Modern ES6+ development and DOM manipulation.", project: "This interactive portfolio UI." },
    html: { title: "HTML5", desc: "Semantic web structure and accessibility.", project: "Project SnackOverflow & Dashboard UIs." },
    css: { title: "CSS3", desc: "Advanced styling, Animations, and Flex/Grid layouts.", project: "Glassmorphism & Responsive design patterns." },
    pandas: { title: "Pandas", desc: "High-performance data manipulation and analysis.", project: "Used in cleaning Hackathon logistics data." },
    numpy: { title: "NumPy", desc: "Complex mathematical operations on arrays.", project: "ML Model feature scaling." },
    matplotlib: { title: "Matplotlib", desc: "Static, animated, and interactive visualizations.", project: "Zomato Data Insight charts." },
    seaborn: { title: "Seaborn", desc: "Beautiful statistical data visualizations.", project: "Dataset correlation heatmaps." },
    mysql: { title: "MySQL", desc: "Scalable relational data management.", project: "Inventory management for SIC Mart." },
    mongodb: { title: "MongoDB", desc: "Flexible JSON-like document storage.", project: "NoSQL schema design for rapid prototyping." },
    dsa: { title: "DSA", desc: "Advanced logic in Trees, Graphs, and Dynamic Programming.", project: "Optimized search algorithms in project workflows." },
    powerbi: { title: "Power BI", desc: "Turning raw data into interactive business reports.", project: "Logistics Optimization Dashboard." },
    git: { title: "Git/GitHub", desc: "Team collaboration and version control.", project: "Hackathon codebase management." }
};

function openSkill(skillKey) {
    const modal = document.getElementById('skillModal');
    const data = skillDetails[skillKey];
    
    if (data) {
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalDesc').innerText = data.desc;
        document.getElementById('modalProject').innerHTML = `<strong>Project Use:</strong> ${data.project}`;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Stop background scroll
    }
}

function closeModal() {
    document.getElementById('skillModal').style.display = "none";
    document.body.style.overflow = "auto";
}

// Close Modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('skillModal');
    if (event.target == modal) closeModal();
};

/* =========================================================
   5. CONTACT FORM HANDLING (With Backend Integration)
   ========================================================= */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerText;

        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            // Replace with your actual backend URL if different
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("🚀 Message Sent Successfully!");
                contactForm.reset();
            } else {
                alert("❌ Something went wrong. Try again!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("⚠️ Server Connection Failed. Is your Node.js backend running?");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    });
}

// Track Motion Path Animation

// 1. Path setup
var path = anime.path('#suzukaPath');

// 2. Animation initialize (Paused)
var scrollAnim = anime({
    targets: '.f1-car',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

// 3. Scroll Listener
window.addEventListener('scroll', () => {
    // Calculate scroll percentage
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollFraction = scrollTop / scrollHeight;

    // Update animation position
    scrollAnim.seek(scrollAnim.duration * scrollFraction);

    // Optional: Add 'scrolling' class for CSS effects
    const wrapper = document.getElementById('f1-track-wrapper');
    if(scrollTop > 10) {
        wrapper.classList.add('scrolling');
    } else {
        wrapper.classList.remove('scrolling');
    }
});