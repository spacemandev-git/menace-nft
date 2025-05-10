<script lang="ts">
    import { onMount } from "svelte";
    import menaces from "../../static/m2.json";
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
        let colorIdx = 0;
        menaces.forEach((m: any) => {
          const area = m["Field/Area"];
          if (!(area in groupColors)) {
            groupColors[area] = palette[colorIdx % palette.length];
            colorIdx++;
          }
        });
    })
</script>

<h1>Menaces</h1>

<style>
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card {
  width: 2.5in;
  height: 3.5in;
  background: var(--card-bg, #bcd2e8);
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  border: 3px solid #397fae;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.4rem;
  box-sizing: border-box;
  font-family: 'Garamond', 'Times New Roman', serif;
  position: relative;
}
.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 1px;
  background: rgba(190, 220, 240, 0.8);
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.3rem;
  width: 90%;
  text-align: center;
  border: 2px solid #397fae;
}
.card-art {
  flex: 1;
  width: 90%;
  background: #e5e5e5;
  border-radius: 12px;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: #888;
  font-size: 0.9rem;
  border: 2px solid #397fae;
}
.card-desc {
  font-size: 0.85rem;
  margin: 0.2rem 0.1rem 0.3rem 0.1rem;
  text-align: center;
  flex-shrink: 0;
}
.card-type {
  font-size: 0.8rem;
  font-style: italic;
  background: rgba(255,255,255,0.85);
  border-radius: 6px;
  padding: 0.1rem 0.4rem;
  margin-bottom: 0.1rem;
  border: 1.5px solid #397fae;
}
</style>

<div class="card-grid">
  {#each menaces as menace}
    <div class="card" style="--card-bg: {groupColors[menace['Field/Area']]}">
      <div class="card-title">{menace.Name}</div>
      <div class="card-art">Insert character<br />or scene artwork here</div>
      <div class="card-desc">{menace["Reason for being a 'Positive Menace'"] || menace["Reason for being a 'Negative Menace' (but historically boundary-pushing in a destructive way)"]}</div>
      <div class="card-type">{menace["Field/Area"]}</div>
    </div>
  {/each}
</div>
