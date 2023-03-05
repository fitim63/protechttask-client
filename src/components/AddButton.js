import {Button} from "antd";
import AddModal from "./AddModal";
import "./styles/MainPage.css"

const AddButton = ({isAdd, setIsAdd}) => {
    return (
        <div className="addButton">
            <Button
                onClick={() => {
                    setIsAdd(true);
                }}
                type="primary"
            >
                Add Product
            </Button>
            {isAdd && (
                <AddModal setIsAdd={setIsAdd} isAdd={isAdd}/>
            )}
        </div>
    )
}

export default AddButton