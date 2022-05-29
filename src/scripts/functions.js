// noinspection JSUndeclaredVariable

// const persist = require('./persist.json');
//
// let data = persist;

// (Converts user input to bool.)  TODO I think I can do better here!
function convertString(word) {
	switch (word.toLowerCase().trim()) {
		case 'yes':
		case 'true':
		case '1':
		case 'y':
			return true;
		case 'no':
		case 'false':
		case '0':
		case 'n':
		case null:
			return false;
		default:
			return false;
	}
}

// Checks an array of objects for specific property "values", then counts repeated values  TODO Convert to sqlite3
// (used for checking duplicate entries before they're pushed.)
function checkDuplicate(objArray, value) {
	let propCount = 0;
	// noinspection JSUndeclaredVariable
	for (i = 0; i < objArray.length; i++) {
		if (Object.values(objArray[i]).indexOf(value) > -1) {
			// console.log(`${objArray[i].id} contains ${value}`);
			propCount++;
		}
		if (i === objArray.length - 1 && propCount > 0) {
			return true;
		} else if (i === objArray.length - 1 && propCount <= 0) {
			return false;
		}
	}
}

// Returns truthy if 'value' exists as action prop
function checkAction(value) {
	let actions = 0;
	// let idArray = [];
	for (i = 1; i < data.length; i++) {
		if (data[i].action === value) {
			// idArray.push(data[i].id);
			actions++;
		}
		if (i + 1 >= data.length && actions > 0) {
			// console.log(`"${value}" exists in (ID: ${idArray})`);
			return true;
		} else if (i + 1 >= data.length && actions <= 0) {
			// console.log(`"${value}" is not a prop of action.`);
			return false;
		}
	}
}

function createMainMenu(arr1, arr2) {
	arr1.shift();
	arr2.pop();
	let menu;
	if (arr1.length === 0) {
		menu = arr2;
		return menu;
	} else {
		menu = arr1.concat(arr2);
		return menu;
	}
}

//Returns an array from actions
function createMenu(input) {
	let menu = [];
	if (input.length > 0) {
		for (i = 0; i < input.length; i++) {
			menu.unshift(input[i].action);
			if (i + 1 >= input.length) {
				return menu;
			}
		}
	} else return 0;
}

// Returns json object based on user input TODO I don't think this works!
function menuChoice(answer) {
	for (i = 0; i < data.length; i++) {
		if (answer === data[i].action) {
			// console.log(data[i]);
			return data[i];
		}
	}
}

//Iterators and Generators
function makeRangeIterator(start = 0, end = 100, step = 1) {
	let nextIndex = start;
	let iterationCount = 0;

	const rangeIterator = {
		next() {
			let result;
			if (nextIndex < end) {
				result = { value: nextIndex, done: false };
				nextIndex += step;
				iterationCount++;
				return result;
			}
			return { value: iterationCount, done: true };
		}
	};
	return rangeIterator;
}

function* fibonacci() {
	let current = 0;
	let next = 1;
	while (true) {
		let reset = yield current;
		[current, next] = [next, next + current];
		if (reset) {
			current = 0;
			next = 1;
		}
	}
}

module.exports = {
	convertString,
	checkDuplicate,
	checkAction,
	createMainMenu,
	createMenu,
	menuChoice
};
