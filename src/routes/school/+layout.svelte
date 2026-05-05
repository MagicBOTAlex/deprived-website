<script lang="ts">
  let { children } = $props();
</script>

<div class="bg-base-300/50 text-center">
  ⚠️ Mobile support is not actively supported for school things ⚠️
</div>
<div class="">{@render children?.()}</div>
