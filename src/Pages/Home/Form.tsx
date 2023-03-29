import { useState, useCallback} from "react";
import FancyButton from "../../Components/Button/Button";
import NumberInput from "../../Components/Input/Input";
import { Area } from "../../types";
import {generateSquare, findBiggestArea } from "../../utils";

interface SquareFormProps {
    onSubmit : (square : string[][], result : Area) => void;
    onClear : () => void;
}

const SquareForm: React.FC<SquareFormProps> = ({ onSubmit, onClear }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [colorNumber, setColorNumber] = useState(0);

  const handleChange = useCallback((id: string, newValue: number) => {
    switch (id) {
      case "width":
        setWidth(newValue);
        break;
      case "height":
        setHeight(newValue);
        break;
      case "colors":
        setColorNumber(newValue);
        break;
      default:
        break;
    }
  }, []);

  const handleSubmit = useCallback(
    (e : React.FormEvent<HTMLFormElement> |  React.MouseEvent<HTMLButtonElement>)  =>{
            e.preventDefault();
            // generate the square with the given parameters
            const square = generateSquare(width, height, colorNumber);
            // get the result of the biggest area
            const result = findBiggestArea(square);
            // pass the values to the parent component
            onSubmit(square, result);
        },[width, height, colorNumber, onSubmit]
    )



  const handleClear = useCallback(() => {
    // clear all inputs
    setWidth(0);
    setHeight(0);
    setColorNumber(0);
    // call the clear function from the parent component
    onClear();
  }, [onClear]);

  return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-center">Square Biggest Area</h2>
            <div className="d-flex justify-content-center mrg-t-15">
                <NumberInput
                    id="width"
                    value={width} 
                    label={"Number of width Cells"}
                    onChange={(id, value)=>handleChange(id, value)}
                    placeholder="Enter the width of the square"                   
                />
            </div>
            <div className="d-flex justify-content-center mrg-t-15">
                <NumberInput
                    id="height"
                    value={height} 
                    label={"Number of height Cells"}
                    onChange={(id, value)=>handleChange(id, value)}
                    placeholder="Enter the height of the square"                   
                />
            </div>
            <div className="d-flex justify-content-center mrg-t-15">
                <NumberInput
                    id="colors"
                    value={colorNumber} 
                    label={"Number of colors"}
                    onChange={(id, value)=>handleChange(id, value)}
                    placeholder="Enter the number of colors in the square"                   
                />
            </div>
            <div className="d-flex justify-content-center mrg-t-15 mrg-b-15">
                <FancyButton label="Generate" className="mrg-r-15" onClick={handleSubmit}/>
                <FancyButton label="clear" onClick={handleClear} />
            </div>
        </form>)
}

export default SquareForm;
