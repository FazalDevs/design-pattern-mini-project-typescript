import { AlertStrategy } from "../interfaces/AlertStrategy";

export class EmailAlert implements AlertStrategy {
    alert(patientName: string, vitals: string): void {
        console.log(`[Email] Alert for ${patientName}: ${vitals}`);
    }
}
