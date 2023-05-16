import React from 'react'
import NewsItem from './NewsItem'
import { useEffect, useState } from 'react';
// import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";





const News = (props)=>{

  const [articles,setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
   
    
 
  const updateNews = async ()=>{
   props.setProgress(0)
   const fetchUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
   setLoading(true)
   let data = await fetch(fetchUrl);
   props.setProgress(30)
   //fetch will return a promise
   let parsedData = await data.json()
   props.setProgress(60)
   setArticles(parsedData.articles)
   setTotalResults(parsedData.totalResults)
   setLoading(false)
   console.log(parsedData)
   props.setProgress(100)
  }
//useEffect will do the work of componentDidMount()
//Will be executed after render()
  // async componentDidMount(){
  // this.updateNews();
  // }
  useEffect(()=>{
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
  updateNews();
   //eslint-disable-next-line
  },[])

  // const handleNextClick= async()=>{
  // setPage(page + 1);
  // updateNews()
  // }
  // const handlePrevClick= async()=>{
  // setPage(page - 1);
  // updateNews()
  // }
  const fetchMoreData = async () => {
    const fetchUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    //setPage is a async function and will take some time to execute, so setting after assigning fetchUrl to get rid of the common key issue
    setPage(page+1)
    //Tp adjust initial Loading....
    setLoading(true)
    let data = await fetch(fetchUrl);
    //fetch will return a promise
    let parsedData = await data.json()
    console.log(parsedData)
   setArticles(articles.concat(parsedData.articles))
   setTotalResults(parsedData.totalResults)
   setLoading(false)
  //   this.setState({
  //   articles: this.state.articles.concat(parsedData.articles), 
  //   totalResults: parsedData.totalResults,
  //   loading: false
  // })
  };
    return (
      <>
        <h3 className="text-center" style={{marginTop:"80px"}}>NewsMonkey - {capitalizeFirstLetter(props.category)} </h3>
        {loading && <h4 className='text-center my-2'>Loading...</h4>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <h4 className='text-center my-2'>Loading...</h4>}
        >
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
           <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,87):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           </div>
        })}
        
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={page>=Math.ceil(this.state.totalResults/props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
 
}
//Default props and proptypes are written at then end in Function Based components
News.defaultProps = {
  country:'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
