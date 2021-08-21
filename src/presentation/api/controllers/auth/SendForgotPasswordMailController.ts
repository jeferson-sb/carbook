import { Request, Response } from 'express';

import { container } from '@modules/auth/container';

const sendForgotPasswordMailController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { email } = request.body;

    const { sendForgotPasswordMailService } = container.cradle;

    await sendForgotPasswordMailService.execute(email);

    return response.sendStatus(204);
  } catch (error) {
    console.log(error);
    return response.status(400).send({ error: error.message });
  }
};

export { sendForgotPasswordMailController };
