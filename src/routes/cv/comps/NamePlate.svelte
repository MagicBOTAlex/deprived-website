<script lang="ts">
  import re from "@ts/Redaction/Redactor";
</script>

<div class="name-plate-container">
  <span style="text-align: center;">
    <b>{$re?.name ?? "BOTAlex"}</b><br />
    (He/Him)
  </span>
</div>

<style>
  .name-plate-container {
    display: grid;
    place-items: center;
    width: 60%;

    /* Bottom border stripe*/
    border-bottom: 1mm solid var(--left-line-color);
  }
</style>
