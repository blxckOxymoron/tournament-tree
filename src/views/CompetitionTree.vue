<template>
  <div class="tree">
    <branch-display :branch="tree.sub[0]" :reverse="true" />
    <branch-display :branch="tree.sub[1]" :reverse="false" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Branch } from "@/types";
import BranchDisplay from "@/components/BranchDisplay.vue";

interface RootBranch extends Branch {
  sub: [Branch, Branch];
}

@Options({
  components: { BranchDisplay },
})
export default class CompetitionTree extends Vue {
  dummyBranch: Branch = {
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
  wmBranch: Branch = {
    sub: Array<Branch>(2).fill({
      sub: Array<Branch>(2).fill({
        sub: Array<Branch>(2).fill({
          sub: [],
        }),
      }),
    }),
  };
  tree: RootBranch = {
    sub: [this.wmBranch, this.wmBranch],
  };
}
</script>

<style>
.tree {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  min-height: 100vh;
}
</style>
