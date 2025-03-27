// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Components = TextConverter.Components || {};

/**
 * 個別変換ボタンコンポーネント
 */
TextConverter.Components.SingleConversionButtons = ({ 
    CONVERSION_OPTIONS, 
    handleSingleConvert
}) => {
    const { Box, Button, Card, CardContent, Typography } = MaterialUI;
    
    return (
        <Card className="section">
            <CardContent className="compact-card-content">
                <Typography variant="h6" className="section-title">
                    個別変換
                </Typography>
                <Box className="button-group">
                    {Object.entries(CONVERSION_OPTIONS).map(([key, { label }]) => (
                        <Button 
                            key={key}
                            variant="outlined"
                            color="inherit" 
                            onClick={() => handleSingleConvert(key)}
                            size="small"
                        >
                            {label}
                        </Button>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};
