import React, {useState, useEffect} from "react"
import escapeStringRegexp from 'escape-string-regexp';
import { Link } from "react-router-dom"
//import {Document, Page} from 'react-pdf'

const Home = () => {
    const [page, setPage] = useState(0)
    const [allPdf, setAllPdf] = useState([])
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([])
    const [ict, setIct] = useState('')
    const [humms, setHumms] = useState('')
    const [abm, setAbm] = useState('')
    const [stem, setStem] = useState('')
    const [ca, setCa] = useState('')
    const [to, setTo] = useState('')
    const [date1, setDate1] = useState('')
    const [date2, setDate2] = useState('')
    const [date3, setDate3] = useState('')
    const [date4, setDate4] = useState('')
    const [date5, setDate5] = useState('')
    const [date6, setDate6] = useState('')
    let pdfArr = [[]]

    useEffect(() =>  {
        const getPdf = async () => {
            const response = await fetch('https://read-online-library.onrender.com/api/file')
            const json = await response.json()
            setAllPdf(json)
        }

        getPdf()
    },[])

    
    let y = -1
    let x = 0
    for (let i = 0; i < allPdf.length; i++) {
        let sec = allPdf[i].section
        let dte = allPdf[i].createdAt.split('-')[0]

        if (allPdf[i].approved && (((sec === ict || sec === humms || sec === abm || sec === stem || sec === ca 
            || sec === to) && (date1 === '' && date2 === '' && date3 === '' && date4 === '' && date5 === '' && date6 === '')) || 
            ((dte === date1 || dte === date2 || dte === date3 || dte === date4 || dte === date5 || dte === date6) && (ict === '' && humms === '' 
            && abm === '' && stem === '' && ca === '' && to === '')) || ((sec === ict || sec === humms || sec === abm || sec === stem 
            || sec === ca || sec === to) && (dte === date1 || dte === date2 || dte === date3 || dte === date4 || dte === date5 || dte === date6))
            || (ict === '' && humms === '' && abm === '' && stem === '' && ca === '' && to === '' && date1 === '' && date2 === '' && date3 === '' 
            && date4 === '' && date5 === '' && date6 === ''))) {
            y++
        }

        if(y >= 5) {
            pdfArr.push([])
            y = 0
            x++
        }

        if(allPdf != null && allPdf[i].approved && (((sec === ict || sec === humms || sec === abm || sec === stem || sec === ca 
            || sec === to) && (date1 === '' && date2 === '' && date3 === '' && date4 === '' && date5 === '' && date6 === '')) || 
            ((dte === date1 || dte === date2 || dte === date3 || dte === date4 || dte === date5 || dte === date6) && (ict === '' && humms === '' 
            && abm === '' && stem === '' && ca === '' && to === '')) || ((sec === ict || sec === humms || sec === abm || sec === stem 
            || sec === ca || sec === to) && (dte === date1 || dte === date2 || dte === date3 || dte === date4 || dte === date5 || dte === date6))
            || (ict === '' && humms === '' && abm === '' && stem === '' && ca === '' && to === '' && date1 === '' && date2 === '' && date3 === '' 
            && date4 === '' && date5 === '' && date6 === ''))) {
            pdfArr[x].push(allPdf[i])
        }
    }    

    const ch = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    let inp = search
    let layer = [[], [[]]]
    
    const searchFunc = async (e) => {
        e.preventDefault()
        if(search !== '') {
            setSearchData([])
            setTimeout(() => {one()}, 500);
        }   

        function one() {setSearchData(layer[1])}
        if(search === '') {
            setSearchData([])
        }
        setPage(0)
    }

    if(allPdf.length !== 0 && inp !== '') {  
        
        for (let i = 0; i < allPdf.length; i++) {
            let reg = new RegExp(escapeStringRegexp(inp), 'ig')
            let spl = allPdf[i].title
            let sec = allPdf[i].section
            let dte = allPdf[i].createdAt.split('-')[0]

            if(spl.match(reg) && allPdf[i].approved) {
                let id = allPdf[i]._id
                let authors = allPdf[i].authors
                let date = allPdf[i].createdAt
                let section = allPdf[i].section
                let spl2 = allPdf[i].title.indexOf(reg.exec(allPdf[i].title))
                let str = ''
                let str2 = ''
                let str3 = ''
                let lp = (((sec === ict || sec === humms || sec === abm || sec === stem || sec === ca 
                    || sec === to) && (date1 === '' && date2 === '' && date3 === '' && date4 === '' && date5 === '' && date6 === '')) || 
                    ((dte === date1 || dte === date2 || dte === date3 || dte === date4 || dte === date5 || dte === date6) && (ict === '' && humms === '' 
                    && abm === '' && stem === '' && ca === '' && to === '')) || ((sec === ict || sec === humms || sec === abm || sec === stem 
                    || sec === ca || sec === to) && (dte === date1 || dte === date2 || dte === date3 || dte === date4 || dte === date5 || dte === date6))
                    || (ict === '' && humms === '' && abm === '' && stem === '' && ca === '' && to === '' && date1 === '' && date2 === '' && date3 === '' 
                    && date4 === '' && date5 === '' && date6 === ''))

                for (let i = 0; i < spl.length; i++) {
                    
                    if(i < spl2 && spl2 !== 0 && lp) {
                        str += spl[i]   
                        str2 = <b className="boldReg">{inp.toUpperCase()}</b>
                    }
                    if(spl2 === 0 && lp) { 
                        str = ''  
                        str2 = <b className="boldReg">{inp.toUpperCase()}</b>
                    }
                    if(i >= spl2 + inp.length && lp) {   
                        str3 += spl[i]
                    }
                }

                if(lp) {
                    layer[0].push({id: id})
                    layer[0].push({authors: authors})
                    layer[0].push({date: date})
                    layer[0].push({section: section})
                    layer[0].push({title: str})
                    layer[0].push({bold: str2})
                    layer[0].push({title2: str3})
                }
            }
        }
        let a = -1
        let b = -2
        let c = -3
        let d = -4
        let e = -5
        let f = -6
        let g = -7
        let h = -1
        let k = 0
        for (let i = 0; i < layer[0].length / 7 ; i++) {
            a+=7
            b+=7
            c+=7
            d+=7
            e+=7
            f+=7
            g+=7
            h++

            if(h >= 5) {
                layer[1].push([])
                e = 0
                k++
            }
            
            layer[1][k].push([layer[0][c].title, layer[0][b].bold, layer[0][a].title2, layer[0][d].section, layer[0][e].date, layer[0][f].authors, layer[0][g].id])
        }
    }

    const ICT = () => {
        if(ict === '') {setIct('ICT')}
        if(ict !== '') {setIct('')}
        setPage(0)
    }
    const HUMMS = () => {
        if(humms === '') {setHumms('HUMMS')}
        if(humms !== '') {setHumms('')}
        setPage(0)
    }
    const ABM = () => {
        if(abm === '') {setAbm('ABM')}
        if(abm !== '') {setAbm('')}
        setPage(0)
    }
    const STEM = () => {
        if(stem === '') {setStem('STEM')}
        if(stem !== '') {setStem('')}
        setPage(0)
    }

    const CA = () => {
        if(ca === '') {setCa('CA')}
        if(ca !== '') {setCa('')}
        setPage(0)
    }

    const TO = () => {
        if(to === '') {setTo('TO')}
        if(to !== '') { setTo('')}
        setPage(0)
    }

    const date2023 = () => {
        if(date1 === '') {setDate1('2023')}
        if(date1 === '2023') {setDate1('')}
        setPage(0)
    }

    const date2022 = () => {
        if(date2 === '') {setDate2('2022')}
        if(date2 === '2022') {setDate2('')}
        setPage(0)
    }

    const date2021 = () => {
        if(date3 === '') {setDate3('2021')}
        if(date3 === '2021') {setDate3('')}
        setPage(0)
    }

    const date2020 = () => {
        if(date4 === '') {setDate4('2020')}
        if(date4 === '2020') {setDate4('')}
        setPage(0)
    }

    const date2019 = () => {
        if(date5 === '') {setDate5('2019')}
        if(date5 === '2019') {setDate5('')}
        setPage(0)
    }
    const date2018 = () => {
        if(date6 === '') {setDate6('2018')}
        if(date6 === '2018') {setDate6('')}
        setPage(0)
    }

    const goBck = () => {
        setSearchData([])
        setSearch('')
    }
    
    const bgSpan = {backgroundColor: '#1184c2'}
    const bgSpanNone = {}
    const formSt = {gridTemplateColumns: `${((searchData.length > 0 && pdfArr[0].length !== 0) || (searchData.length > 0 && pdfArr[0].length === 0)) ? '49% 49%' : '98%'}`}

    return(
        <div id="home">
            <div id="pdfLinks">
                <div id="pagination">
                    <button id="prev" onClick={() => {page > 0 && setPage(e => e - 1)}}>Prev</button>
                    <span>{page}</span>
                    <button id="next" onClick={() => { ((page < searchData.length - 1) || (page < pdfArr.length - 1 && searchData.length === 0)) && setPage(e => e + 1)}}>Next</button>
                </div>
                {(pdfArr[0].length === 0 && searchData.length === 0)  && <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {(searchData.length !== 0 || pdfArr[0].length > 0 )&& <div id="pdfConLinks">
                    {(searchData.length === 0 && pdfArr[0].length > 0) && pdfArr[page].map(data =>
                    ( 
                    <div key={data._id}>
                        <p><Link to={`/pdfView/${data._id}`}>{data.title}</Link></p>
                        <p>Authors: {data.authors}</p>
                        <p>Section: {data.section}</p>
                        <p>Year Published: {data.createdAt.split('-')[0]}</p>
                    </div>))}
                    {searchData.length !== 0 ? searchData[page].map(data =>
                    (
                        <div key={data._id}>
                            <p><Link to={`/pdfView/${data[6]}`} key={data[6]}>{data[0]}{data[1]}{data[2]}</Link></p>
                            <p>Authors: {data[5]}</p>
                            <p>Section: {data[3]}</p>
                            <p>Year Published: {data[4].split('-')[0]}</p>
                        </div>
                    ))
                    : ''}

                    {(searchData.length === 1 && searchData[0].length === 0) && <div id="noRes">"No results"</div>}
                </div>}
            </div>
            <div id="searchdiv">
                <form id="searchform" onSubmit={searchFunc}>
                    <input type="text" placeholder="Search Here..." onChange={ch} value={search}/>
                    <div id="formButtons" style={formSt}>
                        <button>Search</button>{((searchData.length > 0 && pdfArr[0].length !== 0) || (searchData.length > 0 && pdfArr[0].length === 0))&& <button onClick={goBck}>Go Back</button>}
                    </div>
                </form>
                <div id="strandfilter">
                    <span>Strand Filter:</span>
                    <div id="strandCon">
                        <span onClick={ICT} style={ict === 'ICT' ? bgSpan : bgSpanNone}>ICT</span>
                        <span onClick={HUMMS} style={humms === 'HUMMS' ? bgSpan : bgSpanNone}>HUMMS</span>
                        <span onClick={ABM} style={abm === 'ABM' ? bgSpan : bgSpanNone}>ABM</span>
                        <span onClick={STEM} style={stem === 'STEM' ? bgSpan : bgSpanNone}>STEM</span>
                        <span onClick={CA} style={ca === 'CA' ? bgSpan : bgSpanNone}>CA</span>
                        <span onClick={TO} style={to === 'TO' ? bgSpan : bgSpanNone}>TO</span>
                    </div>
                </div>
                <div id="datefilter">
                    <span>Year Filter:</span>
                    <div id="dateCon">
                        <span onClick={date2023} style={date1 === '2023' ? bgSpan : bgSpanNone}>2023</span>
                        <span onClick={date2022} style={date2 === '2022' ? bgSpan : bgSpanNone}>2022</span>
                        <span onClick={date2021} style={date3 === '2021' ? bgSpan : bgSpanNone}>2021</span>
                        <span onClick={date2020} style={date4 === '2020' ? bgSpan : bgSpanNone}>2020</span>
                        <span onClick={date2019} style={date5 === '2019' ? bgSpan : bgSpanNone}>2019</span>
                        <span onClick={date2018} style={date6 === '2018' ? bgSpan : bgSpanNone}>2018</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home