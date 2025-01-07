function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function () {
    // Select h1, h2, education-item, and experience-item elements
    const elementsToAnimate = document.querySelectorAll(
        "h1, h2, .education-item, .experience-item, .quote-item, .about-item, .dp-item, .qr-container, .gallery img"
    );

    // Add click event listeners to each
    elementsToAnimate.forEach((element) => {
        element.addEventListener("click", function () {
            // Add bounce class
            element.classList.add("bounce");

            // Remove the bounce class after animation ends
            element.addEventListener(
                "animationend",
                () => element.classList.remove("bounce"),
                { once: true } // Ensures listener is removed after execution
            );
        });
    });
});
