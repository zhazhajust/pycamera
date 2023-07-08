import './App.css'
import Config from './Config';
import PlotFigure from './Axis'
import { useState } from 'react'
import Calculation from './Calculation'
import { Slider, Space, Button, Avatar } from 'antd';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState();
  const [range, setRange] = useState([0, 100]);

  return (
    <>
      <Space>
        <Avatar src="/CLAPA.png" />
        <h3>CLAPA-OPTICS Camera software</h3>
      </Space>


      <div className='wrapper'>
        <Config />
      </div>


      <div className='wrapper'>


        <div className='box1'>
          <div>
            <Space>
              <Button disabled={isOpen} onClick={
                  () => {
                      fetch('http://127.0.0.1:8000/start');
                      setIsOpen(true);
                      // 通过事件监听页面关闭或刷新
                      window.addEventListener('beforeunload', (event) => {
                          fetch('http://127.0.0.1:8000/close');
                          event.returnValue = '';
                      });
                  }
              }>
                  click to start
              </Button>
              <Button disabled={!isOpen} onClick={
                  () => {
                      fetch('http://127.0.0.1:8000/close');
                      setIsOpen(false);
                      setIsShow(false);
                  }
              }>
                  click to close
              </Button>
              <Button onClick={
                  () => {
                      setIsShow(!isShow);
                  }
              }>
                  show the image
              </Button>
              <Button onClick={
                  () => {
                    const url = 'http://127.0.0.1:8000/get_projection/?x1=' + range[0] + '&x2=' + range[1];
                    fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setData(data);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                  }
                }> 
                get range axis data
              </Button>
            </Space>
          </div>
          {
            isShow ? 
              <div className='two_raw'>
                <div style={{padding: '1rem', height: '20rem'}}>
                  <Slider vertical range step={1} defaultValue={[0, 100]}  onAfterChange={
                    (value) => {
                      setRange(value); 
                    }
                  }/>
                </div>
                <div>
                  <img src="http://127.0.0.1:8000/frame" className="logo" alt="Vite logo"/> 
                </div>
              </div>
            :
            <div></div>
          }
        </div>


        <div className='box2'>
          <h3>ckick to get the 1d projetion</h3>
          <div className="logo">
            <PlotFigure axis="culmen_length_mm" data={data}/>
          </div>
          <Button onClick={
            () => {
                    fetch('http://127.0.0.1:8000/get_projection')
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        setData(data);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                  }
          }>
            Get 1d Projection
          </Button>
        </div>


        <Calculation />

        
      </div>
    </>
  )
};

export default App;
