<template>
  <div
    class="team"
    @mousedown="startDraging"
    @mouseup="stopDraging"
    :style="`transform: translate(${x}px, ${y}px); background-color: ${team.color}`"
  >
    <h2>{{ team.name }}</h2>
  </div>
</template>

<script lang="ts">
import { Mutations } from "@/store";
import { StoreSlotCoords, StoreTeamSlot, Team } from "@/types";
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
  slotId = -1;
  teamId = -1;

  get teamSlot(): StoreTeamSlot | undefined {
    return this.$store.getters.slot(this.slotId);
  }

  get teamSlotPos(): StoreSlotCoords | undefined {
    return this.$store.getters.slotPos(this.slotId);
  }
  mounted(): void {
    this.registerTeam();
    this.commitMoveClosest();
    this.moveToCurrentSlot();
  }

  registerTeam(): void {
    this.teamId = this.$store.getters.nextTeamId;

    this.$store.commit(Mutations.REGISTER_TEAM, {
      id: this.teamId,
      team: this.team,
    });
  }

  moveToCurrentSlot(): void {
    this.x = this.teamSlotPos?.x || 0;
    this.y = this.teamSlotPos?.y || 0;
  }

  startDraging(e: PointerEvent): void {
    if (!(this.$el instanceof HTMLElement)) return;
    this.dragOffsetX = e.clientX - this.x;
    this.dragOffsetY = e.clientY - this.y;

    this.$el.onpointermove = this.drag;
    this.$el.classList.add("selected");

    this.$el.setPointerCapture(e.pointerId);
  }

  stopDraging(e: PointerEvent): void {
    if (!(this.$el instanceof HTMLElement)) return;
    this.$el.onpointermove = null;
    this.$el.classList.remove("selected");

    this.$el.releasePointerCapture(e.pointerId);
    this.commitMoveClosest();
    this.moveToCurrentSlot();
  }

  commitMoveClosest(): void {
    const closestSlot: StoreTeamSlot | undefined =
      this.$store.getters.closestOpenSlot(this.x, this.y);

    const closestId = closestSlot ? closestSlot.id : -1;

    this.$store.commit(Mutations.MOVE_SLOT, {
      from: this.slotId,
      to: closestId,
      team: this.teamId,
    });
    this.slotId = closestId;
  }

  drag(e: PointerEvent): void {
    this.x = e.clientX - this.dragOffsetX;
    this.y = e.clientY - this.dragOffsetY;

    this.x = Math.min(
      Math.max(0, this.x),
      window.innerWidth - (this.bounds?.width || 0)
    );
    this.y = Math.min(
      Math.max(0, this.y),
      window.innerHeight - (this.bounds?.height || 0)
    );

    //! debouce this if performance too low! <(
    // clearTimeout(this.debouceId)
    // this.debounceId = setTimeout( ===>
    const nextSlot: StoreTeamSlot = this.$store.getters.closestOpenSlot(
      this.x,
      this.y
    );

    this.$store.commit(Mutations.MARK_SNAP_SLOT, { id: nextSlot.id });
    //! )>
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

  &:not(.selected) {
    transition: transform 100ms;
  }
  &.selected {
    z-index: 10;
  }
}
</style>
