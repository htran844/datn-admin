import { Tabs } from 'antd';
import './css/inventory.css';
import ImportProducts from './components/ImportProducts';
import ExportProducts from './components/ExportProducts';


const { TabPane } = Tabs;
function changeTab(key) {
    console.log(key);
}

export default function Inventory() {
    return (
        <>
            <div id='inventory-management'>
                <Tabs defaultActiveKey="import" onChange={changeTab}>
                    <TabPane tab="Nhập kho" key="import" >
                        <ImportProducts />
                    </TabPane>
                    <TabPane tab="Xuất kho" key="export">
                        <ExportProducts />
                    </TabPane>
                </Tabs>
            </div>

        </>
    );
}

