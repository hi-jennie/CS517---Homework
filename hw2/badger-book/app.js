function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.

	
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
}

document.getElementById("search-btn").addEventListener("click", handleSearch);


fetch("https://cs571.org/rest/f24/hw2/students", {
	headers: {
		"X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
	}
}).then(res => {
	console.log(res.status);
	return res.json();
}).then(data => {
	console.log(data)
	const studentsArr = data;
	document.getElementById("num-results").innerText = studentsArr.length;

	const studentsContainer = document.getElementById("students");

	for(const curStudent of studentsArr){
		// console.log(student.major);
		const studentContainer = document.createElement("div");

		const nameElem = document.createElement("h3");
		const majorElem = document.createElement("strong");
		const descElem = document.createElement("p");
		const interestsDescElem = document.createElement("p")
		const interestsElem = document.createElement("ul");

		nameElem.innerText = curStudent.name.first + " "+ curStudent.name.last;
		majorElem.innerText = curStudent.major;
		descElem.innerText = `${curStudent.name.first} is taking ${curStudent.numCredits} credits and is ${curStudent.fromWisconsin ? "from Wisconsin" : "NOT from Wisconsin"}`
		
		interestsDescElem.innerHTML = `They have ${curStudent.interests.length} interests including...`

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
})

