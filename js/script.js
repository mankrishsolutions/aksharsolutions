(function () {
    // Page load animation
    window.addEventListener('load', function () {
        document.body.classList.remove('loading');
    });

    // Dark mode
    var toggle = document.getElementById('darkModeToggle');
    var body = document.body;

    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        toggle.checked = true;
    }

    toggle.addEventListener('change', function () {
        body.classList.toggle('dark-mode', toggle.checked);
        localStorage.setItem('darkMode', toggle.checked);
    });

    // Navbar scroll effects
    var navbar = document.querySelector('.navbar');
    var hero = document.querySelector('.hero');
    var goToTop = document.getElementById('goToTop');
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', function () {
        var heroBottom = hero.offsetTop + hero.offsetHeight;
        var scrollY = window.scrollY;
        var atBottom = (window.innerHeight + scrollY) >= (document.body.offsetHeight - 50);

        // Solidify navbar
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Go to top
        if (scrollY > heroBottom) {
            goToTop.classList.add('visible');
        } else {
            goToTop.classList.remove('visible');
        }

        // Active nav link
        var current = '';

        if (atBottom) {
            var lastSection = sections[sections.length - 1];
            if (lastSection) current = lastSection.getAttribute('id');
        } else {
            sections.forEach(function (section) {
                var top = section.offsetTop - 120;
                if (scrollY >= top) {
                    current = section.getAttribute('id');
                }
            });
        }

        navAnchors.forEach(function (a) {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    });

    goToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hamburger menu
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Scroll reveal
    var reveals = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) {
        revealObserver.observe(el);
    });

    // Stats counter animation
    var statNumbers = document.querySelectorAll('.stat-number');
    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-target'));
                var duration = 2000;
                var startTime = null;

                function animate(currentTime) {
                    if (!startTime) startTime = currentTime;
                    var progress = Math.min((currentTime - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target).toLocaleString();
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = target.toLocaleString();
                    }
                }

                requestAnimationFrame(animate);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
        statsObserver.observe(el);
    });

    // Demo form
    var demoForm = document.getElementById('demoForm');
    demoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('demoName').value.trim();
        var phone = document.getElementById('demoPhone').value.trim();
        var company = document.getElementById('demoCompany').value.trim();
        var product = document.getElementById('demoProduct').value;
        var message = document.getElementById('demoMessage').value.trim();

        var text = 'Hi, I would like to request a demo.\n\n';
        text += 'Name: ' + name + '\n';
        text += 'Phone: ' + phone + '\n';
        if (company) text += 'Company: ' + company + '\n';
        if (product) text += 'Product: ' + product + '\n';
        if (message) text += 'Message: ' + message + '\n';

        var url = 'https://wa.me/919373334089?text=' + encodeURIComponent(text);
        window.open(url, '_blank');
    });
})();

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(function (overlay) {
        overlay.classList.remove('active');
    });
}

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
});

var mouseOverModal = false;

document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('mouseenter', function () { mouseOverModal = true; });
    modal.addEventListener('mouseleave', function () { mouseOverModal = false; });
});

window.addEventListener('scroll', function () {
    if (!mouseOverModal) closeAllModals();
});

function copyToClipboard(text, el) {
    navigator.clipboard.writeText(text).then(function () {
        var toast = document.getElementById('copiedToast');
        toast.classList.add('show');
        setTimeout(function () {
            toast.classList.remove('show');
        }, 2000);
    });
}
