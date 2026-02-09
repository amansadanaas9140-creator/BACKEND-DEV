const fs = require("fs")

function capitilizeString(){
    try {
        if (fs.existsSync("log.txt")){
            let data = fs.readFileSync("log.txt","utf-8");
            console.log(data.toUpperCase());
        }
    } catch (error) {
        console.log(error);
    }
}
function reversingstring(){
    try {
        if (fs.existsSync("log.txt")){
            let data = fs.readFileSync("log.txt","utf-8");
            return data.split(" ").reverse().join(" ").toUpperCase(); 
        }
    } catch (error) {
        console.log(error);
        
    }
}
function countingVowels(){
    try {
         if (fs.existsSync("log.txt")){
            let data = fs.readFileSync("log.txt","utf-8").toUpperCase();
            let countvowels=0;
            for (let index = 0; index < data.length; index++) {
                if (data[index] === "A" || data[index] === "E" ||data[index] === "I" ||data[index] === "O" ||data[index] === "U"){
                    countvowels += 1;
                }
            
                
            }
            return countvowels;
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={
    capitilizeString,
    reversingstring,
    countingVowels
}