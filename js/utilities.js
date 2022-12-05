export const excert = function (text,limit = 100){
    if (text.length>100){
        return text.substring(0,limit) + " ....."

    }
    return text;
}