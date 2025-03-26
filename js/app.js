const {
    Button, TextField, Checkbox, FormControlLabel, Typography, Paper, Grid, Divider, IconButton,
    Box, Container, Snackbar, FormGroup, Card, CardContent, Collapse, Switch,
    createTheme, ThemeProvider
} = MaterialUI;

function TextConverterApp() {
    // ダークモード状態の管理
    const [darkMode, setDarkMode] = React.useState(false);
    
    // テーマの定義
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                    primary: {
                        main: darkMode ? '#90caf9' : '#1976d2',
                    },
                    secondary: {
                        main: darkMode ? '#f48fb1' : '#dc004e',
                    },
                    background: {
                        default: darkMode ? '#121212' : '#f5f5f5',
                        paper: darkMode ? '#1e1e1e' : '#ffffff',
                    },
                    border: {
                        textarea: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                        button: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)',
                    },
                    text: {
                        primary: darkMode ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
                        secondary: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    },
                },
            }),
        [darkMode],
    );
    
    // ダークモード切替ハンドラー
    const handleThemeChange = () => {
        setDarkMode(!darkMode);
        // ローカルストレージに設定を保存
        localStorage.setItem('darkMode', !darkMode);
    };

    // システムの色設定を検出する関数
    const detectColorScheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true; // ダークモード
        }
        return false; // ライトモード
    };

    // 定数定義
    const CONVERSION_OPTIONS = {
        spaceNormalization: {
            label: "スペース正規化",
            convert: text => text.replace(/　/g, ' ').replace(/ +/g, ' ')
        },
        // fullWidthSpaceToHalfWidth: {
        //     label: "全角→半角スペース",
        //     convert: text => text.replace(/　/g, ' ')
        // },
        // consecutiveSpacesToSingle: {
        //     label: "連続→単一スペース",
        //     convert: text => text.replace(/ +/g, ' ')
        // },
        katakanaToHiragana: {
            label: "カタカナ→ひらがな",
            convert: text => text.replace(/[\u30A1-\u30FA]/g, match => 
                String.fromCharCode(match.charCodeAt(0) - 0x60)
            )
        },
        hiraganaToKatakana: {
            label: "ひらがな→カタカナ",
            convert: text => text.replace(/[\u3041-\u3096]/g, match => 
                String.fromCharCode(match.charCodeAt(0) + 0x60)
            )
        },
        halfWidthKatakanaToFullWidthKatakana: {
            label: "半角→全角カタカナ",
            convert: text => {
                // 基本的な半角→全角カタカナ変換マップ
                const HALF_TO_FULL = {
                    'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
                    'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
                    'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
                    'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
                    'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
                    'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
                    'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
                    'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
                    'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
                    'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
                    'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
                    'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ', 'ｰ': 'ー'
                };
                
                // 濁点・半濁点の変換マッピング
                const DAKUTEN_MAP = {
                    'カ': 'ガ', 'キ': 'ギ', 'ク': 'グ', 'ケ': 'ゲ', 'コ': 'ゴ',
                    'サ': 'ザ', 'シ': 'ジ', 'ス': 'ズ', 'セ': 'ゼ', 'ソ': 'ゾ',
                    'タ': 'ダ', 'チ': 'ヂ', 'ツ': 'ヅ', 'テ': 'デ', 'ト': 'ド',
                    'ハ': 'バ', 'ヒ': 'ビ', 'フ': 'ブ', 'ヘ': 'ベ', 'ホ': 'ボ'
                };
                
                const HANDAKUTEN_MAP = {
                    'ハ': 'パ', 'ヒ': 'ピ', 'フ': 'プ', 'ヘ': 'ペ', 'ホ': 'ポ'
                };
                
                // 文字を一つずつ見ていく
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const nextChar = text[i + 1];
                    
                    // 基本的な変換
                    const convertedChar = HALF_TO_FULL[char] || char;
                    
                    // 次の文字が濁点か半濁点かを確認
                    if (nextChar === 'ﾞ' && DAKUTEN_MAP[convertedChar]) {
                        result += DAKUTEN_MAP[convertedChar];
                        i++; // 濁点をスキップ
                    } else if (nextChar === 'ﾟ' && HANDAKUTEN_MAP[convertedChar]) {
                        result += HANDAKUTEN_MAP[convertedChar];
                        i++; // 半濁点をスキップ
                    } else {
                        result += convertedChar;
                    }
                }
                
                return result;
            }
        },
        fullWidthAlphanumericToHalfWidth: {
            label: "全角→半角英数字",
            convert: text => {
                // より明示的なUnicode範囲指定
                return text.replace(/[\uFF01-\uFF5E]/g, s => {
                    // 文字コードの差分を計算して半角に変換
                    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
                });
            }
        },
        removeDuplicateWords: {
            label: "重複単語除去",
            convert: text => [...new Set(text.split(/\s+/))].join(' ')
        },
        spaceToNewline: {
            label: "スペース→改行",
            convert: text => text.replace(/ /g, '\n')
        },
        sortWordsJapanese: {
            label: "あいうえお順",
            convert: text => text.split(/\s+/).sort((a, b) => a.localeCompare(b, 'ja')).join(' ')
        }
    };

    // 状態管理
    const [inputText, setInputText] = React.useState('');
    const [originalText, setOriginalText] = React.useState('');
    const [totalChars, setTotalChars] = React.useState(0);
    const [totalBytes, setTotalBytes] = React.useState(0);
    const [totalLines, setTotalLines] = React.useState(0);
    const [lineChars, setLineChars] = React.useState([]);
    const [lineBytes, setLineBytes] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [replaceText, setReplaceText] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [optionsExpanded, setOptionsExpanded] = React.useState(false);
    const [customReplaceExpanded, setCustomReplaceExpanded] = React.useState(false);
    const [options, setOptions] = React.useState(
        Object.keys(CONVERSION_OPTIONS).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {})
    );
    const [history, setHistory] = React.useState([]);
    const [historyIndex, setHistoryIndex] = React.useState(-1);

    // ============= テキスト関連の関数 =============
    
    // テキスト入力の処理
    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);
        setOriginalText(text);  // オリジナルテキストを保存
        updateCharAndByteCount(text);
        
        // 新しい入力があった場合、履歴をリセット
        setHistory([text]);
        setHistoryIndex(0);
    };

    // 文字数とバイト数カウントの更新
    const updateCharAndByteCount = (text) => {
        setTotalChars(text.length);
        
        // 全体のバイト数を計算
        const blob = new Blob([text]);
        setTotalBytes(blob.size);
        
        // 各行の文字数とバイト数を計算
        const lines = text.split('\n');
        setTotalLines(lines.length);
        setLineChars(lines.map(line => line.length));
        
        // 各行のバイト数
        const bytesPerLine = lines.map(line => {
            const lineBlob = new Blob([line]);
            return lineBlob.size;
        });
        setLineBytes(bytesPerLine);
    };

    // ============= 変換関連の関数 =============

    // テキスト変換の共通処理
    const convertText = (conversionFunc, successMessage = '変換が完了しました') => {
        const newText = conversionFunc(inputText);
        if (newText === inputText) return; // 変化がない場合は何もしない
        
        setInputText(newText);
        updateCharAndByteCount(newText);
        addToHistory(newText);
        showSnackbar(successMessage);
    };

    // 個別変換の処理
    const handleSingleConvert = (conversionType) => {
        if (!CONVERSION_OPTIONS[conversionType]) return;
        convertText(CONVERSION_OPTIONS[conversionType].convert);
    };

    // 一括変換の処理
    const handleBatchConvert = () => {
        const selectedOptions = Object.entries(options)
            .filter(([_, value]) => value)
            .map(([key]) => key);
        
        if (selectedOptions.length === 0) {
            showSnackbar('変換オプションを選択してください');
            return;
        }

        let newText = inputText;
        for (const option of selectedOptions) {
            if (CONVERSION_OPTIONS[option]) {
                newText = CONVERSION_OPTIONS[option].convert(newText);
            }
        }

        setInputText(newText);
        updateCharAndByteCount(newText);
        addToHistory(newText);
        showSnackbar('一括変換が完了しました');
    };

    // カスタム置換の処理
    const handleCustomReplace = () => {
        if (!searchText) {
            showSnackbar('検索文字列を入力してください');
            return;
        }
        convertText(
            text => text.replace(new RegExp(searchText, 'g'), replaceText),
            '置換が完了しました'
        );
    };

    // ============= 履歴関連の関数 =============

    // 履歴に追加する共通の関数
    const addToHistory = (newText) => {
        if (newText === inputText) return; // 変化がない場合は履歴に追加しない
        
        // 現在の履歴インデックスより後の履歴を削除して新しい状態を追加
        const newHistory = history.slice(0, historyIndex + 1).concat(newText);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    // 履歴を移動する共通の関数
    const moveHistory = (direction, canMoveCheck, indexChange, successMessage, errorMessage) => {
        if (canMoveCheck) {
            const newIndex = historyIndex + indexChange;
            const historyText = history[newIndex];
            setInputText(historyText);
            updateCharAndByteCount(historyText);
            setHistoryIndex(newIndex);
            showSnackbar(successMessage);
        } else {
            showSnackbar(errorMessage);
        }
    };

    // 履歴を一つ前に戻る
    const handleUndo = () => {
        moveHistory(
            'back',
            historyIndex > 0,
            -1,
            '一つ前の状態に戻りました',
            'これ以上戻れません'
        );
    };

    // 履歴を一つ先に進む
    const handleRedo = () => {
        moveHistory(
            'forward',
            historyIndex < history.length - 1,
            1,
            '一つ先の状態に進みました',
            'これ以上進めません'
        );
    };

    // 最初の状態に戻す
    const handleReset = () => {
        if (!originalText) {
            showSnackbar('元に戻すテキストがありません');
            return;
        }
        setInputText(originalText);
        updateCharAndByteCount(originalText);
        
        // 履歴を初期化
        setHistory([originalText]);
        setHistoryIndex(0);
        
        showSnackbar('最初のテキストに戻しました');
    };
    
    // ============= UI操作関連の関数 =============

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
    
    // コピーボタンの処理
    const handleCopy = () => {
        if (!inputText) {
            showSnackbar('コピーするテキストがありません');
            return;
        }
        navigator.clipboard.writeText(inputText).then(() => {
            showSnackbar('テキストをコピーしました');
        }).catch(() => {
            showSnackbar('コピーに失敗しました');
        });
    };

    // クリアボタンの処理
    const handleClear = () => {
        setInputText('');
        setOriginalText('');
        setTotalChars(0);
        setTotalBytes(0);
        setTotalLines(0);
        setLineChars([]);
        setLineBytes([]);
        setHistory([]);
        setHistoryIndex(-1);
        showSnackbar('テキストをクリアしました');
    };

    // トグルセクション
    const toggleOptions = () => setOptionsExpanded(!optionsExpanded);
    const toggleCustomReplace = () => setCustomReplaceExpanded(!customReplaceExpanded);

    // スナックバーの表示
    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // スナックバーを閉じる
    const handleSnackbarClose = () => setSnackbarOpen(false);

    // 行情報の表示を制限（最大10行まで）
    const getLineStats = () => {
        if (lineChars.length === 0) return null;
        
        return Array.from({ length: Math.min(10, lineChars.length) }, (_, i) => (
            <span key={i} className="stats-inline">
                {i + 1}行目: {lineChars[i]}文字/{lineBytes[i]}バイト
            </span>
        ));
    };

    // 初期設定を行うuseEffectを修正
    React.useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            // ローカルストレージに保存された設定がある場合はそれを使用
            setDarkMode(savedMode === 'true');
        } else {
            // 保存された設定がない場合はシステム設定を使用
            setDarkMode(detectColorScheme());
        }
        
        // システム設定の変更を監視
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            // ローカルストレージに設定がない場合のみ自動変更
            if (localStorage.getItem('darkMode') === null) {
                setDarkMode(e.matches);
            }
        };
        
        // 変更リスナーを追加（ブラウザ間の互換性に配慮）
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // 古いブラウザ向け
            mediaQuery.addListener(handleChange);
        }
        
        // クリーンアップ関数
        if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleChange);
        } else {
            // 古いブラウザ向け
            mediaQuery.removeListener(handleChange);
        }

        // ダークモードの状態に応じてクラスを追加
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // ============= レンダリング =============
    return (
        <ThemeProvider theme={theme}>
            <Paper
                style={{
                    minHeight: '100vh',
                    borderRadius: 0,
                    boxShadow: 'none',
                    transition: 'background-color 0.3s, color 0.3s',
                }}
            >
                <Container className="app-container" maxWidth={false}>
                    {/* テキスト入力/変換結果セクション */}
                    <Card className="section">
                        <CardContent className="compact-card-content" style={{
                            backgroundColor: theme.palette.background.paper
                        }}>
                            <Typography 
                                variant="h6" 
                                className="section-title top-title"
                                style={{
                                    color: theme.palette.text.primary
                                }}
                            >
                                テキスト入力/変換結果
                                <IconButton 
                                    onClick={handleThemeChange} 
                                    color="inherit" 
                                    size="small"
                                    aria-label="テーマを切り替え"
                                >
                                    <span className="material-icons">
                                        {darkMode ? 'light_mode' : 'dark_mode'}
                                    </span>
                                </IconButton>
                            </Typography>
                            <textarea
                                className="resizable-textarea"
                                value={inputText}
                                onChange={handleInputChange}
                                placeholder="ここにテキストを入力してください..."
                                style={{
                                    backgroundColor: theme.palette.background.paper,
                                    color: theme.palette.text.primary,
                                    borderColor: theme.palette.border.textarea
                                }}
                            ></textarea>
                            <Box className="button-group" mt={2}>
                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    startIcon={<span className="material-icons">clear</span>}
                                    onClick={handleClear}
                                    size="small"
                                >
                                    クリア
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="primary"
                                    onClick={handleCopy}
                                    startIcon={<span className="material-icons">content_copy</span>}
                                    disabled={!inputText}
                                    size="small"
                                >
                                    コピー
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="primary"
                                    onClick={handleUndo}
                                    startIcon={<span className="material-icons">undo</span>}
                                    disabled={historyIndex <= 0}
                                    size="small"
                                >
                                    戻る
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="primary"
                                    onClick={handleRedo}
                                    startIcon={<span className="material-icons">redo</span>}
                                    disabled={historyIndex >= history.length - 1}
                                    size="small"
                                >
                                    進む
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="secondary"
                                    onClick={handleReset}
                                    startIcon={<span className="material-icons">restore</span>}
                                    size="small"
                                >
                                    最初に戻す
                                </Button>
                                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', color: '#666' }}>
                                    （直接テキストを編集すると戻す初期値が更新されます。）
                                </Typography>
                            </Box>
                            
                            {/* 文字数・バイト数・行数カウント */}
                            <Box mt={2}>
                                <Typography variant="body2">
                                    全体: {totalChars}文字 / {totalBytes}バイト / {totalLines}行
                                </Typography>
                                <Typography variant="body2" mt={1}>
                                    {getLineStats()}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* 個別変換ボタンセクション */}
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

                    {/* 変換オプションセクション */}
                    <Card className="section">
                        <CardContent className="compact-card-content" style={{
                            backgroundColor: theme.palette.background.paper
                        }}>
                            <Typography 
                                variant="h6" 
                                className="section-title clickable-title"
                                onClick={toggleOptions}
                                style={{
                                    color: theme.palette.text.primary
                                }}
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
                                                style={{
                                                    color: theme.palette.text.primary
                                                }}
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

                    {/* カスタム置換セクション */}
                    <Card className="section">
                        <CardContent className="compact-card-content" style={{
                            backgroundColor: theme.palette.background.paper
                        }}>
                            <Typography 
                                variant="h6" 
                                className="section-title clickable-title"
                                onClick={toggleCustomReplace}
                                style={{
                                    color: theme.palette.text.primary
                                }}
                            >
                                一括置換
                                <span className="material-icons">
                                    {customReplaceExpanded ? 'expand_less' : 'expand_more'}
                                </span>
                            </Typography>
                            <Collapse in={customReplaceExpanded}>
                                <div className="custom-replace">
                                    <TextField
                                        label="検索文字列"
                                        variant="outlined"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        size="small"
                                        style={{
                                            minWidth: '150px',
                                            backgroundColor: theme.palette.background.paper
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color: theme.palette.text.secondary
                                            }
                                        }}
                                        InputProps={{
                                            style: {
                                                color: theme.palette.text.primary
                                            },
                                            classes: {
                                                notchedOutline: darkMode ? 'dark-mode-outline' : ''
                                            }
                                        }}                                
                                    />
                                    <TextField
                                        label="置換文字列"
                                        variant="outlined"
                                        value={replaceText}
                                        onChange={(e) => setReplaceText(e.target.value)}
                                        size="small"
                                        style={{
                                            minWidth: '150px',
                                            backgroundColor: theme.palette.background.paper
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color: theme.palette.text.secondary
                                            }
                                        }}
                                        InputProps={{
                                            style: {
                                                color: theme.palette.text.primary
                                            },
                                            classes: {
                                                notchedOutline: darkMode ? 'dark-mode-outline' : ''
                                            }
                                        }}                                
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

                    {/* スナックバー（通知） */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        message={snackbarMessage}
                    />
                </Container>
            </Paper>
        </ThemeProvider>
    );
}

ReactDOM.render(<TextConverterApp />, document.getElementById('root'));
