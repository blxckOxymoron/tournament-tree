<template>
  <div
    class="branch"
    :style="'flex-direction: ' + (reverse ? 'row-reverse' : 'row') + ';'"
  >
    <div
      class="team-placeholder"
      :style="`background-color: ${slot ? slot.color : 'orange'};`"
    >
      <h2>{{ _beaten }}</h2>
    </div>
    <branch-connector :width="reverse ? -32 : 32" :height="cHeight" />
    <div class="children">
      <branch-display
        v-for="(next, i) in branch.sub"
        :key="i"
        :branch="next"
        :reverse="reverse"
        :parent-slot="_slot"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Branch } from "@/types";
import { Options, Vue } from "vue-class-component";
import BranchConnector from "@/components/BranchConnector.vue";
import { Mutations } from "@/store";
import { TeamSlot } from "@/types";

@Options({
  name: "BranchDisplay",
  props: {
    branch: Object,
    reverse: Boolean,
    parentSlot: Object,
  },
  components: { BranchDisplay, BranchConnector },
})
export default class BranchDisplay extends Vue {
  branch!: Branch;
  reverse!: boolean;
  parentSlot?: TeamSlot;

  cHeight = 0;
  bound?: DOMRect;
  slot: TeamSlot = {
    x: 0,
    y: 0,
    color: "orange",
    full: false,
    beaten: false,
  };

  get _slot(): TeamSlot {
    if (this.parentSlot)
      this.slot.beaten = this.parentSlot.beaten || this.parentSlot.full;
    return this.slot;
  }

  get _Pfull(): boolean {
    return this.parentSlot?.full || false;
  }

  get _beaten(): boolean {
    return this._slot?.beaten || false;
  }

  mounted(): void {
    this.updateCHeight();
    const registered = this.registerSlot();
    if (!registered) console.log("unable to register Slot on mount", this);
  }

  //? necesarry? useless?
  /*
  updated(): void {
    this.updateCHeight();
  }
  */

  registerSlot(): boolean {
    const thisEl: Element | undefined = this.$el;
    if (!thisEl) return false;
    const placeholder = thisEl.querySelector(":scope > .team-placeholder");
    if (!placeholder) return false;
    this.slot = {
      x: placeholder.getBoundingClientRect().x,
      y: placeholder.getBoundingClientRect().y,
      color: "var(--clr-slot-empty)",
      full: false,
      beaten: false,
    };
    this.$store.commit(Mutations.REGISTER_SLOT, { slot: this.slot });
    return true;
  }

  updateCHeight(): void {
    if (!this.$el) return;
    const thisBound: DOMRect = this.$el.getBoundingClientRect();
    const parentBound: DOMRect = this.$parent?.$el.getBoundingClientRect();
    this.cHeight =
      thisBound.y +
      thisBound.height / 2 -
      (parentBound.y + parentBound.height / 2);
  }
}
</script>

<style lang="scss">
.branch {
  display: flex;
  align-items: center;
  position: relative;

  .team-placeholder {
    margin: 0.5rem 1rem;
    min-width: var(--width-team);
    height: var(--height-team);
    padding: 0.5rem;
    border-radius: 2rem;
    text-align: center;
    background-color: var(--clr-slot-empty);
    user-select: none;
    transition: background-color 100ms;
  }
}
.children {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
