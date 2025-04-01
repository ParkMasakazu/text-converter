// グローバル変数として定義
window.BatchConversionSection = function({ conversionOptions, onBatchConvert }) {
    const [expanded, setExpanded] = React.useState(false);
    const [options, setOptions] = React.useState(
        Object.keys(conversionOptions).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {})
    );
    
    // チェックボックスの処理
    const handleCheckboxChange = (e) => {
        setOptions({
            ...options,
            [e.target.name]: e.target.checked
        });
    };

    // 全選択/全解除の処理
    const handleSelectAll = (select) => {
        const newOptions = {};
        Object.keys(options).forEach(key => {
            newOptions[key] = select;
        });
        setOptions(newOptions);
    };
    
    // 一括変換の実行
    const handleApply = () => {
        const selectedOptions = Object.entries(options)
            .filter(([_, value]) => value)
            .map(([key]) => key);
            
        onBatchConvert(selectedOptions);
    };
    
    return (
        <MaterialUI.Card sx={{ mb: 2 }}>
            <MaterialUI.CardContent>
                <MaterialUI.Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => setExpanded(!expanded)}
                >
                    <MaterialUI.Typography variant="h6">
                        一括変換
                    </MaterialUI.Typography>
                    <span className="material-icons">
                        {expanded ? 'expand_less' : 'expand_more'}
                    </span>
                </MaterialUI.Box>
                <MaterialUI.Collapse in={expanded}>
                    <MaterialUI.Box sx={{ mb: 1 }}>
                        <MaterialUI.Button 
                            variant="text" 
                            color="primary" 
                            onClick={() => handleSelectAll(true)}
                            size="small"
                        >
                            すべて選択
                        </MaterialUI.Button>
                        <MaterialUI.Button 
                            variant="text" 
                            color="primary" 
                            onClick={() => handleSelectAll(false)}
                            size="small"
                        >
                            すべて解除
                        </MaterialUI.Button>
                    </MaterialUI.Box>
                    <MaterialUI.FormGroup className="checkbox-group">
                        {Object.entries(conversionOptions).map(([key, { label }]) => (
                            <div key={key} className="compact-checkbox">
                                <MaterialUI.FormControlLabel
                                    control={
                                        <MaterialUI.Checkbox 
                                            checked={options[key]} 
                                            onChange={handleCheckboxChange}
                                            name={key}
                                            color="primary"
                                            size="small"
                                            sx={{ p: '0 2px 0 10px' }}
                                        />
                                    }
                                    label={label}
                                />
                            </div>
                        ))}
                    </MaterialUI.FormGroup>
                    <MaterialUI.Box sx={{ mt: 1 }}>
                        <MaterialUI.Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleApply}
                            startIcon={<span className="material-icons">transform</span>}
                            size="small"
                            disabled={!Object.values(options).some(isSelected => isSelected)}
                        >
                            選択した変換を一括適用
                        </MaterialUI.Button>
                    </MaterialUI.Box>
                </MaterialUI.Collapse>
            </MaterialUI.CardContent>
        </MaterialUI.Card>
    );
}
