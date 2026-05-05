<script>
  import re from "@src/ts/Redaction/Redactor";
  import IconAndText from "./IconAndText.svelte";
</script>

<div class="container">
  <div>
    <b style="text-align:left;"> Experience </b>
  </div>
  <div class="table">
    <div class="table-item">
      <IconAndText logo={$re?.experience[0].imageId ?? ""}>
        <b>Full-stack</b> - Part-time<br />
        {$re?.experience[0].name ?? "[REDACTED] Deprived devs"}
        <br />
        <i>Feb 2025 - Now</i>
      </IconAndText>
    </div>
    <div class="table-item">
      <IconAndText logo={$re?.experience[1].imageId ?? ""}>
        <b>Data annotator</b> - Free-time<br />
        {$re?.experience[1].name ?? "Some AI company"}<br />
        <i>Jul 2024 - Now</i>
      </IconAndText>
    </div>
    <div class="table-item">
      <IconAndText logo={$re?.experience[2].imageId ?? ""}>
        <b>3D printer manager</b> - Volunteer<br />
        {$re?.experience[2].name ?? "Actually Volunteering"}<br />
        <i>Nov 2023 - Jan 2026</i>
      </IconAndText>
    </div>
    <div class="table-item">
      <IconAndText logo={$re?.experience[3].imageId ?? ""}>
        <b>Machine Learning Engineer</b> - Short term intern<br />
        {$re?.experience[3].name ?? "YKYK"}<br />
        <i>Apr 2024 - Apr 2024</i>
      </IconAndText>
    </div>
    <div class="table-item">
      <IconAndText logo={$re?.experience[4].imageId ?? ""}>
        <b>Assistant</b> - Short term intern<br />
        {$re?.experience[4].name ??
          "Awesome VR place, but got rejected 2 times after"}<br />
        <i>Oct 2020 - Oct 2020</i>
      </IconAndText>
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    place-items: center;
    width: 90%;

    overflow: hidden;

    & > div:first-child {
      width: 100%;

      /* Bottom border stripe*/
      border-bottom: 1mm solid black;
    }
  }

  .table-item {
    padding: 2mm;

    &:not(:last-child) {
      border-bottom: 0.25mm solid #000000;
    }
  }
</style>
