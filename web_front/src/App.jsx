import { useEffect, useState } from 'react'
import './App.css'
import PlotFigure from './Axis'
import Select from 'react-select';

function App() {
  const calculation = () => {
    if (selectedOption.value == "mode1") {
      const partition = (Number(arr[0]) - Number(arr[1]))/(Number(arr[2]) - Number(arr[3]));
      setRes(partition);
      setPar(partition);
    }else {
      const partition = (Number(arr[0]) - Number(arr[1]))/par/1.414;
      setRes(partition);
    }
    return;
  };

  const [res, setRes] = useState(0);
  const [data, setData] = useState();
  const [arr, setArr] = useState([0, 1, 2, 3]);
  const [par, setPar] = useState(0);
  const [selectedOption, setSelectedOption] = useState({value: 'mode1', label: 'Pixel Partiaion'});
  const options = [
    { value: 'mode1', label: 'Pixel Partiaion' },
    { value: 'mode2', label: 'Calculate FWHM' },
  ];

  return (
    <>
      <h3>Camera</h3>
      <div>
        <button onClick={
          () => {
            fetch('http://127.0.0.1:8000/clean')
          }
        }>
          click to clean
        </button>
      </div>
      <div className='wrapper'>
        <div className='box1'>
            <img src="http://127.0.0.1:8000/get_8_bits_img" className="logo" alt="Vite logo"/>
        </div>
        <div className='box2'>
          <h3>ckick to get the 1d projetion</h3>
          <div className="logo">
            <PlotFigure axis="culmen_length_mm" data={data}/>
          </div>
          <button onClick={
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
          </button>
        </div>
        <div className='box3 container'>
          <input type="text" className='container text1' onChange={(e) => {
                    setArr((prev) => {
                      prev[0] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      console.log(arrCopy)
                      return arrCopy;
                    });
                  }
          }/>
          <input type="text" className='container text2' onChange={(e) => {
                    setArr((prev) => {
                      prev[1] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          }/>
          {selectedOption.value == "mode1" ? <input type="text" className='container text3' onChange={(e) => {
                    setArr((prev) => {
                      prev[2] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          }/> : <input type="text" className='container text3' value={par}/> 
          }
          {selectedOption.value == "mode1" ? <input type="text" className='container text4' onChange={(e) => {
                    setArr((prev) => {
                      prev[3] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          }/> : <input type="text" className='container text4' value={1.414}/>    
          }
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
          <button className='container button' onClick={calculation}>
            Calcu:{res.toFixed(6)}
          </button>
        </div>
      </div>
    </>
  )
};

export default App;
