import React from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Button 
} from '@mui/material';
import { SingleConversionSectionProps } from '../types';

const SingleConversionSection: React.FC<SingleConversionSectionProps> = ({ 
  conversionOptions, 
  handleSingleConvert 
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          個別変換
        </Typography>
        <Box className="button-group">
          {Object.entries(conversionOptions).map(([key, { label }]) => (
            <Button 
              key={key}
              variant="outlined"
              color="inherit"
              onClick={() => handleSingleConvert(key)}
              size="small"
            >
              {label}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SingleConversionSection;
