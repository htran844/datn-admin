import {
    Button,
    Tooltip,
    Space, Table,
    Modal,
    Form,
    Input,
    message,
    Popconfirm
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ProductService from '../../service/ProductService';


const columns = [
    {
        title: 'CODE',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
    },
    {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
        align: 'center',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
    },
];


export default function Product() {
    const [data, setData] = useState([]);

    const [tblLoading, setTblLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 100,
        showSizeChanger: false
    });
    const handlePageTableChange = (pagnation, filters, sorts) => {
        setTblLoading(true);
        console.log('tbl changing: ', pagnation, filters, sorts);
        ProductService.filterProducts(pagnation.current - 1, pagnation.pageSize, filters)
            .then(res => {
                console.log('data: ', res.data);
                setData(res.data.data.content.map(e => ({ ...e, key: e.id })));
                setPagination({
                    current: Number(res.data.data.number) + 1,
                    total: res.data.data.totalElements
                });
                setTblLoading(false);

            }).catch(err => { message.error(err.response.data.message); setTblLoading(false); });
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [typeForm, setTypeForm] = useState('add');
    const [saveFormLoading, setSaveFormLoading] = useState(false);
    const [form] = Form.useForm();
    const [productEntity, setProductEntity] = useState(null);

    const handleModalSave = () => {
        setSaveFormLoading(true);
        form
            .validateFields()
            .then(values => {
                console.log('Received values of form: ', values);
                if (typeForm === 'add') {
                    ProductService.addProduct(values)
                        .then(res => {
                            console.log('adding new: ', res);
                            setData([{ ...res.data.data, key: res.data.data.id }, ...data]);
                            message.success(res.data.message);
                            handleModalCancel();
                        }).catch(err => message.error(err.response.data.message))
                }
                else {
                    ProductService.updateProduct(productEntity.id, values)
                        .then(res => {
                            console.log('updating : ', res);
                            setData(data.map(e => {
                                if (e.id === productEntity.id) {
                                    return { key: e.key, ...res.data.data };
                                }
                                return e;
                            }));
                            message.success(res.data.message);
                            handleModalCancel();
                        }).catch(err => message.error(err.response.data.message))
                }
            })
            .catch(err => {
                message.error(err.response.data.message);
            });
    }

    const handleModalCancel = () => {
        setSaveFormLoading(false);
        setIsModalVisible(false);
        setTypeForm('add');
        form.resetFields();
        setProductEntity(null);
    }

    const showModal = (record) => {
        setIsModalVisible(true);
        setProductEntity(record);
        if (record.id === undefined)
            setTypeForm('add');
        else setTypeForm('edit');
        form.setFieldsValue({
            id: record.id,
            productName: record.productName,
            description: record.description,
        });
    }

    useEffect(() => {
        handlePageTableChange({
            current: 1,
            pageSize: 10,
        }, {}, {});
    }, []);


    return (<>
        <div className='page-header-actions'>
            <Tooltip title="Add New" overlayStyle={{ zIndex: 1500 }} onClick={() => {
                // setIsModalVisible(true);
            }} color='cyan' key='red'>
                <Button type="primary" onClick={() => {
                    showModal({});
                }} icon={<PlusOutlined />} size='small' />
            </Tooltip>
        </div>
        <Table onRow={(record) => ({
            onDoubleClick: () => {
                showModal(record);
            }, // click row
        })}
            loading={tblLoading}
            pagination={pagination}
            onChange={handlePageTableChange}
            columns={columns} dataSource={data} />
        <Modal title={typeForm === 'add' ? 'Add New' : 'Edit'}
            okText="Save"
            zIndex='1500'
            confirmLoading={saveFormLoading}
            closable={false} visible={isModalVisible} onOk={handleModalSave} onCancel={handleModalCancel}>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="productName"
                    rules={[{ required: true, message: 'Please input your product name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    </>);
}