import React from 'react';
import { 
  ThemeProvider, 
  CssBaseline, 
  Container, 
  Snackbar, 
  Alert 
} from '@mui/material';
import { TextConverterAppProps } from '../types';
import { useColorMode } from '../hooks/useColorMode';
import { useTextProcessing } from '../hooks/useTextProcessing';
import { useHistory } from '../hooks/useHistory';
import TextInputSection from './TextInputSection';
import SingleConversionSection from './SingleConversionSection';
import BatchConversionSection from './BatchConversionSection';
import CustomReplaceSection from './CustomReplaceSection';
import AdvertisementSection from './AdvertisementSection';
// 変換オプションの読み込み
import { CONVERSION_OPTIONS } from '../utils/conversionOptions';

const TextConverterApp: React.FC<TextConverterAppProps> = () => {
  // カスタムフックを利用した状態と関数
  const { mode, toggleColorMode, theme } = useColorMode();
  const { 
    inputText, setInputText, originalText, 
    totalChars, totalBytes, totalLines, 
    snackbarOpen, snackbarMessage,
    handleInputChange: handleRawInputChange,
    updateCharAndByteCount,
    showSnackbar,
    handleSnackbarClose,
    getLineStats,
    handleClear: handleRawClear
  } = useTextProcessing();
    
  const { 
    history, historyIndex, 
    convertText, handleUndo: historyUndo, 
    handleRedo: historyRedo, 
    handleReset: historyReset,
    initializeHistory
  } = useHistory(showSnackbar, updateCharAndByteCount);

  // イベントハンドラー
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = handleRawInputChange(e);
    initializeHistory(newText);
  };
    
  const handleCopy = () => {
    if (!inputText) {
      showSnackbar('コピーするテキストがありません');
      return;
    }
    navigator.clipboard.writeText(inputText).then(() => {
      showSnackbar('テキストをコピーしました');
    }).catch(() => {
      showSnackbar('コピーに失敗しました');
    });
  };
    
  const handleClear = () => {
    const newText = handleRawClear();
    initializeHistory(newText);
  };
    
  const handleUndo = () => {
    const newText = historyUndo();
    if (newText !== null) setInputText(newText);
  };
    
  const handleRedo = () => {
    const newText = historyRedo();
    if (newText !== null) setInputText(newText);
  };
    
  const handleReset = () => {
    const newText = historyReset(originalText);
    if (newText !== null) setInputText(newText);
  };

  // 変換関連の関数
  const handleSingleConvert = (conversionType: string) => {
    if (!CONVERSION_OPTIONS[conversionType]) return;
    const newText = convertText(inputText, CONVERSION_OPTIONS[conversionType].convert);
    setInputText(newText);
  };
    
  const handleBatchConvert = (selectedOptions: string[]) => {
    if (selectedOptions.length === 0) {
      showSnackbar('変換オプションを選択してください');
      return;
    }

    let newText = inputText;
    for (const option of selectedOptions) {
      if (CONVERSION_OPTIONS[option]) {
        newText = CONVERSION_OPTIONS[option].convert(newText);
      }
    }

    if (newText === inputText) return;
        
    setInputText(newText);
    updateCharAndByteCount(newText);
    const resultText = convertText(inputText, () => newText, '一括変換が完了しました');
    setInputText(resultText);
  };
    
  const handleCustomReplace = (searchText: string, replaceText: string) => {
    if (!searchText) {
      showSnackbar('検索文字列を入力してください');
      return;
    }
        
    const replacer = (text: string) => text.replace(new RegExp(searchText, 'g'), replaceText);
    const newText = convertText(inputText, replacer, '置換が完了しました');
    setInputText(newText);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
          
      <Container sx={{ py: 2 }} maxWidth={false}>
        {/* テキスト入力/変換結果セクション */}
        <TextInputSection 
          inputText={inputText}
          handleInputChange={handleInputChange}
          handleCopy={handleCopy}
          handleClear={handleClear}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleReset={handleReset}
          totalChars={totalChars}
          totalBytes={totalBytes}
          totalLines={totalLines}
          getLineStats={getLineStats}
          historyIndex={historyIndex}
          history={history}
          toggleColorMode={toggleColorMode}
          mode={mode}
        />

        {/* 個別変換セクション */}
        <SingleConversionSection 
          conversionOptions={CONVERSION_OPTIONS}
          handleSingleConvert={handleSingleConvert}
        />

        {/* 一括変換セクション */}
        <BatchConversionSection 
          conversionOptions={CONVERSION_OPTIONS}
          onBatchConvert={handleBatchConvert}
        />

        {/* カスタム置換セクション */}
        <CustomReplaceSection 
          onCustomReplace={handleCustomReplace}
        />

        {/* 広告セクション */}
        <AdvertisementSection />

        {/* スナックバー（通知） */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity="success" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default TextConverterApp;
