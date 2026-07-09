// 要因分析作成ボタンのイベント（外部ファイルでキャッシュ回避）
(function() {
  function handleYoshinClick(e) {
    const btn = e.target.closest('.btn-yoshin');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      const raw = btn.getAttribute('data-record');
      if (!raw) { alert('データが取得できません'); return; }
      const r = JSON.parse(raw.replace(/&#39;/g, "'"));
      if (typeof openYoshinModal === 'function') {
        openYoshinModal(r, 'records');
      } else {
        alert('openYoshinModal未定義: ' + Object.keys(window).filter(k=>k.includes('oshin')));
      }
    } catch(err) {
      alert('エラー: ' + err.message);
    }
  }
  // DOMContentLoadedとloadの両方で登録
  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', handleYoshinClick, true); // capture phase
  });
  document.addEventListener('click', handleYoshinClick, true);
})();
