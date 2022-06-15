import {
    Button,
    Tooltip,
    Segmented,
    Table,
    Modal,
    Select,
    Input,
    Popconfirm,
    message,
    Spin,
    DatePicker
} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import moment from 'moment';

import WarehouseService from '../../service/WarehouseService';
import ProductDetailService from '../../service/ProductDetailService';

const {Option} = Select;
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
                    <Button type="danger" size='small'>
                        Delete
                    </Button>
                </Popconfirm>
            </Tooltip>,
        },
    ];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState({
        current: 1,
        pageSize: 10,
        total: 1000,
    });

    const handlePageTableChange = (pagination) => {
        console.log(pagination);
    };


    const [modalTblData, setModalTblData] = useState([]);
    const modalColumns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 50,
        },
        {
            title: 'Sản Phẩm',
            dataIndex: 'productName',
            key: 'product',
            align: 'center',
            width: 150,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (record, row, index) => (
                <>
                    <Input type='number' placeholder="tye quantity" value={modalTblData[index].quantity} onChange={
                        (e) => {
                            modalTblData[index].quantity = Number(e.target.value);
                            setModalTblData([...modalTblData]);
                            console.log('change quantity to: ', modalTblData[index].quantity);
                        }
                    }/>

                </>
            ),
            width: 150,
        },
        {
            title: 'Đơn Giá',
            dataIndex: 'price',
            key: 'price',
            render: (record, row, index) => (
                <>
                    <Input type='number' prefix="$" placeholder="type price here" value={modalTblData[index].price}
                           onChange={
                               (e) => {
                                   modalTblData[index].price = Number(e.target.value);
                                   setModalTblData([...modalTblData]);
                                   console.log('change price to: ', modalTblData[index].price);
                               }
                           }/>
                </>
            ),
            align: 'center',
            width: 150,
        },
        {
            title: 'Total Money',
            dataIndex: 'subTotal',
            key: 'subTotal',
            render: (record, row, index) => (
                <>
                    {record}$
                </>
            ),
            align: 'center',
            width: 150,
        },
        {
            title: 'Manufacture Date',
            dataIndex: 'dateOfManufacture',
            key: 'dateOfManufacture',
            align: 'center',
            render: (record, row, index) => (
                <>
                    <DatePicker defaultValue={moment(row.dateOfManufacture, 'YYYY-MM-DD')} popupStyle={{zIndex: 1500}}
                                onChange={e => {
                                    modalTblData[index].dateOfManufacture = moment(e._d).format('YYYY-MM-DD');
                                    setModalTblData([...modalTblData]);
                                    console.log('change expire date to: ', e._d);
                                }}/>
                </>
            ),
            width: 200,
        },
        {
            title: 'Expire Date',
            dataIndex: 'expireDate',
            key: 'expireDate',
            align: 'center',
            render: (record, row, index) => (
                <>
                    <DatePicker defaultValue={moment(row.expireDate, 'YYYY-MM-DD')} popupStyle={{zIndex: 1500}}
                                onChange={e => {
                                    modalTblData[index].expireDate = moment(e._d).format('YYYY-MM-DD');
                                    setModalTblData([...modalTblData]);
                                    console.log('change expire date to: ', e._d);
                                }}/>
                </>
            ),
            width: 200,
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 70,
            align: 'center',
            render: (record, row, index) => <Tooltip title="" color='cyan' key='red'>
                <Button type="danger" size='small' onClick={() => {
                    // setModalTblData(modalTblData.map(e=> e.id !== record.id))
                    setModalTblData(modalTblData.slice(0, Number(index) - 1), modalTblData.slice(Number(index)));
                    console.log('deleting: ', record.id);
                }}>
                    Delete
                </Button>
            </Tooltip>,
        },
    ];
    const [modalOptions, setModalOptions] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (id) => {
        setLoading(true);
        console.log(id)
        WarehouseService.getDetailWarehouseById(id).then(res => {
            const {data} = res;
            console.log('data detail: ', data)

            setModalTblData(data.data.map(e => ({...e, key: e.id})));
            setIsModalVisible(true);
            setLoading(false);
        })
            .catch((err) => {
                message.error(err.response.data.message);
                setLoading(false);
            });
    };

    const handleOk = () => {
        console.log('saving warehouse: ', modalTblData)
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function deleteRecord(id) {
        console.log(id)
    }

    function getAllWarehouses(page, size = 10) {
        setLoading(true);
        WarehouseService.getAllWarehouses(page, size).then(res => {
            const {data} = res;
            console.log('data: ', data);
            setData(data.data.content.map(e => ({
                ...e, key: e.id
            })));
            setLoading(false);
        })
            .catch(() => setLoading(false));
    }

    useEffect(() => {
        getAllWarehouses(0);
    }, []);

    const listItemProduct = [{
        key: "1",
        label: ' 1st menu item'
    }]

    const [dataSeach, setDataSeach] = useState([]);
    const [fetching, setFetching] = useState(false);
    const handleSelectSearch = (e) => {
        console.log('change: ', e)
        setFetching(true);
        ProductDetailService.search(e, 0, 5)
            .then(res => {
                console.log('search: ', res.data.data.content);

                setDataSeach(res.data.data.content);
                setModalOptions(res.data.data.content.map(
                    e => ({label: e.productName, value: e.productDetailId})
                ));
                setFetching(false);
            })
            .catch(err => {
                console.log(err);
                setFetching(false);
            });

    }
    const handleSelectChange = (e) => {
        const p = dataSeach.find(e1 => e1.productDetailId === e.value);
        console.log(p);
        const currentDate = moment(new Date()).format('YYYY-MM-DD');
        setModalTblData([...modalTblData, ({
            key: p.productDetailId,
            productName: p.productName,
            price: 0,
            quantity: 0,
            dateOfManufacture: currentDate,
            expireDate: currentDate,
            subTotal: 0
        })])
        setDataSeach([]);
        setModalOptions([]);
    }


    return (
        <>
            <Modal title="Thông Tin Chi tiết" zIndex='1500' width='80%' visible={isModalVisible}
                   okText="Lưu"
                   onOk={handleOk}
                   cancelText="Đã Xác Nhận"
                   onCancel={handleCancel}>
                <Select
                    showSearch

                    placeholder="Nhập tên, mã sản phẩm"
                    labelInValue
                    style={{width: 500}}
                    filterOption={false}
                    dropdownStyle={{zIndex: 1600}}
                    onSearch={handleSelectSearch}
                    onChange={handleSelectChange}
                    notFoundContent={fetching ? <Spin size="small"/> : null}
                    options={modalOptions}
                />
                <Table columns={modalColumns} dataSource={modalTblData}/>
            </Modal>
            <div className='page-header-actions'>
                <Tooltip title="prompt text" color='cyan' key='red'>
                    <Button type="primary" icon={<DownloadOutlined/>} size='small'/>
                </Tooltip>
                <Tooltip title="prompt text" color='cyan' key='red1'>
                    <Button type="primary" icon={<DownloadOutlined/>} size='small'/>
                </Tooltip>
            </div>
            <Segmented options={['Tất cả', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}/>
            <Table onRow={(record) => {
                return {
                    onDoubleClick: () => showModal(record.id), // click row
                };
            }} pagination={page} loading={loading} onChange={handlePageTableChange}
                   columns={columns} dataSource={data} scroll={{x: 1500, y: 300}}/>

        </>
    );
}