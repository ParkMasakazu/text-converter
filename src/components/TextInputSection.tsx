import React from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import ActionButtons from './ActionButtons';
import TextStatistics from './TextStatistics';
import { TextInputSectionProps } from '../types';

const TextInputSection: React.FC<TextInputSectionProps> = ({ 
  inputText, 
  handleInputChange, 
  handleCopy, 
  handleClear, 
  handleUndo, 
  handleRedo, 
  handleReset, 
  totalChars, 
  totalBytes, 
  totalLines, 
  getLineStats, 
  historyIndex, 
  history,
  toggleColorMode,
  mode
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* タイトルとダークモードアイコンを同じラインに配置 */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={1}
        >
          <Typography variant="h6">
            テキスト入力/変換結果
          </Typography>
          <IconButton 
            onClick={toggleColorMode} 
            color="inherit" 
            aria-label="テーマ切替"
            sx={{ padding: 0 }}
          >
            <span className="material-icons">
              {mode === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </IconButton>
        </Box>
        
        {/* テキスト入力エリア */}
        <textarea
          className="resizable-textarea"
          value={inputText}
          onChange={handleInputChange}
          placeholder="ここにテキストを入力してください..."
        />
        
        {/* アクションボタン */}
        <ActionButtons 
          inputText={inputText}
          handleCopy={handleCopy}
          handleClear={handleClear}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleReset={handleReset}
          historyIndex={historyIndex}
          history={history}
        />
        
        {/* テキスト統計情報 */}
        <TextStatistics 
          totalChars={totalChars}
          totalBytes={totalBytes}
          totalLines={totalLines}
          getLineStats={getLineStats}
        />
      </CardContent>
    </Card>
  );
};

export default TextInputSection;
