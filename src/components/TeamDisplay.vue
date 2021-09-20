<template>
  <div class="team">
    <h2>TEAM</h2>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "TeamDisplay",
  props: {
    name: String,
    color: Number,
  },
})
export default class TeamDisplay extends Vue {}
</script>

<style lang="scss">
.team {
  padding: 0.5rem;
  border-radius: 2rem;
  position: absolute;
}
</style>
