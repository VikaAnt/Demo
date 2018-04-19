var count = 0;
function Counter() {
    this.requests = []; 
}

Counter.prototype.newRequest = function() {

    const aa = this.requests.push(new Date().getTime());
    console.log('this.requests.push(new Date().getTime())' + aa);
    return ++count;
}

/*Counter.prototype.getTime = function() {
    bb = param['time'];
    console.log('param[ time ]' + bb);
    return params['time'];
}*/

module.exports = Counter;