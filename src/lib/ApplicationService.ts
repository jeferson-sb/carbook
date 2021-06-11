export interface ApplicationService<P, R> {
  execute(payload: P): R;
}
