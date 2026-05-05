<script lang="ts">
  import re from "@src/ts/Redaction/Redactor";

  // Gave up because a little drunk, so rest is chatgpt

  function getHTML(url: string): Promise<string> {
    return fetch(url, { method: "GET", headers: { Accept: "text/html" } }).then(
      (res) => {
        if (!res.ok)
          throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}`);
        return res.text();
      },
    );
  }

  // recompute the promise when the (store-derived) URL changes
  $: url = $re?.linkedIn?.imageId || "";
  $: htmlPromise = url ? getHTML(url) : Promise.resolve("");
</script>

<div class="container">
  <div>LinkedIn</div>
  <div class="qrcode corner-border-container p-4">
    {#await htmlPromise}
      <span>Loading…</span>
    {:then html}
      {@html html}
    {:catch err}
      <span class="text-red-600">{err.message}</span>
    {/await}
  </div>
</div>

<style lang="scss">
  .corner-border-container {
    --length: 20px;
    --width: 4px;
    background-color: var(--left-grid-bg-color);
    background-image:
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      );
    background-size:
      var(--length) var(--width),
      var(--width) var(--length),
      var(--length) var(--width),
      var(--width) var(--length),
      var(--length) var(--width),
      var(--width) var(--length),
      var(--length) var(--width),
      var(--width) var(--length);
    background-position:
      top left,
      top left,
      top right,
      top right,
      bottom right,
      bottom right,
      bottom left,
      bottom left;
    background-repeat: no-repeat;
  }

  .qrcode {
    transform: scale(0.9);
  }

  .container {
    display: grid;
    place-items: center;

    & * {
      font-size: 7.5mm;
    }
  }
</style>
