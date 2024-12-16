/* eslint-disable react/prop-types */
import {Button, Card} from "react-bootstrap"
export default function BadgerBudSummary(props) {
    return <Card className="d-flex flex-column align-items-center ">
        <img 
            src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${props.imgIds[0]}`} 
            style={{
                width: "100%", // 图片宽度占满容器
                height: "300px", // 图片高度占满容器
                objectFit: "cover", // 保持图片比例填充
              }}
            alt={`A picture of ${props.name}`}
        />
        <h2>{props.name}</h2>
        <div style={{display: "flex", justifyContent:"center",padding:"10px", width:" 100%", gap: "10px", backgroundColor: "#f5f5f5"}}>
            <Button>show more</Button>
            <Button variant="secondary">💗save</Button>
        </div>

    </Card>
}