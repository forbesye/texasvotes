const percentageString = (key, obj) => {
    let sum = 0.0;
    let keyVal = obj[key];
    for (const val in obj) {
        sum += parseInt(obj[val]);
    }
    keyVal = (keyVal / sum) * 100;
    
    return `(${keyVal.toFixed(2)}%)`;
}

/*
 * Returns a string, only use for final output!
*/
const numberStringWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const monthDayYearParse = (d) => {
    const date = new Date(d);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const changeFilter = (setFunc) => {
    const output = (value) => {
        setFunc(value)
    }
    return output
}

export {
    percentageString,
    numberStringWithCommas,
    monthDayYearParse,
    changeFilter
}