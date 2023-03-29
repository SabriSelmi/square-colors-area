import { Fragment, useState } from "react";
import FancyButton from "../../Components/Button/Button";
import NumberInput from "../../Components/Input/Input";
import { useWindowSize } from "../../CustomHooks/UseWindowSize";
import { Area } from "../../types";
import { findBiggestArea, generateSquare } from "../../utils";

const HomePage: React.FC = ()=>{
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [colorNumber, setColorNumber] = useState<number>(0);
    const [square, setSquare] = useState<string[][] | null>(null);
    const [result, setResult] = useState<Area>({size :0, color : null, cells:[[]]});
    const [widthWindow] = useWindowSize();

    const handleChange = (id: string, newValue: number) => {
        switch (id) {
            case "width":
                setWidth(newValue);
                break;
            case "height":
                setHeight(newValue);
                break;
            case "colors":
                setColorNumber(newValue);
                break
            default:
                break;
        }
    }
    
    const handleSubmit = (e : React.FormEvent<HTMLFormElement> |  React.MouseEvent<HTMLButtonElement>)  =>{
        e.preventDefault();
        const square = generateSquare(width, height, colorNumber);
        const result = findBiggestArea(square);
        setSquare(square);
        setResult(result);
    }

    const handleClear = () => {
        setWidth(0);
        setHeight(0);
        setColorNumber(0);
        setSquare([[]]);
        setResult({size : 0, color:"", cells : [[]]});
    }
    return (
        <Fragment>
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
        </form>
        <div className="d-flex justify-content-center mrg-t-15 mrg-b-15">
                { result.size !==0 && <h2>The biggest area contains {result.size} cells with 
                <div className="cell mrg-l-15 mrg-r-15" style={{background : result.color as string ,display: "inline-block"}}/>{result.color} color
                </h2> }
        </div>
        <div className="d-flex justify-content-center mrg-t-15 mrg-b-15">
            <div className="mrg-auto mrg-t-15" style={{maxWidth : "100%"}}>
            {square?.map((row, i) => (
                <div key={i} className="d-flex">
                    {row.map((color, j) => (
                    result.cells.find(el=>JSON.stringify(el) === JSON.stringify([i,j]))? 
                        <div key={`${i}-${j}`} className="cell-no-border" style={{ backgroundColor: color, width : widthWindow / row.length > 25 ? 25 : widthWindow / row.length, height: widthWindow / row.length > 25 ? 25 : widthWindow / row.length}} />
                        :
                        <div key={`${i}-${j}`} className="cell" style={{ backgroundColor: color, width : widthWindow / row.length > 25 ? 25 : widthWindow / row.length, height: widthWindow / row.length > 25 ? 25 : widthWindow / row.length}} />
                    )
                    )}
                </div>
                ))}

            </div>
        </div>
            
        </Fragment>
    )
}

export default HomePage;