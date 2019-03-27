/**
 * 20190319@JAR:
 * 
 * 1.汉化字典'cnItems:obj',
 * 2.采集新词'cnItem:fun';
 * 
 */

//1.汉化杂项
var cnItems = {
    _STYLE_: [
        '符号', '待归类', '地图', '防具', '武器', '道具', '属性', '敌人'
    ],
    _OTHER_: [],

    //1.0.符号
    '': '',
    '---': '———',

    //1.1.待归类
    'A.Hershey experiments': 'A.Hershey实验',
    'AI neural network': '人工智能神经网络',
    'Alien brain': '外星人大脑',
    'Baby clicker': '婴儿点击者',
    'C.MacLeod experiments': 'C.MacLeod实验',
    'Cell grow': '细胞生长',
    'Chargaff experiments': '查格夫实验',
    'Computer': '电脑',
    'Crow brain': '乌鸦大脑',
    'Da Vinci brain': '达芬奇大脑',
    'Delbrück experiments': '德尔布吕克实验',
    'Devil\'s brain':'魔鬼大脑',
    'Dog brain': '狗脑',
    'Einstein brain': '爱因斯坦大脑',
    'F.Crick experiments': 'F.Crick实验',
    'F.Griffith discovery': 'F.格里菲斯发现',
    'Fish brain': '鱼脑',
    'Frog brain': '蛙脑',
    'Ghost brain': '鬼脑',
    'Gorilla brain': '大猩猩大脑',
    'Graduated clicker': '毕业点击者',
    'H.Khorana experiments': 'H.Khorana实验',
    'Human brain': '人脑',
    'J.Watson experiments': '沃森实验',
    'Jedi clicker': '绝地点击者',
    'Kid clicker': '儿童点击者',
    'Kiwi brain': '猕猴桃大脑',
    'M.Chace experiments': 'M.Chace实验',
    'M.McCarty experiments': 'M.McCarty实验',
    'M.Nirenberg experiments': 'M.Nirenberg实验',
    'M.Wilkins experiments': 'M.Wilkins实验',
    'Math skills': '数学技能',
    'Miescher discovery': '米歇尔发现',
    'Mouse Breaker': '鼠标破坏者',
    'Mutation rate': '突变率',
    'NASA clicker': 'NASA点击者',
    'Neuron proximity': '神经元距离',
    'Ninja clicker': '忍者点击者',
    'O.Avery discovery': 'O.Avery实验',
    'Picasso gift': '毕加索的礼物',
    'Pro clicker': '专业点击者',
    'R.Holley experiments': 'R.Holley实验',
    'Rotifer brain': '轮虫大脑',
    'S.Luria experiments': 'S.Luria实验',
    'Student clicker': '学生点击者',
    'Super clicker': '超级点击者',
    'T.H.Morgan experiments': 'T.H.Morgan实验',
    'Teen clicker': '少年点击者',
    'Turing machine': '图灵机',
    'Ultimate clicker': '终极点击者',
    'Worm brain': '蠕虫脑',
    'Customize environment': '自定义环境',
    'Strength loss reduce by 10%': '强度损失减少10％',
    'Strength loss reduce by 20%': '强度损失减少20％',
    'Upgrade cost reduce by 10%': '升级成本降低10％',
    'Upgrade cost reduce by 5%': '升级成本降低5％',
    'upgrade costs reduce by 25%': '升级成本降低25％',
    'Neurons distance reduce by 5%': '神经元距离减少5％',
    '1.10x pulse speed': '1.10x 脉冲速度',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

    //1.2.地图
    '': '',
    '': '',

    //1.3.防具
    //1.4.武器
    //1.5.道具

    //1.6.属性（30）
    '': '',

    //1.7.敌人 

};
//2.采集新词
//20190320@JAR

var cnItem = function () {

    //传参是否非空字串
    if (!arguments[0]) return;

    //检验传参是否对象
    let text = arguments[0],
        s = '';
    if (typeof (text) != "string")
        return text;
    else
        s = arguments[0].charCodeAt();

    //检验传参是否英文
    if (
        s < 65 || (s > 90 && s < 97) || (s > 122)

    ) return text;
    //检验字典是否可存
    if (!cnItems._OTHER_) cnItems._OTHER_ = [];

    //遍历尝试匹配
    for (let i in cnItems) {
        //字典已有词汇或译文、且译文不为空，则返回译文
        if (
            text == i || text == cnItems[i] &&
            cnItems[i] != ''
        )
            return cnItems[i];
    }

    //遍历生词表是否收录
    for (
        let i = 0; i < cnItems._OTHER_.length; i++
    ) {
        //已收录则直接返回
        if (text == cnItems._OTHER_[i])
            return text;
    }

    //未收录则保存
    cnItems._OTHER_.push(text);
    cnItems._OTHER_.sort(
        function (a, b) {
            return a.localeCompare(b)
        }
    );

    /*
        //开启生词打印
        //console.log(
            '有需要汉化的英文：', text
        );
    */

    //返回生词字串
    return text;
};
