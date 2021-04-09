var nodeMailer = require('nodemailer');
const mailConfig = require('../config/env');

var smtpTransport = nodeMailer.createTransport({
					  service : 'Gmail',
					  auth : 
					  {
					    user:mailConfig.mail.user,
					    pass:mailConfig.mail.pass
					  }
					});

function MailClass(){
    this.send = (req, res, next)=>{
       let { email,subject, content } = req.body;
       var mailOptions = {
						    from:mailConfig.mail.from,
						    to: email,
						    subject:subject,
						    //text:'this a a simple test from Name:'+ req.body.name+' Email:'+req.body.email+' Message:'+req.body.message,
						    html:content
						  }

		smtpTransport.sendMail(mailOptions, function (err, info){
				    if(err)
				    {
				     console.log(err);
				     next(err, null);
				    }else
				    {
				      console.log('Mail sent');
				      next(null, info);
				    }
		});
    }
}

module.exports =  new MailClass();