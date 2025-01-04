
(function() {
    emailjs.init("59dg56bFBgGKAQAdD"); // Initialize EmailJS with your public key
})();

document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already sent the message
    if (localStorage.getItem('hireMessageSent') === 'true') {
        // Hide the form and show success message
        document.getElementById('hire-me-form').style.display = 'none';
        document.getElementById('loader').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
    } else {
        // Show the form
        document.getElementById('hire-me-form').style.display = 'block';
    }

    // Listen for the form submission
    document.getElementById("hire-me-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Show loader
        document.getElementById("loader").style.display = "block";

        // Ensure the message has at least 3 words
        var message = document.getElementById("message").value.trim();
        var wordCount = message.split(/\s+/).filter(Boolean).length;  // Split by spaces, filter out empty entries

        if (wordCount < 10) {
            alert("Please enter more words in the message.");
            document.getElementById("loader").style.display = "none"; // Hide loader
            return;
        }

        // Get the form data
        var formData = {
            to_name: "Akash Maji",
            subject: "HIRING REQUEST",
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            message: message,
            reply_to: document.getElementById("email").value
        };

        // Send the email directly using emailjs.send (use your template ID)
        emailjs.send("service_akashmaji945", "template_xz6re3g", formData)
            .then(function(response) {
                alert("SUCCESS: Hire Message Sent!");
                // Save state in localStorage
                localStorage.setItem('hireMessageSent', 'true');
            }, function(error) {
                alert("FAILED: Not Sent!");
            })
            .finally(function() {
                // Hide loader after response is received
                document.getElementById("loader").style.display = "none";
                document.getElementById("hire-me-form").style.display = "none";
                document.getElementById("success-message").style.display = "block";
            });
    });
});

// Simple function to scroll back to top
function goHome() {
    window.location.href = 'index.html';
}
