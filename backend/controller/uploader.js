/**
 * file uploader coltroller
 */

require('rootpath')();
//const User = require("backend/models/user");
const path = require("path");
const fs = require("fs");
const msg = require('assets/i18n/en');

module.exports.fileUploader = function(req, res){
    
    const file = req.file;
    const uploadedPath = path.join(__dirname, req.file.path) ;
    let type = "video";
    if (file.mimetype.indexOf("video")<0) type="financialdoc";
    let movedPath = "/public/" + type + "/" + file.filename; 
    let rootPath = __dirname;
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        link:""
    };
    copy(rootPath + "/../../"+file.path,rootPath + "/../.."+  movedPath, function(err){
        if (err){
            console.log(err);
            resJSON.desc = msg.FILE_WRITE_ERROR;
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.link = process.env.HOST + movedPath;
        }
        res.send(resJSON);
    });
}

function copy(oldPath, newPath, callback) {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    readStream.on('error', callback);
    writeStream.on('error', callback);

    readStream.on('close', function () {
        fs.unlink(oldPath, callback);
    });

    readStream.pipe(writeStream);
}