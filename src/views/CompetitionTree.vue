<template>
  <div class="tree">
    <button @click="treeLog">LOG</button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Branch, forEachBranch } from "@/branch";

export default class CompetitionTree extends Vue {
  tree: Branch = {
    sub: [
      {
        sub: [],
      },
      {
        sub: [
          {
            sub: [],
          },
          {
            sub: [],
          },
          {
            sub: [
              {
                sub: [],
              },
            ],
          },
        ],
      },
      {
        sub: [
          {
            sub: [],
          },
          {
            sub: [],
          },
        ],
      },
      {
        sub: [
          {
            sub: [],
          },
          {
            sub: [
              {
                sub: [],
              },
              {
                sub: [],
              },
              {
                sub: [],
              },
            ],
          },
          {
            sub: [],
          },
        ],
      },
    ],
  };

  treeLog(): void {
    forEachBranch(this.tree, (branch, layer, index) => {
      console.log(
        `${branch.sub.length} subbranches | ${layer} layer | ${index} index`
      );
    });
  }
}
</script>

<style></style>
