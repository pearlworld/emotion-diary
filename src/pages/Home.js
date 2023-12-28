import React, { useContext, useState } from 'react'
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import { DiaryStateContext } from '../App';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setdata] = useState([]);
  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    )
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    )
  };

  return (
    <div>
      <MyHeader headText={headText} leftChild={
        <MyButton
          text={'<'}
          onclick={decreaseMonth}
        />}
        rightChild={
          <MyButton
            text={'>'}
            onclick={increaseMonth}
          />} />
    </div>
  )
}

export default Home;
