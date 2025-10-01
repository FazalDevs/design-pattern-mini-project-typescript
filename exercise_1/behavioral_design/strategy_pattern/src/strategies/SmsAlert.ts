import { AlertStrategy } from "../interfaces/AlertStrategy";

export class SMSAlert implements AlertStrategy {
    alert(patientName: string, vitals: string): void {
        console.log(`[SMS] Alert for ${patientName}: ${vitals}`);
    }
}
