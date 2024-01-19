document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('feedback').textContent = "Login successful!";
            document.getElementById('feedback').style.color = "green";
            window.location.href = 'http://localhost:3000/static/index.html';
        } else {
            document.getElementById('feedback').textContent = data.message || "Login failed!";
            document.getElementById('feedback').style.color = "red";
        }
    } catch (error) {
        document.getElementById('feedback').textContent = "An error occurred. Please try again.";
        document.getElementById('feedback').style.color = "red";
    }
});
