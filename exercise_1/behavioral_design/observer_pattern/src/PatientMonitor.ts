import { Subject } from "./interfaces/Subject";
import { Observer } from "./interfaces/Observer";
import { PatientVitals } from "./models/PatientVitals";

export class PatientMonitor implements Subject {
    private observers: Observer[] = [];
    private vitals: PatientVitals = { heartRate: 70, oxygen: 98, temperature: 36.5 };

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    setVitals(newVitals: PatientVitals): void {
        console.log(`\n[PatientMonitor] Updating vitals:`, newVitals);
        this.vitals = newVitals;
        this.notify();
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this.vitals);
        }
    }
}
