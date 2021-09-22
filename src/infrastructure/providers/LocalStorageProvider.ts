import fs from 'fs/promises';
import path from 'path';

import { StorageProvider } from '@lib/StorageProvider';
import upload from '@config/upload';

export class LocalStorageProvider implements StorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.rename(
      path.resolve(upload.tmpFolder, file),
      path.resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = path.resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.stat(filename);
    } catch (error) {
      return;
    } finally {
      await fs.unlink(filename);
    }
  }
}
