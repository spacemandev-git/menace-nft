<script>
  import Card from "$lib/Card/Card.svelte";
  import { DATA_CARDS } from "./data-cards";

  const mod = 12;
  let place = $state(0);
  const cards = $derived(DATA_CARDS.slice(0 + place, mod + place));
</script>

<button
  class="bg-blue-300 ml-5 z-50 absolute top-2"
  onclick={() => (place = Math.max(place - mod, 0))}
>
  prev
</button>
<button
  class="bg-blue-300 ml-5 z-50 absolute top-10"
  onclick={() => (place = place + mod)}
>
  next {place}
</button>
<div
  id="card-grid"
  class="w-screen min-h-screen flex flex-wrap gap-1 justify-center"
>
  {#each cards as card (card.imageName)}
    <Card {card} />
  {/each}
</div>

<style>
  @media print {
    @page {
      size: landscape;
      margin: 0px;
      padding: 1rem;
    }

    #card-grid {
      transform: scale(0.7); /* tweak to fit more cards */
      transform-origin: top center;

      display: grid;
      grid-template-columns: repeat(
        2,
        500px
      ); /* 2 columns per row on A4 landscape */
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
