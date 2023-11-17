import React from 'react';
import Counter from './Counter';

const PostItem = (props) => {
    return (
        <div className='post'>
        <div className='post_txt'>
          <h2>{props.post.title}</h2>
        </div>
        <Counter/>
      </div>
    );
};

export default PostItem;