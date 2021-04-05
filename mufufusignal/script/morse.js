/**
 * モールス信号
 * ベース：https://valinst.hatenadiary.org/entry/20091114/1258185800
 */
var Morse = function () { }

Morse.isJapanese = true;

/**
 * 日本語->モールス定義
 */
Morse.JToMorse = {
    'イ': '・－', 'ロ': '・－・－',
    'ハ': '－・・・', 'ニ': '－・－・',
    'ホ': '－・・', 'ヘ': '・',
    'ト': '・・－・・', 'チ': '・・－・',
    'リ': '－－・', 'ヌ': '・・・・',
    'ル': '－・－－・', 'ヲ': '・－－－',
    'ワ': '－・－', 'カ': '・－・・',
    'ヨ': '－－', 'タ': '－・',
    'レ': '－－－', 'ソ': '－－－・',
    'ツ': '・－－・', 'ネ': '－－・－',
    'ナ': '・－・', 'ラ': '・・・',
    'ム': '－', 'ウ': '・・－',
    'ヰ': '・－・・－', 'ノ': '・・－－',
    'オ': '・－・・・', 'ク': '・・・－',
    'ヤ': '・－－', 'マ': '－・・－',
    'ケ': '－・－－', 'フ': '－－・・',
    'コ': '－－－－', 'エ': '－・－－－',
    'テ': '・－・－－', 'ア': '－－・－－',
    'サ': '－・－・－', 'キ': '－・－・・',
    'ユ': '－・・－－', 'メ': '－・・・－',
    'ミ': '・・－・－', 'シ': '－－・－・',
    'ヱ': '・－－・・', 'ヒ': '－－・・－',
    'モ': '－・・－・', 'セ': '・－－－・',
    'ス': '－－－・－', 'ン': '・－・－・',
    '1': '・－－－－', '2': '・・－－－',
    '3': '・・・－－', '4': '・・・・－',
    '5': '・・・・・', '6': '－・・・・',
    '7': '－－・・・', '8': '－－－・・',
    '9': '－－－－・', '0': '－－－－－',
    '゛': '・・', '゜': '・・－－・',
    'ー': '・－－・－', '、': '・－・－・－',
    '」': '・－・－・・', '（': '－・－－・－',
    '）': '・－・・－・'
}

/**
 * モールス->日本語定義
 */
Morse.MorseToJ = {
    '・－': 'イ', '・－・－': 'ロ',
    '－・・・': 'ハ', '－・－・': 'ニ',
    '－・・': 'ホ', '・': 'ヘ',
    '・・－・・': 'ト', '・・－・': 'チ',
    '－－・': 'リ', '・・・・': 'ヌ',
    '－・－－・': 'ル', '・－－－': 'ヲ',
    '－・－': 'ワ', '・－・・': 'カ',
    '－－': 'ヨ', '－・': 'タ',
    '－－－': 'レ', '－－－・': 'ソ',
    '・－－・': 'ツ', '－－・－': 'ネ',
    '・－・': 'ナ', '・・・': 'ラ',
    '－': 'ム', '・・－': 'ウ',
    '・－・・－': 'ヰ', '・・－－': 'ノ',
    '・－・・・': 'オ', '・・・－': 'ク',
    '・－－': 'ヤ', '－・・－': 'マ',
    '－・－－': 'ケ', '－－・・': 'フ',
    '－－－－': 'コ', '－・－－－': 'エ',
    '・－・－－': 'テ', '－－・－－': 'ア',
    '－・－・－': 'サ', '－・－・・': 'キ',
    '－・・－－': 'ユ', '－・・・－': 'メ',
    '・・－・－': 'ミ', '－－・－・': 'シ',
    '・－－・・': 'ヱ', '－－・・－': 'ヒ',
    '－・・－・': 'モ', '・－－－・': 'セ',
    '－－－・－': 'ス', '・－・－・': 'ン',
    '・－－－－': '1', '・・－－－': '2',
    '・・・－－': '3', '・・・・－': '4',
    '・・・・・': '5', '－・・・・': '6',
    '－－・・・': '7', '－－－・・': '8',
    '－－－－・': '9', '－－－－－': '0',
    '・・': '゛', '・・－－・': '゜',
    '・－－・－': 'ー', '・－・－・－': '、',
    '・－・－・・': '」', '－・－－・－': '（',
    '・－・・－・': '）', '－・・－－－': '[本文]',
    '・・・－・': '[訂正/終了]'
}

