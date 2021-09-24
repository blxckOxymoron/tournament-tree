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

  dragX = 0;
  dragY = 0;

  dragOffsetX = 0;
  dragOffsetY = 0;
  teamId = -1;
  draging = false;

  get x(): number {
    return this.draging ? this.dragX : this.teamSlotPos?.x || 0;
  }
  get y(): number {
    return this.draging ? this.dragY : this.teamSlotPos?.y || 0;
  }

  get slotId(): number {
    const team = this.$store.getters.team(this.teamId);
    return team ? team.slotId : -1;
  }

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
    this.dragX = this.teamSlotPos?.x || 0;
    this.dragY = this.teamSlotPos?.y || 0;
  }

  startDraging(e: PointerEvent): void {
    if (!(this.$el instanceof HTMLElement)) return;
    this.dragX = this.x;
    this.dragY = this.y;
    this.draging = true;
    this.dragOffsetX = e.clientX - this.dragX;
    this.dragOffsetY = e.clientY - this.dragY;

    this.$el.onpointermove = this.drag;
    this.$el.classList.add("selected");

    this.$el.setPointerCapture(e.pointerId);
  }

  stopDraging(e: PointerEvent): void {
    if (!(this.$el instanceof HTMLElement)) return;
    this.draging = false;
    this.$el.onpointermove = null;
    this.$el.classList.remove("selected");

    this.$el.releasePointerCapture(e.pointerId);
    this.commitMoveClosest();
    this.moveToCurrentSlot();
  }

  commitMoveClosest(): void {
    const closestSlot: StoreTeamSlot | undefined =
      this.$store.getters.closestOpenSlot(this.dragX, this.dragY);

    const closestId = closestSlot ? closestSlot.id : -1;

    this.$store.commit(Mutations.MOVE_SLOT, {
      from: this.slotId,
      to: closestId,
      team: this.teamId,
    });
  }

  drag(e: PointerEvent): void {
    this.dragX = e.clientX - this.dragOffsetX;
    this.dragY = e.clientY - this.dragOffsetY;

    this.dragX = Math.min(
      Math.max(0, this.dragX),
      window.innerWidth - (this.bounds?.width || 0)
    );
    this.dragY = Math.min(
      Math.max(0, this.dragY),
      window.innerHeight - (this.bounds?.height || 0)
    );

    //! debouce this if performance too low! <(
    // clearTimeout(this.debouceId)
    // this.debounceId = setTimeout( ===>
    const nextSlot: StoreTeamSlot = this.$store.getters.closestOpenSlot(
      this.dragX,
      this.dragY
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
