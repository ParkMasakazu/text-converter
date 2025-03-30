// グローバル変数として定義
window.TextInputSection = function({ 
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
}) {
    return (
        <MaterialUI.Card sx={{ mb: 2 }}>
            <MaterialUI.CardContent>
                {/* タイトルとダークモードアイコンを同じラインに配置 */}
                <MaterialUI.Box 
                    display="flex" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    mb={1}
                >
                    <MaterialUI.Typography variant="h6">
                    テキスト入力/変換結果
                </MaterialUI.Typography>
                    <MaterialUI.IconButton 
                        onClick={toggleColorMode} 
                        color="inherit" 
                        aria-label="テーマ切替"
                        sx={{ padding: 0 }}
                    >
                        <span className="material-icons">
                            {mode === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </MaterialUI.IconButton>
                </MaterialUI.Box>
                
                <textarea
                    className="resizable-textarea"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="ここにテキストを入力してください..."
                />
                
                <MaterialUI.Box className="action-group" mt={2}>
                    <MaterialUI.Button 
                        variant="outlined" 
                        color="secondary" 
                        startIcon={<span className="material-icons">clear</span>}
                        onClick={handleClear}
                        size="small"
                    >
                        クリア
                    </MaterialUI.Button>
                    <MaterialUI.Button 
                        variant="outlined" 
                        color="primary"
                        onClick={handleCopy}
                        startIcon={<span className="material-icons">content_copy</span>}
                        disabled={!inputText}
                        size="small"
                    >
                        コピー
                    </MaterialUI.Button>
                    <MaterialUI.Button 
                        variant="outlined" 
                        color="primary"
                        onClick={handleUndo}
                        startIcon={<span className="material-icons">undo</span>}
                        disabled={historyIndex <= 0}
                        size="small"
                    >
                        戻る
                    </MaterialUI.Button>
                    <MaterialUI.Button 
                        variant="outlined" 
                        color="primary"
                        onClick={handleRedo}
                        startIcon={<span className="material-icons">redo</span>}
                        disabled={historyIndex >= history.length - 1}
                        size="small"
                    >
                        進む
                    </MaterialUI.Button>
                    <MaterialUI.Button 
                        variant="outlined" 
                        color="secondary"
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
                
                {/* 文字数・バイト数・行数カウント */}
                <MaterialUI.Box sx={{ mt: 2 }}>
                    <MaterialUI.Typography variant="body2">
                        全体: {totalChars}文字 / {totalBytes}バイト / {totalLines}行
                    </MaterialUI.Typography>
                    <MaterialUI.Typography variant="body2" sx={{ mt: 0 }}>
                        {getLineStats()?.map(line => (
                            <span key={line.lineNum} className="stats-inline">
                                {line.lineNum}行目: {line.chars}文字/{line.bytes}バイト
                            </span>
                        ))}
                    </MaterialUI.Typography>
                </MaterialUI.Box>
            </MaterialUI.CardContent>
        </MaterialUI.Card>
    );
}
