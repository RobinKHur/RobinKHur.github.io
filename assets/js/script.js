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
const cadModalLink = cadModal ? cadModal.querySelector('.cad__modal-link') : null;
const cadModalTitle = cadModal ? cadModal.querySelector('.cad__modal-title') : null;
const cadModalDesc = cadModal ? cadModal.querySelector('.cad__modal-description') : null;
const cadModalCloseBtn = cadModal ? cadModal.querySelector('.cad__modal-close') : null;

// PDF.js is loaded lazily from a CDN (matching the site's existing CDN usage —
// Google Fonts, Remixicon) and only for PDF entries like the SW certificate.
const PDFJS_CORE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const loadPdfJs = () => new Promise((resolve, reject) => {
    if (window.pdfjsLib) return resolve(window.pdfjsLib);
    const script = document.createElement('script');
    script.src = PDFJS_CORE_URL;
    script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js'));
    document.head.appendChild(script);
});

// Renders the first page of a PDF to a PNG data URL so it displays as a plain
// image — no browser PDF viewer toolbar. ~1600px wide keeps text crisp on retina.
const renderPdfToDataUrl = async (pdfUrl) => {
    const pdfjsLib = await loadPdfJs();
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);
    const scale = 1600 / page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    return canvas.toDataURL('image/png');
};

// Guards against a stale render landing after the modal was closed or reopened.
let cadRenderToken = 0;

const openCadModal = (card) => {
    if (!cadModal || !cadModalTitle) return;
    const src = card.dataset.image || '';
    const isPdf = src.toLowerCase().endsWith('.pdf');
    // PDFs are rendered to an image so the certificate's own border becomes the
    // image's border (no PDF toolbar); everything else uses the <img> directly.
    if (cadModalImage) {
        cadModalImage.classList.toggle('cad__modal-image--doc', isPdf);
        cadModalImage.src = '';
        cadModalImage.alt = card.dataset.title || '';
        cadModalImage.style.display = '';
        if (isPdf) {
            const token = ++cadRenderToken;
            renderPdfToDataUrl(src)
                .then((dataUrl) => {
                    if (cadModal.classList.contains('show') && token === cadRenderToken) {
                        cadModalImage.src = dataUrl;
                    }
                })
                .catch(() => {
                    // Rendering failed; keep the image hidden — the Open PDF link still works.
                    cadModalImage.style.display = 'none';
                });
        } else {
            cadModalImage.src = src;
        }
    }
    // Link to the original file in a new tab (the fallback for PDFs).
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
    // Invalidate any in-flight PDF render.
    cadRenderToken++;
    cadModal.classList.remove('show');
    cadModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (cadModalImage) cadModalImage.src = '';
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
