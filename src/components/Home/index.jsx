import {Component} from 'react';
import './style.css';

import { Posts } from '../../components/posts';
import { loadPost } from '../../utils/load-posts';
import { Button } from '../Button';

class Home extends Component {
  state = {
  posts: [],
  allPosts: [],
  page: 0,
  postPPerPage: 3,
};

  

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const {page, postPPerPage} = this.state;
    const postAndPhotos = await loadPost();
    this.setState({
      posts: postAndPhotos.slice(page, postPPerPage),
      allPosts: postAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postPPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postPPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage})
  }

  render() {
    const { posts, page, postPPerPage, allPosts } = this.state;
    const noMorePost = page + postPPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts}/>

        <div className="button-container">
          <Button text="Load more posts"
                  acao={this.loadMorePosts}
                  disabled={noMorePost}
          />
        </div>
      </section>
    );
  }
}

export default Home;
