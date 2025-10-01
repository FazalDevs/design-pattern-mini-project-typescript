export interface IObserver<T> {
    update(data: T): void;
}
