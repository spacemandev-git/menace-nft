<script lang="ts">
  import { onMount } from "svelte";
  import menaces from "$lib/m2.json";
  // Define the type for our menaces data

  type Menace =
    | {
        "Name": string;
        "Field/Area": string;
        "Reason for being a 'Positive Menace'": string;
        "Reason for being a 'Negative Menace' (but historically boundary-pushing in a destructive way)"?: undefined;
      }
    | {
        "Name": string;
        "Field/Area": string;
        "Reason for being a 'Positive Menace'"?: undefined;
        "Reason for being a 'Negative Menace' (but historically boundary-pushing in a destructive way)": string;
      };

  let groupColors: Record<string, string> = {};
  let typeIcons: Record<string, string> = {};

  // Helper to randomize subtle animation per card
  function randomAnimProps(idx: number) {
    // Use idx for deterministic randomness per card
    const base = idx * 37;
    return {
      geoAngle: (base * 13) % 360,
      geoDuration: 8 + (base % 4),
      starburstAngle: (base * 19) % 360,
      starburstDuration: 10 + (base % 5),
      microOffset: `${base % 10}px, ${(base * 2) % 10}px`,
      microDuration: 12 + (base % 3),
      highlightAngle: (base * 23) % 360,
      highlightDuration: 14 + (base % 6),
      diagAngle: (base * 29) % 360,
      diagDuration: 16 + (base % 7),
    };
  }

  const cardAnimProps: ReturnType<typeof randomAnimProps>[] = menaces.map((_, idx) => randomAnimProps(idx));
  onMount(() => {
      console.log(menaces);
      console.log(`Menaces JSON length: ${menaces.length}`);

      // Check for duplicates by Name
      const nameMap = new Map<string, number[]>();
      menaces.forEach((menace: Menace, idx: number) => {
          const name = menace["Name"];
          if (!nameMap.has(name)) {
              nameMap.set(name, [idx]);
          } else {
              nameMap.get(name)?.push(idx);
          }
      });
      const duplicates = Array.from(nameMap.entries()).filter(([_, idxs]) => idxs.length > 1);
      if (duplicates.length > 0) {
          console.warn(`Duplicate Names found in menaces.json:`);
          duplicates.forEach(([name, idxs]) => {
              console.warn(`Name: '${name}' at indices: ${idxs.join(", ")}`);
          });
      } else {
          console.log("No duplicate Names found in m2.json.");
      }

      // Group by Field/Area and assign a color per group
      const palette = [
        '#bcd2e8', // blue
        '#e8dabd', // tan
        '#c8e8bd', // green
        '#e8bdbd', // red
        '#e8bde8', // purple
        '#bde8e2', // teal
        '#f5e8bd', // yellow
        '#d1bde8', // violet
      ];
      
      // Assign icons based on Field/Area
      typeIcons = {
        'Politics/Leadership': '👑',
        'Politics/Activism': '✊',
        'Civil Rights Leadership': '⚖️',
        'Civil Rights Activism': '🕊️',
        'Suffragette Movement': '♀️',
        'Science/Physics': '⚛️',
        'Science/Mathematics': '🧮',
        'Science/Biology': '🧬',
        'Technology/Computing': '💻',
        'Technology/Innovation': '💡',
        'Arts/Literature': '📚',
        'Arts/Music': '🎵',
        'Arts/Visual Arts': '🎨',
        'Philosophy': '🧠',
        'Business/Entrepreneurship': '💼',
        'Exploration': '🧭',
        'Religion/Spirituality': '🕯️',
        'Military/Strategy': '🎖️'
      };
      
      // Default icon for any category not explicitly mapped
      const defaultIcon = '🌟';
      
      let colorIdx = 0;
      menaces.forEach((m: any) => {
        const area = m["Field/Area"];
        if (!(area in groupColors)) {
          groupColors[area] = palette[colorIdx % palette.length];
          colorIdx++;
        }
        
        // Ensure every area has an icon
        if (!(area in typeIcons)) {
          typeIcons[area] = defaultIcon;
        }
      });
  })
</script>

