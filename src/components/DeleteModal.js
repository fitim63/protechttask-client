import {Button, Form, Input, Modal} from "antd";
import axios from "axios";

const DeleteModal = ({clickedProduct, isDelete, setIsDelete}) => {

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/products/deleteProduct/${id}`);
        setIsDelete(false)
    }

    return (
        <Modal title="Delete Product"
               open={isDelete}
               onOk={() => handleDelete(clickedProduct.id)}
               onCancel={() => setIsDelete(false)}
               okButtonProps={{danger: true}}
        >
            <p>Are you sure you want to delete "{clickedProduct.name}"?</p>
        </Modal>
    )
}

export default DeleteModal