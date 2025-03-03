import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faClipboard,
  faEnvelope,
  faHouse,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0); // الحالة للعناصر النشطة
  const navigate = useNavigate(); // دالة للتنقل بين الروابط

  const menuItems = [
    { icon: faHouse, label: 'Home', path: '/' },
    { icon: faMicrophone, label: 'Podcasts', path: '/Podcasts' },
    { icon: faBookmark, label: 'Saved', path: '/Saved' },
    { icon: faClipboard, label: 'About', path: '/About' },
    { icon: faEnvelope, label: 'Contact', path: '/Contact' },
  ];

  // التنقل بعد ثانية
  const handleItemClick = (index, path) => {
    setActiveIndex(index); // تغيير العنصر النشط
    setTimeout(() => {
      navigate(path); // التنقل بعد ثانية
    },200); // 1000ms = 1 ثانية
  };

  return (
    <aside className="sidebar hidden md:block">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => handleItemClick(index, item.path)} // التعامل مع النقر
          >
            <span className="icon">
              <FontAwesomeIcon icon={item.icon} />
            </span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
