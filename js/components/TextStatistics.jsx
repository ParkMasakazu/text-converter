// グローバル変数として定義
window.TextStatistics = function({ 
    totalChars, 
    totalBytes, 
    totalLines, 
    getLineStats 
}) {
    const lineStats = getLineStats();
    
    return (
        <MaterialUI.Box sx={{ mt: 2 }}>
            <MaterialUI.Typography variant="body2">
                全体: {totalChars}文字 / {totalBytes}バイト / {totalLines}行
            </MaterialUI.Typography>
            <MaterialUI.Typography variant="body2" sx={{ mt: 0 }}>
                {lineStats?.map(line => (
                    <span key={line.lineNum} className="stats-inline">
                        {line.lineNum}行目: {line.chars}文字/{line.bytes}バイト
                    </span>
                ))}
            </MaterialUI.Typography>
        </MaterialUI.Box>
    );
}
