// グローバル変数として定義
window.SingleConversionSection = function({ 
    inputText,
    conversionOptions,
    handleSingleConvert
}) {
    return (
        <MaterialUI.Card sx={{ mb: 2 }}>
            <MaterialUI.CardContent>
                <MaterialUI.Typography variant="h6" sx={{ mb: 2 }}>
                    個別変換
                </MaterialUI.Typography>
                <MaterialUI.Box className="button-group">
                    {Object.entries(conversionOptions).map(([key, { label }]) => (
                        <MaterialUI.Button 
                            key={key}
                            variant="contained"
                            color="inherit"
                            onClick={() => handleSingleConvert(key)}
                            size="small"
                            disabled={!inputText}
                        >
                            {label}
                        </MaterialUI.Button>
                    ))}
                </MaterialUI.Box>
            </MaterialUI.CardContent>
        </MaterialUI.Card>
    );
}
