<script lang="ts">
  import re from "@ts/Redaction/Redactor";
  import Circle from "lucide-svelte/icons/circle";
</script>

<div class="short-profile-container grid items-start text-sm">
  <div>
    <b style="text-align:left;"> Short profile </b>
  </div>
  <div class="p-0">
    <Circle class="inline py-2" />Full-stack at {$re
      ?.shortProfileHiddenContent[0] ?? "Deprived devs"}
    <br />
    <Circle class="inline py-2" />Annotator at {$re
      ?.shortProfileHiddenContent[2] ?? "somewhere"}
    <br />
    <Circle class="inline py-2" />"AI and data" at {$re
      ?.shortProfileHiddenContent[1] ?? "some uni"}.
    <br />
    <Circle class="inline py-2" />Volunteer at {$re
      ?.shortProfileHiddenContent[3] ?? "Deprived devs"}.
  </div>
</div>

<style>
  .short-profile-container {
    width: 70%;
  }

  .short-profile-container > div:first-child {
    width: 100%;

    /* Bottom border stripe*/
    border-bottom: 1mm solid var(--left-line-color);
  }
</style>
