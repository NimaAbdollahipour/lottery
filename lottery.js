let normal = []
let star = []
let new_guess
while(normal.length<5){
	new_guess = Math.floor(Math.random()*51)
	if(!normal.includes(new_guess)){
		normal.push(new_guess)
	}
	normal.sort(compareNumbers)
}
while(star.length<2){
	new_guess = Math.floor(Math.random()*13)
	if(!star.includes(new_guess)){
		star.push(new_guess)
	}
	star.sort(compareNumbers)
}
function compareNumbers(a, b) {
  return a - b;
}
console.log(normal.join(', ')+'\t*: '+star.join(', '))