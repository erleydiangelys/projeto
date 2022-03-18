import {Component} from 'react';
import './style.css';

import { Posts } from '../../components/posts';
import { loadPost } from '../../utils/load-posts';

class Home extends Component {
  state = {
  posts: []
};

  

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postAndPhotos = await loadPost();
    this.setState({posts: postAndPhotos});
  }

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <Posts posts={posts}/>
      </section>
    );
  }
}

export default Home;
