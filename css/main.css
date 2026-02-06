// Main JavaScript File for NexGenAiTech
// Updated with Floating Offer Button and User Tracking System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initBackToTop();
    initAnimations();
    initCounters();
    initContactForm();
    initQuickContact();
    initPageTransitions();
    initSocialLinks();
    initUserTracking(); // New: Track user visits
    initFloatingOfferButton(); // New: Initialize floating offer button
});

// ===== User Tracking System =====
function initUserTracking() {
    // Collect user information
    const userData = {
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href,
        referrer: document.referrer || 'Direct',
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        platform: navigator.platform,
        domain: 'nexgenaitech.online',
        visitType: sessionStorage.getItem('returningVisitor') ? 'Returning' : 'New',
        sessionId: generateSessionId()
    };
    
    // Mark as returning visitor for future visits
    if (!sessionStorage.getItem('returningVisitor')) {
        sessionStorage.setItem('returningVisitor', 'true');
        localStorage.setItem('firstVisit', new Date().toISOString());
    }
    
    // Send data to Google Sheets
    sendUserTrackingData(userData);
}

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

async function sendUserTrackingData(data) {
    const trackingScriptURL = 'https://script.google.com/macros/s/AKfycbyhf_9qU9WfDhfSN0i4q6spaoh7UZkK93N6yUzaUQRFI3tSek-_LIOlX5B3yhGliqaf/exec';
    
    try {
        // Send data using fetch with no-cors mode
        await fetch(trackingScriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        console.log('User tracking data sent successfully');
    } catch (error) {
        console.error('Error sending tracking data:', error);
    }
}

// ===== Preloader =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Remove preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// ===== Social Links =====
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        // Add target="_blank" to all social links
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// ===== Navigation =====
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set active nav item based on current page
    setActiveNavItem();
}

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const href = link.getAttribute('href');
        
        if (href === currentPage) {
            item.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            item.classList.add('active');
        }
    });
}

// ===== Back to Top =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Animations =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0';
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseFloat(delay) * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
        el.classList.add('animate-float');
    });
    
    // Hero background animation
    animateHeroBackground();
}

function animateHeroBackground() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.style.animationDelay = `${index * 0.5}s`;
        circle.classList.add('animate-float');
    });
}

// ===== Counter Animation =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const speed = 2000;
                const increment = target / (speed / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(contactForm);
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call - Replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== Quick Contact =====
function initQuickContact() {
    const quickContactBtns = document.querySelectorAll('.whatsapp-btn, .call-btn');
    
    quickContactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add click animation
            btn.classList.add('clicked');
            setTimeout(() => {
                btn.classList.remove('clicked');
            }, 300);
            
            // Open link in new tab for WhatsApp, same tab for call
            if (btn.classList.contains('whatsapp-btn')) {
                window.open(btn.href, '_blank');
            }
        });
    });
}

// ===== Page Transitions =====
function initPageTransitions() {
    const pageLinks = document.querySelectorAll('a[href$=".html"]:not([href^="#"]):not([href^="http"])');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
                return;
            }
            
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Create page transition overlay
            const transition = document.createElement('div');
            transition.className = 'page-transition active';
            document.body.appendChild(transition);
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });
}

