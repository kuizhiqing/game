real = "0123456789";
answer = "012345678";
function getTip(real,answer){
	var per = 0;
	var con = 0;
	var len = real.length;
	if(answer.length!=len) return [-1,-1]; 
	for(i=0;i<len;i++){
		for(j=0;j<len;j++){
			if(real[i]==answer[j]){
				if(i==j) per++;
				if(i!=j) con++;
				break;
			}
		}
	}
	return [per,con];
}