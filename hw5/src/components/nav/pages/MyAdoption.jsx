import { useEffect } from 'react';
import {useState} from 'react'
import {Container, Col, Row} from "react-bootstrap"
export default function MyAdoption(props) {
    const [myCats, setMyCats] = useState([]);

    useEffect(()=>{
        const localMyCats = JSON.parse(sessionStorage.getItem("myCats")) || [];
        setMyCats(localMyCats);
    },[])
    

    

    return <div>
        <h2>My Lovely Cats</h2>
        <Container>
            <Row>
                {myCats.map((cat) => {
                    return <Col key={cat.id}>
                        <img 
                            src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${cat.imgIds[0]}`} 
                            style={{
                                width: "100%", // 图片宽度占满容器
                                height: "300px", // 图片高度占满容器
                                objectFit: "cover", // 保持图片比例填充
                            }}
                            alt={`A picture of ${cat.name}`}
                        />
                        <h2  style={{padding: "15px"}}>{cat.name}</h2>
                    </Col>
                })}
            </Row>
        </Container>
    </div>
}