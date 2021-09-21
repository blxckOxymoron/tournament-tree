<template>
  <div
    class="team"
    @mousedown="startDraging"
    @mouseup="stopDraging"
    :style="`left: ${x}px; top: ${y}px`"
  >
    <h2>{{ team.name }}</h2>
  </div>
</template>

<script lang="ts">
import { Team, TeamSlot } from "@/types";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "TeamDisplay",
  props: {
    team: Object,
  },
})
export default class TeamDisplay extends Vue {
  team!: Team;

  x = 0;
  y = 0;
  dragOffsetX = 0;
  dragOffsetY = 0;
  shift = false;
  slot?: TeamSlot;

  mounted(): void {
    this.slot = this.$store.getters.closestOpenSlot(this.x, this.y);
    this.moveToCurrentSlot();
  }

  moveToCurrentSlot(): void {
    this.x = this.slot?.x || 0;
    this.y = this.slot?.y || 0;

    if (this.slot) this.slot.full = true;
  }

  startDraging(e: PointerEvent): void {
    if (!(this.$el instanceof HTMLElement)) return;
    this.dragOffsetX = e.clientX - this.x;
    this.dragOffsetY = e.clientY - this.y;

    this.$el.onpointermove = this.drag;
    this.$el.classList.add("selected");

    this.$el.setPointerCapture(e.pointerId);

    if (this.slot) this.slot.full = false;
  }

  stopDraging(e: PointerEvent): void {
    if (!(this.$el instanceof HTMLElement)) return;
    this.$el.onpointermove = null;
    this.$el.classList.remove("selected");

    this.$el.releasePointerCapture(e.pointerId);
    this.moveToCurrentSlot();
  }

  drag(e: PointerEvent): void {
    this.x = e.clientX - this.dragOffsetX;
    this.y = e.clientY - this.dragOffsetY;

    const nextSlot: TeamSlot = this.$store.getters.closestOpenSlot(
      this.x,
      this.y
    );

    if (
      !this.slot ||
      (nextSlot && !(nextSlot.x === this.slot.x && nextSlot.y === this.slot.y))
    ) {
      if (this.slot) this.slot.color = "var(--clr-slot-empty)";
      nextSlot.color = "var(--clr-slot-snap)";
      this.slot = nextSlot;
    }
    this.x = Math.min(
      Math.max(0, this.x),
      window.innerWidth - (this.bounds?.width || 0)
    );
    this.y = Math.min(
      Math.max(0, this.y),
      window.innerHeight - (this.bounds?.height || 0)
    );
  }

  get bounds(): DOMRect | null {
    if (!(this.$el instanceof Element)) return null;
    return this.$el.getBoundingClientRect();
  }
}
</script>

<style lang="scss">
.team {
  padding: 0.5rem;
  border-radius: 2rem;
  position: absolute;
  text-align: center;
  background: steelblue;
  width: var(--width-team);
  height: var(--height-team);
}
.team:not(.selected) {
  transition: top 100ms, left 100ms;
}
</style>
