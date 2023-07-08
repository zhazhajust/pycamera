import { useState } from 'react';
import Select from 'react-select';
import { Button, Input } from 'antd';

function Caculation(){

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

    const [res, setRes] = useState(0);
    const [arr, setArr] = useState([0, 1, 2, 3]);
    const [par, setPar] = useState(0);
    const [k2, setK2] = useState(1.414);
    const [selectedOption, setSelectedOption] = useState({value: 'mode1', label: '(x1 - x2)/(x3 - x4)'});
    const options = [
      { value: 'mode1', label: 'k1 = (x1 - x2)/(x3 - x4)' },
      { value: 'mode2', label: '(x1 - x2) * k1 * k2' },
    ];

    return (
    <>
        <div className='box3 container'>
          <Input type="text" onChange={(e) => {
                    setArr((prev) => {
                      prev[0] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      console.log(arrCopy)
                      return arrCopy;
                    });
                  }
          } placeholder={'x1'} addonBefore="x1" className='container grid1'/>
          <Input type="text" onChange={(e) => {
                    setArr((prev) => {
                      prev[1] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          } placeholder={'x2'} addonBefore="x2" className='container grid2'/>
         
          {selectedOption.value == "mode1" ? <Input type="text" onChange={(e) => {
                    setArr((prev) => {
                      prev[2] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          } placeholder={'x3'} addonBefore="x3" className='container grid3'/> : 
          <Input type="text" addonBefore="k1" value={par} disabled className='container grid3'/> 
          }
          {selectedOption.value == "mode1" ? <Input type="text" onChange={(e) => {
                    setArr((prev) => {
                      prev[3] = Number(e.target.value);
                      const arrCopy = prev.slice();
                      return arrCopy;
                    });
                  }
          } placeholder={'x4'} addonBefore="x4" className='container grid4'/> : 
          <Input type="text" addonBefore="k2" placeholder={k2} onChange={
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
    </>
    )
};

export default Caculation;