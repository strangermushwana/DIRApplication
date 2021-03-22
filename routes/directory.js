const express = require('express')
const path = require('path');
const fs = require('fs');
const router = express.Router();

const helpers = require('../utils.js');
const { dir } = require('console');

router.get('/*', (req, res) => {
    try {
        let n_dir = [];
        let dirs = [];
        const directory = req.params[0]
        if (fs.existsSync(directory)) {
            fs.readdir(directory, (err, files) => {
                if (err) {
                    res.send({
                        msg: "There was an error perfoming this operation"
                    })
                }
                files.forEach(file => {
                    if (fs.lstatSync(path.resolve(directory, file)).isDirectory()) {
                        dirs.push(file);
                    } else {
                        helpers(directory, file, n_dir)
                    }
                });
                res.send(
                    {
                        n_dir,
                        dirs,
                        directory,
                        content: true,
                        n_dir_size: n_dir.length,
                        dir_size: dirs.length,
                        size: n_dir.length + dirs.length,
                        failed: false
                    })
            });
        } else {
            res.send({
                error: 'Directory does not exist',
                directory,
                failed: true
            })
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router