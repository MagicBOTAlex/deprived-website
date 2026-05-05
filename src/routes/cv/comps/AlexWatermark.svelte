<script>
  export let Style = "";
</script>

<div class="container" style={Style}>ALEX</div>

<style lang="scss">
  .container {
    position: absolute;
    display: grid;
    justify-self: end;
    vertical-align: bottom;
    align-self: flex-end;

    // font settings
    font-size: 80mm;
    color: black;
    opacity: 5%;

    transform: translate(28%, -7.5mm) rotate(-90deg);
  }
</style>
