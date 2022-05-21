import { Tabs, Button, Tooltip, Segmented, Table, Modal, Select, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './css/inventory.css';
import { useState } from 'react';


const { Option } = Select;
const { TabPane } = Tabs;
function changeTab(key) {
    console.log(key);
}
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
        dataIndex: 'note',
        key: '3',
        width: 150,
    },
    {
        title: 'Tổng Tiền',
        dataIndex: 'totalMoney',
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
        title: 'Còn Trong Kho',
        dataIndex: 'totalRemain',
        key: '42',
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
        title: 'Trạng Thái',
        key: 'status',
        fixed: 'right',
        width: 70,
        render: (data) => <Tooltip title="" color='cyan' key='red'>
            <Button type="danger" size='small' >
                {data.status}
            </Button>
        </Tooltip>,
    },
];

const handlePageTableChange = (pagination) => {
    console.log(pagination);
};


export default function Inventory() {
    const [data, setData] = useState([
        {
            id: '1',
            user: 'Nguyễn Văn A',
            note: 'Nhập từ kho',
            totalMoney: '100.000$',
            createdDate: '2020-01-01',
            status: 'Hủy',
        },
        {
            id: '2',
            user: 'Nguyễn Văn B',
            note: 'Nhập từ kho',
            totalMoney: '100.000$',
            createdDate: '2020-01-01',
            status: 'Hủy',
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState({
        current: 1,
        pageSize: 10,
        total: 1000,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (record) => {
        setIsModalVisible(true);
        console.log('show modal')
        console.log('record', record);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const modalolumns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: '1',
            width: 150,
        },
        {
            title: 'Sản Phẩm',
            dataIndex: 'product',
            key: 'product',
            width: 150,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 150,
        },
        {
            title: 'Đơn Giá',
            dataIndex: 'price',
            key: 'price',
            width: 150,
        },
    ];
    const handleChange = selectedItems => {
    };
    const handleSelect = (e)=>{
        console.log(e);
    }
    
    return (
        <>

            <div id='inventory-management'>
                <Modal title="Thông Tin Chi tiết" zIndex='1500' width='80%' visible={isModalVisible} 
                okText="Lưu"
                onOk={handleOk}
                cancelText="Đã Xác Nhận"
                onCancel={handleCancel}>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Nhập tên, mã sản phẩm"
                        dropdownStyle={{ zIndex: 1600 }} onChange={handleSelect}  >
                        <Option value="1">Not Identified</Option>
                        <Option value="2">Closed</Option>
                        <Option value="3">Communicated</Option>
                        <Option value="4">Identified</Option>
                        <Option value="5">Resolved</Option>
                        <Option value="6">Cancelled</Option>
                    </Select>
                    <Table columns={modalolumns} />
                </Modal>
                <Tabs defaultActiveKey="import" onChange={changeTab}>
                    <TabPane tab="Nhập kho" key="import" >
                        <div className='page-header-actions'>
                            <Tooltip title="prompt text" color='cyan' key='red'>
                                <Button type="primary" icon={<DownloadOutlined />} size='small' />
                            </Tooltip>
                            <Tooltip title="prompt text" color='cyan' key='red'>
                                <Button type="primary" icon={<DownloadOutlined />} size='small' />
                            </Tooltip>
                            <Tooltip title="prompt text" color='cyan' key='red'>
                                <Button type="primary" icon={<DownloadOutlined />} size='small' />
                            </Tooltip>
                            <Tooltip title="prompt text" color='cyan' key='red'>
                                <Button type="primary" icon={<DownloadOutlined />} size='small' />
                            </Tooltip>
                        </div>
                        <Segmented options={['Tất cả', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
                        <Table onRow={(record, rowIndex) => {
                            return {
                                onClick: event => showModal(record), // click row
                            };
                        }} pagination={page} loading={loading} onChange={handlePageTableChange}
                            columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />


                    </TabPane>
                    <TabPane tab="Xuất kho" key="export">
                        b
                    </TabPane>

                </Tabs>
            </div>

        </>
    );
}

