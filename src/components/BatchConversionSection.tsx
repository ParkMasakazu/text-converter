import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Collapse, 
  Button, 
  FormGroup, 
  FormControlLabel, 
  Checkbox 
} from '@mui/material';
import { BatchConversionSectionProps } from '../types';

const BatchConversionSection: React.FC<BatchConversionSectionProps> = ({ 
  conversionOptions, 
  onBatchConvert 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [options, setOptions] = useState<Record<string, boolean>>(
    Object.keys(conversionOptions).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );
  
  // チェックボックスの処理
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked
    });
  };

  // 全選択/全解除の処理
  const handleSelectAll = (select: boolean) => {
    const newOptions: Record<string, boolean> = {};
    Object.keys(options).forEach(key => {
      newOptions[key] = select;
    });
    setOptions(newOptions);
  };
  
  // 一括変換の実行
  const handleApply = () => {
    const selectedOptions = Object.entries(options)
      .filter(([_, value]) => value)
      .map(([key]) => key);
        
    onBatchConvert(selectedOptions);
  };
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="h6">
            一括変換
          </Typography>
          <span className="material-icons">
            {expanded ? 'expand_less' : 'expand_more'}
          </span>
        </Box>
        <Collapse in={expanded}>
          <Box sx={{ mb: 1 }}>
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => handleSelectAll(true)}
              size="small"
            >
              すべて選択
            </Button>
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => handleSelectAll(false)}
              size="small"
            >
              すべて解除
            </Button>
          </Box>
          <FormGroup className="checkbox-group">
            {Object.entries(conversionOptions).map(([key, { label }]) => (
              <div key={key} className="compact-checkbox">
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={options[key]} 
                      onChange={handleCheckboxChange}
                      name={key}
                      color="primary"
                      size="small"
                      sx={{ p: '0 2px 0 10px' }}
                    />
                  }
                  label={label}
                />
              </div>
            ))}
          </FormGroup>
          <Box sx={{ mt: 1 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleApply}
              startIcon={<span className="material-icons">transform</span>}
              size="small"
            >
              選択した変換を一括適用
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default BatchConversionSection;
