// グローバル変数として定義
window.TextConverterApp = function() {
    // カスタムフックを利用した状態と関数
    const { mode, toggleColorMode, theme } = useColorMode();
    const { 
        inputText, setInputText, originalText, 
        totalChars, totalBytes, totalLines, 
        snackbarOpen, snackbarMessage,
        handleInputChange: handleRawInputChange,
        updateCharAndByteCount,
        showSnackbar,
        handleSnackbarClose,
        getLineStats,
        handleClear: handleRawClear
    } = useTextProcessing();
    
    const { 
        history, historyIndex, 
        convertText, handleUndo: historyUndo, 
        handleRedo: historyRedo, 
        handleReset: historyReset,
        initializeHistory
    } = useHistory(showSnackbar, updateCharAndByteCount);

    // イベントハンドラー
    const handleInputChange = (e) => {
        const newText = handleRawInputChange(e);
        initializeHistory(newText);
    };
    
    const handleCopy = () => {
        if (!inputText) {
            showSnackbar('コピーするテキストがありません');
            return;
        }
        navigator.clipboard.writeText(inputText).then(() => {
            showSnackbar('テキストをコピーしました');
        }).catch(() => {
            showSnackbar('コピーに失敗しました');
        });
    };
    
    const handleClear = () => {
        const newText = handleRawClear();
        initializeHistory(newText);
    };
    
    const handleUndo = () => {
        const newText = historyUndo();
        if (newText !== null) setInputText(newText);
    };
    
    const handleRedo = () => {
        const newText = historyRedo();
        if (newText !== null) setInputText(newText);
    };
    
    const handleReset = () => {
        const newText = historyReset(originalText);
        if (newText !== null) setInputText(newText);
    };

    // 変換関連の関数
    const handleSingleConvert = (conversionType) => {
        if (!CONVERSION_OPTIONS[conversionType]) return;
        const newText = convertText(inputText, CONVERSION_OPTIONS[conversionType].convert);
        setInputText(newText);
    };
    
    const handleBatchConvert = (selectedOptions) => {
        if (selectedOptions.length === 0) {
            showSnackbar('変換オプションを選択してください');
            return;
        }

        let newText = inputText;
        for (const option of selectedOptions) {
            if (CONVERSION_OPTIONS[option]) {
                newText = CONVERSION_OPTIONS[option].convert(newText);
            }
        }

        if (newText === inputText) return;
        
        setInputText(newText);
        updateCharAndByteCount(newText);
        const resultText = convertText(inputText, () => newText, '一括変換が完了しました');
        setInputText(resultText);
    };
    
    const handleCustomReplace = (searchText, replaceText) => {
        if (!searchText) {
            showSnackbar('検索文字列を入力してください');
            return;
        }
        
        const replacer = text => text.replace(new RegExp(searchText, 'g'), replaceText);
        const newText = convertText(inputText, replacer, '置換が完了しました');
        setInputText(newText);
    };

    return (
        <MaterialUI.ThemeProvider theme={theme}>
            <MaterialUI.CssBaseline />
            
            <MaterialUI.Container sx={{ py: 2 }} maxWidth={false}>
                {/* テキスト入力/変換結果セクション */}
                <TextInputSection 
                    inputText={inputText}
                    handleInputChange={handleInputChange}
                    handleCopy={handleCopy}
                    handleClear={handleClear}
                    handleUndo={handleUndo}
                    handleRedo={handleRedo}
                    handleReset={handleReset}
                    totalChars={totalChars}
                    totalBytes={totalBytes}
                    totalLines={totalLines}
                    getLineStats={getLineStats}
                    historyIndex={historyIndex}
                    history={history}
                    toggleColorMode={toggleColorMode}
                    mode={mode}
                />

                {/* 個別変換セクション */}
                <SingleConversionSection 
                    inputText={inputText}
                    conversionOptions={CONVERSION_OPTIONS}
                    handleSingleConvert={handleSingleConvert}
                />

                {/* 一括変換セクション */}
                <BatchConversionSection 
                    conversionOptions={CONVERSION_OPTIONS}
                    onBatchConvert={handleBatchConvert}
                />

                {/* カスタム置換セクション */}
                <CustomReplaceSection 
                    onCustomReplace={handleCustomReplace}
                />

                {/* 広告セクション */}
                <AdvertisementSection />

                {/* スナックバー（通知） */}
                <MaterialUI.Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <MaterialUI.Alert 
                        onClose={handleSnackbarClose} 
                        severity="success" 
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {snackbarMessage}
                    </MaterialUI.Alert>
                </MaterialUI.Snackbar>
            </MaterialUI.Container>
        </MaterialUI.ThemeProvider>
    );
}