<h1>Menaces</h1>

<!-- Add Font Awesome for icons -->
<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<style>
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.card {
  /* Reduced to 1/4 of original size */
  width: 6.25in;
  height: 8.75in;
  background:
    /* Holographic diagonal lines - simplified */
    repeating-linear-gradient(125deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.05) 10px),
    /* Light spot at top */
    radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%),
    /* Base gradient */
    linear-gradient(135deg, var(--card-bg, #bcd2e8) 0%, rgba(255,255,255,0.5) 40%, var(--card-bg, #bcd2e8) 100%);
  background-blend-mode: overlay, screen, normal;
  border-radius: 45px;
  box-shadow: 
    0 5px 20px rgba(0,0,0,0.18), 
    inset 0 2px 7px rgba(255,255,255,0.3);
  border: 8px solid #397fae;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  font-family: 'Garamond', 'Times New Roman', serif;
  position: relative;
  overflow: hidden;
}

/* Print-optimized holographic foil effects */

/* Geometric pattern layer - will catch light on foil */
.card-geometric-pattern {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="#b39ddb" stroke-width="2.5" opacity="0.45"/><path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#90caf9" stroke-width="2.5" opacity="0.45"/></svg>');
  background-size: 40px 40px;
  opacity: 0.5;
  pointer-events: none;
  border-radius: 40px;
  z-index: 1;
  mix-blend-mode: soft-light;
  transform: rotate(var(--geo-angle, 0deg));
  animation: geo-rotate var(--geo-duration, 8s) linear infinite;
}

/* Radial starburst pattern - creates dynamic light interaction on foil */
.card-starburst {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: conic-gradient(
    rgba(255,255,255,0.18) 0deg,
    rgba(186,104,200,0.20) 60deg,
    rgba(79,195,247,0.15) 120deg,
    rgba(255,241,118,0.18) 180deg,
    rgba(255,183,77,0.18) 240deg,
    rgba(255,255,255,0.18) 300deg,
    rgba(186,104,200,0.20) 360deg
  );
  background-size: 100% 100%;
  opacity: 0.36;
  pointer-events: none;
  border-radius: 40px;
  z-index: 2;
  mix-blend-mode: overlay;
  transform: rotate(var(--starburst-angle, 0deg));
  animation: starburst-rotate var(--starburst-duration, 10s) linear infinite;
}

/* Micro-pattern layer - creates fine detail on foil */
.card-micropattern {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="2.2" fill="#fffde7" opacity="0.35"/></svg>');
  background-size: 10px 10px;
  opacity: 0.28;
  pointer-events: none;
  border-radius: 40px;
  z-index: 3;
  mix-blend-mode: soft-light;
  animation: none;
}

/* Asymmetric highlight areas - creates dynamic light play on foil */
.card-highlight-areas {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background:
    radial-gradient(ellipse at 75% 20%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%),
    radial-gradient(ellipse at 25% 80%, rgba(79,195,247,0.13) 0%, rgba(255,255,255,0) 65%),
    radial-gradient(circle at 10% 30%, rgba(255,241,118,0.13) 0%, rgba(255,255,255,0) 50%),
    radial-gradient(circle at 90% 60%, rgba(186,104,200,0.15) 0%, rgba(255,255,255,0) 60%);
  opacity: 0.25;
  pointer-events: none;
  border-radius: 40px;
  z-index: 4;
  mix-blend-mode: lighten;
  transform: rotate(var(--highlight-angle, 0deg));
  animation: none;
}

/* Diagonal line pattern - creates prismatic effect on foil */
.card-diagonal-lines {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    #fffde7 0px,
    #b3e5fc 2px,
    #ce93d8 4px,
    #fffde7 8px,
    transparent 12px
  );
  opacity: 0.17;
  pointer-events: none;
  border-radius: 40px;
  z-index: 5;
  mix-blend-mode: color-dodge;
  transform: rotate(var(--diag-angle, 0deg));
  animation: none;
}
.card-title {
  font-size: 2.75rem;
  font-weight: bold;
  letter-spacing: 2.5px;
  background: rgba(190, 220, 240, 0.8);
  border-radius: 20px;
  padding: 0.625rem 1.25rem;
  margin-bottom: 0.75rem;
  width: 90%;
  text-align: center;
  border: 5px solid #397fae;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  z-index: 3;
}

