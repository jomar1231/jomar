// Handle Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const messageDiv = document.getElementById('formMessage');

    // Simple validation
    if (!name || !email || !subject || !message) {
        messageDiv.textContent = 'Please fill in all required fields.';
        messageDiv.className = 'form-message error';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.className = 'form-message error';
        return;
    }

    // Get existing messages from localStorage
    let contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    // Create message object
    const contactMessage = {
        id: 'MSG-' + String(contactMessages.length + 1).padStart(3, '0'),
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        status: 'new'
    };

    // Save to localStorage
    contactMessages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

    // Show success message
    messageDiv.textContent = 'Thank you for your message! We will get back to you soon.';
    messageDiv.className = 'form-message success';

    // Reset form
    document.getElementById('contactForm').reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.className = 'form-message';
    }, 5000);
});

// Alternative: If you want to send to a backend
/*
async function sendContactForm(data) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            return { success: true, message: 'Message sent successfully!' };
        } else {
            return { success: false, message: 'Failed to send message. Please try again.' };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}
*/
