<script lang="ts">
    export let Tags = ["null"];
    export let isMobile = false;

    // Define an interface for our detailed color object.
    interface ColorObject {
        color1: string;
        color2: string;
        rotation: string;
        offset: string;
    }

    // ColorType can be a simple string or a ColorObject.
    type ColorType = string | ColorObject;

    // Create an interface for the color mapping.
    interface ColorsMapping {
        [key: string]: ColorType;
    }

    // Define a class to manage the colors.
    class ColorManager {
        private colors: ColorsMapping;

        constructor() {
            this.colors = {
                "programmer": "#0CC27F",
                "uxdesigner": "#027893",
                "3dartist": "#F4881C",
                "2dartist": "#F1EAC0",
                "2d/3dartist": { color1: "#F1EAC0", color2: "#F4881C", rotation: "-65deg", offset: "71.5%" },
                "sound/story": { color1: "#F3EC2A", color2: "#EEC12A", rotation: "-65deg", offset: "50%" },
                "sounddesigner": "#F3EC2A",
                "storydesigner": "#EEC12A",
                "back-endadmin": "#3236a8",
            };
        }

        // Return the color for the given key or a default value.
        getColor(key: string): ColorType {
            return this.colors[key] || "#ccc";
        }
    }

    // Create an instance of ColorManager.
    const colorManager = new ColorManager();
</script>

<div class="flex gap-2" style="font-size: { !isMobile ? '0.875rem' : '2vw' };">
    {#each Tags as tag}
        {@const key = tag.replaceAll(" ", "").toLowerCase()}
        {@const color = colorManager.getColor(key)}
        {#if key.indexOf("/") < 0}
            <!-- Single Color Badge -->
            <div class="badge2" style="background-color: {typeof color === 'string' ? color : '#ccc'};">
                <span class="invert">
                    {tag}
                </span>
            </div>
        {:else}
            <!-- Gradient Badge -->
            {#if typeof color === 'object' && color !== null}
                <div 
                    class="badge2 cozette" 
                    style="background: linear-gradient({color.rotation}, {color.color2} {color.offset}, {color.color1} {color.offset});">
                    <span class="invert">
                        {tag}
                    </span>
                </div>
            {:else}
                <div class="badge2 cozette" style="background-color: #ccc;">
                    <span class="invert">
                        {tag}
                    </span>
                </div>
            {/if}
        {/if}
    {/each}
</div>

<style>
    .badge2 {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 1.25rem; /* 20px */
        line-height: 1.25rem; /* 20px */
        width: fit-content;
        padding-left: 0.563rem; /* 9.008px */
        padding-right: 0.563rem; /* 9.008px */
        border-radius: var(--rounded-badge, 1.9rem); /* 30.4px */
    }
</style>
