import { useEffect, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { ColorMode, UseColorModeReturn } from '../types';

export const useColorMode = (): UseColorModeReturn => {
  // シンプルなダークモード状態
  const [mode, setMode] = useState<ColorMode>('light');
  
  // システム設定の検出と設定読み込み
  useEffect(() => {
    // ローカルストレージから設定を取得
    const savedMode = localStorage.getItem('colorMode') as ColorMode | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
    
    // システム設定の変更を監視
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('colorMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // リスナー登録とクリーンアップ
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    return undefined;
  }, []);

  // ダークモードのクラスをbody要素に追加/削除
  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [mode]);
  
  // テーマ切替ハンドラ
  const toggleColorMode = () => {
    const newMode: ColorMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('colorMode', newMode);
  };
  
  // テーマオブジェクトの生成
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode,
      },
    }),
  [mode]);

  return { mode, toggleColorMode, theme };
};
