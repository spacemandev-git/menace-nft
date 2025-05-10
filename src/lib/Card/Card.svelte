<script lang="ts">
  import SvgTemplate from "./SVGTemplate.svelte";

  const purple = "#B9019B";

  const options = {
    color: purple,
  };
</script>

<div class="w-[500px] h-[700px] relative">
  <span class="absolute vertical-text"> GEORGE WASHINGTON</span>
  <SvgTemplate />
</div>

<style>
  .vertical-text {
    writing-mode: vertical-rl; /* Vertical top-to-bottom, rotated right-to-left */
    text-orientation: sideways;
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Align last character to the bottom */
    height: 100%; /* or a fixed height like 300px */
    font-family: "Jersey 10", sans-serif;

    top: 3.5rem;
    left: -0.9rem;
    font-size: 3.5rem;
    color: white;
    padding: 1rem 0;
  }
</style>
