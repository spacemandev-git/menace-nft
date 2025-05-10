<script lang="ts">
  import SvgTemplate from "./SVGTemplate.svelte";

  const purple = "#B9019B";

  const options = {
    color: purple,
  };
</script>

<div class="w-[500px] h-[700px] relative font-jersey overflow-clip rounded-xl">
  <span class="absolute vertical-text"> GEORGE WASHINGTON</span>

  <div
    class="absolute top-[1.3rem] right-[2rem] w-fit h-[71px] flex justify-center text-white flex-col"
  >
    <span class="text-4xl"> menace </span>
    <span>to society</span>
  </div>
  <div
    class="absolute bottom-[1.3rem] left-[6rem] w-[294px] h-[71px] flex items-center"
  >
    <span class=" desc-text">
      Led the American Revolution against colonial rule, establishing a new
      nation based on republican ideals, challenging established monarchical
      systems.
    </span>
  </div>

  <SvgTemplate />
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
