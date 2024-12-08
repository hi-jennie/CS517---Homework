function buildStudents(data) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	console.log(data)
	const studentsArr = data;
	document.getElementById("num-results").innerText = studentsArr.length;

	const studentsContainer = document.getElementById("students");

	for(const curStudent of studentsArr){
		// console.log(student.major);
		const studentContainer = document.createElement("div");
		// col-4 意味着这个元素占用 12 列中的 4 列，即 一行最多可以容纳 3 个元素（12 ÷ 4 = 3）。
		// p-3 : padding 
		studentContainer.classList.add("col-4", "mb-4", "p-3", "border", "rounded", "bg-light"); 

		const nameElem = document.createElement("h3");
		const majorElem = document.createElement("strong");
		const descElem = document.createElement("p");
		const interestsDescElem = document.createElement("p")
		const interestsElem = document.createElement("ul");

		nameElem.innerText = curStudent.name.first + " "+ curStudent.name.last;
		majorElem.innerText = curStudent.major;
		descElem.innerText = `${curStudent.name.first} is taking ${curStudent.numCredits} credits and is ${curStudent.fromWisconsin ? "from Wisconsin" : "NOT from Wisconsin"}`
		
		const interestNum = curStudent.interests.length;
		interestsDescElem.innerText = `They have ${interestNum} ${interestNum > 1 ? "interests" : "interest"} including...`

		curStudent.interests.forEach(interest => {
			const interestElem = document.createElement("li");
			interestElem.innerText = interest;
			interestsElem.appendChild(interestElem);
		})

		studentContainer.appendChild(nameElem);
		studentContainer.appendChild(majorElem);
		studentContainer.appendChild(descElem);
		studentContainer.appendChild(interestsDescElem);
		studentContainer.appendChild(interestsElem);

		studentsContainer.appendChild(studentContainer);
	}
	
}

function handleSearch(e) {
	e?.preventDefault(); 
	const nameValue = document.getElementById("search-name").value.trim();
	const majorValue = document.getElementById("search-major").value.trim();
	const interestValue = document.getElementById("search-interest").value.trim();

	fetch("https://cs571.org/rest/f24/hw2/students", {
		headers: {
			"X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
		}
	}).then(res => {
		console.log(res.status);
		return res.json();
	}).then(data => {
		const originStudentsArr = data;
		
		const filteredData = originStudentsArr.filter(student => {
			const nameMatch = nameValue ? `${student.name.first} ${student.name.last}`.toLowerCase().includes(nameValue.toLowerCase()) : true;

			const majorMatch = majorValue ? student.major.toLowerCase().includes(majorValue.toLowerCase()) : true;

			const interestMatch = interestValue ? student.interests.some(interest => interest.toLowerCase() === interestValue.toLowerCase()) : true;

			if( nameMatch && majorMatch && interestMatch){
				return true
			}
		})
		document.getElementById("students").innerHTML = "";

		buildStudents(filteredData);

	})
}

document.getElementById("search-btn").addEventListener("click", handleSearch);

function fetchData(){
	
}

fetch("https://cs571.org/rest/f24/hw2/students", {
	headers: {
		"X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
	}
}).then(res => {
	console.log(res.status);
	return res.json();
}).then(data => {
	buildStudents(data);
})

