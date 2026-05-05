<script>
    import Tags from "./Tags.svelte";

    export let isMobile = false;
    export let tags = ["null"];
</script>

{#if isMobile}
    <Tags Tags={tags} isMobile={isMobile}/>
{/if}