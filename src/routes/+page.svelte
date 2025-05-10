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
    })
</script>

<h1>Menaces</h1>
