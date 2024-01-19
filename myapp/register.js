document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('feedback').textContent = "Registration successful!";
            document.getElementById('feedback').style.color = "green";
            // Optionally redirect to login page or perform other actions on successful registration
        } else {
            document.getElementById('feedback').textContent = data.message || "Registration failed!";
            document.getElementById('feedback').style.color = "red";
        }
    } catch (error) {
        document.getElementById('feedback').textContent = "An error occurred. Please try again.";
        document.getElementById('feedback').style.color = "red";
    }
});
