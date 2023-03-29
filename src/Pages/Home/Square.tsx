import { useMemo } from "react";

interface SquareProps {
    square : string[][] | null;
    cells : number[][];
    widthCalculator : (row :string[]) => number;
}

const Square : React.FC<SquareProps> = ({square, cells, widthCalculator}) => {
    const renderSquare = useMemo(() => {
        if (!square) return null;
        return square.map((row, i) => (
          <div key={i} className="d-flex">
            {row.map((color, j) => (
              cells.find(el => JSON.stringify(el) === JSON.stringify([i, j])) ?
                <div key={`${i}-${j}`} 
                    className="cell-no-border" 
                    style={
                        { 
                            backgroundColor: color, 
                            width: `${widthCalculator(row)}px`, 
                            height: `${widthCalculator(row)}px` 
                        }
                    } 
                    />
                :
                <div key={`${i}-${j}`} 
                    className="cell" 
                    style={
                        { 
                            backgroundColor: color, 
                            width: `${widthCalculator(row)}px`, 
                            height: `${widthCalculator(row)}px` 
                        }
                    } 
                    />
            ))}
          </div>
        ))
      }, [square, cells, widthCalculator]);
      return (
        square ?
        <div className="d-flex justify-content-center mrg-t-15 mrg-b-15">
            <div className="mrg-auto mrg-t-15" style={{maxWidth : "100%"}}>
                {renderSquare}
            </div>
        </div> : null
    )
}

export default Square;