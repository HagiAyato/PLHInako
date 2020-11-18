function hinako() {
	// コード取得
	var code = document.forms["code"].elements["input"].value;
	code = (code == null) ? "" : code;
	// 標準入力取得
	var arg = document.forms["code"].elements["arg"].value;
	arg = (arg == null) ? "" : arg;
	// 標準入力が1バイト文字だけか確認
	if (arg.match(/^[\x20-\x7e]*$/)) {
		alert("標準入力に1バイト文字以外を入れないでください。");
	}
	// 実行結果を出力
	var bfcode = hinakoToBF(code);
	console.log('bfcode:' + bfcode);
	console.log('arg:' + arg);
	document.forms["code"].elements["console"].value = brainfuck(bfcode, arg);
}

function hinakoToBF(codeString) {
	let bfCode = "";// ここにbrainf*ckに変換されたソースコードが入る。
	let counter = 0;
	let order = ["むふふふふ", "むふふふ", "むふふ", "むふ", "♪", "！", "日菜子は～", "王子様～"];
	// Hinako→Brainf*ckの変換処理本体
	while (counter < codeString.length) {
		if (codeString.startsWith(order[0], counter)) {
			// むふふふふ → >
			bfCode += ">";
			counter += order[0].length;
		} else if (codeString.startsWith(order[1], counter)) {
			// むふふふ → <
			bfCode += "<";
			counter += order[1].length;
		} else if (codeString.startsWith(order[2], counter)) {
			// むふふ → +
			bfCode += "+";
			counter += order[2].length;
		} else if (codeString.startsWith(order[3], counter)) {
			// むふ → -
			bfCode += "-";
			counter += order[3].length;
		} else if (codeString.startsWith(order[4], counter)) {
			// ♪ → .
			bfCode += ".";
			counter += order[4].length;
		} else if (codeString.startsWith(order[5], counter)) {
			// ！ → ,
			bfCode += ",";
			counter += order[5].length;
		} else if (codeString.startsWith(order[6], counter)) {
			// 日菜子は～ → [
			bfCode += "[";
			counter += order[6].length;
		} else if (codeString.startsWith(order[7], counter)) {
			// 王子様～ → ]
			bfCode += "]";
			counter += order[7].length;
		} else {
			// 命令に該当しない箇所は飛ばす
			counter++;
		}
	}
	return bfCode;
}

function brainfuck(code, arg) {
	// 入力コード
	let input = code.split("");
	// コンソール出力
	let output = "";
	// ポインタ
	let ptr = 0;
	let argptr = 0;
	let data = [0, null];
	let bracketIdex = [];
	let skipCounter = 0;

	// コード長ループ
	for (let i = 0; i < input.length; i++) {
		if (skipCounter != 0 && /[^\[\]]/.test(input[i])) {
			continue;
		}
		//処理本体
		switch (input[i]) {
			case ">":
				// ポインタをインクリメントする。(ptr++;)
				ptr++;
				if (data[ptr] == null) {
					data[ptr] = 0;
					data.push(null);
				}
				break;
			case "<":
				// ポインタをデクリメントする。(ptr--;)
				ptr--;
				break;
			case "+":
				// ポインタが指す値をインクリメントする。((*ptr)++;)
				data[ptr] += 1;
				break;
			case "-":
				// ポインタが指す値をデクリメントする。((*ptr)--;)
				data[ptr] -= 1;
				break;
			case ".":
				// ポインタが指す値を出力に書き出す。(putchar(*ptr);)
				output += String.fromCharCode(data[ptr]);
				break;
			case ",":
				// 入力から1バイト読み込んで、ポインタが指す先に代入する。(*ptr=getchar();)
				if(argptr < arg.length){
					data[ptr] = arg.charCodeAt(argptr);
					argptr++;
				}
				break;
			case "[":
				// ポインタが指す値が0なら、対応する ] の直後にジャンプする。(while(*ptr){)
				if (data[ptr] != 0) {
					bracketIdex.push(i);
				} else {
					skipCounter++;
				}
				break;
			case "]":
				// ポインタが指す値が0でないなら、対応する [ （の直後[1]）にジャンプする。(})
				if (data[ptr] != 0) {
					i = bracketIdex.pop() - 1;
				} else {
					if (skipCounter == 0) {
						bracketIdex.pop();
					} else {
						skipCounter--;
					}
				}
				break;
		}
	}
	return output;
}