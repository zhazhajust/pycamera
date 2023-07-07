import { useEffect, useState } from 'react'
import './App.css'
import PlotFigure from './Axis'
import Select from 'react-select';
import { Slider, Space, Button, Input } from 'antd';
import Config from './Config';

function App() {

  const calculation = () => {
    if (selectedOption.value == "mode1") {
      const partition = (Number(arr[0]) - Number(arr[1]))/(Number(arr[2]) - Number(arr[3]));
      setRes(partition);
      setPar(partition);
    }else {
      const partition = (Number(arr[0]) - Number(arr[1])) * par * k2;
      setRes(partition);
    }
    return;
  };
  const [k2, setK2] = useState(1.414);
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [res, setRes] = useState(0);
  const [data, setData] = useState();
  const [arr, setArr] = useState([0, 1, 2, 3]);
  const [par, setPar] = useState(0);
  const [range, setRange] = useState([0, 100]);
  const [selectedOption, setSelectedOption] = useState({value: 'mode1', label: '(x1 - x2)/(x3 - x4)'});
  const options = [
    { value: 'mode1', label: 'k1 = (x1 - x2)/(x3 - x4)' },
    { value: 'mode2', label: '(x1 - x2) * k1 * k2' },
  ];

  return (
    <>
      <h3>Camera</h3>
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
                          fetch('http://127.0.0.1:8000/stop');
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
        <div className='box3 container'>
          <Input type="text" onChange={(e) => {
                    setArr((prev) => {
                      prev[0] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      console.log(arrCopy)
                      return arrCopy;
                    });
                  }
          } placeholder={'x1'} className='container grid1'/>
          <Input type="text" onChange={(e) => {
                    setArr((prev) => {
                      prev[1] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          } placeholder={'x2'} className='container grid2'/>
          {selectedOption.value == "mode1" ? <Input type="text" onChange={(e) => {
                    setArr((prev) => {
                      prev[2] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          } placeholder={'x3'} className='container grid3'/> : 
          <Input type="text" placeholder={'k1: ' + par} disabled className='container grid3'/> 
          }
          {selectedOption.value == "mode1" ? <Input type="text" onChange={(e) => {
                    setArr((prev) => {
                      prev[3] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          } placeholder={'x4'} className='container grid4'/> : 
          <Input type="text" placeholder={'k2: ' + k2} onChange={
            (e)=>{
              setK2(Number(e.target.value));
            }
          } className='container grid4'/>
          }
          <Select className='select'
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
          <Button className='button' onClick={calculation}>
            Calculation: {res.toFixed(4)}
          </Button>
        </div>
      </div>
    </>
  )
};

export default App;
