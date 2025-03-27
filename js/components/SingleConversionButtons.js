// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Components = TextConverter.Components || {};

/**
 * 個別変換ボタンコンポーネント
 */
TextConverter.Components.SingleConversionButtons = ({ 
    CONVERSION_OPTIONS, 
    handleSingleConvert, 
    theme 
}) => {
    const { Box, Button, Card, CardContent, Typography } = MaterialUI;
    
    return (
        <Card className="section">
            <CardContent className="compact-card-content" style={{
                backgroundColor: theme.palette.background.paper
            }}>
                <Typography variant="h6" className="section-title" style={{
                    color: theme.palette.text.primary
                }}>
                    個別変換
                </Typography>
                <Box className="button-group">
                    {Object.entries(CONVERSION_OPTIONS).map(([key, { label }]) => (
                        <Button 
                            key={key}
                            variant="outlined"
                            onClick={() => handleSingleConvert(key)}
                            size="small"
                            style={{ borderColor: theme.palette.border.button }}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};
