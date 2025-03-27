// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Components = TextConverter.Components || {};

/**
 * テキスト統計情報コンポーネント
 */
TextConverter.Components.TextStats = ({ textStats, theme }) => {
    const { Box, Typography } = MaterialUI;
    
    const { totalChars, totalBytes, totalLines, lineChars, lineBytes } = textStats;
    
    // 行情報の表示を制限（最大10行まで）
    const getLineStats = () => {
        if (lineChars.length === 0) return null;
        
        return Array.from({ length: Math.min(10, lineChars.length) }, (_, i) => (
            <span key={i} className="stats-inline">
                {i + 1}行目: {lineChars[i]}文字/{lineBytes[i]}バイト
            </span>
        ));
    };
    
    return (
        <Box mt={2}>
            <Typography variant="body2" style={{ color: theme.palette.text.primary }}>
                全体: {totalChars}文字 / {totalBytes}バイト / {totalLines}行
            </Typography>
            <Typography variant="body2" mt={1} style={{ color: theme.palette.text.primary }}>
                {getLineStats()}
            </Typography>
        </Box>
    );
};
