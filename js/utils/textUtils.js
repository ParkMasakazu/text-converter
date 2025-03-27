// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Utils = TextConverter.Utils || {};

/**
 * テキストの文字数とバイト数を計算
 * @param {string} text - 分析対象のテキスト
 * @returns {Object} 文字数、バイト数、行数、各行の情報を含むオブジェクト
 */
TextConverter.Utils.analyzeText = (text) => {
    const totalChars = text.length;
    
    // 全体のバイト数を計算
    const blob = new Blob([text]);
    const totalBytes = blob.size;
    
    // 各行の文字数とバイト数を計算
    const lines = text.split('\n');
    const totalLines = lines.length;
    const lineChars = lines.map(line => line.length);
    
    // 各行のバイト数
    const lineBytes = lines.map(line => {
        const lineBlob = new Blob([line]);
        return lineBlob.size;
    });
    
    return {
        totalChars,
        totalBytes,
        totalLines,
        lineChars,
        lineBytes
    };
};

/**
 * 行情報の表示用フォーマット（最大10行まで）
 * @param {Array} lineChars - 各行の文字数配列
 * @param {Array} lineBytes - 各行のバイト数配列
 * @returns {Array|null} フォーマット済みの行情報配列、もしくはnull
 */
TextConverter.Utils.formatLineStats = (lineChars, lineBytes) => {
    if (lineChars.length === 0) return null;
    
    return Array.from({ length: Math.min(10, lineChars.length) }, (_, i) => ({
        lineNumber: i + 1,
        chars: lineChars[i],
        bytes: lineBytes[i]
    }));
};
