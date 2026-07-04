// Toggle Mobile Navigation Menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('change'));
});

// Smooth Nav Link Highlighting while Scrolling
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Typing animation for hero subtitle
const typedTextElement = document.getElementById('typed-text');
const titles = [
    'Software Engineer',
    'Java Backend Developer',
    'Full-Stack Developer',
    'Machine Learning Enthusiast'
];
let titleIndex = 0;
let charIndex = 0;
let typingDelay = 90;
let erasingDelay = 40;
let nextTitleDelay = 1800;

function typeTitle() {
    if (!typedTextElement) return;
    if (charIndex < titles[titleIndex].length) {
        typedTextElement.textContent += titles[titleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeTitle, typingDelay);
    } else {
        setTimeout(eraseTitle, nextTitleDelay);
    }
}

function eraseTitle() {
    if (!typedTextElement) return;
    if (charIndex > 0) {
        typedTextElement.textContent = titles[titleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseTitle, erasingDelay);
    } else {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeTitle, typingDelay);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (typedTextElement) {
        setTimeout(typeTitle, nextTitleDelay / 2);
    }
});

// Contact form sends messages directly from the webpage via a hosted form service
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        const formData = {
            name: contactForm.elements.name.value.trim(),
            email: contactForm.elements.email.value.trim(),
            subject: contactForm.elements.subject.value.trim(),
            message: contactForm.elements.message.value.trim(),
            _captcha: 'false',
            _subject: `New portfolio message from ${contactForm.elements.name.value.trim()}`
        };

        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        try {
            const response = await fetch('https://formsubmit.co/ajax/thotasaivenkat27@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Your message has been sent successfully.');
                contactForm.reset();
            } else {
                throw new Error('Unable to send message right now.');
            }
        } catch (error) {
            alert('Sorry, something went wrong. Please try again later.');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}