// ===== Floating Offer Button =====
function initFloatingOfferButton() {
    const floatingOfferBtn = document.getElementById('floatingOfferBtn');
    const closeOfferBtn = document.getElementById('closeOfferBtn');
    const offerMainBtn = document.getElementById('offerMainBtn');
    const closeTooltip = document.getElementById('closeTooltip');
    const tooltipButton = document.querySelector('.tooltip-button');
    
    // Check if elements exist
    if (!floatingOfferBtn || !offerMainBtn) return;
    
    // Check if user has already closed the offer button
    if (!sessionStorage.getItem('floatingOfferClosed')) {
        // Show floating offer button after 10 seconds
        setTimeout(() => {
            floatingOfferBtn.classList.add('show');
            
            // Add bounce animation to main button
            offerMainBtn.style.animation = 'bounce 2s infinite';
            
            // Remove bounce animation after 10 seconds
            setTimeout(() => {
                offerMainBtn.style.animation = '';
            }, 10000);
        }, 10000);
    }
    
    // Close the entire floating offer button
    if (closeOfferBtn) {
        closeOfferBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            floatingOfferBtn.classList.remove('show');
            sessionStorage.setItem('floatingOfferClosed', 'true');
        });
    }
    
    // Close only the tooltip
    if (closeTooltip) {
        closeTooltip.addEventListener('click', function(e) {
            e.stopPropagation();
            const tooltip = document.querySelector('.offer-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                tooltip.style.transform = 'translateY(20px)';
                
                // Re-enable tooltip after 5 seconds
                setTimeout(() => {
                    tooltip.style.opacity = '';
                    tooltip.style.visibility = '';
                    tooltip.style.transform = '';
                }, 5000);
            }
        });
    }
    
    // Main button click - show tooltip if hidden
    offerMainBtn.addEventListener('click', function() {
        const tooltip = document.querySelector('.offer-tooltip');
        if (tooltip) {
            if (tooltip.style.opacity === '0' || tooltip.style.visibility === 'hidden') {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                tooltip.style.transform = 'translateY(0)';
                
                // Auto-hide tooltip after 10 seconds
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.transform = 'translateY(20px)';
                    
                    // Re-enable hover after 5 seconds
                    setTimeout(() => {
                        tooltip.style.opacity = '';
                        tooltip.style.visibility = '';
                        tooltip.style.transform = '';
                    }, 5000);
                }, 10000);
            }
        }
    });
    
    // Tooltip button click tracking
    if (tooltipButton) {
        tooltipButton.addEventListener('click', function() {
            console.log('User clicked "Get Offer Now" from floating button');
            sessionStorage.setItem('floatingOfferClosed', 'true');
            floatingOfferBtn.classList.remove('show');
        });
    }
    
    // Make tooltip stay open when hovering over it
    const tooltip = document.querySelector('.offer-tooltip');
    if (tooltip) {
        tooltip.addEventListener('mouseenter', function() {
            clearTimeout(window.tooltipTimeout);
        });
        
        tooltip.addEventListener('mouseleave', function() {
            // Start timeout to hide tooltip after leaving
            window.tooltipTimeout = setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                tooltip.style.transform = 'translateY(20px)';
                
                // Re-enable hover after 5 seconds
                setTimeout(() => {
                    tooltip.style.opacity = '';
                    tooltip.style.visibility = '';
                    tooltip.style.transform = '';
                }, 5000);
            }, 3000);
        });
    }
    
    // Auto-hide tooltip after 15 seconds of being open
    let tooltipAutoHideTimeout;
    document.addEventListener('mousemove', function(e) {
        // If mouse is near the offer button or tooltip, reset the timeout
        if (e.target.closest('.floating-offer-btn')) {
            clearTimeout(tooltipAutoHideTimeout);
        } else {
            // If tooltip is visible and mouse is not near it, hide after 15 seconds
            const tooltip = document.querySelector('.offer-tooltip');
            if (tooltip && (tooltip.style.opacity === '1' || window.getComputedStyle(tooltip).opacity === '1')) {
                clearTimeout(tooltipAutoHideTimeout);
                tooltipAutoHideTimeout = setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.transform = 'translateY(20px)';
                    
                    // Re-enable hover after 5 seconds
                    setTimeout(() => {
                        tooltip.style.opacity = '';
                        tooltip.style.visibility = '';
                        tooltip.style.transform = '';
                    }, 5000);
                }, 15000);
            }
        }
    });
    
    // Show floating button on scroll (after 30% scroll)
    window.addEventListener('scroll', function() {
        if (!sessionStorage.getItem('floatingOfferClosed') && 
            !floatingOfferBtn.classList.contains('show')) {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercentage > 30) {
                floatingOfferBtn.classList.add('show');
                
                // Remove scroll listener after showing
                window.removeEventListener('scroll', arguments.callee);
            }
        }
    });
    
    // Add click animation to main button
    offerMainBtn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    offerMainBtn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    offerMainBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add slideIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== Utility Functions =====

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Add error message
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'This field is required';
                errorMsg.style.color = '#ff6b6b';
                errorMsg.style.fontSize = '0.8rem';
                errorMsg.style.marginTop = '5px';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
        } else {
            input.classList.remove('error');
            
            // Remove error message
            if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                input.nextElementSibling.remove();
            }
        }
    });
    
    return isValid;
}

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Initialize ripple effect on all buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

// Dark/Light theme toggle (optional)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle icon
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    });
}

// Initialize ripple effect and theme toggle
document.addEventListener('DOMContentLoaded', function() {
    initRippleEffect();
    initThemeToggle();
});
