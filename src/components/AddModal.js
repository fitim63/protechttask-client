import {Form, Input, Modal} from "antd";
import {useState} from "react";
import axios from "axios";
import "./styles/Login.css"

const AddModal = ({setIsAdd, isAdd}) => {
    const [addData, setAddData] = useState({
        name: "",
        price: "",
    })
    const [error, setError] = useState(false)
    const handleAdd = async () => {
        if (addData.name === "") {
            setError(true)
            return
        }
        await axios.post("http://localhost:8080/createProduct", addData);
        setIsAdd(false)
    }

    const handleChange = (e, input) => {
        setAddData((prev) =>
            ({...prev, [input]: e.target.value}));
    };

    return (
        <Modal title="Add Product"
               open={isAdd}
               onOk={handleAdd}
               onCancel={() => setIsAdd(false)}
               okButtonProps={{type: "primary"}}
        >
            <>
                <Form onFinish={handleAdd}>
                    <Form.Item label="Name">
                        <Input
                            onChange={(e) => handleChange(e, "name")}
                            value={addData.name}
                        />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input
                            value={addData.price}
                            onChange={(e) => handleChange(e, "price")}
                        />
                    </Form.Item>
                </Form>
                {error && (
                    <p className="errorForm">Please give the product a name!</p>
                )}
            </>
        </Modal>
    )
}

export default AddModal