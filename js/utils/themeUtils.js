// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Utils = TextConverter.Utils || {};

/**
 * システムのカラーテーマを検出
 * @returns {boolean} trueの場合はダークモード、falseの場合はライトモード
 */
TextConverter.Utils.detectColorScheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true; // ダークモード
    }
    return false; // ライトモード
};

/**
 * テーマ変更のイベントリスナーを設定
 * @param {Function} callback - テーマ変更時に呼び出すコールバック関数
 * @returns {Function} クリーンアップ用の関数
 */
TextConverter.Utils.setupThemeChangeListener = (callback) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
        // ローカルストレージに設定がない場合のみ自動変更
        if (localStorage.getItem('darkMode') === null) {
            callback(e.matches);
        }
    };
    
    // 変更リスナーを追加（ブラウザ間の互換性に配慮）
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
    } else {
        // 古いブラウザ向け
        mediaQuery.addListener(handleChange);
    }
    
    // クリーンアップ関数を返す
    return () => {
        if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleChange);
        } else {
            // 古いブラウザ向け
            mediaQuery.removeListener(handleChange);
        }
    };
};
