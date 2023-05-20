import { useEffect, useState } from "react"

const StartPage = () => {
    const [x, setX] = useState(0)
    const [num, setNum] = useState(0)

    useEffect(() => {
        setTimeout(() => { 
            setX(e => e + 1)
        }, 7000) 

        if(x > 0) {
            setNum(100 * (x - 1))
        }

        if(x > 4) {
            setX(0)
        }
    }, [x])

    const st = {right: `calc(${100 * (x - 1)}%)`}

    const dum = {}

    return(
        <div id="startpage">
            <div id='img1' style={x > 0 ? st : dum}><div className='imgDes'><div className='mainTxt'>"An investment in knowledge always pays the best interest"<div className='subTxt'>~ Benjamin Franklin</div></div></div></div>
            <div id='img2' style={x > 0 ? st : dum}><div className='imgDes'><div className='mainTxt'>"The roots of education are bitter, but the fruit is sweet"<div className='subTxt'>~ Aristotle</div></div></div></div>
            <div id='img3' style={x > 0 ? st : dum}><div className='imgDes'><div className='mainTxt'>"Wisdom is the right use of knowledge"<div className='subTxt'>~ Charles Spurgeon</div></div></div></div>
            <div id='img4' style={x > 0 ? st : dum}><div className='imgDes'><div className='mainTxt'>"Life's rewards go to those who let their actions rise above their excuses"<div className='subTxt'>~ Unknown</div></div></div></div>
        </div>  
    )
}

export default StartPage