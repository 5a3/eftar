// scripts.js

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المود الافتراضي
    initTheme();
    
    // تهيئة العداد التنازلي
    initCountdown();
    
    // تهيئة التنقل السلس
    initSmoothScroll();
    
    // تهيئة القائمة المتنقلة
    initMobileMenu();
    
    // تهيئة زر العودة للأعلى
    initBackToTop();
    
    // تهيئة أنيميشن العناصر عند الظهور
    initScrollAnimations();
});

/* ===== نظام المود الليلي والصباحي ===== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const themeText = themeToggleBtn.querySelector('.theme-text');
    
    // التحقق من التفضيل المحفوظ
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // حدث النقر على زر تبديل المود
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // أنيميشن للنقر
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'الوضع الصباحي';
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'الوضع الليلي';
        }
    }
}

/* ===== العداد التنازلي ===== */
function initCountdown() {
    // تاريخ الإفطار القادم (10 مارس 2026)
    const targetDate = new Date('March 10, 2026 18:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft < 0) {
            document.getElementById('countdown').innerHTML = '<h3>لقد حان وقت الإفطار!</h3>';
            return;
        }
        
        // حساب الأيام، الساعات، الدقائق، الثواني
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // تحديث العناصر
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // أنيميشن عند تغيير الأرقام
        if (seconds === 59) {
            animateCountdownItem('seconds');
        }
        if (minutes === 59 && seconds === 59) {
            animateCountdownItem('minutes');
        }
        if (hours === 23 && minutes === 59 && seconds === 59) {
            animateCountdownItem('hours');
        }
        if (days > 0 && hours === 23 && minutes === 59 && seconds === 59) {
            animateCountdownItem('days');
        }
    }
    
    function animateCountdownItem(id) {
        const element = document.getElementById(id);
        element.style.transform = 'scale(1.2)';
        element.style.color = 'var(--secondary-color)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 300);
    }
    
    // تحديث العد التنازلي كل ثانية
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ===== التنقل السلس ===== */
function initSmoothScroll() {
    // روابط التنقل
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                closeMobileMenu();
                
                // التمرير السلس
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===== القائمة المتنقلة ===== */
function initMobileMenu() {
    const mobileMenuOpen = document.getElementById('mobile-menu-open');
    const mobileMenuClose = document.querySelector('.mobile-menu-overlay');
    const closeButton = document.querySelector('.close-mobile-menu');
    
    // فتح القائمة
    mobileMenuOpen.addEventListener('click', function() {
        openMobileMenu();
    });
    
    // إغلاق القائمة
    closeButton.addEventListener('click', closeMobileMenu);
    mobileMenuClose.addEventListener('click', function(e) {
        if (e.target === mobileMenuClose) {
            closeMobileMenu();
        }
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.mobile-menu-content a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function openMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    mobileMenu.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // أنيميشن للقائمة
    setTimeout(() => {
        mobileMenu.querySelector('.mobile-menu-content').style.transform = 'translateX(0)';
    }, 10);
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    mobileMenu.querySelector('.mobile-menu-content').style.transform = 'translateX(100%)';
    
    setTimeout(() => {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

/* ===== زر العودة للأعلى ===== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== أنيميشن العناصر عند التمرير ===== */
function initScrollAnimations() {
    // استخدام Intersection Observer للكشف عن ظهور العناصر
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated');
                
                // تحديد نوع الأنيميشن بناءً على فئة العنصر
                if (entry.target.classList.contains('animate__fadeInLeft')) {
                    entry.target.classList.add('animate__fadeInLeft');
                } else if (entry.target.classList.contains('animate__fadeInRight')) {
                    entry.target.classList.add('animate__fadeInRight');
                } else if (entry.target.classList.contains('animate__fadeInUp')) {
                    entry.target.classList.add('animate__fadeInUp');
                } else if (entry.target.classList.contains('animate__zoomIn')) {
                    entry.target.classList.add('animate__zoomIn');
                }
                
                // إيقاف المراقبة بعد التنشيط
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر التي تحتاج لأنيميشن
    document.querySelectorAll('.animate__animated').forEach(element => {
        observer.observe(element);
    });
    
    // أنيميشن للتنقل عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 20px var(--shadow-color)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px var(--shadow-color)';
        }
    });
}

/* ===== تأثيرات إضافية ===== */
// تأثير Hover للبطاقات
document.querySelectorAll('.goal-card, .event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// تأثير النقر على الأزرار
document.querySelectorAll('button, .btn, .event-link').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// تحديث السنة الحالية في التذييل
document.getElementById('current-year').textContent = new Date().getFullYear();