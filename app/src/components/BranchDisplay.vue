<template>
  <div
    class="branch"
    :style="`flex-direction: ${
      reverse ? 'row-reverse' : 'row'
    };  color: ${displayTextColor}`"
  >
    <div class="team-placeholder" :style="`background-color: ${displayColor};`">
      <h2>×</h2>
    </div>
    <branch-connector :width="reverse ? -32 : 32" :height="cHeight" />
    <div class="children">
      <branch-display
        v-for="(next, i) in branch.sub"
        :key="i"
        :branch="next"
        :reverse="reverse"
        :parent-slot-id="_slotId"
        :parent-beaten="beaten"
        :parent-top-color="passedColor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Branch, StoreTeamSlot } from "@/types";
import { Options, Vue } from "vue-class-component";
import BranchConnector from "@/components/BranchConnector.vue";
import { Mutations } from "@/store";
import { SlotColors } from "@/main";

@Options({
  name: "BranchDisplay",
  props: {
    branch: Object,
    reverse: Boolean,
    parentSlotId: Number,
    parentBeaten: Boolean,
    parentTopColor: String,
  },
  components: { BranchDisplay, BranchConnector },
})
export default class BranchDisplay extends Vue {
  branch!: Branch;
  reverse!: boolean;
  parentSlotId!: number;
  parentBeaten!: boolean;
  parentTopColor?: string;

  slotId = -1;
  cHeight = 0;

  get _slotId(): number {
    return this.slotId;
  }

  get passedColor(): string {
    return this.teamSlot?.full
      ? this.teamSlot.color
      : this.parentTopColor || SlotColors.TEXT;
  }

  get displayTextColor(): string {
    const slot = this.teamSlot;
    if (!slot) return SlotColors.TEXT;
    if (slot.full)
      return this.parentBeaten ? SlotColors.TEXT_BEATEN : SlotColors.TEXT;
    return this.parentTopColor || SlotColors.TEXT;
  }

  get displayColor(): string {
    const slot = this.teamSlot;
    return slot
      ? slot.color === SlotColors.EMPTY
        ? this.beaten
          ? SlotColors.BEATEN
          : SlotColors.EMPTY
        : slot.color
      : SlotColors.LOADING;
  }

  get beaten(): boolean {
    return this.parentBeaten || this.teamSlot?.full || false;
  }

  get parentSlot(): StoreTeamSlot | undefined {
    return this.$store.getters.slot(this.parentSlotId);
  }

  get teamSlot(): StoreTeamSlot | undefined {
    return this.$store.getters.slot(this.slotId);
  }

  mounted(): void {
    this.updateCHeight();
    const registered = this.registerSlot();
    if (!registered) console.log("unable to register Slot on mount", this);
  }

  registerSlot(): boolean {
    const thisEl: Element | undefined = this.$el;
    if (!thisEl) return false;

    const placeholder = thisEl.querySelector(":scope > .team-placeholder");
    if (!placeholder) return false;

    this.slotId = this.$store.getters.nextSlotId;

    this.$store.commit(Mutations.REGISTER_SLOT, {
      id: this.slotId,
      pos: {
        x: placeholder.getBoundingClientRect().x,
        y: placeholder.getBoundingClientRect().y,
      },
    });
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
    position: relative;
    margin: 0.5rem 1rem;
    width: var(--width-team);
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
