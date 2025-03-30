// グローバル変数として定義
window.useTextProcessing = function() {
    const [inputText, setInputText] = React.useState('');
    const [originalText, setOriginalText] = React.useState('');
    const [totalChars, setTotalChars] = React.useState(0);
    const [totalBytes, setTotalBytes] = React.useState(0);
    const [totalLines, setTotalLines] = React.useState(0);
    const [lineChars, setLineChars] = React.useState([]);
    const [lineBytes, setLineBytes] = React.useState([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    // テキスト入力の処理
    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);
        setOriginalText(text);  // オリジナルテキストを保存
        updateCharAndByteCount(text);
        
        return text; // useHistoryフックでの利用のために返す
    };

    // 文字数とバイト数カウントの更新
    const updateCharAndByteCount = (text) => {
        setTotalChars(text.length);
        
        // 全体のバイト数を計算
        const blob = new Blob([text]);
        setTotalBytes(blob.size);
        
        // 各行の文字数とバイト数を計算
        const lines = text.split('\n');
        setTotalLines(lines.length);
        setLineChars(lines.map(line => line.length));
        
        // 各行のバイト数
        const bytesPerLine = lines.map(line => {
            const lineBlob = new Blob([line]);
            return lineBlob.size;
        });
        setLineBytes(bytesPerLine);
    };

    // スナックバーの表示
    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // スナックバーを閉じる
    const handleSnackbarClose = () => setSnackbarOpen(false);

    // 行情報の表示を制限（最大10行まで）
    const getLineStats = () => {
        if (lineChars.length === 0) return null;
        
        return Array.from({ length: Math.min(10, lineChars.length) }, (_, i) => ({
            lineNum: i + 1,
            chars: lineChars[i],
            bytes: lineBytes[i]
        }));
    };

    // クリアボタンの処理
    const handleClear = () => {
        setInputText('');
        setOriginalText('');
        setTotalChars(0);
        setTotalBytes(0);
        setTotalLines(0);
        setLineChars([]);
        setLineBytes([]);
        showSnackbar('テキストをクリアしました');
        
        return ''; // useHistoryフックでの利用のために返す
    };

    return {
        inputText, setInputText,
        originalText, setOriginalText,
        totalChars, totalBytes, totalLines,
        lineChars, lineBytes,
        snackbarOpen, snackbarMessage,
        handleInputChange,
        updateCharAndByteCount,
        showSnackbar,
        handleSnackbarClose,
        getLineStats,
        handleClear
    };
}
