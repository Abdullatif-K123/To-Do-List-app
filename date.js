var getDate = function(){
    var options = { weekday: 'long' , month: 'short', day: 'numeric' };
    var today  = new Date();
    return today.toLocaleDateString('ar-EG',options);  
}

// function for getting day

var getDay = function(){
    var options = { weekday: 'long'};
    var today  = new Date();
    return today.toLocaleDateString('ar-EG',options);  
}

module.exports = {
    getDate: getDate,
    getDay: getDay
};