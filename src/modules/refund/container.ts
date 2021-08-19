import { asClass, createContainer } from 'awilix';
import { RefundRentalService } from './app/RefundRentalService';

export type Container = {
  refundRentalService: RefundRentalService;
};

const container = createContainer<Container>();

container.register({
  refundRentalService: asClass(RefundRentalService),
});

export { container };
