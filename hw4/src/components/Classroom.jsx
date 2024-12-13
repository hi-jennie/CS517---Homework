import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import Student from './Student.jsx'
const Classroom = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");
  const [page, setPage] = useState(0);

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

  useEffect(() => {
    // 每当筛选条件（name、major、interest）变化时，将页面重置为第一页
    setPage(1);
  }, [name, major, interest]);

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
  const handleResearch = () => {
    setName("");
    setMajor("");
    setInterest("");
  }

  const pageNum = filteredData.length % 24 === 0 ? filteredData.length / 24 : Math.ceil(filteredData.length / 24);

  const pagItemsElem = ((pageNum) => {
    const paginationList = [];
    for(let i = 1; i <= pageNum; i++){
      paginationList.push(<Pagination.Item active={page === i} onClick={() => setPage(i)}>{i}</Pagination.Item>)
    }

    return paginationList;
  })(pageNum);
  console.log(page);

  const addAndMinusPage = (p) => {
    if(p < 1){
      setPage(1)
    }
    if(p > pageNum){
      setPage(pageNum)
    }else{
      setPage(p);
    }
  }

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
        <Button variant="neutral" onClick={handleResearch}>Reset Search</Button>
      </Form>
      <p>There are {filteredData.length} student(s) matching your search</p>
      <Container fluid>
        <Row>
          {filteredData.slice((page-1) * 24, page * 24).map(student => {
            return  <Col key={student.id} sm={12} md={6} lg={4} xl={3}>
              <Student {...student}/>
            </Col>
          })}
        </Row>
        <Pagination>
          <Pagination.Item disabled={page === 1} onClick={() => addAndMinusPage(page -1)}>Previous</Pagination.Item>
          {pagItemsElem}
          <Pagination.Item disabled={page === pageNum} onClick={() => addAndMinusPage(page + 1)}>Next</Pagination.Item>
      </Pagination>
      </Container>
      
    </div>
  );
};

export default Classroom;
