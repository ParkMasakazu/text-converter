import React from 'react';

// 色モードの型
export type ColorMode = 'light' | 'dark';

// 変換オプションの型
export interface ConversionOption {
  label: string;
  convert: (text: string) => string;
}

export interface ConversionOptions {
  [key: string]: ConversionOption;
}

// 行の統計情報の型
export interface LineStats {
  lineNum: number;
  chars: number;
  bytes: number;
}

// ActionButtonsコンポーネントのProps型
export interface ActionButtonsProps {
  inputText: string;
  handleCopy: () => void;
  handleClear: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handleReset: () => void;
  historyIndex: number;
  history: string[];
}

// TextStatisticsコンポーネントのProps型
export interface TextStatisticsProps {
  totalChars: number;
  totalBytes: number;
  totalLines: number;
  getLineStats: () => LineStats[] | null;
}

// TextInputSectionコンポーネントのProps型
export interface TextInputSectionProps {
  inputText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCopy: () => void;
  handleClear: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handleReset: () => void;
  totalChars: number;
  totalBytes: number;
  totalLines: number;
  getLineStats: () => LineStats[] | null;
  historyIndex: number;
  history: string[];
  toggleColorMode: () => void;
  mode: ColorMode;
}

// SingleConversionSectionコンポーネントのProps型
export interface SingleConversionSectionProps {
  conversionOptions: ConversionOptions;
  handleSingleConvert: (key: string) => void;
}

// BatchConversionSectionコンポーネントのProps型
export interface BatchConversionSectionProps {
  conversionOptions: ConversionOptions;
  onBatchConvert: (selectedOptions: string[]) => void;
}

// CustomReplaceSectionコンポーネントのProps型
export interface CustomReplaceSectionProps {
  onCustomReplace: (searchText: string, replaceText: string) => void;
}

// AdvertisementSectionコンポーネントのProps型
export interface AdvertisementSectionProps {}

// useTextProcessingフックの戻り値の型
export interface UseTextProcessingReturn {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  originalText: string;
  setOriginalText: React.Dispatch<React.SetStateAction<string>>;
  totalChars: number;
  totalBytes: number;
  totalLines: number;
  lineChars: number[];
  lineBytes: number[];
  snackbarOpen: boolean;
  snackbarMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => string;
  updateCharAndByteCount: (text: string) => void;
  showSnackbar: (message: string) => void;
  handleSnackbarClose: () => void;
  getLineStats: () => LineStats[] | null;
  handleClear: () => string;
}

// useHistoryフックの戻り値の型
export interface UseHistoryReturn {
  history: string[];
  historyIndex: number;
  addToHistory: (newText: string, currentText: string) => string;
  convertText: (text: string, conversionFunc: (text: string) => string, successMessage?: string) => string;
  handleUndo: () => string | null;
  handleRedo: () => string | null;
  handleReset: (originalText: string) => string | null;
  initializeHistory: (text: string) => void;
}

// useColorModeフックの戻り値の型
export interface UseColorModeReturn {
  mode: ColorMode;
  toggleColorMode: () => void;
  theme: any; // ThemeProviderに渡すテーマオブジェクト
}

// TextConverterAppコンポーネントのProps型
export interface TextConverterAppProps {}
