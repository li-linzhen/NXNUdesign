
var fs = require('fs'); // 引入fs模块
function deleteArr(path) {
  var files = [];
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = path + "/" + file;
      if(!fs.statSync(curPath).isDirectory()){
        if(curPath.indexOf('js')>-1 && curPath.length>25){
          fs.unlinkSync(curPath);// delete file
        }
        // var bund =/^\S*(main|xilai)\S*(.js)$/g;
        // if(bund.test(curPath)){
        //   fs.unlinkSync(curPath);// delete file
        // }
      }
      // if(fs.statSync(curPath).isDirectory()) { // 是不是文件夹，递归继续循环遍历
      //   deleteArr(curPath);
      // } else { // delete file
      //   fs.unlinkSync(curPath);
      // }
    });
    // fs.rmdirSync(path);//删除文件夹  地址
  }
}
deleteArr('build');