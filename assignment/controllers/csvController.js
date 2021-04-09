const fs = require('fs');
const csv = require("fast-csv");
var Mailer = require('../middlewares/mailer');
var UploadImageFromUrl = require('../middlewares/uploadImageFromUrl');
var UserModel = require('../models/userModel');

const upload = async (req, res)=>{
	try{
        if(req.file == undefined){
         return res.status(400).send("Please upload a CSV file!");
        }

        req.body.subject = 'CSV File Uploaded';
        req.body.content = '<p>Images are being uploaded, you\'ll get an email when it\'s done</p>';

        Mailer.send(req,res,(err,result)=>{
        	let path = __dirname +'/../public/csvfile/'+req.file.filename;
   
	        fs.createReadStream(path)
	          .pipe(csv.parse({header:true}))
	          .on("error",(err)=>{
	            throw err.message;
	          })
	          .on("data", (row)=>{
	          	if(row[0] != 'ID'){
	                let filename = 'image-'+Date.now()+'.jpg';
		            let uploaded = UploadImageFromUrl.download(row[1], filename)
                     //Save the email in images model
				    let user =  new UserModel;
				        user.email = req.body.email;
				        user.filename = filename;
				        user.save();
	          	} 
	          })
	          .on("end",()=>{
	          	 req.body.subject = 'All Images Uploaded';
                 req.body.content = '<p> All the images have finished processing, The task is finished</p>';

		          Mailer.send(req,res,(err,result)=>{
	                    UserModel.find({})
				            .exec(function(error, images) {
				                console.log(JSON.stringify(images, null, "\t"))
				                res.redirect('users/success');
				            })  
		          });
				
	          })
           
		})    
	}catch(error){
       res.redirect('users/error');
	}
};

module.exports = {
	upload
};