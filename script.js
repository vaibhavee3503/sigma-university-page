document.addEventListener("DOMContentLoaded", function () {

    /* 1. Navbar Scroll Effect */
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* 2. Enhanced Scroll Reveal (Intersection Observer) */
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-reveal").forEach(el => {
        observer.observe(el);
    });

    /* 3. Smooth Anchor Scrolling */
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    /* 4. Form Validation & UI Feedback */
    const form = document.getElementById("admissionForm");
    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        // Visual loading state
        btn.innerText = "Processing...";
        btn.style.opacity = "0.7";

        setTimeout(() => {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (name.length < 3 || !emailPattern.test(email) || phone.length < 10) {
                showMessage("Please check your details and try again.", "#e74c3c");
                btn.innerHTML = originalText;
                btn.style.opacity = "1";
                return;
            }

            showMessage(`Success! Welcome to Sigma, ${name}.`, "#27ae60");
            btn.innerHTML = "Submitted!";
            form.reset();
        }, 1000);
    });

    function showMessage(msg, color) {
        formMessage.innerText = msg;
        formMessage.style.color = color;
        formMessage.style.marginTop = "15px";
        formMessage.style.textAlign = "center";
        formMessage.style.fontWeight = "bold";
    }
});
window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    
    // Subtle parallax for About boxes
    const boxes = document.querySelectorAll('.about-box-modern');
    boxes.forEach((box, index) => {
        const speed = (index + 1) * 0.1;
        box.style.transform = `translateY(${scrollPos * speed * 0.1}px)`;
    });
});