/**
 * 英数字->モールス定義
 */
 Morse.EToMorse = {
    'A': '・－',
    'B': '－・・・', 'C': '－・－・',
    'D': '－・・', 'E': '・',
    'F': '・・－・',
    'G': '－－・', 'H': '・・・・',
    'J': '・－－－',
    'K': '－・－', 'L': '・－・・',
    'M': '－－', 'N': '－・',
    'O': '－－－',
    'P': '・－－・', 'Q': '－－・－',
    'R': '・－・', 'S': '・・・',
    'T': '－', 'U': '・・－',
    'V': '・・・－',
    'W': '・－－', 'X': '－・・－',
    'Y': '－・－－', 'Z': '－－・・',
    '1': '・－－－－', '2': '・・－－－',
    '3': '・・・－－', '4': '・・・・－',
    '5': '・・・・・', '6': '－・・・・',
    '7': '－－・・・', '8': '－－－・・',
    '9': '－－－－・', '0': '－－－－－',
    'I': '・・',
    '.': '・－・－・－', ',': '－－・・－－',
    '?': '・・－－・・', '--': '－・・・－',
    '-': '－・・・・－', '/': '－・・－・',
    '@': '・－－・－・'
}

/**
 * モールス->英数字定義
 */
Morse.MorseToE = {
    '・－': 'A',
    '－・・・': 'B', '－・－・': 'C',
    '－・・': 'D', '・': 'E',
    '・・－・': 'F',
    '－－・': 'G', '・・・・': 'H',
    '・－－－': 'J',
    '－・－': 'K', '・－・・': 'L',
    '－－': 'M', '－・': 'N',
    '－－－': 'O',
    '・－－・': 'P', '－－・－': 'Q',
    '・－・': 'R', '・・・': 'S',
    '－': 'T', '・・－': 'U',
    '・・・－': 'V',
    '・－－': 'W', '－・・－': 'X',
    '－・－－': 'Y', '－－・・': 'Z',
    '・－－－－': '1', '・・－－－': '2',
    '・・・－－': '3', '・・・・－': '4',
    '・・・・・': '5', '－・・・・': '6',
    '－－・・・': '7', '－－－・・': '8',
    '－－－－・': '9', '－－－－－': '0',
    '・・': 'I',
    '・－・－・－': '.', '－－・・－－': ',',
    '・・－－・・': '?', '－・・・－': '--',
    '－・・・・－': '-', '－・・－・': '/',
    '・－－・－・': '@', '・・・・・・・・': '[訂正]'
}

/**
 * 日本語分解
 * @param {分解する日本語} cs 
 * @returns 
 */
Morse.ConvertString = function (cs) {
    cs = cs.replace("ガ", "カ゛").replace("ギ", "キ゛").replace("グ", "ク゛").replace("ゲ", "ケ゛").replace("ゴ", "コ゛");
    cs = cs.replace("ザ", "サ゛").replace("ジ", "シ゛").replace("ズ", "ス゛").replace("ゼ", "セ゛").replace("ゾ", "ソ゛");
    cs = cs.replace("ダ", "タ゛").replace("ヂ", "チ゛").replace("ヅ", "ツ゛").replace("デ", "テ゛").replace("ド", "ト゛");
    cs = cs.replace("バ", "ハ゛").replace("ビ", "ヒ゛").replace("ブ", "フ゛").replace("ベ", "ヘ゛").replace("ボ", "ホ゛");
    cs = cs.replace("パ", "ハ゜").replace("ピ", "ヒ゜").replace("プ", "フ゜").replace("ペ", "ヘ゜").replace("ポ", "ホ゜");
    cs = cs.replace("ァ", "ア").replace("ィ", "イ").replace("ゥ", "ウ").replace("ェ", "エ").replace("ォ", "オ");
    cs = cs.replace("ヵ", "カ").replace("ッ", "ツ").replace("ャ", "ヤ").replace("ュ", "ユ").replace("ョ", "ヨ");
    cs = cs.replace(/(\n|\r)+/g, "」")
    return cs;
}

/**
 * 元の文->モールス変換
 * @param {元の文} message 
 * @returns 
 */
Morse.JEncode = function (message) {
    // 前処理
    var array = Morse.ConvertString(message).split("");
    var ret = new Array();
    // 1文字ごとにモールス変換
    for (c in array) {
        var m = Morse.isJapanese ? Morse.JToMorse[array[c]] : Morse.EToMorse[array[c]];
        ret.push(m == undefined ? "？" : m);
    }
    return ret.join(" ");
}

/**
 * モールス->元の文変換
 * @param {モールス} message 
 * @returns 
 */
Morse.JDecode = function (message) {
    // IE系のために全角空白を置き換え
    message = message.replace(/　/g, " ");
    var array = message.replace(/^\s+|\s+$/g, " ").split(/\s+/);
    var ret = new Array();
    // 1文字ごとに元の文変換
    for (c in array) {
        var m = Morse.isJapanese ? Morse.MorseToJ[array[c]] : Morse.MorseToE[array[c]];
        ret.push(m == undefined ? "？" : m);
    }
    return ret.join("");
}

/**
 * ボタンクリック時処理
 * @param {呼び出し関数} func 
 * @returns 
 */
function buttonClick(func) {
    if (document.morse.src.value == "") return false;
    document.morse.dest.value = func(document.morse.src.value);
}