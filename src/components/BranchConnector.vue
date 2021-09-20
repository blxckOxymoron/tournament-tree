<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="branch-connector"
    :width="_width + 'px'"
    :height="_height + 'px'"
    :style="style"
  >
    <path :d="path" />
  </svg>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "BranchConnector",
  props: {
    width: Number,
    height: Number,
  },
})
export default class BranchConnector extends Vue {
  width?: number;
  height?: number;
  get _width(): number {
    return Math.abs(this.width || 0);
  }
  get _height(): number {
    return Math.abs(this.height || 0);
  }
  get style(): string {
    const scale = `${(this.width || 0) < 0 ? "1" : "-1"},${
      (this.height || 0) < 0 ? "1" : "-1"
    }`;

    /*const margin = `${(this.height || 0) < 0 ? this._height : 0}px ${
      (this.width || 0) > 0 ? this._width : 0
    }px ${(this.height || 0) > 0 ? this._height : 0}px ${
      (this.width || 0) < 0 ? this._width : 0
    }px`;*/

    const margin = `${
      (this.height || 0) < 0 ? "margin-top" : "margin-bottom"
    }: ${this._height}px`;
    const offsetDir = (this.width || 0) < 0 ? "right" : "left";
    return `transform: scale(${scale}); ${margin}; ${offsetDir}: -1rem`;
  }

  get path(): string {
    let cornerRadius = Math.min(this._width, this._height) / 2;
    return `
    M 0 0 
    l ${this._width / 2 - cornerRadius} 0 
    q ${cornerRadius} 0 ${cornerRadius} ${cornerRadius} 
    l 0 ${this._height - cornerRadius * 2} 
    q 0 ${cornerRadius} ${cornerRadius} ${cornerRadius} 
    l ${this._width / 2 - cornerRadius} 0 
    `;
  }
}
</script>

<style lang="scss">
.branch-connector {
  stroke: var(--clr-text);
  stroke-width: 0.2rem;
  fill: none;
  overflow: visible;
  position: absolute;
  min-height: 1px;
}
</style>
