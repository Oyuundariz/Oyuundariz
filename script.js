// ============================================
// UPDATE Vocational Training Center - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // Sticky Header with Scroll Effect
    // ============================================
    const header = document.getElementById('header');
    
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initial check
    
    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ============================================
    // Modal System
    // ============================================
    const modalButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    // Open modal
    modalButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Close modal with X button
    modalCloseButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    function openModal(modal) {
        modal.style.display = 'flex';
        // Small delay to allow display:flex to apply before adding opacity
        setTimeout(function() {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(function() {
            modal.style.display = 'none';
        }, 300); // Match transition duration
        document.body.style.overflow = '';
    }
    
    // ============================================
    // Training Category Toggle (Accordion)
    // ============================================
    const toggleButtons = document.querySelectorAll('.btn-toggle');
    
    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            
            if (content) {
                // Toggle current content
                content.classList.toggle('active');
                
                // Update button text
                if (content.classList.contains('active')) {
                    this.textContent = 'Багах';
                } else {
                    this.textContent = 'Дэлгэрэнгүй';
                }
            }
        });
    });
    
    // ============================================
    // Branch Selector
    // ============================================
    const branchButtons = document.querySelectorAll('.branch-btn');
    const branchContents = document.querySelectorAll('.branch-content');
    
    branchButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const branchId = this.getAttribute('data-branch');
            
            // Remove active class from all buttons
            branchButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all branch contents
            branchContents.forEach(function(content) {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            
            // Show selected branch content
            const selectedBranch = document.getElementById(branchId);
            if (selectedBranch) {
                selectedBranch.classList.remove('hidden');
                selectedBranch.classList.add('active');
            }
        });
    });
    
    // ============================================
    // Scroll Animations (Fade In on Scroll)
    // ============================================
    const fadeElements = document.querySelectorAll('.card, .goal-card, .training-category, .dormitory-card');
    
    function checkFadeElements() {
        const triggerBottom = window.innerHeight * 0.85;
        
        fadeElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize fade elements with transition
    fadeElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkFadeElements);
    checkFadeElements(); // Initial check
    
    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Goal Section Animation
    // ============================================
    const goalSection = document.querySelector('.goal-section');
    if (goalSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        goalSection.style.opacity = '0';
        goalSection.style.transform = 'translateY(20px)';
        goalSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(goalSection);
    }
    
    // ============================================
    // Section Title Animation
    // ============================================
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(function(title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sectionTitles.forEach(function(title) {
        titleObserver.observe(title);
    });
    
    // ============================================
    // Button Ripple Effect (Optional Enhancement)
    // ============================================
    const buttons = document.querySelectorAll('.btn, .btn-toggle, .branch-btn');
    
    buttons.forEach(function(button) {
        button.addEventListener('mouseenter', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            ripple.style.left = (x - 10) + 'px';
            ripple.style.top = (y - 10) + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c UPDATE Мэргэжил Сургалтын Төв ', 'background: #f97316; color: #fff; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Website successfully loaded! ', 'background: #2563eb; color: #fff; font-size: 14px; padding: 5px; border-radius: 3px;');
});
