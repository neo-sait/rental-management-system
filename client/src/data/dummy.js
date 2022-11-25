import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock, AiOutlineQuestionCircle, AiOutlinePhone } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart, FiUsers } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft, BsHouseFill } from 'react-icons/bs';
import { RiContactsLine, RiStockLine, RiProfileFill } from 'react-icons/ri';
import { MdHistory, MdOutlineSupervisorAccount } from 'react-icons/md';




export const links = [
  {
    title: 'Dashboards',
    links: [
      {
        name: 'Overview',
        icon: <RiProfileFill />,
      },
      {
        name: 'Tenants',
        icon: <FiUsers />,
      },
      {
        name: 'Transactions',
        icon: <MdHistory />,
      },
      {
        name: 'Lists',
        icon: <MdHistory />,
      },

    ],
  },
  {
    title: 'Import Data',
    links: [
      {
        name: 'NewTransaction',
        icon: <RiProfileFill />,
      },

      {
        name: 'Import',
        icon: <RiProfileFill />,
      }

    ],
  },
/*
  {
    title: 'Profile Information',
    links: [
      {
        name: 'Profile',
        icon: <RiProfileFill />,
      }

    ],
  },
  {
    title: 'Contact Us',
    links: [
      {
        name: "FAQs",
        icon: <AiOutlineQuestionCircle />,
      },
      {
        name: "Contacts",
        icon: <AiOutlinePhone />,
      }
    ],
  }
*/
];


export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];