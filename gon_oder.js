 // gon
        // Function to check if the user has registered or not
        function checkUserRegistration() {
            const isRegistered = localStorage.getItem('isRegistered');
            
            // If the user hasn't registered, redirect to the registration page
            if (!isRegistered) {
                // Set a 10-second timer to check if user is staying
                setTimeout(() => {
                    // Redirect to registration page if the user hasn't registered
                    window.location.href = "ragistretion.html"; // Replace with your registration page URL
                }, 0); // 10000 milliseconds = 10 seconds
            }
        }
        
        // Call the function on page load
        window.onload = checkUserRegistration;