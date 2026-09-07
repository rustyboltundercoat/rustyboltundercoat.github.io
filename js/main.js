/* --- JAVASCRIPT LOGIC --- */

document.addEventListener('DOMContentLoaded', () => {

    // FORCE HERO TEXT VISIBLE
    setTimeout(() => {
        const heroText = document.getElementById("homeText");
        
        // Make it fully visible instantly so it isn't invisible upon load
        if (!heroText) return;
        
        heroText.style.opacity = "1";
        heroText.style.transform = "translateY(0)";

        // Adds a parallax movement when scrolling down
        const handleScroll = () => {
            let scrollPosition = window.pageYOffset;
            
            if (scrollPosition > 50) {
                heroText.style.opacity = 1 - (scrollPosition / 700); // Fade out slightly
                heroText.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            } else {
                heroText.style.opacity = "1";
                heroText.style.transform = "translateY(0)";
            }
        };

        window.addEventListener('scroll', handleScroll);
    }, 500); // Run this logic half a second after page load

    // --- CONTACT FORM ---

const form = document.getElementById("contact-form");

if (form) {
    const result = document.getElementById("form-result");
    const button = document.getElementById("submit-button");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        button.disabled = true;
        button.textContent = "SENDING...";
        result.style.display = "none";

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: json
                }
            );

            const data = await response.json();

            if (data.success) {
                form.reset();

                button.style.display = "none";

                result.style.display = "block";
                result.innerHTML = `
                    <div class="form-success">
                        <h3>Message Sent!</h3>
                        <p>
                            Thank you for contacting us.
                            We'll get back to you as soon as possible.
                        </p>
                    </div>
                `;
            } else {
                result.style.display = "block";
                result.textContent =
                    data.message || "Something went wrong. Please try again.";

                button.disabled = false;
                button.textContent = "SEND MESSAGE";
            }

        } catch (error) {
            result.style.display = "block";
            result.textContent =
                "Something went wrong. Please try again.";

            button.disabled = false;
            button.textContent = "SEND MESSAGE";

            console.error("Contact form error:", error);
        }
    });
}


 // --- MOBILE NAVIGATION ---

    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

    if (menuToggle && mobileNav) {

        // Open / close menu
        menuToggle.addEventListener("click", () => {

            const isOpen = mobileNav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });


        // Close menu when a navigation link is clicked
        mobileNavLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");

            });

        });


        // Close menu if the user resizes back to desktop
        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                mobileNav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");

            }

        });

    }

});
