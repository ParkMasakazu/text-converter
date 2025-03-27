// メインアプリケーションコンポーネント
function TextConverterApp() {
    const { Paper, Container, Snackbar, ThemeProvider, Card, CardContent, Box } = MaterialUI;
    
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
                        <CardContent className="compact-card-content">
                            {/* テキスト入力エリア */}
                            <TextConverter.Components.TextInput 
                                inputText={inputText}
                                handleInputChange={handleInputChange}
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
                            />
                            
                            {/* テキスト統計情報 */}
                            <TextConverter.Components.TextStats 
                                textStats={textStats}
                            />
                        </CardContent>
                    </Card>
                    
                    {/* 個別変換ボタンセクション */}
                    <TextConverter.Components.SingleConversionButtons
                        CONVERSION_OPTIONS={CONVERSION_OPTIONS}
                        handleSingleConvert={handleSingleConvert}
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
                    />
                    
                    {/* 広告のためのスペース確保 */}
                    <Box mt={2} mb={2} height="30px"></Box>
                    
                    {/* スナックバー（通知） */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        message={snackbarMessage}
                    />
                </Container>
                
                {/* 広告バナーコンポーネント */}
                <TextConverter.Components.AdBanner />
            </Paper>
        </ThemeProvider>
    );
}

// メインアプリケーションをレンダリング
ReactDOM.render(<TextConverterApp />, document.getElementById('root'));
