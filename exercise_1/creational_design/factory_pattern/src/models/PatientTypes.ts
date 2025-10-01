// models/PatientType.ts
export interface PatientType {
    id: number;
    name: string;
    age: number;
    condition: string;
    getDetails(): string;
}

export class Inpatient implements PatientType {
    constructor(public id: number, public name: string, public age: number, public condition: string) { }
    getDetails() {
        return `Inpatient - ${this.name}, Age: ${this.age}, Condition: ${this.condition}`;
    }
}

export class Outpatient implements PatientType {
    constructor(public id: number, public name: string, public age: number, public condition: string) { }
    getDetails() {
        return `Outpatient - ${this.name}, Age: ${this.age}, Condition: ${this.condition}`;
    }
}

export class EmergencyPatient implements PatientType {
    constructor(public id: number, public name: string, public age: number, public condition: string) { }
    getDetails() {
        return `Emergency Patient - ${this.name}, Age: ${this.age}, Condition: ${this.condition}`;
    }
}
