import {Form, Input, Modal} from "antd";
import axios from "axios";
import {useState} from "react";

const EditModal = ({isEdit, clickedProduct, setIsEdit}) => {
    const [editData, setEditData] = useState({
        name: clickedProduct.name,
        price: clickedProduct.price,
    })
    const handleEdit = async (id) => {
        await axios.put(`http://localhost:8080/products/editProduct/${id}`, editData);
        setIsEdit(false)
    }

    const handleChange = (e, input) => {
        setEditData((prev) =>
            ({...prev, [input]: e.target.value}));
    };
    return (
        <Modal title="Edit Product"
               open={isEdit}
               onOk={() => handleEdit(clickedProduct.id)}
               onCancel={() => setIsEdit(false)}
        >
            <Form onFinish={handleEdit}>
                <Form.Item label="Name">
                    <Input
                        onChange={(e) => handleChange(e, "name")}
                        value={editData.name}
                    />
                </Form.Item>
                <Form.Item label="Price">
                    <Input
                        value={editData.price}
                        onChange={(e) => handleChange(e, "price")}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditModal