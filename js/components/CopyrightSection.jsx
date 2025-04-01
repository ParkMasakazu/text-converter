// グローバル変数として定義
window.CopyrightSection = function() {
    return (
        <MaterialUI.Box className="copyright-section">
            © {new Date().getFullYear()} parkmasakazu - MIT License
        </MaterialUI.Box>
    );
}
