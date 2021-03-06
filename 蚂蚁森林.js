var screen_width = 1080;  //设置屏幕的宽度，像素值
var screen_height = 1920; //设置屏幕的高度，像素值
threads.start(function () {
    //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    events.observeKey();
    events.on("key_down", function (keyCode, events) {
        //音量键关闭脚本
        if (keyCode == keys.volume_down) {
            toast("您选择退出脚本！")
            sleep(200);
            exit();
        }
    });
});
//前置操作
setScreenMetrics(screen_width, screen_height);
//收取自己的能量
for (var row = screen_height * 0.256; row < screen_height * 0.376; row += 80)
    for (var col = screen_width * 0.185; col < screen_width * 0.815; col += 80) {
        click(col, row);
        sleep(50);
    }
//循环收取好友能量
while (text("找能量").findOne()) {
    log("开始收能量");
    text("找能量").findOne().click();
    sleep(1000);
    if (className("android.widget.Button").exists() && !className("android.view.View").text("点击展开好友动态").exists()) {
        log("触发成功");
        back();
        exit();
    }
    if (className("android.view.View").text("开始拯救绿色能量").exists()) {
        log("触发成功");
        back();
        exit();
    }
    for (var row = screen_height * 0.256; row < screen_height * 0.376; row += 80) {
        for (var col = screen_width * 0.185; col < screen_width * 0.815; col += 80) {
            click(col, row);
            sleep(50);
        }
    }
    back();
    log("一个好友能量收取结束，开始下一个");
}
log("循环结束准备退出");
exit();
