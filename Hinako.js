function hinako() {
	// コード取得
	var code = document.forms["code"].elements["input"].value;
	// 標準入力取得
	var arg = "";//document.forms["code"].elements["()"].value;
	// 実行結果を出力
	document.forms["code"].elements["console"].value = brainfuck(hinakoToBF(code), arg);
}

function hinakoToBF(hinakoCode){
	let bfCode = hinakoCode;
	return bfCode;
}

function brainfuck(code, arg) {
	// 入力コード
	input = code.split("");
	// コンソール出力
	let output = "";
	// ポインタ
	let ptr = 0;
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
				if(data[ptr] == null){
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
				break;
			case "[":
				// ポインタが指す値が0なら、対応する ] の直後にジャンプする。(while(*ptr){)
				if(data[ptr] != 0){
					bracketIdex.push(i);
				}else{
					skipCounter++;
				}
				break;
			case "]":
				// ポインタが指す値が0でないなら、対応する [ （の直後[1]）にジャンプする。(})
				if(data[ptr] != 0){
					i = bracketIdex.pop() - 1;
				}else{
					if(skipCounter == 0){
						bracketIdex.pop();
					}else{
						skipCounter--;
					}
				}
				break;
		}
	}
	return output;
}