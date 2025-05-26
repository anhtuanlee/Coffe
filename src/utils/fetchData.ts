import fs from 'fs';
import path from 'path';

import { TDataDetail } from '@/types/common';

export const getDetailData = (): TDataDetail[] => {
  const filePath = path.join(process.cwd(), 'public', 'api', 'newApi.json');
  const dataDetails = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(dataDetails);
};
