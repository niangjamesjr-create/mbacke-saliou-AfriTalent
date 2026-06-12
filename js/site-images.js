/**
 * Chemins des visuels du site — modifiez ce fichier pour utiliser vos images.
 * Placez vos fichiers dans le dossier `images/` (ou ailleurs) et mettez le chemin relatif ici.
 */
window.SITE_IMAGES = {
    hero: 'https://images.pexels.com/photos/30677719/pexels-photo-30677719.jpeg?auto=compress&cs=tinysrgb&w=1600',
    aboutStory: 'https://images.pexels.com/photos/30688590/pexels-photo-30688590.jpeg?auto=compress&cs=tinysrgb&w=1400',
    testimonialAmara: 'https://images.pexels.com/photos/34207040/pexels-photo-34207040.jpeg?auto=compress&cs=tinysrgb&w=600',
    testimonialKofi: 'https://images.pexels.com/photos/5648424/pexels-photo-5648424.jpeg?auto=compress&cs=tinysrgb&w=600',
    testimonialFatima: 'https://images.pexels.com/photos/6000145/pexels-photo-6000145.jpeg?auto=compress&cs=tinysrgb&w=600',
    teamAicha: 'https://images.pexels.com/photos/34207040/pexels-photo-34207040.jpeg?auto=compress&cs=tinysrgb&w=600',
    teamMamadou: 'https://images.pexels.com/photos/5792856/pexels-photo-5792856.jpeg?auto=compress&cs=tinysrgb&w=600',
    teamFatou: 'https://images.pexels.com/photos/29387556/pexels-photo-29387556.jpeg?auto=compress&cs=tinysrgb&w=600',
    teamIbrahim: 'https://images.pexels.com/photos/5668886/pexels-photo-5668886.jpeg?auto=compress&cs=tinysrgb&w=600',
    freelances: {
        1: 'https://images.pexels.com/photos/6000145/pexels-photo-6000145.jpeg?auto=compress&cs=tinysrgb&w=1200',
        2: 'https://images.pexels.com/photos/5483165/pexels-photo-5483165.jpeg?auto=compress&cs=tinysrgb&w=1200',
        3: 'https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg?auto=compress&cs=tinysrgb&w=1200',
        4: 'https://images.pexels.com/photos/30688590/pexels-photo-30688590.jpeg?auto=compress&cs=tinysrgb&w=1200',
        5: 'https://images.pexels.com/photos/8279006/pexels-photo-8279006.jpeg?auto=compress&cs=tinysrgb&w=1200',
        6: 'https://images.pexels.com/photos/29387556/pexels-photo-29387556.jpeg?auto=compress&cs=tinysrgb&w=1200',
        7: 'https://images.pexels.com/photos/34207040/pexels-photo-34207040.jpeg?auto=compress&cs=tinysrgb&w=1200',
        8: 'https://images.pexels.com/photos/5792856/pexels-photo-5792856.jpeg?auto=compress&cs=tinysrgb&w=1200',
        9: 'https://images.pexels.com/photos/30677719/pexels-photo-30677719.jpeg?auto=compress&cs=tinysrgb&w=1200'
    }
};

(function applySiteImages() {
    const FALLBACK_SRC = 'images/placeholder.svg';

    // Charge la ressource souhaitée, mais conserve l'image actuelle si le fichier n'existe pas.
    function trySetImageSrc(imgEl, desiredSrc) {
        if (!desiredSrc) return;
        if (!imgEl) return;

        // Évite de faire des requêtes inutiles si on pointe déjà dessus.
        if (imgEl.getAttribute('src') === desiredSrc) return;

        const probe = new Image();
        probe.onload = () => {
            imgEl.src = desiredSrc;
        };
        probe.onerror = () => {
            // Si l'image actuelle est vide/bloquée, on remet un placeholder.
            if (!imgEl.getAttribute('src') || imgEl.getAttribute('src') === desiredSrc) {
                imgEl.src = FALLBACK_SRC;
            }
        };
        probe.src = desiredSrc;
    }

    function apply() {
        const I = window.SITE_IMAGES;
        if (!I) return;

        // Images déclarées dans les pages (index.html, about.html)
        document.querySelectorAll('[data-site-image]').forEach((el) => {
            const key = el.getAttribute('data-site-image');
            if (!key) return;
            const desired = I[key];
            if (desired) trySetImageSrc(el, desired);
        });

        // Images des freelances générées par JS (freelances.html)
        document.querySelectorAll('[data-site-image-freelance]').forEach((el) => {
            const id = parseInt(el.getAttribute('data-site-image-freelance'), 10);
            if (!Number.isFinite(id)) return;
            const desired = I.freelances && I.freelances[id];
            if (desired) trySetImageSrc(el, desired);
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply);
    } else {
        apply();
    }
})();
