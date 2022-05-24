import { Tabs } from 'antd';
import Category from './components/Category';
import Tag from './components/Tag';
import './css/inventory.css';

const { TabPane } = Tabs;
function changeTab(key) {
    console.log(key);
}

export default function CategoryAdmin() {
    return (
        <div id="category-management">
            <Tabs defaultActiveKey="category" onChange={changeTab}>
                <TabPane tab="Category" key="category" >
                    <Category />
                </TabPane>
                <TabPane tab="Tag" key="tag">
                    <Tag />
                </TabPane>
            </Tabs>
        </div>
    );
}