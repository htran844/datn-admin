import { Tabs } from 'antd';
import Brand from './components/Brand';
import Country from './components/Country';
import Product from './components/Product';
import ProductDetails from './components/ProductDetails';
import Unit from './components/Unit';
import Weight from './components/Weight';

const { TabPane } = Tabs;

export default function ProductManage() {

    return (
        <div id='product-management'>

            <Tabs defaultActiveKey="1" >
                <TabPane tab="Products" key="1">
                    <Product />
                </TabPane>
                <TabPane tab="Product details" key="2">
                    <ProductDetails />
                </TabPane>
                <TabPane tab="Brand" key="3">
                    <Brand />
                </TabPane>
                <TabPane tab="Unit" key="4">
                    <Unit />
                </TabPane>
                <TabPane tab="Country" key="5">
                   <Country />
                </TabPane>
                <TabPane tab="Weight" key="6">
                    <Weight />
                </TabPane>
            </Tabs>
        </div>
    );
}