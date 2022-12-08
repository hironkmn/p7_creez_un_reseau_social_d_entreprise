import ButtonAppBar from "../components/Home/AppBar";
import React from "react";
import AddPost from "../components/Home/AddPost";
import Pagination from "../components/Home/Pagination";

function Home() {
    const [posts, setPosts] = React.useState([])
    async function fetchData() {
        let token = localStorage.getItem('token')
        let newPosts = await fetch("http://localhost:3000/api/posts?pageNumber=" + 1 + "&pageSize=" + 2, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then((resp) => resp.json())
        .then(function (data){
          let listOfPosts = [...posts]
          for(let newPost of data){
            if(!listOfPosts.some((p) => p._id === newPost._id)){
              listOfPosts.push(newPost)
            }
          }
          listOfPosts.sort((p1, p2) => p1.date - p2.date)
          setPosts(() => {
            return listOfPosts
          })
        })
      }
    React.useEffect(() => {
        fetchData()
      },[])

    function onNewPost(){
        fetchData()
    }
    return (
        <div id="outer-container" style={{ height: "100%" }}>
            <ButtonAppBar />
            <main id="page-wrap" style={{ height: "100%" }}>
                <AddPost onNewPost={onNewPost}/>
                <Pagination posts={posts} setPosts={setPosts} />
            </main>
        </div>
    )
}

export default Home;