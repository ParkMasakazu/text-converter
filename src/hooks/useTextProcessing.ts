import { useState, ChangeEvent } from 'react';
import { LineStats, UseTextProcessingReturn } from '../types';

export const useTextProcessing = (): UseTextProcessingReturn => {
  const [inputText, setInputText] = useState<string>('');
  const [originalText, setOriginalText] = useState<string>('');
  const [totalChars, setTotalChars] = useState<number>(0);
  const [totalBytes, setTotalBytes] = useState<number>(0);
  const [totalLines, setTotalLines] = useState<number>(0);
  const [lineChars, setLineChars] = useState<number[]>([]);
  const [lineBytes, setLineBytes] = useState<number[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  // テキスト入力の処理
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): string => {
    const text = e.target.value;
    setInputText(text);
    setOriginalText(text);  // オリジナルテキストを保存
    updateCharAndByteCount(text);
    
    return text; // useHistoryフックでの利用のために返す
  };

  // 文字数とバイト数カウントの更新
  const updateCharAndByteCount = (text: string): void => {
    setTotalChars(text.length);
    
    // 全体のバイト数を計算
    const blob = new Blob([text]);
    setTotalBytes(blob.size);
    
    // 各行の文字数とバイト数を計算
    const lines = text.split('\n');
    setTotalLines(lines.length);
    setLineChars(lines.map(line => line.length));
    
    // 各行のバイト数
    const bytesPerLine = lines.map(line => {
      const lineBlob = new Blob([line]);
      return lineBlob.size;
    });
    setLineBytes(bytesPerLine);
  };

  // スナックバーの表示
  const showSnackbar = (message: string): void => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // スナックバーを閉じる
  const handleSnackbarClose = (): void => setSnackbarOpen(false);

  // 行情報の表示を制限（最大10行まで）
  const getLineStats = (): LineStats[] | null => {
    if (lineChars.length === 0) return null;
    
    return Array.from({ length: Math.min(10, lineChars.length) }, (_, i) => ({
      lineNum: i + 1,
      chars: lineChars[i],
      bytes: lineBytes[i]
    }));
  };

  // クリアボタンの処理
  const handleClear = (): string => {
    setInputText('');
    setOriginalText('');
    setTotalChars(0);
    setTotalBytes(0);
    setTotalLines(0);
    setLineChars([]);
    setLineBytes([]);
    showSnackbar('テキストをクリアしました');
    
    return ''; // useHistoryフックでの利用のために返す
  };

  return {
    inputText, setInputText,
    originalText, setOriginalText,
    totalChars, totalBytes, totalLines,
    lineChars, lineBytes,
    snackbarOpen, snackbarMessage,
    handleInputChange,
    updateCharAndByteCount,
    showSnackbar,
    handleSnackbarClose,
    getLineStats,
    handleClear
  };
};
