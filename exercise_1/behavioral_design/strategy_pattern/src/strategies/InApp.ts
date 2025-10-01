import { AlertStrategy } from "../interfaces/AlertStrategy";

export class InAppAlert implements AlertStrategy {
    alert(patientName: string, vitals: string): void {
        console.log(`[In-App] Alert for ${patientName}: ${vitals}`);
    }
}
