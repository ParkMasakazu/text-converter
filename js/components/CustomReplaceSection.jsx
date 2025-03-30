// グローバル変数として定義
window.CustomReplaceSection = function({ onCustomReplace }) {
    const [expanded, setExpanded] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [replaceText, setReplaceText] = React.useState('');
    
    const handleReplace = () => {
        if (!searchText) return;
        onCustomReplace(searchText, replaceText);
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
                        一括置換
                    </MaterialUI.Typography>
                    <span className="material-icons">
                        {expanded ? 'expand_less' : 'expand_more'}
                    </span>
                </MaterialUI.Box>
                <MaterialUI.Collapse in={expanded}>
                    <MaterialUI.Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mt: 2 }}>
                        <MaterialUI.TextField
                            label="検索文字列"
                            variant="outlined"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            size="small"
                            sx={{ minWidth: '150px' }}
                        />
                        <MaterialUI.TextField
                            label="置換文字列"
                            variant="outlined"
                            value={replaceText}
                            onChange={(e) => setReplaceText(e.target.value)}
                            size="small"
                            sx={{ minWidth: '150px' }}
                        />
                        <MaterialUI.Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleReplace}
                            startIcon={<span className="material-icons">find_replace</span>}
                            size="small"
                            disabled={!searchText}
                        >
                            置換
                        </MaterialUI.Button>
                    </MaterialUI.Stack>
                </MaterialUI.Collapse>
            </MaterialUI.CardContent>
        </MaterialUI.Card>
    );
}
