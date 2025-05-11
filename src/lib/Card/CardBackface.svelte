<script lang="ts">
  import VanillaTilt from "vanilla-tilt";
  import { onMount } from "svelte";
  import SvgTemplate from "./SVGTemplate.svelte";
  import type { DATA_CARDS } from "../../routes/card/data-cards";
  import { getFieldCategory } from "./constants-fields";

  let { card }: { card: (typeof DATA_CARDS)[number] } = $props();
  const { color, label, icon } = getFieldCategory(card.details?.field ?? "");
  console.log("FIELD", card.details?.field, label, color);

  let tiltRef: HTMLElement | null = $state(null);

  onMount(() => {
    if (tiltRef) {
      VanillaTilt.init(tiltRef, {
        max: 25,
        speed: 400,
        glare: true,
        transition: true,
        "max-glare": 0.5,
      });
    }
  });
</script>

<div
  bind:this={tiltRef}
  class="card-group w-[500px] h-[700px] relative font-jersey overflow-clip rounded-xl transition-all bg-red-200 hover:z-50"
>
  <div class="opacity-0">
    <SvgTemplate
      {color}
      imgUrl={"/people/" + card.imageName.replace(" ", "_")}
    />
  </div>

  <div
    class="w-full h-full absolute top-0 z-[-1]"
    style={`background: url("https://picsum.photos/700") 50% 0% / cover;`}
  ></div>
</div>
