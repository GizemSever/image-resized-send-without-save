const express = require('express');
const app = express();
var fs = require("fs");
var Jimp = require("jimp");
const { parse } = require('path');
app.get('/', function (req, res) {
  try {
    if (fs.existsSync(req.query.path)) {
      //file exists
      Jimp.read(req.query.path, function (err, img) {
        if (err) {
          res.status(404).set("Not found");
        };

        let width = req.query.width;
        let height = req.query.height;

        if (width != "auto") width = parseInt(width);
        else width = Jimp.AUTO;
        
        if (height != "auto") height = parseInt(height);
        else height = Jimp.AUTO;

        img.resize(width, height).getBuffer(Jimp.AUTO, function (e, img64) {
          if (e) {
            res.status(404).send('Not found');
          } else {
            res.writeHead(200, {
              'Content-Type': img._originalMime,
              'Content-Length': img64.length
            });
            res.end(img64);
          }
        });
      });
    }else res.status(404).set("Not found");
  } catch (err) {
    res.status(404).set("Not found");
  }

});
app.listen(3000);