import {Button, Table} from "antd";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import AddButton from "./AddButton";
import "./styles/MainPage.css"
import Header from "./Header";

const Main = () => {
    const [dataSource, setDataSource] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [clickedProduct, setClickedProduct] = useState(null);

    const fetchProducts = useCallback(async () => {
        const {data} = await axios.get(
            "http://localhost:8080/products",
        )
        setDataSource(data);
    }, [isEdit, isDelete, isAdd]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    const columns = [
        {
            title: 'Product name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return (
                    <div>{record.name}</div>
                )
            }
        },
        {
            title: 'Product price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <div>{record.price}</div>
            )
        },
        {
            title: 'Edit',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <Button onClick={() => {
                    setIsEdit(true);
                    setClickedProduct(record)
                }}>Edit</Button>
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <Button onClick={() => {
                    setClickedProduct(record);
                    setIsDelete(true)
                }}>Delete</Button>
            ),
        },
    ];
    return (
        <>
            <Header/>
            <div className="mainPageWrapper">
                <Table
                    dataSource={dataSource}
                    columns={columns}
                />
                {isEdit && (
                    <EditModal isEdit={isEdit}
                               setIsEdit={setIsEdit}
                               clickedProduct={clickedProduct}
                    />
                )}
                {isDelete && (
                    <DeleteModal
                        clickedProduct={clickedProduct}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                    />
                )}
                <AddButton isAdd={isAdd} setIsAdd={setIsAdd}/>
            </div>
        </>
    )
}

export default Main
