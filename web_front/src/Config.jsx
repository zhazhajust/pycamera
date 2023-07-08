import { useState } from 'react';
import { Select, Slider, Space, Button, Input } from 'antd';

function Config(){
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(200);

    return (
    <>
        <Space>
            <div>
                <Select defaultValue="colorbar">
                    <Option value="grey">grey</Option>
                    <Option value="jet">jet</Option>
                </Select>
                <Select defaultValue="8bits">
                    <Option value="8bits">8 bits</Option>
                    <Option value="12bits">12 bits</Option>
                </Select>
            </div>
            <div>
                <Input addonBefore="曝光时间" defaultValue={200} onChange = {
                    (e) => {
                        setTime(Number(e.target.value));
                    }
                }></Input>
                <Input addonBefore="曝光强度" defaultValue={10000}></Input>
            </div>
            <Button type="text" onClick={
                () => {
                    const url = 'http://127.0.0.1:8000/set_exposure_time?time=' + Number(time);
                    fetch(url, {method: 'POST'});
                }
            }>
                Submit
            </Button>
        </Space>
    </>
    )
};

export default Config;