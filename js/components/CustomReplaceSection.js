// グローバル名前空間
window.TextConverter = window.TextConverter || {};
TextConverter.Components = TextConverter.Components || {};

/**
 * カスタム置換セクションコンポーネント
 */
TextConverter.Components.CustomReplaceSection = ({ 
    customReplaceExpanded, 
    toggleCustomReplace,
    searchText,
    setSearchText,
    replaceText,
    setReplaceText,
    handleCustomReplace
}) => {
    const { 
        Button, Card, CardContent, Typography, Collapse, TextField 
    } = MaterialUI;
    
    return (
        <Card className="section">
            <CardContent className="compact-card-content">
                <Typography 
                    variant="h6" 
                    className="section-title clickable-title"
                    onClick={toggleCustomReplace}
                >
                    一括置換
                    <span className="material-icons">
                        {customReplaceExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                </Typography>
                <Collapse in={customReplaceExpanded}>
                    <div className="custom-replace">
                        <TextField
                            className="search-text"
                            label="検索文字列"
                            variant="outlined"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            size="small"
                            style={{ minWidth: '150px' }}
                        />
                        <TextField
                            className="replace-text"
                            label="置換文字列"
                            variant="outlined"
                            value={replaceText}
                            onChange={(e) => setReplaceText(e.target.value)}
                            size="small"
                            style={{ minWidth: '150px' }}
                        />
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleCustomReplace}
                            startIcon={<span className="material-icons">find_replace</span>}
                            size="small"
                        >
                            置換
                        </Button>
                    </div>
                </Collapse>
            </CardContent>
        </Card>
    );
};
