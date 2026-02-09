import fs from "fs";

function createfile(){
    try {
        if (fs.existsSync("log.txt")){
            let data=fs.readFileSync("log.txt","utf-8");
            let wordcount=data.trim().split(" ").length;

            fs.writeFileSync("wordcount.txt",`Total world count is :- ${wordcount}`);
        }
        else{
            fs.writeFileSync("wordcount.txt",`DATE=${new Date()}`);
        }
        
    } catch (error) {
        console.log(error);
    }
}
export default createfile;