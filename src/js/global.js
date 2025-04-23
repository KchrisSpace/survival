// 禁止复制粘贴，将剪切板内容更改为“不许复制”
document.addEventListener('copy', function(e) {
    e.preventDefault();
    e.clipboardData.setData('text/plain', '不许复制');
});
document.addEventListener('paste', function(e) {
    e.preventDefault();
    e.clipboardData.setData('text/plain', '不许复制');
});

// 禁止右键
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 禁止调整窗口大小
window.addEventListener('resize', function(e) {
    e.preventDefault();
});
// 让内容无法被鼠标选中
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});
// 禁止f12
// document.addEventListener('keydown', function(e) {
//     if (e.key === 'F12') {
//         e.preventDefault();
//     }
// });

// 禁止ctrl+shift+i
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
    }
});


