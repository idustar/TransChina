<template>
      <div class="ceil">
        <div class="sub-ceil" :class="(!grey?'grey ':'')+direction">
        </div>
      </div>
</template>

<script>
export default {
  props: ['direction', 'grey']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ceil {
    width: 100%;
    height: 80px;
    overflow: hidden;
  }
  .sub-ceil {
    width: 50%;
    height: 50%;
    position: relative;
    border:0 solid dodgerblue;
  }
  .grey{
    border:0 solid #aaaaaa;
  }
  .no-direction {
  }
  .top-right {
    top: calc(50% - 5px);
    border-top-width: 10px;
    border-right-width: 10px;
    border-top-right-radius: 40px;
  }
  .bottom-right {
    height: calc(50% - 5px);
    border-bottom-width: 10px;
    border-right-width: 10px;
    border-bottom-right-radius: 40px;
  }
  .top-left {
    top: calc(50% - 5px);
    left: calc(50% - 5px);
    border-top-width: 10px;
    border-left-width: 10px;
    border-top-left-radius: 40px;
  }
  .bottom-left {
    height: calc(50% - 5px);
    left: calc(50% - 5px);
    border-bottom-width: 10px;
    border-left-width: 10px;
    border-bottom-left-radius: 40px;
  }
</style>
