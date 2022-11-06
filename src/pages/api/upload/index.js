import { IncomingForm } from 'formidable'
import * as fs from 'fs'
import * as xlsx from 'xlsx/xlsx.mjs'
var mv = require('mv');


// export const config = {
//     api: {
//        bodyParser: true,
//     }
// };

export default async (req, res) => {
  // console.log(req.body)
  var newPath = `./public/data/json${Date.now()}.json`;
  fs.writeFileSync(newPath, req.body, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  })


  res.status(200).send(Date.now())

}