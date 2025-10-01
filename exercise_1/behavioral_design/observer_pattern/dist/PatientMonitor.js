"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientMonitor = void 0;
class PatientMonitor {
    constructor() {
        this.observers = [];
        this.vitals = { heartRate: 70, oxygen: 98, temperature: 36.5 };
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    setVitals(newVitals) {
        console.log(`\n[PatientMonitor] Updating vitals:`, newVitals);
        this.vitals = newVitals;
        this.notify();
    }
    notify() {
        for (const observer of this.observers) {
            observer.update(this.vitals);
        }
    }
}
exports.PatientMonitor = PatientMonitor;
