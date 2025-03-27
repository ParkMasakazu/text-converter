// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Components = TextConverter.Components || {};

/**
 * テキスト入力・表示コンポーネント
 */
TextConverter.Components.TextInput = ({ 
    inputText, 
    handleInputChange, 
    theme, 
    darkMode, 
    handleThemeChange 
}) => {
    const { Typography, IconButton } = MaterialUI;
    
    return (
        <>
            <Typography 
                variant="h6" 
                className="section-title top-title"
                style={{
                    color: theme.palette.text.primary
                }}
            >
                テキスト入力/変換結果
                <IconButton 
                    onClick={handleThemeChange} 
                    color="inherit" 
                    size="small"
                    aria-label="テーマを切り替え"
                >
                    <span className="material-icons">
                        {darkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                </IconButton>
            </Typography>
            <textarea
                className="resizable-textarea"
                value={inputText}
                onChange={handleInputChange}
                placeholder="ここにテキストを入力してください..."
                style={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.border.textarea
                }}
            ></textarea>
        </>
    );
};
