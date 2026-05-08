# I Racconti del Riccio

> Antologia di racconti brevi di **Maria Fernanda Leone**.

Un piccolo sito pensato come un quaderno di carta: storie raccolte come foglie d'autunno, di nostalgia, di sogni, di voci che attraversano i giardini della memoria.

## Vedi il sito

Il sito è pubblicato tramite GitHub Pages. Apri il file `index.html` localmente o visita la versione live.

## Struttura

```
.
├── index.html   # struttura del sito
├── style.css    # stile (palette letteraria, drop cap, animazioni)
└── app.js       # racconti, filtri, ricerca, modal di lettura
```

## Caratteristiche

- Sette racconti con filtri per categoria e ricerca live
- Tema chiaro / scuro con preferenza salvata
- Tempo di lettura stimato per ogni racconto
- Esperienza di lettura curata (drop cap, barra di avanzamento, tipografia letteraria)
- Design responsive, accessibile, senza dipendenze pesanti

## Aggiungere un nuovo racconto

Apri `app.js`, trova l'array `storiesData` e aggiungi un oggetto:

```js
{
  title: "Titolo",
  author: "Maria Fernanda Leone",
  category: "Nostalgia",            // o un'altra delle categorie esistenti
  excerpt: "Prime righe del racconto…",
  content: `Testo completo. Usa <br><br> per separare i paragrafi.`,
  date: "2026"
}
```

Salva, ricarica la pagina: il racconto appare automaticamente con la sua icona, il filtro e il tempo di lettura.

---

Realizzato con cura — *un sorriso, una pausa, una piccola scintilla di mondo.*
