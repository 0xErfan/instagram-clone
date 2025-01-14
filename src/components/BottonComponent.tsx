import { useContext } from "react"
import { ThemContext } from "../App"
const BottonComponent = () => {
    const themVal = useContext(ThemContext)
    return (
        <div>BottonComponent {'+ ' + themVal}</div>
    )
}
export default BottonComponent