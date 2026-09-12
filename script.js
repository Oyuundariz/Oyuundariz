// ============================================
// UPDATE МЭРГЭЖИЛ СУРГАЛТЫН ТӨВ - SCRIPT.JS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !nav.contains(event.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // STICKY HEADER
    // ============================================
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ============================================
    // ACTIVE NAVIGATION LINK
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
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
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ============================================
    // MODAL SYSTEM
    // ============================================
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // Open modal
    modalTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal with X button
    modalCloses.forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
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
    
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // ============================================
    // BRANCH TABS
    // ============================================
    const branchTabs = document.querySelectorAll('.branch-tab');
    const branchInfos = document.querySelectorAll('.branch-info');
    
    branchTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const branchId = this.getAttribute('data-branch');
            
            // Remove active class from all tabs and infos
            branchTabs.forEach(function(t) {
                t.classList.remove('active');
            });
            branchInfos.forEach(function(info) {
                info.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding info
            this.classList.add('active');
            const targetInfo = document.getElementById(branchId);
            if (targetInfo) {
                targetInfo.classList.add('active');
            }
        });
    });
    
    // ============================================
    // SCROLL ANIMATIONS (FADE IN)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFadeElements() {
        const triggerBottom = window.innerHeight * 0.85;
        
        fadeElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkFadeElements);
    checkFadeElements(); // Check on initial load
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // CARD HOVER EFFECTS ENHANCEMENT
    // ============================================
    const cards = document.querySelectorAll('.about-card, .principle-card, .dormitory-card, .goal-card, .training-item');
    
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                checkFadeElements();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, false);
    
    // ============================================
    // INITIALIZE
    // ============================================
    console.log('UPDATE МЭРГЭЖИЛ СУРГАЛТЫН ТӨВ - Website loaded successfully');
    
});
