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
  width: 25in;
  height: 35in;
  background:
    /* Texture pattern using CSS gradients */
    repeating-linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 20px, transparent 20px, transparent 80px),
    radial-gradient(circle at 50% 25%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%),
    linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 100%),
    var(--card-bg, #bcd2e8);
  background-blend-mode: overlay, screen, multiply, normal;
  border-radius: 180px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.18), inset 0 10px 30px rgba(255,255,255,0.3);
  border: 30px solid #397fae;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
  box-sizing: border-box;
  font-family: 'Garamond', 'Times New Roman', serif;
  position: relative;
}
.card-title {
  font-size: 11rem;
  font-weight: bold;
  letter-spacing: 10px;
  background: rgba(190, 220, 240, 0.8);
  border-radius: 80px;
  padding: 2.5rem 5rem;
  margin-bottom: 3rem;
  width: 90%;
  text-align: center;
  border: 20px solid #397fae;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
}

.card-title-text {
  text-overflow: ellipsis;
  overflow: hidden;
  /* CSS variable for dynamic font sizing */
  font-size: var(--name-font-size, 11rem);
}

.card-icon {
  font-size: 9rem;
  margin-right: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-art {
  flex: 6; /* Make artwork take up 60% of available space */
  width: 90%;
  background: #e5e5e5;
  border-radius: 120px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: #888;
  font-size: 9rem;
  border: 20px solid #397fae;
}
.card-desc {
  font-size: 6rem; /* Reduced relative to other elements */
  margin: 2rem 1rem 3rem 1rem;
  text-align: center;
  flex-shrink: 0;
  line-height: 1.3;
  max-height: 20%;
  overflow-y: auto;
}
.card-type {
  font-size: 8rem;
  font-style: italic;
  background: rgba(255,255,255,0.85);
  border-radius: 60px;
  padding: 1rem 4rem;
  margin-bottom: 1rem;
  border: 15px solid #397fae;
}
</style>

<div class="card-grid">
  {#each menaces as menace}
    <div class="card" style="--card-bg: {groupColors[menace['Field/Area']]}">
      <div class="card-title">
        <span class="card-icon">{typeIcons[menace['Field/Area']]}</span>
        <span class="card-title-text" style="--name-font-size: {menace.Name.length > 15 ? '8rem' : '11rem'}">{menace.Name}</span>
      </div>
      <div class="card-art">Insert character<br />or scene artwork here</div>
      <div class="card-desc">{menace["Reason for being a 'Positive Menace'"] || menace["Reason for being a 'Negative Menace' (but historically boundary-pushing in a destructive way)"]}</div>
    </div>
  {/each}
</div>
