document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-link, [data-tab]');
    var tabs = document.querySelectorAll('.tab-content');
    var mobileToggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.getElementById('mainNav');

    function switchTab(tabId) {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });

        var target = document.getElementById(tabId);
        if (target) target.classList.add('active');

        document.querySelectorAll('.nav-link[data-tab="' + tabId + '"]').forEach(function (l) {
            l.classList.add('active');
        });

        if (nav) nav.classList.remove('open');

        window.scrollTo({ top: document.querySelector('main').offsetTop - 80, behavior: 'smooth' });
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var tabId = this.getAttribute('data-tab');
            if (tabId) {
                e.preventDefault();
                switchTab(tabId);
            }
        });
    });

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function () {
            nav.classList.toggle('open');
        });
    }

    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var company = document.getElementById('company').value;
            var message = document.getElementById('message').value;

            var subject = 'Consulting Inquiry from ' + name + (company ? ' (' + company + ')' : '');
            var body = 'Name: ' + name + '\nEmail: ' + email + '\nCompany: ' + (company || 'N/A') + '\n\n' + message;

            window.location.href = 'mailto:rbroome454@verizon.net?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        });
    }

    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        var validTabs = ['services', 'experience', 'education', 'contact'];
        if (validTabs.indexOf(hash) !== -1) {
            switchTab(hash);
        }
    }
});
