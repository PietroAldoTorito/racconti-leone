# I Racconti del Riccio

> Antologia di racconti brevi di **Maria Fernanda Leone**.

Sito online: [pietroaldotorito.github.io/racconti-leone](https://pietroaldotorito.github.io/racconti-leone/)

## Aggiungere un nuovo racconto (workflow semplice)

1. Apri la cartella `racconti/`
2. Duplica il file `_TEMPLATE.txt`, rinominalo (es. `08-il-vento-di-marzo.txt`)
3. Apri il file, modifica le prime righe (TITOLO, CATEGORIA, DATA) e scrivi il racconto sotto la riga vuota
4. Torna nella cartella principale e fai **doppio click su `pubblica.bat`**

In 30-60 secondi il sito è aggiornato.

Istruzioni passo-passo dettagliate: vedi `racconti/_COME-AGGIUNGERE-UN-RACCONTO.txt`.

## Struttura del progetto

```
.
├── index.html                # struttura del sito
├── style.css                 # stile
├── app.js                    # logica (carica i racconti dai .txt)
├── pubblica.bat              # doppio-click per pubblicare
├── pubblica.ps1              # script chiamato dal .bat
└── racconti/
    ├── index.json            # indice auto-generato (non toccare a mano)
    ├── _TEMPLATE.txt         # modello da copiare per nuovi racconti
    ├── _COME-AGGIUNGERE-UN-RACCONTO.txt
    ├── 01-notte-di-luna.txt
    ├── 02-ascoltando.txt
    └── ...                   # un file per ogni racconto
```

I file che iniziano con `_` (underscore) vengono **ignorati** dal sito: usali per template, note e materiale di lavoro.

## Formato di un file racconto

```
TITOLO: Il titolo del racconto
CATEGORIA: Nostalgia
DATA: 2026

Primo paragrafo del racconto.

Secondo paragrafo, separato dal primo da una riga vuota.

E così via, fino alla fine.
```

Le categorie già esistenti hanno un'icona e un colore dedicati: *Natura, Nostalgia, Sci-Fi, Arte, Viaggi, Racconti, Politica*. Puoi inventarne di nuove — appariranno con il colore "miele" di default.

## Caratteristiche del sito

- Filtri per categoria + ricerca live
- Tema chiaro / scuro con preferenza salvata
- Tempo di lettura stimato per ogni racconto
- Esperienza di lettura curata (drop cap, barra di avanzamento, tipografia letteraria)
- Responsive, accessibile, nessuna dipendenza pesante

---

*Un sorriso, una pausa, una piccola scintilla di mondo.*
