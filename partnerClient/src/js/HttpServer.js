import axios from 'axios';

export function getHttp(url,callback){
	axios.get('/api'+url)
			    .then(callback)
			    .catch(function(err){
			        console.log(err);
			        alert('出错');
	})
}

export function postHttp(url,form,callback){
	axios.post('/api'+url,$(form).serialize())
			    .then(callback)
			    .catch(function(err){
			        console.log(err);
			        alert('出错');
	})
}


export function postBinaryHttp(url,form,callback){
	var formData = new FormData($(form)[0]);
	axios.post('/api'+url,formData)
	      .then(callback)
	      .catch(function(err){ 
	      	  console.log(err);
	          alert('出错,请查看出错信息');
	      })
}