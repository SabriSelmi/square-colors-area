import { Fragment, useState, useCallback } from "react";
import { useWindowSize } from "../../CustomHooks/UseWindowSize";
import { Area } from "../../types";
import SquareForm from "./Form";
import Square from "./Square";

const HomePage: React.FC = ()=>{
    const [square, setSquare] = useState<string[][] | null>(null);
    const [result, setResult] = useState<Area>({size :0, color : null, cells:[[]]});
    const [widthWindow] = useWindowSize();

   
    // generate the square and calculate the biggest area
    const handleSubmit = useCallback(
        (square : string[][], result : Area)  =>{
        setSquare(square);
        setResult(result);
    },[])

    // clear state
    const handleClear = useCallback(
        () => {
                setSquare([[]]);
                setResult({size : 0, color:"", cells : [[]]});    
            },[]
        )
    // calculate the width of the cell to be displayed
    const widthCalculator = useCallback(
        (row :string[])=> (
            widthWindow / row.length > 25 ? 25 : widthWindow / row.length
            ),[widthWindow]
        
        )
    

    return (
        <Fragment>
            <SquareForm onSubmit={handleSubmit} onClear={handleClear} />
            <div className="d-flex justify-content-center mrg-t-15 mrg-b-15">
                    { result.size !==0 && <h2>The biggest area contains {result.size} cells with 
                    <div className="cell mrg-l-15 mrg-r-15" style={{background : result.color as string ,display: "inline-block"}}/>{result.color} color
                    </h2> }
            </div>
            <Square square={square} cells={result.cells} widthCalculator={widthCalculator}/>            
        </Fragment>
    )
}

export default HomePage;