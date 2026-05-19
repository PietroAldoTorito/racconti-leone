document.addEventListener('DOMContentLoaded', async () => {
    // ---------- DOM refs ----------
    const themeToggle      = document.querySelector('#theme-toggle');
    const modal            = document.getElementById('story-modal');
    const modalContent     = document.getElementById('modal-content');
    const modalScroll      = document.getElementById('modal-scroll-container');
    const modalCategoryTag = document.getElementById('modal-category-tag');
    const closeModalBtn    = document.getElementById('close-modal');
    const overlay          = document.getElementById('modal-overlay');
    const grid             = document.getElementById('stories-grid');
    const filterChips      = document.getElementById('filter-chips');
    const searchInput      = document.getElementById('search-input');
    const emptyState       = document.getElementById('empty-state');
    const yearEl           = document.getElementById('year');
    const cursorGlow       = document.getElementById('cursor-glow');
    const readingProgress  = document.getElementById('reading-progress');
    const statStories      = document.getElementById('stat-stories');
    const statCategories   = document.getElementById('stat-categories');

    yearEl.textContent = new Date().getFullYear();

    // ---------- Theme persistence ----------
    const savedTheme = localStorage.getItem('riccio-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('riccio-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // ---------- Cursor glow ----------
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top  = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });

    // ---------- Reading time ----------
    const readingTime = (htmlText) => {
        const text = htmlText.replace(/<[^>]*>/g, ' ');
        const words = text.trim().split(/\s+/).length;
        return Math.max(1, Math.round(words / 200));
    };

    // ---------- Category palette (icons & colors) ----------
    // Per ogni categoria definita qui appare un'icona e un colore dedicati.
    // Se aggiungi una categoria nuova nei file .txt, viene usato il fallback (miele).
    const categoryPalette = {
        'Natura':    { hue: '#3d6149', icon: 'M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3' },
        'Nostalgia': { hue: '#a87545', icon: 'M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        'Sci-Fi':    { hue: '#6b5b8a', icon: 'M12 2L4 7l8 5 8-5-8-5zM4 17l8 5 8-5M4 12l8 5 8-5' },
        'Arte':      { hue: '#b85450', icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1 0 2-1 2-2v-1c0-1 1-2 2-2h2c2 0 4-2 4-4 0-5.5-4.5-10-10-10z' },
        'Viaggi':    { hue: '#3a7a8a', icon: 'M2 12h20M2 12a10 10 0 0120 0M2 12a10 10 0 0020 0M12 2a14 14 0 010 20M12 2a14 14 0 000 20' },
        'Racconti':  { hue: '#8a6b3a', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z' },
        'Politica':  { hue: '#5a5a5a', icon: 'M3 21h18M3 7h18M5 21V7l7-4 7 4v14M9 21V11M15 21V11' }
    };
    const FALLBACK_PALETTE = { hue: '#a87545', icon: 'M12 2L2 12l10 10 10-10z' };

    // ---------- Story parser ----------
    // Formato file .txt:
    //   TITOLO: ...
    //   CATEGORIA: ...
    //   DATA: ...
    //   AUTORE: ... (opzionale)
    //   <riga vuota>
    //   [paragrafi separati da una riga vuota]
    const parseStory = (rawText, filename) => {
        // Rimuove BOM se presente
        let text = rawText.replace(/^﻿/, '').replace(/\r\n/g, '\n').trim();

        // Trova la prima riga vuota: separa l'header dal corpo
        const sep = text.indexOf('\n\n');
        if (sep === -1) return null;

        const headerBlock = text.slice(0, sep);
        const bodyBlock   = text.slice(sep + 2).trim();

        // Parse header (KEY: value)
        const meta = {};
        headerBlock.split('\n').forEach(line => {
            const i = line.indexOf(':');
            if (i > 0) {
                meta[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
            }
        });

        // Costruisce HTML dal body: paragrafi separati da riga vuota
        const contentHTML = bodyBlock
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(Boolean)
            .join('<br><br>');

        // Excerpt: prime ~140 caratteri di testo pulito
        const plain = bodyBlock.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        const excerpt = plain.length > 140 ? plain.slice(0, 140).trim() + '…' : plain;

        return {
            title:    meta.titolo    || meta.title    || filename.replace(/\.txt$/i, ''),
            author:   meta.autore    || meta.author   || 'Maria Fernanda Leone',
            category: meta.categoria || meta.category || 'Racconti',
            date:     meta.data      || meta.date     || '',
            excerpt:  excerpt,
            content:  contentHTML
        };
    };

    // ---------- Carica i racconti ----------
    let storiesData = [];
    try {
        const idxRes = await fetch('racconti/index.json', { cache: 'no-store' });
        if (!idxRes.ok) throw new Error('manifest non trovato');
        const idx = await idxRes.json();
        const files = (idx.files || []).filter(f => !f.startsWith('_'));

        const loaded = await Promise.all(files.map(async (f) => {
            try {
                const r = await fetch('racconti/' + encodeURIComponent(f), { cache: 'no-store' });
                if (!r.ok) return null;
                const txt = await r.text();
                return parseStory(txt, f);
            } catch (e) {
                console.warn('Errore caricamento ' + f, e);
                return null;
            }
        }));
        storiesData = loaded.filter(Boolean);
    } catch (err) {
        console.error('Impossibile caricare i racconti:', err);
        grid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <p class="font-serif italic text-xl text-ink-700/60 dark:text-cream-200/60">
                    Non riesco a caricare i racconti.<br>
                    Assicurati di aprire il sito tramite il link GitHub Pages
                    (file locali bloccano il caricamento per ragioni di sicurezza).
                </p>
            </div>`;
        return;
    }

    // ---------- Build filter chips + stats ----------
    const allCategories = ['Tutti', ...Array.from(new Set(storiesData.map(s => s.category)))];
    let activeCategory = 'Tutti';
    let activeQuery = '';

    statStories.textContent = storiesData.length;
    statCategories.textContent = allCategories.length - 1;

    allCategories.forEach((cat) => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip' + (cat === 'Tutti' ? ' active' : '');
        chip.textContent = cat;
        chip.dataset.category = cat;
        chip.addEventListener('click', () => {
            activeCategory = cat;
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderStories();
        });
        filterChips.appendChild(chip);
    });

    // ---------- Render story cards ----------
    const renderStories = () => {
        grid.innerHTML = '';
        const filtered = storiesData.filter(s => {
            const matchCat = activeCategory === 'Tutti' || s.category === activeCategory;
            const q = activeQuery.toLowerCase().trim();
            const matchQ = !q
                || s.title.toLowerCase().includes(q)
                || s.excerpt.toLowerCase().includes(q)
                || s.content.toLowerCase().includes(q);
            return matchCat && matchQ;
        });

        emptyState.classList.toggle('hidden', filtered.length !== 0);

        filtered.forEach((story, i) => {
            const palette = categoryPalette[story.category] || FALLBACK_PALETTE;
            const minutes = readingTime(story.content);
            const card = document.createElement('article');
            card.className = "story-card relative bg-white/80 dark:bg-forest-800/40 backdrop-blur-sm border border-cream-200 dark:border-forest-700/60 rounded-3xl p-7 md:p-8 cursor-pointer overflow-hidden group hover:shadow-2xl hover:shadow-forest-900/10 dark:hover:shadow-honey-500/5 hover:border-honey-500/40 dark:hover:border-honey-500/40";
            card.style.transitionDelay = (i * 60) + 'ms';

            card.innerHTML = `
                <div class="flex items-start justify-between mb-6">
                    <div class="w-11 h-11 rounded-2xl flex items-center justify-center" style="background: ${palette.hue}1A; color: ${palette.hue};">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="${palette.icon}"/></svg>
                    </div>
                    <span class="text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full" style="background: ${palette.hue}1A; color: ${palette.hue};">${story.category}</span>
                </div>

                <h3 class="font-serif text-2xl md:text-[1.7rem] font-bold leading-tight tracking-tight mb-3 dark:text-cream-100">${story.title}</h3>
                <p class="font-serif italic text-[0.95rem] text-ink-700/70 dark:text-cream-200/70 leading-relaxed line-clamp-3 mb-8">${story.excerpt}</p>

                <div class="pt-5 border-t border-cream-200 dark:border-forest-700/60 flex justify-between items-center">
                    <div class="flex items-center gap-2 text-[11px] text-ink-700/55 dark:text-cream-200/55">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/></svg>
                        <span>${minutes} min di lettura</span>
                    </div>
                    <span class="card-arrow inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-honey-600 dark:text-honey-400">
                        Leggi
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                </div>
            `;

            card.addEventListener('click', () => openStory(story));
            grid.appendChild(card);
        });

        // Reveal animation
        requestAnimationFrame(() => {
            document.querySelectorAll('.story-card').forEach((c, i) => {
                setTimeout(() => c.classList.add('visible'), i * 60);
            });
        });
    };

    // ---------- Search ----------
    let searchTimer = null;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            activeQuery = e.target.value;
            renderStories();
        }, 150);
    });

    // ---------- Modal ----------
    const openStory = (story) => {
        const palette = categoryPalette[story.category] || FALLBACK_PALETTE;
        const minutes = readingTime(story.content);

        modalCategoryTag.textContent = story.category;
        modalCategoryTag.style.color = palette.hue;

        modalContent.innerHTML = `
            <h2 class="font-serif font-bold dark:text-cream-100">${story.title}</h2>
            <div class="story-meta">
                <span class="author">di ${story.author}</span>
                <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/></svg>
                    ${minutes} min
                </span>
                ${story.date ? `<span>${story.date}</span>` : ''}
            </div>
            <div class="prose-body">${story.content}</div>
            <div class="mt-12 pt-8 border-t border-honey-500/20 text-center">
                <p class="font-serif italic text-ink-700/50 dark:text-cream-200/50" style="font-family: 'Caveat', cursive; font-size: 1.6rem;">— fine —</p>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalScroll.scrollTop = 0;
        readingProgress.style.width = '0%';
    };

    const closeStory = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        readingProgress.style.width = '0%';
    };

    closeModalBtn.addEventListener('click', closeStory);
    overlay.addEventListener('click', closeStory);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeStory();
    });

    modalScroll.addEventListener('scroll', () => {
        const top = modalScroll.scrollTop;
        const h = modalScroll.scrollHeight - modalScroll.clientHeight;
        readingProgress.style.width = (h > 0 ? (top / h) * 100 : 0) + '%';
    });

    renderStories();
});
