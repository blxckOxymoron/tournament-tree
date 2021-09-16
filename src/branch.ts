export interface Branch {
  sub: Branch[];
}

export function forEachBranch(
  branch: Branch,
  callbackfn: (
    value: Branch,
    layer?: number,
    index?: number,
    parent?: Branch
  ) => void,
  topLayer = 0
): void {
  branch.sub.forEach((br, i) => {
    callbackfn(br, topLayer + 1, i, branch);
    forEachBranch(br, callbackfn, topLayer + 1);
  });
}
