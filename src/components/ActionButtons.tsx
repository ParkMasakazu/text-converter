import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ActionButtonsProps } from '../types';

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  inputText,
  handleCopy, 
  handleClear, 
  handleUndo, 
  handleRedo, 
  handleReset, 
  historyIndex, 
  history 
}) => {
  return (
    <Box className="action-group" mt={2}>
      <Button 
        variant="outlined" 
        color="secondary" 
        startIcon={<span className="material-icons">clear</span>}
        onClick={handleClear}
        size="small"
      >
        クリア
      </Button>
      <Button 
        variant="outlined" 
        color="primary"
        onClick={handleCopy}
        startIcon={<span className="material-icons">content_copy</span>}
        disabled={!inputText}
        size="small"
      >
        コピー
      </Button>
      <Button 
        variant="outlined" 
        color="primary"
        onClick={handleUndo}
        startIcon={<span className="material-icons">undo</span>}
        disabled={historyIndex <= 0}
        size="small"
      >
        戻る
      </Button>
      <Button 
        variant="outlined" 
        color="primary"
        onClick={handleRedo}
        startIcon={<span className="material-icons">redo</span>}
        disabled={historyIndex >= history.length - 1}
        size="small"
      >
        進む
      </Button>
      <Button 
        variant="outlined" 
        color="secondary"
        onClick={handleReset}
        startIcon={<span className="material-icons">restore</span>}
        size="small"
      >
        最初に戻す
      </Button>
      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', ml: 1, color: 'text.secondary' }}>
        （テキストを直接編集すると戻す初期値が更新されます。）
      </Typography>
    </Box>
  );
};

export default ActionButtons;
