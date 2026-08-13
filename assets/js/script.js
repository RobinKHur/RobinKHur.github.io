/*=============== SHOW MOBILE MENU ===============*/
const navMenu = document.getElementById('nav-list');
const navMenuBtn = document.getElementById('nav-menu-btn');
const navCloseBtn = document.getElementById('nav-close-btn');

if (navMenu && navMenuBtn) {
    navMenuBtn.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navMenu && navCloseBtn) {
    navCloseBtn.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== CLOSE MENU ON LINK CLICK ===============*/
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }
    });
});

/*=============== SHADOW HEADER ON SCROLL ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY >= 50) {
        header.classList.add('shadow-header');
    } else {
        header.classList.remove('shadow-header');
    }
};
window.addEventListener('scroll', shadowHeader, { passive: true });

/*=============== SHOW SCROLL-UP BUTTON ===============*/
const scrollUp = document.getElementById('scrollup');
const scrollUpToggle = () => {
    if (!scrollUp) return;
    if (window.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
};
window.addEventListener('scroll', scrollUpToggle, { passive: true });

/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');
const scrollActive = () => {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);
        if (!link) return;
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive, { passive: true });

/*=============== ACCESSIBILITY: Escape closes mobile menu ===============*/
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        if (navMenuBtn) navMenuBtn.focus();
    }
});

/*=============== CAD EXPERIENCE IMAGE POP-UP ===============*/
const cadModal = document.getElementById('cad-modal');
const cadModalImage = cadModal ? cadModal.querySelector('.cad__modal-image') : null;
const cadModalDoc = cadModal ? cadModal.querySelector('.cad__modal-doc') : null;
const cadModalLink = cadModal ? cadModal.querySelector('.cad__modal-link') : null;
const cadModalTitle = cadModal ? cadModal.querySelector('.cad__modal-title') : null;
const cadModalDesc = cadModal ? cadModal.querySelector('.cad__modal-description') : null;
const cadModalCloseBtn = cadModal ? cadModal.querySelector('.cad__modal-close') : null;

const openCadModal = (card) => {
    if (!cadModal || !cadModalTitle) return;
    const src = card.dataset.image || '';
    const isPdf = src.toLowerCase().endsWith('.pdf');
    // PDFs render in an embedded viewer; everything else uses the <img>.
    if (cadModalImage) {
        cadModalImage.style.display = isPdf ? 'none' : '';
        if (!isPdf) {
            cadModalImage.src = src;
        } else {
            cadModalImage.removeAttribute('src');
        }
        cadModalImage.alt = card.dataset.title || '';
    }
    if (cadModalDoc) {
        cadModalDoc.hidden = !isPdf;
        cadModalDoc.src = isPdf ? src : '';
    }
    // Fallback link so the PDF is always reachable, even in browsers that block PDFs in iframes.
    if (cadModalLink) {
        cadModalLink.hidden = !isPdf;
        cadModalLink.href = isPdf ? src : '#';
    }
    cadModalTitle.textContent = card.dataset.title || '';
    if (cadModalDesc) cadModalDesc.textContent = card.dataset.description || '';
    cadModal.setAttribute('aria-hidden', 'false');
    cadModal.classList.add('show');
    document.body.classList.add('modal-open');
    if (cadModalCloseBtn) cadModalCloseBtn.focus();
};

const closeCadModal = () => {
    if (!cadModal) return;
    cadModal.classList.remove('show');
    cadModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (cadModalImage) cadModalImage.src = '';
    if (cadModalDoc) cadModalDoc.src = '';
    if (cadModalLink) cadModalLink.href = '#';
};

document.querySelectorAll('.cad__card').forEach((card) => {
    card.addEventListener('click', () => openCadModal(card));
});

if (cadModal) {
    cadModal.querySelectorAll('[data-cad-close]').forEach((el) => {
        el.addEventListener('click', closeCadModal);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && cadModal.classList.contains('show')) {
            closeCadModal();
        }
    });
}
