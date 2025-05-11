<script lang="ts">
  import { page } from "$app/state";
  import Card from "$lib/Card/Card.svelte";
  import { DATA_CARDS } from "./data-cards";

  const params = {
    mod: page.url.searchParams.get("mod"),
    scale: page.url.searchParams.get("scale"),
    perrow: page.url.searchParams.get("perrow"),
  };

  let mod = $state(params.mod ? Number(params.mod) : 9);
  let place = $state(0);
  const cards = $derived(DATA_CARDS.slice(0 + place, mod + place));

  // Scale settings for printing
  let cardScale = $state(params.scale ? Number(params.scale) : 0.5); // Default scale for printing
  let cardsPerRow = $state(params.perrow ? Number(params.perrow) : 3); // Default cards per row

  // Update print stylesheet when scale or cardsPerRow changes
  $effect(() => {
    updatePrintStyles(cardScale, cardsPerRow);
  });

  // Function to update print styles dynamically
  function updatePrintStyles(scale: number, cardsPerRow: number) {
    const styleId = "print-card-styles";
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const cardWidth = 500; // Base card width in px
    const cardHeight = 700; // Base card height in px

    styleElement.textContent = `
      @media print {
        #card-grid {
          display: grid !important;
          grid-template-columns: repeat(${cardsPerRow}, ${cardWidth * scale}px) !important;
          grid-auto-rows: ${cardHeight * scale}px !important;
          row-gap: 0px !important;
          column-gap: 1px !important;
          justify-content: center !important;
        }
        
        .print-card-wrapper {
          width: ${cardWidth * scale}px !important;
          height: ${cardHeight * scale}px !important;
          transform-origin: top left !important;
          position: relative !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          overflow: hidden !important;
border: solid black;
border-width:  0 2px;
        }
        
        .card-group {
          transform: scale(${scale}) !important;
          transform-origin: top left !important;
          position: absolute !important;
          top: -3px !important;
          left: 0 !important;
        }
        
        /* Fix for QR code spacing and margin */
        .print-card-wrapper {
          padding-bottom: ${20 * scale}px !important; /* Add padding to the bottom of each card wrapper */
        }
        
        /* Ensure QR code has proper spacing */
        .card-group div[class*="bottom-"][class*="right-"] {
          bottom: ${24 * scale}px !important; /* Move QR code up by 30px (scaled) */
          outline: ${4 * scale}px solid black !important; /* Add a thick black border all around QR code */
          background-color: black !important;
          border-radius: ${4 * scale}px !important;
          overflow: visible !important;
        }
      }
    `;
  }
</script>

<div class="controls mb-4 p-4 bg-gray-100 flex flex-wrap gap-4 items-center">
  <button
    class="bg-blue-300 px-3 py-1 rounded"
    onclick={() => (place = Math.max(place - mod, 0))}
  >
    Prev
  </button>

  <button
    class="bg-blue-300 px-3 py-1 rounded"
    onclick={() => (place = place + mod)}
  >
    Next ({place})
  </button>

  <div class="print-options ml-8">
    <label for="card-amount" class="mr-2">Cards per page: {mod}</label>
    <input
      id="card-amount"
      type="range"
      min="6"
      max="36"
      step="1"
      bind:value={mod}
    />

    <label for="print-scale" class="mr-2">Print Scale: {cardScale}</label>
    <input
      id="print-scale"
      type="range"
      min="0.2"
      max="1"
      step="0.05"
      bind:value={cardScale}
    />

    <label for="cards-per-row" class="mx-2">Cards Per Row: {cardsPerRow}</label>
    <input
      id="cards-per-row"
      type="range"
      min="1"
      max="5"
      step="1"
      bind:value={cardsPerRow}
    />

    <button
      class="bg-green-500 text-white px-3 py-1 rounded ml-4"
      onclick={() => window.print()}
    >
      Print Cards
    </button>
  </div>
</div>

<div
  id="card-grid"
  class="w-screen min-h-screen flex flex-wrap gap-1 justify-center"
>
  {#each cards as card (card.imageName)}
    <div class="print-card-wrapper">
      <Card {card} />
    </div>
  {/each}
</div>

<style>
  :root {
    --card-width: 500px;
    --card-height: 700px;
    --card-scale: 1; /* Default scale for normal viewing */
  }

  /* Styles for the card wrapper in print and normal views */
  .print-card-wrapper {
    position: relative;
    /* In normal view, we don't need to specify dimensions as they're controlled by flex */
  }

  @media print {
    :root {
      --card-scale: 0.5; /* Adjust this value to fit more cards on a page */
    }

    .controls {
      display: none;
    }

    @page {
      size: landscape;
      margin: 0px;
      padding: 1rem;
    }

    #card-grid {
      display: grid;
      grid-template-columns: repeat(
        3,
        calc(var(--card-width) * var(--card-scale))
      ); /* 3 columns, adjust as needed */
      gap: 4px; /* Remove gaps for clean cuts */
      grid-template-rows: auto;
      justify-content: center;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    :global(.card-group) {
      margin-top: 5px;
      page-break-inside: avoid;
      break-inside: avoid;
      outline: solid 4px black;
      border-radius: 0;
    }

    button {
      display: none;
    }

    /* Prevent forced page breaks */
    * {
      break-inside: avoid;
      page-break-inside: avoid;
      page-break-before: auto;
      page-break-after: auto;
    }
  }
</style>
