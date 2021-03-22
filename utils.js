const path = require('path')
const fs = require('fs')

const convertBytes = function (bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (bytes == 0) {
        return "n/a"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i == 0) {
        return bytes + " " + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}

module.exports = getDetails = (directory, file, arr) => {
    const extname = path.extname(file);
    const filename = path.basename(file, extname);
    const absolutePath = path.resolve(directory, file);
    const { birthtime } = fs.statSync(absolutePath)
    const fileSize = convertBytes(getFilesizeInBytes(absolutePath))
    let unixFilePermissions = permissions(absolutePath)

    arr.push({
        extname,
        filename,
        absolutePath,
        birthtime,
        fileSize,
        unixFilePermissions
    });
}

const permissions = (filepath) => {
    try {
        fs.accessSync(filepath, fs.constants.R_OK | fs.constants.W_OK);
        return 'File can be read and written'
    } catch (err) {
        return 'No Read and Write access'
    }
}

const getFilesizeInBytes = (filename) => {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}
