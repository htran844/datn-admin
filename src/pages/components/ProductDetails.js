import {
    Button,
    Tooltip,
    Space, Table,
    Modal,
    Form,
    Input,
    message,
    Select,
    Typography,
    Divider,
    Upload
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ProductDetailService from '../../service/ProductDetailService';


const { Option } = Select;

const columns = [
    {
        title: '#',
        dataIndex: 'productDetailId',
        key: 'productDetailId',
        align: 'center',
    },
    {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
        align: 'center',
    },
    {
        title: 'Old Price',
        dataIndex: 'oldPrice',
        key: 'oldPrice',
        render: txt => (<>{txt}$</>),
        align: 'center',
    },
    {
        title: 'New Price',
        dataIndex: 'newPrice',
        key: 'newPrice',
        render: txt => (<>{txt}$</>),
        align: 'center',
    },
    {
        title: 'Remain',
        dataIndex: 'productRemain',
        key: 'newPproductRemainrice',
        align: 'center',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: txt => (<>{txt.categoryName}</>),
        align: 'center',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: txt => (<span>{txt.brandName}</span>),
        align: 'center',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        render: txt => (<span>{txt.countryName}</span>),
        align: 'center',
    },
    {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
        render: txt => (<span>{txt.unitName}</span>),
        align: 'center',
    },
    {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
        render: txt => (<span>{txt.weightName}</span>),
        align: 'center',
    },
    {
        title: 'createdDate',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: txt => (moment(txt).format('YYYY-MM-DD HH:mm:ss')),
        align: 'center',
    },
    {
        title: 'updatedDate',
        dataIndex: 'updatedDate',
        render: txt => (moment(txt).format('YYYY-MM-DD HH:mm:ss')),
        key: 'updatedDate',
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
        ProductDetailService.getAll(pagnation.current - 1, pagnation.pageSize, filters)
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
                    // ProductDetailService.addProduct(values)
                    //     .then(res => {
                    //         console.log('adding new: ', res);
                    //         setData([{ ...res.data.data, key: res.data.data.id }, ...data]);
                    //         message.success(res.data.message);
                    //         handleModalCancel();
                    //     }).catch(err => message.error(err.response.data.message))
                }
                else {
                    // ProductDetailService.updateProduct(productEntity.id, values)
                    //     .then(res => {
                    //         console.log('updating : ', res);
                    //         setData(data.map(e => {
                    //             if (e.id === productEntity.id) {
                    //                 return { key: e.key, ...res.data.data };
                    //             }
                    //             return e;
                    //         }));
                    //         message.success(res.data.message);
                    //         handleModalCancel();
                    //     }).catch(err => message.error(err.response.data.message))
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


    const [categoryName, setCategoryName] = useState('');

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [country, setCountry] = useState([]);
    const [brands, setBrands] = useState([]);
    const [weights, setWeights] = useState([]);

    const addNewCategory = (e) => {

    }

    const [imageUrl, setImageUrl] = useState();
    const beforeUpload = (file) => {
        getBase64(file, (url)=>{
            setImageUrl(url);
        });
        return false;
    }
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      };

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
            scroll={{ x: 'max-content', y: 'max-content' }}
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
                labelCol={{ span: 4 }}
                 wrapperCol={{ span: 18, offset: 2 }}
                 layout="horizontal"

            >
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please choose image!' }]}
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </div>)}
                    </Upload>

                </Form.Item>
                <Form.Item
                    label="Old price"
                    name="newPrice"
                    rules={[{ required: true, message: 'Please input your old price!' }]}
                >
                    <Input type='number' step='0.1' />
                </Form.Item>

                <Form.Item
                    label="New Price"
                    name="newPrice"
                    rules={[{ required: true, message: 'Please input your new price!' }]}
                >
                    <Input type='number' step='0.1' />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please choose category!' }]}
                >
                    <Select
                        showSearch
                       
                        dropdownStyle={{ zIndex: 1500 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    align="center"
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input placeholder="Please enter item" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                    <Typography.Link
                                        onClick={addNewCategory}
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <PlusOutlined /> Add new
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        <Option value="6">Cancelled</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true, message: 'Please choose brand!' }]}
                >
                    <Select
                        showSearch
                        dropdownStyle={{ zIndex: 1500 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    align="center"
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input placeholder="Please enter item" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                    <Typography.Link
                                        onClick={addNewCategory}
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <PlusOutlined /> Add new
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        <Option value="6">Cancelled</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please choose country!' }]}
                >
                    <Select
                        showSearch
                        dropdownStyle={{ zIndex: 1500 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    align="center"
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input placeholder="Please enter item" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                    <Typography.Link
                                        onClick={addNewCategory}
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <PlusOutlined /> Add new
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        <Option value="6">Cancelled</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Unit"
                    name="unit"
                    rules={[{ required: true, message: 'Please choose unit!' }]}
                >
                    <Select
                        showSearch
                        dropdownStyle={{ zIndex: 1500 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    align="center"
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input placeholder="Please enter item" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                    <Typography.Link
                                        onClick={addNewCategory}
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <PlusOutlined /> Add new
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        <Option value="6">Cancelled</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[{ required: true, message: 'Please choose weight!' }]}
                >
                    <Select
                        showSearch
                        dropdownStyle={{ zIndex: 1500 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    align="center"
                                    style={{
                                        padding: '0 8px 4px',
                                    }}
                                >
                                    <Input placeholder="Please enter item" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                    <Typography.Link
                                        onClick={addNewCategory}
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <PlusOutlined /> Add new
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        <Option value="6">Cancelled</Option>
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    </>);
}