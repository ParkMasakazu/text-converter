// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Hooks = TextConverter.Hooks || {};

/**
 * テキスト変換機能を提供するカスタムフック
 * @returns {Object} テキスト操作に関する状態と関数を含むオブジェクト
 */
TextConverter.Hooks.useTextConverter = () => {
    // 状態管理
    const [inputText, setInputText] = React.useState('');
    const [originalText, setOriginalText] = React.useState('');
    const [textStats, setTextStats] = React.useState({
        totalChars: 0,
        totalBytes: 0,
        totalLines: 0,
        lineChars: [],
        lineBytes: []
    });
    const [searchText, setSearchText] = React.useState('');
    const [replaceText, setReplaceText] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [optionsExpanded, setOptionsExpanded] = React.useState(false);
    const [customReplaceExpanded, setCustomReplaceExpanded] = React.useState(false);
    const [options, setOptions] = React.useState(
        Object.keys(TextConverter.CONVERSION_OPTIONS).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {})
    );
    const [history, setHistory] = React.useState([]);
    const [historyIndex, setHistoryIndex] = React.useState(-1);

    // テキスト入力の処理
    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);
        setOriginalText(text);  // オリジナルテキストを保存
        updateTextStats(text);
        
        // 新しい入力があった場合、履歴をリセット
        setHistory([text]);
        setHistoryIndex(0);
    };

    // テキスト統計情報の更新
    const updateTextStats = (text) => {
        const stats = TextConverter.Utils.analyzeText(text);
        setTextStats(stats);
    };

    // テキスト変換の共通処理
    const convertText = (conversionFunc, successMessage = '変換が完了しました') => {
        const newText = conversionFunc(inputText);
        if (newText === inputText) return; // 変化がない場合は何もしない
        
        setInputText(newText);
        updateTextStats(newText);
        addToHistory(newText);
        showSnackbar(successMessage);
    };

    // 個別変換の処理
    const handleSingleConvert = (conversionType) => {
        if (!TextConverter.CONVERSION_OPTIONS[conversionType]) return;
        convertText(TextConverter.CONVERSION_OPTIONS[conversionType].convert);
    };

    // 一括変換の処理
    const handleBatchConvert = () => {
        const selectedOptions = Object.entries(options)
            .filter(([_, value]) => value)
            .map(([key]) => key);
        
        if (selectedOptions.length === 0) {
            showSnackbar('変換オプションを選択してください');
            return;
        }

        let newText = inputText;
        for (const option of selectedOptions) {
            if (TextConverter.CONVERSION_OPTIONS[option]) {
                newText = TextConverter.CONVERSION_OPTIONS[option].convert(newText);
            }
        }

        setInputText(newText);
        updateTextStats(newText);
        addToHistory(newText);
        showSnackbar('一括変換が完了しました');
    };

    // カスタム置換の処理
    const handleCustomReplace = () => {
        if (!searchText) {
            showSnackbar('検索文字列を入力してください');
            return;
        }
        
        try {
            const regex = new RegExp(searchText, 'g');
            convertText(
                text => text.replace(regex, replaceText),
                '置換が完了しました'
            );
        } catch (error) {
            showSnackbar('正規表現エラー: ' + error.message);
        }
    };

    // 履歴に追加する共通の関数
    const addToHistory = (newText) => {
        if (newText === inputText) return; // 変化がない場合は履歴に追加しない
        
        // 現在の履歴インデックスより後の履歴を削除して新しい状態を追加
        const newHistory = history.slice(0, historyIndex + 1).concat(newText);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    // 履歴を一つ前に戻る
    const handleUndo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            const historyText = history[newIndex];
            setInputText(historyText);
            updateTextStats(historyText);
            setHistoryIndex(newIndex);
            showSnackbar('一つ前の状態に戻りました');
        } else {
            showSnackbar('これ以上戻れません');
        }
    };

    // 履歴を一つ先に進む
    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            const historyText = history[newIndex];
            setInputText(historyText);
            updateTextStats(historyText);
            setHistoryIndex(newIndex);
            showSnackbar('一つ先の状態に進みました');
        } else {
            showSnackbar('これ以上進めません');
        }
    };

    // 最初の状態に戻す
    const handleReset = () => {
        if (!originalText) {
            showSnackbar('元に戻すテキストがありません');
            return;
        }
        setInputText(originalText);
        updateTextStats(originalText);
        
        // 履歴を初期化
        setHistory([originalText]);
        setHistoryIndex(0);
        
        showSnackbar('最初のテキストに戻しました');
    };
    
    // チェックボックスの処理
    const handleCheckboxChange = (e) => {
        setOptions({
            ...options,
            [e.target.name]: e.target.checked
        });
    };

    // 全選択/全解除の処理
    const handleSelectAll = (select) => {
        const newOptions = {};
        Object.keys(options).forEach(key => {
            newOptions[key] = select;
        });
        setOptions(newOptions);
    };
    
    // コピーボタンの処理
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

    // クリアボタンの処理
    const handleClear = () => {
        setInputText('');
        setOriginalText('');
        updateTextStats('');
        setHistory([]);
        setHistoryIndex(-1);
        showSnackbar('テキストをクリアしました');
    };

    // トグルセクション
    const toggleOptions = () => setOptionsExpanded(!optionsExpanded);
    const toggleCustomReplace = () => setCustomReplaceExpanded(!customReplaceExpanded);

    // スナックバーの表示
    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // スナックバーを閉じる
    const handleSnackbarClose = () => setSnackbarOpen(false);

    return {
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
        CONVERSION_OPTIONS: TextConverter.CONVERSION_OPTIONS
    };
};