.card-title-text {
  text-overflow: ellipsis;
  overflow: hidden;
  /* CSS variable for dynamic font sizing */
  font-size: var(--name-font-size, 11rem);
}

.card-icon {
  font-size: 2.25rem;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-art {
  flex: 6; /* Make artwork take up 60% of available space */
  width: 90%;
  background: #e5e5e5;
  border-radius: 30px;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: #888;
  font-size: 2.25rem;
  border: 5px solid #397fae;
  z-index: 3;
}
.card-desc {
  font-size: 1.5rem; /* Reduced relative to other elements */
  margin: 0.5rem 0.25rem 0.75rem 0.25rem;
  text-align: center;
  flex-shrink: 0;
  line-height: 1.3;
  max-height: 20%;
  overflow-y: auto;
  z-index: 3;
}

  /* Animations for dynamic holographic overlays */
  @keyframes geo-rotate {
    0% { transform: rotate(var(--geo-angle, 0deg)); }
    100% { transform: rotate(calc(var(--geo-angle, 0deg) + 360deg)); }
  }
  @keyframes starburst-rotate {
    0% { transform: rotate(var(--starburst-angle, 0deg)); }
    100% { transform: rotate(calc(var(--starburst-angle, 0deg) + 360deg)); }
  }
  @keyframes micro-move {
    0% { background-position: 0 0; }
    100% { background-position: 10px 10px; }
  }
  @keyframes highlight-rotate {
    0% { transform: rotate(var(--highlight-angle, 0deg)); }
    100% { transform: rotate(calc(var(--highlight-angle, 0deg) + 360deg)); }
  }
  @keyframes diag-rotate {
    0% { transform: rotate(var(--diag-angle, 0deg)); }
    100% { transform: rotate(calc(var(--diag-angle, 0deg) + 360deg)); }
  }
</style>

<div class="card-grid">
  {#each menaces as menace, idx}
    {#key menace.Name}
    <div class="card" style="--card-bg: {groupColors[menace['Field/Area']]};">
      <!-- Dynamic, subtle holographic foil layers -->
      <div
        class="card-geometric-pattern"
        style="
          animation: geo-rotate {cardAnimProps[idx].geoDuration}s linear infinite;
          --geo-angle: {cardAnimProps[idx].geoAngle}deg;
        "
      ></div>
      <div
        class="card-starburst"
        style="
          animation: starburst-rotate {cardAnimProps[idx].starburstDuration}s linear infinite;
          --starburst-angle: {cardAnimProps[idx].starburstAngle}deg;
        "
      ></div>
      <div
        class="card-micropattern"
        style="
          animation: micro-move {cardAnimProps[idx].microDuration}s linear infinite;
          background-position: {cardAnimProps[idx].microOffset};
        "
      ></div>
      <div
        class="card-highlight-areas"
        style="
          animation: highlight-rotate {cardAnimProps[idx].highlightDuration}s linear infinite;
          --highlight-angle: {cardAnimProps[idx].highlightAngle}deg;
        "
      ></div>
      <div
        class="card-diagonal-lines"
        style="
          animation: diag-rotate {cardAnimProps[idx].diagDuration}s linear infinite;
          --diag-angle: {cardAnimProps[idx].diagAngle}deg;
        "
      ></div>
      <div class="card-title">
        <span class="card-icon">{typeIcons[menace['Field/Area']]}</span>
        <span class="card-title-text" style="--name-font-size: {menace.Name.length > 15 ? '2rem' : '2.75rem'}">{menace.Name}</span>
      </div>
      <div class="card-art">Insert character<br />or scene artwork here</div>
      <div class="card-desc">{menace["Reason for being a 'Positive Menace'"] || menace["Reason for being a 'Negative Menace' (but historically boundary-pushing in a destructive way)"]}</div>
    </div>
    {/key}
  {/each}
</div>
