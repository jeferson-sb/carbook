import { promises as fs } from 'fs';

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.stat(filename);
  } catch (error) {
    return;
  } finally {
    await fs.unlink(filename);
  }
};
