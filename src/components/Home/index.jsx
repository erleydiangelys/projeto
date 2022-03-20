import {useEffect, useState, useCallback} from 'react';
import './style.css';

import { Posts } from '../../components/posts';
import { loadPost } from '../../utils/load-posts';
import { Button } from '../Button';
import { TextInput } from '../TextInput';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPostss] = useState([]);
  const [page, setPage] = useState(0);
  const [postPPerPage] = useState(4);
  const [seacheValue, setSeacheValue] = useState('');

  const noMorePost = page + postPPerPage >= allPosts.length;

  const filteredPost = !!seacheValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        seacheValue.toLowerCase()
      );
    })
    
    : posts;

    
  const handleloadPost = useCallback(async (page, postPPerPage) => {
    const postAndPhotos = await loadPost();

    setPosts(postAndPhotos.slice(page, postPPerPage));
    setAllPostss(postAndPhotos);
  }, []);

  useEffect(()=> {
    handleloadPost(0, postPPerPage);
  }, [handleloadPost, postPPerPage]);

  const loadMorePosts = () => {
   
    const nextPage = page + postPPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const {value} = e.target;
    setSeacheValue(value)
  }


  return (
    <section className="container">
        <div className="search-container">
          {!!seacheValue && (
              <h1> Resultados para: {seacheValue} </h1>
          )}

          <TextInput searchValue={seacheValue} handleChange={handleChange} />
        </div>   

         {filteredPost.length > 0 && (
            <Posts posts={filteredPost}/>
         )} 
          {filteredPost.length === 0 && (
            <p>Não existem postes para sua busca</p>
         )} 

        <div className="button-container">
          {!seacheValue && (
            <Button text="Carregar mais posts"
            acao={loadMorePosts}
            disabled={noMorePost}
        />
          )}
        </div>
      </section>
  )
}
export default Home;
