
import { Button, Tooltip, Segmented, Table, Modal, Select, Input, Popconfirm, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import WarehouseService from '../../service/WarehouseService';

const { Option } = Select;
export default function ImportProducts(props) {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
            width: 150,
        },
        {
            title: 'Người Nhập',
            dataIndex: 'user',
            key: '2',
            width: 150,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'description',
            key: '3',
            width: 150,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'sumMoney',
            key: '4',
            width: 150,
        },
        {
            title: 'Tổng Số Lượng',
            dataIndex: 'totalQuantity',
            key: '4a1',
            width: 150,
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdDate',
            key: '5',
            width: 150,
        },
        {
            title: 'Cập Nhật Cuối',
            dataIndex: 'updatedDate',
            key: '53',
            width: 150,
        },
        {
            title: 'Action',
            fixed: 'right',
            width: 70,
            render: (record) => <Tooltip title="" color='cyan' key='red'>
                <Popconfirm title="Bạn có chắc chắn muốn xóa?" 
                onConfirm={() => deleteRecord(record.id)}>
                    <Button   type="danger" size='small' >
                        Delete
                    </Button>
                </Popconfirm>
            </Tooltip>,
        },
    ];
    const [data, setData] = useState([
    ]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState({
        current: 1,
        pageSize: 10,
        total: 1000,
    });

    const handlePageTableChange = (pagination) => {
        console.log(pagination);
    };


    const [modalTblData, setModalTblData] = useState([{

        id: '1',
        product: 'Sản Phẩm 1',
        quantity: 11,
        price: '100.000$',
    },
    {
        id: '2',
        product: 'Sản Phẩm 2',
        quantity: 10,
        price: '100.000$',
    },
    ]);
    const modalcolumns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 150,
        },
        {
            title: 'Sản Phẩm',
            dataIndex: 'productName',
            key: 'product',
            width: 150,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (record, row, index) => (
                <>
                    <Input type='number' value={modalTblData[index].quantity} onChange={
                        (e) => {
                            modalTblData[index].quantity = e.target.value;
                            setModalTblData([...modalTblData]);
                            console.log('change to: ', e.target.value);
                        }
                    } />

                </>
            ),
            width: 150,
        },
        {
            title: 'Đơn Giá',
            dataIndex: 'price',
            key: 'price',
            width: 150,
        },{
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 70,
            render: (record) => <Tooltip title="" color='cyan' key='red'>
                <Popconfirm title="Bạn có chắc chắn muốn xóa?" 
                 >
                    <Button  type="danger" size='small' >
                        Delete
                    </Button>
                </Popconfirm>
            </Tooltip>,
        },
    ];
    const [modalOptions, setModalOptions] = useState([
        {
            id: 1,
            product: 'Sản Phẩm 1',
        },
        {
            id: 2,
            product: 'Sản Phẩm 2',
        },
        {
            id: 3,
            product: 'Sản Phẩm 3',
        },
    ]);
    const handleSelectChange = (e) => {
        console.log(e);
        setModalOptions([]);
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (id) => {
        setLoading(true);
        console.log(id)
        WarehouseService.getDetailWarehouseById(id).then(res => {
            const {data} = res;
            console.log('data detail: ',  data)

            setIsModalVisible(true);
            setLoading(false);
        })
        .catch((err) => {message.error(err.response.data.message); setLoading(false);});
    };

    const handleOk = () => {
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    function deleteRecord(id){
        console.log(id)
    }

    function getAllWarehouses(page, size=10){
        setLoading(true);
        WarehouseService.getAllWarehouses(page, size).then(res => {
            const {data} = res;
            console.log('data: ', data);
            setData(data.data.content);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    useEffect(() => {
        getAllWarehouses(0);
    }, []);


    return (
        <>
            <Modal title="Thông Tin Chi tiết" zIndex='1500' width='80%' visible={isModalVisible}
                okText="Lưu"
                onOk={handleOk}
                cancelText="Đã Xác Nhận"
                onCancel={handleCancel}>
                <Select
                    showSearch
                    style={{ width: 500 }}
                    placeholder="Nhập tên, mã sản phẩm"
                    dropdownStyle={{ zIndex: 1600 }} onChange={handleSelectChange}  >
                    {
                        modalOptions.length !== 0 && modalOptions.map(item => (
                            <Option key={item.id} value={item.id} style={{ display: 'flex' }}>
                                <p style={{ width: '30%', display: 'inline-block', padding: '0' }}>Mã: {item.id}</p>
                                <p style={{ width: '50%', display: 'inline-block', padding: '0' }}>Tên: {item.product}</p>
                            </Option>
                        ))
                    }
                </Select>
                <Table columns={modalcolumns} dataSource={modalTblData} />
            </Modal>
            <div className='page-header-actions'>
                <Tooltip title="prompt text" color='cyan' key='red'>
                    <Button type="primary" icon={<DownloadOutlined />} size='small' />
                </Tooltip>
                <Tooltip title="prompt text" color='cyan' key='red1'>
                    <Button type="primary" icon={<DownloadOutlined />} size='small' />
                </Tooltip>
            </div>
            <Segmented options={['Tất cả', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
            <Table onRow={(record) => {
                return {
                    onDoubleClick: () => showModal(record.id), // click row
                };
            }} pagination={page} loading={loading} onChange={handlePageTableChange}
                columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />

        </>
    );
}