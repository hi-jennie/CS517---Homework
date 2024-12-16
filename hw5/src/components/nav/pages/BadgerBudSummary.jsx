/* eslint-disable react/prop-types */
import {Button, Card} from "react-bootstrap"
import {useState} from "react"
export default function BadgerBudSummary(props) {
    const [showMore, setShowMore] = useState(false);
    const handleShowMore = (e) =>{
        setShowMore(!showMore);
        if(e.target.innerText === "Show More"){
            e.target.innerText = "Show Less";
        }else{
            e.target.innerText = "Show More";
        }  
    }

    return <Card className="d-flex flex-column">
        <img 
            src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${props.imgIds[0]}`} 
            style={{
                width: "100%", // 图片宽度占满容器
                height: "300px", // 图片高度占满容器
                objectFit: "cover", // 保持图片比例填充
              }}
            alt={`A picture of ${props.name}`}
        />

        <h2 style={{padding:"15px"}}>{props.name}</h2>
        { showMore ? <div style={{padding:"15px", color: "#495057"}}>
            <p>{props.gender}</p>
            <p>{props.breed}</p>
            <p>{props.age}</p>
            {props.description && <p>{props.description}</p>}
        </div> : ""}

        <div style={{display: "flex",padding:"15px", width:" 100%", gap: "10px", backgroundColor: "#f5f5f5"}}>
            <Button onClick={(e) => handleShowMore(e)}>Show More</Button>
            <Button variant="secondary">💗Save</Button>
        </div>

    </Card>
}