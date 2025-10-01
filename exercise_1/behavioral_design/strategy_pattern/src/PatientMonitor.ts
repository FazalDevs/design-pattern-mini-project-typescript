import { AlertStrategy } from "./interfaces/AlertStrategy";

export class PatientMonitor {
    private strategy: AlertStrategy;

    constructor(strategy: AlertStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: AlertStrategy) {
        this.strategy = strategy;
    }

    triggerAlert(patientName: string, vitals: string) {
        this.strategy.alert(patientName, vitals);
    }
}
