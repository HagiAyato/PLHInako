/**
 * むふ～ふ信号
 */
var Mufufu = Morse;

/**
 * モールス->むふ～ふ定義
 */
Mufufu.MorseToMufufu = {
    '・': 'むふ', '－': 'むふふ', ' ': ' '
};

/**
* むふ～ふ->モールス定義
*/
Mufufu.MufufuToMorse = {
    'むふふ': '－', 'むふ': '・', ' ': ' '
};

/**
* モールス->むふ～ふ変換
* @param {元の文} message 
* @returns 
*/
Mufufu.MEncode = function (message) {
    // 前処理
    var array = Morse.ConvertString(message).split("");
    var ret = new Array();
    // 1文字ごとにモールス変換
    for (c in array) {
        var m = Mufufu.MorseToMufufu[array[c]];
        ret.push(m == undefined ? "？" : m);
    }
    return ret.join("");
};

/**
* むふ～ふ->モールス変換
* @param {元の文} message 
* @returns 
*/
Mufufu.MDecode = function (message) {
    // IE系のために全角空白を置き換え
    message = message.replace(/　/g, " ").replace(/^\s+|\s+$/g, " ");
    // 前処理
    var array = message.replace(/ふむ/g, "ふ,む").replace(/ /g, ", ,").split(",");
    var ret = new Array();
    // 1文字ごとにモールス変換
    for (c in array) {
        var m = Mufufu.MufufuToMorse[array[c]];
        ret.push(m == undefined ? "？" : m);
    }
    return ret.join("");
};

/**
* 元の文->むふ～ふ変換
* @param {元の文} message 
* @returns 
*/
Mufufu.MJEncode = function (message) { 
    return Mufufu.MEncode(Morse.JEncode(message));
};

/**
* むふ～ふ->元の文変換
* @param {元の文} message 
* @returns 
*/
Mufufu.MJDecode = function (message) { 
    return Morse.JDecode(Mufufu.MDecode(message));
};