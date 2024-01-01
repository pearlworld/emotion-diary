import React from 'react'

const DiaryItem = ({ id, emotion, content, date }) => {
  return (
    <div className='list_item'>
      <div className='item_img'>
        <img src={process.env.PUBLIC_URL + './assets/emotion1.png'} />
      </div>
      <div className='item_text'>
        <div className=''></div>
      </div>
    </div>
  )
}

export default DiaryItem