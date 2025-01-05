document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById("birthday-song");
    const playButton = document.getElementById("play-button");
    const message = document.getElementById("message");

    

    // Play audio when button is clicked
    playButton.addEventListener("click", () => {
        audio.play()
            .then(() => {
                console.log("Audio is playing.");
                 // Hide the button after playing the audio
            })
            .catch(error => {
                console.error("Audio playback failed:", error);
                alert("Please allow audio playback in your browser.");
            });
    });

    // Redirect after audio ends
    audio.addEventListener("ended", () => {
        console.log("Audio ended. Redirecting...");
        window.location.href = "index2.html"; // Replace with your greeting card URL
    });

    // Simulate loading and show the main content
    setTimeout(() => {
        body.classList.add('loaded');
    }, 2000);
});