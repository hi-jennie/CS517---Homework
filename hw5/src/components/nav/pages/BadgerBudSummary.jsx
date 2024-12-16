/* eslint-disable react/prop-types */
import {Button, Card} from "react-bootstrap"
export default function BadgerBudSummary(props) {
    return <Card >
        <img 
            src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${props.imgIds[0]}`} 
            style={{
                width: "100%", // 图片宽度占满容器
                height: "300px", // 图片高度占满容器
                objectFit: "cover", // 保持图片比例填充
              }}
            alt={`A picture of ${props.name}`}
        />
        <p>{props.name}</p>
        <Button>show more</Button>
        <Button variant="success">save</Button>
    </Card>
}