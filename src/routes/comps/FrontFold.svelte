<script>
    export let Title = "";
    export let Checked = false;
</script>

<div class="collapse collapse-arrow bg-base-100 text-start shadow-sm" {...$$restProps}>
    {#if Checked}
    <input type="radio" name="{Title}" checked/>
    {:else}
    <input type="radio" name="{Title}"/>
    {/if}
    <div class="collapse-title text-xl font-medium "><b>{Title}</b></div>
    <div class="collapse-content" style="border-top: dotted 0.15rem oklch(var(--b3));">
        <slot/>
    </div>
</div>