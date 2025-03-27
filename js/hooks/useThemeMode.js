// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Hooks = TextConverter.Hooks || {};

/**
 * ダークモードを管理するカスタムフック
 * @returns {Object} ダークモード状態、テーマオブジェクト、切り替え関数を含むオブジェクト
 */
TextConverter.Hooks.useThemeMode = () => {
    const { createTheme } = MaterialUI;
    
    // ダークモード状態の管理
    const [darkMode, setDarkMode] = React.useState(false);
    
    // テーマの定義
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                    primary: {
                        main: darkMode ? '#90caf9' : '#1976d2',
                    },
                    secondary: {
                        main: darkMode ? '#f48fb1' : '#dc004e',
                    },
                    background: {
                        default: darkMode ? '#121212' : '#f5f5f5',
                        paper: darkMode ? '#1e1e1e' : '#ffffff',
                    },
                    border: {
                        textarea: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                        button: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)',
                    },
                    text: {
                        primary: darkMode ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
                        secondary: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    },
                },
            }),
        [darkMode],
    );
    
    // ダークモード切替ハンドラー
    const handleThemeChange = () => {
        setDarkMode(!darkMode);
        // ローカルストレージに設定を保存
        localStorage.setItem('darkMode', (!darkMode).toString());
    };
    
    // 初期設定を行うuseEffect
    React.useEffect(() => {
        // ローカルストレージから設定を読み込む
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            // ローカルストレージに保存された設定がある場合はそれを使用
            setDarkMode(savedMode === 'true');
        } else {
            // 保存された設定がない場合はシステム設定を使用
            setDarkMode(TextConverter.Utils.detectColorScheme());
        }
        
        // システム設定の変更を監視するリスナーを設定
        const cleanup = TextConverter.Utils.setupThemeChangeListener(setDarkMode);
        
        // ダークモードの状態に応じてクラスを追加
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // クリーンアップ関数
        return cleanup;
    }, [darkMode]);
    
    return { darkMode, theme, handleThemeChange };
};
