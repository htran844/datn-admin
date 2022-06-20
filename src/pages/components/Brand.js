import {
    Button,
    Tooltip,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Brand() {
    return (<>
        <div className='page-header-actions'>
            <Tooltip title="Add New" overlayStyle={{ zIndex: 1500 }} onClick={() => {
                // setIsModalVisible(true);
            }} color='cyan' key='red'>
                <Button type="primary" icon={<PlusOutlined />} size='small' />
            </Tooltip>
        </div>
    </>);
}