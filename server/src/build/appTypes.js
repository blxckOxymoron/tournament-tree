"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotColors = exports.TransmittedMutations = exports.Mutations = void 0;
exports.Mutations = {
    REGISTER_SLOT: "registerSlot",
    REGISTER_TEAM: "registerTeam",
    MOVE_SLOT: "moveSlot",
    MARK_SNAP_SLOT: "markSnapSlot",
    SET_ALL: "setAll",
};
exports.TransmittedMutations = {
    REGISTER_SLOT: "registerSlot",
    REGISTER_TEAM: "registerTeam",
    MOVE_SLOT: "moveSlot",
};
var SlotColors;
(function (SlotColors) {
    SlotColors["EMPTY"] = "var(--clr-slot-empty)";
    SlotColors["SNAP"] = "var(--clr-slot-snap)";
    SlotColors["BEATEN"] = "var(--clr-slot-beaten)";
    SlotColors["TEXT_BEATEN"] = "var(--clr-text-beaten)";
    SlotColors["TEXT"] = "var(--clr-text)";
    SlotColors["BACKGROUND"] = "var(--clr-bg)";
    SlotColors["LOADING"] = "var(--clr-bg)";
})(SlotColors = exports.SlotColors || (exports.SlotColors = {}));
//# sourceMappingURL=appTypes.js.map