import React from 'react';
import { Box } from '@mui/material';
import { AdvertisementSectionProps } from '../types';

const AdvertisementSection: React.FC<AdvertisementSectionProps> = () => {
  return (
    <Box mt={2} mb={2} height="30px">
      <a 
        href="https://ex-pa.jp/it/3XTa/Zgi" 
        className="ad-link" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        PR.【特別ご招待】ChatGPT活用セミナーの詳細はこちら
      </a>
    </Box>
  );
};

export default AdvertisementSection;
