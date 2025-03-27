// メインアプリケーションコンポーネント
function TextConverterApp() {
    const { Paper, Container, Snackbar, ThemeProvider, Card, CardContent } = MaterialUI;
    
    // カスタムフックを使用
    const { darkMode, theme, handleThemeChange } = TextConverter.Hooks.useThemeMode();
    const {
        // 状態
        inputText,
        textStats,
        searchText,
        replaceText,
        snackbarOpen,
        snackbarMessage,
        optionsExpanded,
        customReplaceExpanded,
        options,
        historyIndex,
        history,
        
        // セッター
        setSearchText,
        setReplaceText,
        
        // 関数
        handleInputChange,
        handleSingleConvert,
        handleBatchConvert,
        handleCustomReplace,
        handleUndo,
        handleRedo,
        handleReset,
        handleCheckboxChange,
        handleSelectAll,
        handleCopy,
        handleClear,
        toggleOptions,
        toggleCustomReplace,
        handleSnackbarClose,
        
        // 定数
        CONVERSION_OPTIONS
    } = TextConverter.Hooks.useTextConverter();

    return (
        <ThemeProvider theme={theme}>
            <Paper
                style={{
                    minHeight: '100vh',
                    borderRadius: 0,
                    boxShadow: 'none',
                    transition: 'background-color 0.3s, color 0.3s',
                }}
            >
                <Container className="app-container" maxWidth={false}>
                    {/* テキスト入力/変換結果セクション（カードで包む） */}
                    <Card className="section">
                        <CardContent className="compact-card-content" style={{
                            backgroundColor: theme.palette.background.paper
                        }}>
                            {/* テキスト入力エリア */}
                            <TextConverter.Components.TextInput 
                                inputText={inputText}
                                handleInputChange={handleInputChange}
                                theme={theme}
                                darkMode={darkMode}
                                handleThemeChange={handleThemeChange}
                            />
                            
                            {/* アクションボタン */}
                            <TextConverter.Components.ActionButtons 
                                handleClear={handleClear}
                                handleCopy={handleCopy}
                                handleUndo={handleUndo}
                                handleRedo={handleRedo}
                                handleReset={handleReset}
                                inputText={inputText}
                                historyIndex={historyIndex}
                                historyLength={history.length}
                                theme={theme}
                            />
                            
                            {/* テキスト統計情報 */}
                            <TextConverter.Components.TextStats 
                                textStats={textStats}
                                theme={theme}
                            />
                        </CardContent>
                    </Card>
                    
                    {/* 個別変換ボタンセクション */}
                    <TextConverter.Components.SingleConversionButtons
                        CONVERSION_OPTIONS={CONVERSION_OPTIONS}
                        handleSingleConvert={handleSingleConvert}
                        theme={theme}
                    />
                    
                    {/* 変換オプションセクション */}
                    <TextConverter.Components.BatchConversionOptions
                        optionsExpanded={optionsExpanded}
                        toggleOptions={toggleOptions}
                        options={options}
                        handleCheckboxChange={handleCheckboxChange}
                        handleSelectAll={handleSelectAll}
                        handleBatchConvert={handleBatchConvert}
                        CONVERSION_OPTIONS={CONVERSION_OPTIONS}
                        theme={theme}
                    />
                    
                    {/* カスタム置換セクション */}
                    <TextConverter.Components.CustomReplaceSection
                        customReplaceExpanded={customReplaceExpanded}
                        toggleCustomReplace={toggleCustomReplace}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        replaceText={replaceText}
                        setReplaceText={setReplaceText}
                        handleCustomReplace={handleCustomReplace}
                        theme={theme}
                        darkMode={darkMode}
                    />
                    
                    {/* スナックバー（通知） */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        message={snackbarMessage}
                    />
                </Container>
            </Paper>
        </ThemeProvider>
    );
}

// メインアプリケーションをレンダリング
ReactDOM.render(<TextConverterApp />, document.getElementById('root'));
