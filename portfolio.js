document.addEventListener("DOMContentLoaded", function () {
    const text = " a robotic enthusiast too ⚡︎";
    const textElement = document.getElementById("animated-text");
    const imageElement = document.getElementById("animated-image");
    let index = 0;

    function typeText() {
        if (index < text.length) {
            textElement.innerHTML += text[index];
            index++;
            setTimeout(typeText, 70); // Typing effect speed
        } else {
            setTimeout(() => {
                imageElement.style.display = "block";
                imageElement.style.opacity = "1"; // Smooth fade-in
            }, 500); // 500ms delay after text finishes
        }
    }

    function checkScroll() {
        const position = textElement.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (position < screenHeight / 1.3 && index === 0) {
            typeText();
        }
    }

    window.addEventListener("scroll", checkScroll);
});




const modal = document.getElementById("contact-modal");
    const openModalBtn = document.getElementById("get-in-touch-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");

    // Open the modal
    openModalBtn.onclick = function() {
        modal.style.display = "flex"; // Show modal
    }

    // Close the modal
    closeModalBtn.onclick = function() {
        modal.style.display = "none"; // Hide modal
    }

    // Close the modal if clicked outside the modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Hide modal if clicked outside
        }
    }





