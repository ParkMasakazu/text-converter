import React from 'react';
import { Box, Typography } from '@mui/material';
import { TextStatisticsProps, LineStats } from '../types';

const TextStatistics: React.FC<TextStatisticsProps> = ({ 
  totalChars, 
  totalBytes, 
  totalLines, 
  getLineStats 
}) => {
  const lineStats = getLineStats();
  
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        全体: {totalChars}文字 / {totalBytes}バイト / {totalLines}行
      </Typography>
      <Typography variant="body2" sx={{ mt: 0 }}>
        {lineStats?.map((line: LineStats) => (
          <span key={line.lineNum} className="stats-inline">
            {line.lineNum}行目: {line.chars}文字/{line.bytes}バイト
          </span>
        ))}
      </Typography>
    </Box>
  );
};

export default TextStatistics;
