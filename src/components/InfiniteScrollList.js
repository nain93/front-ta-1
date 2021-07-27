import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

/*
 * Please modify this component to complete assignment.
 * You can modify all the files in that package if you need.
 */

const CommentBox = styled.div`
  width: 500px;
  background: #f8f9fa;
  border: 0.5px solid #ced4da;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  >div:nth-child(2){
    margin: 10px 0;
  }
`;

const Title = styled.span`
  font-weight: 700;
`;

const Content = styled.span`
  margin-left: 10px;
`;

const Comment = styled.p`
  margin: 0;
`;

const InfiniteScrollList = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [userData, setUserData] = useState('');

  const getInitData = async () => {
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10',
      );
      setUserData(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  const infiniteScroll = useCallback(async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`,
      );
      setUserData(userData.concat(data));
      setPage(page + 1);
    }
  }, [page, userData]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [infiniteScroll]);

  if (loading) {
    return <div>loading...</div>;
  }

  return userData.map((item) => (
    <CommentBox key={item.id}>
      <div>
        <Title>Comment Id</Title>
        <Content>{item.id}</Content>
      </div>
      <div>
        <Title>Email</Title>
        <Content>{item.email}</Content>
      </div>
      <div>
        <Title>Comment</Title>
        <Comment>{item.body}</Comment>
      </div>
    </CommentBox>
  ));
};

export default InfiniteScrollList;
