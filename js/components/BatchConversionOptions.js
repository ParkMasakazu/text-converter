// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Components = TextConverter.Components || {};

/**
 * 一括変換オプションコンポーネント
 */
TextConverter.Components.BatchConversionOptions = ({ 
    optionsExpanded, 
    toggleOptions, 
    options, 
    handleCheckboxChange, 
    handleSelectAll, 
    handleBatchConvert,
    CONVERSION_OPTIONS
}) => {
    const { 
        Box, Button, Card, CardContent, Typography, Collapse, 
        FormGroup, FormControlLabel, Checkbox 
    } = MaterialUI;
    
    return (
        <Card className="section">
            <CardContent className="compact-card-content">
                <Typography 
                    variant="h6" 
                    className="section-title clickable-title"
                    onClick={toggleOptions}
                >
                    一括変換
                    <span className="material-icons">
                        {optionsExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                </Typography>
                <Collapse in={optionsExpanded}>
                    <Box mb={1}>
                        <Button 
                            variant="text" 
                            color="primary" 
                            onClick={() => handleSelectAll(true)}
                            size="small"
                        >
                            すべて選択
                        </Button>
                        <Button 
                            variant="text" 
                            color="primary" 
                            onClick={() => handleSelectAll(false)}
                            size="small"
                        >
                            すべて解除
                        </Button>
                    </Box>
                    <FormGroup className="checkbox-group">
                        {Object.entries(CONVERSION_OPTIONS).map(([key, { label }]) => (
                            <div key={key} className="compact-checkbox">
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={options[key]} 
                                            onChange={handleCheckboxChange}
                                            name={key}
                                            color="primary"
                                            size="small"
                                        />
                                    }
                                    label={label}
                                />
                            </div>
                        ))}
                    </FormGroup>
                    <Box className="button-group" mt={1}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleBatchConvert}
                            startIcon={<span className="material-icons">transform</span>}
                            size="small"
                        >
                            選択した変換を一括適用
                        </Button>
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    );
};
