// Contact form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const nameInput = document.querySelector('[data-testid="test-contact-name"]');
    const emailInput = document.querySelector('[data-testid="test-contact-email"]');
    const subjectInput = document.querySelector('[data-testid="test-contact-subject"]');
    const messageInput = document.querySelector('[data-testid="test-contact-message"]');
    const submitButton = document.querySelector('[data-testid="test-contact-submit"]');
    const successMessage = document.querySelector('[data-testid="test-contact-success"]');

    // Error message containers
    const nameError = document.querySelector('[data-testid="test-contact-error-name"]');
    const emailError = document.querySelector('[data-testid="test-contact-error-email"]');
    const subjectError = document.querySelector('[data-testid="test-contact-error-subject"]');
    const messageError = document.querySelector('[data-testid="test-contact-error-message"]');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear error message
    function clearError(errorElement) {
        errorElement.textContent = '';
        errorElement.parentElement.classList.remove('error');
        const input = errorElement.parentElement.querySelector('input, textarea');
        if (input) {
            input.setAttribute('aria-invalid', 'false');
        }
    }

    // Show error message
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.parentElement.classList.add('error');
        const input = errorElement.parentElement.querySelector('input, textarea');
        if (input) {
            input.setAttribute('aria-invalid', 'true');
        }
    }

    // Validate individual fields
    function validateName() {
        const value = nameInput.value.trim();
        if (!value) {
            showError(nameError, 'Full name is required.');
            return false;
        }
        clearError(nameError);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (!value) {
            showError(emailError, 'Email address is required.');
            return false;
        }
        if (!emailRegex.test(value)) {
            showError(emailError, 'Please enter a valid email address (name@example.com).');
            return false;
        }
        clearError(emailError);
        return true;
    }

    function validateSubject() {
        const value = subjectInput.value.trim();
        if (!value) {
            showError(subjectError, 'Subject is required.');
            return false;
        }
        clearError(subjectError);
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (!value) {
            showError(messageError, 'Message is required.');
            return false;
        }
        if (value.length < 10) {
            showError(messageError, 'Message must be at least 10 characters long.');
            return false;
        }
        clearError(messageError);
        return true;
    }

    // Real-time validation on blur
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);

    // Real-time validation on input for message length
    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim().length >= 10) {
            clearError(messageError);
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Hide success message if visible
        successMessage.style.display = 'none';

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        // If all fields are valid, show success message
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Clear form
            form.reset();
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Focus on success message for accessibility
            successMessage.setAttribute('tabindex', '-1');
            successMessage.focus();
            
            // Remove tabindex after focus
            setTimeout(() => {
                successMessage.removeAttribute('tabindex');
            }, 100);
        } else {
            // Focus on first error field
            const firstErrorField = form.querySelector('.error input, .error textarea');
            if (firstErrorField) {
                firstErrorField.focus();
            }
        }
    });

    // Clear errors when user starts typing
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            const errorElement = document.querySelector(`[data-testid="test-contact-error-${this.id.replace('contact-', '')}"]`);
            if (errorElement && errorElement.textContent) {
                // Only clear if user has typed something
                if (this.value.trim().length > 0) {
                    clearError(errorElement);
                }
            }
        });
    });
});