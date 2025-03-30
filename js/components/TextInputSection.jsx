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
                
                {/* アクションボタン */}
                <ActionButtons 
                    inputText={inputText}
                    handleCopy={handleCopy}
                    handleClear={handleClear}
                    handleUndo={handleUndo}
                    handleRedo={handleRedo}
                    handleReset={handleReset}
                    historyIndex={historyIndex}
                    history={history}
                />
                
                {/* テキスト統計情報 */}
                <TextStatistics 
                    totalChars={totalChars}
                    totalBytes={totalBytes}
                    totalLines={totalLines}
                    getLineStats={getLineStats}
                />
            </MaterialUI.CardContent>
        </MaterialUI.Card>
    );
}
