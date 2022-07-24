var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('/Users/battousai/repos/midwest-hackathon/hackathon/public/profile_pic.jpeg'));
data.append('pinataOptions', '{"cidVersion": 1}');
data.append('pinataMetadata', `{"name": "TZ profile pic2", "keyvalues": {"company": "Milli"}}`);

var config = {
  method: 'post',
  url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNzQ4OTY3Ni0yMDgzLTQ3YTYtYjE3MS01MzIxMjJiOTU0N2IiLCJlbWFpbCI6InRyYXZpc0BnZW42dmVudHVyZXMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJkZmUyNWYxMTYwMDM2MGYxM2I5Iiwic2NvcGVkS2V5U2VjcmV0IjoiZTg0YmM5MWQ3OWYwZTcyNzJiZjZhYzQ2Y2VhOGVlMjgxMjIwM2YxMjI1NjUyMmMxNzRjYjdiY2M4MTEyNjc2NCIsImlhdCI6MTY1ODYxMjMyM30.KQPo7v4hTqa3pNd9xKmI4337nEmVtREL3G7NQj7W6uY', 
    ...data.getHeaders()
  },
  data : data
};
axios(config).then(data => console.log(data)).catch(err => console.error(err));

// console.log(res.data);