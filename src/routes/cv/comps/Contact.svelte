<script lang="ts">
  import re from "@ts/Redaction/Redactor";
</script>

<div class="container">
  <div>
    <b style="text-align:left;"> Contact </b>
  </div>
  <div class="table-display">
    <div class="table-item">
      <div>Email</div>
      <div>{$re?.email ?? "alex@deprived.dev"}</div>
    </div>
    <div class="table-item">
      <div>Phone</div>
      <div>{$re?.phone ?? "1-800-273-8255"}</div>
    </div>
    <div class="table-item">
      <div>LinkedIn</div>
      <a
        href={$re?.linkedIn.link ??
          "https://www.youtube.com/watch?v=PaPotS8GSpc"}
        >{$re?.linkedIn.text ?? "cool video lmao"}</a
      >
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    place-items: center;
    width: 70%;
  }

  .container > div:first-child {
    width: 100%;

    /* Bottom border stripe*/
    border-bottom: 1mm solid var(--left-line-color);
  }

  .table-display {
    width: 100%;
  }

  .table-item {
    display: flex;
    justify-items: start;

    width: 100%;
    border-bottom: 0.25mm solid #000000;

    > a {
      text-decoration: underline;
    }

    > div,
    > a {
      &:first-child {
        width: 35%;
        font-size: 4mm;

        display: grid;
        place-content: center start;

        border-right: rgba(128, 128, 128, 0.4) dashed 0.1mm;
      }

      &:nth-child(2) {
        width: 65%;

        font-size: 3.25mm;
        display: grid;
        place-content: center;

        padding-left: 1mm;
      }
    }
  }
</style>
