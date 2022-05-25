import { Table, Tooltip, Button, Form, Modal, Input, DatePicker, Switch, Select } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

export default function ProductTemplate() {
    const columns = [
        {
            key: 'id',
            title: 'Mã Sản Phẩm',
            dataIndex: 'id',
            sorter: true,
        },
        {
            key: 'image',
            title: 'Ảnh',
            dataIndex: 'image',
        },
        {
            key: 'productName',
            title: 'Tên Sản Phẩm',
            dataIndex: 'productName',
        },
        {
            key: 'description',
            title: 'Mô Tả',
            dataIndex: 'description',
        },
        {
            key: 'category',
            title: 'Category',
            dataIndex: 'category',
        },
        {
            key: 'remain',
            title: 'Số Lượng Còn',
            dataIndex: 'remain',
        },
        {
            key: 'image',
            title: 'Ảnh',
            dataIndex: 'image',
        },
        {
            key: 'weight',
            title: 'Khối Lượng',
            dataIndex: 'weight',
        },
        {
            key: 'country',
            title: 'Xuất Xứ',
            dataIndex: 'country',
        },
        {
            key: 'brand',
            title: 'Thương Hiệu',
            dataIndex: 'brand',
        },
        {
            key: 'date',
            title: 'HSD',
            dataIndex: 'date',
        },
        {
            key: 'status',
            title: 'Trạng Thái',
            dataIndex: 'status',
        },
        {
            key: 'createBy',
            title: 'Người Tạo',
            dataIndex: 'createBy',
        },
        {
            key: 'createDate',
            title: 'Ngày Tạo',
            dataIndex: 'createDate',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 90,
            render: () => <Tooltip title="" color='cyan' key='red'>
                <Button type="danger" size='small' >
                    Delete
                </Button>
            </Tooltip>,
        },
    ];
    const [data, setData] = useState([
        {
            id: '1',
            productName: 'Product 1',
            description: 'Description 1',
            category: 'Category 1',
            status: 'Status 1',
            createBy: 'Create By 1',
            createDate: 'Create Date 1',
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formAction, setFormAction] = useState({
        type: 'add',
        title: 'Create Product',
    });
    const [form] = Form.useForm();
    const showModal = (action) => {
        setFormAction(action);
        setIsModalVisible(true);
    };

    const modalOk = () => {
        // setIsModalVisible(false);
        form
            .validateFields()
            .then(values => {
                submitForm(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const modalCancel = () => {
        setIsModalVisible(false);
    };

    const submitForm = (data) => {
        if (formAction.type === 'add') {
            console.log('adding category')
        }
        else {
            console.log('updating category')
        }
    }

    const handleTableChange = (newPagination, filters, sorter) => {

    };

    return (
        <div id="product-template-management">
            <Modal
                width={'100%'}
                visible={isModalVisible}
                title={formAction.title}
                zIndex='1500'
                okText="Save"
                cancelText="Cancel"
                onCancel={modalCancel}
                onOk={modalOk}
                form={form}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="templateId"
                        label="product template"
                        rules={[{ required: true, message: 'Please input the name of category!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="oldPrice" label="Old Price">
                        <Input />
                    </Form.Item>
                    <Form.Item name="newPrice" label="New Price">
                        <Input />
                    </Form.Item>
                    <Form.Item name="hsd" label="HSD">
                        <DatePicker popupStyle={{ zIndex: '1501' }} />
                    </Form.Item>
                    <Form.Item label="Trạng Thái" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Trọng Lượng" name='weight'>
                        <Select dropdownStyle={{zIndex: 1501}}> 
                            <Select.Option value="demoa">Weight 1</Select.Option>
                            <Select.Option value="demoa2">Weight 1</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Country">
                        <Select  dropdownStyle={{zIndex: 1501}}>
                            <Select.Option value="demof">Country 1</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Brand">
                        <Select  dropdownStyle={{zIndex: 1501}}>
                            <Select.Option value="demo">Brand 1</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Tooltip title="Add new" color='cyan' key='red' onClick={() => showModal({
                type: 'add',
                title: 'Create New Product',
            })}>
                <Button type="primary" icon={<PlusOutlined />} size='small' />
            </Tooltip>
            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                scroll={{ x: 1500, y: 300 }}
            />
        </div>
    );
};