// 方放大倍数
var mul = 2;
// 初始化函数
function init() {
    bindEvent();
    createMove();
}
init();
// 点击事件
function bindEvent() {
    // 初始默认展示第一张图片
    getIndex(0);
    // 点击不同的li将图片展示出来
    $('ul').on('click', 'li', function () {
        var index = $(this).index();
        getIndex(index);
    });
    // 在图片显示区域移动放大镜
    $('.content').on('mousemove', function (e) {
        move(e);
    }).on('mouseleave', function () {
        $('.bigView').hide();
        $('.moveView').hide();
    });
};


function getIndex(i) {
    // 或得到当前展示第几张图片   将他插入到图片展示区及放大区域
    var src = $('li').eq(i).find('img').attr('src');
    $('.active').removeClass('active');
    $('li').eq(i).addClass('active');
    var img = '<img src="' + src + '" alt="">';
    $('.imgCover').empty().append(img);

    // 右侧展示区插入的图片大小为原图片大小乘以放大倍数
    $('.bigView').empty().append(img).find('img').css({
        'width': 500 * mul + 'px',
        'height': 500 * mul + 'px'
    });
}

function createMove() {
    // 根据放大倍数决定放大镜的大小
    var w = 500 / mul;
    $('.moveView').css({
        'width': w + 'px',
        'height': w + 'px'
    })
};

function move(e) {

    // 根据当前鼠标位置决定放大镜出现位置
    var w = $('.moveView').width();
    var X = e.clientX - $('.wrapper').offset().left - w / 2;
    var Y = e.clientY - $('.wrapper').offset().top - w / 2;

    // 判断边界 不能将放大镜超出边界
    X = X <= 0 ? 0 : X;
    Y = Y <= 0 ? 0 : Y;

    X = X >= (500 - w) ? (500 - w) : X;
    Y = Y >= (500 - w) ? (500 - w) : Y;

    // 根据鼠标移动位置  决定放大镜的位置 同时将放大镜显示出来
    $('.moveView').css({
        'left': X,
        'top': Y,
        'display': 'block'
    })

    // 同样根据左侧放大镜位置决定右侧显示区域范围
    // 将图片放大同样倍数插入到右侧展示区域  通过修改图片img的margin值
    // 将放大区域展示出来
    var posX = X * mul;
    var posY = Y * mul;

    $('.bigView').css({
        'display': 'block'
    }).find('img').css({
        'margin-left': -posX,
        'margin-top': -posY
    })
};