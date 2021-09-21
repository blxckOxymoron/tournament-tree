<template>
  <div class="dots">
    <div
      class="dot"
      v-for="(snapDot, i) of snapPositions"
      :style="`left: ${snapDot[0]}px; top: ${snapDot[1]}px`"
      :key="i"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class DebugDots extends Vue {
  get snapPositions(): [number, number][] {
    return this.$store.state.teamSlots.map((slot) => [slot.x, slot.y]);
  }
}
</script>

<style lang="scss">
.dots {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.dot {
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 0, 0, 0.3);
  z-index: 404;
}
</style>
