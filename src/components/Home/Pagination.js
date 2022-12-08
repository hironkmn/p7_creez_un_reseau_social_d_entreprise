import * as React from 'react'; 
import Button from '@mui/material/Button';
import Posts from './Posts';
import hasRoles from '../../services/security/hasRoles';


const pageSize = 2;

function Pagination({posts, setPosts}) {

    const [pageNumber, setPageNumber] = React.useState(1)
    
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
          console.log(data)
          let listOfPosts = [...posts]
          console.log(listOfPosts)
          for(let newPost of data){
            if(!listOfPosts.some((p) => p._id === newPost._id)){
              listOfPosts.push(newPost)
            }
          }
          setPosts(() => {
            return listOfPosts
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
          return <Posts key={p._id} post={p} setPosts={setPosts} hasRoles={hasRoles(p.userId)}/>
        })}
        <Button sx={{margin:'auto', display:'flex', justifyContent:'center', padding:'30px'}} onClick={nextPage}>Afficher plus...</Button>
        </div>
      </>
    );
  }
  export default Pagination;