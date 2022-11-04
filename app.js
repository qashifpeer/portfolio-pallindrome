// Reverse A String
function reversedStr(str) {
  // var letterSplit = str.split("");
  // var reversedLetters = letterSplit.reverse();
  // var  reversedStr = reversedLetters.join("");
  // return reversedStr;

  return str.split("").reverse().join("");
}

//If The String IS Palindrome
function isPalindrome(str) {
  var reversedString = reversedStr(str);
  return str === reversedString;
}

// convert date to string
function convertDateToString(date) {
  var dateStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}
// get All Date Formats

function getAllDateFormats(date) {
  var strDate = convertDateToString(date); //converts to string

  ddmmyyyy = strDate.day + strDate.month + strDate.year;
  mmddyyyy = strDate.month + strDate.day + strDate.year;
  yyyymmdd = strDate.year + strDate.day + strDate.month;
  ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
  mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
  yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  var listOfFormats = getAllDateFormats(date);
  var flag = false;
  for (var i = 0; i < listOfFormats.length; i++) {
    if (isPalindrome(listOfFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 == 0) {
    return true;
  }
  if (year % 4 == 0) {
    return true;
  }
  if (year % 100 == 0) {
    return true;
  }
  return false;
}


function nextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } //if month is not 2
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

// *************************Practice SET
// Logic for previous date to be implemented
// *****************************************

function getNextPalindromeDate(date) {
  var ctr = 0;
  var getNextDate = nextDate(date);

  while (1) {
    ctr++;

    var isPalindrome = checkPalindromeForAllFormats(getNextDate);

    if (isPalindrome) {
      break;
    }
    getNextDate = nextDate(getNextDate);
  }

  return [ctr, getNextDate];
  // console.log(ctr, getNextDate);
}


// var date = {
//   day: 20,
//   month: 02,
//   year: 2002,
// };
// console.log(checkPalindromeForAllFormats(date));

var inputDateRef = document.querySelector("#input-date");
var btnShowRef = document.querySelector("#btn-show");
var resultRef = document.querySelector("#result");

function clickHandler(e) {
   
  var getDate = inputDateRef.value;
  if (getDate != "") {
    correctDate = getDate.split("-");
    
    date = {
      day: Number(correctDate[2]),
      month: Number(correctDate[1]),
      year: Number(correctDate[0]),
    };
    var isPalindrome = checkPalindromeForAllFormats(date);
    if (isPalindrome) {
        
      resultRef.innerText = "Yeah! Your birthday is Palindrome";
    }else{
        var [ctr, getNextDate] =getNextPalindromeDate(date);
        resultRef.innerText = `Sorry! Your birthday is not a Palindrome, Your next nearby palindrome is ${getNextDate.day}-${getNextDate.month}-${getNextDate.year}, Just ${ctr } days away`;
        
    }
  }else{
    resultRef.innerText ="Please Select Any Date"
  }
  
}

btnShowRef.addEventListener("click", clickHandler);
