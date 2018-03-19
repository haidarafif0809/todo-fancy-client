const hostname = document.location.hostname;

if (hostname == 'localhost' || hostname == '127.0.0.1') {
  var request = axios.create({
    baseURL: 'http://localhost:3000',
  });
} else {

  var request = axios.create({
    baseURL: 'http://todo-api.geekosta.com',
  });

}
