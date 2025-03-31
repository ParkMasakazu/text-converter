// グローバル変数として定義
window.useHistory = function(showSnackbar, updateCharAndByteCount) {
    const [history, setHistory] = React.useState([]);
    const [historyIndex, setHistoryIndex] = React.useState(-1);
    
    // 履歴に追加する共通の関数
    const addToHistory = (newText, currentText) => {
        if (newText === currentText) return currentText; // 変化がない場合は履歴に追加しない
        
        // 現在の履歴インデックスより後の履歴を削除して新しい状態を追加
        const newHistory = history.slice(0, historyIndex + 1).concat(newText);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        
        return newText;
    };

    // テキスト変換の共通処理
    const convertText = (text, conversionFunc, successMessage = '変換が完了しました') => {
        const newText = conversionFunc(text);
        if (newText === text) return text; // 変化がない場合は何もしない
        
    // 先頭の空白文字と改行を削除
    const trimmedText = newText.replace(/^[\s\n]+/, '');
    
    updateCharAndByteCount(trimmedText);
    const resultText = addToHistory(trimmedText, text);
        showSnackbar(successMessage);
        
        return resultText;
    };

    // 履歴を移動する共通の関数
    const moveHistory = (direction, canMoveCheck, indexChange, successMessage, errorMessage) => {
        if (canMoveCheck) {
            const newIndex = historyIndex + indexChange;
            const historyText = history[newIndex];
            updateCharAndByteCount(historyText);
            setHistoryIndex(newIndex);
            showSnackbar(successMessage);
            return historyText;
        } else {
            showSnackbar(errorMessage);
            return null;
        }
    };

    // 履歴を一つ前に戻る
    const handleUndo = (text) => {
        return moveHistory(
            'back',
            historyIndex > 0,
            -1,
            '一つ前の状態に戻りました',
            'これ以上戻れません'
        );
    };

    // 履歴を一つ先に進む
    const handleRedo = (text) => {
        return moveHistory(
            'forward',
            historyIndex < history.length - 1,
            1,
            '一つ先の状態に進みました',
            'これ以上進めません'
        );
    };

    // 最初の状態に戻す
    const handleReset = (originalText) => {
        if (!originalText) {
            showSnackbar('元に戻すテキストがありません');
            return null;
        }
        
        updateCharAndByteCount(originalText);
        
        // 履歴を初期化
        setHistory([originalText]);
        setHistoryIndex(0);
        
        showSnackbar('最初のテキストに戻しました');
        return originalText;
    };

    // 初期テキスト設定（テキスト変更時）
    const initializeHistory = (text) => {
        setHistory([text]);
        setHistoryIndex(text ? 0 : -1);
    };

    return {
        history,
        historyIndex,
        addToHistory,
        convertText,
        handleUndo,
        handleRedo,
        handleReset,
        initializeHistory
    };
}
