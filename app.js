document.addEventListener('DOMContentLoaded', () => {
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

    // ---------- Cursor glow (decorative) ----------
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
        cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    // ---------- Stories data ----------
    const storiesData = [
        {
            title: "Notte di Luna",
            author: "Maria Fernanda Leone",
            category: "Natura",
            excerpt: "La luna piena illuminava il giardino deserto dove un'ombra silenziosa si muoveva...",
            content: `La luna piena illuminava il giardino deserto dove un'ombra silenziosa si muoveva con passo felpato e misterioso. A ben vedere le ombre erano due e il gufo Hudi che ci vedeva benissimo anche al buio, gonfiò le penne, il suo comportamento fisiologico per annunciare una minaccia, si sollevò leggermente dal nido dove era bellamente semiaddormentato ed emise il suo profondo bubolare.<br><br>– Hu, hu. – il suo suono caratteristico e modulato che veniva emesso per marcare il territorio, ma sopratutto per avvertire il gruppo. – Attenzione sono arrivati i soliti rubauova. – Significava quel suo bubolare.<br><br>La compagna di Hudi aprì gli occhioni e lo guardò muovendo la testa a scatti. – Hu hu. – Gli suggerì lei, rocarmente. – Avverti la cornacchia.- Significava il suo verso. Hudi assentì scattando il capo in avanti con tre rapidissimi movimenti. Allora la civetta che aveva seguito attentamente ogni mossa, prevenendolo svolazzò vicino al nido della cornacchia, ben sistemato e incastrato tra due rami del Cirmolo nel giardino della vecchia villa, un rudere trascurato dall'incuria e abbandonato.<br><br>– Presto Nerona, il nostro amico ha visto i rubauova. – Comunicò con il suo verso stridente e acuto la civetta alla cornacchia. – Ciu, ciu. – Sono quei pigmei di uomini, quelli più piccoli che ci rubano le uova e le spiaccicano al suolo. - Squittì ancora seccamente. Poi veloce come l'uccello che era cominciò a svolazzare intorno ai due intrusi, seguito dalla cornacchia. Emettevano tutte e due i loro versi acuti e sgraziati.<br><br>– Presto scappiamo. – Dissero i due ragazzi. – Questi uccelli ci portano sfiga. Senti che coro, via, via. – A gambe levate e senza più preoccuparsi di non fare rumore, urlando si arrampicarono sul cancello arrugginito del giardino, lo scavalcarono e fuggirono inseguiti dallo svolazzare dei due rapaci e dai loro versacci. – Ciù ciù. – stridè la civetta rivolta a Madama gufo. – Quando poco dopo tornò. - Se ne sono andati.<br><br>– Brave, grazie. Domani mattina per colazione Hudi vi porterà un bel topolino come ringraziamento. - Ciu, ciu fece la civetta. - Cra cra, fece la cornacchia. – Hu Hu. – Bubolò la signora gufo. Felice si rimise sulle due uova che aveva da scaldare e ricominciò a sonnecchiare sotto lo sguardo amoroso del suo compagno che si scostò un poco per farle più posto nel nido.`,
            date: "2026"
        },
        {
            title: "Ascoltando",
            author: "Maria Fernanda Leone",
            category: "Nostalgia",
            excerpt: "Marianna rigirava soddisfatta fra le mani le varie, vecchissime musicassette...",
            content: `Marianna rigirava soddisfatta fra le mani le varie, vecchissime musicassette. Riordinando il box, in una scatola acciaccata, in fondo ad un mobiletto le aveva trovate insieme al mangiacassette, le era venuta voglia di riascoltarle, le ricordavano la sua adolescenza e la sua giovinezza. Dopo aver fatto riparare l'apparecchio mangiacassette finalmente, avrebbe potuto riascoltarle.<br><br>Aveva girato parecchi negozi alla ricerca di un tecnico disponibile ad aggiustarle quel pezzo da museo senza farsi spennare. Erano tante le vecchie musicassette del padre musicofilo ed entusiasta d'opera che, andando in pensione, aveva assecondato la sua passione raccattando musicassette che ascoltava cantando, seguendo i brani gorgheggiati dai più famosi ed esperti tenori, con la sua voce arrochita e sfiatata gareggiava in cavatine e acuti.<br><br>"Povero papà, che strazio per le nostre orecchie!" Disse Marianna ricordando il vecchio padre che gonfiava il petto e sognava di essere sul palco della Scala, poi fissò lo sguardo sui titoli. I Pagliacci, l'Aida, il Rigoletto, quante erano?<br><br>"E questa?" Marianna guardò l'etichetta della musicassetta ed esclamò. "No! Fred Buscaglione" Non ci poteva credere, lei, ai tempi, non si stancava mai di ascoltarlo e suo padre che lo sapeva, spesso gliela faceva sentire, rifacendo il verso al simpatico chansonnier. Con pochi gesti Marianna infilò la musicassetta nell'alloggio preposto e schiacciò il pulsante, poi sorridendo si mise a prestare attenzione, mentre puliva la cipolla per preparare il risotto.<br><br>Prima Fred fa, con la sua caratteristica voce roca, ma professionale, un resoconto, tipo giornale radio, della vicenda, un dramma familiare tragicomico, boccaccesco, poi, la canzone "-Teresa, ti prego non scherzare col fucile, per la rabbia la tua bile può scoppiar, Teresa ti prego, io non sono certo un vile, ma se tocchi quel fucile può sparar, è stata una follia l'ho incontrata per la via, disse vieni a casa mia, cosa mai potevo far? Un bacio ha domandato, te l'ho giuro ho rifiutato, ed abbiamo poi parlato, pensa un pò, sempre di te. Perciò Teresa, ti prego non scherzare col fucile, far così non è gentile, ma lascia andar, no Teresa dai non mi sparare, Teresa su!" e poi uno sparo? Chissà...<br><br>Continuando a tagliuzzare la cipolla Marianna sorrideva fra le lacrime. Marianna si chiese se era la sostanza chiamata ossido di propianetale che emanava l'ortaggio che si difendeva dal coltello o la nostalgia? Mah!`,
            date: "2026"
        },
        {
            title: "Il Dottor Alan",
            author: "Maria Fernanda Leone",
            category: "Sci-Fi",
            excerpt: "Il dottor Alan, un uomo grasso e basso, la schiena curva, quasi gobbo...",
            content: `Il dottor Alan, un uomo grasso e basso, la schiena curva, quasi gobbo, dai capelli bianchi che crescevano solo sulle orecchie e i piccoli occhi scuri che annegavano nel grasso del viso, entrò in laboratorio, infilò il camice bianco, appeso al muro e i guanti di protezione. Con una voce stridula e sottile diede istruzioni e comandi all'assistente vocale virtuale che a sua volta impartì gli ordini ai dispositivi che si misero subito e lentamente in moto, con un leggero ronzio. Il dottor Alan, nell'attesa, si mise a sedere al piccolo tavolo che fungeva da scrivania, aprì il monitor e cominciò a leggere le ultime notizie che arrivavano da ogni parte del mondo. - Ancora la principessina Morgan che a Londra svolazzava tra i tetti della City. Che barba, questa razza di debosciati. Una razza che viveva alla grande sulle spalle degli altri e che non si esauriva mai! - Esclamò Alan scandalizzato.<br><br>– In Svizzera la banda dei Blue Nerd aveva assaltato la Banca Nazionale e rubato i Chips algoritmici. – Ah questo sì che è una notizia.- Disse ancora il dottor Alan. Su quei Chips c'erano i dati che riguardavano milioni di persone. Poveretti sarebbero finiti nell'elenco dei Persi, avrebbero infatti perso tutto e i loro dati sarebbero stati usati per ridare una faccia e una identità a chi poteva pagare milioni per rifarsi una "verginità".<br><br>Il dottor Alan pensò che di sicuro sotto c'era la mano di Niger, l'inafferrabile figura misteriosa, autore dei più gravi misfatti degli ultimi tempi. Il Dottor Alan smise di leggere e si alzò alla vista della barella che scendeva dal soffitto, con un soffuso ronzio, da una specie di montacarichi. Sopra c'era adagiato il piccolo Mutatus, addormentato e legato. Il dottor Alan ammirò con affetto la sua piccola creatura, rosea e paffuta, meno male che era stato anestetizzato altrimenti avrebbe cominciato a parlare e con tutte le sue chiacchiere gli avrebbe fatto venire il mal di testa. Peccato, pensò un pò triste, il lavoro di quasi cinque anni sarebbe stato distrutto in poche ore. Accarezzò quasi con affetto la piccola testa senza capelli, quelli glieli aveva già asportati. Erano serviti per un trapianto che gli aveva richiesto solo un paio d'ore e ora il Direttore Nazionale della Cultura sfoggiava dei riccioli dorati veramente affascinanti. Anche gli occhi erano già stati utilizzati per un trapianto in favore di una personalità dello Stato, veramente importante e di cui era meglio non rivelare il nome.<br><br>Oggi sarebbe toccato a tutto il resto, del piccolo Mutatus serviva quasi tutto, avevano bisogno del suo sangue, del suo cuore, dei suoi reni, e di un suo polmone, il resto poteva venire conservato e all'occorrenza sarebbe stato utilizzato. Il dottor Alan pensò che da quel lavoro avrebbe potuto ricavare un bel guadagno e finalmente avrebbe potuto comprarsi la barca su cui aveva messo gli occhi l' estate passata. Pensava anche che l'indomani avrebbe dovuto organizzarsi per poter creare un altro Mutatus. Che lavoro faticoso! Ma anche di grande soddisfazione.`,
            date: "2026"
        },
        {
            title: "Tanti Amori",
            author: "Maria Fernanda Leone",
            category: "Arte",
            excerpt: "Elisabetta stava ammirando il quadro famoso di Tiziano, \"Amor sacro e amor profano\"...",
            content: `Elisabetta stava ammirando il quadro famoso di Tiziano, "Amor sacro e amor profano". Una vera opera d'arte, mirabilmente dipinta da un vero artista e non come le opere di certi pseudoartisti che popolano il mondo attuale con le loro installazioni e buffonate simili, realizzò critica. Non riusciva a staccarsi da quel quadro che rappresenta la stessa donna, una vestita e una seminuda.<br><br>- Che grandezza, che meraviglia.- Si disse. Amor sacro.. ma non è tutto sacro l'amore? Si chiese Elisabetta. In certe culture anche l'amore carnale è sacro, un dono che Dio ha fatto all'uomo. Dunque? Era sacro sia l'amore per i figli come pure l'amore per il marito.<br><br>C'erano anche tanti altri tipi d'amore, l'amore per il cibo o per il vino, per lo sport o per l'avventura o forse queste erano solo delle ossessioni? Quante domande le affollavano la mente e a cui lei non riusciva a dare una risposta. Ci sarebbe voluto un cervellone, magari un grande psicologo senza andare a scomodare Freud. Chissà se Freud con tutte le sue risposte era stato felice e chi gli stava intorno aveva avuto vita facile?<br><br>Basta domande. Si disse Elisabetta, finalmente con sforzo si staccò dal quadro e uscì dalla Galleria Borghese, fuori c'era Roma, la città eterna in tutta la sua grandezza che l'aspettava. Anche Renato suo marito, l'aspettava, invece di andare con lei a vedere musei aveva preferito aspettarla in albergo a bordo piscina, con un aperitivo poggiato sul tavolino, così l'avrebbe trovato Elisabetta.<br><br>– Quando hai finito di ingozzarti di cultura, prendi un taxi e torna in albergo. Ho scoperto un'osteria che prepara dei Carciofi alla Giudea veramente favolosi, me l'ha raccomandata il portiere dell'albergo. - Elisabetta uscita dal museo guardò il cielo di Roma, era bellissimo e ad ovest si mostrava un favoloso tramonto, dietro al profilo della grande città. Aveva girato Gallerie e musei tutto il giorno ed era pronta a tornare in albergo ed accontentare il marito che amava la buona cucina. – Andiamo a gustare i favolosi carciofi alla giudia, dal parente del portiere! - Esclamò Elisabetta a voce alta facendo voltare un passante curioso che la guardò con compatimento.`,
            date: "2026"
        },
        {
            title: "In Treno",
            author: "Maria Fernanda Leone",
            category: "Viaggi",
            excerpt: "Sono sul treno freccia rossa, un treno velocissimo che corre fino a quattrocento kilometri...",
            content: `Sono sul treno freccia rossa, un treno velocissimo che corre fino a quattrocento kilometri all'ora, non penso che vada così veloce in questo momento, ma è comunque molto veloce, pochi minuti fa ho lasciato un paesaggio grigio e polveroso alle mie spalle e, dal finestrino vedo un bel cielo celestino e campi verdi e rigogliosi, so che fra poco tempo, quando avrò finito di leggere questo capitolo del libro che tengo fra le mani potrò già ammirare verdi colline coltivate a filari d'uva e fra un paio d'ore sarò a destinazione: Venezia la città che amo di più al mondo.<br><br>Io amo viaggiare su Freccia Rossa, il treno mi piace, è bello, pulito e veloce. Mi aspetta alla stazione Santa Lucia, una cara amica che vive al sud Anche lei arriva dalla sua città con il treno. Ci siamo date appuntamento a Venezia dove trascorreremo un paio di giorni visitando insieme la città. E' da almeno due anni che non vedo la mia amica Emma. Emma una cara compagna d'infanzia che qualche anno fa, ha sposato un uomo che è nato e vive al sud Emma lo ha seguito al suo paese senza remore, abbandonando le sue abitudini, il suo lavoro, i suoi amici e parenti. So che è felice e per questo sono felice anche io. A distanza comunque continuiamo a sentirci, c'è il telefono, da qualche tempo usiamo le videochiamate e ci sentiamo spesso, ogni tanto organizziamo queste specie di vacanze culturali e ci ritroviamo in una città che visitiamo insieme, il marito non protesta e noi ne approfittiamo. Abbiamo organizzato la nostra vacanza, e già pregusto tutto quello che ci aspetta. Venezia arrivo!`,
            date: "2026"
        },
        {
            title: "Il mio diario",
            author: "Maria Fernanda Leone",
            category: "Racconti",
            excerpt: "Roberto, Rina, Nicoletta e Valerio raccontano la stessa giornata...",
            content: `<b>ROBERTO:</b><br>Mi giravo e rigiravo nel letto, sudato e molto impaurito. La vicina la signora Pinuccia, anche quel pomeriggio mi aveva sgridato. Quella antipatica ce l'aveva proprio con me. Io in fondo non avevo fatto niente di male, avevo comperato con la mancia che mi aveva dato la nonna Rina le miccette, piccoli e innocui petardi che facevano un bel botto e le avevo fatte crepitare sul pianerottolo. La vecchiaccia aveva cominciato a strillare: - Sta attento che i ragazzini cattivi se li porta via il diavolo, che si nasconde sotto il letto. Vedrai stanotte che ti succederà. - Presi la torcia dal comodino, mi alzai, controllai ancora sotto il letto. Ma sì, non c'era nessuno. Quella sera avrei dormito nel lettone con mamma e papà.<br><br><b>RINA:</b><br>Il giorno del compleanno di Nicoletta mi alzai dal letto dolorante. La mia maledetta schiena non mi dava tregua. Ardemia, la mia migliore amica, mi suggerì un massaggio speciale da suo nipote Roberto, un ragazzo d'oro portento dei massaggi. Roberto cominciò a "lavorarmi": - Ahh... Che male! Che fai Roberto! - Urlai mentre il giovane premeva e pestava. - Basta, basta, è peggio di prima! - Dissi sgusciando veloce da quel letto di dolore. Me ne andai zoppicando, pensando che il pomeriggio non avrei potuto dare una mano per la festa di Nicoletta.<br><br><b>NICOLETTA:</b><br>"Oggi è il mio compleanno e ho ricevuto in dono te, il mio carissimo diario. Sei bellissimo, hai la copertina rossa e una piccola serratura che mi permetterà di richiuderti con una minuscola chiave d'oro, che non lascerò mai in giro, ma infilerò nella mia catenina. Oggi è stata una giornata bellissima, c'è stata la mia festa di compleanno. Camilla, la mia migliore amica, mi ha scritto una dedica: 'le rose sono rosse, le viole sono blu, lo zucchero è dolce così come sei tu'. Buona notte, caro diario. tua Nicoletta."<br><br><b>VALERIO:</b><br>Che giornata, sono stanchissimo, tutti quegli strilli di bambine. Devo ancora scrivere il mio discorso per il Consiglio Comunale, ero candidato all'elezione di Sindaco della Città. Cominciai a scrivere e dopo aver letto quello che avevo scritto, mi misi a ridere a crepapelle: "Buongiorno carissimi Elettori. Cosa devo dirvi, perché dovreste votarmi? Le strade sono sporche, i marciapiedi pieni di buche... Io farò quel che potrò, non vi prometto niente di più di quello che avete ora. Accontentatevi. Fate il vostro dovere e votatemi."<br><br>In fondo era ciò che avrei voluto scrivere, ma assolutamente impossibile da dire. Sentii bussare leggermente alla porta, era Rosa. - Vieni tesoro, vieni a leggere cosa ha scritto il tuo marito scriteriato. - Rosa si avvicinò e mi abbracciò. - Sei pazzo e per questo mi piaci. Però questo discorso devi rifarlo. - Stracciai il foglio in quattro parti. Mi sa che stanotte dovrò spremermi ben bene le meningi per scrivere un bel discorso da fare ai miei Elettori al Consiglio Comunale. Rosa allacciata a me mi sussurrò nell'orecchio. - Sarà meglio, caro. -`,
            date: "2026"
        },
        {
            title: "Monologo del Presidente",
            author: "Maria Fernanda Leone",
            category: "Politica",
            excerpt: "Buongiorno carissime e carissimi. Cosa devo dirvi cari elettori...",
            content: `Buongiorno carissime e carissimi. Cosa devo dirvi cari elettori, perché dovreste votarmi ed eleggermi Presidente? Vi illustro qui di seguito le varie ragioni. Ora non sento che lamentele, le strade sono sporche, i cestini stracolmi, i marciapiedi sono pieni di buche, non parlatemi del manto stradale che si apre come una melagrana sotto al sole, ogni pochi metri. Non c'è un vigile che presidia il quartiere e a cui rivolgersi in caso di necessità.<br><br>D'estate fa troppo caldo, d'inverno fa troppo freddo, in primavera piove troppo e d'autunno c'è troppo caldo ancora. Non esistono più le quattro stagioni e la cortesia è bandita dalla vita civile. Di sera è pericoloso uscire e ci sono quartieri in città dove è meglio evitare d'andarci. Le scuole pubbliche cadono a pezzi, gli Ospedali necessitano di ristrutturazioni che non vengono fatte, il Servizio sanitario nazionale è carente, andare dal medico di famiglia per avere una ricetta è diventata una speranza, quasi come vincere un terno all'otto.<br><br>Ragazzi pregate e sperate nella Provvidenza. Io, se mi voterete, farò quel che potrò, non vi prometto niente di più di quello che avete ora. Vi consiglio di guardarvi intorno, cioè guardate cosa succede qui da noi, tutto un mondo di esseri affamati e bisognosi arriva qui da noi per essere curato, per poter essere scolarizzato, per mangiare e vestirsi.<br><br>Dunque che vuol dire? Non fatevi più problemi e accontentatevi. Chi troppo vuole nulla piglia, diceva mia nonna e aveva ragione. Allora! Fate il vostro dovere e votatemi. Avrete la mia eterna riconoscenza e quella della mia fmiglia e mi permetto anche di benedirvi e augurarvi ogni bene. Buonasera a tutti e tornate a casa vostra in pace.`,
            date: "2026"
        }
    ];

    // ---------- Reading time helper ----------
    const readingTime = (htmlText) => {
        const text = htmlText.replace(/<[^>]*>/g, ' ');
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.round(words / 200));
        return minutes;
    };

    // ---------- Decorative pattern per category (subtle SVG) ----------
    const categoryPalette = {
        'Natura':    { hue: '#3d6149', icon: 'M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3' },
        'Nostalgia': { hue: '#a87545', icon: 'M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        'Sci-Fi':    { hue: '#6b5b8a', icon: 'M12 2L4 7l8 5 8-5-8-5zM4 17l8 5 8-5M4 12l8 5 8-5' },
        'Arte':      { hue: '#b85450', icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1 0 2-1 2-2v-1c0-1 1-2 2-2h2c2 0 4-2 4-4 0-5.5-4.5-10-10-10z' },
        'Viaggi':    { hue: '#3a7a8a', icon: 'M2 12h20M2 12a10 10 0 0120 0M2 12a10 10 0 0020 0M12 2a14 14 0 010 20M12 2a14 14 0 000 20' },
        'Racconti':  { hue: '#8a6b3a', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z' },
        'Politica':  { hue: '#5a5a5a', icon: 'M3 21h18M3 7h18M5 21V7l7-4 7 4v14M9 21V11M15 21V11' }
    };

    // ---------- Build filter chips ----------
    const allCategories = ['Tutti', ...new Set(storiesData.map(s => s.category))];
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

        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }

        filtered.forEach((story, i) => {
            const palette = categoryPalette[story.category] || { hue: '#a87545', icon: 'M12 2L2 12l10 10 10-10z' };
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

        // Trigger reveal animation
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

    // ---------- Modal open/close ----------
    const openStory = (story) => {
        const palette = categoryPalette[story.category] || { hue: '#a87545' };
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
                <span>${story.date}</span>
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

    // ---------- Reading progress bar ----------
    modalScroll.addEventListener('scroll', () => {
        const scrollTop = modalScroll.scrollTop;
        const scrollHeight = modalScroll.scrollHeight - modalScroll.clientHeight;
        const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        readingProgress.style.width = pct + '%';
    });

    // ---------- Initial render ----------
    renderStories();
});
