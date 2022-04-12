
sort = (arr) => {
    var array = [];
    arr.forEach(x => array.push(x))
    for(let i = 0; i < array.length - 1; i++){
        let temp = array[i];
        let pos = i;
        for(let j = i+1; j < array.length; j++){
            if(temp > array[j]){
                temp = array[j];
                pos = j;
            }
        }
        array[pos] = array[i];
        array[i] = temp;   
    }
    return array;
}

 



module.exports = {sort};
