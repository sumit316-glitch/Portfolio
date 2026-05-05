document.addEventListener("DOMContentLoaded", () => {

    // ══════════════════════════════════════════
    //  FLOATING PARTICLE BACKGROUND
    // ══════════════════════════════════════════
    const canvas = document.getElementById("particleCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        const PARTICLE_COUNT = 60;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(195, 168, 135, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(195, 168, 135, ${0.04 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ══════════════════════════════════════════
    //  CURSOR GLOW
    // ══════════════════════════════════════════
    const glow = document.getElementById("cursorGlow");
    if (glow) {
        let mx = 0, my = 0, gx = 0, gy = 0;
        document.addEventListener("mousemove", (e) => {
            mx = e.clientX; my = e.clientY;
            glow.style.opacity = "1";
        });
        function followCursor() {
            gx += (mx - gx) * 0.08;
            gy += (my - gy) * 0.08;
            glow.style.left = gx + "px";
            glow.style.top = gy + "px";
            requestAnimationFrame(followCursor);
        }
        followCursor();
    }

    // ══════════════════════════════════════════
    //  NAVBAR SCROLL
    // ══════════════════════════════════════════
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    const navCtaBtn = document.getElementById("navCtaBtn");
    if (navCtaBtn) {
        navCtaBtn.addEventListener("click", () => {
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        });
    }

    // ══════════════════════════════════════════
    //  ACTIVE NAV LINK
    // ══════════════════════════════════════════
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    function updateActiveLink() {
        const scrollY = window.scrollY + 200;
        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + id) link.classList.add("active");
                });
            }
        });
    }
    window.addEventListener("scroll", updateActiveLink);

    // ══════════════════════════════════════════
    //  ANIMATED COUNTERS
    // ══════════════════════════════════════════
    const statNumbers = document.querySelectorAll(".stat-number");
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach((el) => {
            const target = parseInt(el.getAttribute("data-target"));
            const duration = 3000; // 3 seconds total duration
            const startTime = performance.now();
            let lastUpdate = startTime;
            let currentDelay = 30; // initial fast scramble speed (in ms)

            function tick(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Update text content based on currentDelay to control speed
                if (now - lastUpdate >= currentDelay) {
                    if (progress < 0.6) {
                        // First ~1.8 seconds: Fast scrambling
                        el.textContent = Math.floor(Math.random() * 99); 
                    } else if (progress < 1) {
                        // Last ~1.2 seconds: Gradually slow down
                        // Map progress (0.6 -> 1.0) to a delay (50ms -> 400ms)
                        const slowProgress = (progress - 0.6) / 0.4;
                        currentDelay = 50 + (Math.pow(slowProgress, 2) * 350); 
                        el.textContent = Math.floor(Math.random() * 99);
                    }
                    lastUpdate = now;
                }

                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    // Finally, snap to the actual target value
                    el.textContent = target;
                }
            }
            requestAnimationFrame(tick);
        });
    }

    // ══════════════════════════════════════════
    //  SCROLL REVEAL
    // ══════════════════════════════════════════
    const heroReveals = document.querySelectorAll(".hero .reveal");
    setTimeout(() => {
        heroReveals.forEach((el) => el.classList.add("visible"));
    }, 200);

    const revealTargets = document.querySelectorAll(
        ".title-reveal, .project-card, .skill-category, .skills-section-label, .edu-card, .extra-card, .about-text, .about-education, .contact-inner, .strength-tag"
    );
    revealTargets.forEach((el) => {
        if (!el.classList.contains("title-reveal")) el.classList.add("fade-up");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add("visible"), i * 60);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    revealTargets.forEach((el) => observer.observe(el));

    // Counter observer
    const heroStats = document.querySelector(".hero-stats");
    if (heroStats) {
        const counterObs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounters();
                counterObs.unobserve(heroStats);
            }
        }, { threshold: 0.3 });
        counterObs.observe(heroStats);
    }

    // ══════════════════════════════════════════
    //  MAGNETIC HOVER ON BUTTONS
    // ══════════════════════════════════════════
    document.querySelectorAll(".btn-primary, .btn-outline, .nav-cta").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
        });
    });
});
