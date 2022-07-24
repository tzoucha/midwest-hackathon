var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('files', fs.createReadStream('/Users/battousai/Downloads/Pocket Change-1.png'));
data.append('name', 'Test File2');
data.append('metadata', '{"keyvalues": { "example": "value" }}');
data.append('wrapWithDirectory', 'false');
data.append('pinToIPFS', 'false');
console.log("HERE", data.getHeaders())
var config = {
  method: 'post',
  url: 'https://managed.mypinata.cloud/api/v1/content',
  headers: { 
    'x-api-key': 'j0o7Iq0m4KWbK2b5co1igo3iOfNC4ZSS', 
    ...data.getHeaders()
  },
  data : data
};

axios(config).then(data => console.log(data)).catch(k => console.log(k));