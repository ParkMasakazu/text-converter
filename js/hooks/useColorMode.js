// グローバル変数として定義
window.useColorMode = function() {
    // シンプルなダークモード状態
    const [mode, setMode] = React.useState('light');
    
    // システム設定の検出と設定読み込み
    React.useEffect(() => {
        // ローカルストレージから設定を取得
        const savedMode = localStorage.getItem('colorMode');
        if (savedMode) {
            setMode(savedMode);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setMode('dark');
        }
        
        // システム設定の変更を監視
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem('colorMode')) {
                setMode(e.matches ? 'dark' : 'light');
            }
        };
        
        // リスナー登録とクリーンアップ
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    // ダークモードのクラスをbody要素に追加/削除
    React.useEffect(() => {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [mode]);
    
    // テーマ切替ハンドラ
    const toggleColorMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('colorMode', newMode);
    };
    
    // テーマオブジェクトの生成
    const theme = React.useMemo(() => 
        MaterialUI.createTheme({
            palette: {
                mode,
            },
        }),
    [mode]);

    return { mode, toggleColorMode, theme };
}
