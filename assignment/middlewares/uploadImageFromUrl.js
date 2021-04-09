const fetch = require('node-fetch');
const fs = require('fs').promises;

function UploadImageFromUrl(){
   this.download = async (url, filename) => {
	  var localPath =  __dirname +'/../public/images/'+filename;
	  const response = await fetch(url);
	  const buffer = await response.buffer();
	  await fs.writeFile(localPath, buffer); 
	}
}

module.exports = new UploadImageFromUrl();