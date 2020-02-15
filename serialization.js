const fs = require("fs");
const path = require("path");

function charToArrays(char){
	let output = [];

	for(let i = 0; i < char.charCodeAt(0); i++){
		output.push([]);
	}

	return output;
}

function arrayToChar(arr){
	return String.fromCharCode(arr.length);
}

function stringToArrays(input){
	let output = []; 

	for(const char of input){
		const test = charToArrays(char);
		output.push(test);
	}

	return output;
}

function arraysToString(input){
	let output = "";

	for(const charArr of input){
		output+=String.fromCharCode(charArr.length);
	}

	return output;
}

function repl(key, value){
	switch(typeof(value)){
		case "string":
			return stringToArrays(value);
			break;

		case "number":
			return stringToArrays(value.toString());
			break;

		case "boolean":
			return stringToArrays(value.toString());
			break;

		default:
			return value;
			break;
	}
}

function rev(key, value){
	if(value instanceof Array && value.length !== 0 && value[0][0] !== undefined){
		if(value[0][0].length === 0){
			return arraysToString(value);
		}
	}

	return value;
}

function to3SymJSON(jsObj){
	return JSON.stringify(stringToArrays(JSON.stringify(jsObj)));
}

function from3SymJSON(ser){
	return JSON.parse(arraysToString(JSON.parse(ser)));
}

function to8SymJSON(jsObj){
	// Convert keys to arrays

	const obj = Object.assign({}, jsObj);

	for(const key of Object.keys(obj)){
		const arrKey = JSON.stringify(stringToArrays(key));

		if (key !== arrKey) {
			Object.defineProperty(obj, arrKey,
				Object.getOwnPropertyDescriptor(obj, key));
			delete obj[key];
		}
	}

	return JSON.stringify(obj, repl);
}

function from8SymJSON(str){
	const obj = JSON.parse(str, rev);

	for(const key of Object.keys(obj)){
		const arrKey = arraysToString(JSON.parse(key));

		if (key !== arrKey) {
			Object.defineProperty(obj, arrKey,
				Object.getOwnPropertyDescriptor(obj, key));
			delete obj[key];
		}
	}

	return obj;
}

const testData1 = {
	this: "is",
	a: ["t", "e", "s", "t", 3]
};

const testData2 = ["a", "b", "c", "test"];

const coded1 = to3SymJSON(testData1);
const coded2 = to3SymJSON(testData2);

fs.writeFile(path.join(__dirname, "3sym_1.txt"), coded1, (err) => {if (err) throw err;});
fs.writeFile(path.join(__dirname, "3sym_2.txt"), coded2, (err) => {if (err) throw err;});

const coded1_8sym = to8SymJSON(testData1);
const coded2_8sym = to8SymJSON(testData2);

fs.writeFile(path.join(__dirname, "8sym_1.txt"), coded1_8sym, (err) => {if (err) throw err;});
fs.writeFile(path.join(__dirname, "8sym_2.txt"), coded2_8sym, (err) => {if (err) throw err;});
