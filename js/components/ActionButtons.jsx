// グローバル変数として定義
window.ActionButtons = function({ 
    inputText,
    handleCopy, 
    handleClear, 
    handleUndo, 
    handleRedo, 
    handleReset, 
    historyIndex, 
    history 
}) {
    return (
        <MaterialUI.Box className="action-group" mt={2}>
            <MaterialUI.Button 
                variant="contained" 
                color="warning" 
                startIcon={<span className="material-icons">clear</span>}
                onClick={handleClear}
                size="small"
            >
                クリア
            </MaterialUI.Button>
            <MaterialUI.Button 
                variant="contained" 
                color="primary"
                onClick={handleCopy}
                startIcon={<span className="material-icons">content_copy</span>}
                disabled={!inputText}
                size="small"
            >
                コピー
            </MaterialUI.Button>
            <MaterialUI.Button 
                variant="contained" 
                color="primary"
                onClick={handleUndo}
                startIcon={<span className="material-icons">undo</span>}
                disabled={historyIndex <= 0}
                size="small"
            >
                戻る
            </MaterialUI.Button>
            <MaterialUI.Button 
                variant="contained" 
                color="primary"
                onClick={handleRedo}
                startIcon={<span className="material-icons">redo</span>}
                disabled={historyIndex >= history.length - 1}
                size="small"
            >
                進む
            </MaterialUI.Button>
            <MaterialUI.Button 
                variant="contained" 
                color="warning"
                onClick={handleReset}
                startIcon={<span className="material-icons">restore</span>}
                size="small"
            >
                最初に戻す
            </MaterialUI.Button>
            <MaterialUI.Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', ml: 1, color: 'text.secondary' }}>
                （テキストを直接編集すると戻す初期値が更新されます。）
            </MaterialUI.Typography>
        </MaterialUI.Box>
    );
}
