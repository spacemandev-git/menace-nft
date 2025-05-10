<script>
  import Card from "$lib/Card/Card.svelte";
  import { DATA_CARDS } from "./data-cards";

  let place = $state(0);
  const cards = $derived(DATA_CARDS.slice(0 + place, 6 + place));
</script>

<button
  class="bg-blue-300 p-2 ml-5 z-50 absolute"
  onclick={() => (place = place + 6)}
>
  more {place}
</button>
<div class="w-screen h-screen grid grid-cols-3 p-2">
  {#each cards as card (card.imageName)}
    <Card {card} />
  {/each}
</div>
