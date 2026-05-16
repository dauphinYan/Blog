/**
 * Claude风格个人主页 - 交互脚本
 * 实现滚动动画、导航交互、平滑滚动等功能
 */

// ============================================
// 工具函数
// ============================================

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// 滚动动画系统
// ============================================

class ScrollAnimator {
    constructor() {
        this.elements = [];
        this.observer = null;
        this.init();
    }

    init() {
        // 创建Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // 可选：动画完成后停止观察
                        // this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.1
            }
        );

        // 观察所有动画元素
        this.observeElements();
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('.animate-fade-up');
        animatedElements.forEach(el => {
            this.observer.observe(el);
        });
    }

    // 重新观察元素（用于动态内容）
    refresh() {
        this.observeElements();
    }
}

// ============================================
// 导航控制器
// ============================================

class NavController {
    constructor() {
        this.nav = document.querySelector('.top-nav');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-link');
        this.lastScrollY = 0;
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        // 绑定事件
        this.bindEvents();
        
        // 初始化导航状态
        this.updateNavState();
    }

    bindEvents() {
        // 滚动事件
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, 100));

        // 移动端菜单按钮
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // 导航链接点击
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e, link);
            });
        });

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.mobileMenu.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // ESC键关闭菜单
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // 添加/移除滚动背景
        if (currentScrollY > 10) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
        
        this.lastScrollY = currentScrollY;
        this.updateActiveLink();
    }

    updateNavState() {
        this.updateActiveLink();
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 移除所有活动状态
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // 添加当前活动状态
                const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
                activeLinks.forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMenuOpen = true;
        this.mobileMenu.classList.add('active');
        this.mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileMenu.classList.remove('active');
        this.mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 关闭移动菜单
                if (this.isMenuOpen) {
                    this.closeMobileMenu();
                }
                
                // 平滑滚动
                this.smoothScrollTo(targetElement);
            }
        }
    }

    smoothScrollTo(element) {
        const navHeight = this.nav.offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// ============================================
// 卡片交互增强
// ============================================

class CardInteractor {
    constructor() {
        this.init();
    }

    init() {
        this.addRippleEffect();
        this.addTiltEffect();
    }

    addRippleEffect() {
        const cards = document.querySelectorAll('.interest-card, .work-card, .blog-item');
        
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.createRipple(e, card);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(204, 120, 92, 0.1);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addTiltEffect() {
        const cards = document.querySelectorAll('.interest-card, .work-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                this.handleTilt(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetTilt(card);
            });
        });
    }

    handleTilt(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }

    resetTilt(element) {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
}

// ============================================
// 打字机效果
// ============================================

class Typewriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isDeleting = false;
        this.currentText = '';
        
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const current = this.index % this.text.length;
        const fullText = this.text[current];
        
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }
        
        this.element.textContent = this.currentText;
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.currentText === fullText) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.index++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// 进度条动画
// ============================================

class ProgressBarAnimator {
    constructor() {
        this.init();
    }

    init() {
        this.animateOnScroll();
    }

    animateOnScroll() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    progressBar.style.width = targetWidth + '%';
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }
}

// ============================================
// 返回顶部按钮
// ============================================

class BackToTop {
    constructor() {
        this.button = null;
        this.init();
    }

    init() {
        this.createButton();
        this.bindEvents();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.innerHTML = '↑';
        this.button.setAttribute('aria-label', '返回顶部');
        this.button.style.cssText = `
            position: fixed;
            bottom: 32px;
            right: 32px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: var(--primary);
            color: var(--on-primary);
            border: none;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(204, 120, 92, 0.3);
        `;
        
        document.body.appendChild(this.button);
    }

    bindEvents() {
        window.addEventListener('scroll', throttle(() => {
            this.toggleVisibility();
        }, 100));
        
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    toggleVisibility() {
        if (window.scrollY > 500) {
            this.button.style.opacity = '1';
            this.button.style.visibility = 'visible';
        } else {
            this.button.style.opacity = '0';
            this.button.style.visibility = 'hidden';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ============================================
// 懒加载图片
// ============================================

class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.lazyLoadImages();
        } else {
            this.loadAllImages();
        }
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
    }

    loadAllImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => this.loadImage(img));
    }
}

// ============================================
// 表单验证（如果有联系表单）
// ============================================

class FormValidator {
    constructor(form) {
        this.form = form;
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });
            
            this.addInputListeners();
        }
    }

    addInputListeners() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = '此字段为必填项';
        } else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = '请输入有效的邮箱地址';
            }
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }
        
        return isValid;
    }

    showError(field, message) {
        this.clearError(field);
        
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--error);
            font-size: 12px;
            margin-top: 4px;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // 提交表单
            console.log('表单验证通过，可以提交');
            // this.form.submit();
        }
    }
}

// ============================================
// 主应用初始化
// ============================================

class App {
    constructor() {
        this.scrollAnimator = null;
        this.navController = null;
        this.cardInteractor = null;
        this.backToTop = null;
        this.lazyLoader = null;
        
        this.init();
    }

    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // 初始化各个组件
        this.scrollAnimator = new ScrollAnimator();
        this.navController = new NavController();
        this.cardInteractor = new CardInteractor();
        this.backToTop = new BackToTop();
        this.lazyLoader = new LazyLoader();
        
        // 添加ripple动画样式
        this.addRippleStyles();
        
        // 初始化表单验证（如果存在联系表单）
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            new FormValidator(contactForm);
        }
        
        console.log('✨ Claude风格个人主页初始化完成');
    }

    addRippleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// 启动应用
// ============================================

const app = new App();

// 导出供外部使用
window.ClaudeApp = {
    app,
    ScrollAnimator,
    NavController,
    CardInteractor,
    Typewriter,
    ProgressBarAnimator,
    BackToTop,
    LazyLoader,
    FormValidator
};
