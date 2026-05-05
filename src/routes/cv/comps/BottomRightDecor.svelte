<script>
  export let Style = "";
</script>

<div class="container" style={Style}>
  <div class="w-full flex justify-center">
    <div class="text-center"></div>
  </div>
</div>

<style lang="scss">
  .container {
    position: absolute;
    transform: translate(20.3mm, -5mm) rotate(-45deg);
    display: grid;
    justify-self: end;
    vertical-align: bottom;
    align-self: flex-end;

    z-index: 0;

    > div:nth-child(1) {
      padding-top: 5mm;
      //border-bottom: #4472c4 dashed 2mm;

      background-image: linear-gradient(
        to right,
        var(--left-decor-line-color) 70%,
        rgba(255, 255, 255, 0) 0%
      );
      background-position: top;
      background-size: 6mm 1.5mm;
      background-repeat: repeat-x;
    }

    > div:nth-child(2) {
      background-color: var(--left-decor-line-color);
      width: 100mm;
      height: 25mm;

      // Text
      display: grid;
      place-content: center;
      align-content: flex-start;
      > div {
        padding-top: 3.5mm;
        color: #4a7bcf;
        font-weight: bold;
      }
    }
  }
</style>

