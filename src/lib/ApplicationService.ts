export interface ApplicationService<P, R> {
  execute(payload?: P): Promise<R>;
}
