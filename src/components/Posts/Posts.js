import React from 'react';
import './Posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
  const posts = [
    {
      id: 1,
      image: 'https://media.licdn.com/dms/image/v2/C4D0BAQGDceq5L-hdZg/company-logo_200_200/company-logo_200_200/0/1655377952271/imgs_group_logo?e=2147483647&v=beta&t=ZVurDhjjyZORPNZM8ewigaKGG4gq3o3xHeWwN37Nkt8',
      author: 'Ahmed Belal',
      date: '2020-01-01',
      authourimag:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      title: 'Top 10 Programming Tips For Beginners',
    },
    {
      id: 2,
      image: 'https://media.licdn.com/dms/image/v2/C4D0BAQGDceq5L-hdZg/company-logo_200_200/company-logo_200_200/0/1655377952271/imgs_group_logo?e=2147483647&v=beta&t=ZVurDhjjyZORPNZM8ewigaKGG4gq3o3xHeWwN37Nkt8',
      author: 'Nour',
      date: '2020-01-01',
      authourimag:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      title: 'Building a Modern Personal Portfolio',
    },
    {
      id: 3,
      image: 'https://media.licdn.com/dms/image/v2/C4D0BAQGDceq5L-hdZg/company-logo_200_200/company-logo_200_200/0/1655377952271/imgs_group_logo?e=2147483647&v=beta&t=ZVurDhjjyZORPNZM8ewigaKGG4gq3o3xHeWwN37Nkt8',
      author: 'John Doe',
      date: '2020-01-01',
      authourimag:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      title: 'Creating a Game Zone Interface',
    },
  ];

  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.image} alt={post.title} className="post-image" />
          <div className="post-content">
            <div className='toppost'>
              <div className='left'>
                <span><img src={post.authourimag} alt={post.author} className="post-author-image" /></span>
                <span>
                <p className="post-author">{post.author}</p>
                <p className='dateofpost'>{post.date}</p>
                </span>
              </div>
              <div className='right'>
              <FontAwesomeIcon icon={faShare}/>
              <FontAwesomeIcon icon={faComment} />
              <FontAwesomeIcon icon={faHeart}/>
              </div>
            </div>
            <h3 className="post-title">{post.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
