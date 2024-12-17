/* eslint-disable react/prop-types */
import {Card, Button} from "react-bootstrap"
export default function BasketItem(props) {

    const handleUnselect = (id) => {
        const localSavedIds = JSON.parse(sessionStorage.getItem("savedCatIds"));
        const updatedCatIds = localSavedIds.filter(i => i !== id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedCatIds));
        props.setSavedCatIds(updatedCatIds);
        alert(`${props.name} has been removed from your basket!`)

        const localAdoptableBuds = JSON.parse(sessionStorage.getItem("adoptableBuds"));
        const unselectCatObj = props.buds.filter(bud => bud.id === id)[0];
        const updatedAdoptableBuds = [...localAdoptableBuds, unselectCatObj];
        sessionStorage.setItem("adoptableBuds", JSON.stringify(updatedAdoptableBuds));
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
    <h2  style={{padding: "15px"}}>{props.name}</h2>
    <div style={{display: "flex",padding:"15px", width:" 100%", gap: "10px", backgroundColor: "#f5f5f5"}}>
        <Button variant="secondary" onClick={() => handleUnselect(props.id) }>unselect</Button>
        <Button variant="success"> ❤️ adopt</Button>
    </div>

</Card>
}