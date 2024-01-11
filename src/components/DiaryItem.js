import React from 'react'
import MyButton from './MyButton'
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({ id, emotion, content, date }) => {

  const navigate = useNavigate();
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString().replaceAll(" ", "").replace(/\.$/, "");;

  const goDetail = () => {
    navigate(`/diary/${id}`);
  }

  const goEdit = () => {
    navigate(`/edit/${id}`);
  }

  return (
    <div className='list_item'>
      <div
        className={["item_img", `item_img_${emotion}`].join(" ")}
        onClick={goDetail}
      >
        <img src={process.env.PUBLIC_URL + `./assets/emotion${emotion}.png`} />
      </div>
      <div className='item_right'>
        <div className='item_text' onClick={goDetail}>
          <div className='item_date'>{strDate}</div>
          <div className='item_content'>{content}</div>
        </div>
        <div
          className='edit_btn'
          onClick={goEdit}>
          <MyButton text={"수정하기"} />
        </div>
      </div>
    </div>
  )
}

export default DiaryItem