'use strict';

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const multipart = function multipart(options) {
    return multer({
        dest: options.dest,
        limits: options.limits,
        putSingleFilesInArray: true,
        onFileUploadStart: function (file, req, res) {
            file.hash = crypto.createHash('md5');
        },
        onFileUploadData: function (file, data, req, res) {
            file.hash.update(data);
        },
        onFileUploadComplete: function (file, req, res) {
            file.hash = file.hash.digest('hex');
            file.hashname = file.hash;
            if (!!file.extension) {
                file.hashname += '.' + file.extension;
            }
        },
        onError: function(err, next) {
            next(err);
        }
    });
};

// {
//     map: [
//         {
//             fieldname: 'map',
//             originalname: 'test.png',
//             name: '9ed5dfa7f30152e8d1a15d187e917f1d.png',
//             encoding: '7bit',
//             mimetype: 'image/png',
//             path: '/home/fishead/Workbench/JiaChongs/treasury-api/upload/temp/9ed5dfa7f30152e8d1a15d187e917f1d.png',
//             extension: 'png',
//             size: 143703,
//             truncated: false,
//             buffer: null,
//             hash: '56d2d2ac60242fde995ff36afe44cd5a',
//             hashname: '56d2d2ac60242fde995ff36afe44cd5a.png'
//         }
//     ]
// }


module.exports = multipart;
