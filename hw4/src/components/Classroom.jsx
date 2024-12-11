import { Button, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
const Classroom = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "searchName") {
      setName(e.target.value);
    }
    if (e.target.id === "searchMajor") {
      setMajor(e.target.value);
    }
    if (e.target.id === "searchInterest") {
      setInterest(e.target.value);
    }
    console.log(e.target.value);
  };
  // console.log(name);

  useEffect(() => {
    fetch("https://cs571.org/rest/f24/hw4/students", {
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  console.log(students);
  let filteredData = students.filter((student) => {
    const nameMatch = name
      ? `${student.name.first} ${student.name.last}`
          .toLowerCase()
          .includes(name.toLowerCase())
      : true;
    const interestMatch = interest
      ? student.interest.some((i) => i.toLowerCase() === interest.toLowerCase())
      : true;
    const majorMatch = major
      ? student.major.toLowerCase().includes(major.toLowerCase())
      : true;
    // const majorMatch = major ? major.toLowerCase() === student.major.toLowerCase() : true;

    return nameMatch && majorMatch && interestMatch;
  });

  console.log(filteredData);

  return (
    <div>
      <h1>Badger Book</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control
          id="searchName"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={major}
          onChange={(e) => handleChange(e)}
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={interest}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <Button variant="neutral">Reset Search</Button>
      </Form>
      <Container fluid>
        <Row>{/* TODO Students go here! */}</Row>
      </Container>
    </div>
  );
};

export default Classroom;
