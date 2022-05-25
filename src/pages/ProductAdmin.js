import { Tabs } from 'antd';
import './css/product-admin.css';
import ProductTemplate from './components/ProductTemplate';

const { TabPane } = Tabs;
function changeTab(key) {
    console.log(key);
}


export default function ProductAdmin() {

    return (
        <>
            <div id='product-management'>
                <Tabs defaultActiveKey="product-template" onChange={changeTab}>
                    <TabPane tab="Product Template" key="product-template" >
                        <ProductTemplate />
                    </TabPane>
                    <TabPane tab="Product" key="import" >
                        s
                    </TabPane>
                    <TabPane tab="Weight" key="export">
                        s
                    </TabPane>
                    <TabPane tab="Unit" key="unit">
                        s
                    </TabPane>
                    <TabPane tab="Country" key="country">
                        s
                    </TabPane>
                    <TabPane tab="Brand" key="brand">
                        s
                    </TabPane>

                </Tabs>


            </div>

        </>
    );
}

