<script>
    import Tags from "./Tags.svelte"; // Should've used better names lol

    export let isMobile = false;
    export let name = "";
    export let tags = ["null"];
</script>

<div class="flex items-center">
    <h2 style="font-size: {!isMobile ? 1.5 : 1.5}rem;">{name}</h2>
    <div class="flex flex-grow"/>
    {#if !isMobile}
         <Tags Tags={tags} isMobile={isMobile}/>
    {/if}
</div>