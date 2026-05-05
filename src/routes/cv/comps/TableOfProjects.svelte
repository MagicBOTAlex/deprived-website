<script lang="ts">
  import * as m from "$paraglide/messages";
</script>

<div class="container flex flex-col items-center">
  <div class="flex gap-1">
    <b style="text-align:left;">
      {m["zhen.cv.projects.title"]()}
    </b>
    <span class="opacity-70 text-[0.5rem] flex justify-end flex-col">
      {m["zhen.cv.projects.tooltip"]()}
    </span>
  </div>
  <div class="table-display text-sm justify-center">
    <div class="table-item">
      <div>HTML</div>
      <div>{m["zhen.cv.projects.cv"]()}</div>
    </div>
    <div class="table-item">
      <div>Computer vision</div>
      <div>{m["zhen.cv.projects.CV"]()}</div>
    </div>
    <div class="table-item">
      <div>Arduino/embedded</div>
      <div>{m["zhen.cv.projects.embedded"]()}</div>
    </div>
    <!-- <div class="table-item"> -->
    <!--   <div>App dev</div> -->
    <!--   <div>Made an Doulingo'ish app for learning chinese.</div> -->
    <!-- </div> -->
    <div class="table-item">
      <div>Open-source</div>
      <div>{m["zhen.cv.projects.open"]()}</div>
    </div>
    <div class="table-item">
      <div>PCB design</div>
      <div>{m["zhen.cv.projects.pcb"]()}</div>
    </div>
    <div class="table-item">
      <div>Kubernetes</div>
      <div>{m["zhen.cv.projects.kube"]()}</div>
    </div>
  </div>
</div>

<style lang="scss">
  .container > div:first-child {
    width: 90%;

    /* Bottom border stripe*/
    border-bottom: 1mm solid black;
    white-space: pre;
  }

  .table-display {
    width: 90%;
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
      color: #000000;

      &:first-child {
        width: 25%;
        font-size: 3mm;

        display: grid;
        place-content: center start;
        font-weight: bold;

        border-right: rgba(128, 128, 128, 0.4) dashed 0.1mm;
      }

      &:nth-child(2) {
        font-size: 3.5mm;

        padding-left: 2mm;
      }
    }
  }
</style>
