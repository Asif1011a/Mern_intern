// Contact page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const contactForm = document.getElementById('contactForm');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    // Add floating label effect
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.transform = 'translateY(-20px) scale(0.8)';
                label.style.color = 'var(--primary-color)';
            }
        });

        input.addEventListener('blur', () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL' && !input.value) {
                label.style.transform = 'translateY(0) scale(1)';
                label.style.color = 'var(--text-secondary)';
            }
        });

        // Real-time validation
        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formData = new FormData(this);
            
            // Validate all fields
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showNotification('Message sent successfully! I will get back to you soon.', 'success');
                    this.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Reset labels
                    formInputs.forEach(input => {
                        const label = input.previousElementSibling;
                        if (label && label.tagName === 'LABEL') {
                            label.style.transform = 'translateY(0) scale(1)';
                            label.style.color = 'var(--text-secondary)';
                        }
                    });
                }, 2000);
            } else {
                showNotification('Please fill in all fields correctly.', 'error');
            }
        });
    }

    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error styles
        field.style.borderBottomColor = 'var(--border-color)';
        
        if (!value) {
            isValid = false;
            field.style.borderBottomColor = '#ef4444';
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                field.style.borderBottomColor = '#ef4444';
            }
        }
        
        if (isValid) {
            field.style.borderBottomColor = 'var(--primary-color)';
        }
        
        return isValid;
    }

    // Contact method hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'translateX(15px)';
        });
        
        method.addEventListener('mouseleave', () => {
            method.style.transform = 'translateX(0)';
        });
    });

    // Floating contact button
    const floatingBtn = document.getElementById('floatingBtn');
    const floatingMenu = document.getElementById('floatingMenu');
    
    if (floatingBtn && floatingMenu) {
        floatingBtn.addEventListener('click', () => {
            floatingMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!floatingBtn.contains(e.target) && !floatingMenu.contains(e.target)) {
                floatingMenu.classList.remove('active');
            }
        });
    }

    // Animate contact methods on scroll
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-30px)';
        method.style.transition = `all 0.6s ease ${index * 0.1}s`;
        contactObserver.observe(method);
    });

    // Form container animation
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(30px)';
        formContainer.style.transition = 'all 0.8s ease 0.3s';
        
        contactObserver.observe(formContainer);
    }
});

// Enhanced notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        ${type === 'success' ? 'background: linear-gradient(135deg, #10b981, #059669);' : 'background: linear-gradient(135deg, #ef4444, #dc2626);'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}