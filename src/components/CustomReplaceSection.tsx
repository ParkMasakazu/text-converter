import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Collapse, 
  Stack,
  TextField,
  Button 
} from '@mui/material';
import { CustomReplaceSectionProps } from '../types';

const CustomReplaceSection: React.FC<CustomReplaceSectionProps> = ({ 
  onCustomReplace 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  
  const handleReplace = () => {
    if (!searchText) return;
    onCustomReplace(searchText, replaceText);
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
            一括置換
          </Typography>
          <span className="material-icons">
            {expanded ? 'expand_less' : 'expand_more'}
          </span>
        </Box>
        <Collapse in={expanded}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <TextField
              label="検索文字列"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size="small"
              sx={{ minWidth: '150px' }}
            />
            <TextField
              label="置換文字列"
              variant="outlined"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              size="small"
              sx={{ minWidth: '150px' }}
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleReplace}
              startIcon={<span className="material-icons">find_replace</span>}
              size="small"
              disabled={!searchText}
            >
              置換
            </Button>
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default CustomReplaceSection;
