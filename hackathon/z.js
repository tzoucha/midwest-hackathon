var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('files', fs.createReadStream('/Users/battousai/Downloads/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpeg'));
data.append('name', 'Test File2');
data.append('metadata', '{"type": "Default"}');
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