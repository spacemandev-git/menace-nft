<script lang="ts">
  import VanillaTilt from "vanilla-tilt";
  import { onMount } from "svelte";
  import SvgTemplate from "./SVGTemplate.svelte";
  import CIconCrown from "$lib/card-icons/CIcon_Crown.svelte";
  import QRCodeStyling from "qr-code-styling";
  import { base } from "$app/paths";
  import type { DATA_CARDS } from "../../routes/card/data-cards";
  import { getFieldCategory } from "./constants-fields";
  import CIconArt from "$lib/card-icons/CIcon_Art.svelte";
  import CIconHealth from "$lib/card-icons/CIcon_Health.svelte";
  import CIconExplore from "$lib/card-icons/CIcon_Explore.svelte";
  import CIconScience from "$lib/card-icons/CIcon_Science.svelte";
  import CIconWheel from "$lib/card-icons/CIcon_Wheel.svelte";

  let { card }: { card: (typeof DATA_CARDS)[number] } = $props();
  const { color, label, icon } = getFieldCategory(card.details?.field ?? "");
  console.log("FIELD", card.details?.field, label, color);

  let qrCode: QRCodeStyling | undefined = $state();
  let qrRef: HTMLElement | null = $state(null);

  const qrCodeOptions = {
    width: 90,
    height: 90,
    data: "https://menace.finance",
    // image: base + "icons/gift.svg", // path to your center icon
    dotsOptions: {
      color: "#000",
      type: "rounded",
    },
    backgroundOptions: {
      color: "#fff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
    },
  };

  onMount(() => {
    qrCode = new QRCodeStyling(qrCodeOptions as any);
    qrCode.append(qrRef as HTMLElement);
  });

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
  <span class="absolute top-2 left-[0.5rem] w-[40px]" style="color: {color};">
    {#if icon === "BuildingOfficeIcon"}
      <CIconCrown />
    {:else if icon === "PaintBrushIcon"}
      <CIconArt />
    {:else if icon === "HeartIcon"}
      <CIconHealth />
    {:else if icon === "GlobeEuropeAfricaIcon"}
      <CIconExplore />
    {:else if icon === "BeakerIcon"}
      <CIconScience />
    {:else if icon === "LightBulbIcon"}
      <CIconWheel />
    {/if}
  </span>
  <span class="absolute vertical-text uppercase line-clamp-1 tracking-wide"
    >{card.name}</span
  >

  <div
    class="absolute top-[1.3rem] right-[2rem] w-fit h-[71px] flex justify-center text-white flex-col"
  >
    <span class="text-4xl"> menace </span>
    <span class="mt-[-8px]">to <span class="text-2xl">{label}</span></span>
  </div>
  <div
    class="absolute bottom-[0.75rem] left-[4.25rem] h-[90px] flex items-center"
  >
    <span class="desc-text line-clamp-4">
      {card.details?.reason}
    </span>
  </div>
  <div
    class="absolute bottom-[0.5rem] right-[0.85rem] rounded overflow-clip"
    bind:this={qrRef}
  ></div>

  <SvgTemplate {color} imgUrl={"/people/" + card.imageName.replace(" ", "_")} />

  <div
    class="w-full h-full absolute top-0 z-[-1]"
    style={`background: url("${base}/people/${card.imageName.replaceAll(" ", "_")}") 50% 0% / cover;`}
  ></div>
</div>

<style>
  .vertical-text {
    writing-mode: vertical-rl; /* Vertical top-to-bottom, rotated right-to-left */
    text-orientation: sideways;
    display: flex;
    flex-direction: column;
    height: 100%; /* or a fixed height like 300px */
    width: 5.15rem;

    top: 3.5rem;
    left: -0.9rem;
    font-size: 3.5rem;
    color: white;
    padding: 1rem 0;
  }

  .desc-text {
    line-height: 1rem;
    color: white;
    width: 325px;
  }
</style>
