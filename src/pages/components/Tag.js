import { Button, Tooltip, Segmented, Table, Modal, Form, Input } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';


export default function Tag() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formAction, setFormAction] = useState({
        type: 'add',
        title: 'Create Category',
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
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: 'Tag Name',
            dataIndex: 'tagName',
            key: '2',
        },
        {
            title: 'Tag Slug',
            dataIndex: 'tagSlug',
            key: '3',
        },
    ];
    const [data, setData] = useState([
        {
            id: '1',
            tagName: 'Nguyễn Văn A',
            tagSlug: 'nguyen-van-a',

        },
        {
            id: '2',
            tagName: 'Nguyễn Văn B',
            tagSlug: 'Nguyen-van-b',

        }
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

    const showModalUpdate = (record) => {
        showModal({
            type: 'update',
            title: 'Update Tag',
        });
        console.log(record);
        form.setFieldsValue({
            tagName: record.tagName,
            tagSlug: record.tagSlug,
        });
    }
    return (
        <>
            <Modal
                visible={isModalVisible}
                title={formAction.title}
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
                        name="tagName"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name of category!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="tagSlug" label="Slug">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <div className='page-header-actions'>
                <Tooltip title="Add new" color='cyan' key='red' onClick={() => showModal({
                    type: 'add',
                    title: 'Create Category',
                })}>
                    <Button type="primary" icon={<PlusOutlined />} size='small' />
                </Tooltip>
            </div>
            <Segmented options={['Tất cả', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
            <Table style={{ textAlign: 'center' }} onRow={(record, rowIndex) => {
                return {
                    onClick: event => showModalUpdate(record), // click row
                };
            }} pagination={page} loading={loading} onChange={handlePageTableChange}
                columns={columns} dataSource={data} />
        </>
    );
}