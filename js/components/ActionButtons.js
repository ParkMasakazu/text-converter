// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Components = TextConverter.Components || {};

/**
 * アクションボタン（コピー、クリア、履歴操作）コンポーネント
 */
TextConverter.Components.ActionButtons = ({ 
    handleClear, 
    handleCopy, 
    handleUndo, 
    handleRedo, 
    handleReset,
    inputText,
    historyIndex,
    historyLength,
    theme
}) => {
    const { Button, Box, Typography } = MaterialUI;
    
    return (
        <Box className="button-group" mt={2}>
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
                disabled={historyIndex >= historyLength - 1}
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
            <Typography variant="caption" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginLeft: '8px', 
                color: theme.palette.text.secondary 
            }}>
                （直接テキストを編集すると戻す初期値が更新されます。）
            </Typography>
        </Box>
    );
};
