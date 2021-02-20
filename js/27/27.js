/**
 * 空格
        中英文之间需要增加空格
        中文与数字之间需要增加空格
        数字与单位之间需要增加空格
        全角标点与其他字符之间不加空格
   标点符号
        不重复使用标点符号
        破折号前后需要增加一个空格
        省略号
   全角和半角
        使用全角中文标点
        数字使用半角字符
        遇到完整的英文整句、特殊名词，其內容使用半角标点
 */

 function charCheck(str) {
     // 全角标点字符们
    var strPunct = '！（）【】『』「」《》“”‘’；：，。？、';
    // 使用管道符连接
    var regPunct = strPunct.split('').join('|');
    var strPunctHalf = '!()[]"\';:,.?';
// 不同于全角字符，半角字符需要加转义
    var regPunctHalf = strPunctHalf.split('').join('|\\');
    var regs = [{
         reg: /[\u4e00-\u9fa5][a-zA-Z]|[a-zA-Z][\u4e00-\u9fa5]/g,
         txt: '中英文之间需要增加空格'
     }, {
         reg: /[\u4e00-\u9fa5]\d|\d[\u4e00-\u9fa5]/g,
         txt: '中文与数字之间需要增加空格'
     }, {
         reg: /\d[A-Z]+/,
         txt: '数字与单位之间需要增加空格'
     }, {
        reg: new RegExp('['+ regPunct +']\\s +| +\\s['+ regPunct +']', 'g'),
        txt: '全角标点与其他字符之间不加空格'
     }, {
        reg: new RegExp(`(${regPunct})\\1+`, 'g'),
        txt: '中文标点不重复'
     }, {
         reg: /\S--|--\S/g,
         txt: '破折号前后需要增加一个空格'
     }, {
         reg: new RegExp(`[\u4e00-\u9fa5][a-z]*( *[${regPunctHalf}] *)|( *[${regPunctHalf}] *)[a-z]*[\u4e00-\u9fa5]`, 'gi'),
         txt: '使用全角中文标点'
     }, {
         reg: /[\uFF10-\uFF19]+/g,
         txt: '数字使用半角'
     }, {
         reg: new RegExp(`([a-z]+[${regPunct}|\\s])+[a-z]*([${regPunct}|\\s][a-z]+)+`, 'gi'),
         txt: '遇到完整的英文整句，其內容使用半角标点'
     }]
     regs.forEach(function(d,i){
        var res = str.match(d.reg);
        if(res){
            console.group("%c错误"+(i+1)+"："+d.txt,"color:red");
            console.log(res)
            console.groupEnd();
        }
    })
 }
 charCheck('在 LeanCloud上，，数据存储13是——围绕AVObject 进行3DAY的。。，每个 AVObject都包含,了与 JSON 兼容的key-value,对应的 ——数据。 数据是 schema-free 的， 你不需要１０００在每个 AVObject 上提前指定存《Stay hungry，stay foolish.》在哪些键 ， 只要直接设定对应的 key-value 即可。乔布斯那「Stay hungry，stay foolish.」句话是怎么说的？「Stay hungry,stay foolish。」')
