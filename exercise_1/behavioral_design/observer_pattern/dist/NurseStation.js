"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NurseStation = void 0;
class NurseStation {
    update(vitals) {
        console.log(`[NurseStation] Monitoring patient vitals Oxygen: ${vitals.oxygen}%`);
    }
}
exports.NurseStation = NurseStation;
