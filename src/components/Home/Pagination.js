import * as React from 'react'; 
import Button from '@mui/material/Button';
import Posts from './Posts';


const pageSize = 10;

function Pagination() {

    const [pageNumber, setPageNumber] = React.useState(1)
    const [posts, setPosts] = React.useState([])
    
    React.useEffect(() => {
      async function fetchData() {
        let token = localStorage.getItem('token')
        let newPosts = await fetch("http://localhost:3000/api/posts?pageNumber=" + pageNumber + "&pageSize=" + pageSize, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then((resp) => resp.json())
        .then(function (data){
          setPosts((posts) => {
            return [...data, ...posts]
          })
        })
      }
      fetchData()
    },[pageNumber])
  
    function nextPage() {
      setPageNumber((n) => {
          return n+1
        })
    }
  
    return (
      <>
      <div className='all-posts' style={{marginTop:'64px'}}>
        {posts.map((p) => {
          return <Posts key={p._id} posts={p}/>
        })}
        <Button sx={{margin:'auto', display:'flex', justifyContent:'center', padding:'30px'}} onClick={nextPage}>Afficher plus...</Button>
        </div>
      </>
    );
  }
  export default Pagination;