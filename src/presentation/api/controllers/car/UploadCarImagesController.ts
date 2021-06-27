import { Request, Response } from 'express';

import container from '../../container';

type File = {
  filename: string;
};

interface RequestFile extends Request {
  files: File[];
}

class UploadCarImagesController {
  async handle(request: RequestFile, response: Response): Promise<Response> {
    try {
      const { id: car_id } = request.params;
      const images = request.files;

      const { uploadCarImagesService } = container.cradle;
      const images_name = images.map((file) => file.filename);

      await uploadCarImagesService.execute({
        car_id,
        images_name,
      });

      return response.sendStatus(201);
    } catch (error) {
      return response.sendStatus(500);
    }
  }
}

export default UploadCarImagesController;
