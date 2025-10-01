export interface AlertStrategy {
    alert(patientName: string, vitals: string): void;
}
