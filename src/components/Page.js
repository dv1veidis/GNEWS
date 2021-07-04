import React, {useState, Fragment,useEffect} from 'react'
import {Card, Button} from 'react-bootstrap'
import "./Grid.css"


function Page(){
    const [search, setSearch] = useState("");
    const [url, setUrl]=useState("");
    const [error, setError] = useState("");
    const [articles, setArticles]=useState();
    const urlGnews = "https://gnews.io/api/v4/search?q="
    const token = "&max=9&sortby=relevance&token=045c701cbbbfe99d2c173b5c49170272"
    const validation =() =>{
        let searchError = "";
        var forCheck = search.replace(/ /g,'');
        if (/[^0-9a-zA-Z]/.test(forCheck)) {
            searchError = "Invalid search please use only alphanumeric values";
            setError(searchError);
            return false;
        }
        setError(searchError);
        return true;
    }





    const renderCards=(article, index)=>{
        return(
            <a href={article.url} >
            <Card className="boxItem" key={index}>             
                <Card.Img variant="top" className="boxItem-img" src={article.image} />
                <Card.Body>
                    <Card.Title style={{fontSize: 'large', fontWeight:'bold'}}>{article.title}</Card.Title>
                    <Card.Subtitle>Published at: {article.publishedAt}</Card.Subtitle>
                    <Card.Text className="truncate">
                    {article.description}
                    </Card.Text>

                </Card.Body>
            </Card>
            </a>
        )
    }

    useEffect(()=>{
        try{
            fetch(url)
    .then(response=> response.json())
    .then(data => setArticles(data));
        }
        catch(e){
            console.log(e);
        }
    }, [url])

    let articlesToRender;
    if(articles){
        articlesToRender = articles.articles.map((article, index)=>{
            return <div key={index}>{renderCards(article, index)}</div>
        })
    }


    const onSubmit= async e =>{
        e.preventDefault();
        const isValid = validation();
        if(isValid){
        var final = search.replace(/ /g, '-');
        const combination = urlGnews+final+token;
        setUrl(combination);
        }
        else{
            setUrl("");
        }       
    }

return(
    <Fragment>
    <div>
        <h1 style={{
        display: 'flex', justifyContent: 'space-evenly'}}>GNEWS API by Deividas Gelžinis</h1>
        {error ? <div style={{display: 'flex', justifyContent:'center', color:'red'}}>{error}</div>:null}
            <form onSubmit={onSubmit} style={{
        display: 'flex', justifyContent: 'center'}}>
                <p><input type='text' search={search} onChange={(e)=>setSearch(e.target.value)} maxLength="40"/></p>
                <p><button disabled={!search} >Submit</button></p>
            </form>
            </div>
        <div className="box"><div className="grid"> {articlesToRender}</div></div>
                   
           
    </Fragment>
)
}

export default Page;