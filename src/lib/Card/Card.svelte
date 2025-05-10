<script lang="ts">
  import VanillaTilt from "vanilla-tilt";
  import { onMount } from "svelte";
  import SvgTemplate from "./SVGTemplate.svelte";
  import CIconCrown from "$lib/card-icons/CIcon_Crown.svelte";
  import QRCodeStyling from "qr-code-styling";
  import { base } from "$app/paths";
  import type { DATA_CARDS } from "../../routes/card/data-cards";

  let { card }: { card: (typeof DATA_CARDS)[number] } = $props();

  let qrCode: QRCodeStyling | undefined = $state();
  let qrRef: HTMLElement | null = $state(null);

  const qrCodeOptions = {
    width: 90,
    height: 90,
    data: "https://menace.finance/claim/1",
    image: base + "icons/gift.svg", // path to your center icon
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
        "max-glare": 0.5,
      });
    }
  });
</script>

<div
  bind:this={tiltRef}
  class="w-[500px] h-[700px] relative font-jersey overflow-clip rounded-xl scale-90 hover:scale-100 transition-all"
>
  <span class="absolute top-2 left-[0.5rem] w-[40px]">
    <CIconCrown />
  </span>
  <span class="absolute vertical-text uppercase">{card.name}</span>

  <div
    class="absolute top-[1.3rem] right-[2rem] w-fit h-[71px] flex justify-center text-white flex-col"
  >
    <span class="text-4xl"> menace </span>
    <span class="mt-[-8px]">to society</span>
  </div>
  <div
    class="absolute bottom-[1.3rem] left-[6rem] w-[294px] h-[71px] flex items-center"
  >
    <span class=" desc-text">
      {card.details?.reason}
    </span>
  </div>
  <div
    class="absolute bottom-[0.5rem] right-[0.85rem] rounded overflow-clip"
    bind:this={qrRef}
  ></div>

  {#key card.imageName}
    <SvgTemplate imgUrl={"/people/" + card.imageName.replace(" ", "_")} />
  {/key}
  <!-- <div -->
  <!--   class="w-full h-full absolute" -->
  <!--   style={`background: url("/people/Abdus Salam.png") 50% 0% / cover;`} -->
  <!-- ></div> -->
</div>

<style>
  .vertical-text {
    writing-mode: vertical-rl; /* Vertical top-to-bottom, rotated right-to-left */
    text-orientation: sideways;
    display: flex;
    flex-direction: column;
    height: 100%; /* or a fixed height like 300px */

    top: 3.5rem;
    left: -0.9rem;
    font-size: 3.5rem;
    color: white;
    padding: 1rem 0;
  }

  .desc-text {
    color: white;
    bottom: 1rem;
    width: 294px;
    left: 6rem;
  }
</style>
