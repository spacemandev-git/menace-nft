<script>
  import Card from "$lib/Card/Card.svelte";
  import { DATA_CARDS } from "./data-cards";

  const cards = DATA_CARDS.slice(0, 5);
</script>

<div class="w-screen h-screen grid grid-cols-3 p-2">
  {#each cards as card (card.imageName)}
    <Card {card} />
  {/each}
</div>
